import type { QRL, Signal } from "@builder.io/qwik";

import { Button } from "@akeso/ui-components";
import { component$, sync$, useSignal, useStyles$ } from "@builder.io/qwik";

import type { OjpEventPositioned } from "./_mock-events";

import { getSalInfo } from "./_mock-events";

const eventStyles = `
 .ojp-event {
   will-change: transform;
   backface-visibility: hidden;
   transform: translateZ(0);
   transition: all 0.15s ease-out;
 }
 
 .ojp-event.draggable {
   cursor: grab;
 }
 
 .ojp-event.draggable:hover {
   transform: translateY(-1px);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
 }
 
 .ojp-event.draggable:active {
   cursor: grabbing;
 }
 
 .ojp-event[data-being-dragged="true"] {
   z-index: 9999 !important;
   box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25) !important;
   transition: none !important;
   cursor: grabbing !important;
 }
 
 /* Global cursor během drag */
 body:has([data-being-dragged="true"]) {
   cursor: grabbing !important;
 }
 body:has([data-being-dragged="true"]) * {
   cursor: grabbing !important;
 }
`;

type OjpEventComponentProps = {
  draggedEventId: Signal<string>;
  event: OjpEventPositioned;
  intervalMinutes: number;
  intervalWidth: number;
  // ✅ ODSTRANĚNO: isDragging prop (nepoužíval se)
  onEventClick$?: QRL<(event: OjpEventPositioned) => void>;
  onMouseDrag$?: QRL<(eventId: string, eventType: string, mouseEvent: MouseEvent, element: HTMLElement) => void>;
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
    onEventClick$,
    onMouseDrag$,
    scrollLeft,
    timeHourFrom,
    viewportWidth,
  }) => {
    useStyles$(eventStyles);

    // ✅ PŘIDÁNO: Track mouse movement pro rozlišení click vs drag
    const mouseDownPos = useSignal<{ x: number; y: number } | null>(null);

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
        class="ojp-event draggable group absolute bottom-1 top-1 z-10 flex cursor-grab select-none items-center justify-center rounded border-2 p-1 text-xs font-semibold"
        data-being-dragged={isBeingDragged ? "true" : undefined}
        data-event-id={event.id}
        onClick$={(e) => {
          e.stopPropagation();

          // ✅ PŘIDÁNO: Kontrola jestli to byl skutečný klik (ne drag)
          if (mouseDownPos.value) {
            const distance = Math.sqrt(
              Math.pow(e.clientX - mouseDownPos.value.x, 2) + Math.pow(e.clientY - mouseDownPos.value.y, 2),
            );

            // Pokud se myš posunula o více než 5px, byl to drag, ne klik
            if (distance >= 5) {
              mouseDownPos.value = null;
              return;
            }
          }

          mouseDownPos.value = null;

          if (onEventClick$) {
            onEventClick$(event);
          }
        }}
        onMouseDown$={sync$((e: MouseEvent, target: HTMLElement) => {
          e.preventDefault();
          e.stopPropagation();

          // ✅ PŘIDÁNO: Zaznamenej start pozici
          mouseDownPos.value = { x: e.clientX, y: e.clientY };

          if (onMouseDrag$) {
            onMouseDrag$(event.id, event.typ, e, target);
          }
        })}
        onMouseUp$={sync$((e: MouseEvent) => {
          // ✅ PŘIDÁNO: Pokud mouseUp bez significant movement = možný klik
          if (mouseDownPos.value) {
            const distance = Math.sqrt(
              Math.pow(e.clientX - mouseDownPos.value.x, 2) + Math.pow(e.clientY - mouseDownPos.value.y, 2),
            );

            // Malý pohyb = byl to klik, ne drag
            if (distance < 5) {
              // onClick$ se zavolá automaticky
              return;
            }
          }

          // Větší pohyb = byl to drag, vyčisti pozici
          mouseDownPos.value = null;
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
