import type { Signal } from "@builder.io/qwik";

import { component$, createContextId, Slot, useContext, useContextProvider, useSignal } from "@builder.io/qwik";
import { globalAction$, validator$ } from "@builder.io/qwik-city";

import type { Facility } from "~/config/facilities";

import { facilities } from "~/config/facilities";

export type SelectedFacilityContext = {
  availableFacilities: Facility[];
  selectedFacility: Signal<Facility | undefined>;
};

const SelectedFacilityContextId = createContextId<SelectedFacilityContext>("selected-facility");

export const useSelectedFacility = () => useContext(SelectedFacilityContextId);

// eslint-disable-next-line qwik/loader-location
export const useUpdateSelectedFacility = globalAction$(
  (values, { cookie, redirect }) => {
    const currentFacility = values.currentFacility as { currentFacility: Facility };
    cookie.set("currentFacility", currentFacility, { path: "/" });
    throw redirect(303, "/");
  },
  validator$((_, data) => {
    if (
      !!data &&
      typeof data === "object" &&
      "currentFacility" in data &&
      facilities.includes(data.currentFacility as any)
    ) {
      return { data, success: true };
    }

    return {
      error: {
        message: "Bad facility",
      },
      status: 400,
      success: false,
    };
  }),
);

type SelectedFacilityProviderProps = {
  availableFacilities: Facility[];
  defaultFacility: Facility | undefined;
};

export const SelectedFacilityProvider = component$<SelectedFacilityProviderProps>(
  ({ availableFacilities, defaultFacility }) => {
    const selectedFacility = useSignal<Facility | undefined>(defaultFacility);
    useContextProvider(SelectedFacilityContextId, { availableFacilities, selectedFacility });

    return (
      <>
        <Slot />
      </>
    );
  },
);
