import { Button, ListItem } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";
import { CheckOutlineIcon } from "~/components/icons-outline";
import { ListItemDateTime } from "~/components/list-item-date-time";
import { createIrisClient } from "~/iris";
import { useAuthUser } from "~/routes/plugin@auth";

import type { ExpectationDetailData } from "./fetch-expectation-detail";

import { ExpectationDetailOrdinationsUpdateFormDialog } from "./expectation-detail-ordinations-update-form-dialog";

const doneOrdination$ = server$(async function (values: { doneBy: string; ordinationId: string }) {
  const iris = createIrisClient(this.env);

  try {
    await iris.mutation({
      updateInternsAmbExpectationOrdination: {
        __args: {
          input: {
            doneAt: new Date(),
            doneById: values.doneBy,
            id: values.ordinationId,
            updatedById: values.doneBy,
          },
        },
        internsAmbExpectationOrdination: {
          id: true,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("doneOrdination$: update of ordination failed with error:", error);
    return { fail: true };
  }
});

type ExpectationDetailOrdinationsListItemProps = {
  ordination: NonNullable<ExpectationDetailData["ordinations"]>[number];
};

export const ExpectationDetailOrdinationsListItem = component$<ExpectationDetailOrdinationsListItemProps>(
  ({ ordination }) => {
    const user = useAuthUser();
    const editDialogShowSig = useSignal(false);

    return (
      <ListItem class="flex items-center gap-4 !px-0">
        <ListItemDateTime time={ordination.createdAt} />
        <p class="flex-1">{ordination.instruction}</p>
        {ordination.doneAt == null ? (
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
            <ExpectationDetailOrdinationsUpdateFormDialog bind:show={editDialogShowSig} ordination={ordination} />
            <ButtonWithConfirmation
              dialogActionCancelLabel="Ne"
              dialogActionConfirmLabel="Ano"
              dialogAlertText="Je ordinace skutečně splněná?"
              dialogTitle="Potvrďte splnění ordinace"
              onClick$={async () => {
                await doneOrdination$({ doneBy: user.id, ordinationId: ordination.id });
              }}
              severity="accent"
              size="xs"
              variant="outline"
            >
              Splnit
            </ButtonWithConfirmation>
          </div>
        ) : (
          <span>
            <CheckOutlineIcon class="h-7 w-7 text-success-base" />
            <span class="sr-only">Splněno</span>
          </span>
        )}
      </ListItem>
    );
  },
);
