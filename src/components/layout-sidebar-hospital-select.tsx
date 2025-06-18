import { ButtonLabelIcon, Menu, MenuItem, useFloating } from "@akeso/ui-components";
import { component$, useId, useSignal } from "@builder.io/qwik";

import { getFacilityDefinition } from "~/config/facilities";

import { FacilityAvatar } from "./facility-avatar";
import { AkesoSpiralLogo } from "./icons-akeso";
import { CheckOutlineIcon, ExpandUpDownOutlineIcon } from "./icons-outline";
import { useSelectedFacility, useUpdateSelectedFacility } from "./selected-facility-context";

export const LayoutSidebarFacilitySelect = component$(() => {
  const selectedFacilityCtx = useSelectedFacility();

  return (
    <div class="-mx-6 flex h-16 shrink-0 items-center border-b border-app-border-base bg-app-nav-heading text-app-nav-heading-text">
      {selectedFacilityCtx.selectedFacility.value ? <FacilitySelect /> : <NoFacility />}
    </div>
  );
});

/*
 * INTERNAL COMPONENTS
 */

const NoFacility = component$(() => {
  return (
    <div class="flex h-16 shrink-0 items-center">
      <div class="flex items-center leading-none">
        <AkesoSpiralLogo class="h-8 w-8 shrink-0" />
        <span aria-hidden="true" class="m-0 truncate pl-2 text-2xl font-bold leading-none">
          Akeso
        </span>
      </div>
    </div>
  );
});

const FacilitySelect = component$(() => {
  const updateFacilityAction = useUpdateSelectedFacility();
  const selectedFacilityCtx = useSelectedFacility();
  const popoverId = useId();
  const anchorRef = useSignal<HTMLElement>();
  const popoverRef = useSignal<HTMLElement>();

  useFloating(anchorRef, popoverRef, { placement: "bottom-start" });

  // User has single hospital assigned.
  if (selectedFacilityCtx.availableFacilities.length === 1) {
    return (
      <div class="flex h-full w-full items-center px-2 py-2">
        <FacilityAvatar facility={selectedFacilityCtx.selectedFacility.value} />
        <span class={"ml-1.5 flex-1 truncate text-left leading-4 transition-all"}>
          {getFacilityDefinition(selectedFacilityCtx.selectedFacility.value!)!.name}
        </span>
      </div>
    );
  }

  return (
    <>
      <button class="flex h-full w-full items-center px-2 py-2" popovertarget={popoverId} ref={anchorRef} type="button">
        <FacilityAvatar facility={selectedFacilityCtx.selectedFacility.value} />
        <span class={"ml-1.5 flex-1 truncate text-left leading-4 transition-all"}>
          {getFacilityDefinition(selectedFacilityCtx.selectedFacility.value!)!.name}
        </span>
        <ButtonLabelIcon as={ExpandUpDownOutlineIcon} sm />
      </button>
      <Menu id={popoverId} ref={popoverRef}>
        {selectedFacilityCtx.availableFacilities.map((facility) => {
          const hospitalDescriptor = getFacilityDefinition(facility)!;

          return (
            <MenuItem
              key={hospitalDescriptor.id}
              onClick$={async () => {
                await updateFacilityAction.submit({ currentHospital: hospitalDescriptor.id });
                // selectedFacilityCtx.selectedFacility.value = hospitalDescriptor.id;
                popoverRef.value?.hidePopover();
              }}
              role="menuitem"
              type="button"
            >
              <FacilityAvatar class="mr-2" facility={facility} />
              <span class="flex-1">
                <span class="menu-item-title block">{hospitalDescriptor.name}</span>
                {/* <span class="menu-item-description block">{hospital.description}</span> */}
              </span>
              <span class="inline-flex h-5 w-5 items-center">
                {facility === selectedFacilityCtx.selectedFacility.value && <CheckOutlineIcon class="h-5 w-5" />}
              </span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
});
