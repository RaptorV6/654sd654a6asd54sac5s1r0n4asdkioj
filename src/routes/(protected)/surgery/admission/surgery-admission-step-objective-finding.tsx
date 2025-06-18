import type { QRL } from "@builder.io/qwik";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderTitle,
  InputAdornmentText,
  InputNumber,
  PreviewText,
} from "@akeso/ui-components";
import { calcBodyMassIndex, i18nFormatNumber, i18nParseNumber } from "@akeso/utils";
import { $, component$, useTask$, useVisibleTask$ } from "@builder.io/qwik";

import type { EditorStoredText } from "./editor-outpatient-report";
import type { ObjectiveFindingsCalculationValues } from "./surgery-admission-context";

import { EditorOutpatientReport } from "./editor-outpatient-report";
import { useSurgeryAdmissionContext } from "./surgery-admission-context";
import { SurgeryAdmissionFirstChecklistAlert } from "./surgery-admission-first-checklist-alert";
import { SurgeryAdmissionFirstSelectPatientAlert } from "./surgery-admission-first-select-patient-alert";
import { surgeryAdmissionGetNextStep } from "./surgery-admission-steps";

const editorStoredTexts: EditorStoredText[] = [
  { label: "Nadpis", type: "group" },
  { label: "Objektivní nález", text: "<p><strong>Objektivní nález:</strong>&nbsp;</p>", type: "text" },
  { type: "separator" },
  { label: "Texty", type: "group" },
  {
    label: "Vše OK",
    text: `<p>Pacient při vědomí, orientován, spolupracuje, klidově eupnoe, bez známek anémie, cyanosy, anikterický, hydratace v normě. Neurologicky orientačně v normě.</p><p>Břicho: konstitučně v úrovni hrudníku, měkké, prohmatné, palpačně nebolestivé, bez rezistence, játra a slezina nezvětšeny, peristaltika +, tpt. bilaterálně negativní.</p><p>Končetiny: dolní končetiny bez otoků, bez známek zánětu či TEN, pulsace v periferii hmatná.</p>`,
    type: "text",
  },
  {
    label: "Pacient OK",
    text: "<p>Pacient při vědomí, orientován, spolupracuje, klidově eupnoe, bez známek anémie, cyanosy, anikterický, hydratace v normě. Neurologicky orientačně v normě.</p>",
    type: "text",
  },
  {
    label: "Břicho OK",
    text: "<p>Břicho: konstitučně v úrovni hrudníku, měkké, prohmatné, palpačně nebolestivé, bez rezistence, játra a slezina nezvětšeny, peristaltika +, tpt. bilaterálně negativní.</p>",
    type: "text",
  },
  { label: "Stomie OK", text: "<p>Stomie vitální, okolí bez zarudnutí.</p>", type: "text" },
  {
    label: "Končetiny OK",
    text: "<p>Končetiny: dolní končetiny bez otoků, bez známek zánětu či TEN, pulsace v periferii hmatná.</p>",
    type: "text",
  },
];

export const SurgeryAdmissionStepObjectiveFinding = component$(() => {
  const ctx = useSurgeryAdmissionContext();
  if (ctx.patient == null) {
    return <SurgeryAdmissionFirstSelectPatientAlert />;
  }
  if (ctx.stepCompleted.checklist !== "done") {
    return <SurgeryAdmissionFirstChecklistAlert />;
  }

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (ctx.stepCompleted.objectiveFinding === "none") {
      ctx.stepCompleted.objectiveFinding = "progress";
    }
  });

  const nextStep = surgeryAdmissionGetNextStep("objectiveFinding");

  return (
    <div class="grid grid-cols-1 gap-4 md:h-[calc(100vh-14rem)] md:grid-cols-2">
      <Card class="h-full">
        <CardHeader>
          <CardHeaderTitle class="flex items-center justify-between">
            <span>Kalkulace pro Objektivní nález</span>
            <span class="text-sm text-app-text-weak">{`${ctx.patient.fullName} (${ctx.patient.birthRegistrationNumber})`}</span>
          </CardHeaderTitle>
        </CardHeader>
        <CardBody class="h-full">
          <ObjectiveFindingsCalculation
            onTransfer$={(v) => {
              ctx.result = ctx.result + `\n<p>${v}</p>`;
            }}
          />
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
              if (ctx.stepCompleted.objectiveFinding !== "done") {
                ctx.result = ctx.result + "<p><strong>Lokální nález:</strong>&nbsp;</p>";
              }

              ctx.stepCompleted.objectiveFinding = "done";
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

/**
 *
 * @internal
 *
 */

type ObjectiveFindingsCalculationProps = {
  onTransfer$: QRL<(value: string) => Promise<void> | void>;
};

const ObjectiveFindingsCalculation = component$<ObjectiveFindingsCalculationProps>(({ onTransfer$ }) => {
  const ctx = useSurgeryAdmissionContext();

  useTask$(({ track }) => {
    track(() => ctx.objectiveFindingsCalculationValues.height);
    track(() => ctx.objectiveFindingsCalculationValues.weight);

    ctx.objectiveFindingsCalculationValues.bmi =
      calcBodyMassIndex(
        ctx.patient?.age,
        [ctx.objectiveFindingsCalculationValues.height, "cm"],
        [ctx.objectiveFindingsCalculationValues.weight, "kg"],
      ) ?? undefined;
  });

  const handleInput$ = $((event: Event, target: HTMLInputElement) => {
    const name = target.name as keyof ObjectiveFindingsCalculationValues;
    ctx.objectiveFindingsCalculationValues[name] = i18nParseNumber(target.value);
  });

  return (
    <div class="form-styles">
      <div class="form-grid grid-cols-1 gap-4 md:grid-cols-3">
        <InputNumber
          adornmentEnd={<InputAdornmentText>cm</InputAdornmentText>}
          error=""
          label="Výška"
          name="height"
          onInput$={handleInput$}
          required={false}
          value={ctx.objectiveFindingsCalculationValues.height}
        />
        <InputNumber
          adornmentEnd={<InputAdornmentText>kg</InputAdornmentText>}
          error=""
          label="Váha"
          name="weight"
          onInput$={handleInput$}
          required={false}
          value={ctx.objectiveFindingsCalculationValues.weight}
        />
        <PreviewText label="BMI" value={i18nFormatNumber(ctx.objectiveFindingsCalculationValues.bmi)} />
      </div>
      <div class="form-grid grid-cols-1 md:grid-cols-3">
        <InputNumber
          adornmentEnd={<InputAdornmentText>min</InputAdornmentText>}
          error=""
          label="Pulz"
          name="pulz"
          onInput$={handleInput$}
          required={false}
          value={ctx.objectiveFindingsCalculationValues.pulz}
        />
        <InputNumber
          adornmentEnd={<InputAdornmentText>°C</InputAdornmentText>}
          error=""
          label="Telesná teplota"
          name="temperature"
          onInput$={handleInput$}
          required={false}
          value={ctx.objectiveFindingsCalculationValues.temperature}
        />
        <div class="form-group">
          <label>Krevní tlak</label>
          <div class="input-group">
            <input name="pressureDown" type="text" value={ctx.objectiveFindingsCalculationValues.pressureDown} />
            <span class="adornment-divided adornment">/</span>
            <input name="pressureUp" type="text" value={ctx.objectiveFindingsCalculationValues.pressureUp} />
            <span class="adornment-divided adornment">mmHg</span>
          </div>
        </div>
      </div>

      <div class="mt-4 flex items-center">
        <Button
          onClick$={() => {
            const res = [
              ctx.objectiveFindingsCalculationValues.pressureDown &&
                ctx.objectiveFindingsCalculationValues.pressureUp &&
                `TK: ${i18nFormatNumber(ctx.objectiveFindingsCalculationValues.pressureDown)}/${i18nFormatNumber(ctx.objectiveFindingsCalculationValues.pressureUp)} mmHg`,
              ctx.objectiveFindingsCalculationValues.pulz &&
                `P: ${i18nFormatNumber(ctx.objectiveFindingsCalculationValues.pulz)}/min`,
              ctx.objectiveFindingsCalculationValues.temperature &&
                `TT: ${i18nFormatNumber(ctx.objectiveFindingsCalculationValues.temperature)} °C`,
              ctx.objectiveFindingsCalculationValues.height &&
                `Výška: ${i18nFormatNumber(ctx.objectiveFindingsCalculationValues.height)} cm`,
              ctx.objectiveFindingsCalculationValues.weight &&
                `Váha: ${i18nFormatNumber(ctx.objectiveFindingsCalculationValues.weight)} kg`,
              ctx.objectiveFindingsCalculationValues.bmi &&
                `BMI: ${i18nFormatNumber(ctx.objectiveFindingsCalculationValues.bmi)}`,
            ]
              .filter((s) => !!s)
              .join(", ");

            onTransfer$(res);
          }}
          type="button"
        >
          Přepsat do zprávy
        </Button>
      </div>
    </div>
  );
});
