import type { DocumentHead } from "@builder.io/qwik-city";

import { Alert, Card, CardBody } from "@akeso/ui-components";
import { component$, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { isServer } from "@builder.io/qwik/build";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";
import { createIrisClient } from "~/iris";

import { useExpectationReportDialogContext } from "./expectation-report-dialog";
import { ExpectationSelection } from "./expectation-selection";
import { fetchExpectationList } from "./fetch-expectation-list";
import { useNavigateToDetail } from "./use-navigate-to-detail";

export const usePageData = routeLoader$(async ({ env, query }) => {
  const iris = createIrisClient(env);
  const [{ internsAmbExpectations }] = await Promise.all([fetchExpectationList(iris)]);

  const reportId = query.get("reportId");
  let report: { id: string; reportContent: string } | null | undefined = undefined;
  if (reportId != null) {
    ({ internsAmbExpectationChangeReport: report } = await iris.query({
      internsAmbExpectationChangeReport: {
        __args: {
          id: reportId,
        },
        id: true,
        reportContent: true,
      },
    }));
  }

  return { expectations: internsAmbExpectations, report };
});

export const head: DocumentHead = {
  title: "Expektace pacienta - Interní ambulance",
};

export default component$(() => {
  const data = usePageData();
  const navigate = useNavigate();
  const navigateToDetail$ = useNavigateToDetail();
  const reportDialogCtx = useExpectationReportDialogContext();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const report = track(() => data.value.report);
    if (report === null) {
      reportDialogCtx.result = { nothingToReport: true };
    } else if (typeof report === "object") {
      reportDialogCtx.result = { report };
    }
  });

  useTask$(({ track }) => {
    const dialogResult = track(() => reportDialogCtx.result);

    if (isServer) return;

    if (data.value.report !== undefined && dialogResult === null) {
      navigate(".");
    }
  });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Expektace pacienta</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs class="sr-only">
        <PageBreadcrumbsLink href="/interns/">Interní oddělení</PageBreadcrumbsLink>
        <PageBreadcrumbsLink href="/interns/ambulance/">Ambulance</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>Expektace pacienta</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <div class="mt-4 flex h-[calc(100vh-6rem)] overflow-hidden">
        <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
          <ExpectationSelection
            currentDetailId={null}
            expectations={data.value.expectations}
            navigateToDetail$={navigateToDetail$}
          />

          <Card>
            <CardBody>
              <Alert class="mt-6 py-8 text-center font-bold" severity="info">
                Vyberte pacienta
              </Alert>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
});
