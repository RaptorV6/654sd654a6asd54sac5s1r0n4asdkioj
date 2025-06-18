import { List } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import type { PatientRequestWithPatient } from "./types";

import { RequestListItem } from "./request-list-item";

type RequestListProps = {
  requests: PatientRequestWithPatient[];
};

export const RequestList = component$<RequestListProps>(({ requests }) => {
  return (
    <List>
      {requests.map((request) => (
        <RequestListItem key={request.id} request={request} />
      ))}
    </List>
  );
});
