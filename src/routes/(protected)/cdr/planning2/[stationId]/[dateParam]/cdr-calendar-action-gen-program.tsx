import type { ButtonSeverity, ButtonVariant } from "@akeso/ui-components";
import type { ClassList } from "@builder.io/qwik";

import { ActionButton } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import type { GenerateTreatmentProgramValues } from "./_actions";

import { useGenerateTreatmentProgramAction } from "./_actions";

type CdrCalendarActionGenProgram = {
  class?: ClassList;
  dateOfMonth: Date;
  severity?: ButtonSeverity;
  stationId: string;
  variant?: ButtonVariant;
};

export const CdrCalendarActionGenProgram = component$<CdrCalendarActionGenProgram>(
  ({ class: rootClass, dateOfMonth, severity, stationId, variant }) => {
    const generateProgramFromTemplateAction = useGenerateTreatmentProgramAction();
    return (
      <ActionButton
        action={generateProgramFromTemplateAction}
        class={rootClass}
        params={
          {
            dayOfMonth: dateOfMonth.toISOString(),
            stationId: stationId,
          } satisfies GenerateTreatmentProgramValues
        }
        severity={severity ?? "accent"}
        variant={variant ?? "contained"}
      >
        Vygenerovat z šablony
      </ActionButton>
    );
  },
);
