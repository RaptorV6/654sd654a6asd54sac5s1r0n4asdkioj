import { Button, Card, CardBody, CardHeader, CardHeaderTitle, FieldText, PreviewText } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { useFormInitialData, usePreviewData } from "./new-application-form-create-loaders";

// --- VALIDACE FORMULÁŘE ---
const baseSchema = v.object({
  alergie: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie")),
  alergie_kontrast: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie na kontrastní látku")),
  alergie_kontrast2: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie na kontrastní látku")),
  alergie2: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie")),
  anamneza: v.string(),
  anamneza2: v.string(),
  anestezie_pri_vysetreni: v.string(),
  anestezie_pri_vysetreni2: v.string(),
  bydliste: v.string(),
  cp: v.string(),
  dg: v.pipe(v.string(), v.minLength(1, "Vyplňte diagnózu")),
  dg2: v.pipe(v.string(), v.minLength(1, "Vyplňte diagnózu")),
  duvod_pozadavku: v.string(),
  duvod_pozadavku2: v.string(),
  epikriza: v.pipe(v.string(), v.minLength(1, "Vyplňte epikrízu")),
  epikriza2: v.pipe(v.string(), v.minLength(1, "Vyplňte epikrízu")),
  handicap: v.string(),
  handicap2: v.string(),
  jmeno: v.string(),
  jmeno_zadatel: v.string(),
  nalehavost: v.string(),
  nalehavost2: v.string(),
  ocekavany_prinos: v.string(),
  ocekavany_prinos2: v.string(),
  odbornost: v.string(),
  oddeleni: v.string(),
  oddeleni_prijemce: v.string(),
  rc: v.string(),
  sdeleni: v.string(),
  sdeleni2: v.string(),
  specialni_pozadavek: v.string(),
  specialni_pozadavek2: v.string(),
  stat: v.string(),
  telefon: v.string(),
  telefon_zadatel: v.string(),
  vaha: v.string(),
  vaha2: v.string(),
  vyska: v.string(),
  vyska2: v.string(),
  zadane_vysetreni: v.string(),
  zadane_vysetreni2: v.string(),
  zp: v.string(),
  zz: v.string(),
  zz_prijemce: v.string(),
});

export const FormSchema = v.intersect([baseSchema]);

export type FormInput = v.InferInput<typeof FormSchema>;
export type FormOutput = v.InferOutput<typeof FormSchema>;

// --- FORMULÁŘOVÁ KOMPONENTA ---
export const NewApplicationFormCreateForm = component$(() => {
  const previewData = usePreviewData().value;
  const selectedRequest = useSignal<null | Request>(null);
  const initialValuesSig = useFormInitialData();
  const showPatient = useSignal(false);
  const showZadavatel = useSignal(false);
  const showPrijemce = useSignal(false);

  const [formStore, { Form }] = useForm<FormInput>({
    loader: initialValuesSig,
    validate: valiForm$(FormSchema),
  });
  // const perFormState = useSignal<Record<string, FormInput>>({});

  const requestHistory = [
    { date: "25.04.2025", type: "CT" },
    { date: "24.04.2025", type: "RTG" },
    { date: "30.04.2025", type: "MRI" },
    { date: "08.04.2025", type: "UZ" },
    { date: "21.04.2025", type: "CT" },
    { date: "19.04.2025", type: "CT" },
    { date: "24.04.2025", type: "RTG" },
    { date: "23.04.2025", type: "MRI" },
    { date: "22.04.2025", type: "UZ" },
    { date: "01.04.2025", type: "CT" },
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
    { birthRegistrationNumber: "123456/7890", fullName: "Jan Novák", id: 1, urgency: "Statim" },
    { birthRegistrationNumber: "987654/3210", fullName: "Petra Dvořáková", id: 2, urgency: "Rutina" },
  ];

  interface Request {
    birthRegistrationNumber: string;
    fullName: string;
    id: number;
    urgency: "Rutina" | "Statim";
  }

  const emptyFormValues: FormInput = {
    alergie: "",
    alergie_kontrast: "",
    alergie_kontrast2: "",
    alergie2: "",
    anamneza: "",
    anamneza2: "",
    anestezie_pri_vysetreni: "",
    anestezie_pri_vysetreni2: "",
    bydliste: "",
    cp: "",
    dg: "",
    dg2: "",
    duvod_pozadavku: "",
    duvod_pozadavku2: "",
    epikriza: "",
    epikriza2: "",
    handicap: "",
    handicap2: "",
    jmeno: "",
    jmeno_zadatel: "",
    nalehavost: "",
    nalehavost2: "",
    ocekavany_prinos: "",
    ocekavany_prinos2: "",
    odbornost: "",
    oddeleni: "",
    oddeleni_prijemce: "",
    rc: "",
    sdeleni: "",
    sdeleni2: "",
    specialni_pozadavek: "",
    specialni_pozadavek2: "",
    stat: "",
    telefon: "",
    telefon_zadatel: "",
    vaha: "",
    vaha2: "",
    vyska: "",
    vyska2: "",
    zadane_vysetreni: "",
    zadane_vysetreni2: "",
    zp: "",
    zz: "",
    zz_prijemce: "",
  };

  useTask$(({ track }) => {
    track(() => formMode.value);
    track(() => activeFormType.value);

    if (formMode.value === "new" && activeFormType.value) {
      // initialize all fields to empty so that 2ka variants are blank
      for (const key of Object.keys(emptyFormValues) as (keyof FormInput)[]) {
        setValue(formStore, key, "");
      }
    }

    if (formMode.value === "copy" && selectedRequest.value) {
      // Load existing record data from previewData into formStore
      const values: FormInput = {
        alergie: previewData.zz.Alergie,
        alergie_kontrast: previewData.zz.Alergie_kontrast,
        alergie_kontrast2: "",
        alergie2: "",
        anamneza: previewData.zz.Anamneza,
        anamneza2: "",
        anestezie_pri_vysetreni: previewData.pozaduje.Anestezie_pri_vysetreni,
        anestezie_pri_vysetreni2: "",
        bydliste: previewData.pacient.bydliste,
        cp: previewData.pacient.cp,
        dg: previewData.zz.Dg,
        dg2: "",
        duvod_pozadavku: previewData.pozaduje.Duvod_pozadavku,
        duvod_pozadavku2: "",
        epikriza: previewData.zz.Epikriza,
        epikriza2: "",
        handicap: previewData.zz.Handicap,
        handicap2: "",
        jmeno: previewData.pacient.jmeno,
        jmeno_zadatel: previewData.zadatel.jmeno_zadatel,
        nalehavost: previewData.pozaduje.Nalehavost,
        nalehavost2: "",
        ocekavany_prinos: previewData.pozaduje.Ocekavany_prinos,
        ocekavany_prinos2: "",
        odbornost: previewData.zadatel.odbornost,
        oddeleni: previewData.zadatel.oddeleni,
        oddeleni_prijemce: previewData.prijemce.oddeleni_prijemce,
        rc: previewData.pacient.rc,
        sdeleni: previewData.pozaduje.Sdeleni,
        sdeleni2: "",
        specialni_pozadavek: previewData.pozaduje.Specialni_pozadavek,
        specialni_pozadavek2: "",
        stat: previewData.pacient.stat,
        telefon: previewData.pacient.telefon,
        telefon_zadatel: previewData.zadatel.telefon_zadatel,
        vaha: previewData.zz.Vaha,
        vaha2: "",
        vyska: previewData.zz.Vyska,
        vyska2: "",
        zadane_vysetreni: previewData.pozaduje.Zadane_vysetreni,
        zadane_vysetreni2: "",
        zp: previewData.pacient.zp,
        zz: previewData.zadatel.zz,
        zz_prijemce: previewData.prijemce.zz_prijemce,
      };
      for (const key of Object.keys(values) as (keyof FormInput)[]) {
        setValue(formStore, key, values[key]);
      }
    }
  });

  return (
    <Form class="form-styles">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-[400px_1fr]">
        {/* Levý sloupec (menší boxy pod sebou) */}
        <div class="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardHeaderTitle>Vyberte typ žádanky</CardHeaderTitle>
            </CardHeader>
            <CardBody class="divide-y text-sm">
              {["CT", "RTG", "MRI", "UZ"].map((type) => (
                <div class="grid grid-cols-[80px_1fr_auto_auto] items-center gap-4 py-3" key={type}>
                  <div class="text-muted-foreground text-base font-medium">{type}</div>

                  <div>
                    <Button
                      class="w-full shadow-sm md:w-auto"
                      onClick$={() => {
                        formMode.value = "new";
                        activeFormType.value = type;
                        selectedRequest.value = {
                          birthRegistrationNumber: "------/----",
                          fullName: "Nový pacient",
                          id: Date.now(), // nebo jiné ID
                          urgency: "Rutina", // defaultní hodnota
                        };
                      }}
                      size="sm"
                      title="Kliknutím vytvoříte novou žádanku"
                      type="button"
                    >
                      Nový
                    </Button>
                  </div>

                  {activeFormType.value === type && (
                    <div>
                      <Button
                        class="w-full shadow-sm md:w-auto"
                        onClick$={() => {
                          formMode.value = "copy";
                          selectedRequest.value = dummyRequests[0];
                        }}
                        size="sm"
                        title="Máte rozpracovanou žádanku, kliknutím na pokračovat můžete dokončit žádanku"
                        type="button"
                      >
                        Pokračovat →
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardHeaderTitle>Seznam historických žádanek</CardHeaderTitle>
            </CardHeader>
            <CardBody class="divide-y text-sm">
              {sortedRequestHistory.map(({ date, type }) => (
                <div class="grid grid-cols-[80px_1fr_auto_auto] items-center gap-4 py-3" key={type}>
                  <div class="text-muted-foreground text-base font-medium">{type}</div>
                  <div>
                    <PreviewText label="" value={date} />
                  </div>
                  <div>
                    <Button
                      class="flex w-full items-center justify-between gap-2 shadow-sm md:w-auto"
                      onClick$={() => {
                        formMode.value = "view";
                        selectedRequest.value = dummyRequests[0];
                      }}
                      size="sm"
                      title="Zobrazit detail"
                      type="button"
                    >
                      <svg
                        class="text-muted-foreground pointer-events-none h-4 w-4"
                        viewBox="0 0 576 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                    </Button>
                  </div>

                  <div>
                    <Button
                      class="flex w-full items-center justify-between gap-2 shadow-sm md:w-auto"
                      onClick$={() => {
                        formMode.value = "copy";
                        selectedRequest.value = dummyRequests[0];
                      }}
                      size="sm"
                      title="Nová zkopírováním"
                      type="button"
                    >
                      <svg
                        class="text-muted-foreground pointer-events-none h-4 w-4"
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Sem dát další levý box (např. přehled, poznámky atd.) */}
          {/* <Card><CardHeaderTitle>Další box</CardHeaderTitle></Card> */}
        </div>

        {/* Pravý sloupec – žádanka */}
        <Card class="flex w-full flex-col">
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

                {/* Požaduje */}
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
                      ) : formMode.value === "new" ? (
                        <>
                          <FieldText
                            inputType="text"
                            label="Anestezie při vyšetření"
                            name="anestezie_pri_vysetreni2"
                            of={formStore}
                          />
                          <FieldText inputType="text" label="Důvod požadavku" name="duvod_pozadavku2" of={formStore} />
                          <FieldText inputType="text" label="Naléhavost" name="nalehavost2" of={formStore} />
                          <FieldText
                            inputType="text"
                            label="Očekávaný přínos"
                            name="ocekavany_prinos2"
                            of={formStore}
                          />
                          <FieldText inputType="text" label="Sdělení" name="sdeleni2" of={formStore} />
                          <FieldText
                            inputType="text"
                            label="Speciální požadavek"
                            name="specialni_pozadavek2"
                            of={formStore}
                          />
                          <FieldText
                            inputType="text"
                            label="Žádané vyšetření"
                            name="zadane_vysetreni2"
                            of={formStore}
                          />
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

                {/* Zdravotní informace */}
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
                      ) : formMode.value === "new" ? (
                        <>
                          <FieldText inputType="text" label="Alergie" name="alergie2" of={formStore} />
                          <FieldText
                            inputType="text"
                            label="Alergie na kontrastní látku"
                            name="alergie_kontrast2"
                            of={formStore}
                          />
                          <FieldText inputType="text" label="Anamnéza" name="anamneza2" of={formStore} />
                          <FieldText inputType="text" label="DG" name="dg2" of={formStore} />
                          <FieldText inputType="text" label="Epikríza" name="epikriza2" of={formStore} />
                          <FieldText inputType="text" label="Handicap" name="handicap2" of={formStore} />
                          <FieldText inputType="text" label="Váha" name="vaha2" of={formStore} />
                          <FieldText inputType="text" label="Výška" name="vyska2" of={formStore} />
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

                {formMode.value === "view" && (
                  <Button
                    class="w-full"
                    onClick$={() => {
                      formMode.value = "copy";
                    }}
                    severity="accent"
                    type="button"
                    variant="contained"
                  >
                    Nová zkopírováním
                  </Button>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </Form>
  );
});
