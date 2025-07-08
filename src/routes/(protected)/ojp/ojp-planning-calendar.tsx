import { Card } from "@akeso/ui-components";
import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import type { OjpSal } from "./_mock-events";

import { getWeekEvents, useOjpPlanningData } from "./_loaders";
import { OjpCalendarHeader } from "./ojp-calendar-header";
import { OjpEventModal } from "./ojp-event-modal";
import { OjpHorizontalCalendar } from "./ojp-horizontal-calendar";

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

  const newEventData = useStore<{
    dateTime?: Date;
    forceOtherSlots?: boolean; // 🔧 Přidej tuhle property
    sal?: OjpSal;
  }>({});

  const newEventTrigger = useSignal<{ dateTime: Date; forceOtherSlots?: boolean; sal: OjpSal } | null>(null); // 🔧 Aktualizuj typ

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

    // Force reload z _mock_ojp_events
    eventsSignal.value = getWeekEvents(weekStart);

    // 🔧 PŘIDEJ: Reset selectedEvent pokud byla smazána
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
    const isModalOpen = track(() => showEditEventModal.value);

    // Když se modal zavře, resetuj selectedEvent
    if (!isModalOpen && selectedEvent.value) {
      selectedEvent.value = null;
    }
  });

  useTask$(({ track }) => {
    const trigger = track(() => newEventTrigger.value);
    if (trigger) {
      newEventData.dateTime = trigger.dateTime;
      newEventData.sal = trigger.sal;
      newEventData.forceOtherSlots = trigger.forceOtherSlots; // 🔧 Přidej tuhle řádku

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

  const handleEventClick = $((event: any) => {
    selectedEvent.value = event;
    showEditEventModal.value = true;
  });

  return (
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
          onEventClick$={handleEventClick}
          saly={staticData.saly}
          timeHourFrom={staticData.calendarHourFrom}
          times={staticData.times}
        />
      </div>

      <OjpEventModal
        bind:show={showNewEventModal}
        initialData={newEventData}
        mode="new"
        refreshTrigger={refreshTrigger}
      />

      <OjpEventModal
        bind:show={showEditEventModal}
        event={selectedEvent.value}
        mode="view"
        refreshTrigger={refreshTrigger}
      />
    </Card>
  );
});
