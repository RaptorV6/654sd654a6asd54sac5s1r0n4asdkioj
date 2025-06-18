import { Button, ListItem } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";
import { CheckOutlineIcon } from "~/components/icons-outline";
import { ListItemDateTime } from "~/components/list-item-date-time";
import { createIrisClient } from "~/iris";
import { useAuthUser } from "~/routes/plugin@auth";

import type { ExpectationDetailData } from "./fetch-expectation-detail";

import { ExpectationDetailMedicationsUpdateFormDialog } from "./expectation-detail-medications-update-form-dialog";

const doneMedication$ = server$(async function (values: { doneBy: string; medicationId: string }) {
  const iris = createIrisClient(this.env);

  try {
    await iris.mutation({
      updateInternsAmbExpectationMedication: {
        __args: {
          input: {
            doneAt: new Date(),
            doneById: values.doneBy,
            id: values.medicationId,
            updatedById: values.doneBy,
          },
        },
        internsAmbExpectationMedication: {
          id: true,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("doneMedication$: update of medication failed with error:", error);
    return { fail: true };
  }
});

type ExpectationDetailMedicationsListItemProps = {
  medication: NonNullable<ExpectationDetailData["medications"]>[number];
};

export const ExpectationDetailMedicationsListItem = component$<ExpectationDetailMedicationsListItemProps>(
  ({ medication }) => {
    const user = useAuthUser();
    const editDialogShowSig = useSignal(false);

    return (
      <ListItem class="flex items-center gap-4 !px-0">
        <ListItemDateTime time={medication.createdAt} />
        <p class="flex-1">{medication.instruction}</p>
        {medication.doneAt == null ? (
          <div class="flex items-center justify-end gap-2">
            <Button
              class="inline-flex items-center justify-center"
              onClick$={() => {
                editDialogShowSig.value = true;
              }}
              size="xs"
              type="button"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                  fill="currentColor"
                />
              </svg>
              <span class="sr-only">Upravit</span>
            </Button>
            <ExpectationDetailMedicationsUpdateFormDialog bind:show={editDialogShowSig} medication={medication} />
            <ButtonWithConfirmation
              dialogActionCancelLabel="Ne"
              dialogActionConfirmLabel="Ano"
              dialogAlertText="Je medikace skutečně podána?"
              dialogTitle="Potvrďte podání medikace"
              onClick$={async () => {
                await doneMedication$({ doneBy: user.id, medicationId: medication.id });
              }}
              severity="accent"
              size="xs"
              variant="outline"
            >
              Podat
            </ButtonWithConfirmation>
          </div>
        ) : (
          <span>
            <CheckOutlineIcon class="h-7 w-7 text-success-base" />
            <span class="sr-only">Podáno</span>
          </span>
        )}
      </ListItem>
    );
  },
);
