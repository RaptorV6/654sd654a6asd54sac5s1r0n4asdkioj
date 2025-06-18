import type { JSXOutput } from "@builder.io/qwik";

import { MenuItem } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { FeatureNavigationCard } from "~/components/feature-navigation-card";
import { FeatureNavigationCardContainer } from "~/components/feature-navigation-card-container";
import { getPermissionDefinition, permissions } from "~/config/permissions";
import { useSurgeryDepartmentContext } from "~/contexts/departments/surgery/surgery-context";

import { useUserHasPermission } from "../use-user-has-permission";

export const DashboardFeatures = component$(() => {
  const uhf = useUserHasPermission();
  const surgeryDepartmentCtx = useSurgeryDepartmentContext();

  return (
    <div class="md:col-span-2 2xl:col-span-3">
      <FeatureNavigationCardContainer>
        {permissions.map((permission) => {
          if (!uhf(permission)) {
            // User has no access to current feature.
            return undefined;
          }

          const featureDef = getPermissionDefinition(permission);
          if (!featureDef) return undefined;
          const fap = featureDef.applicationProperties;

          let moreOptions: JSXOutput = undefined;
          switch (permission) {
            case "surgeryProcedures": {
              moreOptions = (
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
              );
              break;
            }
          }

          return (
            <FeatureNavigationCard
              href={fap.href}
              key={`feature-nav-card-${permission}`}
              label={fap.label}
              moreOptions={moreOptions}
              shortBgColor={fap.shortBgColor}
              shortFgColor={fap.shortFgColor}
              shortName={fap.short}
              sublabel={fap.sublabel}
            />
          );
        })}
      </FeatureNavigationCardContainer>
    </div>
  );
});
