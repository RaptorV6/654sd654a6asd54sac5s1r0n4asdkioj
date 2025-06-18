import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { FieldAutocompletePatient } from "~/components/field-autocomplete-patient";
import { createIrisClient } from "~/iris";

const FormSchema = v.object({
  patientId: v.string(),
});
type FormValues = v.InferInput<typeof FormSchema>;

export const useAction = formAction$<FormValues>(async (values, { env, error, redirect }) => {
  const { patient } = await createIrisClient(env).query({
    patient: {
      __args: {
        id: values.patientId,
      },
      akordId: true,
    },
  });

  if (patient == null) {
    throw error(404, "Patient not found!");
  }

  throw redirect(303, `/application-forms/create/?pacient=${patient.akordId}`);
}, valiForm$(FormSchema));

export default component$(() => {
  const [formStore, { Form }] = useForm<FormValues>({
    action: useAction(),
    loader: { value: { patientId: undefined } },
    validate: valiForm$(FormSchema),
  });
  return (
    <>
      <p class="mb-4">Testovací rozhraní pro sestavení vstupních query parametrů pro simulaci volani z AKORD.</p>
      <Form class="form-styles">
        <FieldAutocompletePatient label="Vyberte pacienta" name="patientId" of={formStore} />
        <div class="mt-2">
          <Button type="submit">OK</Button>
        </div>
      </Form>
    </>
  );
});
