import type { FunctionComponent, QRL } from "@builder.io/qwik";

import { component$, isServer, useSignal, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import { CalendarTopDates } from "./calendar-top-dates";

export type CalendarEventBaseProps<CalendarEvent> = {
  calendar: {
    dateFrom: Date;
    timeHourFrom: number;
    timeHourTo: number;
  };
  dates: { date: Date }[];
  event: CalendarEvent;
};

type CalendarBodyProps<CalendarEvent> = {
  dates: {
    date: Date;
    separated?: boolean;
  }[];
  /**
   * Defines minutes shift from end-of-the-day.
   * Should be equal to defaul minutes length of and new Event.
   *
   * By default is `1h`.
   */
  endOfDayTrasholdMinutes?: number;
  eventComponent: FunctionComponent<CalendarEventBaseProps<CalendarEvent>>;
  events: CalendarEvent[];
  onCalendarNewEvent$?: QRL<(event: PointerEvent, newEventStartDateTime: Date) => any>;
  timeHourFrom: number;
  timeHourTo: number;
  times: { time: Date }[];
};

export const CalendarBody = component$(
  <CalendarEvent extends Record<string, any>>({
    dates,
    endOfDayTrasholdMinutes,
    eventComponent: EventComponent,
    events,
    onCalendarNewEvent$,
    timeHourFrom,
    timeHourTo,
    times,
  }: CalendarBodyProps<CalendarEvent>) => {
    const timeFormatter = new Intl.DateTimeFormat("cs", { hourCycle: "h23", timeStyle: "short" });

    const hRef = useSignal<HTMLElement>();
    const vRef = useSignal<HTMLElement>();
    const canvasRef = useSignal<HTMLElement>();

    const startDate = dates[0]?.date ?? new Date();
    const startDateTs = startDate.getTime();
    const timeSlots = (timeHourTo - timeHourFrom) * 12 - 1;

    const location = useLocation();
    useTask$(({ track }) => {
      track(() => location.isNavigating);
      if (isServer) return;
      if (!location.isNavigating) {
        if (canvasRef.value) {
          canvasRef.value.scroll({ behavior: "smooth", left: 0, top: 0 });
        }
      }
    });

    return (
      <div class="isolate flex flex-auto flex-col overflow-auto bg-app-surface-base" ref={canvasRef}>
        <div class="flex w-fit flex-none flex-col">
          <CalendarTopDates dates={dates} />

          <div class="flex flex-auto">
            {/* Time background and separator line */}
            <div class="sticky left-0 z-10 w-14 flex-none bg-app-surface-base ring-1 ring-app-border-base"></div>
            <div class="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                class="col-start-1 col-end-2 row-start-1 grid divide-y divide-app-border-base"
                style={`grid-template-rows: repeat(${timeSlots}, 0.8rem)`}
              >
                <div class="row-end-1 h-7"></div>
                {times.map((item, idx) => (
                  <>
                    <div class="!border-t-app-border-base" key={`times-main-${idx}`} ref={idx === 0 ? hRef : undefined}>
                      <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-app-text-weak">
                        {timeFormatter.format(item.time)}
                      </div>
                    </div>
                    {Array.from({ length: idx < times.length - 1 ? 12 - 1 : 0 }).map((_, idx2) => (
                      <div
                        class={[idx2 === 5 ? "" : "!border-dashed !border-app-border-base/50"]}
                        key={`times-side-${idx}-${idx2}`}
                      ></div>
                    ))}
                  </>
                ))}
              </div>

              {/* Vertical lines    */}
              <div
                class="col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-app-border-base sm:grid"
                style={`grid-template-columns: repeat(${dates.length}, 14rem)`}
              >
                {dates.map((item, idx) => (
                  <div
                    class={[
                      "row-span-full",
                      item.separated && "!border-r-4 !border-double !border-r-app-border-hover",
                      idx === dates.length - 1 && "!border-r !border-r-app-border-base",
                    ]}
                    key={`vertical-sep-${idx}`}
                    ref={idx === 0 ? vRef : undefined}
                    style={`grid-column-start: ${idx + 1}`}
                  ></div>
                ))}
              </div>

              {/* Events */}
              <ol
                class="col-start-1 col-end-2 row-start-1 grid sm:pr-8"
                onDblClick$={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();

                  //
                  // From clicked position calculate DateTime and call callback handler.
                  //

                  const vRect = vRef.value!.getBoundingClientRect();
                  const hRect = hRef.value!.getBoundingClientRect();
                  const vW = vRect.width;
                  const hH = hRect.height;

                  const cX = ev.x - vRect.x;
                  const cY = ev.y - hRect.y;

                  const dayIndex = Math.max(0, Math.floor(cX / vW));
                  const day = dates[dayIndex];

                  const timeIndex = Math.min(Math.max(0, Math.floor(cY / hH)), timeSlots - 1);
                  const time = timeIndex / 12 + timeHourFrom;
                  const timeD = new Date(startDateTs + time * 60 * 60 * 1000);

                  let newEventStartDateTime = new Date(
                    day.date.getFullYear(),
                    day.date.getMonth(),
                    day.date.getDate(),
                    timeD.getHours(),
                    timeD.getMinutes(),
                  );

                  // Challenge trashold.
                  const trashDt = new Date(
                    new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), timeHourTo, 0).getTime() -
                      (endOfDayTrasholdMinutes ?? 60) * 60 * 1000,
                  );

                  if (newEventStartDateTime.getTime() > trashDt.getTime()) {
                    newEventStartDateTime = trashDt;
                  }

                  if (onCalendarNewEvent$) {
                    onCalendarNewEvent$(ev, newEventStartDateTime);
                  }
                }}
                style={`grid-template-columns: repeat(${dates.length}, 14rem); grid-template-rows: 1.75rem repeat(${timeSlots}, 0.8rem) auto;`}
              >
                {events.map((event) => (
                  <EventComponent
                    calendar={{ dateFrom: startDate, timeHourFrom, timeHourTo }}
                    dates={dates}
                    event={event}
                    key={event.id}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
