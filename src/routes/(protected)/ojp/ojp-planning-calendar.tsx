import { component$ } from "@builder.io/qwik";

import { useOjpPlanningData } from "./_loaders";
import { OjpCalendarBody } from "./ojp-calendar-body";
import { OjpCalendarHeader } from "./ojp-calendar-header";

export const OjpPlanningCalendar = component$(() => {
  const data = useOjpPlanningData().value;

  return (
    <div class="flex h-full flex-col">
      <OjpCalendarHeader weekStart={data.weekStart} />
      <OjpCalendarBody
        dates={data.dates}
        events={data.events}
        saly={data.saly}
        timeHourFrom={data.calendarHourFrom}
        timeHourTo={data.calendarHourTo}
        times={data.times}
      />
    </div>
  );
});
