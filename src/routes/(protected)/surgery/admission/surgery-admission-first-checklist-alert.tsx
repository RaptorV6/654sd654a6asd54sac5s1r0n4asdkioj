import { Alert, Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { useSurgeryAdmissionContext } from "./surgery-admission-context";
import { surgeryAdmissionGetCurrentStep } from "./surgery-admission-steps";

export const SurgeryAdmissionFirstChecklistAlert = component$(() => {
  const ctx = useSurgeryAdmissionContext();
  const toStep = surgeryAdmissionGetCurrentStep("checklist");

  return (
    <Alert class="flex items-center" severity="warning">
      <p class="flex-1 font-bold">Je potřeba nejdříve projít kontrolní seznam</p>
      <Button
        onClick$={() => {
          ctx.currentStep = toStep;
        }}
        severity="warning"
        type="button"
      >
        {toStep.title}
      </Button>
    </Alert>
  );
});
