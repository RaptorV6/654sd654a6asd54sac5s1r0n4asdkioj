import type { Signal } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, FieldHidden, FieldText } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { createIrisClient } from "~/iris";
import { useAuthUser } from "~/routes/plugin@auth";

import { useExpectationDetailContext } from "./expectation-detail-provider";
import { type ExpectationDetailData, OrdinationFragment } from "./fetch-expectation-detail";

const OrdinationFormSchema = v.object({
  id: v.string(),
  instruction: v.pipe(v.string("Pole je povinné."), v.minLength(1, "Pole je povinné.")),
  updatedById: v.string(),
});

type OrdinationFormValues = v.InferOutput<typeof OrdinationFormSchema>;

const updateOrdination$ = server$(async function (input: OrdinationFormValues) {
  const iris = createIrisClient(this.env);

  try {
    const {
      updateInternsAmbExpectationOrdination: { internsAmbExpectationOrdination },
    } = await iris.mutation({
      updateInternsAmbExpectationOrdination: {
        __args: {
          input,
        },
        internsAmbExpectationOrdination: OrdinationFragment,
      },
    });

    return { data: internsAmbExpectationOrdination, success: true };
  } catch (error) {
    console.error("updateOrdination$: update of ordination failed with error:", error);
    return { failed: true };
  }
});

type ExpectationDetailOrdinationsUpdateFormDialogProps = {
  "bind:show": Signal<boolean>;
  ordination: NonNullable<ExpectationDetailData["ordinations"]>[number];
};

export const ExpectationDetailOrdinationsUpdateFormDialog =
  component$<ExpectationDetailOrdinationsUpdateFormDialogProps>(({ "bind:show": isOpenSig, ordination }) => {
    const detailCtx = useExpectationDetailContext();
    const user = useAuthUser();

    const [formStore, { Form }] = useForm<OrdinationFormValues>({
      loader: { value: createFormInitialValues(user.id, ordination) },
      validate: valiForm$(OrdinationFormSchema),
    });

    return (
      <Dialog bind:show={isOpenSig}>
        <DialogHeader>Upravit ordinaci</DialogHeader>
        <DialogBody>
          <Form
            class="form-styles"
            onSubmit$={async (values) => {
              const r = await updateOrdination$(values);
              if (r.success) {
                const idx = detailCtx.expectation.ordinations.findIndex((i) => i.id === r.data.id);
                if (idx > -1) {
                  detailCtx.expectation.ordinations[idx] = r.data;
                }
                reset(formStore, { initialValues: createFormInitialValues(user.id, r.data) });
                isOpenSig.value = false;
              }
            }}
          >
            <FieldHidden name="id" of={formStore} />
            <FieldHidden name="updatedById" of={formStore} />
            <FieldText inputType="textarea" label="Instrukce" name="instruction" of={formStore} />
          </Form>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick$={() => {
              submit(formStore);
            }}
            severity="accent"
            type="button"
            variant="contained"
          >
            Upravit
          </Button>
        </DialogFooter>
      </Dialog>
    );
  });

function createFormInitialValues(
  userId: string,
  ordination: NonNullable<ExpectationDetailData["ordinations"]>[number],
): OrdinationFormValues {
  return { id: ordination.id, instruction: ordination.instruction || "", updatedById: userId };
}
