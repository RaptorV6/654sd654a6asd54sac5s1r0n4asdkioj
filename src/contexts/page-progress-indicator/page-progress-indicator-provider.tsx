import type { Signal } from "@builder.io/qwik";

import { PageProgressIndicator } from "@akeso/ui-components";
import { component$, createContextId, Slot, useContext, useContextProvider, useSignal } from "@builder.io/qwik";

type PageProgressIndicatorContext = {
  showPageProgressIndicatorSig: Signal<boolean>;
};

const PageProgressIndicatorContextId = createContextId<PageProgressIndicatorContext>("PageProgressIndicatorContextId");

export function useShowPageProgressIndicator() {
  return useContext(PageProgressIndicatorContextId);
}

export const PageProgressIndicatorProvider = component$(() => {
  const showPageProgressIndicatorSig = useSignal(false);

  useContextProvider(PageProgressIndicatorContextId, {
    showPageProgressIndicatorSig,
  });

  return (
    <>
      <Slot />
      <PageProgressIndicator bind:show={showPageProgressIndicatorSig} />
    </>
  );
});
