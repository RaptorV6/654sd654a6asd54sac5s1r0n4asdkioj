import { FieldHidden, InputCheckboxButtons } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { z } from "@builder.io/qwik-city";
import { Field, formAction$, setValue, submit, useForm, zodForm$ } from "@modular-forms/qwik";

import type { Procedure } from "~/server/rpc/procedure";

import { serverGetSession, useAuthUser } from "~/routes/plugin@auth";
import { serverUpdateProcedure } from "~/server/rpc/procedure";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

const DiagnosisConfirmationFormSchema = z.object({
  diagnosisConfirmed: z.boolean({ required_error: "Vyberte jednu z možností" }),
  diagnosisConfirmedBy: z.string(),
  procedureId: z.string(),
});
type DiagnosisConfirmationFormValues = z.infer<typeof DiagnosisConfirmationFormSchema>;

export const useUpdateProcedureDiagnosisConfirmationFormAction = formAction$<DiagnosisConfirmationFormValues>(
  async (values, requestEvent) => {
    const { user } = serverGetSession(requestEvent);

    await serverUpdateProcedure(requestEvent.env, {
      data: {
        diagnosisConfirmed: {
          confirmedBy: values.diagnosisConfirmedBy,
          status: values.diagnosisConfirmed,
        },
      },
      procedureId: values.procedureId,
    });

    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId: values.procedureId,
      taskKind: "diagnosisConfirmation",
    });
  },
  zodForm$(DiagnosisConfirmationFormSchema),
);

type ProcedureDiagnosisConfirmationProps = {
  procedure: {
    diagnosisConfirmed: Procedure["diagnosisConfirmed"];
    id: string;
  };
};

export const ProcedureDiagnosisConfirmation = component$(({ procedure }: ProcedureDiagnosisConfirmationProps) => {
  const user = useAuthUser();

  const [formStore, { Form }] = useForm<DiagnosisConfirmationFormValues>({
    action: useUpdateProcedureDiagnosisConfirmationFormAction(),
    loader: {
      value: {
        diagnosisConfirmed: procedure.diagnosisConfirmed?.status,
        diagnosisConfirmedBy: user.id,
        procedureId: procedure.id,
      },
    },
    validate: zodForm$(DiagnosisConfirmationFormSchema),
  });

  return (
    <Form class="form-styles -mt-4">
      <FieldHidden name="procedureId" of={formStore} />
      <FieldHidden name="diagnosisConfirmedBy" of={formStore} />

      <Field name="diagnosisConfirmed" of={formStore} type="boolean">
        {(fieldStore) => (
          <InputCheckboxButtons
            error={fieldStore.error}
            label="Je diagnóza potvrzena?"
            name={fieldStore.name}
            onInput$={(_: any, el: HTMLInputElement) => {
              setValue(formStore, "diagnosisConfirmed", el.checked);
              submit(formStore);
            }}
            options={[
              { label: "ANO", value: true },
              { label: "NE", value: false },
            ]}
            value={fieldStore.value}
          />
        )}
      </Field>
    </Form>
  );
});
