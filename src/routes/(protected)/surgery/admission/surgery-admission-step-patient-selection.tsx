import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderTitle,
  FieldNumber,
  useToaster,
} from "@akeso/ui-components";
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { FieldAutocompletePatient } from "~/components/field-autocomplete-patient";

import { useSurgeryAdmissionContext } from "./surgery-admission-context";
import { surgeryAdmissionGetNextStep } from "./surgery-admission-steps";
import { serverResolvePatient } from "./surgery-admission.server";

const SelectPatientFormSchema = v.object({
  documentationId: v.number(),
  patientId: v.string(),
});

type SelectPatientFormValue = v.InferOutput<typeof SelectPatientFormSchema>;

export const SurgeryAdmissionStepPatientSelection = component$(() => {
  const { toastError$ } = useToaster();
  const ctx = useSurgeryAdmissionContext();

  const nextStep = surgeryAdmissionGetNextStep("patientSelection");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (ctx.stepCompleted.patientSelection === "none") {
      ctx.stepCompleted.patientSelection = "progress";
    }
  });

  const [formStore, { Form }] = useForm<SelectPatientFormValue>({
    loader: { value: { documentationId: ctx.documentationId ?? undefined, patientId: ctx.patient?.id ?? undefined } },
    validate: valiForm$(SelectPatientFormSchema),
  });

  return (
    <Form
      onSubmit$={async (values) => {
        const patient = await serverResolvePatient(values.patientId);
        ctx.patient = patient;
        ctx.documentationId = values.documentationId;
        ctx.stepCompleted.patientSelection = "done";

        if (patient == null) {
          toastError$("Nepodařilo se najít pacienta.");
        } else {
          ctx.currentStep = nextStep;
        }
      }}
    >
      <Card>
        <CardHeader>
          <CardHeaderTitle>{ctx.currentStep.title}</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          {/* <p>9061290403</p> */}
          {/* <p>121212121</p> */}
          <div class="form-styles">
            <FieldAutocompletePatient
              helperText="Pro vyhledání pacienta zadejte část jména, příjmení nebo rodného čísla."
              label="Pacient"
              name="patientId"
              of={formStore}
            />
            {/* <p>2233763</p> */}
            <FieldNumber label="ID dokumentace" name="documentationId" of={formStore} />
          </div>
        </CardBody>
        <CardFooter class="text-end">
          <Button disabled={formStore.submitting} severity="accent" type="submit" variant="contained">
            {nextStep.title}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
});
