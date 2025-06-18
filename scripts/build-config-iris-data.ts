import { buildAuthUserRolesDefJson } from "../src/config/auth-user-roles";
import { buildPermissionsDefJson } from "../src/config/permissions";

const jsonPermissions = JSON.stringify(buildPermissionsDefJson(), null, 2);
Bun.write("src/config/permissions.def.json", jsonPermissions);

const jsonAuthUsers = JSON.stringify(buildAuthUserRolesDefJson(), null, 2);
Bun.write("src/config/auth-user-roles.def.json", jsonAuthUsers);
