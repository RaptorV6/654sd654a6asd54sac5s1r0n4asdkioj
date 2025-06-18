import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, server$, zod$ } from "@builder.io/qwik-city";

import type { GetRequestPreoperativeExaminationPdfDataProps } from "~/prints/requrest-preoperative-examination.pdf";

import { useShowPageProgressIndicator } from "~/contexts/page-progress-indicator/page-progress-indicator-provider";
import { getRequestPreoperativeExaminationPdfData } from "~/prints/requrest-preoperative-examination.pdf";
import { serverGetSession } from "~/routes/plugin@auth";
import { procedureTaskResultSchema, serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";
import { serverGetPdfAsDataUrl } from "~/server/server-pdf";

// eslint-disable-next-line qwik/loader-location
export const useProcedureRequestPreoperativeUpdateAction = routeAction$(
  async (values, requestEvent) => {
    const { user } = serverGetSession(requestEvent);
    const { procedureId } = requestEvent.params;

    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId,
      result: values.result,
      taskKind: "requrestPreoperativeExaminationRelease",
    });
  },
  zod$({ result: procedureTaskResultSchema("requrestPreoperativeExaminationRelease") }),
);

const getRequestPreoperativePrintOutput$ = server$(async function (
  input: GetRequestPreoperativeExaminationPdfDataProps,
) {
  const pdfData = await getRequestPreoperativeExaminationPdfData(input);
  const pdfDataURL = await serverGetPdfAsDataUrl(this.env, pdfData);

  return pdfDataURL;
});

type ProcedureRequestPreoperativeProps = {
  actionExpected: boolean;
  procedure: GetRequestPreoperativeExaminationPdfDataProps;
};

export const ProcedureRequestPreoperative = component$(
  ({ actionExpected, procedure }: ProcedureRequestPreoperativeProps) => {
    const updateAction = useProcedureRequestPreoperativeUpdateAction();

    const { showPageProgressIndicatorSig } = useShowPageProgressIndicator();
    const pdfDataUrlSig = useSignal<null | string>(null);
    const showPdfDataDialogSig = useSignal(false);

    return (
      <>
        <div class="flex items-center gap-4">
          <Button
            onClick$={async () => {
              showPageProgressIndicatorSig.value = true;

              if (!pdfDataUrlSig.value) {
                pdfDataUrlSig.value = await getRequestPreoperativePrintOutput$(procedure);
              }

              showPageProgressIndicatorSig.value = false;

              if (pdfDataUrlSig.value) {
                showPdfDataDialogSig.value = true;
              }
            }}
            severity={actionExpected ? "highlight" : "none"}
            type="button"
            variant={actionExpected ? "outline" : "soft"}
          >
            {actionExpected ? "Tisk žádosti" : "Opětovný tisk žádosti"}
          </Button>
          {actionExpected && (
            <Button
              onClick$={async () => {
                await updateAction.submit({ result: { method: "paperForm" } });
              }}
              type="button"
            >
              Vydáno papírově
            </Button>
          )}
        </div>
        <Dialog
          bind:show={showPdfDataDialogSig}
          onClose$={async () => {
            await updateAction.submit({ result: { method: "printed" } });
          }}
        >
          <DialogHeader>Tisk Žádosti o předoperační vyšetření</DialogHeader>
          <DialogBody class="h-[70vh] w-[80vw]">
            {pdfDataUrlSig.value && <embed class="h-[70vh] w-[80vw]" src={pdfDataUrlSig.value}></embed>}
          </DialogBody>
          <DialogFooter>
            <Button
              onClick$={() => {
                showPdfDataDialogSig.value = false;
              }}
              type="button"
            >
              Hotovo
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
);
