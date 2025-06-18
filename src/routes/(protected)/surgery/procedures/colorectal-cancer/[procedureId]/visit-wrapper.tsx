import { Card, CardBody, CardHeader, CardHeaderTitle } from "@akeso/ui-components";
import { component$, Slot } from "@builder.io/qwik";

import type { RoleTagProps } from "~/components/role-tag";

import { RoleTag } from "~/components/role-tag";

type VisitWrapperProps = {
  name: string;
  role: RoleTagProps["role"];
};

export const VisitWrapper = component$(({ name, role }: VisitWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        <CardHeaderTitle class="flex items-center">
          <span class="flex-auto">{name}</span>
          <RoleTag class="ml-4" role={role} />
        </CardHeaderTitle>
      </CardHeader>
      <CardBody class="form-styles p-4">
        <Slot />
      </CardBody>
    </Card>
  );
});
