import { Card, CardBody } from "@akeso/ui-components";
import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";

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
    const timeFormatter = new Intl.DateTimeFormat("cs", { hour: "2-digit", hourCycle: "h23" });

    // Signal pro sledování aktuálně viditelného dne
    const currentVisibleDayIndex = useSignal(0);
    const containerRef = useSignal<HTMLElement>();

    // Použiju useOnDocument místo useVisibleTask$
    useOnDocument(
      "scroll",
      $(() => {
        if (!containerRef.value) return;

        const dayElements = containerRef.value.querySelectorAll("[data-day-index]");

        for (let i = 0; i < dayElements.length; i++) {
          const element = dayElements[i];
          const rect = element.getBoundingClientRect();

          // Pokud je element viditelný (horní část je v top 30% obrazovky)
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.1) {
            const dayIndex = parseInt(element.getAttribute("data-day-index") || "0");
            currentVisibleDayIndex.value = dayIndex;
            break;
          }
        }
      }),
    );

    const currentDate = dates[currentVisibleDayIndex.value];
    const currentDayName = dayNames[currentVisibleDayIndex.value] || dayNames[0];

    return (
      <div class="flex h-full flex-col overflow-auto" ref={containerRef}>
        {/* Smart sticky časový header */}
        <div class="sticky top-0 z-30 border-b bg-white shadow-md transition-all duration-300">
          {/* Aktuální den info */}
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-2 text-white">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-sm font-bold">{currentDayName}</span>
                <span class="ml-2 text-xs opacity-90">
                  {currentDate.date.toLocaleDateString("cs-CZ", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div class="text-xs">
                Den {currentVisibleDayIndex.value + 1} / {dates.length}
              </div>
            </div>
          </div>

          {/* Hodiny */}
          <div class="flex border-b">
            <div class="w-48 border-r-2 border-gray-400 bg-gray-100 p-2 text-sm font-bold sm:w-64">Sály / Čas</div>
            {times.map((time, idx) => (
              <div
                class="min-w-16 flex-1 border-r border-gray-300 bg-gray-50 p-2 text-center text-xs font-semibold sm:min-w-20 sm:text-sm"
                key={`time-${idx}`}
              >
                {timeFormatter.format(time.time)}
              </div>
            ))}
          </div>

          {/* 15min intervaly */}
          <div class="flex text-xs">
            <div class="w-48 border-r-2 border-gray-400 bg-gray-50 sm:w-64"></div>
            {times.map((time, hourIdx) => (
              <div class="flex min-w-16 flex-1 sm:min-w-20" key={`intervals-${hourIdx}`}>
                {[0, 15, 30, 45].map((minutes) => (
                  <div
                    class="flex-1 border-r border-gray-200 bg-gray-50 p-1 text-center text-[10px] sm:text-xs"
                    key={`interval-${hourIdx}-${minutes}`}
                  >
                    {minutes.toString().padStart(2, "0")}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dny jako karty */}
        <div class="flex-1 space-y-6 p-4">
          {dates.map((date, dayIndex) => {
            const dayName = dayNames[dayIndex] || dayNames[0];
            const dayEvents = events.filter((event) => event.dateFrom.toDateString() === date.date.toDateString());

            return (
              <Card class="overflow-hidden" data-day-index={dayIndex} key={`day-${dayIndex}`}>
                <CardBody class="p-0">
                  {/* Header dne - větší a výraznější */}
                  <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                    <div class="flex items-center justify-between">
                      <div>
                        <h2 class="text-xl font-bold">{dayName}</h2>
                        <p class="text-sm opacity-90">
                          {date.date.toLocaleDateString("cs-CZ", {
                            day: "2-digit",
                            month: "2-digit",
                            weekday: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div class="rounded bg-white bg-opacity-20 px-3 py-1 text-right text-sm">
                        <div class="font-semibold">{dayEvents.length} událostí</div>
                        <div class="text-xs opacity-75">Den {dayIndex + 1}</div>
                      </div>
                    </div>
                  </div>

                  {/* Sály pro tento den */}
                  <div class="divide-y divide-gray-200">
                    {saly.map((sal, salIndex) => {
                      const salEvents = dayEvents.filter((event) => event.sal === sal.name);

                      return (
                        <div
                          class="flex min-h-[4rem] transition-colors hover:bg-gray-50"
                          key={`sal-${dayIndex}-${salIndex}`}
                        >
                          {/* Info o sále s informací o dni */}
                          <div
                            class="relative flex w-48 flex-col justify-center border-r-2 border-gray-300 p-3 sm:w-64"
                            style={`background-color: ${sal.bgColor}; color: ${sal.color};`}
                          >
                            {/* Malý indikátor dne */}
                            {salIndex === 0 && (
                              <div class="absolute right-1 top-1 text-xs font-bold opacity-60">
                                {dayName.slice(0, 2)}
                              </div>
                            )}

                            <div class="text-sm font-bold">{sal.displayName}</div>
                            <div class="text-xs opacity-75">{sal.vykony} výkonů</div>
                            <div class="text-xs opacity-75">{sal.uhrada.toLocaleString()} Kč</div>
                          </div>

                          {/* Časová oblast */}
                          <div class="relative flex-1">
                            {/* Grid pozadí s minutovými čárami */}
                            <div class="absolute inset-0 flex">
                              {times.map((_, hourIdx) => (
                                <div class="flex min-w-16 flex-1 sm:min-w-20" key={`bg-hour-${hourIdx}`}>
                                  {[0, 15, 30, 45].map((minutes, minIdx) => (
                                    <div
                                      class={`flex-1 border-r ${minIdx === 3 ? "border-gray-400" : "border-gray-200"}`}
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
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    );
  },
);
