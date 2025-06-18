import { component$, Slot } from "@builder.io/qwik";

import { SurgeryDepartmentContextProvider } from "./surgery/surgery-context";

export const DepartmentContextsProvider = component$(() => (
  <SurgeryDepartmentContextProvider>
    <Slot />
  </SurgeryDepartmentContextProvider>
));
