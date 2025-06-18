import { toTextToText } from "@akeso/utils";

import type { InternsAmbExpectationInvasionKind, InternsAmbExpectationInvasionPerformed } from "~/iris";

const toOptions = <T extends Record<string, string>>(options: T, ns?: keyof T): { label: string; value: string }[] =>
  Object.entries(options).map(([k, v]) => ({ label: k === ns ? "-- vyberte --" : v, value: k }));

/* eslint-disable perfectionist/sort-objects */
const InvasionKindToText: Record<InternsAmbExpectationInvasionKind, string> = {
  NOT_SPECIFIED: "",
  PZK: "PŽK",
  PMK: "PMK",
  CZK: "ČŽK",
  SHUNT: "shunt",
  ARTK: "ArtK",
  PORT: "port",
  NGS: "NGS",
  PEG: "PEG",
  // OTHER: "Jiné",
};
/* eslint-enable perfectionist/sort-objects */

export const InvasionSelectOptions = toOptions(InvasionKindToText, "NOT_SPECIFIED");
export const invasionKindToText = (code: InternsAmbExpectationInvasionKind) => toTextToText(code, InvasionKindToText);

/* eslint-disable perfectionist/sort-objects */
const InvasionPerformedToText: Record<InternsAmbExpectationInvasionPerformed, string> = {
  NOT_SPECIFIED: "",
  INCOME: "Na příjmu",
  AMBULANCE: "Od ZZS",
  ETERED: "Vneseno",
  // OTHER: "Jiné",
};
/* eslint-enable perfectionist/sort-objects */

export const InvasionPerformedSelectOptions = toOptions(InvasionPerformedToText, "NOT_SPECIFIED");
export const invasionPerformedToText = (code: InternsAmbExpectationInvasionPerformed) =>
  toTextToText(code, InvasionPerformedToText);
