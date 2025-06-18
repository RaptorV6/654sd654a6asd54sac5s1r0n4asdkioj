import { component$, useSignal } from "@builder.io/qwik";

import type { HospitalDepartmentNav } from "~/routes/main-navigation";

import { LayoutSidebarContent } from "./layout-sidebar-content";

type LayoutSidebarStaticProps = {
  navItems: HospitalDepartmentNav[];
};

export const LayoutSidebarStatic = component$(({ navItems }: LayoutSidebarStaticProps) => {
  const moveOn = useSignal(false);
  return (
    <div
      class={[
        "hidden border-r border-app-border-base bg-app-nav-surface transition-all ease-in-out lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col",
      ]}
      id="static-side-bar"
      onMouseEnter$={() => {
        moveOn.value = true;
      }}
      onMouseLeave$={() => {
        moveOn.value = false;
      }}
    >
      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6">
        <LayoutSidebarContent navItems={navItems} />
      </div>
    </div>
  );
});
