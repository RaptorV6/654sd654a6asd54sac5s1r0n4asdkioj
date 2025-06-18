import type { ActionStore } from "@builder.io/qwik-city";

import { ActionButton, Card, CardBody, CardFooter, CardHeader, CardHeaderTitle } from "@akeso/ui-components";
import { component$, useVisibleTask$ } from "@builder.io/qwik";

import type { EditorStoredText } from "./editor-outpatient-report";

import { EditorOutpatientReport } from "./editor-outpatient-report";
import { useSurgeryAdmissionContext } from "./surgery-admission-context";
import { SurgeryAdmissionFirstChecklistAlert } from "./surgery-admission-first-checklist-alert";
import { SurgeryAdmissionFirstSelectPatientAlert } from "./surgery-admission-first-select-patient-alert";

const editorStoredTexts: EditorStoredText[] = [
  { label: "Práce neschopnost", type: "group" },
  { label: "Vystavena", text: "<p><strong>PN:</strong> vystavena</p>", type: "text" },
  { label: "Převzata", text: "<p><strong>PN:</strong> převzata</p>", type: "text" },
  { label: "Nevyžaduje", text: "<p><strong>PN:</strong> nevyžaduje</p>", type: "text" },
];

type SurgeryAdmissionStepAddendumProps = {
  action: ActionStore<{ failed: boolean }, { documentationId: string; reportContent: string }, false>;
};
export const SurgeryAdmissionStepAddendum = component$<SurgeryAdmissionStepAddendumProps>((props) => {
  const ctx = useSurgeryAdmissionContext();
  if (ctx.patient == null) {
    return <SurgeryAdmissionFirstSelectPatientAlert />;
  }
  if (ctx.stepCompleted.checklist !== "done") {
    return <SurgeryAdmissionFirstChecklistAlert />;
  }

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (ctx.stepCompleted.addendum === "none") {
      ctx.stepCompleted.addendum = "progress";
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardHeaderTitle class="flex items-center justify-between">
          <span>Rekapitulace zadaných informací</span>
          <span class="text-sm text-app-text-weak">{`${ctx.patient.fullName} (${ctx.patient.birthRegistrationNumber})`}</span>
        </CardHeaderTitle>
      </CardHeader>
      <CardBody class="space-y-4">
        <div class="h-[calc(100vh-23rem)]">
          <EditorOutpatientReport
            class="h-full"
            content={ctx.result}
            onUpdate$={(newValue: string) => {
              ctx.result = newValue;
            }}
            scrollToEndOnMount
            storedText={editorStoredTexts}
            variant="standalone"
          />
        </div>
        <CardFooter class="text-end">
          <ActionButton
            action={props.action}
            params={{
              documentationId: ctx.documentationId?.toString() ?? "",
              reportContent: ctx.result,
            }}
            severity="accent"
            variant="contained"
          >
            Vytvořit vstupní zprávu
          </ActionButton>
        </CardFooter>
      </CardBody>
    </Card>
  );
});
