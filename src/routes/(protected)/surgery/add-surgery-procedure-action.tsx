import { Button, ButtonLabelIcon } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { AddOutlineIcon } from "~/components/icons-outline";
import { useSurgeryDepartmentContext } from "~/contexts/departments/surgery/surgery-context";

export const AddSurgeryProcedureAction = component$(() => {
  const surgeryContext = useSurgeryDepartmentContext();

  return (
    <Button
      class="inline-flex items-center"
      onClick$={() => {
        surgeryContext.selectProcedureDialogOpenSig.value = true;
      }}
      severity="accent"
      type="button"
      variant="outline"
    >
      <ButtonLabelIcon as={AddOutlineIcon} />
      Přidat postup
    </Button>
  );
});
