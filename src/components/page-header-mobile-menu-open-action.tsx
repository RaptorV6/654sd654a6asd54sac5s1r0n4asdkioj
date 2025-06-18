import { component$, useContext } from "@builder.io/qwik";

import { LayoutMobileMenuOpenContextId } from "./layout-context";

export const PageHeaderMobileMenuOpenAction = component$(() => {
  const mobileMenuOpen = useContext(LayoutMobileMenuOpenContextId);

  return (
    <button
      // class={"-m-2.5 p-2.5 text-white lg:hidden"}
      class={"-m-2.5 p-2.5 text-white"}
      onClick$={() => {
        mobileMenuOpen.value = true;
      }}
      type="button"
    >
      <span class="sr-only">Open sidebar</span>
      <svg aria-hidden="true" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  );
});
