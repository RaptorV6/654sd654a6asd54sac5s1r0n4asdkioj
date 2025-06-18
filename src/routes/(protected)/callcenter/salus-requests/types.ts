import type { PatientSex } from "~/iris/client/schema";

export type RequestBase = {
  date: string;
  done: boolean;
  employeeResponsibleId: null | string;
  id: string;
  patientId: string;
};

export type CreateAccountRequest = {
  idCardPhoto: string;
  idCardPhotoBack: string;
  requestType: "profileActivation";
} & RequestBase;

type AddProfileRequest = {
  birthCertificatePhoto: string;
  childInsuranceNumber: string;
  requestType: "addDependentProfile";
} & RequestBase;

type DataChange = {
  insurancecompanyNumber?: string;
  sex?: PatientSex;
  // doplnit další možnosti změn
};

type AtLeastOne<T> = {
  [K in keyof T]: Partial<Omit<T, K>> & Required<Pick<T, K>>;
}[keyof T];

type ProfileDataChange = {
  profileId: string;
  requestType: "profileDataChange";
} & AtLeastOne<DataChange> &
  RequestBase;

type NewAppointmentRequestBase = {
  preferredTime: "AFTERNOON" | "MORNING" | "WHOLE_DAY";
  requestType: "appointmentAssign";
  selectedFacilityId: string;
  selectedFamilyMembers: string[];
  selectedServiceId: string;
} & RequestBase;

type NewAppointmentWithReferralRequest = {
  attachment: string;
  refferal: true;
} & NewAppointmentRequestBase;

type NewAppointmentWithoutReferralRequest = {
  refferal: false;
} & NewAppointmentRequestBase;

/*
type ChangeAppointmentRequest = {
  appointmentId: string;
  preferredTime: "AFTERNOON" | "MORNING" | "WHOLE_DAY";
  requestType: "assignedAppointmentChange";
}  & RequestBase;

type CancelAppointmentRequest = {
  appointmentId: string;
  requestType: "assignedAppointmentCancel";
}  & RequestBase;
*/

export type PatientRequest =
  | AddProfileRequest
  | CreateAccountRequest
  | NewAppointmentWithoutReferralRequest
  | NewAppointmentWithReferralRequest
  | ProfileDataChange;

export type PatientForRequestDisplay = {
  birthRegistrationNumber: string;
  insuranceNumber: string;
  phoneNumber: null | string;
  veryFullName: string;
};

export type PatientRequestWithPatient = { patient: PatientForRequestDisplay } & PatientRequest;
