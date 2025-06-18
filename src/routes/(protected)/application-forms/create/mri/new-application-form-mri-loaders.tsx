import { routeLoader$ } from "@builder.io/qwik-city";

// eslint-disable-next-line qwik/loader-location
export const useFormInitialData = routeLoader$(async () => {
  const patient = {
    address: "Komarov 12",
    allergy: "testovací alergie",
    birthRegistrationNumber: "1",
    dg: "DG123",
    fullName: "Danik",
    height: "180",
    id: "test",
    insuranceCompanyNumber: "1234",
    insuranceNumber: "123",
    phoneNumber: "111222333",
    specialni: "omezení pohybu",
    state: "Stat",
    weight: "80",
  };
  const selectDate = null;

  const zz = "";
  const department = "";

  const requester = {
    departmentName: "Radiologie",
    expertiseCode: "101",
    fullName: "MUDr. Demo Lékař",
    phoneNumber: "111222333",
    providerName: "Nemocnice Akeso",
  };

  return {
    anesthesia: "Ne",
    contraindications: {
      claustrophobia: "Ne",
      claustrophobiaNote: "claustrophobia",
      clips: "Ne",
      clipsNote: "clips",

      cochlearImplant: "Ne",
      cochlearImplantNote: "cochlearImplant",
      fragments: "Ne",
      fragmentsNote: "fragments",
      metalInBody: "Ne",
      metalInBodyNote: "metalInBody",
      pacemaker: "Ne",
      pacemakerNote: "pacemaker",
    },
    contrastAllergy: "Ne",
    creationDate: new Date().toLocaleDateString("cs-CZ"),
    department,
    epicrisis: "Pacient přichází s podezřením na cévní mozkovou příhodu.",
    expectedBenefit: "Upřesnění diagnózy",
    patient,
    reason: "Po operaci",
    requestedExamination: "MRI mozku",
    requester,
    selectDate,
    urgency: "RUTINA",
    valityUntil: "1 měsíc",
    zz,
  };
});

// eslint-disable-next-line qwik/loader-location
export const usePreviewData = routeLoader$(async ({ error, query }) => {
  const patientAkordId = ((pid) => (!pid ? NaN : Number(pid)))(query.get("pacient"));

  if (!patientAkordId || isNaN(patientAkordId)) {
    throw error(400, "Invalid patient id query parameter.");
  }

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

  return {
    patient,
    requester,
  };
});
