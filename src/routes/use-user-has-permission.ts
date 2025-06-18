import type { AuthUserRole } from "~/config/auth-user-roles";
import type { Permission } from "~/config/permissions";

import { useSelectedFacility } from "~/components/selected-facility-context";

import { useUserGrants } from "./use-user-grants";
import { userHasPermission } from "./user-has-permission";

export function useUserHasPermission() {
  const grants = useUserGrants();
  const useFacility = useSelectedFacility();
  return (permission: Permission, role?: AuthUserRole): boolean =>
    userHasPermission(grants, useFacility.selectedFacility.value, { permission, role });
}
