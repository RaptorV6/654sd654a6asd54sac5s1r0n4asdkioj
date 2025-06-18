import { dateAddMinutes } from "@akeso/utils";
import { component$, useSignal } from "@builder.io/qwik";

import { dateEqDates } from "~/lib/date-eq-dates";

import type { CdrCalendarEventPositioned } from "../../_mock-cdr-data";

import { CdrCalendarEventDetailModal } from "./cdr-calendar-event-modal";

type CdrCalendarEventComponentProps = {
  calendar: {
    dateFrom: Date;
    timeHourFrom: number;
    timeHourTo: number;
  };
  dates: { date: Date }[];
  event: CdrCalendarEventPositioned;
};

export const CdrCalendarEventComponent = component$<CdrCalendarEventComponentProps>(({ calendar, dates, event }) => {
  // const ctx = useCdrCalendarContext();
  const showDetailSig = useSignal(false);

  const timeFormatter = new Intl.DateTimeFormat("cs", { hourCycle: "h23", timeStyle: "short" });

  const dateFrom = event.dateFrom;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const dateTo = event.dateTo ?? dateAddMinutes(event.duration ?? 30, dateFrom);
  const duration = (dateTo.getTime() - dateFrom.getTime()) / (60 * 1000);

  // Calendar is divided to 5 min intervals
  const spanSlots = Math.ceil(duration / 5);

  const dateIndex = dates.findIndex((d) => dateEqDates(d.date, dateFrom));
  const timeIndex = ((dateFrom.getHours() - calendar.timeHourFrom) * 60 + dateFrom.getMinutes()) / 5;

  const left = (event.columnIndex / event.columnCount) * 96;
  const width = (1 / event.columnCount) * 96;

  const style = [
    `grid-column-start: ${dateIndex + 1}`,
    `grid-row-start: ${timeIndex + 2}`,
    `grid-row-end: span ${spanSlots}`,
    `left: ${left}%`,
    `width: ${width}%`,
  ].join("; ");

  return (
    <li class={"relative m-1 flex"} style={style}>
      <button
        class={[
          "group absolute inset-0 !m-0 flex flex-col overflow-hidden overflow-y-auto rounded-lg border p-1 text-xs/5",
          // Farba podla typu
          // "bg-blue-50 text-blue-700 hover:bg-blue-100",
          // Colot by level
          event.level.code === "BASIC" && "border-green-200 bg-green-50 text-green-700 hover:bg-green-100",
          event.level.code === "COMPLEMENT" && "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
          event.level.code === "NEUROSTYMULATION" && "border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
          event.level.code === "PSYCHOTHERAPY" && "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
          // Je problem
          // event.stats.collision > 0 && "border-2 border-error-text-base",
          // event.stats.collision === 0 && event.stats.unavailable > 0 && "border-2 border-yellow-500",
        ]}
        onClick$={() => {
          // ctx.previewData = { ...event, dateTo, duration };
          showDetailSig.value = true;
        }}
        preventdefault:click
        stoppropagation:click
        type="button"
      >
        <p class="text-left font-semibold">{event.title}</p>
        <p class="text-left text-[0.6rem]/5 text-blue-500 group-hover:text-blue-700">
          <time dateTime={dateFrom.toISOString()}>{timeFormatter.format(dateFrom)}</time>
          {" - "}
          <time dateTime={dateTo.toISOString()}>{timeFormatter.format(dateTo)}</time>
          {` (${duration} min)`}
        </p>
        {/* <p class="order-2 text-left text-[0.6rem]/5 text-opacity-10">{event.description}</p> */}
        <div class="flex items-center justify-between text-left text-[0.6rem]/5 text-blue-500 group-hover:text-blue-700">
          <div class="inline-flex items-center gap-2">
            <>
              {!event.room?.shared ? (
                <svg
                  class="h-4 w-4 shrink-0"
                  height="32"
                  viewBox="0 0 24 24"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  class="h-5 w-5 shrink-0"
                  height="32"
                  viewBox="0 0 24 24"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 18q-.425 0-.712-.288T0 17v-.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0q-.425 0-.712-.288T6 17v-.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V17q0 .425-.287.713T17 18zm12.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V17q0 .425-.288.713T23 18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12"
                    fill="currentColor"
                  />
                </svg>
              )}{" "}
              {event.room?.capacity}
            </>
          </div>
          <div class="inline-flex items-center gap-2 pr-2">
            <svg class="h-4 w-4 shrink-0" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z" fill="currentColor" />
            </svg>

            {/* <span>
              {event.stats.count}
              {" | "}
              <span class="text-yellow-500">{event.stats.unavailable}</span>
              {" | "}
              <span class="text-error-text-base">{event.stats.collision}</span>
            </span> */}
          </div>
        </div>
        <ul class="order-3 mt-2 text-left text-[0.65rem]/5">
          {event.assigned.map((ass) => (
            <li
              class={[
                "rounded px-1",
                // ass.collision && "bg-error-text-base text-white",
                // !ass.collision && ass.unavailable && "bg-yellow-300 text-yellow-800",
              ]}
              key={ass.employee.id}
            >
              {ass.employee.fullName}
            </li>
          ))}
        </ul>
      </button>
      <CdrCalendarEventDetailModal bind:show={showDetailSig} event={event} />
    </li>
  );
});
