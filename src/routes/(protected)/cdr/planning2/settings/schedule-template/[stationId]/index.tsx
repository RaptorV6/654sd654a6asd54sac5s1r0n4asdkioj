import {
  Card,
  CardBody,
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
import { useLocation } from "@builder.io/qwik-city";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { useLoadProgramTemplateItems } from "../_loaders";
import { SelectStation } from "../station-selector";

export { useSelectStationAction } from "../_actions";
export { useLoadProgramTemplateItems, useLoadStations } from "../_loaders";

export default component$(() => {
  const location = useLocation();
  const data = useLoadProgramTemplateItems();

  const pageTitle = `Časová šablona programu ${data.value.station.name}`;

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
        <PageBreadcrumbsLink href="/cdr/planning2/settings/schedule-template/">
          Časová šablona programu
        </PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <Card class="my-4">
        <CardBody>
          <SelectStation selectedStationId={location.params.stationId} />
        </CardBody>
      </Card>

      <DataTable class="rounded border border-app-border-base bg-app-surface-base">
        <DataTableHead class="sticky top-16 z-10 border-b border-app-border-hover">
          <DataTableHeadRow>
            <DataTableHeadCol>Segment</DataTableHeadCol>
            <DataTableHeadCol>Vrstva programu</DataTableHeadCol>
            <DataTableHeadCol>Název služby</DataTableHeadCol>
            <DataTableHeadCol>Skupina pacientů</DataTableHeadCol>
            <DataTableHeadCol>Sdíleno se stanicí</DataTableHeadCol>
            <DataTableHeadCol>Role</DataTableHeadCol>
            <DataTableHeadCol>Informace ke službě</DataTableHeadCol>
            <DataTableHeadCol>Po</DataTableHeadCol>
            <DataTableHeadCol>Ut</DataTableHeadCol>
            <DataTableHeadCol>St</DataTableHeadCol>
            <DataTableHeadCol>Čt</DataTableHeadCol>
            <DataTableHeadCol>Pá</DataTableHeadCol>
            <DataTableHeadCol>So</DataTableHeadCol>
            <DataTableHeadCol>Ne</DataTableHeadCol>
            <DataTableHeadCol>Čas od</DataTableHeadCol>
            <DataTableHeadCol>Čas do</DataTableHeadCol>
            <DataTableHeadCol>Místnost</DataTableHeadCol>
            <DataTableHeadCol>Kapacita</DataTableHeadCol>
            <DataTableHeadCol>Vlastník</DataTableHeadCol>
            <DataTableHeadCol>Typ slotu</DataTableHeadCol>
            <DataTableHeadCol>Služba v programu oddělení pro pacienta</DataTableHeadCol>
            <DataTableHeadCol>Služba v programu oddělení pro zamec</DataTableHeadCol>
          </DataTableHeadRow>
        </DataTableHead>
        <DataTableBody>
          {data.value.items.map((item) => (
            <DataTableBodyRow key={item.id}>
              <DataTableBodyCol>{item.segment.name}</DataTableBodyCol>
              <DataTableBodyCol>{item.level.name}</DataTableBodyCol>
              <DataTableBodyCol>{item.medicalProcedure.name}</DataTableBodyCol>
              <DataTableBodyCol>{item.group}</DataTableBodyCol>
              <DataTableBodyCol>{item.sharedWithStations.map((i) => i.name).join(", ")}</DataTableBodyCol>
              <DataTableBodyCol>{item.competenceRoles.map((i) => i.code).join(", ")}</DataTableBodyCol>
              <DataTableBodyCol>{item.shiftNote}</DataTableBodyCol>
              <DataTableBodyCol>
                <StatusIndicator severity={item.days.po ? "success" : "danger"} />
              </DataTableBodyCol>
              <DataTableBodyCol>
                <StatusIndicator severity={item.days.ut ? "success" : "danger"} />
              </DataTableBodyCol>
              <DataTableBodyCol>
                <StatusIndicator severity={item.days.st ? "success" : "danger"} />
              </DataTableBodyCol>
              <DataTableBodyCol>
                <StatusIndicator severity={item.days.ct ? "success" : "danger"} />
              </DataTableBodyCol>
              <DataTableBodyCol>
                <StatusIndicator severity={item.days.pa ? "success" : "danger"} />
              </DataTableBodyCol>
              <DataTableBodyCol>
                <StatusIndicator severity={item.days.so ? "success" : "danger"} />
              </DataTableBodyCol>
              <DataTableBodyCol>
                <StatusIndicator severity={item.days.ne ? "success" : "danger"} />
              </DataTableBodyCol>
              <DataTableBodyCol>{item.timeFrom}</DataTableBodyCol>
              <DataTableBodyCol>{item.timeTo}</DataTableBodyCol>
              <DataTableBodyCol>{item.room}</DataTableBodyCol>
              <DataTableBodyCol>{item.roomCapacity}</DataTableBodyCol>
              <DataTableBodyCol>
                <div class="flex justify-center">
                  <StatusIndicator severity={item.owner ? "success" : "danger"} />
                </div>
              </DataTableBodyCol>
              <DataTableBodyCol>{item.slotType}</DataTableBodyCol>
              <DataTableBodyCol>
                <div class="flex justify-center">
                  <StatusIndicator severity={item.shiftInProgramForPatient ? "success" : "danger"} />
                </div>
              </DataTableBodyCol>
              <DataTableBodyCol>
                <div class="flex justify-center">
                  <StatusIndicator severity={item.shiftInProgramForEmployee ? "success" : "danger"} />
                </div>
              </DataTableBodyCol>
            </DataTableBodyRow>
          ))}
        </DataTableBody>
      </DataTable>
    </>
  );
});
