import { component$ } from "@builder.io/qwik";

import { FeatureNavigationCard } from "./feature-navigation-card";

/** @deprecated */
export const FeatureNavigationCardSurgeryAdmission = component$(() => {
  return (
    <FeatureNavigationCard
      class="bg-teal-600"
      href="/surgery/admission/"
      label="Příjem pacienta k operaci"
      shortName="POP"
      sublabel="Vytvoření přijímací zprávy při příjmu pacienta k operaci"
    />
  );
});
