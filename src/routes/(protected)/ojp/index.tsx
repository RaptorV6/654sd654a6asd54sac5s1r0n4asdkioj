import type { DocumentHead } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { OjpPlanningCalendar } from "./ojp-planning-calendar";

export { useOjpPlanningData } from "./_loaders";

const pageTitle = "OJP - Plánování operačních sálů";

export const head: DocumentHead = {
  title: pageTitle,
};

export default component$(() => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <div class="h-[calc(100vh-12rem)] overflow-hidden">
        <OjpPlanningCalendar />
      </div>
    </>
  );
});
