import type { QRL, Signal } from "@builder.io/qwik";

import { $, component$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpCalendarGridHeader } from "./ojp-calendar-grid-header";
import { OjpDaySection } from "./ojp-day-section";
import { useDragAndDrop } from "./ojp-drag-and-drop";

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
  onEventDrop$?: QRL<
    (eventId: string, separatorId: string | undefined, newDate: Date, newSal: OjpSal, newTime: Date) => void
  >;
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

    // Initialize drag & drop
    const { draggedEventId, draggedEventType, handleEventDrop, handleStartDrag } = useDragAndDrop({
      events,
      onEventDrop$,
      timeHourFrom,
    });

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
