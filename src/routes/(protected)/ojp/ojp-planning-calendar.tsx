// src/routes/(protected)/ojp/ojp-planning-calendar.tsx
import { Card } from "@akeso/ui-components";
import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import type { OjpSal } from "./_mock-events";

import { useAddOjpEventAction, useDeleteOjpEventAction, useUpdateOjpEventAction } from "./_actions";
import { getWeekEvents, useOjpPlanningData } from "./_loaders";
import { OjpCalendarHeader } from "./ojp-calendar-header";
import { OjpEventModal } from "./ojp-event-modal";
import { OjpHorizontalCalendar } from "./ojp-horizontal-calendar";

export const OjpPlanningCalendar = component$(() => {
  const staticData = useOjpPlanningData().value;

  // Actions pro sledování změn
  const addAction = useAddOjpEventAction();
  const updateAction = useUpdateOjpEventAction();
  const deleteAction = useDeleteOjpEventAction();

  // Reaktivní data - inicializace s aktuálními daty
  const eventsSignal = useSignal(getWeekEvents(staticData.weekStart));

  // Modal state pro nové události
  const showNewEventModal = useSignal(false);
  const newEventData = useStore<{ dateTime?: Date; sal?: OjpSal }>({});

  // Trigger pro nové události z double click
  const newEventTrigger = useSignal<{ dateTime: Date; sal: OjpSal } | null>(null);

  // Watch for action changes and refresh events
  useTask$(({ track }) => {
    const addResult = track(() => addAction.value);
    const updateResult = track(() => updateAction.value);
    const deleteResult = track(() => deleteAction.value);

    // Refresh events after any successful action
    if (addResult?.success || updateResult?.success || deleteResult?.success) {
      // Znovu načteme události pro aktuální týden
      eventsSignal.value = getWeekEvents(staticData.weekStart);
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
      <OjpCalendarHeader weekStart={staticData.weekStart} />

      <div class="flex-1 overflow-auto">
        <OjpHorizontalCalendar
          dates={staticData.dates}
          events={eventsSignal.value}
          newEventTrigger={newEventTrigger}
          saly={staticData.saly}
          timeHourFrom={staticData.calendarHourFrom}
          timeHourTo={staticData.calendarHourTo}
          times={staticData.times}
        />
      </div>

      {/* Modal pro nové události */}
      <OjpEventModal
        bind:show={showNewEventModal}
        initialDateTime={newEventData.dateTime}
        initialSal={newEventData.sal}
        mode="new"
      />
    </Card>
  );
});
