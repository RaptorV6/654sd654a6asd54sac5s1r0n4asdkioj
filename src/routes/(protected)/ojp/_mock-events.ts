// src/routes/(protected)/ojp/_mock-events.ts
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
  typ: "operace" | "pauza" | "svatek" | "uklid";
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
  { bgColor: "#D2B48C", color: "#8B4513", displayName: "SEPTICKÝ", name: "SEPTICKY", uhrada: 0, vykony: 0 },
  { bgColor: "#90EE90", color: "#006400", displayName: "ZELENÝ", name: "ZELENY", uhrada: 355865, vykony: 10 },
];

// Číselníky
export const OJP_OPERATORI = [
  { id: "dvorak", name: "Dr. Dvorák" },
  { id: "poledni", name: "Dr. Polední" },
  { id: "smetana", name: "Dr. Smetana" },
  { id: "plzen", name: "Dr. Plzeň" },
  { id: "zeithaml", name: "Dr. Zeithaml" },
  { id: "kopecny", name: "Dr. Kopečný" },
  { id: "neprass", name: "Dr. Neprašs" },
];

export const OJP_TYPY = [
  { id: "operace", name: "Operace" },
  { id: "uklid", name: "Úklid" },
  { id: "pauza", name: "Pauza" },
  { id: "svatek", name: "Svátek" },
];

export const OJP_OPERACNI_VYKONY = [
  { id: "rutinni", name: "Rutinní zákrok", operatori: ["dvorak", "kopecny"], saly: ["BEZOVY", "RUZOVY"] },
  { id: "urgentni", name: "Urgentní zákrok", operatori: ["dvorak", "smetana"], saly: ["BEZOVY", "ZELENY"] },
  { id: "dlouhy", name: "Dlouhý zákrok", operatori: ["poledni", "neprass"], saly: ["MODRY"] },
  { id: "ortopedicky", name: "Ortopedický zákrok", operatori: ["plzen"], saly: ["RUZOVY"] },
  { id: "abdominalni", name: "Abdominální zákrok", operatori: ["zeithaml"], saly: ["ORANZOVY"] },
];

export const OJP_JINE = [
  { id: "us", name: "ÚS - Úklid sálu" },
  { id: "us_tep", name: "ÚS TEP - Technické vybavení" },
  { id: "obedova_pauza", name: "Obědová pauza" },
  { id: "technicka_pauza", name: "Technická pauza" },
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
    typ: row.typ as "operace" | "pauza" | "svatek" | "uklid",
  };
}) satisfies OjpEvent[];

export function getSalInfo(salName: OjpSal): OjpSalInfo {
  return OJP_SALY.find((s) => s.name === salName) || OJP_SALY[0];
}

export function getDenFromDate(date: Date): OjpDen {
  const dayIndex = date.getDay();
  const dayMap: OjpDen[] = ["NEDELE", "PONDELI", "UTERY", "STREDA", "CTVRTEK", "PATEK", "SOBOTA"] as any;
  return dayMap[dayIndex] || "PONDELI";
}

// CRUD operácie
export function addOjpEvent(eventData: Omit<OjpEvent, "duration" | "id">): OjpEvent {
  const duration = (eventData.dateTo.getTime() - eventData.dateFrom.getTime()) / (1000 * 60);
  const newId = String(_mock_ojp_events.length + 1);

  const newEvent: OjpEvent = {
    ...eventData,
    duration,
    id: newId,
  };

  _mock_ojp_events.push(newEvent);

  return newEvent;
}

export function updateOjpEvent(id: string, eventData: Partial<Omit<OjpEvent, "id">>): boolean {
  const index = _mock_ojp_events.findIndex((event) => event.id === id);
  if (index === -1) return false;

  const updatedEvent = { ..._mock_ojp_events[index], ...eventData };

  if (eventData.dateFrom && eventData.dateTo) {
    updatedEvent.duration = (eventData.dateTo.getTime() - eventData.dateFrom.getTime()) / (1000 * 60);
  }

  _mock_ojp_events[index] = updatedEvent;

  return true;
}

export function deleteOjpEvent(id: string): boolean {
  const index = _mock_ojp_events.findIndex((event) => event.id === id);
  if (index === -1) return false;

  _mock_ojp_events.splice(index, 1);
  return true;
}
