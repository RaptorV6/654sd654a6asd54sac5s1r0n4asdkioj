// src/routes/(protected)/ojp/_loaders.ts
import { routeLoader$ } from "@builder.io/qwik-city";

import { calendarEventsPosition } from "~/lib/calendar/calendar-events-position";

import { _mock_ojp_events, OJP_SALY } from "./_mock-events";

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff + 4); // +4 pro pátek
  d.setHours(23, 59, 59, 999);
  return d;
}

// eslint-disable-next-line qwik/loader-location
export const useOjpPlanningData = routeLoader$(async () => {
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());

  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return { date };
  });

  const times = Array.from({ length: 15 }, (_, i) => {
    const hour = 7 + i;
    return { time: new Date(2000, 0, 1, hour, 0) };
  });

  return {
    calendarHourFrom: 7,
    calendarHourTo: 21,
    dates,
    saly: OJP_SALY,
    times,
    weekEnd,
    weekStart,
  };
});

// Vylepšená funkce pro získání událostí
export function getWeekEvents(weekStart: Date) {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4);
  weekEnd.setHours(23, 59, 59, 999);

  const weekEvents = _mock_ojp_events.filter((event) => {
    const eventDate = new Date(event.dateFrom);
    return eventDate >= weekStart && eventDate <= weekEnd;
  });

  return calendarEventsPosition(weekEvents);
}
