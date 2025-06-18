import { FieldHidden, InputCheckboxButtons } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { z } from "@builder.io/qwik-city";
import { Field, formAction$, setValue, submit, useForm, zodForm$ } from "@modular-forms/qwik";

import type { PatientMedicalTestMustResult } from "~/types/patient-medical-tests";

import { serverGetSession } from "~/routes/plugin@auth";
import { serverUpsertPatientMedicalTestForProcedure } from "~/server/rpc/patient-medical-test";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

const ProcedureTestMustFormSchema = z.object({
  patientId: z.string(),
  procedureId: z.string(),
  resultPositive: z.boolean({ required_error: "Vyberte jednu z možností" }),
});
type ProcedureTestMustFormValues = z.infer<typeof ProcedureTestMustFormSchema>;

export const useUpdateProcedurePatientMustTestFormAction = formAction$<ProcedureTestMustFormValues>(
  async (values, requestEvent) => {
    const { user } = serverGetSession(requestEvent);

    const result: PatientMedicalTestMustResult = { positive: values.resultPositive };

    const medicalTest = await serverUpsertPatientMedicalTestForProcedure({
      data: {
        result,
      },
      kind: "must",
      patientId: values.patientId,
      procedureId: values.procedureId,
    });

    // IF result of MUST test is not positive => procedure taks `nutritionalPreparationStarted` is done
    if (!result.positive) {
      await serverDoneProcedureTask({
        doneBy: user.id,
        procedureId: values.procedureId,
        taskKind: "nutritionalPreparationStarted",
      });
    }

    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId: values.procedureId,
      result: {
        medicalTestId: medicalTest.id,
      },
      taskKind: "testMust",
    });
  },
  zodForm$(ProcedureTestMustFormSchema),
);

type ProcedureTestMustProps = {
  procedure: {
    id: string;
    patient: {
      id: string;
    };
  };
  testResult: null | PatientMedicalTestMustResult;
};

export const ProcedureTestMust = component$(({ procedure, testResult }: ProcedureTestMustProps) => {
  const [formStore, { Form }] = useForm<ProcedureTestMustFormValues>({
    action: useUpdateProcedurePatientMustTestFormAction(),
    loader: {
      value: {
        patientId: procedure.patient.id,
        procedureId: procedure.id,
        resultPositive: testResult?.positive ?? undefined,
      },
    },
    validate: zodForm$(ProcedureTestMustFormSchema),
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
      <FieldHidden name="patientId" of={formStore} />
      <FieldHidden name="procedureId" of={formStore} />

      <Field name="resultPositive" of={formStore} type="boolean">
        {(fieldStore) => (
          <InputCheckboxButtons
            error={fieldStore.error}
            label="Je výsledek Malnutrition Universal Screenin Tool pozitivní?"
            name={fieldStore.name}
            onInput$={(_: unknown, target: HTMLInputElement) => {
              setValue(formStore, "resultPositive", target.checked);
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
