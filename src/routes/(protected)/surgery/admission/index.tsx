import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";
import { createIrisClient } from "~/iris";
import { serverGetSession } from "~/routes/plugin@auth";

import { SurgeryAdmissionProvider, useSurgeryAdmissionContext } from "./surgery-admission-context";
import { SurgeryAdmissionProgress } from "./surgery-admission-progress";
import { SurgeryAdmissionStepAddendum } from "./surgery-admission-step-addendum";
import { SurgeryAdmissionStepChecklist } from "./surgery-admission-step-checklist";
import { SurgeryAdmissionStepLocalFinding } from "./surgery-admission-step-local-finding";
import { SurgeryAdmissionStepObjectiveFinding } from "./surgery-admission-step-objective-finding";
import { SurgeryAdmissionStepPatientSelection } from "./surgery-admission-step-patient-selection";
import { SurgeryAdmissionStepPersonalAnamnesis } from "./surgery-admission-step-personal-anamnesis";
import { fetchDocumentation } from "./surgery-admission.server";

export const useLoadData = routeLoader$(async ({ env, query }) => {
  const documentationAkordId = ((v) => (v ? Number(v) : null))(query.get("dokumentace"));

  if (documentationAkordId) {
    const documentation = await fetchDocumentation(env, { documentationAkordId });

    if (documentation != null) {
      return { documentationAkordId, patient: documentation.patient };
    }
  }

  return { documentationAkordId, patient: null };
});

export const useCreateReport = routeAction$(
  async (values, requestEvent) => {
    const { env, redirect } = requestEvent;

    const session = serverGetSession(requestEvent);
    try {
      await createIrisClient(env).mutation({
        createDocumentationReport: {
          __args: {
            description: "Vstupní objektivní nález",
            documentationAkordId: Number(values.documentationId),
            methodId: -2,
            reportHtml: values.reportContent,
            userAkordId: session.user.employeeAkordId,
          },
        },
      });
    } catch (error) {
      console.error("Surgery admission report creation failed with error", error);
      return { failed: true };
    }

    throw redirect(303, "/surgery/admission/thnk");
  },
  zod$({
    documentationId: z.string(),
    reportContent: z.string(),
  }),
);

export default component$(() => {
  const dataSig = useLoadData();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Chirurgické oddělení</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/surgery/">Chirurgické oddělení</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>Příjem pacienta k operaci</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <SurgeryAdmissionProvider
        documentationId={dataSig.value.documentationAkordId}
        initialPatient={dataSig.value.patient}
      >
        <div class="my-4 flex justify-center rounded border border-app-border-base bg-app-surface-base p-4">
          <SurgeryAdmissionProgress />
        </div>
        <StepSelector />
      </SurgeryAdmissionProvider>
    </>
  );
});

const StepSelector = component$(() => {
  const ctx = useSurgeryAdmissionContext();
  const crateReportAction = useCreateReport();

  if (ctx.currentStep.code === "patientSelection") return <SurgeryAdmissionStepPatientSelection />;
  if (ctx.currentStep.code === "checklist") return <SurgeryAdmissionStepChecklist />;
  if (ctx.currentStep.code === "personalAnamnesis") return <SurgeryAdmissionStepPersonalAnamnesis />;
  if (ctx.currentStep.code === "objectiveFinding") return <SurgeryAdmissionStepObjectiveFinding />;
  if (ctx.currentStep.code === "localFinding") return <SurgeryAdmissionStepLocalFinding />;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (ctx.currentStep.code === "addendum") return <SurgeryAdmissionStepAddendum action={crateReportAction} />;

  return null;
});
