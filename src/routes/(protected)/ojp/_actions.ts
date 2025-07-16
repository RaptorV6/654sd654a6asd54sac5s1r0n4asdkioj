/* eslint-disable no-console */
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
  console.log("🔧 addOjpEvent called with:", values);

  try {
    const validatedData = v.parse(OjpEventSchema, values);
    console.log("✅ addOjpEvent validation passed:", validatedData);

    const [hodinyOd, minutyOd] = validatedData.casOd.split(":").map(Number);
    const [hodinyDo, minutyDo] = validatedData.casDo.split(":").map(Number);

    const [year, month, day] = validatedData.datum.split("-").map(Number);

    const dateFrom = new Date(year, month - 1, day, hodinyOd, minutyOd, 0, 0);
    const dateTo = new Date(year, month - 1, day, hodinyDo, minutyDo, 0, 0);

    console.log("📅 Parsed dates:", { dateFrom, dateTo });

    if (dateTo <= dateFrom) {
      console.error("❌ addOjpEvent: Invalid time range");
      return { failed: true, message: "Čas konce musí být později než čas začátku" };
    }

    const duration = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60);
    const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log("⏱️ Calculated duration:", duration, "minutes, new ID:", newId);

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

    console.log("📝 Created new event:", newEvent);

    _mock_ojp_events.push(newEvent);
    console.log("💾 Added to _mock_ojp_events, total events now:", _mock_ojp_events.length);

    return { event: newEvent, success: true };
  } catch (error) {
    console.error("💥 addOjpEvent error:", error);
    if (error instanceof v.ValiError) {
      console.error("📋 Validation error details:", error.issues);
      return { failed: true, message: `Validační chyba: ${error.message}` };
    }
    return { failed: true, message: "Nastala chyba při přidávání události" };
  }
}

export function updateOjpEvent(values: OjpEventUpdateData) {
  console.log("🔧 updateOjpEvent called with:", values);

  try {
    const validatedData = v.parse(OjpEventUpdateSchema, values);
    console.log("✅ updateOjpEvent validation passed:", validatedData);

    const eventIndex = _mock_ojp_events.findIndex((event) => event.id === validatedData.id);
    console.log("🔍 Looking for event with ID:", validatedData.id, "found at index:", eventIndex);

    if (eventIndex === -1) {
      console.error(
        "❌ updateOjpEvent: Event not found, available IDs:",
        _mock_ojp_events.map((e) => e.id),
      );
      return { failed: true, message: "Událost nebyla nalezena" };
    }

    console.log("📝 Found existing event:", _mock_ojp_events[eventIndex]);

    const [hodinyOd, minutyOd] = validatedData.casOd.split(":").map(Number);
    const [hodinyDo, minutyDo] = validatedData.casDo.split(":").map(Number);

    const [year, month, day] = validatedData.datum.split("-").map(Number);

    const dateFrom = new Date(year, month - 1, day, hodinyOd, minutyOd, 0, 0);
    const dateTo = new Date(year, month - 1, day, hodinyDo, minutyDo, 0, 0);

    console.log("📅 Parsed new dates:", { dateFrom, dateTo });

    if (dateTo <= dateFrom) {
      console.error("❌ updateOjpEvent: Invalid time range");
      return { failed: true, message: "Čas konce musí být později než čas začátku" };
    }

    const duration = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60);
    console.log("⏱️ Calculated new duration:", duration, "minutes");

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

    console.log("📝 Created updated event:", updatedEvent);

    _mock_ojp_events[eventIndex] = updatedEvent;
    console.log("💾 Updated event in _mock_ojp_events at index:", eventIndex);

    return { event: updatedEvent, success: true };
  } catch (error) {
    console.error("💥 updateOjpEvent error:", error);
    if (error instanceof v.ValiError) {
      console.error("📋 Validation error details:", error.issues);
      return { failed: true, message: `Validační chyba: ${error.message}` };
    }
    return { failed: true, message: "Nastala chyba při aktualizaci události" };
  }
}

export function deleteOjpEvent(values: { id: string }) {
  console.log("🔧 deleteOjpEvent called with:", values);

  try {
    const validatedData = v.parse(v.object({ id: v.string() }), values);
    console.log("✅ deleteOjpEvent validation passed:", validatedData);

    const eventIndex = _mock_ojp_events.findIndex((event) => event.id === validatedData.id);
    console.log("🔍 Looking for event with ID:", validatedData.id, "found at index:", eventIndex);

    if (eventIndex === -1) {
      console.error(
        "❌ deleteOjpEvent: Event not found, available IDs:",
        _mock_ojp_events.map((e) => e.id),
      );
      return { failed: true, message: "Událost nebyla nalezena" };
    }

    const eventToDelete = _mock_ojp_events[eventIndex];
    console.log("📝 Found event to delete:", eventToDelete);

    _mock_ojp_events.splice(eventIndex, 1);
    console.log("🗑️ Deleted event from _mock_ojp_events, remaining events:", _mock_ojp_events.length);

    return { success: true };
  } catch (error) {
    console.error("💥 deleteOjpEvent error:", error);
    if (error instanceof v.ValiError) {
      console.error("📋 Validation error details:", error.issues);
      return { failed: true, message: `Validační chyba: ${error.message}` };
    }
    return { failed: true, message: "Nastala chyba při mazání události" };
  }
}
