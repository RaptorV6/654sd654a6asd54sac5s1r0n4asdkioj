import { Button, Card, CardBody, CardFooter, CardHeader, CardHeaderTitle } from "@akeso/ui-components";
import { i18nFormatDate } from "@akeso/utils";
import { component$, Resource, useResource$, useVisibleTask$ } from "@builder.io/qwik";

import { Tabs, TabsTab } from "~/components/tabs";

import type { EditorStoredText } from "./editor-outpatient-report";

import { EditorOutpatientReport } from "./editor-outpatient-report";
import { useSurgeryAdmissionContext } from "./surgery-admission-context";
import { SurgeryAdmissionFirstChecklistAlert } from "./surgery-admission-first-checklist-alert";
import { SurgeryAdmissionFirstSelectPatientAlert } from "./surgery-admission-first-select-patient-alert";
import { surgeryAdmissionGetNextStep } from "./surgery-admission-steps";
import { serverPatientAnamnesis } from "./surgery-admission.server";

const editorStoredTexts: EditorStoredText[] = [
  { label: "Nadpis", type: "group" },
  { label: "Osobní anamnéza", text: "<p><strong>Osobní anamnéza:</strong>&nbsp;</p>", type: "text" },
  { label: "Nynější onemocnění", text: "<p><strong>Nynější onemocnění:</strong>&nbsp;</p>", type: "text" },
  { label: "Užívané léky", text: "<p><strong>Užívané léky:</strong>&nbsp;</p>", type: "text" },
  { type: "separator" },
  { label: "Texty", type: "group" },
  { label: "Přichází k výkonu", text: "<p>Pac. přichází k plánovanému výkonu -&nbsp;</p>", type: "text" },
  { type: "separator" },
  { label: "Výkony", type: "group" },
  { label: "proktokolektomie", text: "proktokolektomie", type: "text" },
  { type: "separator" },
  { label: "Ostatní", type: "group" },
  { label: "Datum operace", text: "<p>K výkonu v&nbsp;</p>", type: "text" },
  { label: "Hodnocení bolesti", text: "<p>Hodnocení bolesti dle NRS:&nbsp;</p>", type: "text" },
  { label: "Hospitalizace", text: "<p>Předpokládaná délka hospitalizace (v dnech):&nbsp;</p>", type: "text" },
];

export const SurgeryAdmissionStepPersonalAnamnesis = component$(() => {
  const ctx = useSurgeryAdmissionContext();
  if (ctx.patient == null) {
    return <SurgeryAdmissionFirstSelectPatientAlert />;
  }
  if (ctx.stepCompleted.checklist !== "done") {
    return <SurgeryAdmissionFirstChecklistAlert />;
  }

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (ctx.stepCompleted.personalAnamnesis === "none") {
      ctx.stepCompleted.personalAnamnesis = "progress";
    }
  });

  const nextStep = surgeryAdmissionGetNextStep("personalAnamnesis");

  return (
    <div class="grid grid-cols-1 gap-4 md:h-[calc(100vh-14rem)] md:grid-cols-2">
      <Card class="h-full">
        <CardHeader>
          <CardHeaderTitle class="flex items-center justify-between">
            <span>Výňatek dokumentace pacienta</span>
            <span class="text-sm text-app-text-weak">{`${ctx.patient.fullName} (${ctx.patient.birthRegistrationNumber})`}</span>
          </CardHeaderTitle>
        </CardHeader>
        <CardBody class="h-full">
          <DiseaseTabs patientId={ctx.patient.id} />
        </CardBody>
      </Card>

      <Card class="h-full">
        <CardHeader>
          <CardHeaderTitle class="flex items-center justify-between">
            <span>{ctx.currentStep.title}</span>
            <span class="text-sm text-app-text-weak">{`${ctx.patient.fullName} (${ctx.patient.birthRegistrationNumber})`}</span>
          </CardHeaderTitle>
        </CardHeader>
        <EditorOutpatientReport
          class="h-full"
          content={ctx.result}
          onUpdate$={(newValue: string) => {
            ctx.result = newValue;
          }}
          scrollToEndOnMount
          storedText={editorStoredTexts}
          variant="cardBody"
        />
        <CardFooter class="text-end">
          <Button
            onClick$={() => {
              if (ctx.stepCompleted.personalAnamnesis !== "done") {
                ctx.result = ctx.result + "<p><strong>Vstupní objektivní nález:</strong></p>";
              }

              ctx.stepCompleted.personalAnamnesis = "done";
              ctx.currentStep = nextStep;
            }}
            severity="accent"
            type="button"
            variant="contained"
          >
            {nextStep.title}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
});

type DiseaseTabsProps = {
  patientId: string;
};

const DiseaseTabs = component$<DiseaseTabsProps>(({ patientId }) => {
  const resource = useResource$(async ({ cleanup }) => {
    const ac = new AbortController();
    cleanup(() => {
      ac.abort();
    });

    return serverPatientAnamnesis(ac.signal, patientId);
  });

  return (
    <Resource
      onResolved={(documentations) => (
        <Tabs
          class="flex h-full flex-col"
          tabHeaders={documentations.map((d) =>
            [d.date ? i18nFormatDate(d.date) : "", d.description, d.methodName ? `(${d.methodName})` : ""]
              .filter((i) => !!i)
              .join(" "),
          )}
        >
          {documentations.map((doc, idx) => (
            <TabsTab class="flex-1 overflow-y-auto" index={idx} key={`docs-tab=${idx}`}>
              <div class="prose" dangerouslySetInnerHTML={doc.dataHtml} />
            </TabsTab>
          ))}
        </Tabs>
      )}
      value={resource}
    />
  );
});
