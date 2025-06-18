import { Alert, Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";

import { serverGetSession } from "~/routes/plugin@auth";
import { serverUpdateProcedure } from "~/server/rpc/procedure";
import { serverCountProcedureTasksForStep, serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

// eslint-disable-next-line qwik/loader-location
export const useProcedureNextStepsEducationUpdateAction = routeAction$(async (values, requestEvent) => {
  const { user } = serverGetSession(requestEvent);
  const { procedureId } = requestEvent.params;

  await serverDoneProcedureTask({
    doneBy: user.id,
    procedureId,
    taskKind: "nextStepsPatientEducation",
  });

  const todoTasks = await serverCountProcedureTasksForStep({
    procedureId,
    status: "todo",
    step: { major: 1, minor: 2 },
  });

  if (todoTasks === 0) {
    await serverUpdateProcedure(requestEvent.env, {
      data: {
        step: { major: 2, minor: 1 },
      },
      procedureId: procedureId,
    });
  }
});

type ProcedureNextStepsEducationProps = {
  actionExpected: boolean;
};

export const ProcedureNextStepsEducation = component$(({ actionExpected }: ProcedureNextStepsEducationProps) => {
  const updateAction = useProcedureNextStepsEducationUpdateAction();

  // todo: tato moznost je dostupna len v pripade, ze pacient nezacal vyplnat dotaznik zo sestrou... a ta ho neulozila
  // todo: pokial vyplna online -> potrebujeme zobrazit hlasku, ze ma dat ine instrukcie, ako ked vyplna papierovo

  if (actionExpected) {
    return (
      <>
        <div class="mb-4 text-sm text-app-text-weaker">
          <p>Základní edukační body k dalšímu postupu...</p>
        </div>
        <Button
          onClick$={() => {
            updateAction.submit();
          }}
          severity="accent"
          type="button"
          variant="contained"
        >
          Pacient byl edukován o dalším postupu
        </Button>
      </>
    );
  }

  return (
    <Alert class="text-sm" severity="info">
      Pacient byl seznámen s dalším postupem.
    </Alert>
  );
});
