import { Card, CardBody, List, ListItem } from "@akeso/ui-components";
import { dateAddMinutes } from "@akeso/utils";
import { component$, useSignal } from "@builder.io/qwik";

import { Calendar, CalendarBody } from "~/components/calendar";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

const pageTitle = "Vytvoření žádanky";

export default component$(() => {
  const data = {
    dates: Array.from({ length: 5 }, (_, i) => {
      const td = new Date();
      return { date: new Date(td.getFullYear(), td.getMonth(), td.getDate() + i) };
    }),
    events: [],
    timeHourEnd: 15,
    timeHourStart: 7,
    times: [
      { time: new Date(2024, 4 - 1, 1, 7, 0) },
      { time: new Date(2024, 4 - 1, 1, 8, 0) },
      { time: new Date(2024, 4 - 1, 1, 9, 0) },
      { time: new Date(2024, 4 - 1, 1, 10, 0) },
      { time: new Date(2024, 4 - 1, 1, 11, 0) },
      { time: new Date(2024, 4 - 1, 1, 12, 0) },
      { time: new Date(2024, 4 - 1, 1, 13, 0) },
      { time: new Date(2024, 4 - 1, 1, 14, 0) },
    ],
  };
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>
      <div class="relative flex items-start gap-4">
        <Card class="max-h-[calc(100svh-8rem)] min-w-80 overflow-y-auto overflow-x-hidden">
          <CardBody class="">
            <List>
              <ListItem>Jednicka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
              <ListItem>Dvojaka</ListItem>
            </List>
          </CardBody>
        </Card>
        <div class="max-h-[calc(100svh-8rem)] min-w-80 max-w-[50svv] overflow-y-auto">Detail</div>
        <Card class="max-h-[calc(100svh-8rem)] min-w-80 flex-1">
          <Calendar>
            {/* <CdrCalendarHeader /> */}
            <CalendarBody
              dates={data.dates}
              eventComponent={ApplicationFormsCalendarEventComponent}
              events={data.events}
              timeHourEnd={data.timeHourEnd}
              timeHourStart={data.timeHourStart}
              times={data.times}
            />
          </Calendar>
        </Card>
      </div>
    </>
  );
});

// TODO: move `dateEqDates` to lib `@akeso/utils`.
const dateEqDates = (a: Date, b: Date) => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

type AppFormsCalendarEvent = {
  dateFrom: Date;
  description?: null | string;
  duration: number;
  id: string;
  title: string;
};

type ApplicationFormsCalendarEventComponentProps = {
  calendar: {
    startDate: Date;
    timeHourEnd: number;
    timeHourStart: number;
  };
  dates: { date: Date }[];
  event: AppFormsCalendarEvent;
};

const ApplicationFormsCalendarEventComponent = component$<ApplicationFormsCalendarEventComponentProps>(
  ({ calendar, dates, event }) => {
    const expanded = useSignal(false);
    const timeFormatter = new Intl.DateTimeFormat("cs", { hourCycle: "h23", timeStyle: "short" });

    const dateFrom = event.dateFrom;
    const dateTo = dateAddMinutes(event.duration, dateFrom);
    const duration = (dateTo.getTime() - dateFrom.getTime()) / (60 * 1000);

    // Calendar is divided to 5 min intervals
    const spanSlots = Math.ceil(duration / 5);

    const dateIndex = dates.findIndex((d) => dateEqDates(d.date, dateFrom));
    const timeIndex = ((dateFrom.getHours() - calendar.timeHourStart) * 60 + dateFrom.getMinutes()) / 5;

    return (
      <li
        class={"relative m-1 flex"}
        style={`grid-column-start: ${dateIndex + 1}; grid-row-start: ${timeIndex + 2}; grid-row-end: span ${spanSlots};`}
      >
        <button
          class={[
            "group absolute inset-0 !m-0 flex flex-col overflow-hidden overflow-y-auto rounded-lg p-1 text-xs/5",
            // Farba podla typu
            "bg-blue-50 text-blue-700 hover:bg-blue-100",
            // Je problem
            // event.stats.collision > 0 && "border-2 border-error-text-base",
            // event.stats.collision === 0 && event.stats.unavailable > 0 && "border-2 border-yellow-500",
          ]}
          onClick$={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();

            expanded.value = true;
          }}
          type="button"
        >
          <p class="order-1 text-left font-semibold">{event.title}</p>
          {/* <p class="order-2 text-left text-[0.6rem]/5 text-opacity-10">{event.description}</p> */}
          <div class="order-2 flex items-center justify-between text-left text-[0.6rem]/5 text-blue-500 group-hover:text-blue-700">
            <div class="inline-flex items-center gap-2 pr-2">
              <svg
                class="h-4 w-4 shrink-0"
                height="32"
                viewBox="0 0 24 24"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <p class="text-left text-[0.6rem]/5 text-blue-500 group-hover:text-blue-700">
            <time dateTime={dateFrom.toISOString()}>{timeFormatter.format(dateFrom)}</time>
            {" - "}
            <time dateTime={dateTo.toISOString()}>{timeFormatter.format(dateTo)}</time>
            {` (${duration} min)`}
          </p>
        </button>
      </li>
    );
  },
);
