import type { Signal } from "@builder.io/qwik";

import { Drawer } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";

import { PatientDetail } from "./patient-detail";

type PatientDetailDrawerProps = {
  "bind:patientId": Signal<null | string>;
};

export const PatientDetailDrawer = component$(({ "bind:patientId": patientIdSig }: PatientDetailDrawerProps) => {
  const isDrawerOpenSig = useSignal<boolean>(false);

  useTask$(({ track }) => {
    const nextPatientId = track(() => patientIdSig.value);

    if (nextPatientId == null && isDrawerOpenSig.value) {
      isDrawerOpenSig.value = false;
    } else if (nextPatientId && !isDrawerOpenSig.value) {
      isDrawerOpenSig.value = true;
    }
  });

  useTask$(({ track }) => {
    const nextIsDrawerOpenSig = track(() => isDrawerOpenSig.value);
    if (!nextIsDrawerOpenSig && patientIdSig.value) {
      patientIdSig.value = null;
    }
  });

  return (
    <Drawer bind:open={isDrawerOpenSig} position="right">
      {patientIdSig.value && <PatientDetail patientId={patientIdSig.value} />}
    </Drawer>
  );
});
