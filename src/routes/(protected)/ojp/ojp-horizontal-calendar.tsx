// src/routes/(protected)/ojp/ojp-horizontal-calendar.tsx
import type { Signal } from "@builder.io/qwik";

import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

type OjpHorizontalCalendarProps = {
  dates: { date: Date }[];
  events: OjpEventPositioned[];
  newEventTrigger: Signal<{ dateTime: Date; sal: OjpSal } | null>;
  onEventChange: Signal<number>;
  saly: OjpSalInfo[];
  timeHourFrom: number;
  timeHourTo: number;
  times: { time: Date }[];
};

type StructureItem =
  | { date: Date; dayIndex: number; dayName: string; type: "day" }
  | { date: Date; dayIndex: number; sal: OjpSalInfo; type: "sal" };

export const OjpHorizontalCalendar = component$<OjpHorizontalCalendarProps>(
  ({ dates, events, newEventTrigger, onEventChange, saly, timeHourFrom, times }) => {
    const dayNames = ["PONDĚLÍ", "ÚTERÝ", "STŘEDA", "ČTVRTEK", "PÁTEK"];

    const slotWidth = 24; // px na 5-minutový slot
    const totalSlots = times.length * 12; // 12 slotů na hodinu
    const salsWidth = 140;
    const rowHeight = 40; // px - jednotná výška všech řádků

    // Tracking scroll pozice
    const scrollContainerRef = useSignal<HTMLDivElement>();
    const scrollLeft = useSignal(0);
    const viewportWidth = useSignal(800);

    // Update viewport width when container changes
    useTask$(({ track }) => {
      track(() => scrollContainerRef.value);
      if (scrollContainerRef.value) {
        viewportWidth.value = scrollContainerRef.value.clientWidth;
      }
    });

    // Handle scroll
    const handleScroll = $((e: Event) => {
      const target = e.target as HTMLDivElement;
      scrollLeft.value = target.scrollLeft;
    });

    // Vypočítaj celkovou šířku gridu
    const totalGridWidth = salsWidth + totalSlots * slotWidth;
    const hoursGridTemplate = `${salsWidth}px repeat(${times.length}, ${12 * slotWidth}px)`;
    const minutesGridTemplate = `${salsWidth}px repeat(${totalSlots}, ${slotWidth}px)`;

    // Vytvoríme strukturu: den → sály
    const structure: StructureItem[] = [];

    dates.forEach((date, dayIndex) => {
      // Přidáme řádok pre den
      structure.push({
        date: date.date,
        dayIndex,
        dayName: dayNames[dayIndex] || dayNames[0],
        type: "day",
      });

      // Přidáme řádky pre sály tohto dña
      saly.forEach((sal) => {
        structure.push({
          date: date.date,
          dayIndex,
          sal,
          type: "sal",
        });
      });
    });

    return (
      <div class="flex h-full flex-col">
        {/* Kontajner pre horizontálny scroll */}
        <div class="flex-1 overflow-auto" onScroll$={handleScroll} ref={scrollContainerRef}>
          <div style={`min-width: ${totalGridWidth}px; width: 100%;`}>
            {/* Sticky header s hodinami */}
            <div class="sticky top-0 z-30 border-b bg-white">
              {/* Hodiny */}
              <div
                class="grid"
                style={`grid-template-columns: ${hoursGridTemplate}; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
              >
                <div class="flex items-center justify-center border-r-2 border-gray-400 bg-gray-100 text-sm font-bold">
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

              {/* Minuty */}
              <div
                class="grid text-xs"
                style={`grid-template-columns: ${minutesGridTemplate}; height: ${rowHeight / 2}px; min-width: ${totalGridWidth}px;`}
              >
                <div class="border-r-2 border-gray-400 bg-gray-50"></div>
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

            {/* Řádky pro dny a sály */}
            <div style={`min-width: ${totalGridWidth}px;`}>
              {structure.map((item: StructureItem) => {
                if (item.type === "day") {
                  // Řádek pro den - použij jednoduchou 2-sloupcovou strukturu
                  return (
                    <div
                      class="grid border-b border-gray-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      key={`day-${item.dayIndex}`}
                      style={`grid-template-columns: ${salsWidth}px 1fr; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
                    >
                      <div class="flex items-center justify-center border-r-2 border-blue-400 font-bold">
                        {item.dayName} {item.date.toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit" })}
                      </div>
                      {/* Jeden veľký sloupec pre celý čas */}
                      <div class="border-r border-blue-400"></div>
                    </div>
                  );
                } else {
                  // Řádek pro sál - zůstává s minutovým členěním
                  const rowEvents = events.filter(
                    (event) =>
                      event.dateFrom.toDateString() === item.date.toDateString() && event.sal === item.sal.name,
                  );

                  return (
                    <div
                      class="relative grid border-b border-gray-200"
                      key={`sal-${item.dayIndex}-${item.sal.name}`}
                      style={`grid-template-columns: ${minutesGridTemplate}; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
                    >
                      {/* Název sálu */}
                      <div
                        class="flex items-center justify-center border-r-2 border-gray-300 text-xs"
                        style={`background-color: ${item.sal.bgColor}; color: ${item.sal.color};`}
                      >
                        <div class="text-center">
                          <div class="font-semibold">{item.sal.displayName}</div>
                          <div class="text-xs opacity-75">{item.sal.vykony} výkonů</div>
                        </div>
                      </div>

                      {/* Grid sloty pre časy - s onClick handlerom */}
                      {Array.from({ length: totalSlots }, (_, slotIndex) => (
                        <div
                          class="cursor-pointer border-r border-gray-200 hover:bg-blue-100 hover:bg-opacity-50"
                          key={`slot-${slotIndex}`}
                          onClick$={() => {
                            const minutesFromStart = slotIndex * 5;
                            const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
                            const minutes = minutesFromStart % 60;

                            const newDateTime = new Date(item.date);
                            newDateTime.setHours(hours, minutes, 0, 0);

                            // Trigger new event pomocí signal
                            newEventTrigger.value = { dateTime: newDateTime, sal: item.sal.name };
                          }}
                          title="Klikněte pro přidání události"
                        ></div>
                      ))}

                      {/* Události jako absolútne pozicované elementy */}
                      {rowEvents.map((event) => (
                        <OjpEventComponent
                          event={event}
                          intervalMinutes={5}
                          intervalWidth={slotWidth}
                          key={event.id}
                          onEventChange={onEventChange}
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
