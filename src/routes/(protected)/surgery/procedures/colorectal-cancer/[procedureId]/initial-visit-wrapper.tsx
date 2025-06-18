import { component$, Slot } from "@builder.io/qwik";

import type { RoleTagProps } from "~/components/role-tag";

import { VisitWrapper } from "./visit-wrapper";

type InitialVisitWrapperProps = {
  role: RoleTagProps["role"];
};

export const InitialVisitWrapper = component$(({ role }: InitialVisitWrapperProps) => {
  return (
    <VisitWrapper name="Vstupní návštěva indikační ambulance" role={role}>
      <Slot />
    </VisitWrapper>
  );
});
