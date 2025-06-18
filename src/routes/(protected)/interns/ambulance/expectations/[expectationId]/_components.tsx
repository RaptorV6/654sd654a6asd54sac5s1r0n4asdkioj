import type { ClassList } from "@builder.io/qwik";

import { component$, Slot } from "@builder.io/qwik";

export const ExpectationBlock = component$(() => {
  return (
    <div class="rounded border border-app-border-strong p-4">
      <Slot />
    </div>
  );
});

type ExpectationBlockTitleProps = {
  class?: ClassList;
};

export const ExpectationBlockTitle = component$<ExpectationBlockTitleProps>((props) => {
  return (
    <h3 class={["text-sm font-bold", props.class]}>
      <Slot />
    </h3>
  );
});
