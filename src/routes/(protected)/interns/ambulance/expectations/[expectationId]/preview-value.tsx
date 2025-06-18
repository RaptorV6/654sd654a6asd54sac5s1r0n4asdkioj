import type { ClassList } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

type PreviewValueProps = {
  class?: ClassList;
  label: string;
  value: string;
};

export const PreviewValue = component$<PreviewValueProps>(({ class: pClass, label, value }) => {
  return (
    <div class={[pClass]}>
      <p class="text-sm text-app-text-weak">{label}</p>
      <p class="min-h-6 text-sm font-bold">{value}</p>
    </div>
  );
});
