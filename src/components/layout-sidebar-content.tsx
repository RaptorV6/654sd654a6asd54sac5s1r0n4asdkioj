import { component$ } from "@builder.io/qwik";

import type { HospitalDepartmentNav } from "~/routes/main-navigation";

import { useAuthUser } from "~/routes/plugin@auth";

import { LayoutSidebarContentUserMenu } from "./layout-sidebar-content-user-menu";
import { LayoutSidebarFacilitySelect } from "./layout-sidebar-hospital-select";
import { LayoutSidebarItem } from "./layout-sidebar-item";

type LayoutSidebarContentProps = { navItems: HospitalDepartmentNav[] };

export const LayoutSidebarContent = component$(({ navItems }: LayoutSidebarContentProps) => {
  const authUser = useAuthUser();

  return (
    <>
      <LayoutSidebarFacilitySelect />

      <nav class="flex flex-1 flex-col">
        <ul class="flex flex-1 flex-col gap-y-7" role="list">
          <li>
            <ul class="-mx-2 space-y-1" role="list">
              <LayoutSidebarItem
                href="/"
                icon={
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
                label="Dashboard"
              />
              {navItems.map((item) => (
                <LayoutSidebarItem
                  // class="hidden"
                  href={item.href}
                  initials={item.shortName}
                  key={`static-nav-item-${item.id}`}
                  label={item.label}
                  subitems={item.subitems}
                />
              ))}
            </ul>
          </li>
          {/* TODO: REMOVE */}
          {/* Only for test reasons. */}
          {/* <li class="-mx-6 border-t border-app-border-base pt-4">
            <ul class="mx-4 flex flex-1 flex-col gap-y-7" role="list">
              <LayoutSidebarItem href="/email-forms/" label="test- odelani formularu" />
            </ul>
          </li> */}
          <li class="-mx-6 mt-auto border-t border-app-border-base pt-2">
            <ul class="mb-4">
              <li>
                <LayoutSidebarContentUserMenu userFullName={authUser.name} userImage={authUser.image} />
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
});
