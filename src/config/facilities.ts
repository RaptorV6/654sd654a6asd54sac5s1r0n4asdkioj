import type { Branded } from "~/types/branded";

type FD = {
  code: string;
  description: null | string;
  id: number;
  name: string;
  shortName: string;
};

/* eslint-disable perfectionist/sort-objects */
// ! List have to correspond with enum of facility codes in IRIS.
export const facilityDefinition = {
  // ap: {
  //   id: -9999,
  //   code: "AP",
  //   name: "Diagnostické centrum",
  //   shortName: "AP",
  //   description: "Komplexní péče o dětské i dospělé pacienty",
  // } satisfies FD,
  apZub: {
    id: 5,
    code: "AP_ZUB",
    name: "Akeso Poliklinika Zubní",
    shortName: "APZ",
    description: null,
  } satisfies FD,
  // CDR: {
  //   id: -9998,
  //   code: "CDR",
  //   name: "Centrum duševní rehabilitace",
  //   shortName: "CDR",
  //   description: "Komplexní péče o duševně nemocné",
  // } satisfies FD,
  dps: {
    id: 1,
    code: "DPS",
    name: "DPS Obdřejov",
    shortName: "DPS",
    description: 'Denní psychoterapeutické sanatorium "Ondřejov"',
  } satisfies FD,
  multiscan: {
    id: 6,
    code: "MULTISCAN",
    name: "Multiscan",
    shortName: "MS",
    description: "Onkologické a radiologické centrum tvořící součást Onkologického centra Pardubického kraje",
  } satisfies FD,
  multiscanRd: {
    id: 3,
    code: "MULTISCAN_RD",
    name: "Multiscan Radiodiagnostika",
    shortName: "MSRD",
    description: "Onkologické a radiologické centrum tvořící součást Onkologického centra Pardubického kraje",
  } satisfies FD,
  nh: {
    id: 7,
    code: "NH",
    name: "Nemocnice Hořovice",
    shortName: "NH",
    description: "Nemocnice Hořovice, akutní nemocnice s nadregionální působností",
  } satisfies FD,
  okruhova: {
    id: 2,
    code: "OKRUHOVA",
    name: "Akeso centrála",
    shortName: "CNTR",
    description: null,
  } satisfies FD,
  rnb: {
    id: 4,
    code: "RNB",
    name: "Rehabilitační nemocnice Beroun",
    shortName: "RNB",
    description: "Rehabilitační nemocnice Beroun je zaměřená na jednodenní chirurgii, rehabilitaci a následnou péči",
  } satisfies FD,
} as const;
/* eslint-enable perfectionist/sort-objects */

type FacilityCode = keyof typeof facilityDefinition;
export const facilities = Object.keys(facilityDefinition) as FacilityCode[];

export type Facility = Branded<FacilityCode, "Facility">;

export function asFacility(code: FacilityCode): Facility {
  return code as Facility;
}

export function assertFacility(v: string): asserts v is Facility {
  if (!isFacility(v)) {
    throw new TypeError("Value is not an Facility.");
  }
}

export function isFacility(v: string): v is Facility {
  return facilities.includes(v as any);
}

export function tryFacility(v: string): Facility {
  assertFacility(v);
  return v;
}

export function getFacilityDefinition(facility: Facility): FD | undefined {
  if (isFacility(facility)) {
    return facilityDefinition[facility as FacilityCode];
  }
  return undefined;
}
