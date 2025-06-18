// -----------------importy-------------------

import { server$ } from "@builder.io/qwik-city";

import type {
  PalliativeCardForDisplay,
  ServerCreateInterventionInput,
  ServerUpdateCardInput,
  ServerUpdateInterventionInput,
} from "./palliative-cards-rpc";

import { serverCreateIntervention, serverUpdateCard, serverUpdateIntervention } from "./palliative-cards-rpc";

//-------------------- updateCard-------------------------------------------

export type UpdateCardResult = {
  card: null | PalliativeCardDetailWithTransformation;
  success: boolean;
};

export const updateCard = server$(async function (data: ServerUpdateCardInput): Promise<UpdateCardResult> {
  try {
    const updatedCard = await serverUpdateCard(this.env, data);

    if (updatedCard) {
      return { card: cardDataToDisplay(updatedCard), success: true };
    } else return { card: null, success: true };
  } catch (error) {
    console.error("Chyba při aktualizaci karty - updateCardAction:", error);
    return { card: null, success: false };
  }
});

//-----------------------createNewIntervention---------------------------------------

export const createNewIntervention = server$(async function (
  data: ServerCreateInterventionInput,
): Promise<UpdateCardResult> {
  try {
    const updatedCard = await serverCreateIntervention(this.env, data);

    if (updatedCard) {
      return { card: cardDataToDisplay(updatedCard), success: true };
    } else return { card: null, success: true };
  } catch (error) {
    console.error("Chyba při aktualizaci karty - updateCardAction:", error);
    return { card: null, success: false };
  }
});

//-----------------------updateIntervention---------------------------------------

export const updateIntervention = server$(async function (
  data: ServerUpdateInterventionInput,
): Promise<UpdateCardResult> {
  const { cardId } = this.params;

  try {
    const updatedCard = await serverUpdateIntervention(this.env, data, cardId);

    if (updatedCard) {
      return { card: cardDataToDisplay(updatedCard), success: true };
    } else return { card: null, success: true };
  } catch (error) {
    console.error("Chyba při aktualizaci intervence - updateInterventionAction:", error);
    return { card: null, success: false };
  }
});

//----------------------------cardDataToDisplay-------------------------------------

// transformované intervence pro tisk
export type TransformedInterventions = {
  attendedCaplan: boolean[];
  attendedDoctor: boolean[];
  attendedNurse: boolean[];
  attendedOther: string[];
  attendedPsychologist: boolean[];
  attendedSocialWorker: boolean[];
  balanceSheet: boolean[];
  bereavementCare: boolean[];
  careLimitation: boolean[];
  careTargets: boolean[];
  communicationSupport: boolean[];
  decisionMechanism: boolean[];
  expectations: boolean[];
  familyConference: boolean[];
  id: string[];
  interventionAt: Date[];
  lengthMin: string[];
  other: string[];
  outsideCareCoordination: boolean[];
  perinatalCare: boolean[];
  phoneConsultation: boolean[];
  psychologicalSupportCaregiver: boolean[];
  psychologicalSupportPatient: boolean[];
  socialFinanceSupport: boolean[];
  spiritual: boolean[];
  symptoms: boolean[];
  terminalCarePatient: boolean[];
};

// karta s transformovanými intervencemi
export type PalliativeCardDetailWithTransformation = {
  transformedInterventions: TransformedInterventions;
} & PalliativeCardForDisplay;

// funkce, která do karty přidá přetransformované intervence pro zobrazení v tabulce
export function cardDataToDisplay(card: PalliativeCardForDisplay): PalliativeCardDetailWithTransformation {
  const transformedInterventions: TransformedInterventions = {
    attendedCaplan: [],
    attendedDoctor: [],
    attendedNurse: [],
    attendedOther: [],
    attendedPsychologist: [],
    attendedSocialWorker: [],
    balanceSheet: [],
    bereavementCare: [],
    careLimitation: [],
    careTargets: [],
    communicationSupport: [],
    decisionMechanism: [],
    expectations: [],
    familyConference: [],
    id: [],
    interventionAt: [],
    lengthMin: [],
    other: [],
    outsideCareCoordination: [],
    perinatalCare: [],
    phoneConsultation: [],
    psychologicalSupportCaregiver: [],
    psychologicalSupportPatient: [],
    socialFinanceSupport: [],
    spiritual: [],
    symptoms: [],
    terminalCarePatient: [],
  };

  if (Array.isArray(card.interventions)) {
    card.interventions.forEach((intervention) => {
      Object.entries(intervention).forEach(([key, value]) => {
        if (key in transformedInterventions) {
          (transformedInterventions[key as keyof TransformedInterventions] as any).unshift(value);
        }
      });
    });
  } else {
    console.error("Expected interventions to be an array, but got: ", card.interventions);
  }

  return {
    ...card,
    transformedInterventions,
  } as PalliativeCardDetailWithTransformation;
}

//--------------------------updateUrlParams--------------------------------------

export function updateUrlParams(
  locationUrl: URL,
  navigate: (path: string) => void,
  newParams: Record<string, null | string | undefined>,
) {
  const url = new URL(locationUrl.toString());
  const searchParams = new URLSearchParams(url.search);

  // když má klíč nastavenou novou hodnotu, nastavíme ji v url, jinak klíč z url vymažeme
  Object.entries(newParams).forEach(([key, value]) =>
    value ? searchParams.set(key, value) : searchParams.delete(key),
  );

  // zkontrolujeme, zda se mění filtr (tj. něco jiného než stránkování)
  const isFilterChange = Object.keys(newParams).some((key) => key !== "before" && key !== "after" && key !== "page");

  // Pokud se mění filtr, odstraníme stránkovací parametry
  if (isFilterChange) {
    searchParams.delete("before");
    searchParams.delete("after");
    searchParams.delete("page");
  }

  navigate(`${url.pathname}?${searchParams.toString()}`);
}
