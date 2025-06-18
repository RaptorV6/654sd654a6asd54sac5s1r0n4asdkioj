import { component$, Slot } from "@builder.io/qwik";

import { SubscriptionsProvider } from "~/subscriptions";

import { DepartmentContextsProvider } from "./departments/department-contexts";
import { PageProgressIndicatorProvider } from "./page-progress-indicator/page-progress-indicator-provider";
import { PatientDetailDrawerProvider } from "./patient-detail-drawer/patient-detail-drawer-provider";
import { SalusAccountProvider } from "./salus-account/salus-account-context";

export const ProtectedLayoutProviders = component$(() => {
  return (
    <SubscriptionsProvider>
      <DepartmentContextsProvider>
        <PageProgressIndicatorProvider>
          <SalusAccountProvider>
            <PatientDetailDrawerProvider>
              <Slot />
            </PatientDetailDrawerProvider>
          </SalusAccountProvider>
        </PageProgressIndicatorProvider>
      </DepartmentContextsProvider>
    </SubscriptionsProvider>
  );
});
