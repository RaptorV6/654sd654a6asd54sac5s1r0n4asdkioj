import type { Signal } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

import type { PatientRequestWithPatient } from "./types";

import { PatientInfo } from "./patient-info";
import { requestDetailMap } from "./request-detail-map";

type RequestListItemDetailProps = {
  employeeResponsibleIdSig: Signal<null | string>;
  request: PatientRequestWithPatient;
  showRequestFullSig: Signal<boolean>;
};

export const RequestListItemDetail = component$<RequestListItemDetailProps>(({ request, showRequestFullSig }) => {
  const detail = requestDetailMap[request.requestType];

  return (
    <div class="space-y-4 border-t p-4">
      <PatientInfo patient={request.patient} />
      {detail.Component && (
        <detail.Component request={request as typeof detail.request} showRequestFullSig={showRequestFullSig} />
      )}
    </div>
  );
});
