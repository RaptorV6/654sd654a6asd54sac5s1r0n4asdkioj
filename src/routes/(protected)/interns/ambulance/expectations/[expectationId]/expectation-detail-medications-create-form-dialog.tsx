import type { Signal } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, FieldHidden, FieldText } from "@akeso/ui-components";
import { component$, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { createIrisClient } from "~/iris";
import { useAuthUser } from "~/routes/plugin@auth";

import { useExpectationDetailContext } from "./expectation-detail-provider";
import { MedicationFragment } from "./fetch-expectation-detail";

const MedicationFormSchema = v.object({
  createdById: v.string(),
  expectationId: v.string(),
  instruction: v.pipe(v.string("Pole je povinné."), v.minLength(1, "Pole je povinné.")),
});

type MedicationFormValues = v.InferOutput<typeof MedicationFormSchema>;

const createMedication$ = server$(async function (input: MedicationFormValues) {
  const iris = createIrisClient(this.env);

  try {
    const {
      createInternsAmbExpectationMedication: { internsAmbExpectationMedication },
    } = await iris.mutation({
      createInternsAmbExpectationMedication: {
        __args: {
          input,
        },
        internsAmbExpectationMedication: MedicationFragment,
      },
    });

    return { data: internsAmbExpectationMedication, success: true };
  } catch (error) {
    console.error("createMedication$: creation of medication failed with error:", error);
    return { failed: true };
  }
});

type ExpectationDetailMedicationsCreateFormDialogProps = {
  "bind:show": Signal<boolean>;
};

export const ExpectationDetailMedicationsCreateFormDialog =
  component$<ExpectationDetailMedicationsCreateFormDialogProps>(({ "bind:show": isOpenSig }) => {
    const detailCtx = useExpectationDetailContext();
    const user = useAuthUser();

    const [formStore, { Form }] = useForm<MedicationFormValues>({
      loader: { value: createFormInitialData(user.id, detailCtx.expectation.id) },
      validate: valiForm$(MedicationFormSchema),
    });

    useTask$(({ track }) => {
      track(() => detailCtx.expectation.id);
      reset(formStore, { initialValues: createFormInitialData(user.id, detailCtx.expectation.id) });
    });

    return (
      <Dialog bind:show={isOpenSig}>
        <DialogHeader>Přidání medikaci</DialogHeader>
        <DialogBody>
          <Form
            class="form-styles"
            onSubmit$={async (values) => {
              await createMedication$(values);
              reset(formStore);
              isOpenSig.value = false;
            }}
          >
            <FieldHidden name="expectationId" of={formStore} />
            <FieldHidden name="createdById" of={formStore} />
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
            Přidat
          </Button>
        </DialogFooter>
      </Dialog>
    );
  });

function createFormInitialData(userId: string, expectationId: string): MedicationFormValues {
  return { createdById: userId, expectationId: expectationId, instruction: "" };
}
