import type { QRL, Signal } from "@builder.io/qwik";

import { Button } from "@akeso/ui-components";
import { component$, sync$, useStyles$ } from "@builder.io/qwik";

import type { OjpEventPositioned } from "./_mock-events";

import { getSalInfo } from "./_mock-events";

const eventStyles = `
 .ojp-event {
   will-change: transform, opacity;
   backface-visibility: hidden;
   transform: translateZ(0);
 }
 
 .ojp-event.draggable {
   cursor: grab;
   transition: all 0.15s ease-out;
 }
 
 .ojp-event.draggable:hover {
   transform: translateY(-1px);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
 }
 
 .ojp-event.draggable:active {
   cursor: grabbing;
   transform: scale(1.02);
 }
 
 .ojp-event.dragging {
   opacity: 0.7;
   transform: scale(1.05);
   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
   z-index: 9999;
   transition: none;
 }
 
 .ojp-event[data-being-dragged="true"] {
   opacity: 0.3 !important;
   pointer-events: none !important;
   z-index: 1 !important;
   filter: grayscale(50%) !important;
 }
 
 .ojp-event-operace.draggable::before {
   content: "⋮⋮";
   position: absolute;
   left: 2px;
   top: 50%;
   transform: translateY(-50%);
   color: rgba(0, 0, 0, 0.3);
   font-size: 8px;
   line-height: 0.8;
   letter-spacing: -1px;
 }
`;

type OjpEventComponentProps = {
  draggedEventId: Signal<string>;
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
  ({
    draggedEventId,
    event,
    intervalMinutes,
    intervalWidth,
    isDragging,
    onEventClick$,
    scrollLeft,
    timeHourFrom,
    viewportWidth,
  }) => {
    useStyles$(eventStyles);

    const startTotalMinutes = (event.dateFrom.getHours() - timeHourFrom) * 60 + event.dateFrom.getMinutes();
    const endTotalMinutes = (event.dateTo.getHours() - timeHourFrom) * 60 + event.dateTo.getMinutes();

    const salsWidth = 140;
    const startInterval = startTotalMinutes / intervalMinutes;
    const endInterval = endTotalMinutes / intervalMinutes;

    const leftPx = salsWidth + startInterval * intervalWidth;
    const widthPx = (endInterval - startInterval) * intervalWidth;

    const salInfo = getSalInfo(event.sal);

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

    const isBeingDragged = draggedEventId.value === event.id;

    return (
      <div
        class={`
         ojp-event draggable group absolute bottom-1 top-1 z-10 flex cursor-grab select-none items-center justify-center rounded border-2 p-1
         text-xs font-semibold hover:cursor-grab active:cursor-grabbing
         ${isDragging ? "dragging" : ""}
       `}
        data-being-dragged={isBeingDragged ? "true" : undefined}
        draggable={true}
        onClick$={(e) => {
          e.stopPropagation();
          if (onEventClick$) {
            onEventClick$(event);
          }
        }}
        onDragEnd$={sync$(() => {
          draggedEventId.value = "";
        })}
        onDragStart$={sync$((e: DragEvent) => {
          draggedEventId.value = event.id;

          const dragData = {
            eventId: event.id,
            eventType: event.typ,
            originalDate: event.dateFrom.toISOString(),
            originalSal: event.sal,
            title: event.title,
            type: "ojp-event",
          };

          e.dataTransfer!.setData("application/json", JSON.stringify(dragData));
          e.dataTransfer!.effectAllowed = "move";
        })}
        style={`
        left: ${leftPx}px;
        width: ${widthPx}px;
        background-color: ${backgroundColor};
        border-color: ${borderColor};
        color: ${textColor};
      `}
        title="Táhněte pro přesun události"
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
          ></Button>
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
