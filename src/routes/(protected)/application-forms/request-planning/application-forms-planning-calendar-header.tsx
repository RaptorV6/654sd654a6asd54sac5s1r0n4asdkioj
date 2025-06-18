import type { PropFunction } from "@builder.io/qwik";

import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

type Props = {
  onNextWeek: PropFunction<() => void>;
  onPrevWeek: PropFunction<() => void>;
  onToday: PropFunction<() => void>;
  weekStart: Date;
};

function formatDate(d: Date) {
  return d.toLocaleDateString("cs", { day: "2-digit", month: "2-digit" });
}
function formatWeekRange(start: Date) {
  const end = new Date(start);
  end.setDate(start.getDate() + 4);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export const ApplicationFormsPlanningCalendarHeader = component$<Props>(({ onNextWeek, onToday, weekStart }) => {
  return (
    <div class="mb-4 flex items-center justify-between">
      <div class="flex gap-2">
        <Button onClick$={onToday} severity="accent" title="Aktuální týden" type="button">
          Dnes
        </Button>
        <Button onClick$={onNextWeek} title="Následující týden" type="button">
          Následující týden
        </Button>
      </div>

      <div class="text-lg font-medium">{formatWeekRange(weekStart)}</div>
    </div>
  );
});
