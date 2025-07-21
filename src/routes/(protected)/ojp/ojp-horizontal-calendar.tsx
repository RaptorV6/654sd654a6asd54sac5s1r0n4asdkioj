import type { QRL, Signal } from "@builder.io/qwik";

import { useToaster } from "@akeso/ui-components";
import { $, component$, useComputed$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpCalendarGridHeader } from "./ojp-calendar-grid-header";
import { OjpDaySection } from "./ojp-day-section";

const calendarStyles = `
  .ojp-time-slot {
    will-change: transform;
    backface-visibility: hidden;
    transform: translateZ(0);
  }
  
  .ojp-drop-valid {
    background: linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.25)) !important;
    border: 2px dashed #22c55e !important;
    animation: pulse-valid 0.8s ease-in-out infinite alternate;
    transform: scale(1.02);
  }
  
  .ojp-drop-invalid {
    background: linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.25)) !important;
    border: 2px dashed #ef4444 !important;
    animation: pulse-invalid 0.8s ease-in-out infinite alternate;
    transform: scale(1.02);
  }
  
  @keyframes pulse-valid {
    from { 
      background-color: rgba(34, 197, 94, 0.1);
      box-shadow: 0 0 0 rgba(34, 197, 94, 0.4);
    }
    to { 
      background-color: rgba(34, 197, 94, 0.25);
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
    }
  }
  
  @keyframes pulse-invalid {
    from { 
      background-color: rgba(239, 68, 68, 0.1);
      box-shadow: 0 0 0 rgba(239, 68, 68, 0.4);
    }
    to { 
      background-color: rgba(239, 68, 68, 0.25);
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
    }
  }
  
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
    const { toastError$ } = useToaster();
    const dayNames = ["PONDĚLÍ", "ÚTERÝ", "STŘEDA", "ČTVRTEK", "PÁTEK"];

    const slotWidth = 24;
    const totalSlots = times.length * 12;
    const salsWidth = 140;
    const rowHeight = 40;

    const scrollContainerRef = useSignal<HTMLDivElement>();
    const scrollLeft = useSignal(0);
    const viewportWidth = useSignal(800);

    // Jednoduchý drag state
    const dragState = useSignal<{
      dragElement: HTMLElement;
      eventId: string;
      eventType: string;
      startPos: { x: number; y: number };
    } | null>(null);

    const dropPreview = useSignal<{ date: Date; sal: OjpSal; slotIndex: number } | null>(null);
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

    const validSlots = useComputed$(() => {
      const valid = new Set<string>();

      dates.forEach((date) => {
        saly.forEach((sal) => {
          const rowEvents = events
            .filter((event) => event.dateFrom.toDateString() === date.date.toDateString() && event.sal === sal.name)
            .sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());

          for (let slot = 0; slot < totalSlots; slot++) {
            const slotMinutes = slot * 5;
            const slotHours = timeHourFrom + Math.floor(slotMinutes / 60);
            const slotMins = slotMinutes % 60;
            const slotTime = new Date(date.date);
            slotTime.setHours(slotHours, slotMins, 0, 0);

            const endingEvent = rowEvents.find(
              (event) => Math.abs(event.dateTo.getTime() - slotTime.getTime()) < 30000,
            );

            const isValid =
              (!endingEvent && slot === 0) ||
              (endingEvent && (endingEvent.typ === "uklid" || endingEvent.typ === "pauza"));

            if (isValid) {
              valid.add(`${date.date.toDateString()}-${sal.name}-${slot}`);
            }
          }
        });
      });

      return valid;
    });

    // Global mouse tracking - POUZE když dragState existuje
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

          // Hit detection
          const elementsUnderMouse = document.elementsFromPoint(e.clientX, e.clientY);
          const dropSlot = elementsUnderMouse.find((el) => el.hasAttribute("data-drop-slot"));

          if (dropSlot) {
            const date = new Date(dropSlot.getAttribute("data-date") || "");
            const sal = dropSlot.getAttribute("data-sal") as OjpSal;
            const slotIndex = parseInt(dropSlot.getAttribute("data-slot-index") || "0");

            if (dragState.value.eventType === "operace") {
              const snapTargets = [slotIndex - 1, slotIndex, slotIndex + 1];
              const validSnap = snapTargets.find(
                (slot) =>
                  slot >= 0 && slot < totalSlots && validSlots.value.has(`${date.toDateString()}-${sal}-${slot}`),
              );

              if (validSnap !== undefined) {
                dropPreview.value = { date, sal, slotIndex: validSnap };
              } else {
                dropPreview.value = null;
              }
            } else {
              dropPreview.value = { date, sal, slotIndex };
            }
          } else {
            dropPreview.value = null;
          }
        });

        const handleGlobalMouseUp = $(() => {
          if (!dragState.value) return;

          const dropTarget = dropPreview.value;
          const eventId = dragState.value.eventId;

          // Cleanup styling
          dragState.value.dragElement.style.transform = "";
          dragState.value.dragElement.removeAttribute("data-being-dragged");

          // Clear state FIRST
          dragState.value = null;
          draggedEventId.value = "";
          draggedEventType.value = "";
          dropPreview.value = null;

          // Handle drop
          if (dropTarget && onEventDrop$) {
            handleEventDrop(eventId, dropTarget.date, dropTarget.sal, dropTarget.slotIndex);
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

        dragState.value = {
          dragElement: element,
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

    const handleEventDrop = $((eventId: string, date: Date, sal: OjpSal, slotIndex: number) => {
      if (onEventDrop$) {
        const minutesFromStart = slotIndex * 5;
        const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
        const minutes = minutesFromStart % 60;

        const newTime = new Date(date);
        newTime.setHours(hours, minutes, 0, 0);

        const draggedEvent = events.find((evt) => evt.id === eventId);
        if (!draggedEvent) return;

        const newStartTime = newTime;
        const newEndTime = new Date(newStartTime.getTime() + draggedEvent.duration * 60 * 1000);

        const rowEvents = events.filter(
          (event) => event.dateFrom.toDateString() === date.toDateString() && event.sal === sal && event.id !== eventId,
        );

        const overlapping = rowEvents.find((event) => {
          return newStartTime < event.dateTo && newEndTime > event.dateFrom;
        });

        if (overlapping) {
          toastError$("Událost se překrývá s jinou", { duration: 3000 });
          return;
        }

        onEventDrop$(eventId, date, sal, newTime);
      }
    });

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
                  dropPreview={dropPreview}
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
                  validSlots={validSlots.value}
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
