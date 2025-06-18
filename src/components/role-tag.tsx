import type { TagProps } from "@akeso/ui-components";
import type { ClassList } from "@builder.io/qwik";

import { Tag } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import type { AuthUserRole } from "~/config/user-roles";

export type RoleTagProps = {
  class?: ClassList;
  role: "PATIENT" | AuthUserRole;
  size?: TagProps<any>["size"];
};

export const RoleTag = component$(({ class: pClass, role, size }: RoleTagProps) => {
  let severity: TagProps<any>["severity"] = "none";
  let label: string = "";

  if (role === "DOCTOR") {
    severity = "highlight";
    label = "Lékař";
  } else if (role === "NURSE") {
    severity = "success";
    label = "Sestra";
  } else if (role === "ADMINISTRATIVE") {
    severity = "warning";
    label = "Administrativa";
  } else if (role === "PATIENT") {
    severity = "danger";
    label = "Pacient";
  }

  return (
    <Tag class={pClass} severity={severity} size={size}>
      {label}
    </Tag>
  );
});
