import { component$, Slot } from "@builder.io/qwik";

export const FeatureNavigationCardContainer = component$(() => {
  return (
    <ul class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3" role="list">
      <Slot />
    </ul>
  );
});
