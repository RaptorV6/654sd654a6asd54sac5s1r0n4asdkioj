import { component$ } from "@builder.io/qwik";

import type { PatientForRequestDisplay } from "./types";

import { CopySpan } from "./copy-span";

type PatientInfoProps = {
  patient: PatientForRequestDisplay;
};

export const PatientInfo = component$<PatientInfoProps>(({ patient }) => {
  return (
    <dl class="grid  grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-[1fr_4fr]">
      <dt>Jméno a příjmení:</dt>
      <dd class="font-bold">{patient.veryFullName} </dd>
      <dt>Telefonní číslo:</dt>
      <dd class="flex flex-row items-center font-bold">
        {patient.phoneNumber}
        {patient.phoneNumber && <CopySpan textToCopy={patient.phoneNumber} title="Zkopírovat telefonní číslo" />}
      </dd>
      <dt>Rodné číslo:</dt>
      <dd class="flex flex-row items-center font-bold">
        {patient.birthRegistrationNumber}{" "}
        {patient.birthRegistrationNumber && (
          <CopySpan textToCopy={patient.birthRegistrationNumber} title="Zkopírovat rodné číslo" />
        )}
      </dd>
    </dl>
  );
});
