import { Card, CardBody, CardHeader, CardHeaderTitle } from "@akeso/ui-components";
import { component$, useStore } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { PageHeader } from "~/components/page-header";
import { createIrisClient } from "~/iris";

import type { PatientForRequestDisplay, PatientRequestWithPatient } from "./types";

import { _mockRequests } from "./_mockRequests";
import { RequestList } from "./request-list";

export const useRequests = routeLoader$<PatientRequestWithPatient[]>(async (event) => {
  const requests = _mockRequests.filter((req) => !req.done);
  const iris = createIrisClient(event.env);

  const enrichedRequests = await Promise.all(
    requests.map(async (request) => {
      const { patient } = await iris.query({
        patient: {
          __args: { id: request.patientId },
          birthRegistrationNumber: true,
          insuranceNumber: true,
          phoneNumber: true,
          veryFullName: true,
        },
      });

      const mappedPatient: PatientForRequestDisplay = {
        birthRegistrationNumber: patient?.birthRegistrationNumber ?? "",
        insuranceNumber: patient?.insuranceNumber ?? "",
        phoneNumber: patient?.phoneNumber ?? null,
        veryFullName: patient?.veryFullName ?? "",
      };

      return {
        ...request,
        patient: mappedPatient,
      };
    }),
  );

  const sortedRequests = enrichedRequests.sort((a, b) => {
    const aHasEmployee = !!a.employeeResponsibleId;
    const bHasEmployee = !!b.employeeResponsibleId;

    // nejprve nepřevzaté requesty, potom převzaté
    if (aHasEmployee !== bHasEmployee) {
      return aHasEmployee ? 1 : -1;
    }

    // v rámci převzatých i nepřevzatých zvlášť se řadí podle data od nejstarších
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  //vrací seřazené requesty, každý má připojené info o pacientovi
  return sortedRequests;
});

export default component$(() => {
  const sortedRequests = useRequests();
  const sortedRequestsStore = useStore<PatientRequestWithPatient[]>(sortedRequests.value);
  return (
    <>
      <PageHeader>Salus požadavky</PageHeader>
      <Card>
        <CardHeader>
          <CardHeaderTitle>Typ požadavku / ID</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <RequestList requests={sortedRequestsStore} />
        </CardBody>
      </Card>
    </>
  );
});
