import { Card } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { useOjpPlanningData } from "./_loaders";
import { OjpCalendarHeader } from "./ojp-calendar-header";
import { OjpHorizontalCalendar } from "./ojp-horizontal-calendar";

export const OjpPlanningCalendar = component$(() => {
  const data = useOjpPlanningData().value;

  return (
    <Card class="flex h-[calc(100vh-12rem)] flex-col">
      <OjpCalendarHeader weekStart={data.weekStart} />
      <div class="flex-1 overflow-auto">
        <OjpHorizontalCalendar
          dates={data.dates}
          events={data.events}
          saly={data.saly}
          timeHourFrom={data.calendarHourFrom}
          timeHourTo={data.calendarHourTo}
          times={data.times}
        />
      </div>
    </Card>
  );
});
