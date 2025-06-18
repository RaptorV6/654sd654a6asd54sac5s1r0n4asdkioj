import type { AlertSeverity } from "@akeso/ui-components";
import type { JSXOutput } from "@builder.io/qwik";

import { Alert, Card, CardBody } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { useAuthUser } from "~/routes/plugin@auth";

import { useProcedureContext } from "./procedure-provider";

export const ProcedureActivityInfoPanel = component$(() => {
  const { activity, procedure } = useProcedureContext();
  const user = useAuthUser();

  // TODO: extract this to helper.
  if ((user as any).role === "administrative" && (procedure.step.major < 2 || procedure.step.major > 4)) return null;

  if (activity === "FILL") return null;

  let message: JSXOutput = "";
  let severity: AlertSeverity = "info";

  switch (activity) {
    case "ALL_DONE":
      message = "Všechno je hotovo... Procedura je ukončena";
      break;
    case "CANCELED":
      message = "Procedura byla předčasně ukončena";
      severity = "warning";
      break;
    case "DONE":
      message = "Procedura byla dokončena";
      severity = "success";
      break;
    case "WAITING":
      message = "Čekáte na ukončení předchozího kroku.";
      break;
    case "WAITING_NOTING_TODAY":
      message = "Pro dnešek nemáte žádné úkoly.";
      break;
  }

  return (
    <Card class="mt-4">
      <CardBody>
        <Alert severity={severity}>{message}</Alert>
      </CardBody>
    </Card>
  );
});
