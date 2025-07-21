import type { QRL, Signal } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

type OjpStationRowProps = {
  date: Date;
  draggedEventId: Signal<string>;
  draggedEventType: Signal<string>;
  dropPreview: Signal<{ date: Date; sal: OjpSal; slotIndex: number } | null>;
  onEventClick$?: QRL<(event: any) => void>;
  onEventDrop$: QRL<(eventId: string, date: Date, sal: OjpSal, slotIndex: number) => void>;
  onMouseDrag$: QRL<(eventId: string, eventType: string, mouseEvent: MouseEvent, element: HTMLElement) => void>;
  onSlotDoubleClick$: QRL<(date: Date, sal: OjpSal, slotIndex: number) => void>;
  rowEvents: OjpEventPositioned[];
  rowHeight: number;
  sal: OjpSalInfo;
  salsWidth: number;
  scrollLeft: number;
  slotWidth: number;
  timeHourFrom: number;
  totalGridWidth: number;
  totalSlots: number;
  validSlots: Set<string>;
  viewportWidth: number;
  vykonyCount: number;
};

export const OjpStationRow = component$<OjpStationRowProps>(
  ({
    date,
    draggedEventId,
    // ✅ OPRAVENO: Použiju draggedEventType (byl nepoužitý)
    draggedEventType,
    dropPreview,
    onEventClick$,
    // ✅ OPRAVENO: Odstranil nepoužitý onEventDrop$ - logika je v handleMouseDrag
    onMouseDrag$,
    onSlotDoubleClick$,
    rowEvents,
    rowHeight,
    sal,
    salsWidth,
    scrollLeft,
    slotWidth,
    timeHourFrom,
    totalGridWidth,
    totalSlots,
    validSlots,
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
        {Array.from({ length: totalSlots }, (_, slotIndex) => {
          const validationKey = `${date.toDateString()}-${sal.name}-${slotIndex}`;
          const isValid = validSlots.has(validationKey);

          const isDropPreview =
            dropPreview.value &&
            dropPreview.value.date.toDateString() === date.toDateString() &&
            dropPreview.value.sal === sal.name &&
            dropPreview.value.slotIndex === slotIndex;

          // ✅ POUŽIJU draggedEventType pro určení typu validace
          const isDraggedOperace = draggedEventType.value === "operace";

          return (
            <div
              class={`
                relative cursor-pointer border-r border-gray-200 transition-all duration-200
                hover:bg-blue-100 hover:bg-opacity-50
                ${isDropPreview ? (isValid ? "ojp-drop-valid" : "ojp-drop-invalid") : ""}
              `}
              data-date={date.toISOString()}
              data-drop-slot="true"
              data-sal={sal.name}
              data-slot-index={slotIndex}
              key={`slot-${slotIndex}`}
              onDblClick$={() => {
                onSlotDoubleClick$(date, sal.name, slotIndex);
              }}
              title="Poklepejte pro přidání události nebo přetáhněte událost"
            >
              {isDropPreview && (
                <div class="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
                  <div
                    class={`rounded border px-2 py-1 text-xs font-bold shadow-lg ${
                      isValid ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"
                    }`}
                  >
                    {isValid ? "✓ Přesunout zde" : isDraggedOperace ? "✗ Operace musí mít mezeru" : "✗ Neplatné místo"}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Events */}
        {rowEvents.map((event) => (
          <OjpEventComponent
            draggedEventId={draggedEventId}
            event={event}
            intervalMinutes={5}
            intervalWidth={slotWidth}
            key={event.id}
            onEventClick$={onEventClick$}
            onMouseDrag$={onMouseDrag$}
            scrollLeft={scrollLeft}
            timeHourFrom={timeHourFrom}
            viewportWidth={viewportWidth}
          />
        ))}
      </div>
    );
  },
);
