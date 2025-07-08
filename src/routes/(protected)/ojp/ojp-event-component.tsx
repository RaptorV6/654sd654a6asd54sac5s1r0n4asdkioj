// src/routes/(protected)/ojp/ojp-event-component.tsx
import type { QRL } from "@builder.io/qwik";

import { Button, ButtonLabelIcon } from "@akeso/ui-components";
import { component$, sync$ } from "@builder.io/qwik";

import { EditIcon } from "~/components/icons-outline";

import type { OjpEventPositioned } from "./_mock-events";

import { getSalInfo } from "./_mock-events";

type OjpEventComponentProps = {
  event: OjpEventPositioned;
  intervalMinutes: number;
  intervalWidth: number;
  isDragging?: boolean;
  onEventClick$?: QRL<(event: OjpEventPositioned) => void>;
  scrollLeft: number;
  timeHourFrom: number;
  viewportWidth: number;
};

export const OjpEventComponent = component$<OjpEventComponentProps>(
  ({ event, intervalMinutes, intervalWidth, isDragging, onEventClick$, scrollLeft, timeHourFrom, viewportWidth }) => {
    // Pozicování v 5-minutových intervalech
    const startTotalMinutes = (event.dateFrom.getHours() - timeHourFrom) * 60 + event.dateFrom.getMinutes();
    const endTotalMinutes = (event.dateTo.getHours() - timeHourFrom) * 60 + event.dateTo.getMinutes();

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
      event.title.includes("OBĚDOVÁ") ||
      event.title.includes("DOVOLENÁ") ||
      event.title.includes("JINÉ") ||
      event.title.includes("MIMO PROVOZ") ||
      event.title.includes("STÁTNÍ SVÁTEK") ||
      event.title.includes("TECHNICKÁ PAUZA")
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
        class={`
          ojp-event-component group absolute bottom-1 top-1 z-10 flex cursor-move select-none items-center justify-center rounded border-2 p-1 
          text-xs font-semibold transition-all duration-200 hover:z-20 hover:shadow-md
          ${isDragging ? "ojp-event-dragging" : "hover:shadow-lg"}
        `}
        draggable={true} // 🔧 OPRAVA: boolean místo string
        onClick$={(e) => {
          e.stopPropagation();
          if (onEventClick$) {
            onEventClick$(event);
          }
        }}
        onDragEnd$={sync$((e: DragEvent) => {
          // Reset styling po drag
          const target = e.target as HTMLElement;
          target.style.opacity = "";
          target.style.boxShadow = "";
          target.style.zIndex = "";
        })}
        onDragStart$={sync$((e: DragEvent) => {
          const dragData = {
            eventId: event.id,
            originalDate: event.dateFrom.toISOString(),
            originalSal: event.sal,
            title: event.title,
            type: "ojp-event",
          };

          e.dataTransfer!.setData("application/json", JSON.stringify(dragData));
          e.dataTransfer!.effectAllowed = "move";

          // Jemná animace bez rotace
          const target = e.target as HTMLElement;
          target.style.opacity = "0.6";
          target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          target.style.zIndex = "9999";
        })}
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
          class="pointer-events-none overflow-hidden text-center leading-tight"
          style={textTransform ? `transform: ${textTransform};` : ""}
        >
          {event.title}
        </div>
      </div>
    );
  },
);
