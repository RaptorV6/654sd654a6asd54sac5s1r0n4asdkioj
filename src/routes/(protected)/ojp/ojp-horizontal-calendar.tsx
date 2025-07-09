// src/routes/(protected)/ojp/ojp-horizontal-calendar.tsx
import type { QRL, Signal } from "@builder.io/qwik";

import { $, component$, sync$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

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

type StructureItem =
  | { date: Date; dayIndex: number; dayName: string; type: "day" }
  | { date: Date; dayIndex: number; sal: OjpSalInfo; type: "sal" };

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
    const draggedEventId = useSignal<string>("");
    const dropPreview = useSignal<{ date: Date; sal: OjpSal; slotIndex: number } | null>(null);
    const draggedEventType = useSignal<string>("");
    const dragGhostRef = useSignal<HTMLDivElement>();

    // 🔧 OPRAVA: Pre-computed validation results místo runtime validace
    const validationResults = useSignal<Map<string, boolean>>(new Map());

    useTask$(({ track }) => {
      track(() => scrollContainerRef.value);
      if (scrollContainerRef.value) {
        viewportWidth.value = scrollContainerRef.value.clientWidth;
      }
    });

    // 🔧 SMART VALIDACE: Pre-compute všechny pozice pro aktuální dragovaný event
    useTask$(({ track }) => {
      const draggedType = track(() => draggedEventType.value);
      const currentEvents = track(() => events);

      if (!draggedType) {
        validationResults.value = new Map();
        return;
      }

      const newResults = new Map<string, boolean>();

      // Pro každý řádek zkontroluj všechny sloty
      structure.forEach((item) => {
        if (item.type === "sal") {
          for (let slotIndex = 0; slotIndex < totalSlots; slotIndex++) {
            const key = `${item.date.toDateString()}-${item.sal.name}-${slotIndex}`;

            // Inline validace - rychlá a bez serializace
            let isValid = true;

            if (draggedType === "operace") {
              const targetRowEvents = currentEvents
                .filter(
                  (event) =>
                    event.dateFrom.toDateString() === item.date.toDateString() &&
                    event.sal === item.sal.name &&
                    event.id !== draggedEventId.value, // Vylučujeme dragovaný event
                )
                .sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());

              const targetMinutes = slotIndex * 5;
              const targetHours = timeHourFrom + Math.floor(targetMinutes / 60);
              const targetMins = targetMinutes % 60;
              const targetTime = new Date(item.date);
              targetTime.setHours(targetHours, targetMins, 0, 0);

              // Kontrola kolizí s operacemi
              for (const event of targetRowEvents) {
                if (event.typ === "operace") {
                  const timeDiffAfter = targetTime.getTime() - event.dateTo.getTime();
                  const timeDiffBefore = event.dateFrom.getTime() - targetTime.getTime();

                  const minutesDiffAfter = timeDiffAfter / (1000 * 60);
                  const minutesDiffBefore = timeDiffBefore / (1000 * 60);

                  // Operace nesmí být hned za sebou (méně než 5 minut)
                  if (minutesDiffAfter >= 0 && minutesDiffAfter < 5) {
                    isValid = false;
                    break;
                  }

                  if (minutesDiffBefore >= 0 && minutesDiffBefore < 5) {
                    isValid = false;
                    break;
                  }
                }
              }
            }

            newResults.set(key, isValid);
          }
        }
      });

      validationResults.value = newResults;
    });

    const handleScroll = $((e: Event) => {
      const target = e.target as HTMLDivElement;
      scrollLeft.value = target.scrollLeft;
    });

    const totalGridWidth = salsWidth + totalSlots * slotWidth;
    const hoursGridTemplate = `${salsWidth}px repeat(${times.length}, ${12 * slotWidth}px)`;
    const minutesGridTemplate = `${salsWidth}px repeat(${totalSlots}, ${slotWidth}px)`;

    const structure: StructureItem[] = [];

    dates.forEach((date, dayIndex) => {
      structure.push({
        date: date.date,
        dayIndex,
        dayName: dayNames[dayIndex] || dayNames[0],
        type: "day",
      });

      saly.forEach((sal) => {
        structure.push({
          date: date.date,
          dayIndex,
          sal,
          type: "sal",
        });
      });
    });

    const getVykonyCount = (date: Date, salName: OjpSal): number => {
      return events.filter(
        (event) =>
          event.dateFrom.toDateString() === date.toDateString() && event.sal === salName && event.typ === "operace",
      ).length;
    };

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

        onEventDrop$(eventId, date, sal, newTime);
      }
      draggedEventId.value = "";
      dropPreview.value = null;
      draggedEventType.value = "";
    });

    return (
      <div class="flex h-full flex-col">
        {/* 🔧 CUSTOM DRAG GHOST */}
        <div class="ojp-drag-ghost" id="drag-ghost" ref={dragGhostRef}>
          📅 Přesouvám událost...
        </div>

        <div class="flex-1 overflow-auto" onScroll$={handleScroll} ref={scrollContainerRef}>
          <div class="ojp-calendar-grid" style={`min-width: ${totalGridWidth}px; width: 100%;`}>
            {/* Header stejný... */}
            <div class="sticky top-0 z-30 border-b bg-white shadow-sm">
              <div
                class="grid"
                style={`grid-template-columns: ${hoursGridTemplate}; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
              >
                <div class="sticky left-0 z-40 flex items-center justify-center border-r-2 border-gray-400 bg-gray-100 text-sm font-bold">
                  Den / Sál
                </div>
                {times.map((time) => (
                  <div
                    class="flex items-center justify-center border-r border-gray-300 bg-gray-50 text-lg font-semibold"
                    key={`hour-${time.time.getHours()}`}
                  >
                    {String(time.time.getHours()).padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              <div
                class="grid text-xs"
                style={`grid-template-columns: ${minutesGridTemplate}; height: ${rowHeight / 2}px; min-width: ${totalGridWidth}px;`}
              >
                <div class="sticky left-0 z-40 border-r-2 border-gray-400 bg-gray-50"></div>
                {times.flatMap((time) =>
                  Array.from({ length: 12 }, (_, i) => (
                    <div
                      class="flex items-center justify-center border-r border-gray-200 bg-gray-50 text-gray-600"
                      key={`minute-${time.time.getHours()}-${i * 5}`}
                    >
                      {String(i * 5).padStart(2, "0")}
                    </div>
                  )),
                )}
              </div>
            </div>

            {/* Kalendářové řádky */}
            <div style={`min-width: ${totalGridWidth}px;`}>
              {structure.map((item: StructureItem) => {
                if (item.type === "day") {
                  return (
                    <div
                      class="grid border-b border-gray-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      key={`day-${item.dayIndex}`}
                      style={`grid-template-columns: ${salsWidth}px 1fr; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
                    >
                      <div class="sticky left-0 z-30 flex items-center justify-center border-r-2 border-blue-400 bg-gradient-to-r from-blue-600 to-blue-700 font-bold">
                        {item.dayName} {item.date.toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit" })}
                      </div>
                      <div class="border-r border-blue-400"></div>
                    </div>
                  );
                } else {
                  const rowEvents = events.filter(
                    (event) =>
                      event.dateFrom.toDateString() === item.date.toDateString() && event.sal === item.sal.name,
                  );

                  const vykonyCount = getVykonyCount(item.date, item.sal.name);

                  return (
                    <div
                      class="relative grid border-b border-gray-200"
                      key={`sal-${item.dayIndex}-${item.sal.name}`}
                      style={`grid-template-columns: ${minutesGridTemplate}; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
                    >
                      <div
                        class="ojp-sal-header sticky left-0 z-30 flex items-center justify-center border-r-2 border-gray-300 text-xs"
                        style={`background-color: ${item.sal.bgColor}; color: ${item.sal.color};`}
                      >
                        <div class="text-center">
                          <div class="font-semibold">{item.sal.displayName}</div>
                          <div class="text-xs opacity-75">{vykonyCount} výkonů</div>
                        </div>
                      </div>

                      {/* 🔧 SMART TIME SLOTS s pre-computed validací */}
                      {Array.from({ length: totalSlots }, (_, slotIndex) => {
                        const validationKey = `${item.date.toDateString()}-${item.sal.name}-${slotIndex}`;
                        const isValid = validationResults.value.get(validationKey) ?? true;

                        const isDropPreview =
                          dropPreview.value &&
                          dropPreview.value.date.toDateString() === item.date.toDateString() &&
                          dropPreview.value.sal === item.sal.name &&
                          dropPreview.value.slotIndex === slotIndex;

                        return (
                          <div
                            class={`
                              ojp-time-slot relative cursor-pointer border-r border-gray-200 transition-all duration-200
                              hover:bg-blue-100 hover:bg-opacity-50
                              ${isDropPreview ? (isValid ? "ojp-drop-valid" : "ojp-drop-invalid") : ""}
                            `}
                            key={`slot-${slotIndex}`}
                            onDblClick$={() => {
                              handleSlotDoubleClick(item.date, item.sal.name, slotIndex);
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
                              if (draggedEventType.value) {
                                dropPreview.value = {
                                  date: item.date,
                                  sal: item.sal.name,
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
                                    // 🔧 KONTROLA: Použij pre-computed validaci
                                    if (isValid) {
                                      handleEventDrop(parsed.eventId, item.date, item.sal.name, slotIndex);
                                    }
                                  }
                                } catch {
                                  // Silent catch
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
                                    isValid
                                      ? "border-green-200 bg-green-50 text-green-800"
                                      : "border-red-200 bg-red-50 text-red-800"
                                  }`}
                                >
                                  {isValid ? "✓ Přesunout zde" : "✗ Operace musí mít mezeru"}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Události */}
                      {rowEvents.map((event) => (
                        <OjpEventComponent
                          event={event}
                          intervalMinutes={5}
                          intervalWidth={slotWidth}
                          isDragging={draggedEventId.value === event.id}
                          key={event.id}
                          onEventClick$={onEventClick$}
                          scrollLeft={scrollLeft.value}
                          timeHourFrom={timeHourFrom}
                          viewportWidth={viewportWidth.value}
                        />
                      ))}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
