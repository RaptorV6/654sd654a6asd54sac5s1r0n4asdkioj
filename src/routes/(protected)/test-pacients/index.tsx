import { Card, CardBody, CardHeader, CardHeaderTitle } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";
import { createIrisClient } from "~/iris";

// eslint-disable-next-line qwik/loader-location
export const usePatientsData = routeLoader$(async ({ env }) => {
  try {
    const { patients } = await createIrisClient(env).query({
      patients: {
        __args: {
          first: 10,
          sortBy: {
            direction: "ASC",
            field: "FULL_NAME",
          },
        },
        nodes: {
          birthRegistrationNumber: true,
          fullName: true,
          id: true,
          insuranceNumber: true,
          phoneNumber: true,
        },
      },
    });

    return { error: null, patients: patients.nodes, success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      patients: [],
      success: false,
    };
  }
});

export default component$(() => {
  const patientsData = usePatientsData();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Test - Načtení pacientů z Iris</PageHeaderTitle>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>Test pacientů</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <div class="space-y-4">
        <Card>
          <CardHeader>
            <CardHeaderTitle>Stav připojení</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            {patientsData.value.success ? (
              <div class="text-green-600">
                Tyvole fakin připojení k iris funguje! Načteno {patientsData.value.patients.length} pacientů juchů!
              </div>
            ) : (
              <div class="text-red-600">A doprdele! připojení kleklo: {patientsData.value.error}</div>
            )}
          </CardBody>
        </Card>

        {patientsData.value.success && (
          <Card>
            <CardHeader>
              <CardHeaderTitle>Seznam pacientů</CardHeaderTitle>
            </CardHeader>
            <CardBody>
              <div class="space-y-2">
                {patientsData.value.patients.map((patient) => (
                  <div class="border-b pb-2" key={patient.id}>
                    <div class="font-medium">{patient.fullName}</div>
                    <div class="text-sm text-gray-600">
                      RC: {patient.birthRegistrationNumber} | Pojištění: {patient.insuranceNumber} | Tel:{" "}
                      {patient.phoneNumber}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
});
