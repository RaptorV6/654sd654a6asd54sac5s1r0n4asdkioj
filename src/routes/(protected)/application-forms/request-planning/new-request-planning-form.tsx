import {
  Button,
  ButtonLabelIcon,
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  List,
  ListItem,
  StatusIndicator,
} from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { EyeIcon } from "~/components/icons-outline";

import type { MockRequest } from "./mock-requests";

import { useFormInitialData } from "./_loaders";
import { ApplicationFormsPlanningCalendar } from "./application-forms-planning-calendar";
import { CardExistApplication } from "./card-exist-application-form";
import { CardNewApplication } from "./card-new-application-form";
import { addMockRequest, mockRequests } from "./mock-requests";

export const enumUrgency2 = {
  RUTINA: "RUTINA" as const,
  STATIM: "STATIM" as const,
};

// --- VALIDACE FORMULÁŘE ---
const baseSchema = v.object({
  alergie: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie")),
  alergie_kontrast: v.pipe(v.string(), v.minLength(1, "Vyplňte alergie na kontrastní látku")),
  anamneza: v.string(),
  anestezie_pri_vysetreni: v.string(),
  bydliste: v.string(),
  cp: v.optional(v.number()),
  dg: v.pipe(v.string(), v.minLength(1, "Vyplňte diagnózu")),
  duvod_neprovedeni: v.pipe(v.string(), v.minLength(1, "Vyberte důvod")),
  duvod_pozadavku: v.string(),
  epikriza: v.pipe(v.string(), v.minLength(1, "Vyplňte epikrízu")),
  ext_zad: v.boolean(),
  handicap: v.string(),
  icp: v.optional(v.number()),
  issueDate: v.nullable(v.instance(Date, "Musíte zadat platné datum")),
  jmeno: v.pipe(v.string(), v.minLength(1, "Vyplňte jméno a příjmení")),
  jmeno_zadatel: v.string(),
  nalehavost: v.string(),
  nepodepsano: v.string(),
  ocekavany_prinos: v.string(),
  odbornost: v.optional(v.number()),
  oddeleni: v.string(),
  oddeleni_prijemce: v.string(),
  sdeleni: v.string(),
  specialni_pozadavek: v.string(),
  stat: v.string(),
  telefon: v.string(),
  telefon_zadatel: v.string(),
  urgency: v.string(),
  urgency2: v.nullable(v.enum_(enumUrgency2, "Vyberte naléhavost")),
  vaha: v.optional(v.number()),
  vyska: v.optional(v.number()),
  zadane_vysetreni: v.string(),
  zp: v.string(),
  zz: v.string(),
  zz_prijemce: v.string(),
});

export const FormSchema = v.intersect([baseSchema]);

export type FormInput = v.InferInput<typeof FormSchema>;
export type FormOutput = v.InferOutput<typeof FormSchema>;

export const NewApplicationFormCreateForm = component$(() => {
  const selectedExistApp = useSignal<MockRequest | null>(null);
  const formMode = useSignal<"new" | "view" | null>(null);

  const initialValuesSig = useFormInitialData();
  const [formStore, { Form }] = useForm<FormInput>({
    loader: initialValuesSig,
    validate: valiForm$(FormSchema),
  });

  const requestsSignal = useSignal<MockRequest[]>([...mockRequests]);

  useTask$(({ track }) => {
    track(() => formMode.value);
    track(() => selectedExistApp.value);

    function parseCzDateString(dateStr: string): Date | null {
      if (!dateStr || typeof dateStr !== "string") return null;
      const [year, month, day] = dateStr.split("-"); // formát z mockRequests je YYYY-MM-DD
      if (!day || !month || !year) return null;
      const parsed = new Date(Number(year), Number(month) - 1, Number(day));
      return isNaN(parsed.getTime()) ? null : parsed;
    }

    if (formMode.value === "view" && selectedExistApp.value) {
      const r = selectedExistApp.value;

      setValue(formStore, "jmeno", r.jmeno ?? "");
      setValue(formStore, "dg", r.dg ?? "");
      setValue(formStore, "alergie", r.alergie ?? "");

      const parsedDate = parseCzDateString(r.issueDate);
      setValue(formStore, "issueDate", parsedDate);

      setValue(formStore, "urgency2", r.urgency.toUpperCase() === "STATIM" ? "STATIM" : "RUTINA");
      setValue(formStore, "ext_zad", r.ext_zad ?? true);

      setValue(formStore, "vyska", r.vyska ? Number(r.vyska) : undefined);
      setValue(formStore, "vaha", r.vaha ? Number(r.vaha) : undefined);
      setValue(formStore, "cp", r.cp ? Number(r.cp) : undefined);
      setValue(formStore, "icp", r.icp ? Number(r.icp) : undefined);
      setValue(formStore, "odbornost", r.odbornost ? Number(r.odbornost) : undefined);
    }
  });

  return (
    <Form class="form-styles">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr_1200px]">
        {/* -------------------------------------------------------
               1) SEZNAM ŽÁDANEK (vlevo)
           ------------------------------------------------------- */}
        <Card class="self-start">
          <CardHeader>
            <CardHeaderTitle>Seznam žádanek</CardHeaderTitle>
          </CardHeader>

          <CardBody>
            <List>
              <ListItem class="grid grid-cols-4 items-center gap-4 text-xs">
                <div>Nal.</div>
                <div>Ext. žád.</div>
                {/* <div>Jméno</div> */}
                <div>Akce</div>
              </ListItem>
              {requestsSignal.value.map((req) => (
                <ListItem class="grid grid-cols-3 items-center gap-4 py-2" key={req.id}>
                  <StatusIndicator
                    pulse={req.urgency === "Statim"}
                    severity={req.urgency === "Statim" ? "danger" : "none"}
                    title={req.urgency}
                  />

                  <StatusIndicator severity={req.ext_zad ? "success" : "danger"} title={req.ext_zad ? "ANO" : "NE"} />

                  {/* <PreviewText label="" value={req.jmeno} /> */}

                  <Button
                    onClick$={() => {
                      formMode.value = "view";
                      selectedExistApp.value = req;
                    }}
                    size="xs"
                    title="Zobrazit detail žádanky"
                    type="button"
                  >
                    <ButtonLabelIcon as={EyeIcon} standalone />
                    <span class="sr-only">Zobrazit detail</span>
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardBody>
          <Button
            onClick$={() => {
              formMode.value = "new";
              selectedExistApp.value = null;
            }}
            severity="accent"
            type="button"
            variant="contained"
          >
            Přidat externí žádanku
          </Button>
        </Card>

        {/* -------------------------------------------------------
               2) DETAIL ŽÁDANKY / NOVÁ ŽÁDANKA (uprostřed)
           ------------------------------------------------------- */}
        <div class="flex flex-col gap-4">
          <Card class="flex w-full flex-col">
            <CardHeader>
              <CardHeaderTitle>Detail žádanky</CardHeaderTitle>
            </CardHeader>
            <CardBody class="flex-grow space-y-4">
              {formMode.value === "view" && selectedExistApp.value ? (
                <CardExistApplication formStore={formStore} />
              ) : formMode.value === "new" ? (
                <CardNewApplication
                  formStore={formStore}
                  onAddRequest$={async (values) => {
                    const formatDate = (date: Date): string => date.toISOString().split("T")[0]; // YYYY-MM-DD
                    addMockRequest({
                      alergie: values.alergie,
                      cp: values.cp,
                      dg: values.dg,
                      ext_zad: true,
                      icp: values.icp,
                      issueDate: values.issueDate instanceof Date ? formatDate(values.issueDate) : values.issueDate,
                      jmeno: values.jmeno,
                      odbornost: values.odbornost,
                      urgency: values.urgency2 === "STATIM" ? "Statim" : "Rutina",
                      vaha: values.vaha || undefined,
                      vyska: values.vyska || undefined,
                    });
                    requestsSignal.value = [...mockRequests];
                    formMode.value = null;
                  }}
                />
              ) : (
                <div class="text-muted-foreground text-center text-sm italic">Založte žádanku</div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* -------------------------------------------------------
               3) KALENDÁŘ (vpravo)
           ------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardHeaderTitle>Kalendář</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            <ApplicationFormsPlanningCalendar />
          </CardBody>
        </Card>
      </div>
    </Form>
  );
});
