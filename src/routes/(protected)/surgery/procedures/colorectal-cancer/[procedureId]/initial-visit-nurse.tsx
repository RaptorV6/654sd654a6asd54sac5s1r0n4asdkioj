import { Timeline, TimelineSlot, TimelineSlotContent } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { InitialVisitWrapper } from "./initial-visit-wrapper";
import { ProcedureNextStepsEducation } from "./procedure-next-steps-education";
import { useProcedureContext } from "./procedure-provider";
import { ProcedureQuestionnairePatientInstructions } from "./procedure-questionnaire-patient-instructions";
import { ProcedureQuestionnairePatientRelease } from "./procedure-questionnaire-patient-release";
import { ProcedureRequestPreoperative } from "./procedure-request-preoperative";
import { useFindTask } from "./utils";

export const InitialVisitNurse = component$(() => {
  const { procedure } = useProcedureContext();
  const { findTask, isTaskDone } = useFindTask();

  const isRequestDone = isTaskDone("requrestPreoperativeExaminationRelease");
  const isQuestReleasedDone = isTaskDone("questionnairePatientPreoperativeRelease");
  const isQuestInstrDone = isTaskDone("questionnairePatientPreoperativeInstructions");
  const isEducDone = isTaskDone("nextStepsPatientEducation");

  // Correct typing prevention
  const { surgery } = procedure;

  return (
    <InitialVisitWrapper role="NURSE">
      <Timeline>
        <TimelineSlot
          pulse={!isRequestDone}
          severity={isRequestDone ? "success" : "progress"}
          title="Vydání Žádosti o předoperační vyšetření"
        >
          <TimelineSlotContent bordered={!isRequestDone}>
            {surgery && (
              <ProcedureRequestPreoperative actionExpected={!isRequestDone} procedure={{ ...procedure, surgery }} />
            )}
          </TimelineSlotContent>
        </TimelineSlot>

        {isRequestDone && (
          <>
            <TimelineSlot
              pulse={!isQuestReleasedDone}
              severity={!isQuestReleasedDone ? "progress" : "success"}
              title="Vydání předoperačního dotazníku pacientovi"
            >
              <TimelineSlotContent bordered={!isQuestReleasedDone}>
                <ProcedureQuestionnairePatientRelease actionExpected={!isQuestReleasedDone} procedure={procedure} />
              </TimelineSlotContent>
            </TimelineSlot>
            {isQuestReleasedDone && (
              <>
                <TimelineSlot
                  pulse={!isQuestInstrDone}
                  severity={!isQuestInstrDone ? "progress" : "success"}
                  title="Instrukce k vyplnění dotazníku"
                >
                  <TimelineSlotContent bordered={!isQuestInstrDone}>
                    <ProcedureQuestionnairePatientInstructions
                      actionExpected={!isQuestInstrDone}
                      questionarFilledWithPatient={
                        findTask("questionnairePatientPreoperativeRelease")?.result.method === "onside"
                      }
                    />
                  </TimelineSlotContent>
                </TimelineSlot>
                {isQuestInstrDone && (
                  <TimelineSlot
                    pulse={!isEducDone}
                    severity={isEducDone ? "success" : "progress"}
                    title="Edukace o dalším postupu"
                  >
                    <TimelineSlotContent bordered={!isEducDone}>
                      <ProcedureNextStepsEducation actionExpected={!isEducDone} />
                    </TimelineSlotContent>
                  </TimelineSlot>
                )}
              </>
            )}
          </>
        )}
      </Timeline>
    </InitialVisitWrapper>
  );
});
