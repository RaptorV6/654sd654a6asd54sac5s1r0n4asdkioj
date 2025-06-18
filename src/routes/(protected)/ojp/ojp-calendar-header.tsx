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
    <div class="mb-4 flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <h1 class="text-base font-semibold text-gray-900">Plánování operačních sálů - {formatWeekRange(weekStart)}</h1>
      <div class="flex items-center gap-2">
        <Button severity="accent" title="Aktuální týden" type="button">
          Dnes
        </Button>
        <Button title="Předchozí týden" type="button">
          ← Předchozí
        </Button>
        <Button title="Následující týden" type="button">
          Následující →
        </Button>
      </div>
    </div>
  );
});
