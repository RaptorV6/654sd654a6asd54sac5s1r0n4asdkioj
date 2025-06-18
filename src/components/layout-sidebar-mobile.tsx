import { component$, useContext, useSignal, useTask$ } from "@builder.io/qwik";
// eslint-disable-next-line perfectionist/sort-imports
import { isServer } from "@builder.io/qwik/build";
import { animate, timeline } from "motion";

import type { HospitalDepartmentNav } from "~/routes/main-navigation";

import { LayoutMobileMenuOpenContextId } from "./layout-context";
import { LayoutSidebarContent } from "./layout-sidebar-content";

type LayoutSidebarMobileProps = {
  navItems: HospitalDepartmentNav[];
};

export const LayoutSidebarMobile = component$(({ navItems }: LayoutSidebarMobileProps) => {
  const menuRef = useSignal<HTMLDivElement>();
  const mobileMenuOpen = useContext(LayoutMobileMenuOpenContextId);

  useTask$(({ track }) => {
    const menuOpen = track(() => mobileMenuOpen.value);

    if (isServer) {
      return;
    }

    if (menuOpen) {
      timeline([
        ["#layout-sidebar-mobile-backdrop", { inset: "0" }],
        ["#layout-sidebar-mobile-backdrop", { opacity: [0, 1] }, { duration: 0.3 }],
      ]);
    } else {
      timeline([
        ["#layout-sidebar-mobile-backdrop", { opacity: [1, 0] }, { duration: 0.3 }],
        ["#layout-sidebar-mobile-backdrop", { inset: "100%" }],
      ]);
    }

    animate(
      "#layout-sidebar-mobile-panel",
      {
        transform: menuOpen ? ["translate(-100%, 0)", "translate(0, 0)"] : ["translate(0, 0)", "translate(-100%, 0)"],
      },
      {
        direction: "normal",
        duration: 0.3,
        easing: "ease-in-out",
      },
    );

    animate(
      "#layout-sidebar-mobile-button",
      {
        opacity: menuOpen ? [0, 1] : [1, 0],
      },
      {
        direction: "normal",
        duration: 0.3,
        easing: "ease-in-out",
      },
    );
  });

  return (
    <div aria-modal="true" class="relative z-50" id="layout-sidebar-mobile" role="dialog">
      {/* <div aria-modal="true" class="relative z-50 lg:hidden" id="layout-sidebar-mobile" role="dialog"> */}
      <div
        class={[mobileMenuOpen.value ? "inset-0" : "inset-full", "fixed bg-app-overlay"]}
        id="layout-sidebar-mobile-backdrop"
      />
      <div
        class={["fixed flex", mobileMenuOpen.value ? "inset-0" : "inset-full"]}
        id="layout-sidebar-mobile-panel"
        onClick$={(event) => {
          const menuWidth = (menuRef.value?.offsetLeft ?? 0) + (menuRef.value?.offsetWidth ?? 0);
          if (event.clientX > menuWidth) {
            mobileMenuOpen.value = false;
          }
        }}
      >
        <div class="relative mr-16 flex w-full max-w-xs flex-1" ref={menuRef}>
          <div class="absolute left-full top-0 flex w-16 justify-center pt-5" id="layout-sidebar-mobile-button">
            <button
              class="-m-2.5 p-2.5"
              onClick$={(event) => {
                event.stopPropagation();
                mobileMenuOpen.value = false;
              }}
              type="button"
            >
              <span class="sr-only">Close sidebar</span>
              <svg
                aria-hidden="true"
                class="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-app-nav-surface px-6 pb-2">
            <LayoutSidebarContent navItems={navItems} />
          </div>
        </div>
      </div>
    </div>
  );
});
