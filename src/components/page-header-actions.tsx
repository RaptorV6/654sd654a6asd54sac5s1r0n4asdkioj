import { component$, Slot } from "@builder.io/qwik";

export const PageHeaderActions = component$(() => {
  return (
    <div class="flex flex-1 justify-end gap-x-2">
      <Slot />
    </div>
  );
});
