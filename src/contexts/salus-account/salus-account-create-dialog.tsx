import { Alert, Dialog, DialogBody, DialogHeader } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";

import { useSalusAccountCreateContext } from "./salus-account-context";

export const SalusaccountCreateDialog = component$(() => {
  const isDialogOpenSig = useSignal(false);
  const { createSalusAccountForPatientSig } = useSalusAccountCreateContext();

  useTask$(({ track }) => {
    const patientId = track(() => createSalusAccountForPatientSig.value);
    isDialogOpenSig.value = patientId != null;
  });

  useTask$(({ track }) => {
    const isOpen = track(() => isDialogOpenSig.value);

    if (!isOpen && createSalusAccountForPatientSig.value) {
      createSalusAccountForPatientSig.value = null;
    }
  });

  return (
    <Dialog bind:show={isDialogOpenSig}>
      <DialogHeader>Založení účtu</DialogHeader>
      <DialogBody>
        <div class="p-8">
          <Alert severity="info">
            <p>V této chvíli založení účtu v akeso.online není podporováno.</p>
            <p>Tato funčnost bude doplněna v některé z následujících verzí aplikace</p>
          </Alert>
        </div>
      </DialogBody>
    </Dialog>
  );
});
