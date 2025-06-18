import type { DocumentHead } from "@builder.io/qwik-city";

import {
  DataTable,
  DataTableBody,
  DataTableBodyCol,
  DataTableBodyRow,
  DataTableHead,
  DataTableHeadCol,
  DataTableHeadRow,
  StatusIndicator,
} from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";
import { serverFindProcedures } from "~/server/rpc/procedure";

import { AddSurgeryProcedureAction } from "../add-surgery-procedure-action";

export const useLoadData = routeLoader$(async ({ env }) => {
  return serverFindProcedures(env);
});

const pageTitle = "Postupy";

export const head: DocumentHead = {
  title: pageTitle,
};

export default component$(() => {
  const proceduresSig = useLoadData();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions>
          <AddSurgeryProcedureAction />
        </PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/surgery/">Chirurgické oddělení</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <DataTable>
        <DataTableHead>
          <DataTableHeadRow>
            <DataTableHeadCol class="w-8">
              <span class="sr-only">Stav</span>
            </DataTableHeadCol>
            <DataTableHeadCol>Název postupu</DataTableHeadCol>
            <DataTableHeadCol>Pacient</DataTableHeadCol>
            <DataTableHeadCol>Rodné číslo</DataTableHeadCol>
            <DataTableHeadCol>Aktuální krok postupu</DataTableHeadCol>
          </DataTableHeadRow>
        </DataTableHead>
        <DataTableBody>
          {proceduresSig.value.map((procedure) => (
            <DataTableBodyRow key={procedure.id}>
              <DataTableBodyCol>
                <StatusIndicator severity={"none"} />
              </DataTableBodyCol>
              <DataTableBodyCol>
                <Link class="text-app-text-link" href={`${procedure.meta.href}${procedure.id}/`}>
                  {procedure.meta.name}
                </Link>
              </DataTableBodyCol>
              <DataTableBodyCol>{procedure.patient.fullName}</DataTableBodyCol>
              <DataTableBodyCol>{procedure.patient.birthRegistrationNumber}</DataTableBodyCol>
              <DataTableBodyCol>{procedure.meta.steps[procedure.step.major - 1]?.label}</DataTableBodyCol>
            </DataTableBodyRow>
          ))}
        </DataTableBody>
      </DataTable>
    </>
  );
});
