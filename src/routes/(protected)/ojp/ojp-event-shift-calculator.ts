import type { OjpEventPositioned } from "./_mock-events";
import type { DraggedEventInfo } from "./ojp-collision-detection";

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
 * Vypočítá chytrý posun událostí podle směru táhnutí
 */
export const calculateEventShifts = (params: ShiftCalculationParams): ShiftCalculationResult => {
  const { allEvents, draggedEventInfo, timeHourFrom, timeHourTo } = params;

  // Určení směru posunu
  const originalStartTime = draggedEventInfo.originalEvent.dateFrom;
  const newStartTime = draggedEventInfo.newStartTime;
  const direction: ShiftDirection = newStartTime >= originalStartTime ? "forward" : "backward";

  // Najdi všechny události v daném sále a dni
  const sameSlotEvents = allEvents.filter((event) => {
    return (
      event.sal === draggedEventInfo.newSal &&
      event.dateFrom.toDateString() === draggedEventInfo.newDate.toDateString() &&
      event.id !== draggedEventInfo.eventId &&
      event.id !== draggedEventInfo.separatorId
    );
  });

  // Seřaď události podle času
  const sortedEvents = sameSlotEvents.sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());

  // Najdi spojené dvojice operace+separátor
  const eventPairs = findEventPairs(sortedEvents);

  const eventsToShift: EventShift[] = [];

  if (direction === "forward") {
    // Posun dopředu - posuň všechny události které začínají po newStartTime
    const eventsToMove = eventPairs.filter((pair) => {
      const pairStartTime = pair.operation ? pair.operation.dateFrom : pair.separator!.dateFrom;
      return pairStartTime >= draggedEventInfo.newStartTime;
    });

    let currentShiftTime = draggedEventInfo.newEndTime;
    if (draggedEventInfo.newSeparatorEndTime) {
      currentShiftTime = draggedEventInfo.newSeparatorEndTime;
    }

    for (const pair of eventsToMove) {
      const shiftResult = shiftEventPair(pair, currentShiftTime, timeHourFrom, timeHourTo);
      if (!shiftResult.isValid) {
        return {
          direction,
          errorReason: shiftResult.errorReason,
          eventsToShift: [],
          isValid: false,
        };
      }
      eventsToShift.push(...shiftResult.shifts);
      currentShiftTime = shiftResult.nextAvailableTime;
    }
  } else {
    // Posun dozadu - posuň všechny události které končí před newEndTime
    const eventsToMove = eventPairs
      .filter((pair) => {
        const pairEndTime = pair.separator ? pair.separator.dateTo : pair.operation!.dateTo;
        return pairEndTime <= draggedEventInfo.newStartTime;
      })
      .reverse(); // Zpracováváme odzadu

    let currentShiftTime = draggedEventInfo.newStartTime;
    if (draggedEventInfo.newSeparatorStartTime) {
      currentShiftTime = draggedEventInfo.newSeparatorStartTime;
    }

    for (const pair of eventsToMove) {
      const pairDuration = calculatePairDuration(pair);
      const newPairStartTime = new Date(currentShiftTime.getTime() - pairDuration);

      const shiftResult = shiftEventPairBackward(pair, newPairStartTime, timeHourFrom, timeHourTo);
      if (!shiftResult.isValid) {
        return {
          direction,
          errorReason: shiftResult.errorReason,
          eventsToShift: [],
          isValid: false,
        };
      }
      eventsToShift.push(...shiftResult.shifts);
      currentShiftTime = newPairStartTime;
    }
  }

  return {
    direction,
    eventsToShift,
    isValid: true,
  };
};

interface EventPair {
  operation?: OjpEventPositioned;
  separator?: OjpEventPositioned;
}

/**
 * Najde spojené dvojice operace+separátor
 */
const findEventPairs = (events: OjpEventPositioned[]): EventPair[] => {
  const pairs: EventPair[] = [];
  const processedIds = new Set<string>();

  for (const event of events) {
    if (processedIds.has(event.id)) continue;

    if (event.typ === "operace") {
      // Najdi navazující separátor
      const separator = events.find((e) => {
        if (e.typ !== "uklid" || processedIds.has(e.id)) return false;
        const timeDiff = Math.abs(e.dateFrom.getTime() - event.dateTo.getTime());
        return timeDiff < 5 * 60 * 1000; // 5 minut tolerance
      });

      pairs.push({ operation: event, separator });
      processedIds.add(event.id);
      if (separator) processedIds.add(separator.id);
    } else if (event.typ === "uklid" && !processedIds.has(event.id)) {
      // Osamocený separátor
      pairs.push({ separator: event });
      processedIds.add(event.id);
    } else if (!processedIds.has(event.id)) {
      // Jiné typy událostí (pauza, svatek)
      pairs.push({ operation: event });
      processedIds.add(event.id);
    }
  }

  return pairs;
};

interface ShiftPairResult {
  errorReason?: string;
  isValid: boolean;
  nextAvailableTime: Date;
  shifts: EventShift[];
}

/**
 * Posune dvojici událostí dopředu
 */
const shiftEventPair = (
  pair: EventPair,
  startTime: Date,
  timeHourFrom: number,
  timeHourTo: number,
): ShiftPairResult => {
  const shifts: EventShift[] = [];
  let currentTime = startTime;

  // Posun operace (nebo jiné události)
  if (pair.operation) {
    const duration = pair.operation.dateTo.getTime() - pair.operation.dateFrom.getTime();
    const newEndTime = new Date(currentTime.getTime() + duration);

    // Kontrola hranic
    if (!isWithinBounds(currentTime, newEndTime, pair.operation.dateFrom, timeHourFrom, timeHourTo)) {
      return {
        errorReason: "Událost by opustila povolenou oblast kalendáře",
        isValid: false,
        nextAvailableTime: currentTime,
        shifts: [],
      };
    }

    shifts.push({
      eventId: pair.operation.id,
      newEndTime,
      newStartTime: currentTime,
      originalEvent: pair.operation,
    });

    currentTime = newEndTime;
  }

  // Posun separátoru
  if (pair.separator) {
    const duration = pair.separator.dateTo.getTime() - pair.separator.dateFrom.getTime();
    const newEndTime = new Date(currentTime.getTime() + duration);

    // Kontrola hranic
    if (!isWithinBounds(currentTime, newEndTime, pair.separator.dateFrom, timeHourFrom, timeHourTo)) {
      return {
        errorReason: "Separátor by opustil povolenou oblast kalendáře",
        isValid: false,
        nextAvailableTime: currentTime,
        shifts: [],
      };
    }

    shifts.push({
      eventId: pair.separator.id,
      newEndTime,
      newStartTime: currentTime,
      originalEvent: pair.separator,
    });

    currentTime = newEndTime;
  }

  return {
    isValid: true,
    nextAvailableTime: currentTime,
    shifts,
  };
};

/**
 * Posune dvojici událostí dozadu
 */
const shiftEventPairBackward = (
  pair: EventPair,
  newStartTime: Date,
  timeHourFrom: number,
  timeHourTo: number,
): ShiftPairResult => {
  const shifts: EventShift[] = [];
  let currentTime = newStartTime;

  // Posun operace (nebo jiné události) - začíná na newStartTime
  if (pair.operation) {
    const duration = pair.operation.dateTo.getTime() - pair.operation.dateFrom.getTime();
    const newEndTime = new Date(currentTime.getTime() + duration);

    // Kontrola hranic
    if (!isWithinBounds(currentTime, newEndTime, pair.operation.dateFrom, timeHourFrom, timeHourTo)) {
      return {
        errorReason: "Událost by opustila povolenou oblast kalendáře",
        isValid: false,
        nextAvailableTime: currentTime,
        shifts: [],
      };
    }

    shifts.push({
      eventId: pair.operation.id,
      newEndTime,
      newStartTime: currentTime,
      originalEvent: pair.operation,
    });

    currentTime = newEndTime;
  }

  // Posun separátoru - navazuje po operaci
  if (pair.separator) {
    const duration = pair.separator.dateTo.getTime() - pair.separator.dateFrom.getTime();
    const newEndTime = new Date(currentTime.getTime() + duration);

    // Kontrola hranic
    if (!isWithinBounds(currentTime, newEndTime, pair.separator.dateFrom, timeHourFrom, timeHourTo)) {
      return {
        errorReason: "Separátor by opustil povolenou oblast kalendáře",
        isValid: false,
        nextAvailableTime: currentTime,
        shifts: [],
      };
    }

    shifts.push({
      eventId: pair.separator.id,
      newEndTime,
      newStartTime: currentTime,
      originalEvent: pair.separator,
    });

    currentTime = newEndTime;
  }

  return {
    isValid: true,
    nextAvailableTime: currentTime,
    shifts,
  };
};

/**
 * Vypočítá celkovou dobu trvání dvojice událostí
 */
const calculatePairDuration = (pair: EventPair): number => {
  let totalDuration = 0;

  if (pair.operation) {
    totalDuration += pair.operation.dateTo.getTime() - pair.operation.dateFrom.getTime();
  }

  if (pair.separator) {
    totalDuration += pair.separator.dateTo.getTime() - pair.separator.dateFrom.getTime();
  }

  return totalDuration;
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
