import type { Signal } from "@builder.io/qwik";

import { component$, createContextId, Slot, useContext, useContextProvider, useSignal } from "@builder.io/qwik";

import { SalusaccountCreateDialog } from "./salus-account-create-dialog";

export type SalusAccountCreateContext = {
  createSalusAccountForPatientSig: Signal<null | string>;
};

const SalusAccountCreateContextId = createContextId<SalusAccountCreateContext>("SalusAccountCreationContextId");

export function useSalusAccountCreateContext() {
  return useContext(SalusAccountCreateContextId);
}

export const SalusAccountProvider = component$(() => {
  const createSalusAccountForPatientSig = useSignal<null | string>(null);

  useContextProvider(SalusAccountCreateContextId, { createSalusAccountForPatientSig });

  return (
    <>
      <Slot />
      <SalusaccountCreateDialog />
    </>
  );
});
