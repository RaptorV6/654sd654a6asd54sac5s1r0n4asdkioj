import { component$ } from "@builder.io/qwik";

import { FeatureNavigationCard } from "./feature-navigation-card";

/** @deprecated */
export const FeatureNavigationCardInternsAmbulanceExpectations = component$(() => {
  return (
    <FeatureNavigationCard
      class="bg-rose-600"
      href="/interns/ambulance/expectations/"
      label="Expektace pacienta"
      shortName="EP"
      sublabel="Expektace pacienta na interní ambulanci"
    />
  );
});
