import type { DocumentHead } from "@builder.io/qwik-city";
import type { InitialValues } from "@modular-forms/qwik";

import { Alert, Button, Card, CardBody, CardFooter } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$, server$, z } from "@builder.io/qwik-city";
import { Form, formAction$, FormError, useFormStore, zodForm$ } from "@modular-forms/qwik";

import { FieldAutocompletePatient } from "~/components/field-autocomplete-patient";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageBreadcrumbsLink } from "~/components/page-breadcrumbs-link";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";
import { useShowPageProgressIndicator } from "~/contexts/page-progress-indicator/page-progress-indicator-provider";
import { serverCreateProcedure, serverFindProcedures } from "~/server/rpc/procedure";

const PROCEDURE_KIND = "colorectal-cancer";

const pageTitle = "Vytvoření předoperačního postupu kolorektálního karcinomu";

const CreateProcedureFormSchema = z.object({
  patientId: z.string().min(1, "Vyberte pacienta."),
});

type CreateProcedureFormValues = z.infer<typeof CreateProcedureFormSchema>;

export const useFormLoader = routeLoader$<InitialValues<CreateProcedureFormValues>>(async (requestEvent) => {
  const sq = new URL(requestEvent.request.url).searchParams;
  const patientId = sq.get("patientId");

  return {
    patientId: patientId ?? "",
  } satisfies InitialValues<CreateProcedureFormValues>;
});

export const useFormAction = formAction$<CreateProcedureFormValues>(async (values, requestEvent) => {
  const createdProcedure = await serverCreateProcedure(requestEvent.env, {
    patientId: values.patientId,
    procedureKind: PROCEDURE_KIND,
  });

  if (createdProcedure == null) {
    throw new FormError<CreateProcedureFormValues>("CREATION_FAILED");
  }

  // Redirect to detail
  throw requestEvent.redirect(303, `/surgery/procedures/colorectal-cancer/${createdProcedure.id}/`);
}, zodForm$(CreateProcedureFormSchema));

const verifyPatientProcedures = server$(async function (patientId: string, procedureKind: string) {
  return serverFindProcedures(this.env, {
    patientId,
    procedureKind,
  });
});

export const head: DocumentHead = {
  title: pageTitle,
};

export default component$(() => {
  const { showPageProgressIndicatorSig } = useShowPageProgressIndicator();

  const formAction = useFormAction();
  const formStore = useFormStore<CreateProcedureFormValues>({
    action: formAction,
    loader: useFormLoader(),
    validate: zodForm$(CreateProcedureFormSchema),
  });

  const patientHasNoOpenedProcedureSig = useSignal<false | null | string>(null);

  useTask$(async ({ cleanup, track }) => {
    const patientId = track(() => formStore.internal.fields.patientId?.value);
    if (patientId) {
      const ac = new AbortController();
      cleanup(() => ac.abort("aborted"));
      const patientProcedures = await verifyPatientProcedures(ac.signal, patientId, PROCEDURE_KIND);

      const openedProcedure = patientProcedures.find((i) => i.step.major < 99);

      if (openedProcedure) {
        patientHasNoOpenedProcedureSig.value = openedProcedure.id;
      } else {
        patientHasNoOpenedProcedureSig.value = false;
      }
    }
  });

  useTask$(({ track }) => {
    showPageProgressIndicatorSig.value = track(() => formAction.isRunning);
  });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsLink href="/surgery/">Chirurgické oddělení</PageBreadcrumbsLink>
        <PageBreadcrumbsLink href="/surgery/procedures/">Postupy</PageBreadcrumbsLink>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <Form action={formAction} of={formStore}>
        <Card class="form-styles max-w-md">
          <CardBody>
            {patientHasNoOpenedProcedureSig.value && (
              <Alert class="mb-4 text-sm" severity="error">
                <div class="font-bold">
                  Zvolený pacient již má neukončený předoperační postup kolorektálního karcinomu.
                </div>
                <div class="mt-4 flex justify-end">
                  <Button
                    href={`/surgery/procedures/colorectal-cancer/${patientHasNoOpenedProcedureSig.value}/`}
                    severity="accent"
                    size="sm"
                    type="link"
                    variant="soft"
                  >
                    Přejít do postupu
                  </Button>
                </div>
              </Alert>
            )}
            <FieldAutocompletePatient label="Pacient" name="patientId" of={formStore} />
          </CardBody>
          <CardFooter class="flex justify-end">
            <Button
              disabled={patientHasNoOpenedProcedureSig.value !== false}
              severity="accent"
              type="submit"
              variant="contained"
            >
              Pokračovat
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
});
