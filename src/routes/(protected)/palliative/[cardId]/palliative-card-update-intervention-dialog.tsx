import {
  Button,
  Card,
  CardBody,
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
import { component$, useComputed$, useTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
// eslint-disable-next-line perfectionist/sort-imports
import { reset, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import type { PalliativeCardInterventionForDisplay } from "../palliative-cards-rpc";

import { updateIntervention } from "../palliative-functions";
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
  lengthMin: v.pipe(v.string(), v.regex(/^\d+([.,]\d+)?$/, "Zadejte číselnou hodnotu v minutách")),
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

export const PalliativeCardUpdateInterventionDialog = component$(() => {
  const { selectedInterventionIdSig } = usePalliativeCardInterventionDialogsContext();

  // dialog se otevře, až když je načtené id intervence, tj. na klientovi, aby byla k dispozici data intervence
  const openInterventionUpdateDialogSig = useComputed$(() => !!selectedInterventionIdSig.value);

  /*
    //když chceme dialog zavřít, musíme vynulovat interventionId.value
    //zbytečný useTask? Dá se to udělat v onSubmit?
    useTask$(({ track }) => {
      const x = track(() => openInterventionUpdateDialogSig.value);

      if (x == false && interventionId.value) {
        interventionId.value = null;
      }
    });
*/

  const cardCtx = usePalliativeCardContext();
  const { toastError$, toastSuccess$ } = useToaster();
  const navigate = useNavigate();

  const [formStore, { Form }] = useForm<InterventionFormValues>({
    loader: {
      value: getInitialValues(
        cardCtx.card.interventions?.find((intervention) => intervention.id === selectedInterventionIdSig.value),
      ),
    },
    validate: valiForm$(InterventionFormSchema),
  });

  useTask$(({ track }) => {
    const id = track(() => selectedInterventionIdSig.value);
    // až když je k dispozici id intervence (na klientovi), tak se načtou správné inital values z dané intervence
    if (id && cardCtx.card.interventions) {
      const intervention = cardCtx.card.interventions.find((intervention) => intervention.id === id);
      if (intervention) {
        // a reset je nastaví do formuláře
        reset(formStore, { initialValues: getInitialValues(intervention) });
      }
    }
  });

  return (
    <Dialog bind:show={openInterventionUpdateDialogSig} onClose$={() => navigate("./", { scroll: false })}>
      <DialogHeader>
        <h2>
          <span class="block">Úprava paliativní intervence</span>
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
          if (selectedInterventionIdSig.value) {
            const r = await updateIntervention({ ...values, id: selectedInterventionIdSig.value });
            if (r.success) {
              if (r.card) {
                cardCtx.card = r.card;
                reset(formStore, {
                  initialValues: getInitialValues(
                    r.card.interventions?.find((i) => i.id === selectedInterventionIdSig.value),
                  ),
                });
                selectedInterventionIdSig.value = null;
              }
              await toastSuccess$("Změna byla uložena.");
            } else {
              await toastError$("Chyba při úpravě intervence.");
            }
            openInterventionUpdateDialogSig.value = false;
          } else {
            console.error("Chyba při úpravě intervence, chybí id karty.");
            await toastError$("Chyba při úpravě intervence.");
          }
        }}
      >
        <DialogBody class="form-styles mt-4">
          <Card>
            <CardBody class="form-grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <FieldDate label="Datum intervence" name="interventionAt" of={formStore} required={true} />

              <FieldText
                adornmentEnd={<InputAdornmentText>min</InputAdornmentText>}
                class={"sm:!mt-0"}
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
            Uložit upravenou intervenci
          </Button>
        </DialogFooter>
      </Form>
    </Dialog>
  );
});

// funkce na nastavení initial values vybrané intervence
function getInitialValues(intervention: PalliativeCardInterventionForDisplay | undefined) {
  return {
    attendedCaplan: intervention?.attendedCaplan ?? false,
    attendedDoctor: intervention?.attendedDoctor ?? false,
    attendedNurse: intervention?.attendedNurse ?? false,
    attendedOther: intervention?.attendedOther ?? "",
    attendedPsychologist: intervention?.attendedPsychologist ?? false,
    attendedSocialWorker: intervention?.attendedSocialWorker ?? false,
    balanceSheet: intervention?.balanceSheet ?? false,
    bereavementCare: intervention?.bereavementCare ?? false,
    careLimitation: intervention?.careLimitation ?? false,
    careTargets: intervention?.careTargets ?? false,
    communicationSupport: intervention?.communicationSupport ?? false,
    decisionMechanism: intervention?.decisionMechanism ?? false,
    expectations: intervention?.expectations ?? false,
    familyConference: intervention?.familyConference ?? false,
    interventionAt: intervention?.interventionAt ? new Date(intervention.interventionAt) : new Date(),
    lengthMin: intervention?.lengthMin ?? "-1",
    other: intervention?.other ?? "",
    outsideCareCoordination: intervention?.outsideCareCoordination ?? false,
    perinatalCare: intervention?.perinatalCare ?? false,
    phoneConsultation: intervention?.phoneConsultation ?? false,
    psychologicalSupportCaregiver: intervention?.psychologicalSupportCaregiver ?? false,
    psychologicalSupportPatient: intervention?.psychologicalSupportPatient ?? false,
    socialFinanceSupport: intervention?.socialFinanceSupport ?? false,
    spiritual: intervention?.spiritual ?? false,
    symptoms: intervention?.symptoms ?? false,
    terminalCarePatient: intervention?.terminalCarePatient ?? false,
  };
}
