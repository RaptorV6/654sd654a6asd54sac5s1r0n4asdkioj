import { Card, CardBody } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { PatientDetailDrawerAction } from "~/components/patient-detail-drawer-action";
import { ProcedureProgressIndicator } from "~/components/procedure-progress-indicator";

import { DataPreview, DataPreviewField, DataPreviewFieldLabel, DataPreviewFieldValue } from "./data-preview";
import { useProcedureContext } from "./procedure-provider";

export const ProcedureHeader = component$(() => {
  const { procedure } = useProcedureContext();

  return (
    <Card>
      <CardBody>
        <ProcedureProgressIndicator
          class="px-6 py-4"
          stepCurrentMajor={procedure.step.major}
          steps={procedure.meta.steps}
          title={procedure.meta.name}
        />

        <DataPreview class="border-t border-app-border-base">
          <DataPreviewField>
            <DataPreviewFieldLabel>Pacient</DataPreviewFieldLabel>
            <DataPreviewFieldValue>
              <DataPreview class="-mx-6 -my-6">
                <DataPreviewField>
                  <DataPreviewFieldLabel>Jméno</DataPreviewFieldLabel>
                  <DataPreviewFieldValue>
                    <div class="flex items-start">
                      <div class="flex-1">{procedure.patient.fullName}</div>
                      <div aria-hidden>
                        <PatientDetailDrawerAction patientId={procedure.patient.id} size="xs">
                          Detail
                        </PatientDetailDrawerAction>
                      </div>
                    </div>
                  </DataPreviewFieldValue>
                </DataPreviewField>
                <DataPreviewField>
                  <DataPreviewFieldLabel>Rodné číslo</DataPreviewFieldLabel>
                  <DataPreviewFieldValue>{procedure.patient.birthRegistrationNumber}</DataPreviewFieldValue>
                </DataPreviewField>
              </DataPreview>
            </DataPreviewFieldValue>
          </DataPreviewField>
        </DataPreview>
      </CardBody>
    </Card>
  );
});
