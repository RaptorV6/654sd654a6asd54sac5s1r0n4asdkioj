import type { OjpEventPositioned, OjpSal } from "./_mock-events";

export interface CollisionInfo {
  conflictingEvents: OjpEventPositioned[];
  hasCollision: boolean;
  isOutOfBounds: boolean;
  outOfBoundsReason?: "after-end" | "before-start";
}

export interface DraggedEventInfo {
  eventId: string;
  newDate: Date;
  newEndTime: Date;
  newSal: OjpSal;
  newSeparatorEndTime?: Date;
  newSeparatorStartTime?: Date;
  newStartTime: Date;
  originalEvent: OjpEventPositioned;
  originalSeparator?: OjpEventPositioned;
  separatorId?: string;
}

interface CollisionDetectionParams {
  draggedEventInfo: DraggedEventInfo;
  events: OjpEventPositioned[];
  timeHourFrom: number;
  timeHourTo: number;
}

/**
 * Detekuje kolize mezi táženou událostí a existujícími událostmi
 */
export const detectEventCollisions = (params: CollisionDetectionParams): CollisionInfo => {
  const { draggedEventInfo, events, timeHourFrom, timeHourTo } = params;

  // Vytvoř kalendářové hranice pro daný den
  const dayStart = new Date(draggedEventInfo.newDate);
  dayStart.setHours(timeHourFrom, 0, 0, 0);

  const dayEnd = new Date(draggedEventInfo.newDate);
  dayEnd.setHours(timeHourTo, 0, 0, 0);

  // Kontrola hranic kalendáře
  const isOutOfBounds =
    draggedEventInfo.newStartTime < dayStart ||
    draggedEventInfo.newEndTime > dayEnd ||
    (draggedEventInfo.newSeparatorEndTime && draggedEventInfo.newSeparatorEndTime > dayEnd) ||
    (draggedEventInfo.newSeparatorStartTime && draggedEventInfo.newSeparatorStartTime < dayStart);

  const outOfBoundsReason: "after-end" | "before-start" | undefined =
    draggedEventInfo.newStartTime < dayStart ||
    (draggedEventInfo.newSeparatorStartTime && draggedEventInfo.newSeparatorStartTime < dayStart)
      ? "before-start"
      : draggedEventInfo.newEndTime > dayEnd ||
          (draggedEventInfo.newSeparatorEndTime && draggedEventInfo.newSeparatorEndTime > dayEnd)
        ? "after-end"
        : undefined;

  if (isOutOfBounds) {
    return {
      conflictingEvents: [],
      hasCollision: false,
      isOutOfBounds: true,
      outOfBoundsReason,
    };
  }

  // Najdi všechny události ve stejném sále a dni (kromě táhané události)
  const relevantEvents = events.filter((event) => {
    // Skip táhnanou událost a její separátor
    if (event.id === draggedEventInfo.eventId || event.id === draggedEventInfo.separatorId) {
      return false;
    }

    // Musí být stejný sál a den
    return (
      event.sal === draggedEventInfo.newSal && event.dateFrom.toDateString() === draggedEventInfo.newDate.toDateString()
    );
  });

  const conflictingEvents: OjpEventPositioned[] = [];

  // Kontrola kolize pro hlavní událost
  for (const event of relevantEvents) {
    const hasOverlap = timeRangesOverlap(
      draggedEventInfo.newStartTime,
      draggedEventInfo.newEndTime,
      event.dateFrom,
      event.dateTo,
    );
    if (hasOverlap) {
      conflictingEvents.push(event);
    }
  }

  // Kontrola kolize pro separátor (pokud existuje)
  if (draggedEventInfo.newSeparatorStartTime && draggedEventInfo.newSeparatorEndTime) {
    for (const event of relevantEvents) {
      if (
        timeRangesOverlap(
          draggedEventInfo.newSeparatorStartTime,
          draggedEventInfo.newSeparatorEndTime,
          event.dateFrom,
          event.dateTo,
        )
      ) {
        // Přidej pouze pokud už není v seznamu
        if (!conflictingEvents.some((ce) => ce.id === event.id)) {
          conflictingEvents.push(event);
        }
      }
    }
  }

  const result = {
    conflictingEvents,
    hasCollision: conflictingEvents.length > 0,
    isOutOfBounds: false,
  };

  return result;
};

/**
 * Kontroluje překryv dvou časových rozsahů
 */
export const timeRangesOverlap = (start1: Date, end1: Date, start2: Date, end2: Date): boolean => {
  return start1 < end2 && end1 > start2;
};

/**
 * Vytvořá info о táhané události na základě drop pozice
 */
export const createDraggedEventInfo = (
  eventId: string,
  separatorId: string | undefined,
  events: OjpEventPositioned[],
  newDate: Date,
  newSal: OjpSal,
  newTime: Date,
): DraggedEventInfo | null => {
  const originalEvent = events.find((e) => e.id === eventId);
  if (!originalEvent) return null;

  const originalSeparator = separatorId ? events.find((e) => e.id === separatorId) : undefined;

  // Vypočítej nové časy
  const originalDuration = originalEvent.dateTo.getTime() - originalEvent.dateFrom.getTime();
  const newEndTime = new Date(newTime.getTime() + originalDuration);

  let newSeparatorStartTime: Date | undefined;
  let newSeparatorEndTime: Date | undefined;

  if (originalSeparator) {
    const separatorDuration = originalSeparator.dateTo.getTime() - originalSeparator.dateFrom.getTime();

    if (originalEvent.typ === "operace") {
      // Operace → separátor následuje
      newSeparatorStartTime = new Date(newEndTime);
      newSeparatorEndTime = new Date(newSeparatorStartTime.getTime() + separatorDuration);
    } else if (originalEvent.typ === "uklid") {
      // Separátor → operace předchází
      newSeparatorEndTime = new Date(newTime);
      newSeparatorStartTime = new Date(newSeparatorEndTime.getTime() - separatorDuration);
    }
  }

  return {
    eventId,
    newDate,
    newEndTime,
    newSal,
    newSeparatorEndTime,
    newSeparatorStartTime,
    newStartTime: newTime,
    originalEvent,
    originalSeparator,
    separatorId,
  };
};

/**
 * Vytvoří info o táhané události zo snapshot-u (rieši race condition)
 */
export const createDraggedEventInfoFromSnapshot = (
  originalEvent: OjpEventPositioned,
  originalSeparator: OjpEventPositioned | undefined,
  newDate: Date,
  newSal: OjpSal,
  newTime: Date,
): DraggedEventInfo => {
  // Vypočítaj nové časy
  const originalDuration = originalEvent.dateTo.getTime() - originalEvent.dateFrom.getTime();
  const newEndTime = new Date(newTime.getTime() + originalDuration);

  let newSeparatorStartTime: Date | undefined;
  let newSeparatorEndTime: Date | undefined;

  if (originalSeparator) {
    const separatorDuration = originalSeparator.dateTo.getTime() - originalSeparator.dateFrom.getTime();

    if (originalEvent.typ === "operace") {
      // Operace → separátor nasleduje
      newSeparatorStartTime = new Date(newEndTime);
      newSeparatorEndTime = new Date(newSeparatorStartTime.getTime() + separatorDuration);
    } else if (originalEvent.typ === "uklid") {
      // Separátor → operace predchádza
      newSeparatorEndTime = new Date(newTime);
      newSeparatorStartTime = new Date(newSeparatorEndTime.getTime() - separatorDuration);
    }
  }

  return {
    eventId: originalEvent.id,
    newDate,
    newEndTime,
    newSal,
    newSeparatorEndTime,
    newSeparatorStartTime,
    newStartTime: newTime,
    originalEvent,
    originalSeparator,
    separatorId: originalSeparator?.id,
  };
};
