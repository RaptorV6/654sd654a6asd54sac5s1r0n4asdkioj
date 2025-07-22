import type { QRL, Signal } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

type OjpStationRowProps = {
  date: Date;
  draggedEventId: Signal<string>;
  draggedEventType: Signal<string>;
  onEventClick$?: QRL<(event: any) => void>;
  onEventDrop$: QRL<
    (eventId: string, separatorId: string | undefined, date: Date, sal: OjpSal, slotIndex: number) => void
  >;
  onSlotDoubleClick$: QRL<(date: Date, sal: OjpSal, slotIndex: number) => void>;
  onStartDrag$: QRL<
    (eventId: string, eventType: string, startPos: { x: number; y: number }, element: HTMLElement) => void
  >;
  rowEvents: OjpEventPositioned[];
  rowHeight: number;
  sal: OjpSalInfo;
  salsWidth: number;
  scrollLeft: number;
  slotWidth: number;
  timeHourFrom: number;
  totalGridWidth: number;
  totalSlots: number;
  viewportWidth: number;
  vykonyCount: number;
};

export const OjpStationRow = component$<OjpStationRowProps>(
  ({
    date,
    draggedEventId,
    onEventClick$,

    onSlotDoubleClick$,
    onStartDrag$,
    rowEvents,
    rowHeight,
    sal,
    salsWidth,
    scrollLeft,
    slotWidth,
    timeHourFrom,
    totalGridWidth,
    totalSlots,

    viewportWidth,
    vykonyCount,
  }) => {
    const minutesGridTemplate = `${salsWidth}px repeat(${totalSlots}, ${slotWidth}px)`;

    return (
      <div
        class="relative grid border-b border-gray-200"
        style={`grid-template-columns: ${minutesGridTemplate}; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
      >
        {/* Station header */}
        <div
          class="sticky left-0 z-20 flex items-center justify-center border-r-2 border-gray-300 text-xs"
          style={`background-color: ${sal.bgColor}; color: ${sal.color};`}
        >
          <div class="text-center">
            <div class="font-semibold">{sal.displayName}</div>
            <div class="text-xs opacity-75">{vykonyCount} výkonů</div>
          </div>
        </div>

        {/* Time slots with drop detection data */}
        {Array.from({ length: totalSlots }, (_, slotIndex) => (
          <div
            class="relative cursor-pointer border-r border-gray-200 transition-colors duration-75 hover:bg-blue-50"
            data-date={date.toISOString()}
            data-drop-slot="true"
            data-sal={sal.name}
            data-slot-index={slotIndex}
            key={`slot-${slotIndex}`}
            onDblClick$={() => {
              onSlotDoubleClick$(date, sal.name, slotIndex);
            }}
            title="Poklepejte pro přidání události nebo přetáhněte událost"
          ></div>
        ))}

        {/* Events */}
        {rowEvents.map((event) => (
          <OjpEventComponent
            draggedEventId={draggedEventId}
            event={event}
            intervalMinutes={5}
            intervalWidth={slotWidth}
            key={event.id}
            onEventClick$={onEventClick$}
            onStartDrag$={onStartDrag$}
            scrollLeft={scrollLeft}
            timeHourFrom={timeHourFrom}
            viewportWidth={viewportWidth}
          />
        ))}
      </div>
    );
  },
);
