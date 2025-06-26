// src/routes/(protected)/ojp/ojp-event-component.tsx
import type { Signal } from "@builder.io/qwik";

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
  intervalMinutes: number;
  intervalWidth: number;
  onEventChange: Signal<number>;
  scrollLeft: number;
  timeHourFrom: number;
  viewportWidth: number;
};

export const OjpEventComponent = component$<OjpEventComponentProps>(
  ({ event, intervalMinutes, intervalWidth, onEventChange, scrollLeft, timeHourFrom, viewportWidth }) => {
    const isDialogOpen = useSignal(false);
    const timeFormatter = new Intl.DateTimeFormat("cs", { hourCycle: "h23", timeStyle: "short" });

    // Pozicování v 5-minutových intervalech
    const startTotalMinutes = (event.dateFrom.getHours() - timeHourFrom) * 60 + event.dateFrom.getMinutes();
    const endTotalMinutes = (event.dateTo.getHours() - timeHourFrom) * 60 + event.dateTo.getMinutes();

    // Přepočet na pozici v px (včetně offset pro sloupec se sály)
    const salsWidth = 140;
    const startInterval = startTotalMinutes / intervalMinutes;
    const endInterval = endTotalMinutes / intervalMinutes;

    const leftPx = salsWidth + startInterval * intervalWidth;
    const widthPx = (endInterval - startInterval) * intervalWidth;

    const salInfo = getSalInfo(event.sal);

    // Logika pro různé typy událostí
    let backgroundColor: string;
    let borderColor: string;
    let textColor: string = "#000";

    if (event.typ === "svatek") {
      // Svátky - šedé podbarvení
      backgroundColor = "#e5e7eb";
      borderColor = "#9ca3af";
      textColor = "#374151";
    } else if (
      event.typ === "uklid" ||
      event.typ === "pauza" ||
      event.title.includes("ÚS") ||
      event.title.includes("OBĚDOVÁ")
    ) {
      // Úklid a pauzy
      backgroundColor = "#e5e7eb";
      borderColor = "#9ca3af";
    } else {
      // Normální operace
      backgroundColor = salInfo.bgColor;
      borderColor = salInfo.color;
    }

    // NOVÁ LOGIKA pro dynamické pozicování textu
    const isLongEvent = widthPx > viewportWidth * 0.6; // Pokud je událost delší než 60% viewportu
    let textTransform = "";

    if (isLongEvent) {
      // Vypočítej, kde by měl být text relativně k události
      const eventStart = leftPx;
      const eventEnd = leftPx + widthPx;
      const viewportStart = scrollLeft + salsWidth; // Přičti šířku sloupce sálů
      const viewportEnd = scrollLeft + viewportWidth;

      // Pokud je událost částečně nebo úplně viditelná
      if (eventEnd > viewportStart && eventStart < viewportEnd) {
        // Najdi střed viditelné části události
        const visibleStart = Math.max(eventStart, viewportStart);
        const visibleEnd = Math.min(eventEnd, viewportEnd);
        const visibleCenter = (visibleStart + visibleEnd) / 2;

        // Pozicuj text na střed viditelné části
        const textOffset = visibleCenter - eventStart;
        const relativeOffset = textOffset - widthPx / 2; // Offset od původního středu

        textTransform = `translateX(${relativeOffset}px)`;
      }
    }

    return (
      <>
        <div
          class="group absolute bottom-1 top-1 z-10 flex cursor-pointer items-center justify-center rounded border p-1 text-xs font-semibold transition-all hover:z-20 hover:shadow-lg"
          onClick$={() => {
            isDialogOpen.value = true;
          }}
          style={`
            left: ${leftPx}px;
            width: ${widthPx}px;
            background-color: ${backgroundColor};
            border-color: ${borderColor};
            color: ${textColor};
          `}
        >
          <div class="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              aria-label="Editovat"
              class="rounded p-0.5 hover:bg-white hover:bg-opacity-50"
              onClick$={(e: any) => {
                e.stopPropagation();
                // Pro edit trigger - použijeme negative signal
                onEventChange.value = -Number(event.id);
              }}
              size="xs"
              type="button"
            >
              <ButtonLabelIcon as={EditIcon} standalone />
              <span class="sr-only">Editovat událost</span>
            </Button>
          </div>

          <div
            class="overflow-hidden text-center leading-tight"
            style={textTransform ? `transform: ${textTransform};` : ""}
          >
            {event.title}
          </div>
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
            {event.typ !== "svatek" && (
              <Button
                onClick$={() => {
                  isDialogOpen.value = false;
                  // Pro edit trigger - použijeme negative signal
                  onEventChange.value = -Number(event.id);
                }}
                severity="accent"
                type="button"
              >
                Upravit
              </Button>
            )}
          </DialogFooter>
        </Dialog>
      </>
    );
  },
);
