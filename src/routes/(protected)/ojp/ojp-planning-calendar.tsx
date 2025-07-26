/* eslint-disable no-console */
import { Card } from "@akeso/ui-components";
import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import type { OjpSal } from "./_mock-events";
import type { CollisionInfo, DraggedEventInfo } from "./ojp-collision-detection";

import { updateOjpEvent } from "./_actions";
import { getWeekEvents, useOjpPlanningData } from "./_loaders";
import { OjpCalendarHeader } from "./ojp-calendar-header";
import { OjpCollisionModal } from "./ojp-collision-modal";
import { calculateEventShifts } from "./ojp-event-shift-calculator";
import { OjpHorizontalCalendar } from "./ojp-horizontal-calendar";
import { OjpModal } from "./ojp-modal";

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addWeeks(date: Date, weeks: number): Date {
  const result = new Date(date);
  result.setDate(date.getDate() + weeks * 7);
  return result;
}

export const OjpPlanningCalendar = component$(() => {
  const staticData = useOjpPlanningData().value;

  const currentWeekStart = useSignal(staticData.weekStart);
  const eventsSignal = useSignal(getWeekEvents(staticData.weekStart));
  const refreshTrigger = useSignal(0);

  const showNewEventModal = useSignal(false);
  const showEditEventModal = useSignal(false);
  const selectedEvent = useSignal<any>(null);

  // Collision modal state
  const showCollisionModal = useSignal(false);
  const currentCollisionInfo = useSignal<CollisionInfo | null>(null);
  const currentDraggedEventInfo = useSignal<DraggedEventInfo | null>(null);

  // Track pending drag&drop updates
  const pendingUpdates = useSignal<Set<string>>(new Set());

  const newEventData = useStore<{
    dateTime?: Date;
    forceOtherSlots?: boolean;
    sal?: OjpSal;
  }>({});

  const newEventTrigger = useSignal<{ dateTime: Date; forceOtherSlots?: boolean; sal: OjpSal } | null>(null);

  const dates = useSignal(
    Array.from({ length: 5 }, (_, i) => {
      const date = new Date(currentWeekStart.value);
      date.setDate(currentWeekStart.value.getDate() + i);
      return { date };
    }),
  );

  useTask$(({ track }) => {
    const weekStart = track(() => currentWeekStart.value);
    track(() => refreshTrigger.value);

    // Načti fresh data ze serveru
    const serverEvents = getWeekEvents(weekStart);

    // Pokud nemáme pending updates, použij server data
    if (pendingUpdates.value.size === 0) {
      eventsSignal.value = serverEvents;
    } else {
      // Merge server events s lokálními změnami
      const currentEvents = eventsSignal.value;
      const mergedEvents = serverEvents.map((serverEvent) => {
        // Najdi lokální verzi
        const localEvent = currentEvents.find((e) => e.id === serverEvent.id);

        // Pokud je event pending, použij lokální verzi
        if (localEvent && pendingUpdates.value.has(serverEvent.id)) {
          return localEvent;
        }

        // Jinak použij server verzi
        return serverEvent;
      });

      // Přidej i nové eventy, které nejsou na serveru
      const newLocalEvents = currentEvents.filter(
        (localEvent) => !serverEvents.some((serverEvent) => serverEvent.id === localEvent.id),
      );

      eventsSignal.value = [...mergedEvents, ...newLocalEvents];
    }

    if (selectedEvent.value) {
      const eventExists = eventsSignal.value.some((e) => e.id === selectedEvent.value?.id);
      if (!eventExists) {
        selectedEvent.value = null;
        showEditEventModal.value = false;
      }
    }

    dates.value = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return { date };
    });
  });

  useTask$(({ track }) => {
    const trigger = track(() => newEventTrigger.value);
    if (trigger) {
      newEventData.dateTime = trigger.dateTime;
      newEventData.sal = trigger.sal;
      newEventData.forceOtherSlots = trigger.forceOtherSlots;

      showNewEventModal.value = true;
      newEventTrigger.value = null;
    }
  });

  const handlePrevWeek = $(() => {
    currentWeekStart.value = addWeeks(currentWeekStart.value, -1);
  });

  const handleNextWeek = $(() => {
    currentWeekStart.value = addWeeks(currentWeekStart.value, 1);
  });

  const handleToday = $(() => {
    currentWeekStart.value = startOfWeek(new Date());
  });

  const handleEventDrop = $(
    (eventId: string, separatorId: string | undefined, newDate: Date, newSal: OjpSal, newTime: Date) => {
      const event = eventsSignal.value.find((e) => e.id === eventId);
      if (!event || !(newTime instanceof Date)) {
        return;
      }

      console.log(
        `🔄 [EVENT DROP] Posún event ${eventId}${separatorId ? ` + separátor ${separatorId}` : ""} na ${newTime.toLocaleTimeString()}`,
      );

      // ✅ MARK BOTH EVENTS AS PENDING
      const pendingIds = separatorId ? [eventId, separatorId] : [eventId];
      pendingUpdates.value = new Set([...pendingUpdates.value, ...pendingIds]);

      const originalDuration = event.dateTo.getTime() - event.dateFrom.getTime();
      const newEndTime = new Date(newTime.getTime() + originalDuration);
      const localDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
      const dateString = localDate.toISOString().split("T")[0];

      // ✅ UPDATE HLAVNÍ EVENT
      const updateMainEvent = async () => {
        try {
          const updateData = {
            casDo: newEndTime.toTimeString().slice(0, 5),
            casOd: newTime.toTimeString().slice(0, 5),
            datum: dateString,
            id: eventId,
            operator: event.operator || "",
            poznamka: event.poznamka || "",
            sal: newSal,
            title: event.title,
            typ: event.typ,
          };

          console.log(`🔄 [SERVER] Ukládám hlavní event:`, updateData);
          const result = updateOjpEvent(updateData);

          if (result.failed) {
            console.error(`❌ [SERVER] Chyba při ukládání hlavního eventu:`, result.message);
            return false;
          }
          return true;
        } catch (error) {
          console.error(`❌ [SERVER] Exception při ukládání hlavního eventu:`, error);
          return false;
        }
      };

      // ✅ UPDATE SEPARÁTOR (pokud existuje)
      const updateSeparatorEvent = async () => {
        if (!separatorId) return true;

        const separatorEvent = eventsSignal.value.find((e) => e.id === separatorId);
        if (!separatorEvent) {
          console.warn(`⚠️ [EVENT DROP] Separátor ${separatorId} nebyl nalezen`);
          return true;
        }

        try {
          const separatorDuration = separatorEvent.dateTo.getTime() - separatorEvent.dateFrom.getTime();
          let separatorStart: Date;

          if (event.typ === "operace") {
            // Táhnu operaci → separátor následuje za operací
            separatorStart = new Date(newEndTime);
          } else {
            // Táhnu separátor → operace končí kde separátor začíná
            separatorStart = new Date(newTime.getTime() - separatorDuration);
          }

          const separatorEnd = new Date(separatorStart.getTime() + separatorDuration);

          const separatorUpdateData = {
            casDo: separatorEnd.toTimeString().slice(0, 5),
            casOd: separatorStart.toTimeString().slice(0, 5),
            datum: dateString,
            id: separatorId,
            operator: separatorEvent.operator || "",
            poznamka: separatorEvent.poznamka || "",
            sal: newSal,
            title: separatorEvent.title,
            typ: separatorEvent.typ,
          };

          console.log(`🔄 [SERVER] Ukládám separátor:`, separatorUpdateData);
          const result = updateOjpEvent(separatorUpdateData);

          if (result.failed) {
            console.error(`❌ [SERVER] Chyba při ukládání separátoru:`, result.message);
            return false;
          }
          return true;
        } catch (error) {
          console.error(`❌ [SERVER] Exception při ukládání separátoru:`, error);
          return false;
        }
      };

      // ✅ PARALELNÍ UPDATES
      Promise.all([updateMainEvent(), updateSeparatorEvent()]).then(([mainSuccess, separatorSuccess]) => {
        // Cleanup pending states
        const newPending = new Set(pendingUpdates.value);
        pendingIds.forEach((id) => newPending.delete(id));
        pendingUpdates.value = newPending;

        if (mainSuccess && separatorSuccess) {
          console.log(`✅ [EVENT DROP] Úspěšně uloženo na server`);
          // Refresh data ze serveru
          refreshTrigger.value += 1;
        } else {
          console.error(`❌ [EVENT DROP] Chyba při ukládání - rollback`);
          // Refresh data (rollback)
          refreshTrigger.value += 1;
        }
      });
    },
  );

  const handleEventClick = $((event: any) => {
    selectedEvent.value = event;
    showEditEventModal.value = true;
  });

  const handleCollisionDetected = $((collisionInfo: CollisionInfo, draggedEventInfo: DraggedEventInfo) => {
    currentCollisionInfo.value = collisionInfo;
    currentDraggedEventInfo.value = draggedEventInfo;
    showCollisionModal.value = true;
  });

  const handleConfirmShift = $(() => {
    if (!currentCollisionInfo.value || !currentDraggedEventInfo.value) {
      return;
    }

    // Zavři modal
    showCollisionModal.value = false;

    // ✅ OUT OF BOUNDS - jen zavři modal, nic neposunuj
    if (currentCollisionInfo.value.isOutOfBounds) {
      currentCollisionInfo.value = null;
      currentDraggedEventInfo.value = null;
      return; // Událost zůstane na původním místě
    }

    // Získej draggedEventInfo před jeho použitím
    const draggedEventInfo = currentDraggedEventInfo.value;

    // Vypočítej nové pozice všech událostí
    const shiftResult = calculateEventShifts({
      allEvents: eventsSignal.value,
      draggedEventInfo: draggedEventInfo,
      timeHourFrom: staticData.calendarHourFrom,
      timeHourTo: staticData.calendarHourTo,
    });

    console.log("🔧 [SHIFT DEBUG] Collision analysis:", {
      calculatedShifts: shiftResult.eventsToShift.map(
        (s) =>
          `${s.originalEvent.title}: ${s.originalEvent.dateFrom.toLocaleTimeString()}-${s.originalEvent.dateTo.toLocaleTimeString()} -> ${s.newStartTime.toLocaleTimeString()}-${s.newEndTime.toLocaleTimeString()}`,
      ),
      conflictingEvents: currentCollisionInfo.value.conflictingEvents.map(
        (e) => `${e.title} (${e.dateFrom.toLocaleTimeString()}-${e.dateTo.toLocaleTimeString()})`,
      ),
      draggedEvent: `${draggedEventInfo.originalEvent.title} (${draggedEventInfo.originalEvent.dateFrom.toLocaleTimeString()}-${draggedEventInfo.originalEvent.dateTo.toLocaleTimeString()})`,
      isValid: shiftResult.isValid,
      shiftDirection: shiftResult.direction,
      targetPosition: `${draggedEventInfo.newStartTime.toLocaleTimeString()}-${draggedEventInfo.newEndTime.toLocaleTimeString()}`,
    });

    if (!shiftResult.isValid) {
      console.error("Cannot shift events:", shiftResult.errorReason);
      currentCollisionInfo.value = null;
      currentDraggedEventInfo.value = null;
      return;
    }

    // Aplikuj posun na hlavní událost
    handleEventDrop(
      draggedEventInfo.eventId,
      draggedEventInfo.separatorId,
      draggedEventInfo.newDate,
      draggedEventInfo.newSal,
      draggedEventInfo.newStartTime,
    );

    // ✅ Aplikuj posun na kolizní události BEZ separátorů
    for (const shift of shiftResult.eventsToShift) {
      console.log(
        `🔄 [SHIFT] Aplikuji posun: ${shift.originalEvent.title} -> ${shift.newStartTime.toLocaleTimeString()}-${shift.newEndTime.toLocaleTimeString()}`,
      );

      // ✅ NEPŘEDÁVEJ separatorId - logika v _actions.ts si najde separátor sama
      handleEventDrop(
        shift.eventId,
        undefined, // ✅ Nechám undefined - separatory se posunou automaticky
        draggedEventInfo.newDate,
        draggedEventInfo.newSal,
        shift.newStartTime,
      );
    }

    // Ukliď state
    currentCollisionInfo.value = null;
    currentDraggedEventInfo.value = null;
  });

  const handleCancelShift = $(() => {
    showCollisionModal.value = false;
    currentCollisionInfo.value = null;
    currentDraggedEventInfo.value = null;
  });

  return (
    <>
      <Card class="flex h-[calc(100vh-12rem)] flex-col">
        <OjpCalendarHeader
          onNextWeek$={handleNextWeek}
          onPrevWeek$={handlePrevWeek}
          onToday$={handleToday}
          weekStart={currentWeekStart.value}
        />

        <div class="flex-1 overflow-auto">
          <OjpHorizontalCalendar
            dates={dates.value}
            events={eventsSignal.value}
            newEventTrigger={newEventTrigger}
            onCollisionDetected$={handleCollisionDetected}
            onEventClick$={handleEventClick}
            onEventDrop$={handleEventDrop}
            saly={staticData.saly}
            timeHourFrom={staticData.calendarHourFrom}
            timeHourTo={staticData.calendarHourTo}
            times={staticData.times}
          />
        </div>
      </Card>

      <OjpModal
        bind:show={showNewEventModal}
        eventsSignal={eventsSignal}
        initialData={newEventData}
        mode="new"
        refreshTrigger={refreshTrigger}
      />

      <OjpModal
        bind:show={showEditEventModal}
        eventSignal={selectedEvent}
        eventsSignal={eventsSignal}
        mode="edit"
        refreshTrigger={refreshTrigger}
      />

      <OjpCollisionModal
        bind:show={showCollisionModal}
        collisionInfo={currentCollisionInfo.value}
        draggedEventInfo={currentDraggedEventInfo.value}
        onCancel$={handleCancelShift}
        onConfirm$={handleConfirmShift}
      />
    </>
  );
});
