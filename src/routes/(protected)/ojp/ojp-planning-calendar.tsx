// src/routes/(protected)/ojp/ojp-planning-calendar.tsx
import { Card } from "@akeso/ui-components";
import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import type { OjpEvent, OjpSal } from "./_mock-events";

import { useOjpPlanningData } from "./_loaders";
import { serverGetOjpEvents } from "./_server-actions";
import { OjpCalendarHeader } from "./ojp-calendar-header";
import { OjpEventModal } from "./ojp-event-modal";
import { OjpHorizontalCalendar } from "./ojp-horizontal-calendar";

export const OjpPlanningCalendar = component$(() => {
  const initialData = useOjpPlanningData().value;
  const location = useLocation();

  // Modal state
  const showEventModal = useSignal(false);
  const eventModalMode = useSignal<"edit" | "new" | "view">("new");
  const selectedEvent = useSignal<OjpEvent | undefined>();
  const newEventData = useStore<{ dateTime?: Date; sal?: OjpSal }>({});

  // Data state - začínáme s loader daty, pak refreshujeme
  const currentData = useStore(initialData);

  // Refresh trigger - positive = view, negative = edit, 0 = refresh
  const eventChangeTrigger = useSignal(0);

  // Trigger pro nové události
  const newEventTrigger = useSignal<{ dateTime: Date; sal: OjpSal } | null>(null);

  // Refresh dat po změnách
  useTask$(async ({ track }) => {
    const trigger = track(() => eventChangeTrigger.value);

    // Při refreshi (trigger změna) načteme fresh data ze serveru
    if (trigger !== 0 && Math.abs(trigger) !== trigger) {
      try {
        const freshEvents = await serverGetOjpEvents();
        // Filtrujeme pro aktuální týden
        const weekEvents = freshEvents.filter(
          (event) =>
            event.dateFrom >= currentData.weekStart &&
            event.dateFrom <= new Date(currentData.weekStart.getTime() + 4 * 24 * 60 * 60 * 1000),
        );

        // Aktualizujeme pozice
        const { calendarEventsPosition } = await import("~/lib/calendar/calendar-events-position");
        const eventsWithPosition = calendarEventsPosition(weekEvents);

        currentData.events = eventsWithPosition;
      } catch (error) {
        console.error("Error refreshing events:", error);
      }
    }

    // Handle view/edit triggers
    if (trigger < 0) {
      // Edit mode - negative numbers
      const eventId = String(Math.abs(trigger));
      const event = currentData.events.find((e) => e.id === eventId);
      if (event) {
        eventModalMode.value = "edit";
        selectedEvent.value = event;
        showEventModal.value = true;
      }
    } else if (trigger > 0) {
      // View mode - positive numbers
      const eventId = String(trigger);
      const event = currentData.events.find((e) => e.id === eventId);
      if (event) {
        eventModalMode.value = "view";
        selectedEvent.value = event;
        showEventModal.value = true;
      }
    }
  });

  // Watch for new event triggers
  useTask$(({ track }) => {
    const trigger = track(() => newEventTrigger.value);
    if (trigger) {
      eventModalMode.value = "new";
      selectedEvent.value = undefined;
      newEventData.dateTime = trigger.dateTime;
      newEventData.sal = trigger.sal;
      showEventModal.value = true;
      // Reset trigger
      newEventTrigger.value = null;
    }
  });

  // Při route změně obnovíme data
  useTask$(({ track }) => {
    track(() => location.isNavigating);
    if (!location.isNavigating) {
      // Route dokončena, můžeme refreshnout
      eventChangeTrigger.value = 0;
    }
  });

  return (
    <Card class="flex h-[calc(100vh-12rem)] flex-col">
      <OjpCalendarHeader weekStart={currentData.weekStart} />
      <div class="flex-1 overflow-auto">
        <OjpHorizontalCalendar
          dates={currentData.dates}
          events={currentData.events}
          key={`calendar-${Math.abs(eventChangeTrigger.value)}`} // Force refresh when events change
          newEventTrigger={newEventTrigger}
          onEventChange={eventChangeTrigger}
          saly={currentData.saly}
          timeHourFrom={currentData.calendarHourFrom}
          timeHourTo={currentData.calendarHourTo}
          times={currentData.times}
        />
      </div>

      <OjpEventModal
        bind:show={showEventModal}
        event={selectedEvent.value}
        initialDateTime={newEventData.dateTime}
        initialSal={newEventData.sal}
        mode={eventModalMode.value}
        onEventChange={eventChangeTrigger}
      />
    </Card>
  );
});
