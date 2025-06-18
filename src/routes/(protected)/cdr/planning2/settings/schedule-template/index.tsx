import { component$ } from "@builder.io/qwik";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { SelectStation } from "./station-selector";

export { useSelectStationAction } from "./_actions";
export { useLoadStations } from "./_loaders";

export default component$(() => {
  const pageTitle = "Časová šablona programu";

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/cdr/">CDR</PageBreadcrumbsLink>
        <PageBreadcrumbsLink href="/cdr/planning2/">Plánování</PageBreadcrumbsLink>
        <PageBreadcrumbsLink href="/cdr/planning2/settings/">Nastavení programů</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <SelectStation selectedStationId={null} />
    </>
  );
});
