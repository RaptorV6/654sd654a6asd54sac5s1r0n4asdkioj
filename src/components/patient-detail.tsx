import { Alert } from "@akeso/ui-components";
import { component$, Resource, useResource$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import { createIrisClient } from "~/iris";

const loadPatientData = server$(async function (patientId: string) {
  const iris = createIrisClient(this.env);

  const { patient } = await iris.query({
    patient: {
      __args: {
        id: patientId,
      },
      address: {
        full: true,
      },
      age: true,
      birthDate: true,
      birthRegistrationNumber: true,
      emailAddress: true,
      firstName: true,
      fullName: true,
      id: true,
      lastName: true,
      phoneNumber: true,
      sex: true,
    },
  });

  return patient;
});

export type PatientDetailProps = {
  patientId: string;
};

export const PatientDetail = component$(({ patientId }: PatientDetailProps) => {
  const patientIdSig = useSignal<string>(patientId);

  useTask$(({ track }) => {
    const nextPatientId = track(() => patientId);
    patientIdSig.value = nextPatientId;
  });

  const patientDetailResource = useResource$(async ({ cleanup, track }) => {
    const patientId = track(() => patientIdSig.value);
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const patient = await loadPatientData(abortController.signal, patientId);
    return patient;
  });

  return (
    <div>
      <Resource
        onPending={() => {
          return <div>Loading...</div>;
        }}
        onResolved={(patient) => (patient == null ? <PatientNotFourd /> : <PatientDetailContent patient={patient} />)}
        value={patientDetailResource}
      />
    </div>
  );
});

const PatientNotFourd = component$(() => {
  return <Alert severity="error">Pacient se nenašel</Alert>;
});

type PatientDetailContentProps = {
  patient: NonNullable<Awaited<ReturnType<typeof loadPatientData>>>;
};
const PatientDetailContent = component$(({ patient }: PatientDetailContentProps) => {
  return (
    <div>
      <div>{patient.id}</div>
      <div>{patient.fullName}</div>
    </div>
  );
});
