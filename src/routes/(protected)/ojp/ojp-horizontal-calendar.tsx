import { component$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

type OjpHorizontalCalendarProps = {
  dates: { date: Date }[];
  events: OjpEventPositioned[];
  saly: OjpSalInfo[];
  timeHourFrom: number;
  timeHourTo: number;
  times: { time: Date }[];
};

export const OjpHorizontalCalendar = component$<OjpHorizontalCalendarProps>(
  ({ dates, events, saly, timeHourFrom, timeHourTo, times }) => {
    const dayNames = ["PONDĚLÍ", "ÚTERÝ", "STŘEDA", "ČTVRTEK", "PÁTEK"];
    const timeFormatter = new Intl.DateTimeFormat("cs", { hour: "2-digit", hourCycle: "h23" });

    return (
      <div class="flex h-full flex-col">
        {dates.map((date, dayIndex) => {
          const dayName = dayNames[dayIndex] || dayNames[0];
          const dayEvents = events.filter((event) => event.dateFrom.toDateString() === date.date.toDateString());

          return (
            <div class="flex-1 border-b border-gray-300" key={`day-${dayIndex}`}>
              {/* Header dne */}
              <div class="sticky top-0 z-20 bg-gradient-to-r from-blue-600 to-blue-700 p-2 text-white">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-lg font-bold">{dayName}</span>
                    <span class="ml-2 text-sm opacity-90">
                      {date.date.toLocaleDateString("cs-CZ", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div class="text-sm">{dayEvents.length} událostí</div>
                </div>
              </div>

              {/* Časová osa */}
              <div class="sticky top-[3.5rem] z-10 flex border-b bg-white">
                <div class="w-48 border-r-2 border-gray-400 bg-gray-100 p-2 text-sm font-bold">Sály / Čas</div>
                {times.map((time, idx) => (
                  <div
                    class="min-w-24 flex-1 border-r border-gray-300 bg-gray-50 p-2 text-center text-sm font-semibold"
                    key={`time-${idx}`}
                  >
                    {timeFormatter.format(time.time)}
                  </div>
                ))}
              </div>

              {/* 5-minutové intervaly */}
              <div class="sticky top-[6rem] z-10 flex border-b bg-white text-xs">
                <div class="w-48 border-r-2 border-gray-400 bg-gray-50"></div>
                {times.map((time, hourIdx) => (
                  <div class="flex min-w-24 flex-1" key={`intervals-${hourIdx}`}>
                    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minutes) => (
                      <div
                        class="flex-1 border-r border-gray-200 bg-gray-50 p-1 text-center"
                        key={`interval-${hourIdx}-${minutes}`}
                      >
                        {minutes.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Sály a události */}
              <div class="divide-y divide-gray-200">
                {saly.map((sal, salIndex) => {
                  const salEvents = dayEvents.filter((event) => event.sal === sal.name);

                  return (
                    <div class="flex min-h-16 hover:bg-gray-50" key={`sal-${dayIndex}-${salIndex}`}>
                      {/* Sál info */}
                      <div
                        class="flex w-48 flex-col justify-center border-r-2 border-gray-300 p-3"
                        style={`background-color: ${sal.bgColor}; color: ${sal.color};`}
                      >
                        <div class="font-bold">{sal.displayName}</div>
                        <div class="text-xs opacity-75">{sal.vykony} výkonů</div>
                        <div class="text-xs opacity-75">{sal.uhrada.toLocaleString()} Kč</div>
                      </div>

                      {/* Časová oblast pro události */}
                      <div class="relative flex-1">
                        {/* Grid pozadí */}
                        <div class="absolute inset-0 flex">
                          {times.map((_, hourIdx) => (
                            <div class="flex min-w-24 flex-1" key={`bg-hour-${hourIdx}`}>
                              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minutes, minIdx) => (
                                <div
                                  class={`flex-1 border-r ${minIdx === 11 ? "border-gray-400" : "border-gray-200"}`}
                                  key={`bg-${hourIdx}-${minIdx}`}
                                ></div>
                              ))}
                            </div>
                          ))}
                        </div>

                        {/* Events */}
                        {salEvents.map((event) => (
                          <OjpEventComponent
                            event={event}
                            key={event.id}
                            timeHourFrom={timeHourFrom}
                            timeHourTo={timeHourTo}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
