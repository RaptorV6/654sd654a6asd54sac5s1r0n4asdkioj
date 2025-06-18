import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import type {
  PalliativeCareCardGenqlSelection,
  PalliativeCareContextKind,
  PalliativeCareContextTargetKind,
  PalliativeCareDepartmentKind,
  PalliativeCareDiagnosisKind,
  PalliativeCareEndKind,
  PalliativeCareGoalOfCareKind,
  PalliativeCareInterventionsForBereavedKind,
  PalliativeCareSurpriseQuestionKind,
} from "~/iris";

import { createIrisClient } from "~/iris";

// Typ pro vracenou kartu do seznamu
export type PalliativeCardListItem = {
  id: string;
  interventionsCount: number;
  isActive: boolean;
  lastInterventionAt: Date | null;
  patient: {
    birthRegistrationNumber: null | string;
    fullName: string;
  };
};
// Typ pro stránkování
export type PaginationInfo = {
  endCursor?: null | string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: null | string;
};

// Typ pro celkovou odpověď
export type ServerGetAllPalliativeCardsResponse = {
  nodes: PalliativeCardListItem[];
  pageInfo: PaginationInfo;
};

export async function serverGetAllPalliativeCards(
  env: EnvGetter,
  sortBy: "lastInterventionAt" | "patientFullName" | null,
  sortDirection: "asc" | "desc" | null,
  status: "active" | "all" | null,
  searchTerm: null | string,
  paging: { after: string } | { before: string } | null,
): Promise<ServerGetAllPalliativeCardsResponse> {
  const iris = createIrisClient(env);
  const pageSize = 12;

  let pagination: { after: string; first: number } | { before: string; last: number } | { first: number } = {
    first: pageSize,
  };

  if (paging && "after" in paging) {
    pagination = { after: paging.after, first: pageSize };
  } else if (paging && "before" in paging) {
    pagination = { before: paging.before, last: pageSize };
  }

  const { palliativeCareCards } = await iris.query({
    palliativeCareCards: {
      __args: {
        ...pagination,
        includeInactive: status === "all",
        order: sortBy == null ? undefined : [{ [sortBy]: sortDirection === "desc" ? "DESC" : "ASC" }, { id: "ASC" }],
        searchPatient: searchTerm,
      },
      nodes: {
        id: true,
        interventionsCount: true,
        isActive: true,
        lastInterventionAt: true,
        patient: {
          birthRegistrationNumber: true,
          fullName: true,
        },
      },
      pageInfo: {
        endCursor: true,
        hasNextPage: true,
        hasPreviousPage: true,
        startCursor: true,
      },
    },
  });

  return palliativeCareCards;
}

const CardDetailFragment = {
  careContextKind: true,
  careContextTarget: true,
  careContextTargetOther: true,
  createdAt: true,
  department: true,
  departmentNote: true,
  departmentOther: true,
  diagnosisCode: true,
  diagnosisKind: true,
  endAt: true,
  endKind: true,
  endKindOtherText: true,
  goalOfCare: true,
  goalOfCareOtherText: true,
  hospitalizationAt: true,
  id: true,
  interventionRequestAt: true,
  interventions: {
    attendedCaplan: true,
    attendedDoctor: true,
    attendedNurse: true,
    attendedOther: true,
    attendedPsychologist: true,
    attendedSocialWorker: true,
    balanceSheet: true,
    bereavementCare: true,
    cardId: true,
    careLimitation: true,
    careTargets: true,
    communicationSupport: true,
    decisionMechanism: true,
    expectations: true,
    familyConference: true,
    id: true,
    interventionAt: true,
    lengthMin: true,
    other: true,
    outsideCareCoordination: true,
    perinatalCare: true,
    phoneConsultation: true,
    psychologicalSupportCaregiver: true,
    psychologicalSupportPatient: true,
    socialFinanceSupport: true,
    spiritual: true,
    symptoms: true,
    terminalCarePatient: true,
  },
  interventionsCount: true,
  interventionsForBereaved: true,
  isActive: true,
  lastInterventionAt: true,
  patient: {
    birthDate: true,
    birthRegistrationNumber: true,
    fullName: true,
    id: true,
  },
  patientId: true,
  signalCodeDrg: true,
  signalCodeSet: true,
  surpriseQuestion: true,
} satisfies PalliativeCareCardGenqlSelection;

// získání vybrané karty s kompletními údaji podle id
export async function serverGetCard(env: EnvGetter, cardId: string): Promise<null | PalliativeCardForDisplay> {
  const iris = createIrisClient(env);
  const { palliativeCareCard } = await iris.query({
    palliativeCareCard: {
      __args: {
        id: cardId,
      },
      ...CardDetailFragment,
    },
  });

  return palliativeCareCard;
}

// správný typ dat pro vytvoření nové karty
export type ServerCreateCardInput = {
  env: EnvGetter;
  hospitalizationAt?: Date | string;
  interventionRequestAt?: Date | string;
  patientId: string;
};

// vytvoření nové karty
export async function serverCreateCard({
  env,
  hospitalizationAt,
  interventionRequestAt,
  patientId,
}: ServerCreateCardInput): Promise<string> {
  const intDate = interventionRequestAt ? new Date(interventionRequestAt) : null;
  const hospDate = hospitalizationAt ? new Date(hospitalizationAt) : null;

  const iris = createIrisClient(env);
  const { createPalliativeCareCard } = await iris.mutation({
    createPalliativeCareCard: {
      __args: {
        input: {
          hospitalizationAt: hospDate,
          interventionRequestAt: intDate,
          patientId: patientId,
        },
      },
      palliativeCareCard: {
        id: true,
      },
    },
  });
  return createPalliativeCareCard.palliativeCareCard.id; // id nové karty potřebujeme kvůli přechodu na detail
}

export type ServerUpdateCardInput = {
  careContextKind?: PalliativeCareContextKind;
  careContextTarget?: PalliativeCareContextTargetKind;
  careContextTargetOther?: string;
  createdAt?: Date;
  department?: PalliativeCareDepartmentKind;
  departmentNote?: string;
  departmentOther?: string;
  diagnosisCode?: string;
  diagnosisKind?: PalliativeCareDiagnosisKind;
  endAt?: Date;
  endKind?: PalliativeCareEndKind;
  endKindOtherText?: string;
  goalOfCare?: PalliativeCareGoalOfCareKind;
  goalOfCareOtherText?: string;
  hospitalizationAt?: Date | string;
  id: string;
  interventionRequestAt?: Date | string;
  interventionsCount?: number;
  interventionsForBereaved?: PalliativeCareInterventionsForBereavedKind;
  isActive?: boolean;
  lastInterventionAt?: Date;
  patientId?: string;
  signalCodeDrg?: string;
  signalCodeSet?: boolean;
  surpriseQuestion?: PalliativeCareSurpriseQuestionKind;
};
export type PalliativeCardForDisplay = {
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
  interventions: null | PalliativeCardInterventionForDisplay[];
  interventionsCount: null | number;
  interventionsForBereaved: null | PalliativeCareInterventionsForBereavedKind;
  isActive: boolean | null;
  lastInterventionAt: Date | null;
  patient: null | PalliativeCardPatientForDisplay;
  patientId: null | string;
  signalCodeDrg: null | string;
  signalCodeSet: boolean | null;
  surpriseQuestion: null | PalliativeCareSurpriseQuestionKind;
};

export type PalliativeCardPatientForDisplay = {
  birthDate: Date | null;
  birthRegistrationNumber: null | string;
  fullName: string;
  id: string;
};
export type PalliativeCardInterventionForDisplay = {
  attendedCaplan: boolean;
  attendedDoctor: boolean;
  attendedNurse: boolean;
  attendedOther: string;
  attendedPsychologist: boolean;
  attendedSocialWorker: boolean;
  balanceSheet: boolean | null;
  bereavementCare: boolean | null;
  cardId: string;
  careLimitation: boolean | null;
  careTargets: boolean | null;
  communicationSupport: boolean | null;
  decisionMechanism: boolean | null;
  expectations: boolean | null;
  familyConference: boolean | null;
  id: string;
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
};

export async function serverUpdateCard(
  env: EnvGetter,
  data: ServerUpdateCardInput,
): Promise<null | PalliativeCardForDisplay> {
  const iris = createIrisClient(env);
  const { updatePalliativeCareCard } = await iris.mutation({
    updatePalliativeCareCard: {
      __args: {
        input: data,
      },
      palliativeCareCard: CardDetailFragment,
    },
  });

  return updatePalliativeCareCard.palliativeCareCard;
}

export type ServerCreateInterventionInput = {
  attendedCaplan: boolean;
  attendedDoctor: boolean;
  attendedNurse: boolean;
  attendedOther: string;
  attendedPsychologist: boolean;
  attendedSocialWorker: boolean;
  balanceSheet: boolean;
  bereavementCare: boolean;
  cardId: string;
  careLimitation: boolean;
  careTargets: boolean;
  communicationSupport: boolean;
  decisionMechanism?: boolean;
  expectations?: boolean;
  familyConference?: boolean;
  interventionAt: Date;
  lengthMin: string;
  other: string;
  outsideCareCoordination: boolean;
  perinatalCare: boolean;
  phoneConsultation: boolean;
  psychologicalSupportCaregiver: boolean;
  psychologicalSupportPatient: boolean;
  socialFinanceSupport: boolean;
  spiritual: boolean;
  symptoms: boolean;
  terminalCarePatient: boolean;
};

export async function serverCreateIntervention(
  env: EnvGetter,
  data: ServerCreateInterventionInput,
): Promise<null | PalliativeCardForDisplay> {
  const iris = createIrisClient(env);
  await iris.mutation({
    createPalliativeIntervention: {
      __args: {
        input: data,
      },
      palliativeCareIntervention: {
        cardId: true,
        id: true,
      },
    },
  });

  return serverGetCard(env, data.cardId);
}

export type ServerUpdateInterventionInput = {
  attendedCaplan: boolean;
  attendedDoctor: boolean;
  attendedNurse: boolean;
  attendedOther: string;
  attendedPsychologist: boolean;
  attendedSocialWorker: boolean;
  balanceSheet: boolean;
  bereavementCare: boolean;
  careLimitation: boolean;
  careTargets: boolean;
  communicationSupport: boolean;
  decisionMechanism: boolean;
  expectations: boolean;
  familyConference: boolean;
  id: string;
  interventionAt: Date;
  lengthMin: string;
  other: string;
  outsideCareCoordination?: boolean;
  perinatalCare: boolean;
  phoneConsultation: boolean;
  psychologicalSupportCaregiver: boolean;
  psychologicalSupportPatient: boolean;
  socialFinanceSupport: boolean;
  spiritual: boolean;
  symptoms: boolean;
  terminalCarePatient: boolean;
};

export async function serverUpdateIntervention(
  env: EnvGetter,
  data: ServerUpdateInterventionInput,
  cardId: string,
): Promise<null | PalliativeCardForDisplay> {
  const iris = createIrisClient(env);
  await iris.mutation({
    updatePalliativeIntervention: {
      __args: {
        input: data,
      },
      palliativeCareIntervention: {
        id: true,
      },
    },
  });

  return serverGetCard(env, cardId);
}
