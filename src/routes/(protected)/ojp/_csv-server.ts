import { server$ } from "@builder.io/qwik-city";

import type { OjpEvent } from "./_mock-events";

export const writeCsvToFile = server$(async (events: OjpEvent[]) => {
  try {
    const { writeFile } = await import("fs/promises");
    const { join } = await import("path");

    const csvLines = events.map((event) =>
      [
        event.id,
        event.den,
        event.sal,
        event.dateFrom.toISOString(),
        event.dateTo.toISOString(),
        event.title,
        event.typ,
        event.operator || "",
        event.poznamka || "",
      ].join(";"),
    );

    const csvContent = csvLines.join("\n");
    const filePath = join(process.cwd(), "src/routes/(protected)/ojp/events.csv");

    await writeFile(filePath, csvContent, "utf-8");
    return { success: true };
  } catch (error) {
    console.error("Error writing CSV:", error);
    return { error: String(error), success: false };
  }
});
