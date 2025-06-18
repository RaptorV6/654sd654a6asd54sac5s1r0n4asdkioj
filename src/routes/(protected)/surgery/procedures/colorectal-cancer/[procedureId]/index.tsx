import type { DocumentHead } from "@builder.io/qwik-city";

import { Alert } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import type { ProcedureCurrentActivity } from "~/server/rpc/procedure-tasks";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";
import { serverGetSession, useAuthUser } from "~/routes/plugin@auth";
import { serverGetProcedure } from "~/server/rpc/procedure";
import { serverProcedureActivity } from "~/server/rpc/procedure-tasks";

import { InitialVisitAdministrative } from "./initial-visit-administrative";
import { InitialVisitDoctor } from "./initial-visit-doctor";
import { InitialVisitNurse } from "./initial-visit-nurse";
import { ProcedureActivityInfoPanel } from "./procedure-activity-info-panel";
import { ProcedureDeliveryOfDocuments } from "./procedure-delivery-of-documents";
import { ProcedureHeader } from "./procedure-header";
import { ProcedureContext, useProcedureContext } from "./procedure-provider";
import { ProcedureTabs } from "./procedure-tabs";

// type StepSelector = "initialVisitDoctor" | "initialVisitNurse";

// type StepConfig = {
//   role: AuthUserRole;
//   state: "done" | "fill" | "waiting";
//   stepSelector: StepSelector;
// };

const resolvePageTitle = (
  procedure:
    | { meta: { name: string }; patient: { birthRegistrationNumber: null | string; fullName: string } }
    | undefined,
): string =>
  procedure
    ? `${procedure.patient.fullName} (${procedure.patient.birthRegistrationNumber}) - ${procedure.meta.name}`
    : "Procedura nenalezena";

//
//
// LOADERS
//
//

export const useProcedureData = routeLoader$(async (requestEvent) => {
  const { user } = serverGetSession(requestEvent);
  const { procedureId } = requestEvent.params;

  let activity: ProcedureCurrentActivity = "ALL_DONE";

  if ((user as any).role !== "none") {
    const a = await serverProcedureActivity(requestEvent.env, {
      procedureId,
      responsible: (user as any).role,
    });
    if (a) {
      activity = a;
    }
  }

  const procedure = await serverGetProcedure(requestEvent.env, { procedureId });

  if (procedure == null) {
    return requestEvent.fail(404, {});
  }

  return { activity, procedure };
});

// export { useColorectalCancerChecklistData } from "./colorectal-cancer-checklist";
export { useInitialVisitDoctorData } from "./initial-visit-doctor";

//
//
// ACTIONS
//
//

export { useProcedureIntialVisitDone } from "./initial-visit-doctor";
export { useUpdateProcedureAsaFormAction } from "./procedure-asa";
export {
  useProcedureDeliveryOfDocumentsPreoExaminationsAction,
  useProcedureDeliveryOfDocumentsStagingAction,
} from "./procedure-delivery-of-documents";
export { useUpdateProcedureDiagnosisConfirmationFormAction } from "./procedure-diagnosis-confirmation";
export { useProcedureFollowUpExaminationAction } from "./procedure-follow-up-examination";
export { useProcedureNextStepsEducationUpdateAction } from "./procedure-next-steps-education";
export { useProcedureQuestionnairePatientInstructionsUpdateAction } from "./procedure-questionnaire-patient-instructions";
export { useProcedureQuestionnairePatientReleaseUpdateAction } from "./procedure-questionnaire-patient-release";
export { useProcedureQuestionnairePreoperativeFulfillAction } from "./procedure-questionnaire-preoperative-fulfill";
export { useProcedureReportingMethodAction } from "./procedure-reporting-method";
export { useProcedureRequestPreoperativeUpdateAction } from "./procedure-request-preoperative";
export {
  useProcedureStagingExamsReservationDatesAction,
  useProcedureStagingExamsReservationOutsideAction,
} from "./procedure-staging-exams-reservation";
export { useUpdateProcedureSurgeryFormAction } from "./procedure-surgery";
export { useUpdateProcedurePatientMustTestFormAction } from "./procedure-test-must";

//
//
// HEAD
//
//

export const head: DocumentHead = ({ resolveValue }) => {
  const procedureData = resolveValue(useProcedureData);

  return {
    title: resolvePageTitle(procedureData.procedure),
  };
};

//
//
// PAGE COMPONENT
//
//

export default component$(() => {
  const procedureDataSig = useProcedureData();

  const pageTitle = resolvePageTitle(procedureDataSig.value.procedure);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/surgery/">Chirurgické oddělení</PageBreadcrumbsLink>
        <PageBreadcrumbsLink href="/surgery/procedures/">Postupy</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      {procedureDataSig.value.failed ? (
        <Alert severity="error">Procedura neexistuje!</Alert>
      ) : (
        <ProcedureContext activity={procedureDataSig.value.activity} procedure={procedureDataSig.value.procedure}>
          <ProcedureHeader />
          <ProcedureActivityInfoPanel />
          <ProcedureDeliveryOfDocuments />
          <div class={["mt-4 grid grid-cols-1 gap-4", procedureDataSig.value.activity === "FILL" && "lg:grid-cols-2"]}>
            <SelectStepComponent />
            <ProcedureTabs />
          </div>
        </ProcedureContext>
      )}
    </>
  );
});

//
//
// INTERNAL COMPONENTS
//
//

const SelectStepComponent = component$(() => {
  const { activity, procedure } = useProcedureContext();
  const user = useAuthUser();
  const { role } = user as any;

  if (activity !== "FILL") return null;

  if (procedure.step.major === 1) {
    if (role === "doctor") {
      return <InitialVisitDoctor />;
    }

    if (role === "nurse") {
      return <InitialVisitNurse />;
    }

    if (role === "administrative") {
      return <InitialVisitAdministrative />;
    }
  }

  if (procedure.step.major === 2) {
    return <div>Procedure step 2</div>;
  }

  return null;
});
