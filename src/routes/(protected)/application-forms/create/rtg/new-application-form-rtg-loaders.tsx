import { routeLoader$ } from "@builder.io/qwik-city";

import type { FormInput } from "./new-application-form-rtg-form";

// eslint-disable-next-line qwik/loader-location
export const useFormInitialData = routeLoader$(async () => {
  const patient: FormInput["patient"] = {
    address: "Komarov 12",
    birthRegistrationNumber: "1",
    fullName: "Danik",
    id: "test",
    insuranceCompanyNumber: "1234",
    insuranceNumber: "999",
    phoneNumber: "111222333",
    state: "ČR",
  };

  const requester = {
    departmentName: "Radiologie",
    expertiseCode: "101",
    fullName: "MUDr. Demo Lékař",
    phoneNumber: "111222333",
    providerName: "Nemocnice Akeso",
  };

  const sdeleni = "test";
  const specialni = "test";
  const creationDate = new Date().toLocaleDateString("cs-CZ");
  const epikriza = "test";
  const vaha = "80";
  const selectDate = null;
  const vyska = "185";
  const alergie = "test";
  const dg = "test";

  const request = "ROUTINE";
  const contrastAgentAllergy = "ANO";
  const zz = "";
  const department = "";
  const valityUntil = "1 měsíc";

  const specialRequest = "test";

  const requestedExamination = "test";

  const urgency = "RUTINA";

  return {
    alergie,
    contrastAgentAllergy,
    creationDate,
    department,
    dg,
    epikriza,
    patient,
    request,
    requestedExamination,
    requester,
    sdeleni,
    selectDate,
    specialni,
    specialRequest,
    urgency,
    vaha,
    valityUntil,
    vyska,
    zz,
  } satisfies FormInput;
});

// eslint-disable-next-line qwik/loader-location
export const usePreviewData = routeLoader$(async ({ error, query }) => {
  const patientAkordId = ((pid) => (!pid ? NaN : Number(pid)))(query.get("pacient"));

  if (!patientAkordId || isNaN(patientAkordId)) {
    throw error(400, "Invalid patient id query parameter.");
  }

  // const { patientByAkordId: patient } = await createIrisClient(env).query({
  //   patientByAkordId: {
  //     __args: {
  //       akordId: patientAkordId,
  //     },
  //     address: {
  //       full: true,
  //     },
  //     birthRegistrationNumber: true,
  //     fullName: true,
  //     insuranceCompanyNumber: true,
  //     insuranceNumber: true,
  //     phoneNumber: true,
  //   },
  // });
  const patient = {
    address: "Adresat 12",
    birthRegistrationNumber: "1",
    fullName: "Danik",
    id: "test",
    insuranceCompanyNumber: "1234",
    insuranceNumber: "123",
    phoneNumber: "3",
    state: "Stat",
  };

  const requester = {
    departmentName: "Radiologie",
    expertiseCode: "101",
    fullName: "MUDr. Demo Lékař",
    phoneNumber: "111222333",
    providerName: "Nemocnice Akeso",
  };

  const sdeleni = {
    test: "test",
  };

  return {
    patient,
    requester,
    sdeleni,
  };
});
