// src/routes/(protected)/ojp/ojp-planning-calendar.tsx
import { Card } from "@akeso/ui-components";
import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import type { OjpEvent, OjpSal } from "./_mock-events";

import { useOjpPlanningData } from "./_loaders";
import { _mock_ojp_events } from "./_mock-events";
import { OjpCalendarHeader } from "./ojp-calendar-header";
import { OjpEventModal } from "./ojp-event-modal";
import { OjpHorizontalCalendar } from "./ojp-horizontal-calendar";

export const OjpPlanningCalendar = component$(() => {
  const data = useOjpPlanningData().value;

  // Modály state
  const showEventModal = useSignal(false);
  const eventModalMode = useSignal<"edit" | "new">("new");
  const selectedEvent = useSignal<OjpEvent | undefined>();
  const newEventData = useStore<{ dateTime?: Date; sal?: OjpSal }>({});

  // Refresh trigger - positive = new, negative = edit with ID
  const eventChangeTrigger = useSignal(0);

  // Trigger pro nové události
  const newEventTrigger = useSignal<{ dateTime: Date; sal: OjpSal } | null>(null);

  // Watch for edit triggers (negative numbers)
  useTask$(({ track }) => {
    const trigger = track(() => eventChangeTrigger.value);
    if (trigger < 0) {
      const eventId = String(Math.abs(trigger));
      const event = _mock_ojp_events.find((e) => e.id === eventId);
      if (event) {
        eventModalMode.value = "edit";
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

  return (
    <Card class="flex h-[calc(100vh-12rem)] flex-col">
      <OjpCalendarHeader weekStart={data.weekStart} />
      <div class="flex-1 overflow-auto">
        <OjpHorizontalCalendar
          dates={data.dates}
          events={data.events}
          key={eventChangeTrigger.value} // Force refresh when events change
          newEventTrigger={newEventTrigger}
          onEventChange={eventChangeTrigger}
          saly={data.saly}
          timeHourFrom={data.calendarHourFrom}
          timeHourTo={data.calendarHourTo}
          times={data.times}
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
