import type { RequestHandler } from "@builder.io/qwik-city";

import { component$, Slot, useContextProvider, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import type { Facility } from "~/config/facilities";

import { LayoutMobileMenuOpenContextId } from "~/components/layout-context";
import { LayoutSidebarMobile } from "~/components/layout-sidebar-mobile";
import { SelectedFacilityProvider, useSelectedFacility } from "~/components/selected-facility-context";
import { ProtectedLayoutProviders } from "~/contexts/protected-layout-providers";

import { getDepartmentNav } from "../main-navigation";
import { serverGetSession } from "../plugin@auth";
import "./facility-nav-heading.css";

export const onRequest: RequestHandler = (requestEvent) => {
  serverGetSession(requestEvent);
};

export const useLoadData = routeLoader$(async (requestEvent) => {
  const session = serverGetSession(requestEvent);
  const currentFacilityCookie = requestEvent.cookie.get("currentFacility");

  const availableFacilities: Facility[] = session.user.grants.map((g) => g.facility).filter((f): f is Facility => !!f);

  let currentFacility: Facility;
  if (currentFacilityCookie == null) {
    currentFacility = session.user.defaultFacility;
    requestEvent.cookie.set("currentFacility", currentFacility, { path: "/" });
  } else {
    const selFacility = currentFacilityCookie.value as Facility;

    const isAvail = availableFacilities.findIndex((f) => f === selFacility) > -1;
    if (isAvail) {
      currentFacility = currentFacilityCookie.value as Facility;
    } else {
      currentFacility = session.user.defaultFacility;
      requestEvent.cookie.set("currentFacility", currentFacility, { path: "/" });
    }
  }

  const navItems = getDepartmentNav(session.user, currentFacility);

  return {
    availableFacilities,
    currentFacility,
    navItems,
  };
});

export { useUpdateSelectedFacility } from "~/components/selected-facility-context";

export default component$(() => {
  const data = useLoadData();
  const mobileMenuOpen = useSignal<boolean>(false);
  useContextProvider(LayoutMobileMenuOpenContextId, mobileMenuOpen);

  return (
    <SelectedFacilityProvider
      availableFacilities={data.value.availableFacilities}
      defaultFacility={data.value.currentFacility}
    >
      <ProtectedLayoutProviders>
        <PerFacilityWrapper>
          <LayoutSidebarMobile navItems={data.value.navItems} />
          {/* <LayoutSidebarStatic navItems={data.value.navItems} /> */}

          {/* <main class="pb-10 lg:pl-52"> */}
          <main class="pb-4" id="main-content">
            <div class="px-2 md:px-4 lg:px-8">
              <Slot />
            </div>
          </main>
        </PerFacilityWrapper>
      </ProtectedLayoutProviders>
    </SelectedFacilityProvider>
  );
});

const PerFacilityWrapper = component$(() => {
  const currenctFacilityCtx = useSelectedFacility();
  return (
    <div
      class={
        currenctFacilityCtx.selectedFacility.value &&
        `facility-${currenctFacilityCtx.selectedFacility.value.toLowerCase()}`
      }
    >
      <Slot />
    </div>
  );
});
