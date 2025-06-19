import { Card, CardBody } from "@akeso/ui-components";
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const timeFormatter = new Intl.DateTimeFormat("cs", { hour: "2-digit", hourCycle: "h23" });

    return (
      <div class="flex h-full flex-col overflow-auto">
        {/* Sticky header s časovou osou */}
        <div class="sticky top-0 z-30 border-b bg-white shadow-sm">
          {/* Časový header - širší sloupce jako v Excelu */}
          <div class="flex">
            {/* Sály/Čas header - úzký */}
            <div class="w-28 border-r-2 border-gray-400 bg-gray-100 p-2 text-xs font-bold">Sály / Čas</div>

            {/* Hodiny - ŠIROKÉ sloupce jako v Excelu */}
            {times.map((time, idx) => (
              <div
                class="w-32 border-r border-gray-300 bg-gray-50 p-2 text-center text-lg font-semibold"
                key={`time-${idx}`}
              >
                {String(time.time.getHours()).padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* Minutové intervaly - VĚTŠÍ a čitelnější */}
          <div class="flex">
            <div class="w-28 border-r-2 border-gray-400 bg-gray-50"></div>
            {times.map((_, hourIdx) => (
              <div class="flex w-32 divide-x divide-gray-200" key={`intervals-${hourIdx}`}>
                {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minutes) => (
                  <div
                    class="flex-1 bg-gray-50 py-1 text-center text-xs font-medium"
                    key={`interval-${hourIdx}-${minutes}`}
                  >
                    {String(minutes).padStart(2, "0")}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dny jako karty */}
        <div class="flex-1 space-y-4 p-4">
          {dates.map((date, dayIndex) => {
            const dayName = dayNames[dayIndex] || dayNames[0];
            const dayEvents = events.filter((event) => event.dateFrom.toDateString() === date.date.toDateString());

            return (
              <Card class="overflow-hidden" key={`day-${dayIndex}`}>
                <CardBody class="p-0">
                  {/* Header dne */}
                  <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-3 text-white">
                    <div class="flex items-center justify-between">
                      <div>
                        <h2 class="text-lg font-bold">{dayName}</h2>
                        <p class="text-sm opacity-90">
                          {date.date.toLocaleDateString("cs-CZ", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div class="text-sm">{dayEvents.length} událostí</div>
                    </div>
                  </div>

                  {/* Sály pro tento den */}
                  <div class="divide-y divide-gray-200">
                    {saly.map((sal, salIndex) => {
                      const salEvents = dayEvents.filter((event) => event.sal === sal.name);

                      return (
                        <div class="flex min-h-16" key={`sal-${dayIndex}-${salIndex}`}>
                          {/* Kompaktní info o sále */}
                          <div
                            class="flex w-28 items-center border-r-2 border-gray-300 p-2"
                            style={`background-color: ${sal.bgColor}; color: ${sal.color};`}
                          >
                            <div class="w-full text-center text-xs">
                              <div class="font-bold">{sal.displayName}</div>
                              <div>{sal.vykony} výkonů</div>
                            </div>
                          </div>

                          {/* Časová oblast - ŠIROKÉ sloupce odpovídající header */}
                          <div class="relative flex">
                            {/* Grid pozadí - každý sloupec w-32 */}
                            {times.map((_, hourIdx) => (
                              <div class="flex w-32 border-r border-gray-300" key={`bg-hour-${hourIdx}`}>
                                {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((_, minIdx) => (
                                  <div class="flex-1 border-r border-gray-100" key={`bg-${hourIdx}-${minIdx}`}></div>
                                ))}
                              </div>
                            ))}

                            {/* Events - absolutní pozicování */}
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
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    );
  },
);
