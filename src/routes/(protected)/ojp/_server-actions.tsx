// src/routes/(protected)/ojp/_server-actions.ts
import { server$ } from "@builder.io/qwik-city";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

import type { OjpEvent, OjpSal } from "./_mock-events";

const CSV_PATH = join(process.cwd(), "src/routes/(protected)/ojp/events.csv");

// Helper funkce pro parsování CSV
function parseEventsFromCsv(csvContent: string): OjpEvent[] {
  const lines = csvContent.trim().split("\n");
  if (lines.length === 0) return [];

  return lines.map((line) => {
    const [id, den, sal, df, dt, title, typ, operator, poznamka] = line.split(";");
    const from = new Date(df);
    const to = new Date(dt);
    const durationMinutes = (to.getTime() - from.getTime()) / (1000 * 60);

    return {
      dateFrom: from,
      dateTo: to,
      den: den as any,
      duration: durationMinutes,
      id,
      operator: operator || undefined,
      poznamka: poznamka || undefined,
      sal: sal as OjpSal,
      title,
      typ: typ as any,
    };
  });
}

// Helper funkce pro konverzi na CSV
function eventsToCsv(events: OjpEvent[]): string {
  return events
    .map((event) => {
      const row = [
        event.id,
        event.den,
        event.sal,
        event.dateFrom.toISOString(),
        event.dateTo.toISOString(),
        event.title,
        event.typ,
        event.operator || "",
        event.poznamka || "",
      ];
      return row.join(";");
    })
    .join("\n");
}

// Server funkce pro čtení všech událostí
export const serverGetOjpEvents = server$(async (): Promise<OjpEvent[]> => {
  try {
    const csvContent = await readFile(CSV_PATH, "utf-8");
    return parseEventsFromCsv(csvContent);
  } catch (error) {
    console.error("Error reading CSV:", error);
    return [];
  }
});

// Server funkce pro přidání události
export const serverAddOjpEvent = server$(
  async (eventData: Omit<OjpEvent, "duration" | "id">): Promise<{ event?: OjpEvent; success: boolean }> => {
    try {
      const events = await serverGetOjpEvents();
      const duration = (eventData.dateTo.getTime() - eventData.dateFrom.getTime()) / (1000 * 60);

      // Generujeme nové ID
      const maxId = events.length > 0 ? Math.max(...events.map((e) => Number(e.id))) : 0;
      const newId = String(maxId + 1);

      const newEvent: OjpEvent = {
        ...eventData,
        duration,
        id: newId,
      };

      const updatedEvents = [...events, newEvent];
      const csvContent = eventsToCsv(updatedEvents);

      await writeFile(CSV_PATH, csvContent, "utf-8");

      return { event: newEvent, success: true };
    } catch (error) {
      console.error("Error adding event:", error);
      return { success: false };
    }
  },
);

// Server funkce pro aktualizaci události
export const serverUpdateOjpEvent = server$(
  async (id: string, eventData: Partial<Omit<OjpEvent, "id">>): Promise<{ success: boolean }> => {
    try {
      const events = await serverGetOjpEvents();
      const eventIndex = events.findIndex((event) => event.id === id);

      if (eventIndex === -1) {
        return { success: false };
      }

      const updatedEvent = { ...events[eventIndex], ...eventData };

      // Přepočítáme duration pokud jsou změněny časy
      if (eventData.dateFrom && eventData.dateTo) {
        updatedEvent.duration = (eventData.dateTo.getTime() - eventData.dateFrom.getTime()) / (1000 * 60);
      }

      events[eventIndex] = updatedEvent;
      const csvContent = eventsToCsv(events);

      await writeFile(CSV_PATH, csvContent, "utf-8");

      return { success: true };
    } catch (error) {
      console.error("Error updating event:", error);
      return { success: false };
    }
  },
);

// Server funkce pro smazání události
export const serverDeleteOjpEvent = server$(async (id: string): Promise<{ success: boolean }> => {
  try {
    const events = await serverGetOjpEvents();
    const filteredEvents = events.filter((event) => event.id !== id);

    if (filteredEvents.length === events.length) {
      return { success: false }; // Event nebyl nalezen
    }

    const csvContent = eventsToCsv(filteredEvents);
    await writeFile(CSV_PATH, csvContent, "utf-8");

    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false };
  }
});
