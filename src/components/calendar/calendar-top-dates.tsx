import { component$ } from "@builder.io/qwik";

import { dateEqDates } from "~/lib/date-eq-dates";
import { dateWeekNumber } from "~/lib/date-week-number";

type CalendarTopDatesProps = {
  dates: { date: Date; separated?: boolean }[];
};

export const CalendarTopDates = component$<CalendarTopDatesProps>(({ dates }) => {
  const weekdayFormatterS = new Intl.DateTimeFormat("cs", { weekday: "short" });
  const weekdayFormatterL = new Intl.DateTimeFormat("cs", { weekday: "long" });
  const dateFormatter = new Intl.DateTimeFormat("cs", { day: "numeric", month: "numeric" });

  const today = new Date();
  const isToday = (d: Date) => dateEqDates(d, today);

  const weeks: { colSpan: number; colStart: number; label: string; separated: boolean; xlabel: string }[] = [];
  let c = 0;
  let cs = 1;
  for (let i = 0; i < dates.length; i++) {
    const d = dates[i];
    c++;
    if (d.separated || i === dates.length - 1) {
      const wn = dateWeekNumber(d.date);
      weeks.push({
        colSpan: c,
        colStart: cs,
        label: `${wn}. týden`,
        separated: d.separated ?? false,
        xlabel: wn % 2 ? "týden lichý" : "týden sudý",
      });
      cs = cs + c;
      c = 0;
    }
  }

  return (
    <div class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black/5 sm:pr-8">
      {/* Mobile date columns */}
      <div
        class="grid text-sm/6 text-app-text-base sm:hidden"
        style={`grid-template-columns: repeat(${dates.length}, minmax(0, 1fr))`}
      >
        {dates.map((item, idx) => (
          <button class="flex flex-col items-center pb-3 pt-2" key={`short-d-${idx}`} type="button">
            {weekdayFormatterS.format(item.date)}{" "}
            <span
              class={[
                "mt-1 flex size-8 items-center justify-center font-semibold text-app-text-strong",
                isToday(item.date) && "rounded-full bg-accent-base text-accent-text-contrast",
              ]}
            >
              {dateFormatter.format(item.date)}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop (other) date columns */}
      <div
        class="-mr-px hidden w-full divide-x divide-app-border-base border-r border-app-border-base text-sm/6 text-app-text-base sm:grid"
        // ref={datesLRef}
        style={`grid-template-columns: repeat(${dates.length}, 14rem)`}
      >
        <div class="col-end-1 w-14"></div>
        {weeks.map((week, widx) => (
          <div
            class={[
              "border-b border-b-app-border-base text-center",
              week.separated && "!border-r-4 !border-double !border-r-app-border-hover",
            ]}
            key={`week-${widx}`}
            style={`grid-column-start: ${week.colStart}; grid-column-end: span ${week.colSpan};`}
          >
            {week.label} - <span class="font-bold">{week.xlabel}</span>
          </div>
        ))}
        <div class="col-end-1 w-14 !border-l-0"></div>
        {dates.map((item, idx) => (
          <div
            class={[
              "flex items-center justify-center py-3",
              item.separated && "!border-r-4 !border-double !border-r-app-border-hover",
            ]}
            key={`long-d-${idx}`}
          >
            <span class={[isToday(item.date) && "flex items-baseline"]}>
              {weekdayFormatterL.format(item.date)}{" "}
              <span
                class={[
                  "items-center justify-center font-semibold",
                  isToday(item.date)
                    ? "ml-1.5 flex rounded-full bg-accent-base px-2 py-0.5 text-accent-text-contrast"
                    : "text-app-text-base",
                ]}
              >
                {dateFormatter.format(item.date)}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
