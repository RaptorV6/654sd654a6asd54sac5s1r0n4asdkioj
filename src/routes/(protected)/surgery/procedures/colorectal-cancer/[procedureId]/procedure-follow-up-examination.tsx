import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";

import { serverGetSession } from "~/routes/plugin@auth";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

// eslint-disable-next-line qwik/loader-location
export const useProcedureFollowUpExaminationAction = routeAction$(async (_, requestEvent) => {
  const { user } = serverGetSession(requestEvent);
  const { procedureId } = requestEvent.params;

  await serverDoneProcedureTask({
    doneBy: user.id,
    procedureId,
    taskKind: "followUpExaminationAppointmetReservation",
  });
});

type ProcedureFollowUpExaminationProps = {
  actionExpected: boolean;
};

export const ProcedureFollowUpExamination = component$(({ actionExpected }: ProcedureFollowUpExaminationProps) => {
  const action = useProcedureFollowUpExaminationAction();
  return (
    <>
      <Button href="https://amos.nember.cz" severity={actionExpected ? "accent" : "none"} target="_blank" type="link">
        {actionExpected ? "Objednat kontrolní vyšetření v Amos" : "Přeobjednat kontrolní vyšetření v Amos"}
      </Button>
      {actionExpected && (
        <div class="mt-4">
          <Button
            onClick$={async () => {
              await action.submit();
            }}
            type="button"
          >
            Kontrolní vyšetření objednány
          </Button>
        </div>
      )}
    </>
  );
});
