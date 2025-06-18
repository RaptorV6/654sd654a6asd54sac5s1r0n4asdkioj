import type { QwikIntrinsicElements } from "@builder.io/qwik";

import { AvatarNiceText } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { type Facility, getFacilityDefinition } from "~/config/facilities";

type FacilityAvatarProps = { facility: Facility | undefined } & QwikIntrinsicElements["span"];

export const FacilityAvatar = component$(({ facility, ...props }: FacilityAvatarProps) => {
  const def = (facility ? getFacilityDefinition(facility) : null) ?? { code: "nh", shortName: "NH" };

  return (
    <AvatarNiceText {...props} style={{ backgroundColor: `hsl(var(--a-facility-${def.code.toLowerCase()}) / 1)` }}>
      {def.shortName.slice(0, 3)}
    </AvatarNiceText>
  );
});
