import type { CalendarEventPosition } from "~/lib/calendar/calendar-events-position";

import { splitCsv } from "~/lib/mock-client-helpers";

import eventsCsv from "./events.csv?raw";

export type OjpSal = "BEZOVY" | "BILY" | "MODRY" | "ORANZOVY" | "RUZOVY" | "SEPTICKY" | "ZELENY";

export type OjpDen = "CTVRTEK" | "PATEK" | "PONDELI" | "STREDA" | "UTERY";

export type OjpEvent = {
  dateFrom: Date;
  dateTo: Date;
  den: OjpDen;
  duration: number; // v minutách
  id: string;
  operator?: string;
  poznamka?: string;
  sal: OjpSal;
  title: string;
  typ: "operace" | "pauza" | "uklid";
  uhrada?: number;
  vykony?: number;
};

export type OjpEventPositioned = CalendarEventPosition & OjpEvent;

export type OjpSalInfo = {
  bgColor: string;
  color: string;
  displayName: string;
  name: OjpSal;
  uhrada: number;
  vykony: number;
};

export const OJP_SALY: OjpSalInfo[] = [
  { bgColor: "#F5DEB3", color: "#8B4513", displayName: "BÉŽOVÝ", name: "BEZOVY", uhrada: 305831, vykony: 11 },
  { bgColor: "#F8F8FF", color: "#000000", displayName: "BÍLÝ", name: "BILY", uhrada: 0, vykony: 0 },
  { bgColor: "#ADD8E6", color: "#000080", displayName: "MODRÝ", name: "MODRY", uhrada: 726000, vykony: 5 },
  { bgColor: "#FFA500", color: "#FF4500", displayName: "ORANŽOVÝ", name: "ORANZOVY", uhrada: 491527, vykony: 10 },
  { bgColor: "#FFB6C1", color: "#8B008B", displayName: "RŮŽOVÝ", name: "RUZOVY", uhrada: 478180, vykony: 10 },
  { bgColor: "#D2B48C", color: "#8B4513", displayName: "ŠEPTICKÝ", name: "SEPTICKY", uhrada: 0, vykony: 0 },
  { bgColor: "#90EE90", color: "#006400", displayName: "ZELENÝ", name: "ZELENY", uhrada: 355865, vykony: 10 },
];

const mockDataSourceCols = ["id", "den", "sal", "df", "dt", "title", "typ", "operator", "poznamka"] as const;
const csvText = eventsCsv.trim();

export const _mock_ojp_events: OjpEvent[] = splitCsv(csvText, mockDataSourceCols).map((row) => {
  const from = new Date(row.df);
  const to = new Date(row.dt);
  const durationMinutes = (to.getTime() - from.getTime()) / (1000 * 60);

  return {
    dateFrom: from,
    dateTo: to,
    den: row.den as OjpDen,
    duration: durationMinutes,
    id: row.id,
    operator: row.operator || undefined,
    poznamka: row.poznamka || undefined,
    sal: row.sal as OjpSal,
    title: row.title,
    typ: row.typ as "operace" | "pauza" | "uklid",
  };
}) satisfies OjpEvent[];

export function getSalInfo(salName: OjpSal): OjpSalInfo {
  return OJP_SALY.find((s) => s.name === salName) || OJP_SALY[0];
}
