// src/routes/(protected)/ojp/_loaders.ts
import { routeLoader$ } from "@builder.io/qwik-city";

import { calendarEventsPosition } from "~/lib/calendar/calendar-events-position";

import { OJP_SALY } from "./_mock-events";
import { serverGetOjpEvents } from "./_server-actions";

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// eslint-disable-next-line qwik/loader-location
export const useOjpPlanningData = routeLoader$(async () => {
  const weekStart = startOfWeek(new Date());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4); // Pouze pracovní dny Po-Pá

  // Vytvoření dat pro kalendář
  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return { date };
  });

  const times = Array.from({ length: 15 }, (_, i) => {
    const hour = 7 + i;
    return { time: new Date(2000, 0, 1, hour, 0) };
  });

  // Načtení událostí ze serveru (CSV)
  const allEvents = await serverGetOjpEvents();

  // Filtrování událostí pro aktuální týden
  const weekEvents = allEvents.filter((event) => event.dateFrom >= weekStart && event.dateFrom <= weekEnd);

  const eventsWithPosition = calendarEventsPosition(weekEvents);

  return {
    calendarHourFrom: 7,
    calendarHourTo: 21,
    dates,
    events: eventsWithPosition,
    saly: OJP_SALY,
    times,
    weekStart,
  };
});
