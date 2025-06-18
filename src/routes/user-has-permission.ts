import type { AuthUserRole } from "~/config/auth-user-roles";
import type { Facility } from "~/config/facilities";
import type { Permission } from "~/config/permissions";

import type { AuthUserProfileGrant } from "./plugin@auth";

export type UserAccessDescriptor =
  | "*"
  | { permission: Permission }
  | { permission: Permission }[]
  | { permission: Permission; role: AuthUserRole }
  | { permission: Permission; role: AuthUserRole }[];

export const userHasPermission = (
  grants: AuthUserProfileGrant[],
  currentFacility: Facility | undefined,
  descriptor: UserAccessDescriptor,
): boolean => {
  if (descriptor === "*") return true;
  const decs = Array.isArray(descriptor) ? descriptor : [descriptor];
  return grants
    .filter((g) => g.facility == null || g.facility === currentFacility)
    .some((g) => decs.some((d) => d.permission === g.permission && "role" in d && d.role === g.role));
};
