import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderTitle,
  InputCheckboxButtons,
} from "@akeso/ui-components";
import { $, component$, useComputed$, useVisibleTask$ } from "@builder.io/qwik";

import type { PatientSex } from "~/iris";

import type { ChecklistValues } from "./surgery-admission-context";

import { useSurgeryAdmissionContext } from "./surgery-admission-context";
import { SurgeryAdmissionFirstSelectPatientAlert } from "./surgery-admission-first-select-patient-alert";
import { surgeryAdmissionGetNextStep } from "./surgery-admission-steps";

export const SurgeryAdmissionStepChecklist = component$(() => {
  const ctx = useSurgeryAdmissionContext();
  if (ctx.patient == null) {
    return <SurgeryAdmissionFirstSelectPatientAlert />;
  }

  const nextStep = surgeryAdmissionGetNextStep("checklist");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (ctx.stepCompleted.checklist === "none") {
      ctx.stepCompleted.checklist = "progress";
    }
  });

  const isAllOk = useComputed$(
    () =>
      [
        ctx.checklist.consent,
        ctx.checklist.notSick,
        // ctx.checklist.onEmptyStomach,
        ctx.checklist.preop,
        ctx.checklist.isAble,
      ].every((i) => i === true) && typeof ctx.checklist.onEmptyStomach === "boolean",
  );

  const isSomeFalse = useComputed$(() =>
    [
      ctx.checklist.consent,
      ctx.checklist.notSick,
      // ctx.checklist.onEmptyStomach,
      ctx.checklist.preop,
      ctx.checklist.isAble,
    ].some((i) => i === false),
  );

  return (
    <Card>
      <CardHeader>
        <CardHeaderTitle class="flex items-center justify-between">
          <span>{ctx.currentStep.title}</span>
          <span class="text-sm text-app-text-weak">{`${ctx.patient.fullName} (${ctx.patient.birthRegistrationNumber})`}</span>
        </CardHeaderTitle>
      </CardHeader>
      <CardBody>
        {isSomeFalse.value && (
          <div class="mb-8">
            <Alert severity="warning">
              <p class="font-bold">Není splněna některá z podmínek kontrolního seznamu.</p>
              <p>Přivolejte prosím nadřízený lékařský personál.</p>
            </Alert>
          </div>
        )}

        <div class="form-styles">
          <LocalCheckbox label="Pacient odevzdal předoperační vyšetření" name="preop" />
          <LocalCheckbox label="Pacient odevzdal informovaný souhlas" name="consent" />
          <LocalCheckbox label="Je pacient na lačno?" name="onEmptyStomach" />
          <LocalCheckbox label="Není pacient nemocný?" name="notSick" />
          <LocalCheckbox helperText="Je uvedeno na předoperačním vyšetření" label="Je schopný operace?" name="isAble" />
        </div>
      </CardBody>
      <CardFooter class="text-end">
        <Button
          disabled={!isAllOk.value}
          onClick$={async () => {
            if (ctx.stepCompleted.checklist !== "done") {
              ctx.result = ctx.result + (await buildResult$(ctx.patient));
            }
            ctx.stepCompleted.checklist = "done";
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
  );
});

type LocalCheckboxProps = {
  helperText?: string;
  label: string;
  name: keyof ChecklistValues;
};

const LocalCheckbox = component$<LocalCheckboxProps>(({ helperText, label, name }) => {
  const ctx = useSurgeryAdmissionContext();

  return (
    <InputCheckboxButtons
      error=""
      helperText={helperText}
      label={label}
      name={name}
      onInput$={(_, target) => {
        ctx.checklist[name] = target.checked;
      }}
      options={[
        { label: "ANO", value: true },
        { label: "NE", value: false },
      ]}
      value={ctx.checklist[name]}
    />
  );
});

const buildResult$ = $(async (patient: { sex: PatientSex } | null): Promise<string> => {
  if (!patient) return "";
  const res: string[] = [];

  if (patient.sex === "FEMALE") {
    res.push("<p>S výkonem souhlasí, poučena</p>");
  } else {
    res.push("<p>S výkonem souhlasí, poučen</p>");
  }
  res.push("<p>Informovaný souhlas podepsán.</p>");
  res.push("<p></p>");
  res.push("<p><strong>Osobní anamnéza:</strong>&nbsp;</p>");
  res.push("<p></p>");
  res.push("<p><strong>Užívané léky:</strong>&nbsp;</p>");
  res.push("<p></p>");
  res.push("<p><strong>Nynější onemocnění:</strong>&nbsp;</p>");

  return res.join("\n");
});
