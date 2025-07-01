import { routeAction$, valibot$ } from "@builder.io/qwik-city";
import * as v from "valibot";

import type { OjpSal } from "./_mock-events";

import { writeCsvToFile } from "./_csv-server";
import { _mock_ojp_events, getDenFromDate } from "./_mock-events";

const OjpEventSchema = v.object({
  casDo: v.pipe(v.string(), v.regex(/^\d{2}:\d{2}$/)),
  casOd: v.pipe(v.string(), v.regex(/^\d{2}:\d{2}$/)),
  datum: v.pipe(v.string(), v.isoDate()),
  operator: v.optional(v.string()),
  poznamka: v.optional(v.string()),
  sal: v.pipe(v.string(), v.nonEmpty()),
  title: v.pipe(v.string(), v.nonEmpty()),
  typ: v.pipe(v.string(), v.nonEmpty()),
});

const OjpEventUpdateSchema = v.intersect([
  OjpEventSchema,
  v.object({
    id: v.pipe(v.string(), v.nonEmpty()),
  }),
]);

export type OjpEventFormData = v.InferInput<typeof OjpEventSchema>;
export type OjpEventUpdateData = v.InferInput<typeof OjpEventUpdateSchema>;

// eslint-disable-next-line qwik/loader-location
export const useAddOjpEventAction = routeAction$(async (values) => {
  try {
    const [hodinyOd, minutyOd] = values.casOd.split(":").map(Number);
    const [hodinyDo, minutyDo] = values.casDo.split(":").map(Number);

    const dateFrom = new Date(values.datum);
    dateFrom.setHours(hodinyOd, minutyOd, 0, 0);

    const dateTo = new Date(values.datum);
    dateTo.setHours(hodinyDo, minutyDo, 0, 0);

    if (dateTo <= dateFrom) {
      return { failed: true, message: "Čas konce musí být později než čas začátku" };
    }

    const duration = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60);
    const newId = String(Date.now()); // Použijeme timestamp pro unikátní ID

    const newEvent = {
      dateFrom,
      dateTo,
      den: getDenFromDate(dateFrom),
      duration,
      id: newId,
      operator: values.operator || undefined,
      poznamka: values.poznamka || undefined,
      sal: values.sal as OjpSal,
      title: values.title,
      typ: values.typ as any,
    };

    // Přidáme do in-memory pole
    _mock_ojp_events.push(newEvent);

    // Uložíme do CSV
    await writeCsvToFile(_mock_ojp_events);

    return { event: newEvent, success: true };
  } catch (error) {
    console.error("Add event error:", error);
    return { failed: true, message: "Nastala chyba při přidávání události" };
  }
}, valibot$(OjpEventSchema));

// eslint-disable-next-line qwik/loader-location
export const useUpdateOjpEventAction = routeAction$(async (values) => {
  try {
    const eventIndex = _mock_ojp_events.findIndex((event) => event.id === values.id);

    if (eventIndex === -1) {
      return { failed: true, message: "Událost nebyla nalezena" };
    }

    const [hodinyOd, minutyOd] = values.casOd.split(":").map(Number);
    const [hodinyDo, minutyDo] = values.casDo.split(":").map(Number);

    const dateFrom = new Date(values.datum);
    dateFrom.setHours(hodinyOd, minutyOd, 0, 0);

    const dateTo = new Date(values.datum);
    dateTo.setHours(hodinyDo, minutyDo, 0, 0);

    if (dateTo <= dateFrom) {
      return { failed: true, message: "Čas konce musí být později než čas začátku" };
    }

    const duration = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60);

    const updatedEvent = {
      ..._mock_ojp_events[eventIndex],
      dateFrom,
      dateTo,
      den: getDenFromDate(dateFrom),
      duration,
      operator: values.operator || undefined,
      poznamka: values.poznamka || undefined,
      sal: values.sal as OjpSal,
      title: values.title,
      typ: values.typ as any,
    };

    _mock_ojp_events[eventIndex] = updatedEvent;

    // Uložíme do CSV
    await writeCsvToFile(_mock_ojp_events);

    return { event: updatedEvent, success: true };
  } catch (error) {
    console.error("Update event error:", error);
    return { failed: true, message: "Nastala chyba při aktualizaci události" };
  }
}, valibot$(OjpEventUpdateSchema));

// eslint-disable-next-line qwik/loader-location
export const useDeleteOjpEventAction = routeAction$(
  async (values) => {
    try {
      const eventIndex = _mock_ojp_events.findIndex((event) => event.id === values.id);

      if (eventIndex === -1) {
        return { failed: true, message: "Událost nebyla nalezena" };
      }

      _mock_ojp_events.splice(eventIndex, 1);

      // Uložíme do CSV
      await writeCsvToFile(_mock_ojp_events);

      return { success: true };
    } catch (error) {
      console.error("Delete event error:", error);
      return { failed: true, message: "Nastala chyba při mazání události" };
    }
  },
  valibot$(v.object({ id: v.string() })),
);
