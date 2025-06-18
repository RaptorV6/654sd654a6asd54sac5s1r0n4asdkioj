import type { ClassList, JSXOutput, Signal } from "@builder.io/qwik";

import { component$, createContextId, Slot, useContext, useContextProvider, useId, useSignal } from "@builder.io/qwik";

type TabsContext = {
  currentTabSig: Signal<number>;
};
const TabsContextId = createContextId<TabsContext>("tabs-context");
export function useTabsContext() {
  return useContext(TabsContextId);
}

export type TabsProps = {
  class?: ClassList;
  defaultTabIndex?: number;
  tabHeaders: JSXOutput[];
};

export const Tabs = component$(({ class: pClass, defaultTabIndex, tabHeaders }: TabsProps) => {
  const myId = useId();
  const currentTabSig = useSignal<number>(defaultTabIndex ?? 0);

  useContextProvider(TabsContextId, { currentTabSig });

  return (
    <div class={pClass} id={myId}>
      <div class="mb-4 overflow-y-auto">
        <div class="w-fit border-b border-gray-200">
          <nav aria-label="Tabs" class="-mb-px flex space-x-8">
            {tabHeaders.map((tab, idx) => (
              <TabsHeaderItem key={`${myId}-${idx}`} myIdx={idx}>
                {tab}
              </TabsHeaderItem>
            ))}
          </nav>
        </div>
      </div>

      <Slot />
    </div>
  );
});

type TabsHeaderItemProps = {
  myIdx: number;
};

const TabsHeaderItem = component$(({ myIdx }: TabsHeaderItemProps) => {
  const ctx = useTabsContext();

  return (
    <button
      class={[
        "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
        ctx.currentTabSig.value === myIdx
          ? "border-accent-border-base text-accent-text-base"
          : "border-transparent text-app-text-base hover:border-app-border-hover hover:text-app-text-strong",
      ]}
      onClick$={() => {
        ctx.currentTabSig.value = myIdx;
      }}
      type="button"
    >
      <Slot />
    </button>
  );
});

type TabsTabProps = {
  class?: ClassList;
  index: number;
};
export const TabsTab = component$(({ class: pClass, index: myIdx }: TabsTabProps) => {
  const ctx = useTabsContext();

  if (ctx.currentTabSig.value !== myIdx) {
    return null;
  }

  return (
    <div class={pClass}>
      <Slot />
    </div>
  );
});
