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
    const validatedData = v.parse(OjpEventSchema, values);

    const [hodinyOd, minutyOd] = validatedData.casOd.split(":").map(Number);
    const [hodinyDo, minutyDo] = validatedData.casDo.split(":").map(Number);

    const [year, month, day] = validatedData.datum.split("-").map(Number);

    const dateFrom = new Date(year, month - 1, day, hodinyOd, minutyOd, 0, 0);
    const dateTo = new Date(year, month - 1, day, hodinyDo, minutyDo, 0, 0);

    if (dateTo <= dateFrom) {
      return { failed: true, message: "Čas konce musí být později než čas začátku" };
    }

    const duration = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60);
    const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

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
    if (error instanceof v.ValiError) {
      return { failed: true, message: `Validační chyba: ${error.message}` };
    }
    return { failed: true, message: "Nastala chyba při přidávání události" };
  }
}

export function updateOjpEvent(values: OjpEventUpdateData) {
  try {
    const validatedData = v.parse(OjpEventUpdateSchema, values);
    const eventIndex = _mock_ojp_events.findIndex((event) => event.id === validatedData.id);

    if (eventIndex === -1) {
      return { failed: true, message: "Událost nebyla nalezena" };
    }

    const originalEvent = _mock_ojp_events[eventIndex];

    // Parse nové časy
    const [hodinyOd, minutyOd] = validatedData.casOd.split(":").map(Number);
    const [hodinyDo, minutyDo] = validatedData.casDo.split(":").map(Number);
    const [year, month, day] = validatedData.datum.split("-").map(Number);

    const dateFrom = new Date(year, month - 1, day, hodinyOd, minutyOd, 0, 0);
    const dateTo = new Date(year, month - 1, day, hodinyDo, minutyDo, 0, 0);

    if (dateTo <= dateFrom) {
      return { failed: true, message: "Čas konce musí být později než čas začátku" };
    }

    const duration = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60);

    // Najdi navazující separátor (pokud je operace)
    let separatorToUpdate = null;
    let separatorIndex = -1;

    if (originalEvent.typ === "operace") {
      // Najdi separátor který začíná když tahle operace končí
      separatorIndex = _mock_ojp_events.findIndex((event, idx) => {
        if (idx === eventIndex) return false; // Skip sebe
        if (event.sal !== originalEvent.sal) return false; // Musí být stejný sál
        if (event.dateFrom.toDateString() !== originalEvent.dateFrom.toDateString()) return false; // Stejný den

        // Je to separátor/úklid?
        if (event.typ !== "uklid") return false;

        // Začíná těsně po původní operaci? (tolerance 5 min)
        const timeDiff = Math.abs(event.dateFrom.getTime() - originalEvent.dateTo.getTime());
        return timeDiff < 5 * 60 * 1000; // 5 minut tolerance
      });

      if (separatorIndex !== -1) {
        separatorToUpdate = _mock_ojp_events[separatorIndex];
      }
    }

    // Update hlavní událost
    const updatedEvent = {
      ...originalEvent,
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

    // Update navazující separátor
    if (separatorToUpdate && separatorIndex !== -1) {
      const separatorDuration = separatorToUpdate.duration; // Zachovej původní délku
      const newSeparatorStart = new Date(dateTo); // Začni kdy operace končí
      const newSeparatorEnd = new Date(newSeparatorStart.getTime() + separatorDuration * 60 * 1000);

      const updatedSeparator = {
        ...separatorToUpdate,
        dateFrom: newSeparatorStart,
        dateTo: newSeparatorEnd,
        den: getDenFromDate(newSeparatorStart),
        sal: validatedData.sal as OjpSal, // Případně nový sál
      };

      _mock_ojp_events[separatorIndex] = updatedSeparator;
    }

    return { event: updatedEvent, success: true };
  } catch (error) {
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
    if (error instanceof v.ValiError) {
      return { failed: true, message: `Validační chyba: ${error.message}` };
    }
    return { failed: true, message: "Nastala chyba při mazání události" };
  }
}
