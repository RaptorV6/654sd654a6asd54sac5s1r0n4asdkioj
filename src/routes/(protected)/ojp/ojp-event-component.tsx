import {
  Button,
  ButtonLabelIcon,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  PreviewText,
} from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";

import { EditIcon } from "~/components/icons-outline";

import type { OjpEventPositioned } from "./_mock-events";

import { getSalInfo } from "./_mock-events";

type OjpEventComponentProps = {
  event: OjpEventPositioned;
  timeHourFrom: number;
};

export const OjpEventComponent = component$<OjpEventComponentProps>(({ event, timeHourFrom }) => {
  const isDialogOpen = useSignal(false);
  const timeFormatter = new Intl.DateTimeFormat("cs", { hourCycle: "h23", timeStyle: "short" });

  // Vypočítáme pozici v gridu
  const startMinutes = event.dateFrom.getHours() * 60 + event.dateFrom.getMinutes();
  const endMinutes = event.dateTo.getHours() * 60 + event.dateTo.getMinutes();
  const gridStartMinutes = timeHourFrom * 60;

  // Každá hodina má 4 sloupce (15min intervaly), začínáme od sloupce 1
  const startColumn = Math.floor((startMinutes - gridStartMinutes) / 15) + 1;
  const endColumn = Math.floor((endMinutes - gridStartMinutes) / 15) + 1;
  const spanColumns = endColumn - startColumn;

  const salInfo = getSalInfo(event.sal);

  // Styling podle typu události
  const getEventStyle = () => {
    const baseStyle = "absolute inset-1 rounded border-2 p-2 cursor-pointer hover:shadow-md transition-shadow z-20";

    switch (event.typ) {
      case "uklid":
        return `${baseStyle} bg-gray-200 text-gray-800 border-gray-400`;
      case "pauza":
        return `${baseStyle} bg-yellow-100 text-yellow-800 border-yellow-400`;
      case "operace":
      default:
        return `${baseStyle} text-black border-opacity-80`;
    }
  };

  return (
    <>
      <div
        class="relative"
        style={`
          grid-column: ${startColumn} / span ${spanColumns};
          grid-row: 1;
        `}
      >
        <div
          class={getEventStyle()}
          onClick$={() => {
            isDialogOpen.value = true;
          }}
          style={`
            background-color: ${salInfo.bgColor};
            border-color: ${salInfo.color};
          `}
        >
          <div class="absolute right-1 top-1 opacity-0 transition-opacity hover:opacity-100">
            <Button
              aria-label="Editovat"
              class="rounded p-1 hover:bg-white hover:bg-opacity-50"
              onClick$={() => {
                isDialogOpen.value = true;
              }}
              size="xs"
              type="button"
            >
              <ButtonLabelIcon as={EditIcon} standalone />
              <span class="sr-only">Editovat událost</span>
            </Button>
          </div>

          <div class="text-sm font-bold">{event.title}</div>
          <div class="text-xs opacity-75">
            {timeFormatter.format(event.dateFrom)} - {timeFormatter.format(event.dateTo)}
          </div>
          {event.operator && <div class="mt-1 text-xs opacity-75">{event.operator}</div>}
        </div>
      </div>

      <Dialog bind:show={isDialogOpen} open={isDialogOpen.value}>
        <DialogHeader>Detail události - {event.title}</DialogHeader>
        <DialogBody>
          <div class="space-y-4">
            <PreviewText label="Název" value={event.title} />
            <PreviewText label="Typ" value={event.typ} />
            <PreviewText label="Sál" value={salInfo.displayName} />

            <div class="grid grid-cols-2 gap-4">
              <PreviewText label="Začátek" value={timeFormatter.format(event.dateFrom)} />
              <PreviewText label="Konec" value={timeFormatter.format(event.dateTo)} />
            </div>

            <PreviewText label="Doba trvání" value={`${event.duration} min`} />

            {event.operator && <PreviewText label="Operatér" value={event.operator} />}

            {event.poznamka && <PreviewText label="Poznámka" value={event.poznamka} />}
          </div>
        </DialogBody>

        <DialogFooter class="flex justify-end gap-2">
          <Button
            onClick$={() => {
              isDialogOpen.value = false;
            }}
            type="button"
          >
            Zavřít
          </Button>
          <Button
            onClick$={() => {
              isDialogOpen.value = false;
            }}
            severity="accent"
            type="button"
          >
            Upravit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
});
