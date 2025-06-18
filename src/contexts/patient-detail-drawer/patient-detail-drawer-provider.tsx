import type { Signal } from "@builder.io/qwik";

import { component$, createContextId, Slot, useContext, useContextProvider, useSignal } from "@builder.io/qwik";

import { PatientDetailDrawer } from "~/components/patient-detail-drawer";

type PatientDetailDrawerContext = {
  patientIdSig: Signal<null | string>;
};

const PatientDetailDrawerContextId = createContextId<PatientDetailDrawerContext>("PatientDetailDrawerContext");

export function usePatientDetailDrawerContext() {
  return useContext(PatientDetailDrawerContextId);
}

export const PatientDetailDrawerProvider = component$(() => {
  const patientIdSig = useSignal<null | string>(null);

  useContextProvider(PatientDetailDrawerContextId, {
    patientIdSig,
  });

  return (
    <>
      <Slot />
      <PatientDetailDrawer bind:patientId={patientIdSig} />
    </>
  );
});
