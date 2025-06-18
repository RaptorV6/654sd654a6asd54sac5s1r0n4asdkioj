import { FieldHidden, InputRadioButtons } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { z } from "@builder.io/qwik-city";
import { Field, formAction$, setValue, submit, useForm, zodForm$ } from "@modular-forms/qwik";

import { serverUpdateProcedure } from "~/server/rpc/procedure";

const ProcedureAsaFormSchema = z.object({
  asa: z.number({ coerce: true, required_error: "Vyberte jednu z možností" }),
  procedureId: z.string(),
});
type ProcedureAsaFormValues = z.infer<typeof ProcedureAsaFormSchema>;

export const useUpdateProcedureAsaFormAction = formAction$<ProcedureAsaFormValues>(async (values, requestEvent) => {
  await serverUpdateProcedure(requestEvent.env, {
    data: {
      asa: values.asa,
    },
    procedureId: values.procedureId,
  });
}, zodForm$(ProcedureAsaFormSchema));

type ProcedureAsaProps = {
  procedure: {
    asa: null | number;
    id: string;
  };
};

export const ProcedureAsa = component$(({ procedure }: ProcedureAsaProps) => {
  const [formStore, { Form }] = useForm<ProcedureAsaFormValues>({
    action: useUpdateProcedureAsaFormAction(),
    loader: {
      value: {
        asa: procedure.asa ?? undefined,
        procedureId: procedure.id,
      },
    },
    validate: zodForm$(ProcedureAsaFormSchema),
  });

  // useTask$(({ track }) => {
  //   track(() => formStore.submitCount);
  //   console.log(formStore.internal);
  //   for (const [name, value] of Object.entries(formStore.internal.fields)) {
  //     if (value && value.error) {
  //       console.log(name, value.error);
  //     }
  //   }
  //   for (const [name, value] of Object.entries(formStore.internal.fieldArrays)) {
  //     if (value && value.error) {
  //       console.log(name, value.error);
  //     }
  //   }
  // });

  return (
    <Form class="form-styles -mt-4">
      <FieldHidden name="procedureId" of={formStore} />

      <Field name="asa" of={formStore} type="number">
        {(fieldStore) => (
          <InputRadioButtons
            error={fieldStore.error}
            helperText={
              <span>
                Slouží k přípravě <span class="italic">Žádosti o předoperační vyšetření</span>
              </span>
            }
            label="ASA pacienta"
            name={fieldStore.name}
            onInput$={(_: unknown, target: HTMLInputElement) => {
              setValue(formStore, "asa", Number(target.value));
              submit(formStore);
            }}
            options={[
              { label: "I", value: "1" },
              { label: "II", value: "2" },
              { label: "III", value: "3" },
              { label: "IV", value: "4" },
              { label: "V", value: "5" },
            ]}
            value={fieldStore.value?.toString()}
          />
        )}
      </Field>
    </Form>
  );
});
