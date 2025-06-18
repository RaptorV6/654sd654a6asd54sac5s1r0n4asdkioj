import type { DocumentHead } from "@builder.io/qwik-city";
import type { InitialValues } from "@modular-forms/qwik";

import { Button, Card, CardBody, FieldDate, useToaster } from "@akeso/ui-components";
import { component$, useTask$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { FieldAutocompletePatient } from "~/components/field-autocomplete-patient";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";

import type { ServerCreateCardInput } from "../palliative-cards-rpc";

import { serverCreateCard } from "../palliative-cards-rpc";

// hlavní nadpis dokumentu
const pageTitle = "Nová karta";

export const head: DocumentHead = {
  title: pageTitle,
};

// vytvoření Valibot schématu pro validaci formulářových dat
const FormSchema = v.object({
  hospitalizationAt: v.optional(
    v.pipe(
      v.union([v.date(), v.string()]),
      v.transform((i) => new Date(i)),
    ),
  ),
  interventionRequestAt: v.optional(
    v.pipe(
      v.union([v.date(), v.string()]),
      v.transform((i) => new Date(i)),
      v.maxValue(new Date(), "Datum nesmí být pozdější než dnešní."),
    ),
  ),
  patientId: v.pipe(v.string(), v.nonEmpty("Zadejte pacienta.")),
});

type NewCardForm = v.InferInput<typeof FormSchema>;

// nastavení formulářových initial values
export const useFormLoader = routeLoader$<InitialValues<NewCardForm>>(() => ({
  hospitalizationAt: undefined,
  interventionRequestAt: undefined,
  patientId: "",
}));

// návratový typ useAddCardAction
type AddCardReturnData = { id: string };

// vytvoření nové karty s validací Valibot + přesměrování na detail
export const useAddCardAction = formAction$<NewCardForm, AddCardReturnData>(async (formData, { env }) => {
  try {
    const input: ServerCreateCardInput = {
      env: env,
      hospitalizationAt: formData.hospitalizationAt,
      interventionRequestAt: formData.interventionRequestAt,
      patientId: formData.patientId,
    };

    const id = await serverCreateCard(input);

    return { message: id, status: "success" };
  } catch (error: any) {
    console.error("Přidání nové karty se nezdařilo!", error);
    return { message: error.message, status: "error" };
  }
}, valiForm$(FormSchema));

export default component$(() => {
  const [formStore, { Form }] = useForm<NewCardForm, AddCardReturnData>({
    action: useAddCardAction(),
    loader: useFormLoader(),
    validate: valiForm$(FormSchema),
  });

  const navigate = useNavigate();
  const { toastError$, toastSuccess$ } = useToaster();

  useTask$(({ track }) => {
    const response = track(() => formStore.response);

    if (response.status === "success") {
      toastSuccess$("Nová karta byla založena");
      navigate(`/palliative/${response.message}`);
    }

    if (response.status === "error" && response.message) {
      if (response.message === "An active card already exists for the patient.") {
        toastError$("Pro pacienta již existuje aktivní karta.");
      } else {
        toastError$(`Chyba, karta nebyla vytvořena. ${response.message}`);
      }
    } else if (response.status === "error") {
      toastError$("Chyba, karta nebyla vytvořena. Neznámá chyba.");
    }
  });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/palliative/">Paliativní péče</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>Nová karta</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <div>
        <Card class="max-w-md">
          <CardBody>
            <Form class="form-styles">
              <FieldAutocompletePatient
                helperText="Vyhledejte pacienta dle části jména nebo rodného čísla"
                label="Pacient"
                name="patientId"
                of={formStore}
              />
              <FieldDate
                label="Datum hospitalizace"
                max={new Date("2024-12-31").toISOString().split("T")[0]}
                min={new Date("2024-01-01").toISOString().split("T")[0]}
                name="hospitalizationAt"
                of={formStore}
                required={false}
              />
              <FieldDate
                label="Datum vyžádání intervence"
                max={new Date().toISOString().split("T")[0]}
                min={new Date("2024-01-01").toISOString().split("T")[0]}
                name="interventionRequestAt"
                of={formStore}
                required={false}
              />

              <div class="mt-6 flex items-center justify-end">
                <Button disabled={formStore.submitting} severity="accent" type="submit">
                  Vytvořit kartu
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
});
