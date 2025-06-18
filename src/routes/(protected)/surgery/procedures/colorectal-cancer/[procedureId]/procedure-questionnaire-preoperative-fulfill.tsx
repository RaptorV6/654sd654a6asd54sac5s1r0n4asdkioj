import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";

import { HelperText } from "~/components/helper-text";
import { serverGetSession } from "~/routes/plugin@auth";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

// eslint-disable-next-line qwik/loader-location
export const useProcedureQuestionnairePreoperativeFulfillAction = routeAction$(
  async (values, requestEvent) => {
    const { user } = serverGetSession(requestEvent);
    const { procedureId } = requestEvent.params;

    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId,
      // result: values.result,
      taskKind: "questionnairePatientPreoperativeFulfill",
    });
  },
  // zod$({
  //   // reus
  // }),
);

type ProcedureQuestionnairePreoperativeFulfillProps = {
  actionExpected: boolean;
};

export const ProcedureQuestionnairePreoperativeFulfill = component$(
  ({ actionExpected }: ProcedureQuestionnairePreoperativeFulfillProps) => {
    const updateAction = useProcedureQuestionnairePreoperativeFulfillAction();

    return (
      <div class="space-y-4">
        <div>
          <Button
            onClick$={() => {
              // todo: generate task for patient
              // updateAction.submit({ result: { method: "onside" } });

              // todo: FIXME fill preop form with patient...
              // eslint-disable-next-line no-alert
              alert("Akce prozatím není podporována");
            }}
            // severity="accent"
            type="button"
            variant="outline"
          >
            Vyplnit dotazník s pacientem na místě v mém počítači
          </Button>
          <HelperText>Otevře se okno, ve kterém vyplníte dotazník s asistencí pacienta.</HelperText>
          <HelperText>
            V prípadě, že pacient nebude znát odpovědi na některou z otázek na místě můžete následně dotazník odeslat k
            doplnění v <span class="italic">akeso.online</span>, nebo dotazník vytisknout a předat jej pacientovi k
            doplnění.
          </HelperText>
        </div>

        <div>
          <Button
            onClick$={() => {
              updateAction.submit();
            }}
            severity={actionExpected ? "accent" : "none"}
            type="button"
          >
            Pacientovi podána pomoc s vyplněním dotazníku
          </Button>
        </div>
      </div>
    );
  },
);
