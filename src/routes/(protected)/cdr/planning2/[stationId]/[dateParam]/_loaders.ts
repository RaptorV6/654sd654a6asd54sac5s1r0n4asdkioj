import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import { routeLoader$, server$ } from "@builder.io/qwik-city";

import { calendarDatesRange } from "~/lib/calendar/calendar-dates-range";
import { calendarEventsPosition } from "~/lib/calendar/calendar-events-position";
import { serverGetPdfAsDataUrl } from "~/server/server-pdf";

import { _mock_cdr_createIrisClient } from "../../_mock-cdr-client";
import { getDateParam } from "../../get-date-param";
import { buildCdrProgramPdfPrintSettings } from "./pdf";

// eslint-disable-next-line qwik/loader-location
export const useCdrProgramData = routeLoader$(async ({ env, error, params }) => {
  const { dateParam, stationId } = params;

  try {
    const {
      calendarHourFrom,
      calendarHourTo,
      // dateParam: _dateParam,
      dates,
      events,
      firstDateOfMonth,
      months,
      station,
      // stationId: _stationId,
      times,
    } = await rcpGetCalendarData(env, stationId, dateParam);
    return {
      calendarHourFrom,
      calendarHourTo,
      dateParam,
      dates,
      events,
      firstDateOfMonth,
      months,
      station,
      stationId,
      times,
    };
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "Station not found.") {
        throw error(404, "Station not found.");
      }
    } else {
      console.error("Loading of CDR calendar events faild with error", err);
    }
  }
  throw error(500, "Unkwnown error");
});

async function rcpGetCalendarData(env: EnvGetter, stationId: string, dateParam: string) {
  const monthNameFormatter = new Intl.DateTimeFormat("cs", { month: "long", year: "numeric" });

  const [planStartDateYear, planStartDateMonth] = dateParam.split("-").map((i) => Number(i));
  const firstDateOfMonth = new Date(planStartDateYear, planStartDateMonth - 1, 1);
  const lastDateOfMonth = new Date(firstDateOfMonth.getFullYear(), firstDateOfMonth.getMonth() + 1, 0);
  const { calendarHourFrom, calendarHourTo, dates, times } = calendarDatesRange({
    dateFrom: firstDateOfMonth,
    dateTo: lastDateOfMonth,
    separate: "weeks",
  });

  const { station, treatmentProgramEvents: _events } = await _mock_cdr_createIrisClient(env).query({
    station: {
      __args: {
        id: stationId,
      },
      id: true,
      name: true,
    },
    treatmentProgramEvents: {
      __args: {
        dateOfMonth: firstDateOfMonth,
        stationId,
      },
      assigned: {
        employee: {
          fullName: true,
          id: true,
        },
      },
      competenceRoles: {
        code: true,
        id: true,
        name: true,
      },
      dateFrom: true,
      dateTo: true,
      description: true,
      duration: true,
      id: true,
      level: {
        code: true,
        id: true,
        name: true,
      },
      medicalProcedure: {
        id: true,
        name: true,
      },
      room: true,
      station: {
        id: true,
        name: true,
      },
      title: true,
    },
  });

  if (station == null) {
    throw new Error("Station not found.");
  }

  const events = calendarEventsPosition(_events);

  // Calculate items to calendar heared to select from...
  const viewStartMonth = 2;
  const viewStartYear = planStartDateMonth < 2 ? planStartDateYear - 1 : planStartDateYear;
  const months = Array.from({ length: 13 }, (_, i) => {
    const m = i + viewStartMonth;

    const monthData = (d: Date) => ({
      hrefArg: getDateParam(d),
      label: monthNameFormatter.format(d),
    });

    return m > 12 ? monthData(new Date(viewStartYear + 1, m - 13, 1)) : monthData(new Date(viewStartYear, m - 1, 1));
  });

  return {
    calendarHourFrom,
    calendarHourTo,
    dateParam,
    dates,
    events,
    firstDateOfMonth,
    months,
    station,
    stationId,
    times,
  };
}

async function rpcCrdProgramPdfDataUrl(env: EnvGetter, stationId: string, dateParam: string) {
  const data = await rcpGetCalendarData(env, stationId, dateParam);
  const pdfData = await buildCdrProgramPdfPrintSettings(data, "RNB");
  const pdfDataUrl = await serverGetPdfAsDataUrl(env, pdfData);
  return pdfDataUrl;
}

export const serverCdrProgramPdfDataUrl = server$(async function () {
  const { dateParam, stationId } = this.params;
  return rpcCrdProgramPdfDataUrl(this.env, stationId, dateParam);
});
