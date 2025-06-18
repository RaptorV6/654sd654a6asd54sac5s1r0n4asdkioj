import type { ClassList } from "@builder.io/qwik";

import { component$, createContextId, Slot, useContext, useContextProvider } from "@builder.io/qwik";

type DataPreviewVariant = "grid" | "vertical";

const DataPreviewContextId = createContextId<{ variant: DataPreviewVariant }>("DataPreviewContextId");

type DataPreviewProps = {
  class?: ClassList;
  variant?: DataPreviewVariant;
};

export const DataPreview = component$(({ class: pClass, variant = "vertical" }: DataPreviewProps) => {
  useContextProvider(DataPreviewContextId, { variant });

  return (
    <dl
      class={[
        variant === "vertical" && "divide-y divide-app-border-base",
        variant === "grid" && "grid grid-cols-1 px-6 sm:grid-cols-2 lg:grid-cols-4",
        pClass,
      ]}
    >
      <Slot />
    </dl>
  );
});

export const DataPreviewField = component$(() => {
  const { variant } = useContext(DataPreviewContextId);

  return (
    <div
      class={[
        variant === "vertical" && "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
        variant === "grid" && "border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0",
      ]}
    >
      <Slot />
    </div>
  );
});

export const DataPreviewFieldLabel = component$(() => {
  return (
    <dt class="text-sm font-bold text-app-text-strong">
      <Slot />
    </dt>
  );
});

export const DataPreviewFieldValue = component$(() => {
  const { variant } = useContext(DataPreviewContextId);

  return (
    <dd
      class={[
        "mt-1 text-sm leading-6 text-app-text-base sm:col-span-2",
        variant === "vertical" && " sm:mt-0",
        variant === "grid" && "sm:mt-2",
      ]}
    >
      <Slot />
    </dd>
  );
});
