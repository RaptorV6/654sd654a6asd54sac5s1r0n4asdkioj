// soubor pro definici typů

import type { QRL } from "@builder.io/qwik";

import type {
  PalliativeCareContextKind,
  PalliativeCareContextTargetKind,
  PalliativeCareDepartmentKind,
  PalliativeCareDiagnosisKind,
  PalliativeCareEndKind,
  PalliativeCareGoalOfCareKind,
  PalliativeCareInterventionsForBereavedKind,
  PalliativeCareSurpriseQuestionKind,
} from "~/iris";

import type { ServerCreateInterventionInput, ServerUpdateCardInput } from "./palliative-cards-rpc";
import type { UpdateCardResult } from "./palliative-functions";

// kompletní karta bez pacienta
export type PalliativeCardRecord = {
  careContextKind: null | PalliativeCareContextKind;
  careContextTarget: null | PalliativeCareContextTargetKind;
  careContextTargetOther: null | string;
  createdAt: Date | null;
  department: null | PalliativeCareDepartmentKind;
  departmentNote: null | string;
  departmentOther: null | string;
  diagnosisCode: null | string;
  diagnosisKind: null | PalliativeCareDiagnosisKind;
  endAt: Date | null;
  endKind: null | PalliativeCareEndKind;
  endKindOtherText: null | string;
  goalOfCare: null | PalliativeCareGoalOfCareKind;
  goalOfCareOtherText: null | string;
  hospitalizationAt: Date | null;
  id: null | string;
  interventionRequestAt: Date | null;
  interventions: null | PalliativeCardInterventionRecord[];
  interventionsCount: null | number;
  interventionsForBereaved: null | PalliativeCareInterventionsForBereavedKind;
  isActive: boolean | null;
  lastInterventionAt: Date | null;
  patientId: null | string;
  signalCodeDrg: null | string;
  signalCodeSet: boolean | null;
  surpriseQuestion: null | PalliativeCareSurpriseQuestionKind;
  updatedAt: Date | null;
};

// intervence
export type PalliativeCardInterventionRecord = {
  balanceSheet: boolean | null;
  bereavementCare: boolean | null;
  card: null | PalliativeCardRecord;
  cardId: null | string;
  careLimitation: boolean | null;
  careTargets: boolean | null;
  communicationSupport: boolean | null;
  createdAt: Date | null;
  decisionMechanism: boolean | null;
  expectations: boolean | null;
  familyConference: boolean | null;
  id: null | string;
  interventionAt: Date | null;
  lengthMin: null | string;
  other: null | string;
  outsideCareCoordination: boolean | null;
  perinatalCare: boolean | null;
  phoneConsultation: boolean | null;
  psychologicalSupportCaregiver: boolean | null;
  psychologicalSupportPatient: boolean | null;
  socialFinanceSupport: boolean | null;
  spiritual: boolean | null;
  symptoms: boolean | null;
  terminalCarePatient: boolean | null;
  updatedAt: Date | null;
};

export type CreatePalliativeInterventionQrl = QRL<(values: ServerCreateInterventionInput) => Promise<UpdateCardResult>>;

export type UpdatePalliativeCardQrl = QRL<(values: Omit<ServerUpdateCardInput, "id">) => Promise<UpdateCardResult>>;

export const palliativeCareInterventionsForBereavedKindMap: Record<string, string> = {
  ADULT: "po úmrtí dospělého",
  CHILDREN: "po úmrtí dítěte",
};

export const palliativeCareContextKindMap: Record<string, string> = {
  EARLY: "časná",
  TERMINAL: "terminální",
};

/* eslint-disable perfectionist/sort-objects */
export const palliativeCareContextTargetMap: Record<string, string> = {
  ADULT: "u dospělého",
  CHILD: "u dítěte",
  SIBLING: "primárně pro blízké",
  PERINATAL: "perinatální",
  OTHER: "jiné",
};
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
export const palliativeCareDepartmentMap: Record<string, string> = {
  STANDARD: "standard",
  INTENSIVE: "intenzivní péče",
  AFTERCARE: "následná péče",
  AMBULATORY: "ambulantní",
  OTHER: "jiné",
};
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
export const palliativeCareDiagnosisKindMap: Record<string, string> = {
  ONCOLOGICAL: "onkologická",
  NONONCOLOGICAL: "neonkologická",
};
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
export const palliativeCareGoalOfCareMap: Record<string, string> = {
  FORMULATION_DISCIPLINE: "formulován v dokumentaci základního oboru",
  FORMULATION_OUR_PRACTICE: "formulován v dokumentaci paliativního týmu",
  NO_FORMULATION: "není explicitně formulován",
  OTHER: "jiné",
};
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
export const palliativeCareSurpriseQuestionMap: Record<string, string> = {
  POSITIVE: "pozitivní = nebyl bych překvapen",
  NEGATIVE: "negativní = byl bych překvapen",
  DONT_KNOW: "nevím",
  IRRELEVANT: "nerelevantní",
};
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
export const palliativeCareEndKindMap: Record<string, string> = {
  CONTINUED: "péče za hospitalizace trvá",
  DEATH_IN_HOSPITAL: "úmrtí v daném zdravotnickém zařízení",
  RELEASE_NO_CARE: "propuštění bez specializované paliativní péče",
  RELEASE_WITH_CARE: "propuštění se zajištěnou mobilní paliativní péčí",
  TRANSFER_TO_HOSPIC: "překlad do kamenného hospice",
  TRANSFER_TO_OTHER_HOSPITAL: "překlad do jiného zdravotnického zařízení",
  OTHER: "jiné",
};
/* eslint-enable perfectionist/sort-objects */
