import { Alert, Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";

import { serverGetSession } from "~/routes/plugin@auth";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

// eslint-disable-next-line qwik/loader-location
export const useProcedureQuestionnairePatientInstructionsUpdateAction = routeAction$(async (values, requestEvent) => {
  const { user } = serverGetSession(requestEvent);
  const { procedureId } = requestEvent.params;

  await serverDoneProcedureTask({
    doneBy: user.id,
    procedureId,
    taskKind: "questionnairePatientPreoperativeInstructions",
  });
});

type ProcedureQuestionnairePatientInstructionsProps = {
  actionExpected: boolean;
  questionarFilledWithPatient: boolean;
};

export const ProcedureQuestionnairePatientInstructions = component$(
  ({ actionExpected, questionarFilledWithPatient }: ProcedureQuestionnairePatientInstructionsProps) => {
    const updateAction = useProcedureQuestionnairePatientInstructionsUpdateAction();

    // todo: tato moznost je dostupna len v pripade, ze pacient nezacal vyplnat dotaznik zo sestrou... a ta ho neulozila
    // todo: pokial vyplna online -> potrebujeme zobrazit hlasku, ze ma dat ine instrukcie, ako ked vyplna papierovo

    if (actionExpected) {
      return (
        <>
          <div class="mb-4 text-sm text-app-text-weaker">
            <p>Základní instrukce k vyplnění dotazníku...</p>
            {questionarFilledWithPatient && <Alert severity="info">Dotazník byl vyplněn s pacientem.</Alert>}
          </div>
          <Button
            onClick$={() => {
              updateAction.submit();
            }}
            severity="accent"
            type="button"
            variant="contained"
          >
            Pacient edukuván o vyplnění dotazníku
          </Button>
        </>
      );
    }

    return (
      <Alert class="text-sm" severity="info">
        Pacientovy byly poskytnuty instrukce k vyplnění předoperačního dotazníku.
      </Alert>
    );
  },
);
