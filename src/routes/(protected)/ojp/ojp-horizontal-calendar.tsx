// src/routes/(protected)/ojp/ojp-horizontal-calendar.tsx
import type { QRL, Signal } from "@builder.io/qwik";

import { $, component$, sync$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

// Proper Qwik styles
const dragDropStyles = `
  [draggable="true"] {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: move;
  }
  
  .ojp-event-dragging {
    opacity: 0.6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    transition: none;
  }
  
  .ojp-drop-zone-active {
    background: linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.25)) !important;
    border: 2px dashed #22c55e !important;
    animation: ojp-pulse 0.6s ease-in-out infinite alternate;
  }
  
  @keyframes ojp-pulse {
    from { 
      background-color: rgba(34, 197, 94, 0.1);
      transform: scale(1);
    }
    to { 
      background-color: rgba(34, 197, 94, 0.25);
      transform: scale(1.02);
    }
  }
  
  .ojp-event-component,
  .ojp-time-slot {
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  
  @media (hover: none) and (pointer: coarse) {
    .ojp-event-component {
      touch-action: none;
    }
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
    useStyles$(dragDropStyles);

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
    });

    return (
      <div class="flex h-full flex-col">
        <div class="flex-1 overflow-auto" onScroll$={handleScroll} ref={scrollContainerRef}>
          <div style={`min-width: ${totalGridWidth}px; width: 100%;`}>
            {/* Sticky header s hodinami */}
            <div class="sticky top-0 z-30 border-b bg-white">
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

              {/* Sub-header s minutami */}
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
                      {/* Sál header */}
                      <div
                        class="sticky left-0 z-30 flex items-center justify-center border-r-2 border-gray-300 text-xs"
                        style={`background-color: ${item.sal.bgColor}; color: ${item.sal.color};`}
                      >
                        <div class="text-center">
                          <div class="font-semibold">{item.sal.displayName}</div>
                          <div class="text-xs opacity-75">{vykonyCount} výkonů</div>
                        </div>
                      </div>

                      {/* Time slots s drop zone */}
                      {Array.from({ length: totalSlots }, (_, slotIndex) => {
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
                              ${isDropPreview ? "ojp-drop-zone-active" : ""}
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
                            onDragOver$={sync$((e: DragEvent) => {
                              // 🔧 OPRAVA: Odstraním nepoužitou proměnnou target
                              const data = e.dataTransfer!.getData("application/json");
                              if (data) {
                                try {
                                  const parsed = JSON.parse(data);
                                  if (parsed.type === "ojp-event") {
                                    dropPreview.value = {
                                      date: item.date,
                                      sal: item.sal.name,
                                      slotIndex,
                                    };
                                  }
                                } catch {
                                  // Silent catch
                                }
                              }
                            })}
                            onDrop$={sync$((e: DragEvent) => {
                              const data = e.dataTransfer!.getData("application/json");
                              if (data) {
                                try {
                                  const parsed = JSON.parse(data);
                                  if (parsed.type === "ojp-event") {
                                    handleEventDrop(parsed.eventId, item.date, item.sal.name, slotIndex);
                                  }
                                } catch {
                                  // Silent catch
                                }
                              }
                            })}
                            preventdefault:dragover
                            preventdefault:drop
                            title="Poklepejte pro přidání události nebo přetáhněte existující"
                          >
                            {isDropPreview && (
                              <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div class="rounded bg-white bg-opacity-95 px-2 py-1 text-xs font-bold text-green-800 shadow-sm">
                                  Přesunout zde
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
