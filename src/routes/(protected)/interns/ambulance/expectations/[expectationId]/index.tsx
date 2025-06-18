import type { DocumentHead } from "@builder.io/qwik-city";

import { Alert, Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";
import { createIrisClient } from "~/iris";

import { ExpectationSelection } from "../expectation-selection";
import { fetchExpectationList } from "../fetch-expectation-list";
import { useNavigateToDetail } from "../use-navigate-to-detail";
import { ExpectationDetail } from "./expectation-detail";
import { ExpectationDetailProvider } from "./expectation-detail-provider";
import { fetchExpectationDetail } from "./fetch-expectation-detail";

export const usePageData = routeLoader$(async ({ env, fail, params }) => {
  const { expectationId } = params;

  const iris = createIrisClient(env);
  const [{ internsAmbExpectations }, { internsAmbExpectation }] = await Promise.all([
    fetchExpectationList(iris),
    fetchExpectationDetail(iris, expectationId),
  ]);

  if (internsAmbExpectation == null) {
    return fail(404, { message: "Expectation not found." });
  }

  return { detail: internsAmbExpectation, expectations: internsAmbExpectations };
});

// Reexport actions
export { useExpectationCloseAction, useGenerateNextShiftReport } from "./expectation-detail-actions";

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);

  return {
    title: `Expektace pacienta ${pageData.detail?.patient.fullName} - Interní ambulance`,
  };
};

export default component$(() => {
  const data = usePageData();
  const navigateToDetail$ = useNavigateToDetail();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>
          Expektace pacienta {data.value.detail?.patient.fullName} {data.value.detail?.patient.birthRegistrationNumber}
        </PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs class="sr-only">
        <PageBreadcrumbsLink href="/interns/">Interní oddělení</PageBreadcrumbsLink>
        <PageBreadcrumbsLink href="/interns/ambulance/">Ambulance</PageBreadcrumbsLink>
        <PageBreadcrumbsLink href="/interns/ambulance/expectations/">Expektace pacienta</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>Expektace pacienta</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      {data.value.failed && (
        <Alert class="flex items-center py-4" severity="error">
          <p class="flex-1 font-bold">Něco se pokazilo...</p>
          <div>
            <Button href="/interns/ambulance/expectations/" severity="danger" type="link">
              Přejít na hlavní stránku expektací.
            </Button>
          </div>
        </Alert>
      )}

      {data.value.failed === undefined && (
        <div class="mt-4 flex h-[calc(100vh-6rem)] overflow-hidden">
          <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
            <ExpectationSelection
              currentDetailId={data.value.detail.id}
              expectations={data.value.expectations}
              navigateToDetail$={navigateToDetail$}
            />

            <ExpectationDetailProvider detail={data.value.detail}>
              <ExpectationDetail />
            </ExpectationDetailProvider>
          </div>
        </div>
      )}
    </>
  );
});
