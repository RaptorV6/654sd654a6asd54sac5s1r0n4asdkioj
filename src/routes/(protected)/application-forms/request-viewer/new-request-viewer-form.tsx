import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  CopyToClipboardButton,
  InputRadioButtons,
  PreviewText,
} from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";

import { useFormInitialData, usePreviewData } from "./_loaders";

// --- VALIDACE FORMULÁŘE ---
const baseSchema = v.object({
  alergie: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie")),
  alergie_kontrast: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie na kontrastní látku")),
  anamneza: v.string(),
  anestezie_pri_vysetreni: v.string(),
  bydliste: v.string(),
  cp: v.string(),
  dg: v.pipe(v.string(), v.minLength(1, "Vyplňte diagnózu")),
  duvod_pozadavku: v.string(),
  epikriza: v.pipe(v.string(), v.minLength(1, "Vyplňte epikrízu")),
  handicap: v.string(),
  jmeno: v.string(),
  jmeno_zadatel: v.string(),
  nalehavost: v.string(),

  ocekavany_prinos: v.string(),
  odbornost: v.string(),
  oddeleni: v.string(),
  oddeleni_prijemce: v.string(),
  rc: v.string(),
  sdeleni: v.string(),
  specialni_pozadavek: v.string(),
  stat: v.string(),

  telefon: v.string(),
  telefon_zadatel: v.string(),
  vaha: v.string(),
  vyska: v.string(),
  zadane_vysetreni: v.string(),
  zp: v.string(),

  zz: v.string(),
  zz_prijemce: v.string(),
});

export const FormSchema = v.intersect([baseSchema]);

export type FormInput = v.InferInput<typeof FormSchema>;
export type FormOutput = v.InferOutput<typeof FormSchema>;

// --- FORMULÁŘOVÁ KOMPONENTA ---
export const NewRequestViewerForm = component$(() => {
  const previewData = usePreviewData().value;
  const selectedRequest = useSignal<null | Request>(null);
  const showDialog = useSignal(false);
  const initialValuesSig = useFormInitialData();
  const showPatient = useSignal(false);
  const showZadavatel = useSignal(false);
  const showPrijemce = useSignal(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formStore, { Form }] = useForm<FormInput>({
    loader: initialValuesSig,
    validate: valiForm$(FormSchema),
  });

  const dummyRequests: Request[] = [
    { birthRegistrationNumber: "123456/7890", fullName: "Jan Novák", id: 1, urgency: "Statim" },
    { birthRegistrationNumber: "987654/3210", fullName: "Petra Dvořáková", id: 2, urgency: "Rutina" },
  ];

  interface Request {
    birthRegistrationNumber: string;
    fullName: string;
    id: number;
    urgency: "Rutina" | "Statim";
  }

  return (
    <Form class="form-styles">
      <div class="flex flex-col gap-6 md:flex-row">
        <Card class="flex w-full flex-col md:w-1/2">
          <CardHeader>
            <CardHeaderTitle>K popsání</CardHeaderTitle>
          </CardHeader>
          <CardBody class="flex-grow space-y-4">
            {dummyRequests.map((req) => (
              <div
                class="flex flex-col gap-4 border-b pb-4 text-sm md:grid md:grid-cols-3 md:items-center md:gap-x-4"
                key={req.id}
              >
                {/* Levý sloupec: Jméno a RČ + kopírování */}
                <div>
                  <PreviewText label="Jméno a příjmení:" value={req.fullName} />
                  <div class="flex items-end gap-2">
                    <div class="mt-1 flex-1">
                      <PreviewText label="Rodné číslo:" value={req.birthRegistrationNumber} />
                    </div>
                    <CopyToClipboardButton text={req.birthRegistrationNumber} />
                  </div>
                </div>

                <div class="flex items-center justify-center">
                  <InputRadioButtons
                    error=""
                    label="Naléhavost"
                    name={`urgency-${req.id}`}
                    options={[{ label: req.urgency, value: req.urgency }]}
                    value={req.urgency}
                  />
                </div>

                {/* Pravý sloupec: tlačítko */}
                <div class="text-center md:text-right">
                  <Button onClick$={() => (selectedRequest.value = req)} size="sm" type="button">
                    Zobrazit žádanku →
                  </Button>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card class="flex w-full flex-col md:w-1/2">
          <CardHeader>
            <CardHeaderTitle>
              Žádanka
              {selectedRequest.value && (
                <span class="ml-2 text-sm font-normal text-gray-500">
                  {selectedRequest.value.fullName} - {selectedRequest.value.birthRegistrationNumber}
                </span>
              )}
            </CardHeaderTitle>
          </CardHeader>
          <CardBody class="flex-grow space-y-4">
            {selectedRequest.value ? (
              <>
                <Card>
                  <CardHeader class="cursor-pointer" onClick$={() => (showPatient.value = !showPatient.value)}>
                    <CardHeaderTitle>
                      <div class="flex w-full items-center justify-between">
                        <span>Pacient</span>
                        <svg
                          class="h-4 w-4 transition-transform duration-200"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d={
                              showPatient.value
                                ? "M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" // nahoru
                                : "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" // dolů
                            }
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </CardHeaderTitle>
                  </CardHeader>

                  {showPatient.value && (
                    <CardBody>
                      <div class="grid grid-cols-1 items-baseline gap-x-6 md:grid-cols-2">
                        <PreviewText label="Jméno a příjmení" value={previewData.pacient.jmeno} />
                        <PreviewText label="Rodné číslo" value={previewData.pacient.rc} />
                        <PreviewText label="Bydliště" value={previewData.pacient.bydliste} />
                        <PreviewText label="Stát" value={previewData.pacient.stat} />
                        <PreviewText label="Číslo pojištěnce" value={previewData.pacient.cp} />
                        <PreviewText label="Zdravotní pojišťovna" value={previewData.pacient.zp} />
                        <PreviewText label="Telefonní číslo" value={previewData.pacient.telefon} />
                      </div>
                    </CardBody>
                  )}
                </Card>

                <Card>
                  <CardHeader class="cursor-pointer" onClick$={() => (showZadavatel.value = !showZadavatel.value)}>
                    <CardHeaderTitle>
                      <div class="flex w-full items-center justify-between">
                        <span>Žadatel</span>
                        <svg
                          class="h-4 w-4 transition-transform duration-200"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d={
                              showZadavatel.value
                                ? "M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" // nahoru
                                : "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" // dolů
                            }
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </CardHeaderTitle>
                  </CardHeader>

                  {showZadavatel.value && (
                    <CardBody>
                      <div class="grid grid-cols-1 items-baseline gap-x-6 md:grid-cols-2">
                        <PreviewText label="Jméno a příjmení" value={previewData.zadatel.jmeno_zadatel} />
                        <PreviewText label="Telefonní číslo" value={previewData.zadatel.telefon_zadatel} />
                        <PreviewText label="Zdravotnické zařízení" value={previewData.zadatel.zz} />
                        <PreviewText label="Oddělení" value={previewData.zadatel.oddeleni} />
                        <PreviewText label="Odbornost" value={previewData.zadatel.odbornost} />
                      </div>
                    </CardBody>
                  )}
                </Card>

                <Card>
                  <CardHeader class="cursor-pointer" onClick$={() => (showPrijemce.value = !showPrijemce.value)}>
                    <CardHeaderTitle>
                      <div class="flex w-full items-center justify-between">
                        <span>Příjemce</span>
                        <svg
                          class="h-4 w-4 transition-transform duration-200"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d={
                              showPrijemce.value
                                ? "M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" // nahoru
                                : "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" // dolů
                            }
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </CardHeaderTitle>
                  </CardHeader>

                  {showPrijemce.value && (
                    <CardBody>
                      <div class="grid grid-cols-1 items-baseline gap-x-6 md:grid-cols-2">
                        <PreviewText label="Zdravotnické zařízení" value={previewData.prijemce.zz_prijemce} />
                        <PreviewText label="Oddělení" value={previewData.prijemce.oddeleni_prijemce} />
                      </div>
                    </CardBody>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Požaduje</CardHeaderTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="grid grid-cols-1 items-baseline gap-x-6 md:grid-cols-2">
                      <PreviewText
                        label="Anestezie při vyšetření"
                        value={previewData.pozaduje.Anestezie_pri_vysetreni}
                      />
                      <PreviewText label="Důvod požadavku" value={previewData.pozaduje.Duvod_pozadavku} />
                      <PreviewText label="Naléhavost" value={previewData.pozaduje.Nalehavost} />
                      <PreviewText label="Očekávaný přínos" value={previewData.pozaduje.Ocekavany_prinos} />
                      <PreviewText label="Sdělení" value={previewData.pozaduje.Sdeleni} />
                      <PreviewText label="Speciální požadavek" value={previewData.pozaduje.Specialni_pozadavek} />
                      <PreviewText label="Žádané vyšetření" value={previewData.pozaduje.Zadane_vysetreni} />
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Zdravotní informace</CardHeaderTitle>
                  </CardHeader>
                  <CardBody>
                    <PreviewText label="Alergie" value={previewData.zz.Alergie} />
                    <PreviewText label="Alergie na kontrastní látku" value={previewData.zz.Alergie_kontrast} />
                    <PreviewText label="Anamnéza" value={previewData.zz.Anamneza} />
                    <PreviewText label="DG" value={previewData.zz.Dg} />
                    <PreviewText label="Epikríza" value={previewData.zz.Epikriza} />
                    <PreviewText label="Handicap" value={previewData.zz.Handicap} />
                    <PreviewText label="Váha" value={previewData.zz.Vaha} />
                    <PreviewText label="Výška" value={previewData.zz.Vyska}></PreviewText>
                  </CardBody>
                </Card>

                <div class="grid grid-cols-2 gap-4">
                  <ButtonWithConfirmation
                    class="w-full"
                    dialogActionCancelLabel="Ne"
                    dialogActionConfirmLabel="Ano"
                    dialogAlertText=""
                    dialogTitle="Přejete si dokončit popis?"
                    onClick$={() => {
                      const index = dummyRequests.findIndex((r) => r.id === selectedRequest.value?.id);
                      if (index !== -1) dummyRequests.splice(index, 1);
                      selectedRequest.value = null;
                      showDialog.value = false;
                    }}
                    severity="accent"
                    variant="contained"
                  >
                    Popsáno
                  </ButtonWithConfirmation>

                  <ButtonWithConfirmation
                    class="w-full bg-gray-500 hover:!bg-gray-600"
                    dialogActionCancelLabel="Ne"
                    dialogActionConfirmLabel="Ano"
                    dialogAlertText=""
                    dialogTitle="Ukončit popis?"
                    onClick$={() => {
                      const index = dummyRequests.findIndex((r) => r.id === selectedRequest.value?.id);
                      if (index !== -1) dummyRequests.splice(index, 1);
                      selectedRequest.value = null;
                      showDialog.value = false;
                    }}
                    severity="accent"
                    variant="contained"
                  >
                    Nebudu popisovat
                  </ButtonWithConfirmation>
                </div>
              </>
            ) : (
              <div class="text-center text-gray-400">Vyberte žádanku vlevo</div>
            )}
          </CardBody>
        </Card>
      </div>
    </Form>
  );
});
