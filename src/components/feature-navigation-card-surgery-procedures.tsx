import { MenuItem } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { useSurgeryDepartmentContext } from "~/contexts/departments/surgery/surgery-context";

import { FeatureNavigationCard } from "./feature-navigation-card";

/** @deprecated */
export const FeatureNavigationCardSurgeryProcedures = component$(() => {
  const surgeryDepartmentCtx = useSurgeryDepartmentContext();

  return (
    <FeatureNavigationCard
      class="bg-teal-600"
      href="/surgery/procedures/"
      label="Postupy"
      moreOptions={
        <>
          <MenuItem
            onClick$={() => {
              surgeryDepartmentCtx.selectProcedureDialogOpenSig.value = true;
            }}
            type="button"
          >
            Vytvořit nový postup
          </MenuItem>
        </>
      }
      shortName="POP"
      sublabel="Přehed postupů oddělení chirurgie"
    />
  );
});
