import { component$ } from "@builder.io/qwik";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { NewApplicationFormMriForm } from "./new-application-form-mri-form";

export { useFormInitialData, usePreviewData } from "./new-application-form-mri-loaders";

const pageTitle = "Nová žádanka MRi";

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
      <NewApplicationFormMriForm />
    </>
  );
});
