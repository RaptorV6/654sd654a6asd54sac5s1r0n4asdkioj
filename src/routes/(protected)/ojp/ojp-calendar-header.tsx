import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

type OjpCalendarHeaderProps = {
  weekStart: Date;
};

function formatWeekRange(start: Date) {
  const end = new Date(start);
  end.setDate(start.getDate() + 4);
  const formatter = new Intl.DateTimeFormat("cs", { day: "2-digit", month: "2-digit" });
  return `${formatter.format(start)} – ${formatter.format(end)}`;
}

export const OjpCalendarHeader = component$<OjpCalendarHeaderProps>(({ weekStart }) => {
  return (
    <div class="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">Plánování operačních sálů</h1>
        <p class="text-sm text-gray-600">{formatWeekRange(weekStart)}</p>
      </div>

      <div class="flex items-center gap-2">
        <Button
          onClick$={() => {
            // TODO: Navigate to current week
          }}
          severity="accent"
          size="sm"
          title="Aktuální týden"
          type="button"
        >
          Dnes
        </Button>
        <Button
          onClick$={() => {
            // TODO: Navigate to previous week
          }}
          size="sm"
          title="Předchozí týden"
          type="button"
        >
          ← Předchozí
        </Button>
        <Button
          onClick$={() => {
            // TODO: Navigate to next week
          }}
          size="sm"
          title="Následující týden"
          type="button"
        >
          Následující →
        </Button>
      </div>
    </div>
  );
});
