import type { QRL } from "@builder.io/qwik";

import { Alert, Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@akeso/ui-components";
import {
  $,
  component$,
  createContextId,
  Slot,
  useComputed$,
  useContext,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";

type ExpectationReportDialogContext = {
  closeDialog: QRL<(this: ExpectationReportDialogContext) => void>;
  expectationWasClosed: boolean;
  result:
    | {
        report: {
          id: string;
          reportContent: string;
        };
      }
    | { closeFailed: true }
    | { nothingToReport: true }
    | { reportFailed: true }
    | null;
};

const ExpectationReportDialogContextId = createContextId<ExpectationReportDialogContext>(
  "ExpectationReportDialogContext",
);

export const useExpectationReportDialogContext = () => useContext(ExpectationReportDialogContextId);

export const ExpectationReportDialogProvider = component$(() => {
  const resultContextStore = useStore<ExpectationReportDialogContext>({
    closeDialog: $(function (this: ExpectationReportDialogContext) {
      this.result = null;
      this.expectationWasClosed = false;
    }),
    expectationWasClosed: false,
    result: null,
  });

  useContextProvider(ExpectationReportDialogContextId, resultContextStore);

  return <Slot />;
});

export const ExpectationReportDialog = component$(() => {
  const ctx = useExpectationReportDialogContext();
  const showResultDialogSig = useComputed$(() => ctx.result != null);

  return (
    <Dialog bind:show={showResultDialogSig}>
      <DialogHeader>Report předání další směně</DialogHeader>
      <DialogBody>
        {ctx.result && "report" in ctx.result && (
          <>
            <p>Obsah reportu</p>
            <pre>{ctx.result.report.reportContent}</pre>
          </>
        )}
        {ctx.result && "nothingToReport" in ctx.result && (
          <>
            <p class="mt-2 font-semibold">Od posledního předání další směně neproběhly žádné změny.</p>
            <p class="mt-2">Report nebyl vygenerován.</p>
          </>
        )}
        {ctx.result && "reportFailed" in ctx.result && (
          <>
            <Alert severity="error">Při generování reportu předání další směně došlo k chybě.</Alert>
          </>
        )}
        {ctx.result && "closeFailed" in ctx.result && (
          <>
            <Alert severity="error">Při ukončení expektace došlo k chybě.</Alert>
          </>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          onClick$={() => {
            ctx.closeDialog();
          }}
          type="button"
        >
          Zavřít
        </Button>
      </DialogFooter>
    </Dialog>
  );
});
