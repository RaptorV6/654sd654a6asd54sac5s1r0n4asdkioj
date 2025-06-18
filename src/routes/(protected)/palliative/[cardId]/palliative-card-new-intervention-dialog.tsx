import {
  Button,
  Card,
  CardBody,
  dateOnlyISODateString,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  FieldCheckbox,
  FieldDate,
  FieldText,
  InputAdornmentText,
  useToaster,
} from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { reset, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { createNewIntervention } from "../palliative-functions";
import { usePalliativeCardContext, usePalliativeCardInterventionDialogsContext } from "./palliative-card-context";
import { palliativeCareThemes } from "./palliative-care-themes";

const InterventionFormSchema = v.object({
  attendedCaplan: v.boolean(),
  attendedDoctor: v.boolean(),
  attendedNurse: v.boolean(),
  attendedOther: v.string(),
  attendedPsychologist: v.boolean(),
  attendedSocialWorker: v.boolean(),
  balanceSheet: v.boolean(),
  bereavementCare: v.boolean(),
  careLimitation: v.boolean(),
  careTargets: v.boolean(),
  communicationSupport: v.boolean(),
  decisionMechanism: v.boolean(),
  expectations: v.boolean(),
  familyConference: v.boolean(),
  interventionAt: v.date("Zadejte datum intervence"),
  lengthMin: v.pipe(v.string(), v.regex(/^[\d,.]+$/, "Zadejte číselnou hodnotu v minutách")),
  other: v.string(),
  outsideCareCoordination: v.boolean(),
  perinatalCare: v.boolean(),
  phoneConsultation: v.boolean(),
  psychologicalSupportCaregiver: v.boolean(),
  psychologicalSupportPatient: v.boolean(),
  socialFinanceSupport: v.boolean(),
  spiritual: v.boolean(),
  symptoms: v.boolean(),
  terminalCarePatient: v.boolean(),
});
type InterventionFormValues = v.InferInput<typeof InterventionFormSchema>;

const initialValues = {
  value: {
    attendedCaplan: false,
    attendedDoctor: false,
    attendedNurse: false,
    attendedOther: "",
    attendedPsychologist: false,
    attendedSocialWorker: false,
    balanceSheet: false,
    bereavementCare: false,
    careLimitation: false,
    careTargets: false,
    communicationSupport: false,
    decisionMechanism: false,
    expectations: false,
    familyConference: false,
    interventionAt: new Date(),
    lengthMin: "",
    other: "",
    outsideCareCoordination: false,
    perinatalCare: false,
    phoneConsultation: false,
    psychologicalSupportCaregiver: false,
    psychologicalSupportPatient: false,
    socialFinanceSupport: false,
    spiritual: false,
    symptoms: false,
    terminalCarePatient: false,
  },
};

export const PalliativeCardNewInterventionDialog = component$(() => {
  const cardCtx = usePalliativeCardContext();
  const { openNewInterventionDialogSig } = usePalliativeCardInterventionDialogsContext();
  const { toastError$, toastSuccess$ } = useToaster();

  const [formStore, { Form }] = useForm<InterventionFormValues>({
    loader: initialValues,
    validate: valiForm$(InterventionFormSchema),
  });

  const navigate = useNavigate();

  return (
    <Dialog bind:show={openNewInterventionDialogSig} onClose$={() => navigate("./", { scroll: false })}>
      <DialogHeader>
        <h2>
          <span class="block">Nový záznam intervence</span>
          <span class="block pt-2">
            {cardCtx.card.patient === null ? (
              "neznámý pacient"
            ) : (
              <>
                {cardCtx.card.patient.fullName} (rč: {cardCtx.card.patient.birthRegistrationNumber ?? "nezadáno"})
              </>
            )}
          </span>
        </h2>
      </DialogHeader>
      <Form
        onSubmit$={async (values) => {
          const cardId = cardCtx.card.id || "";
          const r = await createNewIntervention({ ...values, cardId: cardId });
          if (r.success) {
            if (r.card) {
              cardCtx.card = r.card;
              reset(formStore);
            }
            await toastSuccess$("Intervence byla uložena.");
          } else {
            await toastError$("Chyba při vytváření intervence.");
          }
          openNewInterventionDialogSig.value = false;
        }}
      >
        <DialogBody class="form-styles mt-4">
          <Card>
            <CardBody class="form-grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <FieldDate
                label="Datum intervence"
                max={dateOnlyISODateString(new Date())}
                name="interventionAt"
                of={formStore}
                required={true}
              />

              <FieldText
                adornmentEnd={<InputAdornmentText>min</InputAdornmentText>}
                inputType="text"
                label="Délka trvání intervence"
                name="lengthMin"
                of={formStore}
                required={true}
              />
            </CardBody>
          </Card>

          <Card class="mt-4">
            <CardBody class="form-grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              {Object.entries(palliativeCareThemes).map(([key, label]) => (
                <FieldCheckbox
                  key={key}
                  label={label}
                  name={key as keyof InterventionFormValues}
                  of={formStore}
                  required={false}
                />
              ))}
              {Object.keys(palliativeCareThemes).length % 2 && <div />}
            </CardBody>
          </Card>

          <Card class="mt-4 sm:col-span-2">
            <CardBody>
              <p class="text-sm font-bold text-app-text-weak">Intervenující profese</p>
              <div class="mt-4 flex items-start gap-4">
                <FieldCheckbox label="Sestra" name="attendedNurse" of={formStore} required={false} />
                <FieldCheckbox class="!mt-0" label="Lékař" name="attendedDoctor" of={formStore} required={false} />
                <FieldCheckbox
                  class="!mt-0"
                  label="Sociální pracovník"
                  name="attendedSocialWorker"
                  of={formStore}
                  required={false}
                />
                <FieldCheckbox
                  class="!mt-0"
                  label="Kaplan/spirituální asistent"
                  name="attendedCaplan"
                  of={formStore}
                  required={false}
                />
                <FieldCheckbox
                  class="!mt-0"
                  label="Psycholog"
                  name="attendedPsychologist"
                  of={formStore}
                  required={false}
                />
              </div>
              <FieldText inputType="text" label="Jiná profese" name="attendedOther" of={formStore} required={false} />
            </CardBody>
          </Card>

          <FieldText
            class="sm:col-span-2"
            inputType="textarea"
            label="Jiné"
            name="other"
            of={formStore}
            required={false}
          />
        </DialogBody>
        <DialogFooter>
          <Button disabled={formStore.submitting} severity="accent" type="submit">
            Uložit
          </Button>
        </DialogFooter>
      </Form>
    </Dialog>
  );
});
