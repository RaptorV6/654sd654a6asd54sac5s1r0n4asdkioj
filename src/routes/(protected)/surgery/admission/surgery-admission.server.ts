import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import { server$ } from "@builder.io/qwik-city";

import type { PatientGenqlSelection } from "~/iris";

import { createIrisClient } from "~/iris";

export type FetchPatientInput = { documentationAkordId: number };

const PatientFragment = {
  age: true,
  birthRegistrationNumber: true,
  fullName: true,
  id: true,
  sex: true,
} satisfies PatientGenqlSelection;

export const fetchDocumentation = async (env: EnvGetter, input: FetchPatientInput) => {
  const { documentation } = await createIrisClient(env).query({
    documentation: {
      __args: {
        documentationAkordId: input.documentationAkordId,
      },
      patient: PatientFragment,
    },
  });

  return documentation;
};

export const serverResolvePatient = server$(async function (patientId: string) {
  const { patient } = await createIrisClient(this.env).query({
    patient: {
      __args: {
        id: patientId,
      },
      ...PatientFragment,
    },
  });
  return patient;
});

export const serverPatientAnamnesis = server$(async function (patientId: string) {
  const { patientDocumentations } = await createIrisClient(this.env).query({
    patientDocumentations: {
      __args: {
        documentationKind: "ANAMNESIS",
        patientId,
      },
      dataHtml: true,
      date: true,
      description: true,
      id: true,
      methodName: true,
    },
  });

  return patientDocumentations;
});

export const serverPatientAmbulaceReports = server$(async function (patientId: string) {
  const { patientDocumentations } = await createIrisClient(this.env).query({
    patientDocumentations: {
      __args: {
        documentationKind: "AMBULANCE_REPORTS",
        patientId,
      },
      dataHtml: true,
      date: true,
      description: true,
      id: true,
      methodName: true,
    },
  });

  return patientDocumentations;
});
