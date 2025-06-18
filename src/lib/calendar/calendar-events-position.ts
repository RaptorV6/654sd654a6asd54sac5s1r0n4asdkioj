type CalendarEvent = {
  dateFrom: Date;
  dateTo: Date;
  duration: number;
  id: string;
};
export type CalendarEventPosition = {
  columnCount: number;
  columnIndex: number;
};

function isOverlapping(a: CalendarEvent, b: CalendarEvent): boolean {
  return a.dateFrom < b.dateTo && b.dateFrom < a.dateTo;
}

/**
 * Calculates vertical position of events.
 *
 * @param events
 * @returns
 */
export function calendarEventsPosition<T extends CalendarEvent>(events: T[]): (CalendarEventPosition & T)[] {
  const sorted = [...events].sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());
  const positioned: (CalendarEventPosition & T)[] = [];

  for (const current of sorted) {
    const overlapping = positioned.filter((e) => isOverlapping(e, current));

    // Find empty column index
    const usedIndices = new Set(overlapping.map((e) => e.columnIndex));
    let columnIndex = 0;
    while (usedIndices.has(columnIndex)) {
      columnIndex++;
    }

    const group = [...overlapping, { ...current, columnCount: 0, columnIndex }];
    const columnCount = group.reduce((max, e) => Math.max(max, e.columnIndex + 1), 0);

    // Update columnCount in group
    group.forEach((e) => {
      const index = positioned.findIndex((p) => p.id === e.id);
      if (index !== -1) {
        positioned[index].columnCount = columnCount;
      } else if (e.id === current.id) {
        positioned.push({ ...current, columnCount, columnIndex: e.columnIndex });
      }
    });
  }

  return positioned;
}
