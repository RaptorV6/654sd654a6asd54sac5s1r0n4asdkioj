import { ListItem } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";

import type { PatientRequestWithPatient } from "./types";

import { RequestListItemDetail } from "./request-list-item-detail";
import { RequestListItemHeader } from "./request-list-item-header";

type RequestListItemProps = {
  request: PatientRequestWithPatient;
};

export const RequestListItem = component$<RequestListItemProps>(({ request }) => {
  const showRequestFullSig = useSignal(false);
  const employeeResponsibleIdSig = useSignal(request.employeeResponsibleId);

  return (
    <>
      {!request.done && (
        <ListItem>
          <RequestListItemHeader
            employeeResponsibleIdSig={employeeResponsibleIdSig}
            request={request}
            showRequestFullSig={showRequestFullSig}
          />
          {showRequestFullSig.value && (
            <RequestListItemDetail
              employeeResponsibleIdSig={employeeResponsibleIdSig}
              request={request}
              showRequestFullSig={showRequestFullSig}
            />
          )}
        </ListItem>
      )}
    </>
  );
});
