import {
  Button,
  ButtonLabelIcon,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  PreviewText,
} from "@akeso/ui-components";
import { dateAddMinutes } from "@akeso/utils";
import { component$, useSignal, useStyles$ } from "@builder.io/qwik";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";
import { EditIcon } from "~/components/icons-outline";
import { dateEqDates } from "~/lib/date-eq-dates";

import type { ApplicationFormsEventPositioned } from "./_mock-events";

type ApplicationFormsPlanningCalendarEventComponentProps = {
  calendar: {
    dateFrom: Date;
    timeHourFrom: number;
    timeHourTo: number;
  };
  dates: { date: Date }[];
  event: ApplicationFormsEventPositioned;
};

export const ApplicationFormsPlanningCalendarEventComponent =
  component$<ApplicationFormsPlanningCalendarEventComponentProps>(({ calendar, dates, event }) => {
    const timeFormatter = new Intl.DateTimeFormat("cs", { hourCycle: "h23", timeStyle: "short" });
    const dateFrom = event.dateFrom;
    const dateTo = event.dateTo ?? dateAddMinutes(event.duration ?? 30, dateFrom);
    const duration = (dateTo.getTime() - dateFrom.getTime()) / (60 * 1000);

    const spanSlots = Math.ceil(duration / 5);
    const dateIndex = dates.findIndex((d) => dateEqDates(d.date, dateFrom));
    const timeIndex = ((dateFrom.getHours() - calendar.timeHourFrom) * 60 + dateFrom.getMinutes()) / 5;
    const left = (event.columnIndex / event.columnCount) * 96;
    const width = (1 / event.columnCount) * 96;

    const style = [
      `grid-column-start: ${dateIndex + 1}`,
      `grid-row-start: ${timeIndex + 2}`,
      `grid-row-end: span ${spanSlots}`,
      `left: ${left}%`,
      `width: ${width}%`,
    ].join("; ");

    const isDialogOpen = useSignal(false);

    useStyles$(`
      .no-select {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }
    `);

    return (
      <>
        <li class="relative m-1 flex" style={style}>
          <div
            class="no-select group relative flex cursor-move flex-col overflow-hidden rounded-lg border border-indigo-200 bg-indigo-50 p-1 text-xs/5 hover:bg-indigo-100"
            tabIndex={0}
          >
            <div class="absolute right-1 top-1 flex gap-1 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <Button
                aria-label="Editovat"
                class="rounded p-1 hover:bg-gray-200"
                onClick$={() => {
                  isDialogOpen.value = true;
                }}
                severity="accent"
                type="button"
                variant="contained"
              >
                <ButtonLabelIcon as={EditIcon} standalone />
              </Button>
            </div>

            <p class="text-left font-semibold">{event.title}</p>
            <p class="text-left text-[0.6rem]/5 text-blue-500 group-hover:text-blue-700">
              <time dateTime={dateFrom.toISOString()}>{timeFormatter.format(dateFrom)}</time>
              {" - "}
              <time dateTime={dateTo.toISOString()}>{timeFormatter.format(dateTo)}</time>
              {` (${duration} min)`}
            </p>
            <div class="absolute bottom-0 left-0 h-1 w-full cursor-row-resize" />
          </div>
        </li>

        <Dialog bind:show={isDialogOpen} open={isDialogOpen.value}>
          <DialogHeader>Upravit {event.title}</DialogHeader>
          <DialogBody>
            <p class="text-left text-[0.6rem]/5 text-blue-500 group-hover:text-blue-700">
              <time dateTime={dateFrom.toISOString()}>{timeFormatter.format(dateFrom)}</time>
              {" – "}
              <time dateTime={dateTo.toISOString()}>{timeFormatter.format(dateTo)}</time>
              {` (${duration} min)`}
            </p>

            <PreviewText label="Jméno a příjmení" value={event.jmeno} />
            <PreviewText label="Číslo pojištěnce" value={event.cpd} />

            <div class="my-4 grid grid-cols-2 items-baseline gap-4">
              <PreviewText class="w-full" label="Datum začátku" value={dateFrom.toLocaleDateString("cs-CZ")} />
              <PreviewText class="w-full" label="Datum konce" value={dateTo.toLocaleDateString("cs-CZ")} />
            </div>

            <div class="mb-4 grid grid-cols-2 items-baseline gap-4">
              <PreviewText class="w-full" label="Čas začátku" value={timeFormatter.format(dateFrom)} />
              <PreviewText class="w-full" label="Čas konce" value={timeFormatter.format(dateTo)} />
            </div>

            <PreviewText label="Doba trvání" value={`${duration} min`} />
            <PreviewText label="Poznámka" value={event.poznamka} />
          </DialogBody>

          <DialogFooter class="flex items-center justify-between gap-2">
            <ButtonWithConfirmation
              aria-label="Smazat"
              class=" bg-red-500 hover:!bg-red-700"
              dialogActionCancelLabel="Ne"
              dialogActionConfirmLabel="Ano"
              dialogAlertText=""
              dialogTitle="Chcete skutečně smazat událost?"
              onClick$={() => {}}
              severity="accent"
              variant="contained"
            >
              Smazat
            </ButtonWithConfirmation>

            <div class="flex gap-2">
              <Button
                onClick$={() => {
                  isDialogOpen.value = false;
                }}
                type="button"
              >
                Zrušit
              </Button>
              <Button
                onClick$={() => {
                  isDialogOpen.value = false;
                }}
                severity="accent"
                type="button"
              >
                Uložit
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </>
    );
  });
