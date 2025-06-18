import { Alert, Button, Card, CardBody, CardHeader, CardHeaderTitle } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";

import { serverGetSession, useAuthUser } from "~/routes/plugin@auth";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

import { useProcedureContext } from "./procedure-provider";
import { useFindTask } from "./utils";

// eslint-disable-next-line qwik/loader-location
export const useProcedureDeliveryOfDocumentsStagingAction = routeAction$(async (_, requestEvent) => {
  const { user } = serverGetSession(requestEvent);
  const { procedureId } = requestEvent.params;

  await serverDoneProcedureTask({
    doneBy: user.id,
    procedureId,
    // result: { self: true },
    taskKind: "stagingExaminationsCompletion",
  });
});

// eslint-disable-next-line qwik/loader-location
export const useProcedureDeliveryOfDocumentsPreoExaminationsAction = routeAction$(async (_, requestEvent) => {
  const { user } = serverGetSession(requestEvent);
  const { procedureId } = requestEvent.params;

  await serverDoneProcedureTask({
    doneBy: user.id,
    procedureId,
    // result: { self: true },
    taskKind: "preoperativeExaminationsCompletion",
  });
});

export const ProcedureDeliveryOfDocuments = component$(() => {
  const user = useAuthUser();
  const { procedure } = useProcedureContext();
  const { isTaskDone } = useFindTask();
  const stagingsDoneAction = useProcedureDeliveryOfDocumentsStagingAction();
  const preopDoneAction = useProcedureDeliveryOfDocumentsPreoExaminationsAction();

  if ((user as any).role !== "administrative") return null;
  if (procedure.step.major < 2 || procedure.step.major > 4) return null;

  const isStagingExaminationsCompletionDone = isTaskDone("stagingExaminationsCompletion");
  const isPreoExaminatinsCompletionDone = isTaskDone("preoperativeExaminationsCompletion");

  return (
    <Card class="mt-4">
      <CardHeader>
        <CardHeaderTitle>Vložení dodaných dokumentů</CardHeaderTitle>
      </CardHeader>
      <CardBody>
        <Card>
          <CardHeader>
            <CardHeaderTitle>Stagingová vyšetření</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            {isStagingExaminationsCompletionDone ? (
              <>
                <Alert severity="success">Všechny výsledky stagingových vyšetření jsou dodány.</Alert>
              </>
            ) : (
              <>
                <div
                  class={[
                    "grid grid-cols-1 gap-2",
                    procedure.surgery?.name === "Karcinom rekta" ? "md:grid-cols-4" : "md:grid-cols-3",
                  ]}
                >
                  <FileDropAreaSmall label="Vložit výsledek Koloskopie" />
                  {procedure.surgery?.name === "Karcinom rekta" && (
                    <FileDropAreaSmall label="Vložit výsledek NMR malé pánve" />
                  )}
                  <FileDropAreaSmall label="Vložit výsledek CT břicha" />
                  <FileDropAreaSmall label="RTG S+P" />
                </div>
                <div class="mt-4">
                  <Button
                    onClick$={() => {
                      stagingsDoneAction.submit();
                    }}
                    type="button"
                  >
                    Máme všechna stagingová vyšetření
                  </Button>
                </div>
              </>
            )}
          </CardBody>
        </Card>
        <Card class="mt-4">
          <CardHeader>
            <CardHeaderTitle>Předoperační vyšetření</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            {isPreoExaminatinsCompletionDone ? (
              <>
                <Alert severity="success">Všechny výsledky předoperačních vyšetření jsou dodány.</Alert>
              </>
            ) : (
              <div class="mt-4">
                <Button
                  onClick$={() => {
                    preopDoneAction.submit();
                  }}
                  type="button"
                >
                  Máme všechny výsledky předoperačních vyšetření
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
});

const FileDropAreaSmall = component$(({ label }: { label?: string }) => {
  return (
    <button
      class="relative block w-full rounded-lg border-2 border-dashed border-app-border-base p-6 text-center hover:border-app-border-hover focus:outline-none focus:ring-2 focus:ring-accent-base focus:ring-offset-2"
      type="button"
    >
      <svg
        aria-hidden="true"
        class="mx-auto h-8 w-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <span class="mt-2 block text-sm font-semibold text-app-text-base">{label ?? "Vložit přílohu"}</span>
    </button>
  );
});
