import { component$, createContextId, Slot, useContext, useContextProvider, useStore } from "@builder.io/qwik";

import type { PatientSex } from "~/iris";

import type { SurgeryAdmissionStep, SurgeryAdmissionStepsCompletion } from "./surgery-admission-steps";

import { defaultSurgeryAdmissionStepsCompletion, surgeryAdmissionGetCurrentStep } from "./surgery-admission-steps";

export type ChecklistValues = {
  consent: boolean | undefined;
  isAble: boolean | undefined;
  notSick: boolean | undefined;
  onEmptyStomach: boolean | undefined;
  preop: boolean | undefined;
};

export type ObjectiveFindingsCalculationValues = {
  bmi: number | undefined;
  height: number | undefined;
  pressureDown: number | undefined;
  pressureUp: number | undefined;
  pulz: number | undefined;
  temperature: number | undefined;
  weight: number | undefined;
};

type SurgeryAdmissionContext = {
  checklist: ChecklistValues;
  currentStep: SurgeryAdmissionStep;
  documentationId: null | number;
  objectiveFindingsCalculationValues: ObjectiveFindingsCalculationValues;
  patient: {
    age: null | number;
    birthRegistrationNumber: null | string;
    fullName: string;
    id: string;
    sex: PatientSex;
  } | null;
  result: string;
  stepCompleted: SurgeryAdmissionStepsCompletion;
};

const SurgeryAdmissionContextId = createContextId<SurgeryAdmissionContext>("SurgeryAdmissionContext");

type SurgeryAdmissionProviderProps = {
  documentationId: SurgeryAdmissionContext["documentationId"];
  initialPatient: SurgeryAdmissionContext["patient"];
};

export const SurgeryAdmissionProvider = component$<SurgeryAdmissionProviderProps>(
  ({ documentationId, initialPatient }) => {
    const contextStore = useStore<SurgeryAdmissionContext>({
      checklist: {
        consent: undefined,
        isAble: undefined,
        notSick: undefined,
        onEmptyStomach: undefined,
        preop: undefined,
      },
      currentStep: surgeryAdmissionGetCurrentStep(initialPatient ? "checklist" : "patientSelection"),
      documentationId,
      objectiveFindingsCalculationValues: {
        bmi: undefined,
        height: undefined,
        pressureDown: undefined,
        pressureUp: undefined,
        pulz: undefined,
        temperature: undefined,
        weight: undefined,
      },
      patient: initialPatient ?? null,
      result: "",
      stepCompleted: {
        ...defaultSurgeryAdmissionStepsCompletion,
        patientSelection: initialPatient ? "done" : defaultSurgeryAdmissionStepsCompletion.patientSelection,
      },
    });

    useContextProvider(SurgeryAdmissionContextId, contextStore);

    return <Slot />;
  },
);

export const useSurgeryAdmissionContext = () => useContext(SurgeryAdmissionContextId);
