import type { QRL, Signal } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpStationRow } from "./ojp-station-row";

type OjpDaySectionProps = {
  date: Date;
  dayIndex: number;
  dayName: string;
  // ✅ Přidáme draggedEventId
  draggedEventId: Signal<string>;
  draggedEventType: Signal<string>;
  dropPreview: Signal<{ date: Date; sal: OjpSal; slotIndex: number } | null>;
  events: OjpEventPositioned[];
  onEventClick$?: QRL<(event: any) => void>;
  onEventDrop$: QRL<(eventId: string, date: Date, sal: OjpSal, slotIndex: number) => void>;
  onSlotDoubleClick$: QRL<(date: Date, sal: OjpSal, slotIndex: number) => void>;
  rowHeight: number;
  salsWidth: number;
  saly: OjpSalInfo[];
  scrollLeft: number;
  slotWidth: number;
  timeHourFrom: number;
  totalGridWidth: number;
  totalSlots: number;
  validSlots: Set<string>;
  viewportWidth: number;
};

export const OjpDaySection = component$<OjpDaySectionProps>(
  ({
    date,
    dayIndex,
    dayName,
    draggedEventId,
    draggedEventType,
    dropPreview,
    events,
    onEventClick$,
    onEventDrop$,
    onSlotDoubleClick$,
    rowHeight,
    salsWidth,
    saly,
    scrollLeft,
    slotWidth,
    timeHourFrom,
    totalGridWidth,
    totalSlots,
    validSlots,
    viewportWidth,
  }) => {
    const getVykonyCount = (salName: OjpSal): number => {
      return events.filter(
        (event) =>
          event.dateFrom.toDateString() === date.toDateString() && event.sal === salName && event.typ === "operace",
      ).length;
    };

    return (
      <>
        {/* Day header */}
        <div
          class="grid border-b border-gray-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
          style={`grid-template-columns: ${salsWidth}px 1fr; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
        >
          <div class="sticky left-0 z-20 flex items-center justify-center border-r-2 border-blue-400 bg-gradient-to-r from-blue-600 to-blue-700 font-bold">
            {dayName} {date.toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit" })}
          </div>
          <div class="border-r border-blue-400"></div>
        </div>

        {/* Station rows for this day */}
        {saly.map((sal) => {
          const rowEvents = events.filter(
            (event) => event.dateFrom.toDateString() === date.toDateString() && event.sal === sal.name,
          );
          const vykonyCount = getVykonyCount(sal.name);

          return (
            <OjpStationRow
              date={date}
              draggedEventId={draggedEventId}
              draggedEventType={draggedEventType}
              dropPreview={dropPreview}
              key={`sal-${dayIndex}-${sal.name}`}
              onEventClick$={onEventClick$}
              onEventDrop$={onEventDrop$}
              onSlotDoubleClick$={onSlotDoubleClick$}
              rowEvents={rowEvents}
              rowHeight={rowHeight}
              sal={sal}
              salsWidth={salsWidth}
              scrollLeft={scrollLeft}
              slotWidth={slotWidth}
              timeHourFrom={timeHourFrom}
              totalGridWidth={totalGridWidth}
              totalSlots={totalSlots}
              validSlots={validSlots}
              viewportWidth={viewportWidth}
              vykonyCount={vykonyCount}
            />
          );
        })}
      </>
    );
  },
);
