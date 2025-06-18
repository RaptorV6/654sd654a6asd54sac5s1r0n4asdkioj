import type { Signal } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, FieldHidden, FieldText } from "@akeso/ui-components";
import { component$, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { createIrisClient } from "~/iris";
import { useAuthUser } from "~/routes/plugin@auth";

import { useExpectationDetailContext } from "./expectation-detail-provider";

const OrdinationFormSchema = v.object({
  createdById: v.string(),
  expectationId: v.string(),
  instruction: v.pipe(v.string("Pole je povinné."), v.minLength(1, "Pole je povinné.")),
});

type OrdinationFormValues = v.InferOutput<typeof OrdinationFormSchema>;

const createOrdination$ = server$(async function (input: OrdinationFormValues) {
  const iris = createIrisClient(this.env);

  try {
    await iris.mutation({
      createInternsAmbExpectationOrdination: {
        __args: {
          input,
        },
        internsAmbExpectationOrdination: {
          id: true,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("createOrdination$: creation of ordination failed with error:", error);
    return { failed: true };
  }
});

type ExpectationDetailOrdinationsCreateFormDialogProps = {
  "bind:show": Signal<boolean>;
};

export const ExpectationDetailOrdinationsCreateFormDialog =
  component$<ExpectationDetailOrdinationsCreateFormDialogProps>(({ "bind:show": isOpenSig }) => {
    const detailCtx = useExpectationDetailContext();
    const user = useAuthUser();

    const [formStore, { Form }] = useForm<OrdinationFormValues>({
      loader: { value: createFormInitialValues(user.id, detailCtx.expectation.id) },
      validate: valiForm$(OrdinationFormSchema),
    });

    useTask$(({ track }) => {
      track(() => detailCtx.expectation.id);
      reset(formStore, { initialValues: createFormInitialValues(user.id, detailCtx.expectation.id) });
    });

    return (
      <Dialog bind:show={isOpenSig}>
        <DialogHeader>Přidání ordinace</DialogHeader>
        <DialogBody>
          <Form
            class="form-styles"
            onSubmit$={async (values) => {
              await createOrdination$(values);
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

function createFormInitialValues(userId: string, expectationId: string): OrdinationFormValues {
  return { createdById: userId, expectationId: expectationId, instruction: "" };
}
