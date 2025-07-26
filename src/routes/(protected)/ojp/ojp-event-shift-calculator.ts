import type { OjpEventPositioned } from "./_mock-events";
import type { DraggedEventInfo } from "./ojp-collision-detection";

import { timeRangesOverlap } from "./ojp-collision-detection";

export interface EventShift {
  eventId: string;
  newEndTime: Date;
  newStartTime: Date;
  originalEvent: OjpEventPositioned;
}

export type ShiftDirection = "backward" | "forward";

export interface ShiftCalculationResult {
  direction: ShiftDirection;
  errorReason?: string;
  eventsToShift: EventShift[];
  isValid: boolean;
}

interface ShiftCalculationParams {
  allEvents: OjpEventPositioned[];
  draggedEventInfo: DraggedEventInfo;
  timeHourFrom: number;
  timeHourTo: number;
}

/**
 * ✅ ŘETĚZOVÝ POSUN: Postupně hledej jen skutečně kolidující události
 */
export const calculateEventShifts = (params: ShiftCalculationParams): ShiftCalculationResult => {
  const { allEvents, draggedEventInfo, timeHourFrom, timeHourTo } = params;

  // Najdi všechny události v daném sále a dni (kromě táhané)
  const sameSlotEvents = allEvents.filter((event) => {
    return (
      event.sal === draggedEventInfo.newSal &&
      event.dateFrom.toDateString() === draggedEventInfo.newDate.toDateString() &&
      event.id !== draggedEventInfo.eventId &&
      event.id !== draggedEventInfo.separatorId
    );
  });

  // ✅ NAJDI OBLAST KAM SE TÁHNE + SEPARÁTOR
  let occupiedStart = draggedEventInfo.newStartTime;
  let occupiedEnd = draggedEventInfo.newEndTime;

  if (draggedEventInfo.newSeparatorStartTime && draggedEventInfo.newSeparatorEndTime) {
    occupiedStart = new Date(Math.min(occupiedStart.getTime(), draggedEventInfo.newSeparatorStartTime.getTime()));
    occupiedEnd = new Date(Math.max(occupiedEnd.getTime(), draggedEventInfo.newSeparatorEndTime.getTime()));
  }

  // ✅ NAJDI PŘÍMO KOLIDUJÍCÍ UDÁLOSTI
  const directlyConflicting = sameSlotEvents.filter((event) => {
    return timeRangesOverlap(occupiedStart, occupiedEnd, event.dateFrom, event.dateTo);
  });

  if (directlyConflicting.length === 0) {
    return {
      direction: draggedEventInfo.newStartTime >= draggedEventInfo.originalEvent.dateFrom ? "forward" : "backward",
      eventsToShift: [],
      isValid: true,
    };
  }

  // ✅ ŘETĚZOVÝ POSUN
  const direction: ShiftDirection =
    draggedEventInfo.newStartTime >= draggedEventInfo.originalEvent.dateFrom ? "forward" : "backward";
  const eventsToShift: EventShift[] = [];
  const processedIds = new Set<string>();

  if (direction === "forward") {
    let currentTime = occupiedEnd;

    // Začni s přímo kolidujícími událostmi
    const toProcess = [...directlyConflicting].sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());

    while (toProcess.length > 0) {
      const event = toProcess.shift()!;
      if (processedIds.has(event.id)) continue;

      // Najdi separátor k této události
      let separator: OjpEventPositioned | undefined;
      if (event.typ === "operace") {
        separator = sameSlotEvents.find((e) => {
          if (e.typ !== "uklid" || processedIds.has(e.id)) return false;
          const timeDiff = Math.abs(e.dateFrom.getTime() - event.dateTo.getTime());
          return timeDiff < 5 * 60 * 1000;
        });
      }

      // Vypočítej nové pozice
      const eventDuration = event.dateTo.getTime() - event.dateFrom.getTime();
      const newEventEnd = new Date(currentTime.getTime() + eventDuration);

      // Kontrola hranic
      if (!isWithinBounds(currentTime, newEventEnd, event.dateFrom, timeHourFrom, timeHourTo)) {
        return {
          direction,
          errorReason: "Událost by opustila povolenou oblast kalendáře",
          eventsToShift: [],
          isValid: false,
        };
      }

      eventsToShift.push({
        eventId: event.id,
        newEndTime: newEventEnd,
        newStartTime: currentTime,
        originalEvent: event,
      });

      processedIds.add(event.id);
      currentTime = newEventEnd;

      // Posun i separátor
      if (separator) {
        const separatorDuration = separator.dateTo.getTime() - separator.dateFrom.getTime();
        const newSeparatorEnd = new Date(currentTime.getTime() + separatorDuration);

        if (!isWithinBounds(currentTime, newSeparatorEnd, separator.dateFrom, timeHourFrom, timeHourTo)) {
          return {
            direction,
            errorReason: "Separátor by opustil povolenou oblast kalendáře",
            eventsToShift: [],
            isValid: false,
          };
        }

        eventsToShift.push({
          eventId: separator.id,
          newEndTime: newSeparatorEnd,
          newStartTime: currentTime,
          originalEvent: separator,
        });

        processedIds.add(separator.id);
        currentTime = newSeparatorEnd;
      }

      // ✅ KLICOVÁ LOGIKA: Zkontroluj jestli posunutá událost nezpůsobí další kolizi
      const newlyConflicting = sameSlotEvents.filter((e) => {
        if (processedIds.has(e.id)) return false;
        if (toProcess.some((tp) => tp.id === e.id)) return false; // už je v frontě

        // Koliduje s nově posunutou oblastí?
        const shiftedStart =
          currentTime.getTime() -
          (separator ? eventDuration + (separator.dateTo.getTime() - separator.dateFrom.getTime()) : eventDuration);
        const shiftedEnd = currentTime.getTime();

        return timeRangesOverlap(new Date(shiftedStart), new Date(shiftedEnd), e.dateFrom, e.dateTo);
      });

      // Přidej nově kolidující události do fronty
      toProcess.push(...newlyConflicting.sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime()));
    }
  } else {
    // Dozadu - podobná logika, ale opačně
    let currentTime = occupiedStart;
    const toProcess = [...directlyConflicting].sort((a, b) => b.dateFrom.getTime() - a.dateFrom.getTime());

    while (toProcess.length > 0) {
      const event = toProcess.shift()!;
      if (processedIds.has(event.id)) continue;

      let separator: OjpEventPositioned | undefined;
      if (event.typ === "operace") {
        separator = sameSlotEvents.find((e) => {
          if (e.typ !== "uklid" || processedIds.has(e.id)) return false;
          const timeDiff = Math.abs(e.dateFrom.getTime() - event.dateTo.getTime());
          return timeDiff < 5 * 60 * 1000;
        });
      }

      const eventDuration = event.dateTo.getTime() - event.dateFrom.getTime();
      const separatorDuration = separator ? separator.dateTo.getTime() - separator.dateFrom.getTime() : 0;
      const totalDuration = eventDuration + separatorDuration;

      const newEventStart = new Date(currentTime.getTime() - totalDuration);
      const newEventEnd = new Date(newEventStart.getTime() + eventDuration);

      if (!isWithinBounds(newEventStart, newEventEnd, event.dateFrom, timeHourFrom, timeHourTo)) {
        return {
          direction,
          errorReason: "Událost by opustila povolenou oblast kalendáře",
          eventsToShift: [],
          isValid: false,
        };
      }

      eventsToShift.push({
        eventId: event.id,
        newEndTime: newEventEnd,
        newStartTime: newEventStart,
        originalEvent: event,
      });

      processedIds.add(event.id);

      if (separator) {
        const newSeparatorStart = newEventEnd;
        const newSeparatorEnd = new Date(currentTime);

        if (!isWithinBounds(newSeparatorStart, newSeparatorEnd, separator.dateFrom, timeHourFrom, timeHourTo)) {
          return {
            direction,
            errorReason: "Separátor by opustil povolenou oblast kalendáře",
            eventsToShift: [],
            isValid: false,
          };
        }

        eventsToShift.push({
          eventId: separator.id,
          newEndTime: newSeparatorEnd,
          newStartTime: newSeparatorStart,
          originalEvent: separator,
        });

        processedIds.add(separator.id);
      }

      currentTime = newEventStart;

      // Najdi další kolidující události
      const newlyConflicting = sameSlotEvents.filter((e) => {
        if (processedIds.has(e.id)) return false;
        if (toProcess.some((tp) => tp.id === e.id)) return false;

        return timeRangesOverlap(newEventStart, new Date(currentTime), e.dateFrom, e.dateTo);
      });

      toProcess.push(...newlyConflicting.sort((a, b) => b.dateFrom.getTime() - a.dateFrom.getTime()));
    }
  }

  return {
    direction,
    eventsToShift,
    isValid: true,
  };
};

/**
 * Kontroluje zda je událost v povolených hranicích kalendáře
 */
const isWithinBounds = (
  startTime: Date,
  endTime: Date,
  originalDate: Date,
  timeHourFrom: number,
  timeHourTo: number,
): boolean => {
  const dayStart = new Date(originalDate);
  dayStart.setHours(timeHourFrom, 0, 0, 0);

  const dayEnd = new Date(originalDate);
  dayEnd.setHours(timeHourTo, 0, 0, 0);

  return startTime >= dayStart && endTime <= dayEnd;
};
