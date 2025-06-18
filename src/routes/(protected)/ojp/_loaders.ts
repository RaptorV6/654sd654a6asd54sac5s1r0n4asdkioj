import { routeLoader$ } from "@builder.io/qwik-city";

import { calendarEventsPosition } from "~/lib/calendar/calendar-events-position";

import { _mock_ojp_events, OJP_SALY } from "./_mock-events";

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7; // Pondělí jako první den
  d.setDate(d.getDate() - diff);
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

  // Vytvoření časových slotů (7:00 - 21:00, po 5 minutách)
  const times = Array.from({ length: 14 }, (_, i) => {
    const hour = 7 + i;
    return { time: new Date(2000, 0, 1, hour, 0) };
  });

  // Filtrování událostí pro aktuální týden
  const weekEvents = _mock_ojp_events.filter((event) => event.dateFrom >= weekStart && event.dateFrom <= weekEnd);

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
