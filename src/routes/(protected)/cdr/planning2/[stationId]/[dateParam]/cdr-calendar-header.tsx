import type { ClassList } from "@builder.io/qwik";

import { BaseButton, Button, Menu, MenuItem, useFloating } from "@akeso/ui-components";
import { component$, useId, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

import { getDateParam } from "../../get-date-param";
import { CdrCalendarActionGenProgram } from "./cdr-calendar-action-gen-program";

type CdrCalendarHeaderProps = {
  dateParam: string;
  firstDateOfMonth: Date;
  months: {
    hrefArg: string;
    label: string;
  }[];
  station: {
    id: string;
    name: string;
  };
};

export const CdrCalendarHeader = component$<CdrCalendarHeaderProps>(
  ({ dateParam, firstDateOfMonth, months, station }) => {
    const dateMonthAndYearFormatter = new Intl.DateTimeFormat("cs", { month: "long", year: "numeric" });
    const navigate = useNavigate();

    const prevIdx = Math.max(months.findIndex((i) => i.hrefArg === dateParam) - 1, -1);
    const nextIdx = Math.min(months.findIndex((i) => i.hrefArg === dateParam) + 1, months.length);

    // const planStartDate = new Date(planStartDateYear, planStartDateMonth - 1, 1);

    return (
      <header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <h1 class="text-base font-semibold text-gray-900">
          {station.name}
          {" - "}
          <time dateTime={getDateParam(firstDateOfMonth)}>{dateMonthAndYearFormatter.format(firstDateOfMonth)}</time>
        </h1>
        <div class="flex items-center">
          <div class="btn btn-outline relative flex gap-3">
            <button
              class="disabled:text-app-text-weakest"
              disabled={prevIdx < 0}
              onClick$={() => {
                navigate(`../${months[prevIdx]?.hrefArg}`);
              }}
              type="button"
            >
              <span class="sr-only">Předchozí měsíc</span>
              <svg aria-hidden="true" class="size-5" data-slot="icon" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clip-rule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  fill-rule="evenodd"
                />
              </svg>
            </button>
            <MonthsSelector class="hidden md:block" dateParam={dateParam} months={months} />
            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
            <button
              class="disabled:text-app-text-weakest"
              disabled={nextIdx >= months.length}
              onClick$={() => {
                navigate(`../${months[nextIdx]?.hrefArg}`);
              }}
              type="button"
            >
              <span class="sr-only">Další měsíc</span>
              <svg aria-hidden="true" class="size-5" data-slot="icon" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clip-rule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  fill-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div class="hidden gap-6 md:flex md:items-center">
            <div class="ml-6 h-6 w-px bg-app-border-base" />
            <CdrCalendarActionGenProgram
              dateOfMonth={firstDateOfMonth}
              severity="none"
              stationId={station.id}
              variant="outline"
            />
            <Button
              onClick$={() => {
                // noop
              }}
              severity="accent"
              type="button"
              variant="contained"
            >
              Přidat službu
            </Button>
          </div>
          <div class="relative ml-6 md:hidden">
            <button
              aria-expanded="false"
              aria-haspopup="true"
              class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
              id="menu-0-button"
              type="button"
            >
              <span class="sr-only">Open menu</span>
              <svg aria-hidden="true" class="size-5" data-slot="icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    );
  },
);

type MonthsSelectorProps = {
  class?: ClassList;
  dateParam: string;
  months: {
    hrefArg: string;
    label: string;
  }[];
};
const MonthsSelector = component$<MonthsSelectorProps>(({ class: buttonClass, dateParam, months }) => {
  const rangeDateFormatter = new Intl.DateTimeFormat("cs", { month: "long", year: "numeric" });
  const anchorRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();
  const popoverId = useId();
  const navigate = useNavigate();

  useFloating(anchorRef, popoverRef, { gutter: 2, placement: "bottom-end" });

  return (
    <>
      <BaseButton
        class={buttonClass}
        popoverId={popoverId}
        popovertargetaction="toggle"
        ref={anchorRef}
        type="popover-trigger"
      >
        {rangeDateFormatter.format(new Date(`${dateParam}-01`))}
      </BaseButton>
      <Menu id={popoverId} ref={popoverRef}>
        {months.map((month) => {
          const isCurrent = month.hrefArg === dateParam;
          return (
            <MenuItem
              disabled={isCurrent}
              key={month.label}
              onClick$={() => {
                if (!isCurrent) {
                  navigate(`../${month.hrefArg}`);
                }
                popoverRef.value?.hidePopover();
              }}
              type="button"
            >
              <span class={[isCurrent ? "font-bold" : "font-normal"]}>{month.label}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
});
