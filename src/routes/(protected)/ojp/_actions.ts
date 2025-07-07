import * as v from "valibot";

import type { OjpSal } from "./_mock-events";

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

export function addOjpEvent(values: OjpEventFormData) {
  try {
    // Valibot validace
    const validatedData = v.parse(OjpEventSchema, values);

    const [hodinyOd, minutyOd] = validatedData.casOd.split(":").map(Number);
    const [hodinyDo, minutyDo] = validatedData.casDo.split(":").map(Number);

    const dateFrom = new Date(validatedData.datum);
    dateFrom.setHours(hodinyOd, minutyOd, 0, 0);

    const dateTo = new Date(validatedData.datum);
    dateTo.setHours(hodinyDo, minutyDo, 0, 0);

    if (dateTo <= dateFrom) {
      return { failed: true, message: "Čas konce musí být později než čas začátku" };
    }

    const duration = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60);
    const newId = String(Date.now());

    const newEvent = {
      dateFrom,
      dateTo,
      den: getDenFromDate(dateFrom),
      duration,
      id: newId,
      operator: validatedData.operator || undefined,
      poznamka: validatedData.poznamka || undefined,
      sal: validatedData.sal as OjpSal,
      title: validatedData.title,
      typ: validatedData.typ as any,
    };

    _mock_ojp_events.push(newEvent);

    return { event: newEvent, success: true };
  } catch (error) {
    console.error("Add event error:", error);
    if (error instanceof v.ValiError) {
      return { failed: true, message: `Validační chyba: ${error.message}` };
    }
    return { failed: true, message: "Nastala chyba při přidávání události" };
  }
}

export function updateOjpEvent(values: OjpEventUpdateData) {
  try {
    // Valibot validace
    const validatedData = v.parse(OjpEventUpdateSchema, values);

    const eventIndex = _mock_ojp_events.findIndex((event) => event.id === validatedData.id);

    if (eventIndex === -1) {
      return { failed: true, message: "Událost nebyla nalezena" };
    }

    const [hodinyOd, minutyOd] = validatedData.casOd.split(":").map(Number);
    const [hodinyDo, minutyDo] = validatedData.casDo.split(":").map(Number);

    const dateFrom = new Date(validatedData.datum);
    dateFrom.setHours(hodinyOd, minutyOd, 0, 0);

    const dateTo = new Date(validatedData.datum);
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
      operator: validatedData.operator || undefined,
      poznamka: validatedData.poznamka || undefined,
      sal: validatedData.sal as OjpSal,
      title: validatedData.title,
      typ: validatedData.typ as any,
    };

    _mock_ojp_events[eventIndex] = updatedEvent;

    return { event: updatedEvent, success: true };
  } catch (error) {
    console.error("Update event error:", error);
    if (error instanceof v.ValiError) {
      return { failed: true, message: `Validační chyba: ${error.message}` };
    }
    return { failed: true, message: "Nastala chyba při aktualizaci události" };
  }
}

export function deleteOjpEvent(values: { id: string }) {
  try {
    const validatedData = v.parse(v.object({ id: v.string() }), values);

    const eventIndex = _mock_ojp_events.findIndex((event) => event.id === validatedData.id);

    if (eventIndex === -1) {
      return { failed: true, message: "Událost nebyla nalezena" };
    }

    _mock_ojp_events.splice(eventIndex, 1);

    return { success: true };
  } catch (error) {
    console.error("Delete event error:", error);
    if (error instanceof v.ValiError) {
      return { failed: true, message: `Validační chyba: ${error.message}` };
    }
    return { failed: true, message: "Nastala chyba při mazání události" };
  }
}
