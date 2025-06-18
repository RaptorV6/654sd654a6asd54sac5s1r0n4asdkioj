import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import { ActionButton, Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
// eslint-disable-next-line perfectionist/sort-imports
import { routeAction$, z, zod$ } from "@builder.io/qwik-city";

import { createIrisClient } from "~/iris";
import { useAuthUser } from "~/routes/plugin@auth";

import { useExpectationReportDialogContext } from "../expectation-report-dialog";
import { useExpectationDetailContext } from "./expectation-detail-provider";

async function serverGenerateNextShiftReport(env: EnvGetter, input: { createdById: string; expectationId: string }) {
  const {
    createInternsAmbExpectationChangeReport: { internsAmbExpectationChangeReport },
  } = await createIrisClient(env).mutation({
    createInternsAmbExpectationChangeReport: {
      __args: input,
      internsAmbExpectationChangeReport: {
        id: true,
        reportContent: true,
      },
    },
  });

  return internsAmbExpectationChangeReport;
}

// eslint-disable-next-line qwik/loader-location
export const useGenerateNextShiftReport = routeAction$(
  async (input, { env }) => {
    try {
      const internsAmbExpectationChangeReport = await serverGenerateNextShiftReport(env, input);

      return { data: { internsAmbExpectationChangeReport }, success: true };
    } catch (error) {
      console.error("generateNextShiftReport$ failed with error", error);
      return { failed: true };
    }
  },
  zod$({
    createdById: z.string(),
    expectationId: z.string(),
  }),
);

// eslint-disable-next-line qwik/loader-location
export const useExpectationCloseAction = routeAction$(
  async (input, { env, redirect }) => {
    let internsAmbExpectationChangeReportId: null | string = null;

    try {
      await createIrisClient(env).mutation({
        updateInternsAmbExpectation: {
          __args: {
            input: {
              ...input,
              endAt: new Date(),
              status: "CLOSED",
            },
          },
          internsAmbExpectation: {
            id: true,
          },
        },
      });

      const internsAmbExpectationChangeReport = await serverGenerateNextShiftReport(env, {
        createdById: input.updatedById,
        expectationId: input.id,
      });

      // return { data: { internsAmbExpectation, internsAmbExpectationChangeReport }, success: true };

      internsAmbExpectationChangeReportId = internsAmbExpectationChangeReport?.id ?? null;
    } catch (error) {
      console.error("closeExpectation$ failed with error", error);
      return { failed: true };
    }

    // If everythig is OK, redirect to expectations list
    throw redirect(
      303,
      `/interns/ambulance/expectations/${internsAmbExpectationChangeReportId ? `?${new URLSearchParams({ reportId: internsAmbExpectationChangeReportId })}` : ""}`,
    );
  },
  zod$({
    id: z.string(),
    updatedById: z.string(),
  }),
);

export const ExpectationDetailActions = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();
  const generateReportAction = useGenerateNextShiftReport();
  const closeExpectationAction = useExpectationCloseAction();

  const showEndDialog = useSignal(false);
  const showNextShiftDialog = useSignal(false);
  const resultDialogCtx = useExpectationReportDialogContext();

  useTask$(({ track }) => {
    const reportRes = track(() => generateReportAction.value);

    if (isServer) return;

    if (reportRes) {
      showNextShiftDialog.value = false;

      if (reportRes.success) {
        if (reportRes.data.internsAmbExpectationChangeReport) {
          resultDialogCtx.result = { report: reportRes.data.internsAmbExpectationChangeReport };
        } else {
          resultDialogCtx.result = { nothingToReport: true };
        }
      } else {
        resultDialogCtx.result = { reportFailed: true };
      }
    }
  });

  useTask$(({ track }) => {
    const closeRes = track(() => closeExpectationAction.value);

    if (isServer) return;

    if (closeRes) {
      // Zavřít dialog
      showEndDialog.value = false;

      if (closeRes.failed) {
        resultDialogCtx.result = { closeFailed: true };
      }
    }
  });

  // const handleEndClick = $(async () => {
  //   // Logika pro mutation pro tlačítko "Ukončit"
  //   // eslint-disable-next-line no-console
  //   console.log("Ukončit", detailCtx.expectation.id);

  //   const closeRes = await closeExpectation$({ id: detailCtx.expectation.id, updatedById: user.id });

  //   // Zavřít dialog
  //   showEndDialog.value = false;

  //   if (closeRes.failed) {
  //     resultContestStore.result = { closeFailed: true };
  //     return;
  //   }

  //   //
  //   expectationClosedSig.value = true;

  //   await handleNextShiftClick();
  // });

  return (
    <div class="-mx-4 mt-4 flex justify-between border-t border-app-border-base px-4 pt-4">
      {/* Button for ending the expectation */}
      <Button
        onClick$={() => {
          showEndDialog.value = true;
        }}
        severity="danger"
        type="button"
      >
        Ukončit
      </Button>
      <Dialog bind:show={showEndDialog}>
        <DialogHeader>Potvrzení ukončení</DialogHeader>
        <DialogBody>
          <p class="font-bold">Opravdu chcete ukončit expektaci?</p>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick$={() => {
              showEndDialog.value = false;
            }}
            type="button"
          >
            Zrušit
          </Button>
          <ActionButton
            action={closeExpectationAction}
            onClick$={() => {
              showEndDialog.value = false;
            }}
            params={{
              id: detailCtx.expectation.id,
              updatedById: user.id,
            }}
            severity="danger"
          >
            Ukončit
          </ActionButton>
        </DialogFooter>
      </Dialog>

      {/* Button for handing over to the next shift */}
      <Button
        onClick$={() => {
          showNextShiftDialog.value = true;
        }}
        severity="warning"
        type="button"
      >
        Předání další směně
      </Button>
      <Dialog bind:show={showNextShiftDialog}>
        <DialogHeader>Potvrzení předání</DialogHeader>
        <DialogBody>
          <p class="font-bold">Opravdu chcete předat další směně?</p>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick$={() => {
              showNextShiftDialog.value = false;
            }}
            type="button"
          >
            Zrušit
          </Button>
          <ActionButton
            action={generateReportAction}
            params={{
              createdById: user.id,
              expectationId: detailCtx.expectation.id,
            }}
            severity="warning"
          >
            Předat
          </ActionButton>
        </DialogFooter>
      </Dialog>
    </div>
  );
});
