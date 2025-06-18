import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  FieldRadioSelect,
  FieldText,
  PreviewText,
  StatusIndicator,
} from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { useFormInitialData, usePreviewData } from "./new-application-form-create-loaders";

// --- VALIDACE FORMULÁŘE ---
const baseSchema = v.object({
  alergie: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie")),
  alergie_kontrast: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie na kontrastní látku")),
  anamneza: v.string(),
  anestezie_pri_vysetreni: v.string(),
  bydliste: v.string(),
  cp: v.string(),
  dg: v.pipe(v.string(), v.minLength(1, "Vyplňte diagnózu")),
  duvod_neprovedeni: v.pipe(v.string(), v.minLength(1, "Vyberte důvod")),
  duvod_pozadavku: v.string(),
  epikriza: v.pipe(v.string(), v.minLength(1, "Vyplňte epikrízu")),
  handicap: v.string(),
  jmeno: v.string(),
  jmeno_zadatel: v.string(),
  nalehavost: v.string(),
  nepodepsano: v.string(),
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

export const NewApplicationFormCreateForm = component$(() => {
  const previewData = usePreviewData().value;
  const selectedRequest = useSignal<null | Request>(null);
  const initialValuesSig = useFormInitialData();
  const showPatient = useSignal(false);
  const showZadavatel = useSignal(false);
  const showPrijemce = useSignal(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formStore, { Form }] = useForm<FormInput>({
    loader: initialValuesSig,
    validate: valiForm$(FormSchema),
  });
  const perFormState = useSignal<Record<string, FormInput>>({});

  const showDialog = useSignal<boolean>(false);

  const requestHistory = [
    { date: "00:00:00", type: "00:00:00", wait: "Čeká" },
    { date: "00:00:00", type: "00:00:00", wait: "Nečeká" },
  ];

  const activeFormType = useSignal<null | string>(null);
  const formMode = useSignal<"copy" | "new" | "view" | null>(null);

  const sortedRequestHistory = requestHistory
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date.split(".").reverse().join("-")).getTime() -
        new Date(a.date.split(".").reverse().join("-")).getTime(),
    );

  const dummyRequests: Request[] = [
    { birthRegistrationNumber: "123456/7890", hospitalized: "ANO", id: 1, urgency: "Statim" },
    { birthRegistrationNumber: "123456/7890", hospitalized: "NE", id: 1, urgency: "Statim" },
  ];

  interface Request {
    birthRegistrationNumber: string;
    hospitalized: string;
    id: number;
    urgency: "Rutina" | "Statim";
  }

  const emptyFormValues: FormInput = {
    alergie: "",
    alergie_kontrast: "",
    anamneza: "",
    anestezie_pri_vysetreni: "",
    bydliste: "",
    cp: "",
    dg: "",
    duvod_neprovedeni: "",
    duvod_pozadavku: "",
    epikriza: "",
    handicap: "",
    jmeno: "",
    jmeno_zadatel: "",
    nalehavost: "",
    nepodepsano: "neomluvil",
    ocekavany_prinos: "",
    odbornost: "",
    oddeleni: "",
    oddeleni_prijemce: "",
    rc: "",
    sdeleni: "",
    specialni_pozadavek: "",
    stat: "",
    telefon: "",
    telefon_zadatel: "",
    vaha: "",
    vyska: "",
    zadane_vysetreni: "",
    zp: "",
    zz: "",
    zz_prijemce: "",
  };

  useTask$(({ track }) => {
    track(() => formMode.value);
    track(() => activeFormType.value);

    if (formMode.value === "new" && activeFormType.value) {
      perFormState.value[activeFormType.value] = { ...emptyFormValues };
      for (const key of Object.keys(emptyFormValues) as (keyof FormInput)[]) {
        setValue(formStore, key, "");
      }
    }

    if (formMode.value === "copy" && activeFormType.value) {
      const values = perFormState.value[activeFormType.value] || emptyFormValues;
      for (const key of Object.keys(values) as (keyof FormInput)[]) {
        setValue(formStore, key, values[key]);
      }
    }
  });

  return (
    <Form class="form-styles">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-[400px_1fr]">
        <div class="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardHeaderTitle>Plánované výkony</CardHeaderTitle>
            </CardHeader>
            <CardBody class="divide-y divide-gray-200 text-sm">
              {sortedRequestHistory.map(({ date, type, wait }, i) => {
                const req = dummyRequests[i];
                return (
                  <div class="py-4" key={i}>
                    <div class="grid grid-cols-4 items-center gap-4">
                      <div class="flex items-center gap-2">
                        <StatusIndicator
                          pulse={req.urgency === "Statim"}
                          severity={req.urgency === "Statim" ? "danger" : "none"}
                          title={req.urgency}
                        />
                        <span class="text-sm font-medium">{req.urgency}</span>
                      </div>
                      <div>
                        <div class="text-muted-foreground text-sm font-medium">Stav:</div>
                        <div class="text-base">{wait}</div>
                      </div>
                      <div>
                        <div class="text-muted-foreground text-sm font-medium">Čas:</div>
                        <div class="text-base">{type}</div>
                      </div>
                      <div>
                        <div class="text-muted-foreground text-sm font-medium">Trvání:</div>
                        <div class="text-base">{date}</div>
                      </div>
                    </div>
                    <Button
                      class="w-full"
                      onClick$={() => {
                        formMode.value = "view";
                        selectedRequest.value = req;
                      }}
                      severity="accent"
                      size="sm"
                      title="Zobrazit detail"
                      type="button"
                    >
                      Zobrazit žádanku
                    </Button>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </div>

        <Card class="flex w-full flex-col">
          <CardHeader>
            <CardHeaderTitle>
              Detail žádanky
              {selectedRequest.value && (
                <span class="ml-2 text-sm font-normal text-gray-500">
                  Hospitalizovaný - {selectedRequest.value.hospitalized}
                </span>
              )}
            </CardHeaderTitle>
          </CardHeader>
          <CardBody class="flex-grow space-y-4">
            {!selectedRequest.value && (
              <div class="text-muted-foreground text-center text-sm italic">Založte žádanku</div>
            )}
            {selectedRequest.value && (
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
                                ? "M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                                : "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
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
                      {formMode.value === "view" ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <FieldText
                            inputType="text"
                            label="Anestezie při vyšetření"
                            name="anestezie_pri_vysetreni"
                            of={formStore}
                          />
                          <FieldText inputType="text" label="Důvod požadavku" name="duvod_pozadavku" of={formStore} />
                          <FieldText inputType="text" label="Naléhavost" name="nalehavost" of={formStore} />
                          <FieldText inputType="text" label="Očekávaný přínos" name="ocekavany_prinos" of={formStore} />
                          <FieldText inputType="text" label="Sdělení" name="sdeleni" of={formStore} />
                          <FieldText
                            inputType="text"
                            label="Speciální požadavek"
                            name="specialni_pozadavek"
                            of={formStore}
                          />
                          <FieldText inputType="text" label="Žádané vyšetření" name="zadane_vysetreni" of={formStore} />
                        </>
                      )}
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Zdravotní informace</CardHeaderTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="grid grid-cols-1 items-baseline gap-x-6 md:grid-cols-2">
                      {formMode.value === "view" ? (
                        <>
                          <PreviewText label="Alergie" value={previewData.zz.Alergie} />
                          <PreviewText label="Alergie na kontrastní látku" value={previewData.zz.Alergie_kontrast} />
                          <PreviewText label="Anamnéza" value={previewData.zz.Anamneza} />
                          <PreviewText label="DG" value={previewData.zz.Dg} />
                          <PreviewText label="Epikríza" value={previewData.zz.Epikriza} />
                          <PreviewText label="Handicap" value={previewData.zz.Handicap} />
                          <PreviewText label="Váha" value={previewData.zz.Vaha} />
                          <PreviewText label="Výška" value={previewData.zz.Vyska} />
                        </>
                      ) : (
                        <>
                          <FieldText inputType="text" label="Alergie" name="alergie" of={formStore} />
                          <FieldText
                            inputType="text"
                            label="Alergie na kontrastní látku"
                            name="alergie_kontrast"
                            of={formStore}
                          />
                          <FieldText inputType="text" label="Anamnéza" name="anamneza" of={formStore} />
                          <FieldText inputType="text" label="DG" name="dg" of={formStore} />
                          <FieldText inputType="text" label="Epikríza" name="epikriza" of={formStore} />
                          <FieldText inputType="text" label="Handicap" name="handicap" of={formStore} />
                          <FieldText inputType="text" label="Váha" name="vaha" of={formStore} />
                          <FieldText inputType="text" label="Výška" name="vyska" of={formStore} />
                        </>
                      )}
                    </div>
                  </CardBody>
                </Card>

                <div class="flex gap-2">
                  <Button class="flex-1" onClick$={() => {}} severity="accent" type="submit" variant="contained">
                    Provedeno
                  </Button>
                  <Button
                    class="flex-1 bg-gray-500 hover:bg-gray-600"
                    onClick$={() => (showDialog.value = true)}
                    severity="accent"
                    type="button"
                    variant="contained"
                  >
                    Neprovedeno
                  </Button>
                  <Dialog bind:show={showDialog}>
                    <DialogHeader>Důvod neprovedení</DialogHeader>
                    <DialogBody>
                      <div class="flex flex-col gap-2">
                        <FieldRadioSelect
                          class="w-1/2"
                          label="Vyberte důvod"
                          name="nepodepsano"
                          of={formStore}
                          options={[
                            { label: "Pacient nepřišel a neomluvil se", value: "neomluvil" },
                            { label: "Pacient nepřišel a omluvil se", value: "omluvil" },
                            { label: "Vyšetření zrušeno pacientem", value: "zruseno" },
                            { label: "Vyšetření zrušeno námi", value: "zruseno-nami" },
                            { label: "Zrušeno z technických důvodů", value: "zruseno-technicky" },
                          ]}
                        />
                      </div>
                    </DialogBody>

                    <DialogFooter class="flex justify-end space-x-2">
                      <Button
                        onClick$={() => {
                          showDialog.value = false;
                        }}
                        severity="none"
                        type="button"
                        variant="contained"
                      >
                        Zrušit
                      </Button>
                      <Button
                        onClick$={() => {
                          showDialog.value = false;
                        }}
                        severity="accent"
                        type="submit"
                        variant="contained"
                      >
                        Uložit a zavřít
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </Form>
  );
});
