import { i18nFormatDate } from "@akeso/ui-components";
import { component$, type Signal } from "@builder.io/qwik";

import type { PatientRequestWithPatient } from "./types";

import { CopySpan } from "./copy-span";
import { IconWithTitle } from "./icon-with-title";
import { RequestListItemHeaderAction } from "./request-list-item-header-action";

type RequestListItemHeaderProps = {
  employeeResponsibleIdSig: Signal<null | string>;
  request: PatientRequestWithPatient;
  showRequestFullSig: Signal<boolean>;
};

export const RequestListItemHeader = component$<RequestListItemHeaderProps>(
  ({ employeeResponsibleIdSig, request, showRequestFullSig }) => {
    return (
      <div class="grid grid-cols-1 p-2 md:grid-cols-[2fr_2fr_1fr]">
        <IconWithTitle
          employeeResponsibleId={request.employeeResponsibleId}
          requestId={request.id}
          requestType={request.requestType}
        />
        <div class="pl-4 md:border-l">
          <dl class="grid grid-cols-2 gap-x-4 gap-y-2">
            <dt>Číslo pojištěnce:</dt>
            <dd class="flex flex-row items-center font-bold">
              {request.patient.insuranceNumber}{" "}
              {request.patient.insuranceNumber && (
                <CopySpan textToCopy={request.patient.insuranceNumber} title="Zkopírovat číslo pojištěnce" />
              )}
            </dd>
            <dt> Datum vytvoření:</dt>
            <dd class="font-bold">{i18nFormatDate(request.date)}</dd>
          </dl>
        </div>
        <RequestListItemHeaderAction
          employeeResponsibleIdSig={employeeResponsibleIdSig}
          showRequestFullSig={showRequestFullSig}
        />
      </div>
    );
  },
);
