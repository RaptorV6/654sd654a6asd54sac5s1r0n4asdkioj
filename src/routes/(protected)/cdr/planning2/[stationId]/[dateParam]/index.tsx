import type { DocumentHead } from "@builder.io/qwik-city";

import { Alert, Button, Card } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";

import { Calendar, CalendarBody } from "~/components/calendar";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { useCdrProgramData } from "./_loaders";
import { CdrCalendarActionGenProgram } from "./cdr-calendar-action-gen-program";
import { CdrCalendarEventComponent } from "./cdr-calendar-event-component";
import { CdrCalendarHeader } from "./cdr-calendar-header";
import { CdrCalendarPdfPreview } from "./cdr-calendar-pdf-preview";

export { useGenerateTreatmentProgramAction } from "./_actions";
export { useCdrProgramData } from "./_loaders";

type LoaderDataValue = ReturnType<typeof useCdrProgramData>["value"];

const getPageTitle = (stationName: string, dateOfMonth: Date): string => {
  const dateMonthAndYearFormatter = new Intl.DateTimeFormat("cs", { month: "long", year: "numeric" });
  return `${stationName} - ${dateMonthAndYearFormatter.format(dateOfMonth)}`;
};

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useCdrProgramData);
  return {
    title: getPageTitle(data.station.name, data.firstDateOfMonth),
  };
};

export default component$(() => {
  const data = useCdrProgramData().value;
  const pageTitle = getPageTitle(data.station.name, data.firstDateOfMonth);
  const showPdfPreview = useSignal<boolean>(false);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/cdr/">CDR</PageBreadcrumbsLink>
        <PageBreadcrumbsLink href="/cdr/planning2/">Plánování</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <div>
        <Button
          onClick$={() => {
            showPdfPreview.value = true;
          }}
          type="button"
        >
          Daj PDF
        </Button>
      </div>

      <CdrCalendarContent data={data} />

      <CdrCalendarPdfPreview bind:show={showPdfPreview} />
    </>
  );
});

type CdrCalendarContentProps = {
  data: LoaderDataValue;
};

const CdrCalendarContent = component$<CdrCalendarContentProps>(({ data }) => {
  // const ctx = useCdrCalendarContext();

  // const eventsStore = useStore<{ events: (typeof data)["events"] }>({ events: data.events });

  // useTask$(({ track }) => {
  //   track(() => data.events);
  //   if (isServer) return;
  //   eventsStore.events = data.events;
  // });

  if (data.events.length === 0) {
    return (
      <Card>
        <CdrCalendarHeader
          dateParam={data.dateParam}
          firstDateOfMonth={data.firstDateOfMonth}
          months={data.months}
          station={data.station}
        />
        <div class="flex justify-center p-8">
          <Alert severity="info">
            <h2 class="mt-4 font-bold">Pro zvojený měsíc nejsou definované žádné položky programu.</h2>
            <div class="my-4 flex items-center justify-center gap-4">
              <Button
                onClick$={() => {
                  ///
                }}
                type="button"
                variant="outline"
              >
                Přidat služby jednotlivě
              </Button>
              <CdrCalendarActionGenProgram dateOfMonth={data.firstDateOfMonth} stationId={data.station.id} />
            </div>
          </Alert>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card class="h-[calc(100svh-8rem)]">
        <Calendar>
          <CdrCalendarHeader
            dateParam={data.dateParam}
            firstDateOfMonth={data.firstDateOfMonth}
            months={data.months}
            station={data.station}
          />
          <CalendarBody
            dates={data.dates}
            endOfDayTrasholdMinutes={30}
            eventComponent={CdrCalendarEventComponent}
            events={data.events}
            // onCalendarNewEvent$={(_, startDateTime) => {
            //   ctx.editData = {
            //     data: { startDateTime },
            //     mode: "new",
            //   };
            // }}
            timeHourFrom={data.calendarHourFrom}
            timeHourTo={data.calendarHourTo}
            times={data.times}
          />
        </Calendar>
      </Card>
      {/* <CdrCalendarEditEventModal />
      <CdrCalendarPreviewEventModal /> */}
    </>
  );
});
