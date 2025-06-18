import type { Branded } from "~/types/branded";

/* eslint-disable perfectionist/sort-objects */
// To be typesafe map all role IDs from role codelist to this type.
export const authUserRoleDefinition = {
  administrative: {
    code: "ADMINISTRATIVE",
    name: "Administrativní pracovník",
    shortName: "Administrativa",
    description: "Administrativní pracovník",
  },
  chaplain: {
    code: "CHAPLAIN",
    name: "Kaplan",
    shortName: "Kaplan",
    description: "Kaplan",
  },
  dispatcher: {
    code: "DISPATCHER",
    name: "Dispečer",
    shortName: "Dispečer",
    description: "Dispečer",
  },
  doctor: {
    code: "DOCTOR",
    name: "Lékař",
    shortName: "Lékař",
    description: "Lékař",
  },
  headOfDepartment: {
    code: "HEAD_OF_DEPARTMENT",
    name: "Primář",
    shortName: "Primář",
    description: "Vedoucí oddělení, nebo primář oddělení",
  },
  maintener: {
    code: "MAINTENER",
    name: "Údržbář",
    shortName: "Údržbář",
    description: "Údržbář",
  },
  none: {
    code: "NONE",
    name: "Nikdo",
    shortName: "Nikdo",
    description: "Nikdo",
  },
  nurse: {
    code: "NURSE",
    name: "Sestra",
    shortName: "Sestra",
    description: "Sestra",
  },
  principal: {
    code: "PRINCIPAL",
    name: "Ředitel",
    shortName: "Ředitel",
    description: "Ředitel",
  },
  psychologist: {
    code: "PSYCHOLOGIST",
    name: "Psycholog",
    shortName: "Psycholog",
    description: "Psycholog",
  },
  radiologist: {
    code: "RADIOLOGIST",
    name: "Radiolog",
    shortName: "Radiolog",
    description: "Radiolog",
  },
  radiologyAssistant: {
    code: "RADIOLOGY_ASSISTANT",
    name: "Radiologický asistent",
    shortName: "Rd asistent",
    description: "Radiologický asistent",
  },
  sanitarian: {
    code: "SANITARIAN",
    name: "Sanitář",
    shortName: "Sanitář",
    description: "Sanitář",
  },
  socialWorker: {
    code: "SOCIAL_WORKER",
    name: "Sociální pracovník",
    shortName: "Soc prac",
    description: "Sociální pracovník",
  },
  spiritualAssistant: {
    code: "SPIRITUAL_ASSISTANT",
    name: "Duchovní asistent",
    shortName: "Duch asistent",
    description: "Duchovní asistent",
  },
  system: {
    code: "SYSTEM",
    name: "Systém",
    shortName: "Systém",
    description: "Systém",
  },
  therapist: {
    code: "THERAPIST",
    name: "Terapeut",
    shortName: "Terapeut",
    description: "Terapeut",
  },
} as const;
/* eslint-enable perfectionist/sort-objects */

type AuthUserRoleCode = keyof typeof authUserRoleDefinition;
export const authUserRoles = Object.keys(authUserRoleDefinition) as AuthUserRoleCode[];

export type AuthUserRole = Branded<AuthUserRoleCode, "AuthUserRole">;

export function asAuthUserRole(code: AuthUserRoleCode): AuthUserRole {
  return code as AuthUserRole;
}

export function assertAuthUserRole(v: string): asserts v is AuthUserRole {
  if (!isAuthUserRole(v)) {
    throw new TypeError("Value is not an AuthUserRole.");
  }
}

export function isAuthUserRole(v: string): v is AuthUserRole {
  return authUserRoles.includes(v as any);
}

export function tryAuthUserRole(v: string): AuthUserRole {
  assertAuthUserRole(v);
  return v;
}

export function buildAuthUserRolesDefJson() {
  const def = [];
  for (const key in authUserRoleDefinition) {
    const { code, description, name } = authUserRoleDefinition[key as AuthUserRoleCode];
    def.push({ code, description, name });
  }
  return def;
}
