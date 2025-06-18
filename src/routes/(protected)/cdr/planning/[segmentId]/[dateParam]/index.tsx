import { Card } from "@akeso/ui-components";
import { component$, useStore, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import { Calendar, CalendarBody } from "~/components/calendar";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { CdrCalendarProvider, useCdrCalendarContext } from "./cdr-calendar-context";
import { CdrCalendarEditEventModal } from "./cdr-calendar-edit-event-modal";
import { CdrCalendarEventComponent } from "./cdr-calendar-event-component";
import { CdrCalendarHeader } from "./cdr-calendar-header";
import { useLoadPageData } from "./cdr-calendar-loaders";
import { CdrCalendarPreviewEventModal } from "./cdr-calendar-preview-event-modal";

const pageTitle = "SLOTY PSYCHOTERAPIE DO PROGRAMŮ CDR";

export { useLoadPageData } from "./cdr-calendar-loaders";
type LoaderDataValue = ReturnType<typeof useLoadPageData>["value"];

export default component$(() => {
  const data = useLoadPageData().value;

  return (
    <CdrCalendarProvider selectedStationId={data.organizationHierarchyItem.id}>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <CdrCalendarContent data={data} />
    </CdrCalendarProvider>
  );
});

type CdrCalendarContentProps = {
  data: LoaderDataValue;
};

const CdrCalendarContent = component$<CdrCalendarContentProps>(({ data }) => {
  const ctx = useCdrCalendarContext();

  const eventsStore = useStore<{ events: (typeof data)["events"] }>({ events: data.events });

  useTask$(({ track }) => {
    track(() => data.events);
    if (isServer) return;
    eventsStore.events = data.events;
  });

  return (
    <>
      <Card class="h-[calc(100svh-8rem)]">
        <Calendar>
          <CdrCalendarHeader
            dateParam={data.dateParam}
            months={data.months}
            organizationHierarchyItem={data.organizationHierarchyItem}
            planStartDateMonth={data.planStartDateMonth}
            planStartDateYear={data.planStartDateYear}
          />
          <CalendarBody
            dates={data.dates}
            endOfDayTrasholdMinutes={30}
            eventComponent={CdrCalendarEventComponent}
            events={eventsStore.events}
            onCalendarNewEvent$={(_, startDateTime) => {
              ctx.editData = {
                data: { startDateTime },
                mode: "new",
              };
            }}
            timeHourEnd={data.timeHourEnd}
            timeHourStart={data.timeHourStart}
            times={data.times}
          />
        </Calendar>
      </Card>
      <CdrCalendarEditEventModal />
      <CdrCalendarPreviewEventModal />
    </>
  );
});
