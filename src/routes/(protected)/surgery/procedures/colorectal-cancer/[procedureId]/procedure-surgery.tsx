import { FieldHidden, InputDate, InputRadioButtons } from "@akeso/ui-components";
import { dateAddDays, dateOnlyISODateString } from "@akeso/utils";
import { component$ } from "@builder.io/qwik";
import { z } from "@builder.io/qwik-city";
import { Field, formAction$, setValue, submit, useForm, zodForm$ } from "@modular-forms/qwik";

import type { Procedure } from "~/server/rpc/procedure";

import { serverGetSession } from "~/routes/plugin@auth";
import { serverUpdateProcedure } from "~/server/rpc/procedure";
import { serverDoneProcedureTask, serverRecalculateProcedureDueDates } from "~/server/rpc/procedure-tasks";

const ProcedureSurgeryFormSchema = z.object({
  procedureId: z.string(),
  surgeryDate: z.date({ coerce: true, required_error: "Vyberte jednu z možností" }),
  surgeryName: z.string({ required_error: "Vyberte jednu z možností" }),
});
type ProcedureSurgeryFormValues = z.infer<typeof ProcedureSurgeryFormSchema>;

export const useUpdateProcedureSurgeryFormAction = formAction$<ProcedureSurgeryFormValues>(
  async (values, requestEvent) => {
    const { user } = serverGetSession(requestEvent);

    await serverUpdateProcedure(requestEvent.env, {
      data: {
        surgery: {
          date: new Date(values.surgeryDate),
          name: values.surgeryName,
        },
      },
      procedureId: values.procedureId,
    });

    await serverRecalculateProcedureDueDates({ procedureId: values.procedureId });

    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId: values.procedureId,
      taskDescriptors: [{ taskKind: "surgeryIndication" }, { taskKind: "surgeryDate" }],
    });
  },
  zodForm$(ProcedureSurgeryFormSchema),
);

type ProcedureSurgeryProps = {
  procedure: {
    id: string;
    surgery: Procedure["surgery"];
  };
};

export const ProcedureSurgery = component$(({ procedure }: ProcedureSurgeryProps) => {
  const [formStore, { Form }] = useForm<ProcedureSurgeryFormValues>({
    action: useUpdateProcedureSurgeryFormAction(),
    loader: {
      value: {
        procedureId: procedure.id,
        surgeryDate: procedure.surgery?.date,
        surgeryName: procedure.surgery?.name,
      },
    },
    validate: zodForm$(ProcedureSurgeryFormSchema),
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

      <Field name="surgeryName" of={formStore} type="string">
        {(fieldStore) => (
          <InputRadioButtons
            error={fieldStore.error}
            label="Výkon"
            name={fieldStore.name}
            onInput$={(_: unknown, target: HTMLInputElement) => {
              setValue(formStore, "surgeryName", target.value);
              if (formStore.internal.fields["surgeryName"]?.value && formStore.internal.fields["surgeryDate"]?.value) {
                submit(formStore);
              }
            }}
            options={[
              { label: "Karcinom tlustého střeva", value: "Karcinom tlustého střeva" },
              { label: "Karcinom rekta", value: "Karcinom rekta" },
            ]}
            value={fieldStore.value}
          />
        )}
      </Field>
      <Field name="surgeryDate" of={formStore} type="Date">
        {(fieldStore) => (
          <InputDate
            error={fieldStore.error}
            helperText="Otimálně do 1 - 1,5 měsíce"
            label="Předběžný termín operace"
            // TODO: dat offset do metadat procedury
            min={dateOnlyISODateString(dateAddDays(20))}
            name={fieldStore.name}
            onInput$={(_: unknown, target: HTMLInputElement) => {
              if (target.value) {
                setValue(formStore, "surgeryDate", new Date(target.value));
              }
              if (formStore.internal.fields["surgeryName"]?.value && formStore.internal.fields["surgeryDate"]?.value) {
                submit(formStore);
              }
            }}
            value={fieldStore.value}
          />
        )}
      </Field>
    </Form>
  );
});
