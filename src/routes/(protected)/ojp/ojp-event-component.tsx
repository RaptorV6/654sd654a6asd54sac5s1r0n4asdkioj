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
  timeHourTo: number;
};

export const OjpEventComponent = component$<OjpEventComponentProps>(({ event, timeHourFrom, timeHourTo }) => {
  const isDialogOpen = useSignal(false);
  const timeFormatter = new Intl.DateTimeFormat("cs", { hourCycle: "h23", timeStyle: "short" });

  // Pozice v procentech - flexibilní layout
  const totalMinutes = (timeHourTo - timeHourFrom) * 60;
  const startMinutes = (event.dateFrom.getHours() - timeHourFrom) * 60 + event.dateFrom.getMinutes();
  const endMinutes = (event.dateTo.getHours() - timeHourFrom) * 60 + event.dateTo.getMinutes();

  const leftPercent = (startMinutes / totalMinutes) * 100;
  const widthPercent = ((endMinutes - startMinutes) / totalMinutes) * 100;

  const salInfo = getSalInfo(event.sal);

  const isUtilityEvent =
    event.typ === "uklid" || event.typ === "pauza" || event.title.includes("ÚS") || event.title.includes("OBĚDOVÁ");

  const backgroundColor = isUtilityEvent ? "#e5e7eb" : salInfo.bgColor;
  const borderColor = isUtilityEvent ? "#9ca3af" : salInfo.color;

  return (
    <>
      <div
        class="group absolute bottom-1 top-1 z-10 cursor-pointer rounded border p-1 text-xs transition-all hover:z-20 hover:shadow-lg"
        onClick$={() => {
          isDialogOpen.value = true;
        }}
        style={`
            left: ${leftPercent}%;
            width: ${widthPercent}%;
            background-color: ${backgroundColor};
            border-color: ${borderColor};
          `}
      >
        <div class="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            aria-label="Editovat"
            class="rounded p-1 hover:bg-white hover:bg-opacity-50"
            onClick$={(e) => {
              e.stopPropagation();
              isDialogOpen.value = true;
            }}
            size="xs"
            type="button"
          >
            <ButtonLabelIcon as={EditIcon} standalone />
            <span class="sr-only">Editovat událost</span>
          </Button>
        </div>

        <div class="overflow-hidden font-semibold leading-tight text-black">{event.title}</div>
        <div class="mt-1 text-[10px] opacity-75">
          {timeFormatter.format(event.dateFrom)} - {timeFormatter.format(event.dateTo)}
        </div>
        {event.operator && <div class="overflow-hidden text-[10px] opacity-75">{event.operator}</div>}
      </div>

      <Dialog bind:show={isDialogOpen}>
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
