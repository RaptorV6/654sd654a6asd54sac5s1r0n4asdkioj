import { Timeline, TimelineSlot, TimelineSlotContent } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { InitialVisitWrapper } from "./initial-visit-wrapper";
import { ProcedureFollowUpExamination } from "./procedure-follow-up-examination";
import { ProcedureQuestionnairePreoperativeFulfill } from "./procedure-questionnaire-preoperative-fulfill";
import { ProcedureReportingMethod } from "./procedure-reporting-method";
import { ProcedureStagingExamsReservation } from "./procedure-staging-exams-reservation";
import { useFindTask } from "./utils";

export const InitialVisitAdministrative = component$(() => {
  const { isTaskDone } = useFindTask();

  const isStagingReservation = isTaskDone("stagingExaminationAppointmetsReservation");
  const isFollowUpExaminationReservation = isTaskDone("followUpExaminationAppointmetReservation");
  const isStagingReportingMethod = isTaskDone("stagingReportsDeliveryMethod");
  const isPreoperativeMethod = isTaskDone("preoperativeReportsDeliveryMethod");
  const isPreoperativeQuestionnare = isTaskDone("questionnairePatientPreoperativeFulfill");

  return (
    <InitialVisitWrapper role="ADMINISTRATIVE">
      <Timeline>
        <TimelineSlot
          pulse={!isStagingReservation}
          severity={isStagingReservation ? "success" : "progress"}
          title="Objenání stagingových vyšetření"
        >
          <TimelineSlotContent bordered={!isStagingReservation}>
            <ProcedureStagingExamsReservation actionExpected={!isStagingReservation} />
          </TimelineSlotContent>
        </TimelineSlot>
        {isStagingReservation && (
          <>
            <TimelineSlot
              pulse={!isFollowUpExaminationReservation}
              severity={isFollowUpExaminationReservation ? "success" : "progress"}
              title="Objednání kontrolního vyšetření"
            >
              <TimelineSlotContent bordered={!isFollowUpExaminationReservation}>
                <ProcedureFollowUpExamination actionExpected={!isFollowUpExaminationReservation} />
              </TimelineSlotContent>
            </TimelineSlot>

            {isFollowUpExaminationReservation && (
              <>
                <TimelineSlot
                  pulse={!isStagingReportingMethod}
                  severity={isStagingReportingMethod ? "success" : "progress"}
                  title="Dohoda o způsobu předání nálezů stagingových vyšetření"
                >
                  <TimelineSlotContent bordered={!isStagingReportingMethod}>
                    <ProcedureReportingMethod
                      actionExpected={!isStagingReportingMethod}
                      taskCode="stagingReportsDeliveryMethod"
                    />
                  </TimelineSlotContent>
                </TimelineSlot>

                {isStagingReportingMethod && (
                  <>
                    <TimelineSlot
                      pulse={!isPreoperativeMethod}
                      severity={isPreoperativeMethod ? "success" : "progress"}
                      title="Dohoda o způsobu předání nálezů předoperačních vyšetření"
                    >
                      <TimelineSlotContent bordered={!isPreoperativeMethod}>
                        <ProcedureReportingMethod
                          actionExpected={!isPreoperativeMethod}
                          taskCode="preoperativeReportsDeliveryMethod"
                        />
                      </TimelineSlotContent>
                    </TimelineSlot>

                    {isPreoperativeMethod && (
                      <TimelineSlot
                        pulse={!isPreoperativeQuestionnare}
                        severity={isPreoperativeQuestionnare ? "success" : "progress"}
                        title="Pomoc s vyplněním předoperačního dotazníku"
                      >
                        <TimelineSlotContent bordered={!isPreoperativeQuestionnare}>
                          <ProcedureQuestionnairePreoperativeFulfill actionExpected={!isPreoperativeQuestionnare} />
                        </TimelineSlotContent>
                      </TimelineSlot>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Timeline>
    </InitialVisitWrapper>
  );
});
