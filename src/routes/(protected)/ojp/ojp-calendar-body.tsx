import { component$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

type OjpCalendarBodyProps = {
  dates: { date: Date }[];
  events: OjpEventPositioned[];
  saly: OjpSalInfo[];
  timeHourFrom: number;
  timeHourTo: number;
  times: { time: Date }[];
};

export const OjpCalendarBody = component$<OjpCalendarBodyProps>(
  ({ dates, events, saly, timeHourFrom, timeHourTo, times }) => {
    const dayNames = ["PONDĚLÍ", "ÚTERÝ", "STŘEDA", "ČTVRTEK", "PÁTEK"];

    return (
      <div class="flex flex-col overflow-auto border border-gray-300 bg-white">
        {/* Časový header */}
        <div
          class="sticky top-0 z-10 grid border-b-2 border-gray-700 bg-gray-50"
          style={`grid-template-columns: 200px repeat(${times.length}, 1fr);`}
        >
          <div class="border-r-2 border-gray-600 bg-gray-100"></div>
          {times.map((time, index) => (
            <div
              class="border-r border-gray-300 p-2 text-center text-xs font-semibold text-gray-700"
              key={`time-${index}`}
            >
              {new Intl.DateTimeFormat("cs", {
                hour: "2-digit",
                hourCycle: "h23",
                minute: "2-digit",
              }).format(time.time)}
            </div>
          ))}
        </div>

        {/* Dny a sály */}
        {dates.map((date, dayIndex) => {
          const dayName = dayNames[dayIndex] || dayNames[0];
          const dayEvents = events.filter((event) => event.dateFrom.toDateString() === date.date.toDateString());

          return (
            <div class="border-b-2 border-gray-500" key={`day-${dayIndex}`}>
              {/* Header dne */}
              <div class="bg-gray-700 p-2 font-bold text-white">
                {dayName} - {date.date.toLocaleDateString("cs-CZ")}
              </div>

              {/* Sály pro tento den */}
              {saly.map((sal, salIndex) => {
                const salEvents = dayEvents.filter((event) => event.sal === sal.name);

                return (
                  <div
                    class="relative grid"
                    key={`sal-${dayIndex}-${salIndex}`}
                    style={`grid-template-columns: 200px repeat(${times.length}, 1fr);`}
                  >
                    {/* Info o sále */}
                    <div
                      class="flex min-h-[60px] flex-col border-b border-r-2 border-gray-300 border-gray-600 p-2"
                      style={`background-color: ${sal.bgColor}; color: ${sal.color};`}
                    >
                      <div class="text-sm font-bold">{sal.displayName}</div>
                      <div class="text-xs text-gray-600">{sal.vykony} výkonů</div>
                      <div class="text-xs text-gray-600">{sal.uhrada.toLocaleString()} Kč</div>
                    </div>

                    {/* Časové buňky */}
                    {times.map((_, timeIndex) => (
                      <div
                        class={`relative min-h-[60px] border-b border-r border-gray-200 border-gray-300 ${
                          (timeIndex + 1) % 4 === 0 ? "border-r-2 border-gray-400" : ""
                        }`}
                        key={`cell-${dayIndex}-${salIndex}-${timeIndex}`}
                      ></div>
                    ))}

                    {/* Events pro tento sál */}
                    {salEvents.map((event) => (
                      <OjpEventComponent
                        event={event}
                        key={event.id}
                        timeHourFrom={timeHourFrom}
                        timesLength={times.length}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
);
