import { component$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSalInfo } from "./_mock-events";

import { getSalInfo } from "./_mock-events";

type OjpHorizontalCalendarProps = {
  dates: { date: Date }[];
  events: OjpEventPositioned[];
  saly: OjpSalInfo[];
  timeHourFrom: number;
  timeHourTo: number;
  times: { time: Date }[];
};

export const OjpHorizontalCalendar = component$<OjpHorizontalCalendarProps>(
  ({ dates, events, saly, timeHourFrom, times }) => {
    const dayNames = ["PONDĚLÍ", "ÚTERÝ", "STŘEDA", "ČTVRTEK", "PÁTEK"];

    const slotWidth = 24; // px na 5-minutový slot
    const totalSlots = times.length * 12; // 12 slotů na hodinu
    const salsWidth = 140;
    const rowHeight = 40; // px - jednotná výška všech řádků

    // Vytvoříme strukturu: den → sály
    const structure: Array<
      | { date: Date; dayIndex: number; dayName: string; type: "day" }
      | { date: Date; dayIndex: number; sal: OjpSalInfo; type: "sal" }
    > = [];

    dates.forEach((date, dayIndex) => {
      // Přidáme řádek pro den
      structure.push({
        date: date.date,
        dayIndex,
        dayName: dayNames[dayIndex] || dayNames[0],
        type: "day",
      });

      // Přidáme řádky pro sály tohoto dne
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
      <div class="flex h-full flex-col overflow-auto">
        {/* Sticky header s hodinami */}
        <div class="sticky top-0 z-30 border-b bg-white">
          {/* Hodiny */}
          <div
            class="grid"
            style={`grid-template-columns: ${salsWidth}px repeat(${times.length}, ${12 * slotWidth}px); height: ${rowHeight}px;`}
          >
            <div class="flex items-center justify-center border-r-2 border-gray-400 bg-gray-100 text-sm font-bold">
              Den / Sál
            </div>
            {times.map((time) => (
              <div
                class="flex items-center justify-center border-r border-gray-300 bg-gray-50 text-lg font-semibold"
                key={`hour-${time.time.getHours()}`}
              >
                {String(time.time.getHours()).padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* Minuty */}
          <div
            class="grid text-xs"
            style={`grid-template-columns: ${salsWidth}px repeat(${totalSlots}, ${slotWidth}px); height: ${rowHeight / 2}px;`}
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
        <div>
          {structure.map((item) => {
            if (item.type === "day") {
              // Řádek pro den
              return (
                <div
                  class="grid border-b border-gray-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  key={`day-${item.dayIndex}`}
                  style={`grid-template-columns: ${salsWidth}px repeat(${totalSlots}, ${slotWidth}px); height: ${rowHeight}px;`}
                >
                  <div class="flex items-center justify-center border-r-2 border-blue-400 font-bold">
                    {item.dayName} {item.date.toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit" })}
                  </div>
                  {/* Prázdné sloty pro časy */}
                  {Array.from({ length: totalSlots }, (_, slotIndex) => (
                    <div class="border-r border-blue-400" key={`day-slot-${slotIndex}`}></div>
                  ))}
                </div>
              );
            } else {
              // Řádek pro sál
              const rowEvents = events.filter(
                (event) => event.dateFrom.toDateString() === item.date.toDateString() && event.sal === item.sal.name,
              );

              return (
                <div
                  class="grid border-b border-gray-200"
                  key={`sal-${item.dayIndex}-${item.sal.name}`}
                  style={`grid-template-columns: ${salsWidth}px repeat(${totalSlots}, ${slotWidth}px); height: ${rowHeight}px;`}
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

                  {/* Grid sloty pro časy */}
                  {Array.from({ length: totalSlots }, (_, slotIndex) => {
                    const slotHour = Math.floor(slotIndex / 12) + timeHourFrom;
                    const slotMinute = (slotIndex % 12) * 5;

                    // Najdi událost pro tento slot
                    const eventInSlot = rowEvents.find((event) => {
                      const eventStartHour = event.dateFrom.getHours();
                      const eventStartMinute = event.dateFrom.getMinutes();
                      const eventEndHour = event.dateTo.getHours();
                      const eventEndMinute = event.dateTo.getMinutes();

                      const slotTime = slotHour * 60 + slotMinute;
                      const eventStart = eventStartHour * 60 + eventStartMinute;
                      const eventEnd = eventEndHour * 60 + eventEndMinute;

                      return slotTime >= eventStart && slotTime < eventEnd;
                    });

                    // Zobraz událost pouze na začátku
                    const shouldShowEvent =
                      eventInSlot &&
                      eventInSlot.dateFrom.getHours() === slotHour &&
                      eventInSlot.dateFrom.getMinutes() === slotMinute;

                    return (
                      <div class="relative border-r border-gray-200" key={`slot-${slotIndex}`}>
                        {shouldShowEvent && (
                          <div
                            class="absolute inset-1 z-10 flex cursor-pointer items-center justify-center rounded border text-xs font-semibold"
                            style={`
                              background-color: ${eventInSlot.typ === "uklid" || eventInSlot.typ === "pauza" ? "#e5e7eb" : getSalInfo(eventInSlot.sal).bgColor};
                              border-color: ${eventInSlot.typ === "uklid" || eventInSlot.typ === "pauza" ? "#9ca3af" : getSalInfo(eventInSlot.sal).color};
                              grid-column-end: span ${Math.ceil(eventInSlot.duration / 5)};
                            `}
                          >
                            {eventInSlot.title}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  },
);
