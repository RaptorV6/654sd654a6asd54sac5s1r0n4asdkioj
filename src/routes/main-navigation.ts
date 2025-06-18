import type { Facility } from "~/config/facilities";
import type { Permission } from "~/config/permissions";

import { asPermission } from "~/config/permissions";

import type { AuthUser } from "./plugin@auth";
import type { UserAccessDescriptor } from "./user-has-permission";

import { userHasPermission } from "./user-has-permission";

export type HospitalDepartmentPreview = {
  color: string;
  href: string;
  id: string;
  label: string;
  shortName: string;
  sublabel?: string;
};

export type HospitalDepartmentNavSubitem = {
  end?: boolean;
  href: string;
  label: string;
};

export type HospitalDepartmentNav = {
  href?: string;
  id: string;
  label: string;
  shortName: string;
  subitems?: HospitalDepartmentNavSubitem[];
};

type HospitalDepartmentNavDef = {
  permissions: "*" | Permission | Permission[];
  subitems?: ({ permissions: "*" | Permission | Permission[] } & NonNullable<
    HospitalDepartmentNav["subitems"]
  >[number])[];
} & Omit<HospitalDepartmentNav, "subitems">;

export const getDepartmentNav = (user: AuthUser, currentFacility: Facility | undefined): HospitalDepartmentNav[] => {
  const def: HospitalDepartmentNavDef[] = [
    {
      id: "inters",
      label: "Interna",
      permissions: asPermission("internsAmbExpectation"),
      shortName: "I",
      subitems: [
        // {
        //   href: "/interns/ambulance/",
        //   label: "Ambulance",
        // },
        {
          href: "/interns/ambulance/expectations/",
          label: "Expektace pacienta",
          permissions: asPermission("internsAmbExpectation"),
        },
      ],
    },
    {
      href: "/palliative/",
      id: "palliative",
      label: "Paliativní péče",
      permissions: asPermission("palliativeCare"),
      shortName: "PP",
    },
    {
      id: "surgery",
      label: "Chirurgie",
      permissions: asPermission("surgeryAdmission"),
      shortName: "CH",
      subitems: [
        {
          href: "/surgery/admission/",
          label: "Příjem pacienta k operaci",
          permissions: asPermission("surgeryAdmission"),
        },
      ],
    },
  ];

  const deflatPermissions = (permissions: "*" | Permission | Permission[]): UserAccessDescriptor => {
    if (permissions === "*") return "*";
    return (Array.isArray(permissions) ? permissions : [permissions]).map((permission) => ({ permission }));
  };

  const reduceSubitems = (subitems: HospitalDepartmentNavDef["subitems"]) => {
    const r: HospitalDepartmentNavSubitem[] = [];
    for (const { permissions, ...rest } of subitems ?? []) {
      if (userHasPermission(user.grants, currentFacility, deflatPermissions(permissions))) {
        r.push(rest);
      }
    }

    return r.length > 0 ? r : undefined;
  };

  const items: HospitalDepartmentNav[] = [];
  for (const { permissions, ...rest } of def) {
    if (userHasPermission(user.grants, currentFacility, deflatPermissions(permissions))) {
      const item: HospitalDepartmentNav = {
        ...rest,
        subitems: reduceSubitems(rest.subitems),
      };

      if (item.href || item.subitems) {
        items.push(item);
      }
    }
  }

  return items;
};
