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
  
  .ojp-sal-header {
    contain: layout style;
  }
  
  .ojp-drag-ghost {
    position: absolute;
    top: -1000px;
    left: -1000px;
    opacity: 0.8;
    transform: rotate(3deg);
    pointer-events: none;
    z-index: 9999;
    padding: 8px 12px;
    background: rgba(59, 130, 246, 0.9);
    color: white;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
    const draggedEventId = useSignal<string>("");
    const dropPreview = useSignal<{ date: Date; sal: OjpSal; slotIndex: number } | null>(null);
    const draggedEventType = useSignal<string>("");
    const dragGhostRef = useSignal<HTMLDivElement>();

    const validationResults = useSignal<Map<string, boolean>>(new Map());

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

        // Detailní validace zde...
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
      draggedEventId.value = "";
      dropPreview.value = null;
      draggedEventType.value = "";
    });

    return (
      <div class="flex h-full flex-col">
        <div class="ojp-drag-ghost" id="drag-ghost" ref={dragGhostRef}>
          📅 Přesouvám událost...
        </div>

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
                  draggedEventType={draggedEventType}
                  dropPreview={dropPreview}
                  events={events}
                  key={`day-${dayIndex}`}
                  onEventClick$={onEventClick$}
                  onEventDrop$={handleEventDrop}
                  onSlotDoubleClick$={handleSlotDoubleClick}
                  rowHeight={rowHeight}
                  salsWidth={salsWidth}
                  saly={saly}
                  scrollLeft={scrollLeft.value}
                  slotWidth={slotWidth}
                  timeHourFrom={timeHourFrom}
                  totalGridWidth={totalGridWidth}
                  totalSlots={totalSlots}
                  validationResults={validationResults}
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
