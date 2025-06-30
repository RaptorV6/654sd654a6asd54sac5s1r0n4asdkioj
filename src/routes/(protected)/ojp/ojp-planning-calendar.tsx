// src/routes/(protected)/ojp/ojp-planning-calendar.tsx
import { Card } from "@akeso/ui-components";
import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import type { OjpSal } from "./_mock-events";

import { useOjpPlanningData } from "./_loaders";
import { serverGetOjpEvents } from "./_server-actions";
import { OjpCalendarHeader } from "./ojp-calendar-header";
import { OjpEventModal } from "./ojp-event-modal";
import { OjpHorizontalCalendar } from "./ojp-horizontal-calendar";

export const OjpPlanningCalendar = component$(() => {
  const initialData = useOjpPlanningData().value;

  // Modal state pro nové události
  const showNewEventModal = useSignal(false);
  const newEventData = useStore<{ dateTime?: Date; sal?: OjpSal }>({});

  // Data state a triggery
  const refreshDataTrigger = useSignal(0);
  const newEventTrigger = useSignal<{ dateTime: Date; sal: OjpSal } | null>(null);
  const currentData = useStore(initialData);

  // Refresh dat po změnách
  useTask$(async ({ track }) => {
    const refreshValue = track(() => refreshDataTrigger.value);

    if (refreshValue > 0) {
      try {
        const freshEvents = await serverGetOjpEvents();
        const weekEnd = new Date(currentData.weekStart);
        weekEnd.setDate(currentData.weekStart.getDate() + 4);

        const weekEvents = freshEvents.filter(
          (event) => event.dateFrom >= currentData.weekStart && event.dateFrom <= weekEnd,
        );

        const { calendarEventsPosition } = await import("~/lib/calendar/calendar-events-position");
        const eventsWithPosition = calendarEventsPosition(weekEvents);
        currentData.events = eventsWithPosition;
      } catch (error) {
        console.error("Error refreshing events:", error);
      }
    }
  });

  // Watch for new event triggers
  useTask$(({ track }) => {
    const trigger = track(() => newEventTrigger.value);
    if (trigger) {
      newEventData.dateTime = trigger.dateTime;
      newEventData.sal = trigger.sal;
      showNewEventModal.value = true;
      // Reset trigger
      newEventTrigger.value = null;
    }
  });

  return (
    <Card class="flex h-[calc(100vh-12rem)] flex-col">
      <OjpCalendarHeader weekStart={currentData.weekStart} />

      <div class="flex-1 overflow-auto">
        <OjpHorizontalCalendar
          dates={currentData.dates}
          events={currentData.events}
          newEventTrigger={newEventTrigger}
          onDataChange={refreshDataTrigger}
          saly={currentData.saly}
          timeHourFrom={currentData.calendarHourFrom}
          timeHourTo={currentData.calendarHourTo}
          times={currentData.times}
        />
      </div>

      {/* Modal jen pro nové události */}
      <OjpEventModal
        bind:show={showNewEventModal}
        initialDateTime={newEventData.dateTime}
        initialSal={newEventData.sal}
        mode="new"
        onEventChange={refreshDataTrigger}
      />
    </Card>
  );
});
