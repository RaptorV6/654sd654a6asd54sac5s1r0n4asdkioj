import { component$, useComputed$ } from "@builder.io/qwik";

import type { PageProgressHorizontalItemStatus } from "~/components/page-progress-horizontal";

import { PageProgressHorizontalItem, PageProgressHorizontalRoot } from "~/components/page-progress-horizontal";

import type { SurgeryAdmissionStep } from "./surgery-admission-steps";

import { useSurgeryAdmissionContext } from "./surgery-admission-context";
import { surgeryAdmissionGetCurrentStep, SurgeryAdmissionSteps } from "./surgery-admission-steps";

export const SurgeryAdmissionProgress = component$(() => {
  return (
    <PageProgressHorizontalRoot>
      {SurgeryAdmissionSteps.map((step, idx) => (
        <Step idx={idx} key={step.code} step={step} stepsNum={SurgeryAdmissionSteps.length} />
      ))}
    </PageProgressHorizontalRoot>
  );
});

const Step = component$(({ idx, step, stepsNum }: { idx: number; step: SurgeryAdmissionStep; stepsNum: number }) => {
  const ctx = useSurgeryAdmissionContext();
  const stepStatusSig = useComputed$((): PageProgressHorizontalItemStatus => {
    const ss = ctx.stepCompleted[step.code];
    const csc = ctx.currentStep.code;

    if (csc === step.code) return "current";
    if (ss === "done") return "completed";
    if (ss === "progress") return "current";
    return "upcoming";
  });
  return (
    <PageProgressHorizontalItem
      disableForwardNavigation={false}
      // href={step.href}
      last={idx === stepsNum - 1}
      onClick$={() => {
        const nextStep = surgeryAdmissionGetCurrentStep(step.code);
        if (ctx.stepCompleted[step.code] === "progress" || ctx.stepCompleted[step.code] === "done") {
          ctx.currentStep = nextStep;
        }
      }}
      status={stepStatusSig.value}
      title={step.title}
    />
  );
});
