import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  FieldDateTime,
  FieldHidden,
  FieldRadio,
  FieldRadioSelect,
  FieldText,
} from "@akeso/ui-components";
import { component$, useComputed$, useTask$ } from "@builder.io/qwik";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { ApplicantCard } from "~/components/app-forms-cards/applicant-card";
import { PacientCard } from "~/components/app-forms-cards/pacient-card";

import { useFormInitialData, usePreviewData } from "./new-application-form-uz-loaders";

// --- ENUMY ---
export const enumRequest = {
  AFTEROPERATION: "AFTEROPERATION" as const,
  DETERIORATION: "DETERIORATION" as const,
  EPIDEMIOLOGICAL: "EPIDEMIOLOGICAL" as const,
  LONGTERM: "LONGTERM" as const,
  PREVENTIVE: "PREVENTIVE" as const,
  RESEARCH: "RESEARCH" as const,
  ROUTINE: "ROUTINE" as const,
  SCREENING: "SCREENING" as const,
  URGENTADMISSION: "URGENTADMISSION" as const,
};

export const enumUrgency = {
  RUTINA: "RUTINA" as const,
  STATIM: "STATIM" as const,
};

export const enumzz = {
  Empty: "" as const,
  Externi: "Externi" as const,
  ZZAKESO: "ZZ AKESO (Nemocnice Hořovice)" as const,
};

export const enumDepartment = {
  Oddeleni1: "Oddeleni1" as const,
  Oddeleni2: "Oddeleni2" as const,
  Oddeleni3: "Oddeleni3" as const,
  Oddeleni4: "Oddeleni4" as const,
  Oddeleni5: "Oddeleni5" as const,
};

export const enumValityUntil = {
  Month1: "1 měsíc" as const,
  Month2: "2 měsíce" as const,
  Month3: "3 měsíce" as const,
  Month4: "4 měsíce" as const,
  Month5: "5 měsíce" as const,
  Month6: "6 měsíce" as const,
};

// --- VALIDACE FORMULÁŘE ---
const baseSchema = v.object({
  alergie: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie")),
  creationDate: v.pipe(v.string(), v.minLength(1, "Vyplňte datum vytvoření")),
  dg: v.pipe(v.string(), v.minLength(1, "Vyplňte diagnózu")),
  epikriza: v.pipe(v.string(), v.minLength(1, "Vyplňte epikrízu")),
  patient: v.object({
    address: v.nullable(v.string(), () => ""),
    birthRegistrationNumber: v.nullable(v.string()),
    fullName: v.nullable(v.string()),
    id: v.nullable(v.string()),
    insuranceCompanyNumber: v.nullable(v.string()),
    insuranceNumber: v.nullable(v.string()),
    phoneNumber: v.nullable(v.string()),
    state: v.nullable(v.string()),
  }),

  request: v.nullable(v.enum_(enumRequest, "Vyberte důvod požadavku")),

  requestedExamination: v.pipe(v.string(), v.minLength(1, "Vyplňte žádané vyšetření")),
  requester: v.nullable(
    v.object({
      departmentName: v.pipe(v.string(), v.minLength(1, "Vyplňte oddělení zadavatele")),
      expertiseCode: v.pipe(v.string(), v.minLength(1, "Vyplňte odbornost")),
      fullName: v.pipe(v.string(), v.minLength(1, "Vyplňte jméno zadavatele")),
      phoneNumber: v.pipe(v.string(), v.minLength(1, "Vyplňte telefon zadavatele")),
      providerName: v.pipe(v.string(), v.minLength(1, "Vyplňte název zařízení zadavatele")),
    }),
  ),

  sdeleni: v.pipe(v.string(), v.minLength(1, "Vyplňte sdělení")),
  selectDate: v.nullable(
    v.pipe(
      v.string(),
      v.nonEmpty("Musíte zadat datum a čas"), // pokud není prázdné
      v.transform((s) => new Date(s)), // string → Date
    ),
  ),

  specialni: v.nullable(v.pipe(v.string(), v.minLength(1, "Zadejte platný speciální potřeby pacienta"))),
  specialRequest: v.pipe(v.string(), v.minLength(1, "Vyplňte speciální požadavek")),
  urgency: v.nullable(v.enum_(enumUrgency, "Vyberte naléhavost")),
  vaha: v.pipe(
    v.string("Vyplňte výšku"),
    v.minLength(1, "Vyplňte výšku"),
    v.transform((val) => Number(val)),
    v.number("Výška musí být číslo"),
  ),
  valityUntil: v.nullable(v.enum_(enumValityUntil, "Vyberte platnost")),
  vyska: v.pipe(
    v.string("Vyplňte váhu"),
    v.minLength(1, "Vyplňte váhu"),
    v.transform((val) => Number(val)),
    v.number("Váha musí být číslo"),
  ),
  zz: v.pipe(
    v.string(),
    v.nonEmpty("Vyberte zdravotnické zařízení"),
    v.enum_(
      {
        "": "",
        Externi: "Externi",
        ZZAKESO: "ZZ AKESO (Nemocnice Hořovice)",
      },
      "Vyberte zdravotnické zařízení",
    ),
  ),
});

// --- PODMÍNĚNÁ VALIDACE department PODLE zz ---
const conditionalSchema = v.variant("zz", [
  v.object({
    department: v.optional(v.string()), // žádné oddělení není potřeba
    zz: v.literal(""),
  }),
  v.object({
    department: v.optional(v.string()),
    zz: v.literal("Externi"),
  }),
  v.object({
    department: v.pipe(v.string(), v.nonEmpty("Vyberte oddělení"), v.enum_(enumDepartment, "Vyberte oddělení")),
    zz: v.literal("ZZ AKESO (Nemocnice Hořovice)"),
  }),
]);

export const FormSchema = v.intersect([baseSchema, conditionalSchema]);

export type FormInput = v.InferInput<typeof FormSchema>;
export type FormOutput = v.InferOutput<typeof FormSchema>;

// --- FORMULÁŘOVÁ KOMPONENTA ---
export const NewApplicationFormUzForm = component$(() => {
  const previewData = usePreviewData().value;
  const initialValuesSig = useFormInitialData();

  const [formStore, { Form }] = useForm<FormInput>({
    loader: initialValuesSig,
    validate: valiForm$(FormSchema),
  });

  const ReasonForRequest: Record<string, string> = {
    AFTEROPERATION: "Po operaci",
    DETERIORATION: "Zhoršení stavu",
    EPIDEMIOLOGICAL: "Epidemiologická studie",
    LONGTERM: "Dlouhodobé sledování",
    PREVENTIVE: "Preventivní vyšetření",
    RESEARCH: "Výzkum",
    ROUTINE: "Běžné vyšetření",
    SCREENING: "Screeningové vyšetření",
    URGENTADMISSION: "Neodkladní přijetí",
  };

  const department: Record<string, string> = {
    Oddeleni1: "Radiologie",
    Oddeleni2: "Oddeleni 2",
    Oddeleni3: "Oddeleni 3",
    Oddeleni4: "Oddeleni 4",
    Oddeleni5: "Oddeleni 5",
  };

  const urgency: Record<string, string> = {
    RUTINA: "RUTINA",
    STATIM: "STATIM",
  };

  const isExterni = useComputed$(() => formStore.internal.fields.zz?.value === "Externi");

  useTask$(({ track }) => {
    track(() => formStore.internal.fields.zz?.value);

    if (formStore.internal.fields.department?.value) {
      formStore.internal.fields.department.value = "";
    }
  });

  return (
    <Form class="form-styles">
      <FieldHidden name="patient.id" of={formStore} />
      {/* Pacient a žadatel */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PacientCard data={previewData.patient} />

        <ApplicantCard data={previewData.requester} />
      </div>

      {/* Příjemce */}
      <Card class="mt-4">
        <CardHeader>
          <CardHeaderTitle>Příjemce</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <div class="flex items-baseline space-x-4">
            <FieldRadioSelect
              class="w-1/2"
              label="Zdravotnické zařízení"
              name="zz"
              of={formStore}
              options={[
                { label: "Externí", value: "Externi" },
                { label: "ZZ AKESO (Nemocnice Hořovice)", value: "ZZ AKESO (Nemocnice Hořovice)" },
              ]}
            />
            <FieldRadioSelect
              class="w-1/2"
              disabled={isExterni.value}
              label="Oddělení"
              name="department"
              of={formStore}
              options={Object.entries(department).map(([value, label]) => ({
                label,
                value,
              }))}
              // required={!isExterni.value}
            />
          </div>
        </CardBody>
      </Card>

      {/* Požadavek a Zdravotní informace */}
      <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardHeaderTitle>Požaduje</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            <FieldRadio
              direction="horizontal"
              label="Naléhavost"
              name="urgency"
              of={formStore}
              options={Object.entries(urgency).map(([value, label]) => ({ label, value }))}
            />
            <FieldText inputType="text" label="Žádané vyšetření" name="requestedExamination" of={formStore} />
            <FieldText inputType="textarea" label="Sdělení" name="sdeleni" of={formStore} />
            <FieldRadioSelect
              label="Důvod požadavku"
              name="request"
              of={formStore}
              options={Object.entries(ReasonForRequest).map(([value, label]) => ({ label, value }))}
            />
            <FieldText inputType="text" label="Speciální požadavek" name="specialRequest" of={formStore} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardHeaderTitle>Zdravotní informace</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            <FieldText inputType="text" label="DG" name="dg" of={formStore} />
            <FieldText inputType="text" label="Alergie" name="alergie" of={formStore} />
            <FieldText inputType="text" label="Výška" name="vyska" of={formStore} />
            <FieldText inputType="text" label="Váha" name="vaha" of={formStore} />
            <FieldText inputType="text" label="Speciální potřeby pacienta" name="specialni" of={formStore} />
            <FieldText inputType="textarea" label="Epikríza" name="epikriza" of={formStore} />
          </CardBody>
        </Card>
      </div>

      {/* Platnost a datum */}
      <div class="mb-10 mt-20 flex items-baseline space-x-4">
        <div class="w-1/3">
          <FieldText inputType="text" label="Datum vytvoření" name="creationDate" of={formStore} />
        </div>
        <div class="w-1/3">
          <FieldRadioSelect
            label="Platnost do"
            name="valityUntil"
            of={formStore}
            options={Object.values(enumValityUntil).map((val) => ({ label: val, value: val }))}
          />
        </div>
        <div class="w-1/3">
          <FieldDateTime label="Požadované datum a čas vyšetření" name="selectDate" of={formStore}></FieldDateTime>
        </div>
      </div>

      {/* Tlačítka */}
      <div class="mt-4 flex items-center justify-center">
        <div class="flex items-center gap-4">
          <Button
            onClick$={() => {
              // TODO: save without validation...
            }}
            type="button"
            variant="outline"
          >
            Uložit jako rozpracované
          </Button>
          <Button onClick$={() => {}} severity="accent" type="button" variant="outline">
            Podepsat, vystavit a tisknout
          </Button>
          <Button onClick$={() => {}} severity="accent" type="submit" variant="contained">
            Podepsat a vystavit
          </Button>
        </div>
      </div>
    </Form>
  );
});
