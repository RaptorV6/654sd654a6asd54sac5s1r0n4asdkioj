import { Button, ButtonLabelIcon } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";

import { AddOutlineIcon } from "~/components/icons-outline";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { ExpectationDetailOrdinationsCreateFormDialog } from "./expectation-detail-ordinations-create-form-dialog";
import { ExpectationDetailOrdinationsList } from "./expectation-detail-ordinations-list";

export const ExpectationDetailOrdinations = component$(() => {
  const showAddDialogSig = useSignal<boolean>(false);

  return (
    <>
      <ExpectationBlock>
        <ExpectationBlockTitle class="flex items-center">
          <span class="flex-1">Ordinace</span>
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

        <ExpectationDetailOrdinationsList />
      </ExpectationBlock>

      <ExpectationDetailOrdinationsCreateFormDialog bind:show={showAddDialogSig} />
    </>
  );
});
