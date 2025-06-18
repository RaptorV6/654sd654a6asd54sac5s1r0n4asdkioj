import { component$, Slot } from "@builder.io/qwik";

import { ExpectationReportDialog, ExpectationReportDialogProvider } from "./expectation-report-dialog";

export default component$(() => {
  return (
    <ExpectationReportDialogProvider>
      <Slot />
      <ExpectationReportDialog />
    </ExpectationReportDialogProvider>
  );
});
