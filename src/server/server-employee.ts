import { camelCase } from "change-case";

import type { Facility } from "~/config/facilities";
import type { AuthUserProfileGrant } from "~/routes/plugin@auth";

import { tryAuthUserRole } from "~/config/auth-user-roles";
import { asFacility, tryFacility } from "~/config/facilities";
import { tryPermission } from "~/config/permissions";
import { createIrisClient, type IrisClientOrEnv } from "~/iris";

type ServerEmployeeSironaProfileErrorCode = "INVALID_INPUT" | "PROFILE_NOT_FOUND";
export class ServerEmployeeSironaProfileError extends Error {
  public code: ServerEmployeeSironaProfileErrorCode;

  constructor(code: ServerEmployeeSironaProfileErrorCode) {
    switch (code) {
      case "INVALID_INPUT":
        super("Invalid input");
        break;
      case "PROFILE_NOT_FOUND":
        super("Employee Sirona Profile not found");
        break;
      default:
        super("Unknown");
    }
    this.code = code;
  }
}

export type EmployeeSironaProfile = {
  defaultFacility: Facility;
  email: null | string;
  employeeId: string;
  fullName: string;
  grants: AuthUserProfileGrant[];
  image: null | string;
  profileId: string;
};

export async function serverEmployeeSironaProfile(
  irisOrEnv: IrisClientOrEnv,
  username: null | string | undefined,
): Promise<EmployeeSironaProfile> {
  if (!username) {
    throw new ServerEmployeeSironaProfileError("INVALID_INPUT");
  }

  let response: {
    fullName: string;
    id: string;
    image: {
      id: string;
    } | null;
    sironaProfile: {
      defaultFacility: {
        code: string;
      } | null;
      email: null | string;
      grants: {
        grant: string;
      }[];
      id: string;
    } | null;
  } | null = null;

  if (process.env.USE_MOCK_USER === "1") {
    return {
      defaultFacility: asFacility("rnb"),
      email: "test@akesoholding.cz",
      employeeId: "_test_user_",
      fullName: "Test Test",
      grants: deserializeAuthUserProfileScopes([]),
      image: null,
      profileId: "_test_profile_id_",
    } satisfies EmployeeSironaProfile;
  }

  try {
    ({ employee: response } = await createIrisClient(irisOrEnv).query({
      employee: {
        __args: {
          domainLogin: username,
        },
        fullName: true,
        id: true,
        image: {
          id: true,
        },
        sironaProfile: {
          defaultFacility: {
            code: true,
          },
          email: true,
          grants: {
            grant: true,
          },
          id: true,
        },
      },
    }));
  } catch (err) {
    console.error("Attempt to fetch Employee Sirona profile from IRIS failed with error", err);
    throw new ServerEmployeeSironaProfileError("PROFILE_NOT_FOUND");
  }

  if (response == null) {
    throw new ServerEmployeeSironaProfileError("PROFILE_NOT_FOUND");
  }

  if (response.sironaProfile == null) {
    throw new ServerEmployeeSironaProfileError("PROFILE_NOT_FOUND");
  }

  const defaultFacility: Facility = tryFacility(camelCase(response.sironaProfile.defaultFacility?.code ?? ""));

  const profile: EmployeeSironaProfile = {
    defaultFacility,
    email: response.sironaProfile.email,
    employeeId: response.id,
    fullName: response.fullName,
    grants: deserializeAuthUserProfileScopes(response.sironaProfile.grants.map((g) => g.grant)),
    image: response.image?.id != null ? `/api/employee/${response.id}/image/` : null,
    profileId: response.sironaProfile.id,
  };

  return profile;
}

export function serializeAuthUserProfileGrants(grants: AuthUserProfileGrant[]): string[] {
  return grants.map((g) => g.origin);
}

export function deserializeAuthUserProfileScopes(grants: string[]): AuthUserProfileGrant[] {
  const res: AuthUserProfileGrant[] = [];

  // scope format je `Feature:[Role]@[Facility.]
  //
  for (const _grant_ of grants) {
    const grant = _grant_.trim();
    if (!grant) continue;
    const [permissionAndRole, argList] = grant.split("@");
    const [permissionCode, roleCode] = permissionAndRole.split(":");
    const args = (argList || "").split("&");

    try {
      const item: AuthUserProfileGrant = {
        origin: grant,
        permission: tryPermission(camelCase(permissionCode)),
        role: roleCode ? tryAuthUserRole(camelCase(roleCode)) : undefined,
      };

      for (const arg of args) {
        const [argName, argValue] = arg.split("=");

        if (argValue) {
          switch (argName) {
            case "clinic":
              break;
            case "department":
              break;
            case "facility":
              const facility = tryFacility(camelCase(argValue));
              item.facility = facility;
              break;
            case "segment":
              break;
          }
        }
      }

      res.push(item);
    } catch (error) {
      console.error(
        "User grant deserialization failed. Try to deserialize grant '",
        grant,
        "' results with error",
        error,
      );
      continue;
    }
  }

  return res;
}

/**
 * Trys to find empoyee identifications.
 *
 * @param irisOrEnv
 * @param userAkordId
 * @param username
 * @returns Object with `employeeAkordId` and `employeeId`
 *
 * @throws {EmployeeIdentsUndefinedError}
 * @throws {EmployeeNotFoundError}
 */
// export async function serverEmployeeInfoByAkordIdOrUserName(
//   irisOrEnv: IrisClientOrEnv,
//   userAkordId: null | number | string | undefined,
//   username: null | string | undefined,
// ) {
//   const iris = createIrisClient(irisOrEnv);

//   const _userAkordId: number | undefined = userAkordId ? Number(userAkordId) : undefined;
//   const _username: string | undefined = username ? username : undefined;

//   if (_userAkordId == null && _username == null) {
//     throw new EmployeeIdentsUndefinedError();
//   }

//   const { employee } = await iris.query({
//     employee: {
//       __args: {
//         akordId: _userAkordId,
//         domainLogin: _username,
//       },
//       employeeAkordId: true,
//       id: true,
//     },
//   });

//   // User is not an Akord user.
//   if (employee == null) {
//     throw new EmployeeNotFoundError();
//   }

//   return {
//     employeeAkordId: Number(employee.employeeAkordId),
//     employeeId: employee.id,
//   };
// }

/**
 * Returns Employee profile.
 *
 * @param irisOrEnv Iris client or env getter.
 * @param employeeId Employee IRIS id.
 * @returns Employee profile
 *
 * @throws {EmployeeProfileNotFoundError}
 * @throws {EmployeeProfileNoHospitalAssignedToError}
 */
// export async function serverEmployeeProfile(irisOrEnv: IrisClientOrEnv, employeeId: string): Promise<AuthUserProfile> {
//   const { sironaEmployeeProfile } = await createIrisClient(irisOrEnv).query({
//     sironaEmployeeProfile: {
//       __args: { employeeId },
//       hospitals: {
//         features: {
//           featureId: true,
//           roleId: true,
//         },
//         hospital: {
//           kind: true,
//         },
//       },
//       id: true,
//     },
//   });

//   if (sironaEmployeeProfile == null) {
//     throw new EmployeeProfileNotFoundError();
//   }

//   if (sironaEmployeeProfile.hospitals.length === 0) {
//     throw new EmployeeProfileNoHospitalAssignedToError();
//   }

//   // TODO: have to be set in profile
//   const hospitalDefault = sironaEmployeeProfile.hospitals[0].hospital.kind;
//   assertIsHospital(hospitalDefault);

//   const profile: AuthUserProfile = {
//     hospitalDefault,
//     hospitals: sironaEmployeeProfile.hospitals.map((h) => {
//       const hospitalKind = h.hospital.kind;
//       assertIsHospital(hospitalKind);

//       return {
//         features: h.features.map<{ featureId: Feature; roleId: AuthUserRole }>((f) => {
//           const { featureId, roleId } = f;
//           assertIsFeature(featureId);
//           assertIsAuthUserRole(roleId);
//           return { featureId, roleId };
//         }),
//         hospitalKind,
//       };
//     }),
//   };

//   return profile;
// }
