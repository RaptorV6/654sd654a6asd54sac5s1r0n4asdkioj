import type { Branded, UnwrapBranded } from "~/types/branded";

import type { AuthUserRole } from "./auth-user-roles";
import type { Facility } from "./facilities";

import { authUserRoleDefinition } from "./auth-user-roles";
import { facilityDefinition } from "./facilities";

type FacilityCode = UnwrapBranded<Facility>;
type AuthUserRoleCode = UnwrapBranded<AuthUserRole>;

// To recreate definition json run `bun run scripts/build-config-iris-data.ts`.
// This command updates `./permissions-def.json`. Content of `./permissions-def.json` can be upserted directly to IRIS.

type PermissionDefinition = {
  applicationProperties: {
    href: string;
    label: string;
    short: string;
    shortBgColor: string;
    shortFgColor: string;
    sublabel: null | string;
  };
  definition: {
    code: string;
    description: string;
    facilities: FacilityCode[];
    name: string;
    roles: AuthUserRoleCode[];
  };
};

/* eslint-disable perfectionist/sort-objects */
// ! To be typesafe map all permission IDs from permission codelist to this type.
// ! All definitions are stored in `./permissions-def.json`. Structure of definition json is described in
// ! `permissions-def.schema.json`.
const permissionsDefinition = {
  internsAmbExpectation: {
    definition: {
      code: "INTERNS_AMB_EXPECTATION",
      name: "Expektace pacienta",
      description: "Expektace pacienta na ambulaci Interního oddělení",
      facilities: ["rnb", "nh"],
      roles: ["doctor", "nurse"],
    },
    applicationProperties: {
      href: "/interns/ambulance/expectations/",
      label: "Expektace pacienta",
      sublabel: "Expektace pacienta na interní ambulanci",
      short: "EP",
      shortBgColor: "#e11d48",
      shortFgColor: "#ffffff",
    },
  } satisfies PermissionDefinition,
  palliativeCare: {
    definition: {
      code: "PALLIATIVE_CARE",
      name: "Paliativní péče",
      description: "Evidence Oddělení paliativní péče",
      facilities: ["rnb", "nh"],
      roles: ["chaplain", "doctor", "nurse", "psychologist", "socialWorker", "spiritualAssistant", "therapist"],
    },
    applicationProperties: {
      href: "/palliative/",
      label: "Paliativní péče",
      sublabel: "Přehled paliativní péče",
      short: "PP",
      shortBgColor: "#2563eb",
      shortFgColor: "#2563eb",
    },
  } satisfies PermissionDefinition,
  surgeryAdmission: {
    definition: {
      code: "SURGERY_ADMISSION",
      name: "Chirurgický příjem",
      description: "Předoperační příjem pacienta",
      facilities: ["rnb", "nh"],
      roles: ["doctor", "nurse"],
    },
    applicationProperties: {
      href: "/surgery/admission/",
      label: "Příjem pacienta k operaci",
      sublabel: "Vytvoření přijímací zprávy při příjmu pacienta k operaci",
      short: "POP",
      shortBgColor: "#0d9488",
      shortFgColor: "#ffffff",
    },
  } satisfies PermissionDefinition,
  surgeryProcedures: {
    definition: {
      code: "SURGERY_PROCEDURES",
      name: "Chyrurgické postupy",
      description: "Testovací prostředí pro chirurgické postupy",
      facilities: ["rnb", "nh"],
      roles: ["administrative", "dispatcher", "doctor", "nurse"],
    },
    applicationProperties: {
      href: "/surgery/procedures/",
      label: "Postupy",
      sublabel: null,
      short: "CHP",
      shortBgColor: "#0d9488",
      shortFgColor: "#ffffff",
    },
  } satisfies PermissionDefinition,
} as const;
/* eslint-enable perfectionist/sort-objects */

type PermissionCode = keyof typeof permissionsDefinition;
export const permissions = Object.keys(permissionsDefinition) as Permission[];

export type Permission = Branded<PermissionCode, "Permission">;

export function asPermission(code: PermissionCode): Permission {
  return code as Permission;
}

export function assertPermission(v: string): asserts v is Permission {
  if (!isPermission(v)) {
    throw new TypeError("Value is not an Permission.");
  }
}

export function isPermission(v: string): v is Permission {
  return permissions.includes(v as any);
}

export function tryPermission(v: string): Permission {
  assertPermission(v);
  return v;
}

export function getPermissionDefinition(permission: Permission): PermissionDefinition | undefined {
  if (isPermission(permission)) {
    return permissionsDefinition[permission as PermissionCode];
  }
  return undefined;
}

export function buildPermissionsDefJson() {
  const def = [];
  for (const key in permissionsDefinition) {
    const d = permissionsDefinition[key as PermissionCode]["definition"];
    def.push({
      ...d,
      facilities: d.facilities.map((f: FacilityCode) => facilityDefinition[f].code),
      roles: d.roles.map((r: AuthUserRoleCode) => authUserRoleDefinition[r].code),
    });
  }
  return def;
}
