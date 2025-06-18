import { routeLoader$ } from "@builder.io/qwik-city";

import { _mockClient_medicalProcedurePlan } from "../../_mock-client";

type CalendarDate = { date: Date; separated: boolean };
type CalendarTime = { time: Date };
export type CdrCalendarEvent = {
  assigned: {
    collision: boolean;
    employee: {
      contract: number;
      fullName: string;
      id: string;
    };
    unavailable: boolean;
  }[];
  dateFrom: Date;
  dateTo: Date | null;
  description: null | string;
  duration: null | number;
  id: string;
  medicalProcedure: {
    avgTimeMin: number;
    id: string;
    medicalProcedureGroup: string;
    name: string;
    roomCount: number;
    roomIsShared: boolean;
    roomIsVirtual: boolean;
    roomNote: null | string;
  };
  organizationHierarchies: { id: string; name: string; parentId: null | string }[];
  stats: {
    collision: number;
    count: number;
    unavailable: number;
  };
  title: null | string;
};

export type CdrCalendarEventWithDateToAndDuration = {
  dateTo: Date;
  duration: number;
} & Omit<CdrCalendarEvent, "dateTo" | "duration">;

// eslint-disable-next-line qwik/loader-location
export const useLoadPageData = routeLoader$(async ({ error, params }) => {
  const { dateParam, segmentId } = params;
  const monthNameFormatter = new Intl.DateTimeFormat("cs", { month: "long", year: "numeric" });
  const prependZero = (v: number | string, len = 2): string => v.toString().padStart(len, "0");
  const buildDateParam = (y: number, m: number): string => `${y}-${prependZero(m + 1)}`;

  const [planStartDateYear, planStartDateMonth] = dateParam.split("-").map((i) => Number(i));
  // Selected moth first date...
  const fd = new Date(planStartDateYear, planStartDateMonth - 1, 1);
  const fdd = fd.getDay();
  // Get num of days to prepend from prev month
  const fds = fdd > 1 ? (fdd < 6 ? fdd - 1 : 0) : 0;
  const ld = new Date(fd.getFullYear(), fd.getMonth() + 1, 0);
  const ldd = ld.getDay();
  const lds = ldd > 0 ? (ldd < 5 ? 5 - ldd : 0) : 0;
  const planStartDate = fds > 0 ? new Date(fd.getFullYear(), fd.getMonth(), fds * -1 + 1) : fd;
  const planEndDate = lds > 0 ? new Date(ld.getFullYear(), ld.getMonth() + 1, lds) : ld;

  const { medicalProcedurePlan } = await _mockClient_medicalProcedurePlan(segmentId, planStartDate, planEndDate);

  if (medicalProcedurePlan == null) {
    throw error(404, "Plan for segment not found");
  }

  // Calculate dates for current selected plan...
  const viewStartMonth = 2;
  const viewStartYear = planStartDateMonth < 2 ? planStartDateYear - 1 : planStartDateYear;
  const months = Array.from({ length: 13 }, (_, i) => {
    const m = i + viewStartMonth;

    return m > 12
      ? {
          hrefArg: buildDateParam(viewStartYear + 1, m - 13),
          label: monthNameFormatter.format(new Date(viewStartYear + 1, m - 13, 1)),
        }
      : {
          hrefArg: buildDateParam(viewStartYear, m - 1),
          label: monthNameFormatter.format(new Date(viewStartYear, m - 1, 1)),
        };
  });

  const datesCount = Math.ceil((planEndDate.getTime() - planStartDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;

  // Calculate dates for current month
  const dates: CalendarDate[] = Array.from({ length: datesCount }, (_, i) => {
    const d = new Date(planStartDate.getFullYear(), planStartDate.getMonth(), planStartDate.getDate() + i);
    // date is outh of range of currenct month...
    // if (d.getMonth() === planStartDateMonth) return null;
    const day = d.getDay();
    // skip week-end days
    if (day < 1 || day > 5) return null;
    return { date: d, separated: day === 5 };
  }).filter((d): d is { date: Date; separated: boolean } => d != null);

  const times: CalendarTime[] = Array.from(
    { length: medicalProcedurePlan.timeHourEnd - medicalProcedurePlan.timeHourStart + 1 },
    (_, i) => ({
      time: new Date(1990, 0, 1, medicalProcedurePlan.timeHourStart + i, 0, 0),
    }),
  );

  return {
    dateParam,
    dates,
    events: medicalProcedurePlan.events.map((e) => ({
      ...e,
      dateFrom: new Date(e.dateFrom),
      dateTo: e.dateTo ? new Date(e.dateTo) : null,
      stats: {
        collision: e.assigned.reduce((a, i) => (i.collision ? a + 1 : a), 0),
        count: e.assigned.length,
        unavailable: e.assigned.reduce((a, i) => (i.unavailable ? a + 1 : a), 0),
      },
    })),
    months,
    organizationHierarchyItem: medicalProcedurePlan.organizationHierarchyItem,
    planStartDate: fd,
    planStartDateMonth,
    planStartDateYear,
    timeHourEnd: medicalProcedurePlan.timeHourEnd,
    timeHourStart: medicalProcedurePlan.timeHourStart,
    times,
  };
});
