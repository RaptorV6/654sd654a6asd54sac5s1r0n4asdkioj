// import { Button } from "@akeso/ui-components";
import { component$, useVisibleTask$ } from "@builder.io/qwik";
// import { useLocation } from "@builder.io/qwik-city";

import { routeLoader$ } from "@builder.io/qwik-city";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";
import { createIrisClient, type PatientConnectionSortBy } from "~/iris";

import { NewApplicationFormCreateForm } from "./new-request-planning-form";

export { useFormInitialData, usePreviewData } from "./_loaders";

const pageTitle = "Plánování radiologických výkonů";

export const usePatients = routeLoader$(async ({ env }) => {
  const search = "mum";
  const sortBy: PatientConnectionSortBy = {
    direction: "ASC",
    field: "FULL_NAME",
  };

  const { patients } = await createIrisClient(env).query({
    patients: {
      __args: {
        filter: {
          search,
        },
        first: 7,
        sortBy,
      },
      nodes: {
        fullName: true,
      },
    },
  });

  return patients;
});

export default component$(() => {
  // const location = useLocation();
  // const pathname = location.url.pathname;
  // const search = location.url.search;

  const patients = usePatients();

  useVisibleTask$(() => {
    console.log("Patients from client:", patients.value);
  });

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
