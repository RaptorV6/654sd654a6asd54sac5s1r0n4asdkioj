import type { CalendarEventPosition } from "~/lib/calendar/calendar-events-position";

import { splitCsv } from "~/lib/mock-client-helpers";

import eventsCsv from "./events.csv?raw";

export type ApplicationFormsEvent = {
  cpd: string;
  dateFrom: Date;
  dateTo: Date;
  duration: number; // v minutách
  id: string;
  jmeno: string;
  poznamka: string;
  title: string;
};

export type ApplicationFormsEventPositioned = ApplicationFormsEvent & CalendarEventPosition;

const mockDataSourceCols = ["id", "df", "dt", "title", "cpd", "jmeno", "poznamka"] as const;
const csvText = eventsCsv.trim();

export const _mock_events: ApplicationFormsEvent[] = splitCsv(csvText, mockDataSourceCols).map((row) => {
  const from = new Date(row.df);
  const to = new Date(row.dt);
  const durationMinutes = (to.getTime() - from.getTime()) / (1000 * 60);

  return {
    cpd: row.cpd,
    dateFrom: from,
    dateTo: to,
    duration: durationMinutes,
    id: row.id,
    jmeno: row.jmeno,
    poznamka: row.poznamka,
    title: row.title,
  };
}) satisfies ApplicationFormsEvent[];
