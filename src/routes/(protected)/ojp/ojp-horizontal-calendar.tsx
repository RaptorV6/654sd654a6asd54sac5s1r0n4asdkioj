import type { QRL, Signal } from "@builder.io/qwik";

import { $, component$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpCalendarGridHeader } from "./ojp-calendar-grid-header";
import { OjpDaySection } from "./ojp-day-section";

const calendarStyles = `
  .ojp-calendar-grid {
    contain: layout style paint;
  }
`;

type OjpHorizontalCalendarProps = {
  dates: { date: Date }[];
  events: OjpEventPositioned[];
  newEventTrigger: Signal<{ dateTime: Date; forceOtherSlots?: boolean; sal: OjpSal } | null>;
  onEventClick$?: QRL<(event: any) => void>;
  onEventDrop$?: QRL<(eventId: string, newDate: Date, newSal: OjpSal, newTime: Date) => void>;
  saly: OjpSalInfo[];
  timeHourFrom: number;
  times: { time: Date }[];
};

export const OjpHorizontalCalendar = component$<OjpHorizontalCalendarProps>(
  ({ dates, events, newEventTrigger, onEventClick$, onEventDrop$, saly, timeHourFrom, times }) => {
    useStyles$(calendarStyles);
    const dayNames = ["PONDĚLÍ", "ÚTERÝ", "STŘEDA", "ČTVRTEK", "PÁTEK"];

    const slotWidth = 24;
    const totalSlots = times.length * 12;
    const salsWidth = 140;
    const rowHeight = 40;

    const scrollContainerRef = useSignal<HTMLDivElement>();
    const scrollLeft = useSignal(0);
    const viewportWidth = useSignal(800);

    // Drag state
    const dragState = useSignal<{
      dragElement: HTMLElement;
      elementOffset?: { x: number; y: number };
      eventId: string;
      eventType: string;
      startPos: { x: number; y: number };
    } | null>(null);

    const draggedEventId = useSignal<string>("");
    const draggedEventType = useSignal<string>("");

    useTask$(({ track }) => {
      track(() => scrollContainerRef.value);
      if (scrollContainerRef.value) {
        viewportWidth.value = scrollContainerRef.value.clientWidth;
      }
    });

    const handleScroll = $((e: Event) => {
      const target = e.target as HTMLDivElement;
      scrollLeft.value = target.scrollLeft;
    });

    const totalGridWidth = salsWidth + totalSlots * slotWidth;

    // Global mouse tracking
    useTask$(({ cleanup, track }) => {
      const currentDragState = track(() => dragState.value);

      if (currentDragState) {
        draggedEventId.value = currentDragState.eventId;
        draggedEventType.value = currentDragState.eventType;

        const handleGlobalMouseMove = $((e: MouseEvent) => {
          if (!dragState.value) return;

          const deltaX = e.clientX - dragState.value.startPos.x;
          const deltaY = e.clientY - dragState.value.startPos.y;

          dragState.value.dragElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

          // ✅ HIT DETECTION BASED ON ELEMENT LEFT EDGE, NOT MOUSE
          const elementRect = dragState.value.dragElement.getBoundingClientRect();
          const elementLeftX = elementRect.left;
          const elementCenterY = elementRect.top + elementRect.height / 2;

          const elementsUnderElement = document.elementsFromPoint(elementLeftX, elementCenterY);
          const dropSlot = elementsUnderElement.find((el) => el.hasAttribute("data-drop-slot"));

          // ✅ PŘIDAT BORDER VALIDATION
          dragState.value.dragElement.setAttribute("data-drop-invalid", dropSlot ? "false" : "true");
        });

        const handleGlobalMouseUp = $(() => {
          if (!dragState.value) return;

          const eventId = dragState.value.eventId;

          // ✅ DROP DETECTION ON MOUSEUP
          const elementRect = dragState.value.dragElement.getBoundingClientRect();
          const elementLeftX = elementRect.left;
          const elementCenterY = elementRect.top + elementRect.height / 2;
          const elementsUnderElement = document.elementsFromPoint(elementLeftX, elementCenterY);
          const dropSlot = elementsUnderElement.find((el) => el.hasAttribute("data-drop-slot"));

          // Cleanup styling
          dragState.value.dragElement.style.transform = "";
          dragState.value.dragElement.removeAttribute("data-being-dragged");
          dragState.value.dragElement.removeAttribute("data-drop-invalid");

          // Clear state FIRST
          dragState.value = null;
          draggedEventId.value = "";
          draggedEventType.value = "";

          // Handle drop
          if (dropSlot && onEventDrop$) {
            const date = new Date(dropSlot.getAttribute("data-date") || "");
            const sal = dropSlot.getAttribute("data-sal") as OjpSal;
            const slotIndex = parseInt(dropSlot.getAttribute("data-slot-index") || "0");

            const minutesFromStart = slotIndex * 5;
            const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
            const minutes = minutesFromStart % 60;

            const newTime = new Date(date);
            newTime.setHours(hours, minutes, 0, 0);

            onEventDrop$(eventId, date, sal, newTime);
          }
        });

        document.addEventListener("mousemove", handleGlobalMouseMove);
        document.addEventListener("mouseup", handleGlobalMouseUp);

        cleanup(() => {
          document.removeEventListener("mousemove", handleGlobalMouseMove);
          document.removeEventListener("mouseup", handleGlobalMouseUp);
        });
      } else {
        draggedEventId.value = "";
        draggedEventType.value = "";
      }
    });

    const handleStartDrag = $(
      (eventId: string, eventType: string, startPos: { x: number; y: number }, element: HTMLElement) => {
        element.setAttribute("data-being-dragged", "true");

        // ✅ ZÍSKEJ OFFSET OD ZAČÁTKU ELEMENTU
        const elementRect = element.getBoundingClientRect();
        const offsetX = startPos.x - elementRect.left;
        const offsetY = startPos.y - elementRect.top;

        dragState.value = {
          dragElement: element,
          elementOffset: { x: offsetX, y: offsetY },
          eventId,
          eventType,
          startPos,
        };
      },
    );

    const handleSlotDoubleClick = $((date: Date, sal: OjpSal, slotIndex: number) => {
      const minutesFromStart = slotIndex * 5;
      const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
      const minutes = minutesFromStart % 60;

      const newDateTime = new Date(date);
      newDateTime.setHours(hours, minutes, 0, 0);

      const existingOperations = events.filter(
        (event) =>
          event.dateFrom.toDateString() === date.toDateString() && event.sal === sal && event.typ === "operace",
      );

      const shouldForceOtherSlots = existingOperations.length > 0;

      newEventTrigger.value = {
        dateTime: newDateTime,
        forceOtherSlots: shouldForceOtherSlots,
        sal,
      };
    });

    // ✅ MISSING EVENT DROP HANDLER
    const handleEventDrop = $((eventId: string, date: Date, sal: OjpSal, slotIndex: number) => {
      if (onEventDrop$) {
        const minutesFromStart = slotIndex * 5;
        const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
        const minutes = minutesFromStart % 60;

        const newTime = new Date(date);
        newTime.setHours(hours, minutes, 0, 0);

        onEventDrop$(eventId, date, sal, newTime);
      }
    });

    // ✅ MISSING RETURN STATEMENT
    return (
      <div class="flex h-full flex-col">
        <div class="flex-1 overflow-auto" onScroll$={handleScroll} ref={scrollContainerRef}>
          <div class="ojp-calendar-grid" style={`min-width: ${totalGridWidth}px; width: 100%;`}>
            <OjpCalendarGridHeader
              rowHeight={rowHeight}
              salsWidth={salsWidth}
              slotWidth={slotWidth}
              times={times}
              totalGridWidth={totalGridWidth}
              totalSlots={totalSlots}
            />

            <div style={`min-width: ${totalGridWidth}px;`}>
              {dates.map((date, dayIndex) => (
                <OjpDaySection
                  date={date.date}
                  dayIndex={dayIndex}
                  dayName={dayNames[dayIndex] || dayNames[0]}
                  draggedEventId={draggedEventId}
                  draggedEventType={draggedEventType}
                  events={events}
                  key={`day-${dayIndex}`}
                  onEventClick$={onEventClick$}
                  onEventDrop$={handleEventDrop}
                  onSlotDoubleClick$={handleSlotDoubleClick}
                  onStartDrag$={handleStartDrag}
                  rowHeight={rowHeight}
                  salsWidth={salsWidth}
                  saly={saly}
                  scrollLeft={scrollLeft.value}
                  slotWidth={slotWidth}
                  timeHourFrom={timeHourFrom}
                  totalGridWidth={totalGridWidth}
                  totalSlots={totalSlots}
                  viewportWidth={viewportWidth.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
