import type { QRL, Signal } from "@builder.io/qwik";

import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

type OjpHorizontalCalendarProps = {
  dates: { date: Date }[];
  events: OjpEventPositioned[];
  newEventTrigger: Signal<{ dateTime: Date; forceOtherSlots?: boolean; sal: OjpSal } | null>; // 🔧 Přidej forceOtherSlots
  onEventClick$?: QRL<(event: any) => void>;
  saly: OjpSalInfo[];
  timeHourFrom: number;
  times: { time: Date }[];
};

type StructureItem =
  | { date: Date; dayIndex: number; dayName: string; type: "day" }
  | { date: Date; dayIndex: number; sal: OjpSalInfo; type: "sal" };

export const OjpHorizontalCalendar = component$<OjpHorizontalCalendarProps>(
  ({ dates, events, newEventTrigger, onEventClick$, saly, timeHourFrom, times }) => {
    const dayNames = ["PONDĚLÍ", "ÚTERÝ", "STŘEDA", "ČTVRTEK", "PÁTEK"];

    const slotWidth = 24;
    const totalSlots = times.length * 12;
    const salsWidth = 140;
    const rowHeight = 40;

    const scrollContainerRef = useSignal<HTMLDivElement>();
    const scrollLeft = useSignal(0);
    const viewportWidth = useSignal(800);

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

      // 🆕 KONTROLA: Existuje už v tomto řádku operace?
      const existingOperations = events.filter(
        (event) =>
          event.dateFrom.toDateString() === date.toDateString() && event.sal === sal && event.typ === "operace",
      );

      const shouldForceOtherSlots = existingOperations.length > 0;

      newEventTrigger.value = {
        dateTime: newDateTime,
        forceOtherSlots: shouldForceOtherSlots, // 🆕 Přidáme flag
        sal,
      };
    });

    return (
      <div class="flex h-full flex-col">
        <div class="flex-1 overflow-auto" onScroll$={handleScroll} ref={scrollContainerRef}>
          <div style={`min-width: ${totalGridWidth}px; width: 100%;`}>
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
                        class="sticky left-0 z-30 flex items-center justify-center border-r-2 border-gray-300 text-xs"
                        style={`background-color: ${item.sal.bgColor}; color: ${item.sal.color};`}
                      >
                        <div class="text-center">
                          <div class="font-semibold">{item.sal.displayName}</div>
                          <div class="text-xs opacity-75">{vykonyCount} výkonů</div>
                        </div>
                      </div>

                      {Array.from({ length: totalSlots }, (_, slotIndex) => (
                        <div
                          class="cursor-pointer border-r border-gray-200 hover:bg-blue-100 hover:bg-opacity-50"
                          key={`slot-${slotIndex}`}
                          onDblClick$={() => {
                            handleSlotDoubleClick(item.date, item.sal.name, slotIndex);
                          }}
                          title="Poklepejte pro přidání události"
                        ></div>
                      ))}

                      {rowEvents.map((event) => (
                        <OjpEventComponent
                          event={event}
                          intervalMinutes={5}
                          intervalWidth={slotWidth}
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
