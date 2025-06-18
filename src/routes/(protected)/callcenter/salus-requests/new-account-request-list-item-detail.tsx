import type { Signal } from "@builder.io/qwik";

import { Button, FieldHidden } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { formAction$, setValue, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { CheckedInCircleIcon, CloseInCircleIcon, InfoIcon } from "~/icons";

import type { PatientRequestWithPatient } from "./types";

type NewAccountRequestListItemDetailProps = {
  request: Extract<PatientRequestWithPatient, { requestType: "profileActivation" }>;
  showRequestFullSig: Signal<boolean>;
};

const FormSchema = v.object({
  action: v.nullable(v.string()),
  done: v.boolean(),
  patientId: v.string(),
  requestId: v.string(),
});
type FormValues = v.InferInput<typeof FormSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useSolveActivateAccountRequest = formAction$<FormValues>(async (values, event) => {
  const action = values.action;

  if (action === "accepted") {
    //TODO: aktivovat účet + změnit v databázi hodnotu done u requestu na true a přiřadit employeeResponsible
  } else {
    //TODO: poslat pacientovi e-mail s textem podle hodnoty v action ("invalidDocuments", "invalidData", "invalidPhoto")
    //TODO:  + změnit v databázi hodnotu done u requestu na true a přiřadit employeeResponsible
  }

  //console.log("values v formAction: ", values);
}, valiForm$(FormSchema));

export const NewAccountRequestListItemDetail = component$<NewAccountRequestListItemDetailProps>(
  ({ request, showRequestFullSig }) => {
    const [formStore, { Form }] = useForm<FormValues>({
      action: useSolveActivateAccountRequest(),
      loader: {
        value: {
          action: null,
          done: request.done,
          patientId: request.patientId,
          requestId: request.id,
        },
      },
      validate: valiForm$(FormSchema),
    });
    return (
      <div class="space-y-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="relative aspect-[3/2] w-full overflow-hidden">
            <img
              class="absolute inset-0 h-auto w-full rounded object-contain object-center shadow"
              height="400"
              src={request.idCardPhoto}
              width="600"
            />
          </div>
          <div class="relative aspect-[3/2] w-full overflow-hidden">
            <img
              class="absolute inset-0 h-auto w-full rounded object-contain object-center shadow"
              height="400"
              src={request.idCardPhotoBack}
              width="600"
            />
          </div>
        </div>
        <div class="flex items-center gap-4 text-app-text-base">
          <InfoIcon />
          Po odeslání aktivačního e-mailu bude pacient v aplikaci Salus vyzván ke kontrole osobních údajů.
        </div>
        <Form>
          <FieldHidden name="patientId" of={formStore} />
          <FieldHidden name="requestId" of={formStore} />
          <FieldHidden name="action" of={formStore} />
          <FieldHidden name="done" of={formStore} />
          <div class="flex flex-col gap-4 md:flex-row">
            <Button
              onClick$={() => {
                request.done = true;
                showRequestFullSig.value = false;
                setValue(formStore, "action", "invalidPhoto");
                setValue(formStore, "done", true);
                submit(formStore);
              }}
              severity="danger"
              type="submit"
              variant="outline"
            >
              <span class="flex items-center justify-center gap-2">
                <CloseInCircleIcon />
                <span> Nečitelné foto</span>
              </span>
            </Button>
            <Button
              onClick$={() => {
                request.done = true;
                showRequestFullSig.value = false;
                setValue(formStore, "action", "invalidData");
                setValue(formStore, "done", true);
                submit(formStore);
              }}
              severity="danger"
              type="submit"
              variant="outline"
            >
              <span class="flex items-center justify-center gap-2">
                <CloseInCircleIcon />
                <span>Nesprávné údaje</span>
              </span>
            </Button>
            <Button
              onClick$={() => {
                request.done = true;
                showRequestFullSig.value = false;
                setValue(formStore, "action", "invalidDocuments");
                setValue(formStore, "done", true);
                submit(formStore);
              }}
              severity="danger"
              type="submit"
              variant="outline"
            >
              <span class="flex items-center justify-center gap-2">
                <CloseInCircleIcon />
                <span>Neplatné doklady</span>
              </span>
            </Button>
            <Button
              class="md:ml-auto"
              onClick$={() => {
                request.done = true;
                showRequestFullSig.value = false;
                setValue(formStore, "action", "accepted");
                setValue(formStore, "done", true);
              }}
              severity="success"
              type="button"
              variant="outline"
            >
              <span class="flex items-center justify-center gap-2">
                <CheckedInCircleIcon />
                <span>Aktivovat účet</span>
              </span>
            </Button>
          </div>
        </Form>
      </div>
    );
  },
);
