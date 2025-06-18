import { Button, ButtonLabelIcon } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";

import { AddOutlineIcon } from "~/components/icons-outline";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { ExpectationDetailMedicationsCreateFormDialog } from "./expectation-detail-medications-create-form-dialog";
import { ExpectationDetailMedicationsList } from "./expectation-detail-medications-list";

export const ExpectationDetailMedications = component$(() => {
  const showAddDialogSig = useSignal<boolean>(false);

  return (
    <>
      <ExpectationBlock>
        <ExpectationBlockTitle class="flex">
          <span class="flex-1">Medikace</span>
          <Button
            class="inline-flex items-center"
            onClick$={() => {
              showAddDialogSig.value = true;
            }}
            severity="success"
            size="xs"
            type="button"
            variant="outline"
          >
            <ButtonLabelIcon as={AddOutlineIcon} />
            Přidat
          </Button>
        </ExpectationBlockTitle>

        <ExpectationDetailMedicationsList />
      </ExpectationBlock>
      <ExpectationDetailMedicationsCreateFormDialog bind:show={showAddDialogSig} />
    </>
  );
});
