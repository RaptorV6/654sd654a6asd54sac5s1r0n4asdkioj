import { component$, Slot } from "@builder.io/qwik";

import { PageHeaderMobileMenuOpenAction } from "./page-header-mobile-menu-open-action";

export const PageHeader = component$(() => {
  return (
    <header class="top-0 z-40 -mx-2 flex h-16 shrink-0 items-center gap-x-4 border-b border-app-border-base bg-app-nav-heading px-4 text-app-nav-heading-text shadow-sm sm:gap-x-6 sm:px-6 md:-mx-4 lg:sticky lg:-mx-8 lg:px-8">
      <PageHeaderMobileMenuOpenAction />
      <Slot />
    </header>
  );
});
