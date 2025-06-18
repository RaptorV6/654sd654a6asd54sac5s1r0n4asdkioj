import { component$, Slot } from "@builder.io/qwik";

export const PageBreadcrumbsCurrent = component$(() => {
  return (
    <li
      aria-current="page"
      class="pl-2 text-sm capitalize leading-normal text-app-text-link before:float-left before:pr-2 before:text-app-text-link before:content-['/']"
    >
      <Slot />
    </li>
  );
});
