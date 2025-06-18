import type { PatientRequestWithPatient } from "./types";

import { NewAccountRequestListItemDetail } from "./new-account-request-list-item-detail";

export const requestDetailMap = {
  addDependentProfile: {
    Component: null,
    request: {} as Extract<PatientRequestWithPatient, { requestType: "addDependentProfile" }>,
  },
  appointmentAssign: {
    Component: null,
    request: {} as Extract<PatientRequestWithPatient, { requestType: "appointmentAssign" }>,
  },
  profileActivation: {
    Component: NewAccountRequestListItemDetail,
    request: {} as Extract<PatientRequestWithPatient, { requestType: "profileActivation" }>,
  },
  profileDataChange: {
    Component: null,
    request: {} as Extract<PatientRequestWithPatient, { requestType: "profileDataChange" }>,
  },
} as const;
