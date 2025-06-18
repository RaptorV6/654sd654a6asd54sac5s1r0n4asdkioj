import type { Signal } from "@builder.io/qwik";

import { component$, createContextId, Slot, useContext, useContextProvider, useStore } from "@builder.io/qwik";

import { SurgerySelectProcedureDialog } from "./surgery-select-procedure-dialog";

export type SurgeryDepartmentContext = {
  selectProcedureDialogOpenSig: Signal<boolean>;
};

const SurgeryDepartmentContextId = createContextId<SurgeryDepartmentContext>("surgery-select-procedure-context");

export const SurgeryDepartmentContextProvider = component$(() => {
  const surgeryContextStore = useStore<SurgeryDepartmentContext>({
    selectProcedureDialogOpenSig: {
      value: false,
    },
  });

  useContextProvider(SurgeryDepartmentContextId, surgeryContextStore);

  return (
    <>
      <Slot />
      <SurgerySelectProcedureDialog />
    </>
  );
});

export function useSurgeryDepartmentContext() {
  return useContext(SurgeryDepartmentContextId);
}
