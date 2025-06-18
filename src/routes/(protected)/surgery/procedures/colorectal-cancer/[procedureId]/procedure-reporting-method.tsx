import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeAction$, z, zod$ } from "@builder.io/qwik-city";

import { serverGetSession } from "~/routes/plugin@auth";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

import { useFindTask } from "./utils";

const supportedTaskCodes = ["stagingReportsDeliveryMethod", "preoperativeReportsDeliveryMethod"] as const;
type SupportedTasCode = (typeof supportedTaskCodes)[number];

// eslint-disable-next-line qwik/loader-location
export const useProcedureReportingMethodAction = routeAction$(
  async (values, requestEvent) => {
    const { user } = serverGetSession(requestEvent);
    const { procedureId } = requestEvent.params;

    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId,
      result: {
        method: values.method,
      },
      taskKind: values.taskCode,
    });
  },
  zod$({
    method: z.enum(["email", "personally"]),
    taskCode: z.enum(supportedTaskCodes),
  }),
);

type ProcedureReportingMethodProps = {
  actionExpected: boolean;
  taskCode: SupportedTasCode;
};

export const ProcedureReportingMethod = component$(({ actionExpected, taskCode }: ProcedureReportingMethodProps) => {
  const { findTask } = useFindTask();
  const action = useProcedureReportingMethodAction();

  const tsk = findTask(taskCode);

  return (
    <div class="flex flex-wrap gap-4">
      <Button
        onClick$={() => {
          action.submit({
            method: "email",
            taskCode,
          });
        }}
        severity={actionExpected || tsk?.result.method === "email" ? "accent" : "none"}
        type="button"
        variant={actionExpected ? "soft" : "outline"}
      >
        Emailem
      </Button>
      <Button
        onClick$={() => {
          action.submit({
            method: "personally",
            taskCode,
          });
        }}
        severity={!actionExpected && tsk?.result.method === "personally" ? "accent" : "none"}
        type="button"
        variant={actionExpected ? "soft" : "outline"}
      >
        Osobně
      </Button>
    </div>
  );
});
