import { ToasterProvider } from "@akeso/ui-components";
import { component$, Slot } from "@builder.io/qwik";

export const MainLayoutProviders = component$(() => {
  return (
    <ToasterProvider>
      <Slot />
    </ToasterProvider>
  );
});
