import type { QRL } from "@builder.io/qwik";

import { Button, ButtonLabelIcon } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { EditIcon } from "~/components/icons-outline";

import type { OjpEventPositioned } from "./_mock-events";

import { getSalInfo } from "./_mock-events";

type OjpEventComponentProps = {
  event: OjpEventPositioned;
  intervalMinutes: number;
  intervalWidth: number;
  onEventClick$?: QRL<(event: OjpEventPositioned) => void>;
  scrollLeft: number;
  timeHourFrom: number;
  viewportWidth: number;
};

export const OjpEventComponent = component$<OjpEventComponentProps>(
  ({ event, intervalMinutes, intervalWidth, onEventClick$, scrollLeft, timeHourFrom, viewportWidth }) => {
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
      backgroundColor = "#e5e7eb";
      borderColor = "#9ca3af";
      textColor = "#374151";
    } else if (
      event.typ === "uklid" ||
      event.typ === "pauza" ||
      event.title.includes("ÚS") ||
      event.title.includes("OBĚDOVÁ")
    ) {
      backgroundColor = "#e5e7eb";
      borderColor = "#9ca3af";
    } else {
      backgroundColor = salInfo.bgColor;
      borderColor = salInfo.color;
    }

    // Logika pro dynamické pozicování textu
    const isLongEvent = widthPx > viewportWidth * 0.6;
    let textTransform = "";

    if (isLongEvent) {
      const eventStart = leftPx;
      const eventEnd = leftPx + widthPx;
      const viewportStart = scrollLeft + salsWidth;
      const viewportEnd = scrollLeft + viewportWidth;

      if (eventEnd > viewportStart && eventStart < viewportEnd) {
        const visibleStart = Math.max(eventStart, viewportStart);
        const visibleEnd = Math.min(eventEnd, viewportEnd);
        const visibleCenter = (visibleStart + visibleEnd) / 2;
        const textOffset = visibleCenter - eventStart;
        const relativeOffset = textOffset - widthPx / 2;
        textTransform = `translateX(${relativeOffset}px)`;
      }
    }

    return (
      <div
        class="group absolute bottom-1 top-1 z-10 flex cursor-pointer items-center justify-center rounded border p-1 text-xs font-semibold transition-all hover:z-20 hover:shadow-lg"
        onClick$={() => {
          if (onEventClick$) {
            onEventClick$(event);
          }
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
              if (onEventClick$) {
                onEventClick$(event);
              }
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
    );
  },
);
