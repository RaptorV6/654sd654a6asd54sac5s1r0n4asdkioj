import type { Signal } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, FieldHidden, FieldText } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { createIrisClient } from "~/iris";
import { useAuthUser } from "~/routes/plugin@auth";

import type { ExpectationDetailData } from "./fetch-expectation-detail";

import { useExpectationDetailContext } from "./expectation-detail-provider";
import { MedicationFragment } from "./fetch-expectation-detail";

const MedicationFormSchema = v.object({
  id: v.string(),
  instruction: v.pipe(v.string("Pole je povinné."), v.minLength(1, "Pole je povinné.")),
  updatedById: v.string(),
});

type MedicationFormValues = v.InferOutput<typeof MedicationFormSchema>;

const updateMedication$ = server$(async function (input: MedicationFormValues) {
  const iris = createIrisClient(this.env);

  try {
    const {
      updateInternsAmbExpectationMedication: { internsAmbExpectationMedication },
    } = await iris.mutation({
      updateInternsAmbExpectationMedication: {
        __args: {
          input,
        },
        internsAmbExpectationMedication: MedicationFragment,
      },
    });

    return { data: internsAmbExpectationMedication, success: true };
  } catch (error) {
    console.error("updateMedication$: update of medication failed with error:", error);
    return { failed: true };
  }
});

type ExpectationDetailMedicationsUpdateFormDialogProps = {
  "bind:show": Signal<boolean>;
  medication: NonNullable<ExpectationDetailData["medications"]>[number];
};

export const ExpectationDetailMedicationsUpdateFormDialog =
  component$<ExpectationDetailMedicationsUpdateFormDialogProps>(({ "bind:show": isOpenSig, medication }) => {
    const detailCtx = useExpectationDetailContext();
    const user = useAuthUser();

    const [formStore, { Form }] = useForm<MedicationFormValues>({
      loader: { value: createFormInitialData(user.id, medication) },
      validate: valiForm$(MedicationFormSchema),
    });

    return (
      <Dialog bind:show={isOpenSig}>
        <DialogHeader>Upravit medikaci</DialogHeader>
        <DialogBody>
          <Form
            class="form-styles"
            onSubmit$={async (values) => {
              const r = await updateMedication$(values);
              if (r.success) {
                const idx = detailCtx.expectation.medications.findIndex((i) => i.id === r.data.id);
                if (idx > -1) {
                  detailCtx.expectation.medications[idx] = r.data;
                }
                reset(formStore);
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

function createFormInitialData(
  userId: string,
  medication: NonNullable<ExpectationDetailData["medications"]>[number],
): MedicationFormValues {
  return { id: medication.id, instruction: medication.instruction || "", updatedById: userId };
}
