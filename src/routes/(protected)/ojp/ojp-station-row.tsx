import type { QRL, Signal } from "@builder.io/qwik";

import { component$, sync$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

type OjpStationRowProps = {
  date: Date;
  // ✅ Přidáme draggedEventId
  draggedEventId: Signal<string>;
  draggedEventType: Signal<string>;
  dropPreview: Signal<{ date: Date; sal: OjpSal; slotIndex: number } | null>;
  onEventClick$?: QRL<(event: any) => void>;
  onEventDrop$: QRL<(eventId: string, date: Date, sal: OjpSal, slotIndex: number) => void>;
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
    draggedEventType,
    dropPreview,
    onEventClick$,
    onEventDrop$,
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

        {/* Time slots */}
        {Array.from({ length: totalSlots }, (_, slotIndex) => {
          const validationKey = `${date.toDateString()}-${sal.name}-${slotIndex}`;
          const isValid = validSlots.has(validationKey);

          const isDropPreview =
            dropPreview.value &&
            dropPreview.value.date.toDateString() === date.toDateString() &&
            dropPreview.value.sal === sal.name &&
            dropPreview.value.slotIndex === slotIndex;

          return (
            <div
              class={`
                relative cursor-pointer border-r border-gray-200 transition-all duration-200
                hover:bg-blue-100 hover:bg-opacity-50
                ${isDropPreview ? (isValid ? "ojp-drop-valid" : "ojp-drop-invalid") : ""}
              `}
              key={`slot-${slotIndex}`}
              onDblClick$={() => {
                onSlotDoubleClick$(date, sal.name, slotIndex);
              }}
              onDragLeave$={sync$((e: DragEvent) => {
                const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;

                if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                  dropPreview.value = null;
                }
              })}
              onDragOver$={sync$(() => {
                if (draggedEventType.value === "operace") {
                  const snapTargets = [slotIndex - 1, slotIndex, slotIndex + 1];
                  const validSnap = snapTargets.find(
                    (slot) =>
                      slot >= 0 && slot < totalSlots && validSlots.has(`${date.toDateString()}-${sal.name}-${slot}`),
                  );

                  if (validSnap !== undefined) {
                    dropPreview.value = {
                      date: date,
                      sal: sal.name,
                      slotIndex: validSnap,
                    };
                    return;
                  }
                }
                if (draggedEventType.value) {
                  dropPreview.value = {
                    date: date,
                    sal: sal.name,
                    slotIndex,
                  };
                }
              })}
              onDrop$={sync$((e: DragEvent) => {
                const data = e.dataTransfer!.getData("application/json");
                if (data) {
                  try {
                    const parsed = JSON.parse(data);
                    if (parsed.type === "ojp-event") {
                      onEventDrop$(parsed.eventId, date, sal.name, slotIndex);
                    }
                  } catch {
                    // Handle error silently
                  }
                }
                dropPreview.value = null;
              })}
              preventdefault:dragover
              preventdefault:drop
              title="Poklepejte pro přidání události nebo přetáhněte událost"
            >
              {isDropPreview && (
                <div class="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
                  <div
                    class={`rounded border px-2 py-1 text-xs font-bold shadow-lg ${
                      isValid ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"
                    }`}
                  >
                    {isValid ? "✓ Přesunout zde" : "✗ Operace musí mít mezeru"}
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
            scrollLeft={scrollLeft}
            timeHourFrom={timeHourFrom}
            viewportWidth={viewportWidth}
          />
        ))}
      </div>
    );
  },
);
