import { ActionButton, Alert, Button, Timeline, TimelineSlot, TimelineSlotContent } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";
import { globalAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";

import type { PatientMedicalTestMustResult, PatientMedicalTestTugResult } from "~/types/patient-medical-tests";

import { EditorOutpatientReport } from "~/components/editor-outpatient-report";
import { serverGetSession } from "~/routes/plugin@auth";
import { serverFindPatientApplicationForms } from "~/server/rpc/application-form";
import { serverFindProcedureMedicalTests } from "~/server/rpc/patient-medical-test";
import { serverGetProcedure, serverGetProcedurePatientId } from "~/server/rpc/procedure";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";
import { serverCreateTodoTask } from "~/server/rpc/todo-task";

import { InitialVisitWrapper } from "./initial-visit-wrapper";
import { ProcedureApplicationFormsPrint } from "./procedure-application-forms-print";
import { ProcedureAsa } from "./procedure-asa";
import { ProcedureDiagnosisConfirmation } from "./procedure-diagnosis-confirmation";
import { useProcedureContext } from "./procedure-provider";
import { ProcedureSurgery } from "./procedure-surgery";
import { ProcedureTestMust } from "./procedure-test-must";
import { ProcedureTestTug } from "./procedure-test-tug";

// eslint-disable-next-line qwik/loader-location
export const useInitialVisitDoctorData = routeLoader$(async (requestEvent) => {
  const { procedureId } = requestEvent.params;
  const patientId = await serverGetProcedurePatientId({ procedureId });

  if (patientId == null) {
    throw new Error("Procedure patientId not resolved.");
  }

  const [patientHasApplicationForms, procedureTests] = await Promise.all([
    serverFindPatientApplicationForms(requestEvent.env, { noOlderThenDays: 1, patientId }).then(
      (r) => r.filter((i) => !!i.pdfBase64).map((i) => i.titleText).length > 0,
    ),
    serverFindProcedureMedicalTests({
      onlyOfKind: ["must", "tug"],
      procedureId,
    }),
  ]);

  return { patientHasApplicationForms, procedureTests };
});

// eslint-disable-next-line qwik/loader-location
export const useProcedureIntialVisitDone = globalAction$(
  async (values, requestEvent) => {
    const { user } = serverGetSession(requestEvent);

    // TODO: ulozit ambulatni zpravu

    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId: values.procedureId,
      taskKind: "outpatientReport",
    });

    // TODO: saving of todo taks realize esle how
    const procedure = await serverGetProcedure(requestEvent.env, { procedureId: values.procedureId });
    if (procedure) {
      await serverCreateTodoTask(requestEvent.env, {
        dueByDepartment: "1",
        dueByDepartmentRole: "nurse",
        href: `/surgery/procedures/colorectal-cancer/${values.procedureId}/`,
        procedureId: values.procedureId,
        subTitle: `${procedure.patient.fullName} - ${procedure.meta.name}`,
        title: "Doplňte informace do postupu.",
      });

      await serverCreateTodoTask(requestEvent.env, {
        dueByDepartment: "1",
        dueByDepartmentRole: "administrative",
        href: `/surgery/procedures/colorectal-cancer/${values.procedureId}/`,
        procedureId: values.procedureId,
        subTitle: `${procedure.patient.fullName} - ${procedure.meta.name}`,
        title: "Doplňte informace do postupu.",
      });
    }
  },
  zod$({
    fup: z.enum(["next", "cancel"]),
    procedureId: z.string(),
  }),
);

export const InitialVisitDoctor = component$(() => {
  const { procedure } = useProcedureContext();
  const dataSig = useInitialVisitDoctorData();
  const doneAction = useProcedureIntialVisitDone();

  const isPrintedSig = useSignal(dataSig.value.patientHasApplicationForms);

  const mustTestResult: null | PatientMedicalTestMustResult =
    dataSig.value.procedureTests.find((t) => t.kind === "must")?.result ?? null;
  const tugTestResult: null | PatientMedicalTestTugResult =
    dataSig.value.procedureTests.find((t) => t.kind === "tug")?.result ?? null;

  return (
    <InitialVisitWrapper role="DOCTOR">
      <Timeline>
        <TimelineSlot
          pulse={procedure.diagnosisConfirmed == null}
          severity={procedure.diagnosisConfirmed == null ? "progress" : "success"}
          title="Potvrzení diagnózy"
        >
          <TimelineSlotContent bordered={procedure.diagnosisConfirmed == null} class="flex items-center gap-2 text-xs">
            <ProcedureDiagnosisConfirmation procedure={procedure} />
          </TimelineSlotContent>
        </TimelineSlot>
        {procedure.diagnosisConfirmed?.status === true && (
          <>
            <TimelineSlot
              pulse={procedure.surgery == null}
              severity={procedure.surgery == null ? "progress" : "success"}
              title="Indikace ke konkrétnímu výkonu"
            >
              <TimelineSlotContent bordered={procedure.surgery === null} class="flex items-center gap-2 text-xs">
                <ProcedureSurgery procedure={procedure} />
              </TimelineSlotContent>
            </TimelineSlot>
            {procedure.surgery != null && (
              <>
                <TimelineSlot
                  pulse={isPrintedSig.value === false}
                  severity={isPrintedSig.value === false ? "progress" : "success"}
                  title="Tisk žádanek na stagingová vyšetření"
                >
                  <TimelineSlotContent bordered={isPrintedSig.value === false}>
                    <ProcedureApplicationFormsPrint
                      actionExpected={isPrintedSig.value === false}
                      onClose$={() => {
                        isPrintedSig.value = true;
                      }}
                      // @ts-expect-error
                      patient={procedure.patient}
                      procedureId={procedure.id}
                      surgeryName={procedure.surgery.name}
                    />
                  </TimelineSlotContent>
                </TimelineSlot>
                {isPrintedSig.value && (
                  <>
                    <TimelineSlot
                      pulse={procedure.asa == null}
                      severity={procedure.asa == null ? "progress" : "success"}
                      title="Určení ASA"
                    >
                      <TimelineSlotContent bordered={procedure.asa == null} class="flex items-center gap-2 text-xs">
                        <ProcedureAsa procedure={procedure} />
                      </TimelineSlotContent>
                    </TimelineSlot>
                    {procedure.asa && (
                      <>
                        <TimelineSlot
                          pulse={mustTestResult == null || tugTestResult == null}
                          severity={mustTestResult == null || tugTestResult == null ? "progress" : "success"}
                          title="Testy podle doporučených postupů pro ERAS"
                        >
                          <TimelineSlotContent bordered={mustTestResult == null || tugTestResult == null} class="py-2">
                            <div class="mt-2 flex flex-wrap items-end gap-4">
                              <ProcedureTestMust procedure={procedure} testResult={mustTestResult} />

                              {mustTestResult != null && mustTestResult.positive && (
                                <div>
                                  <Button
                                    href="https://amos.nember.cz"
                                    severity="accent"
                                    size="xs"
                                    target="_blank"
                                    type="link"
                                    variant="soft"
                                  >
                                    Objednání k nutričnímu specialistovi v Amos
                                  </Button>
                                </div>
                              )}
                            </div>

                            <div class="mt-8 flex flex-wrap items-end gap-4">
                              <ProcedureTestTug procedure={procedure} testResult={tugTestResult} />

                              {tugTestResult != null && tugTestResult.timeInSeconds >= 15 && (
                                <div>
                                  <Alert class="text-xs" severity="warning">
                                    Další postup nutno specifikovat s rehabilitačními lékaři.
                                  </Alert>
                                </div>
                              )}
                            </div>
                          </TimelineSlotContent>
                        </TimelineSlot>
                        {mustTestResult != null && tugTestResult != null && (
                          <TimelineSlot pulse severity="progress" title="Ambulantní zpráva">
                            <TimelineSlotContent>
                              <EditorOutpatientReport
                                surgeryDate={procedure.surgery.date}
                                surgeryName={procedure.surgery.name}
                              />

                              <div class="mt-8 flex justify-end border-t border-app-border-base pt-4">
                                <ActionButton
                                  action={doneAction}
                                  params={{ fup: "next", procedureId: procedure.id }}
                                  severity="accent"
                                  variant="contained"
                                >
                                  Ukončit vstupní návštěvu
                                </ActionButton>
                              </div>
                            </TimelineSlotContent>
                          </TimelineSlot>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {procedure.diagnosisConfirmed?.status === false && (
          <>
            <TimelineSlot title="Diagnoza nepotrvrzena">
              <EditorOutpatientReport surgeryDate={procedure.surgery?.date} surgeryName={procedure.surgery?.name} />
              <div class="mt-8 flex justify-end border-t border-app-border-base pt-4">
                <ActionButton
                  action={doneAction}
                  params={{ fup: "cancel", procedureId: procedure.id }}
                  severity="accent"
                  variant="contained"
                >
                  Ukončit vstupní návštěvu
                </ActionButton>
              </div>
            </TimelineSlot>
          </>
        )}
      </Timeline>
    </InitialVisitWrapper>
  );
});
