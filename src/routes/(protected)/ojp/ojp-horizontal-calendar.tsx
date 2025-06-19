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

    // ŠIRŠÍ sloupečky - aby se minuty vešly!
    const slotWidth = 24; // px na 5-minutový slot
    const totalSlots = times.length * 12; // 12 slotů na hodinu
    const salsWidth = 140;

    // Vytvořím řádky pro každý den a sál
    const rows = dates.flatMap((date, dayIndex) =>
      saly.map((sal, salIndex) => ({
        date,
        dayIndex,
        dayName: dayNames[dayIndex] || dayNames[0],
        isFirstSalInDay: salIndex === 0,
        key: `${dayIndex}-${sal.name}`,
        sal,
      })),
    );

    return (
      <div class="flex h-full flex-col overflow-auto">
        {/* Sticky header s hodinami */}
        <div class="sticky top-0 z-30 border-b bg-white">
          {/* Hodiny - každá hodina má 12 × 24px = 288px */}
          <div
            class="grid"
            style={`grid-template-columns: ${salsWidth}px repeat(${times.length}, ${12 * slotWidth}px);`}
          >
            <div class="border-r-2 border-gray-400 bg-gray-100 p-2 text-center text-sm font-bold">Den / Sál</div>
            {times.map((time) => (
              <div
                class="border-r border-gray-300 bg-gray-50 p-2 text-center text-lg font-semibold"
                key={`hour-${time.time.getHours()}`}
              >
                {String(time.time.getHours()).padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* Minuty - každý slot má fixní šířku 24px */}
          <div
            class="grid text-xs"
            style={`grid-template-columns: ${salsWidth}px repeat(${totalSlots}, ${slotWidth}px);`}
          >
            <div class="border-r-2 border-gray-400 bg-gray-50"></div>
            {times.flatMap((time) =>
              Array.from({ length: 12 }, (_, i) => (
                <div
                  class="border-r border-gray-200 bg-gray-50 py-1 text-center text-gray-600"
                  key={`minute-${time.time.getHours()}-${i * 5}`}
                  style={`width: ${slotWidth}px;`}
                >
                  {String(i * 5).padStart(2, "0")}
                </div>
              )),
            )}
          </div>
        </div>

        {/* Řádky pro sály */}
        <div class="divide-y divide-gray-200">
          {rows.map((row) => {
            const rowEvents = events.filter(
              (event) => event.dateFrom.toDateString() === row.date.date.toDateString() && event.sal === row.sal.name,
            );

            return (
              <div
                class={`grid min-h-12 ${row.isFirstSalInDay ? "border-t-2 border-blue-200" : ""}`}
                key={row.key}
                style={`grid-template-columns: ${salsWidth}px repeat(${totalSlots}, ${slotWidth}px);`}
              >
                {/* Název sálu */}
                <div
                  class="flex items-center justify-center border-r-2 border-gray-300 p-2 text-xs"
                  style={`background-color: ${row.sal.bgColor}; color: ${row.sal.color};`}
                >
                  <div class="text-center">
                    {row.isFirstSalInDay && <div class="mb-1 font-bold text-gray-800">{row.dayName}</div>}
                    <div class="font-semibold">{row.sal.displayName}</div>
                    <div class="text-xs opacity-75">{row.sal.vykony} výkonů</div>
                  </div>
                </div>

                {/* Grid sloty pro časy - každý slot má fixní šířku */}
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
                    <div
                      class="relative border-r border-gray-200"
                      key={`slot-${slotIndex}`}
                      style={`width: ${slotWidth}px;`}
                    >
                      {shouldShowEvent && (
                        <div
                          class="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded border p-1 text-xs font-semibold"
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
          })}
        </div>
      </div>
    );
  },
);
