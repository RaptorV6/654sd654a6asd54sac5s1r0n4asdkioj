// import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
// import { useLocation } from "@builder.io/qwik-city";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { NewApplicationFormCreateForm } from "./new-application-form-create-form";

export { useFormInitialData, usePreviewData } from "./new-application-form-create-loaders";

const pageTitle = "Vytvoření žádanky";

export default component$(() => {
  // const location = useLocation();
  // const pathname = location.url.pathname;
  // const search = location.url.search;

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions></PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>
      <NewApplicationFormCreateForm />
    </>
  );
});
