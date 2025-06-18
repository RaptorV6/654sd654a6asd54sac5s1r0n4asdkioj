export const SurgeryAdmissionStepOptions = [
  "patientSelection",
  "checklist",
  "personalAnamnesis",
  "objectiveFinding",
  "localFinding",
  "addendum",
] as const;

export type SurgeryAdmissionStepCode = (typeof SurgeryAdmissionStepOptions)[number];

export type SurgeryAdmissionStep = {
  code: SurgeryAdmissionStepCode;
  title: string;
};

export const SurgeryAdmissionStepDef: Record<SurgeryAdmissionStepCode, Omit<SurgeryAdmissionStep, "code">> = {
  addendum: { title: "Doplnění" },
  checklist: { title: "Kontrolní seznam" },
  localFinding: { title: "Lokální nález" },
  objectiveFinding: { title: "Objektivní nález" },
  patientSelection: { title: "Výběr pacienta" },
  personalAnamnesis: { title: "Osobní anamnéza a nynější onemocnění" },
};

const definitionToStep = (code: SurgeryAdmissionStepCode): SurgeryAdmissionStep => {
  return {
    code,
    ...SurgeryAdmissionStepDef[code],
  };
};

export const SurgeryAdmissionSteps: SurgeryAdmissionStep[] = SurgeryAdmissionStepOptions.map(definitionToStep);

export type SurgeryAdmissionStepsState = "done" | "none" | "progress";
export type SurgeryAdmissionStepsCompletion = Record<SurgeryAdmissionStepCode, SurgeryAdmissionStepsState>;
export const defaultSurgeryAdmissionStepsCompletion: SurgeryAdmissionStepsCompletion = {
  addendum: "none",
  checklist: "none",
  localFinding: "none",
  objectiveFinding: "none",
  patientSelection: "none",
  personalAnamnesis: "none",
};

export const isSurgeryAdmissionStepCode = (x: unknown): x is SurgeryAdmissionStepCode =>
  typeof x === "string" && SurgeryAdmissionStepOptions.includes(x as any);

export const surgeryAdmissionGetCurrentStep = (currentStepCode: SurgeryAdmissionStepCode): SurgeryAdmissionStep => {
  return definitionToStep(currentStepCode);
};

export const surgeryAdmissionGetNextStep = (currentStepCode: SurgeryAdmissionStepCode): SurgeryAdmissionStep => {
  const idx = Math.min(
    SurgeryAdmissionStepOptions.findIndex((code) => code === currentStepCode) + 1,
    SurgeryAdmissionStepOptions.length - 1,
  );
  return definitionToStep(SurgeryAdmissionStepOptions[idx]);
};
