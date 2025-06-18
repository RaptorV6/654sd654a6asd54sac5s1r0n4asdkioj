// Pokračování formuláře pro MRI žádanku

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

import { useFormInitialData, usePreviewData } from "./new-application-form-mri-loaders";

// Enums
export const enumUrgency = { RUTINA: "RUTINA", STATIM: "STATIM" } as const;
export const enumYesNo = { ANO: "Ano", NE: "Ne" } as const;
export const enumRequestReason = {
  AFTEROPERATION: "Po operaci",
  DETERIORATION: "Zhoršení stavu",
  EPIDEMIOLOGICAL: "Epidemiologická studie",
  LONGTERM: "Dlouhodobé sledování",
  PREVENTIVE: "Preventivní vyšetření",
  RESEARCH: "Výzkum",
  ROUTINE: "Běžné vyšetření",
  SCREENING: "Screeningové vyšetření",
  URGENTADMISSION: "Neodkladní přijetí",
} as const;

export const enumValityUntil = {
  Month1: "1 měsíc" as const,
  Month2: "2 měsíce" as const,
  Month3: "3 měsíce" as const,
  Month4: "4 měsíce" as const,
  Month5: "5 měsíce" as const,
  Month6: "6 měsíce" as const,
};

export const enumzz = {
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

// Base schema
const baseSchema = v.object({
  anesthesia: v.enum_(enumYesNo, "Vyberte, zda bude nutná anestezie"),

  contraindications: v.object({
    claustrophobia: v.enum_(enumYesNo, "Vyberte odpověď na klaustrofobii"),
    claustrophobiaNote: v.optional(v.string()),
    clips: v.enum_(enumYesNo, "Vyberte odpověď na cévní svorky"),
    clipsNote: v.optional(v.string()),
    cochlearImplant: v.enum_(enumYesNo, "Vyberte odpověď na kochleární implantát"),
    cochlearImplantNote: v.optional(v.string()),
    fragments: v.enum_(enumYesNo, "Vyberte odpověď na kovové fragmenty"),
    fragmentsNote: v.optional(v.string()),
    generalNote: v.optional(v.string()),
    metalInBody: v.enum_(enumYesNo, "Vyberte odpověď na kov v těle"),
    metalInBodyNote: v.optional(v.string()),
    pacemaker: v.enum_(enumYesNo, "Vyberte odpověď na kardiostimulátor"),
    pacemakerNote: v.optional(v.string()),
  }),

  contrastAllergy: v.enum_(enumYesNo, "Vyberte, zda je alergie na kontrastní látku"),

  creationDate: v.pipe(v.string(), v.minLength(1, "Vyplňte datum vytvoření")),

  epicrisis: v.pipe(v.string(), v.minLength(1, "Vyplňte epikrízu")),

  expectedBenefit: v.pipe(v.string(), v.minLength(1, "Vyplňte očekávaný přínos")),

  patient: v.object({
    address: v.optional(v.string()),
    allergy: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie")),
    birthRegistrationNumber: v.optional(v.string()),
    dg: v.pipe(v.string(), v.minLength(1, "Vyplňte DG")),
    fullName: v.optional(v.string()),
    height: v.pipe(
      v.string("Vyplňte výšku"),
      v.minLength(1, "Vyplňte výšku"),
      v.transform((val) => Number(val)),
      v.number("Výška musí být číslo"),
    ),
    id: v.optional(v.string()),
    insuranceCompanyNumber: v.optional(v.string()),
    insuranceNumber: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    specialni: v.pipe(v.string(), v.minLength(1, "Vyplňte speciální potřeby pacienta")),
    state: v.optional(v.string()),
    weight: v.pipe(
      v.string("Vyplňte váhu"),
      v.minLength(1, "Vyplňte váhu"),
      v.transform((val) => Number(val)),
      v.number("Váha musí být číslo"),
    ),
  }),

  reason: v.enum_(enumRequestReason, "Vyberte důvod žádanky"),
  requestedExamination: v.pipe(v.string(), v.minLength(1, "Vyplňte žádané vyšetření")),

  requester: v.optional(
    v.object({
      departmentName: v.pipe(v.string(), v.minLength(1, "Vyplňte oddělení zadavatele")),
      expertiseCode: v.pipe(v.string(), v.minLength(1, "Vyplňte odbornost")),
      fullName: v.pipe(v.string(), v.minLength(1, "Vyplňte jméno zadavatele")),
      phoneNumber: v.pipe(v.string(), v.minLength(1, "Vyplňte telefon zadavatele")),
      providerName: v.pipe(v.string(), v.minLength(1, "Vyplňte název poskytovatele")),
    }),
  ),
  selectDate: v.nullable(
    v.pipe(
      v.string(),
      v.nonEmpty("Musíte zadat datum a čas"), // pokud není prázdné
      v.transform((s) => new Date(s)), // string → Date
    ),
  ),

  urgency: v.enum_(enumUrgency, "Vyberte naléhavost"),
  valityUntil: v.enum_(enumValityUntil, "Vyberte platnost žádanky"),
  zz: v.pipe(v.string(), v.nonEmpty("Vyberte zdravotnické zařízení"), v.enum_(enumzz, "Vyberte zdravotnické zařízení")),
});

// Podmíněná validace department dle zz
const conditionalSchema = v.variant("zz", [
  v.object({
    department: v.optional(v.string()),
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

export const NewApplicationFormMriForm = component$(() => {
  const previewData = usePreviewData().value;

  // const Zz: Record<string, string> = {
  //   Externi: "Externí",
  //   ZZAKESO: "ZZ AKESO (Nemocnice Hořovice)",
  // };

  const department: Record<string, string> = {
    Oddeleni1: "Oddeleni 1",
    Oddeleni2: "Oddeleni 2",
    Oddeleni3: "Oddeleni 3",
    Oddeleni4: "Oddeleni 4",
    Oddeleni5: "Oddeleni 5",
  };

  const [formStore, { Form }] = useForm({
    loader: useFormInitialData(),
    validate: valiForm$(FormSchema),
  });

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
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Pacient a žadatel */}
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

      <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Section: Požaduje */}
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
              options={Object.entries(enumUrgency).map(([value, label]) => ({ label, value }))}
            />
            <FieldRadioSelect
              label="Důvod"
              name="reason"
              of={formStore}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              options={Object.entries(enumRequestReason).map(([key, value]) => ({
                label: value,
                value: value,
              }))}
            />

            <FieldText
              inputType="textarea"
              label="Žádané vyšetření/orgán/oblast"
              name="requestedExamination"
              of={formStore}
            />
            <FieldText inputType="textarea" label="Očekávaný přínos" name="expectedBenefit" of={formStore} />
            <FieldRadio
              direction="horizontal"
              label="Anestezie při vyšetření"
              name="anesthesia"
              of={formStore}
              options={[
                { label: "Ano", value: "Ano" },
                { label: "Ne", value: "Ne" },
              ]}
            />
          </CardBody>
        </Card>

        {/* Section: Kontraindikace */}
        <Card>
          <CardHeader>
            <CardHeaderTitle>Kontraindikace</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            {[
              { label: "Klaustrofobie", name: "claustrophobia" as const },
              { label: "Kovy v těle", name: "metalInBody" as const },
              { label: "Svorky v těle", name: "clips" as const },
              { label: "Kovové střepiny", name: "fragments" as const },
              { label: "Kardiostimulátor", name: "pacemaker" as const },
              { label: "Koch. implantát", name: "cochlearImplant" as const },
            ].map(({ label, name }) => {
              const fieldName = `contraindications.${name}` as const;
              const noteFieldName = `contraindications.${name}Note` as const;
              const selected = formStore.internal.fields[fieldName]?.value;

              return (
                <div class="mb-4" key={name}>
                  <FieldRadio
                    direction="horizontal"
                    label={label}
                    name={fieldName}
                    of={formStore}
                    options={[
                      { label: "Ano", value: "Ano" },
                      { label: "Ne", value: "Ne" },
                    ]}
                  />

                  {selected === "Ano" && (
                    <FieldText inputType="textarea" label="" name={noteFieldName} of={formStore} required={false} />
                  )}
                </div>
              );
            })}
          </CardBody>
        </Card>
      </div>

      {/* Section: Zdravotní informace */}
      <Card class="mt-4">
        <CardHeader>
          <CardHeaderTitle>Zdravotní informace pacienta</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            <FieldText inputType="text" label="Výška" name="patient.height" of={formStore} />
            <FieldText inputType="text" label="Váha" name="patient.weight" of={formStore} />
            <FieldText inputType="text" label="Alergie" name="patient.allergy" of={formStore} />
            <FieldText inputType="text" label="DG" name="patient.dg" of={formStore} />
            <FieldText inputType="text" label="Speciální potřeby pacienta" name="patient.specialni" of={formStore} />
            <FieldRadio
              direction="horizontal"
              label="Alergie na kontrastní látku"
              name="contrastAllergy"
              of={formStore}
              options={[
                { label: "Ano", value: "Ano" },
                { label: "Ne", value: "Ne" },
              ]}
            />
          </div>
          <div class="mt-4">
            <FieldText inputType="textarea" label="Epikríza" name="epicrisis" of={formStore} />
          </div>
        </CardBody>
      </Card>

      <div class="mb-10 mt-20 flex items-baseline space-x-4">
        <div class="w-1/3">
          <FieldText inputType="text" label="Datum vytvoření" name="creationDate" of={formStore} />
        </div>

        <div class="w-1/3">
          <FieldRadioSelect
            label="Platnost do"
            name="valityUntil"
            of={formStore}
            options={[
              { label: "1 měsíc", value: "1 měsíc" },
              { label: "2 měsíce", value: "2 měsíce" },
              { label: "3 měsíce", value: "3 měsíce" },
              { label: "4 měsíce", value: "4 měsíce" },
              { label: "5 měsíce", value: "5 měsíce" },
              { label: "6 měsíce", value: "6 měsíce" },
            ]}
          />
        </div>
        <div class="w-1/3">
          <FieldDateTime label="Požadované datum a čas vyšetření" name="selectDate" of={formStore}></FieldDateTime>
        </div>
      </div>

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
          {/* <Button onClick$={() => {}} severity="accent" type="submit" variant="contained">
            Podepsat a vystavit
          </Button> */}
        </div>
      </div>
    </Form>
  );
});
