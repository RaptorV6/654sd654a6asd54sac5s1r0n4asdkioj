import { component$ } from "@builder.io/qwik";

import { FeatureNavigationCard } from "./feature-navigation-card";

/** @deprecated */
export const FeatureNavigationCardPalliativeCare = component$(() => {
  return (
    <FeatureNavigationCard
      class="bg-blue-600"
      href="/palliative/"
      label="Paliativní péče"
      shortName="PP"
      sublabel="Přehled paliativní péče"
    />
  );
});
