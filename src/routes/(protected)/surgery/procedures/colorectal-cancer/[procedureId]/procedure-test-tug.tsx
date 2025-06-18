import { FieldHidden, InputAdornmentText, InputNumber } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { z } from "@builder.io/qwik-city";
import { Field, formAction$, setValue, submit, useForm, zodForm$ } from "@modular-forms/qwik";

import type { PatientMedicalTestTugResult } from "~/types/patient-medical-tests";

import { serverGetSession } from "~/routes/plugin@auth";
import { serverUpsertPatientMedicalTestForProcedure } from "~/server/rpc/patient-medical-test";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

const ProcedureTestMustFormSchema = z.object({
  patientId: z.string(),
  procedureId: z.string(),
  resultTime: z.number({ required_error: "Vyplňte výsledek testu." }).min(1, "Výsledek nesmí bý"),
});
type ProcedureTestMustFormValues = z.infer<typeof ProcedureTestMustFormSchema>;

export const useUpdateProcedurePatientMustTestFormAction = formAction$<ProcedureTestMustFormValues>(
  async (values, requestEvent) => {
    const { user } = serverGetSession(requestEvent);

    const result: PatientMedicalTestTugResult = { timeInSeconds: values.resultTime };

    const medicalTest = await serverUpsertPatientMedicalTestForProcedure({
      data: {
        result,
      },
      kind: "tug",
      patientId: values.patientId,
      procedureId: values.procedureId,
    });

    // IF result of MUST test is not positive => procedure taks `prehabilitationStarted` is done
    if (result.timeInSeconds < 15) {
      await serverDoneProcedureTask({
        doneBy: user.id,
        procedureId: values.procedureId,
        taskKind: "prehabilitationStarted",
      });
    }

    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId: values.procedureId,
      result: {
        medicalTestId: medicalTest.id,
      },
      taskKind: "testTug",
    });
  },
  zodForm$(ProcedureTestMustFormSchema),
);

type ProcedureTestTugProps = {
  procedure: {
    id: string;
    patient: {
      id: string;
    };
  };
  testResult: null | PatientMedicalTestTugResult;
};

export const ProcedureTestTug = component$(({ procedure, testResult }: ProcedureTestTugProps) => {
  const [formStore, { Form }] = useForm<ProcedureTestMustFormValues>({
    action: useUpdateProcedurePatientMustTestFormAction(),
    loader: {
      value: {
        patientId: procedure.patient.id,
        procedureId: procedure.id,
        resultTime: testResult?.timeInSeconds ?? undefined,
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

      <Field name="resultTime" of={formStore} type="number">
        {(fieldStore) => (
          <InputNumber
            adornmentEnd={<InputAdornmentText>sekund</InputAdornmentText>}
            error={fieldStore.error}
            label="Výsledek Timed Up and Go"
            name={fieldStore.name}
            onInput$={(_: unknown, target: HTMLInputElement) => {
              setValue(formStore, "resultTime", Number(target.value));
              submit(formStore);
            }}
            value={fieldStore.value}
          />
        )}
      </Field>
    </Form>
  );
});
