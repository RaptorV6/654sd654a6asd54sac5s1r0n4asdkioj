import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@akeso/ui-components";
import { $, component$, useSignal } from "@builder.io/qwik";

import { Calendar, CalendarBody } from "~/components/calendar";
import { calendarDatesRange } from "~/lib/calendar/calendar-dates-range";
import { calendarEventsPosition } from "~/lib/calendar/calendar-events-position";

import { _mock_events, type ApplicationFormsEvent } from "./_mock-events";
import { ApplicationFormsPlanningCalendarEventComponent } from "./application-forms-planning-calendar-event-component";
import { ApplicationFormsPlanningCalendarHeader } from "./application-forms-planning-calendar-header";

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d;
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("cs", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export const ApplicationFormsPlanningCalendar = component$(() => {
  const weekStart = useSignal(startOfWeek(new Date()));

  const goPrevWeek = $(() => {
    const prev = new Date(weekStart.value);
    prev.setDate(prev.getDate() - 7);
    weekStart.value = prev;
  });
  const goToday = $(() => {
    weekStart.value = startOfWeek(new Date());
  });
  const goNextWeek = $(() => {
    const next = new Date(weekStart.value);
    next.setDate(next.getDate() + 7);
    weekStart.value = next;
  });

  const weekEnd = new Date(weekStart.value);
  weekEnd.setDate(weekStart.value.getDate() + 4);

  const { calendarHourFrom, calendarHourTo, dates, times } = calendarDatesRange({
    dateFrom: weekStart.value,
    dateTo: weekEnd,
    onlyWordDays: true,
    separate: "weeks",
    timeHourFrom: 7,
    timeHourTo: 16,
  });

  const eventsSignal = useSignal<ApplicationFormsEvent[]>([..._mock_events]);

  const isNewDialogOpen = useSignal(false);
  const newDateFrom = useSignal<Date | null>(null);
  const newDuration = useSignal<number>(15);

  const downloadCsv = $((evs: ApplicationFormsEvent[]) => {
    const rows = evs.map((ev) => [ev.id, ev.dateFrom.toISOString(), ev.dateTo.toISOString(), ev.title].join(";"));
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "events.csv";
    a.click();
  });

  const onDrop$ = $((e: DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer?.getData("text/plain");
    if (!id) return;

    const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    const colWidth = box.width / dates.length;
    const dateIndex = Math.floor(x / colWidth);

    const rowHeight = box.height / times.length;
    const slotIndex = Math.floor(y / rowHeight);
    const minutesFromStart = slotIndex * 5;

    const baseDate = new Date(dates[dateIndex].date);
    const hours = calendarHourFrom + Math.floor(minutesFromStart / 60);
    const minutes = minutesFromStart % 60;
    const newFrom = new Date(baseDate.setHours(hours, minutes, 0, 0));

    const evs = eventsSignal.value;
    const idx = evs.findIndex((ev) => ev.id === id);
    if (idx !== -1) {
      const dur = evs[idx].duration;
      evs[idx].dateFrom = newFrom;
      evs[idx].dateTo = new Date(newFrom.getTime() + dur * 60000);
      eventsSignal.value = [...evs];
      downloadCsv(evs);
    }
  });

  const saveNewEvent$ = $(() => {
    const df = newDateFrom.value;
    const dur = newDuration.value;
    if (!df || !dur) {
      isNewDialogOpen.value = false;
      return;
    }

    const existingIds = eventsSignal.value.map((ev) => Number(ev.id));
    const newId = String((Math.max(...existingIds) || 0) + 1);

    const newFrom = new Date(df);
    const newTo = new Date(newFrom.getTime() + dur * 60000);

    const newEv: ApplicationFormsEvent = {
      cpd: "258258",
      dateFrom: newFrom,
      dateTo: newTo,
      duration: dur,
      id: newId,
      jmeno: "Karel",
      poznamka: "Poznámka",
      title: "Nová událost",
    };

    eventsSignal.value = [...eventsSignal.value, newEv];
    downloadCsv(eventsSignal.value);

    isNewDialogOpen.value = false;
  });

  const cancelNewEvent$ = $(() => {
    isNewDialogOpen.value = false;
  });

  return (
    <>
      <ApplicationFormsPlanningCalendarHeader
        onNextWeek={goNextWeek}
        onPrevWeek={goPrevWeek}
        onToday={goToday}
        weekStart={weekStart.value}
      />

      <div class="relative h-full w-full cursor-pointer" onDragOver$={$((e) => e.preventDefault())} onDrop$={onDrop$}>
        <Calendar>
          <CalendarBody
            dates={dates}
            endOfDayTrasholdMinutes={30}
            eventComponent={ApplicationFormsPlanningCalendarEventComponent}
            events={calendarEventsPosition(eventsSignal.value)}
            timeHourFrom={calendarHourFrom}
            timeHourTo={calendarHourTo}
            times={times}
          />
        </Calendar>
      </div>

      <Dialog bind:show={isNewDialogOpen}>
        {" "}
        <DialogHeader>Vytvořit událost: {newDateFrom.value ? formatDateTime(newDateFrom.value) : ""}</DialogHeader>
        <DialogBody>
          <div class="flex flex-col gap-2">
            <label class="font-medium">Délka události</label>
            <select
              class="rounded border px-2 py-1"
              onChange$={(evt) => {
                const v = (evt.target as HTMLSelectElement).value;
                newDuration.value = Number(v);
              }}
              value={newDuration.value}
            >
              <option value="5">5 minut</option>
              <option value="15">15 minut</option>
              <option value="30">30 minut</option>
            </select>
          </div>
        </DialogBody>
        <DialogFooter class="flex justify-end gap-2">
          <Button onClick$={cancelNewEvent$} type="button">
            Zrušit
          </Button>
          <Button onClick$={saveNewEvent$} severity="accent" type="button">
            Uložit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
});
