import { Card } from "@akeso/ui-components";
import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import type { OjpSal } from "./_mock-events";

import { useAddOjpEventAction, useDeleteOjpEventAction, useUpdateOjpEventAction } from "./_actions";
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

  const addAction = useAddOjpEventAction();
  const updateAction = useUpdateOjpEventAction();
  const deleteAction = useDeleteOjpEventAction();

  const currentWeekStart = useSignal(staticData.weekStart);
  const eventsSignal = useSignal(getWeekEvents(staticData.weekStart));

  const showNewEventModal = useSignal(false);
  const newEventData = useStore<{ dateTime?: Date; sal?: OjpSal }>({});

  const newEventTrigger = useSignal<{ dateTime: Date; sal: OjpSal } | null>(null);

  const dates = useSignal(
    Array.from({ length: 5 }, (_, i) => {
      const date = new Date(currentWeekStart.value);
      date.setDate(currentWeekStart.value.getDate() + i);
      return { date };
    }),
  );

  useTask$(({ track }) => {
    const weekStart = track(() => currentWeekStart.value);
    eventsSignal.value = getWeekEvents(weekStart);

    dates.value = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return { date };
    });
  });

  useTask$(({ track }) => {
    const addResult = track(() => addAction.value);
    const updateResult = track(() => updateAction.value);
    const deleteResult = track(() => deleteAction.value);

    if (addResult?.success || updateResult?.success || deleteResult?.success) {
      eventsSignal.value = getWeekEvents(currentWeekStart.value);
    }
  });

  useTask$(({ track }) => {
    const trigger = track(() => newEventTrigger.value);
    if (trigger) {
      newEventData.dateTime = trigger.dateTime;
      newEventData.sal = trigger.sal;
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
          saly={staticData.saly}
          timeHourFrom={staticData.calendarHourFrom}
          timeHourTo={staticData.calendarHourTo}
          times={staticData.times}
        />
      </div>

      <OjpEventModal
        bind:show={showNewEventModal}
        initialDateTime={newEventData.dateTime}
        initialSal={newEventData.sal}
        mode="new"
      />
    </Card>
  );
});
