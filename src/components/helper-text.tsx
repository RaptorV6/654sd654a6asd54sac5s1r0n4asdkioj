// TODO: FIXME use component to `ui-components`

import type { ClassList } from "@builder.io/qwik";

import { component$, Slot } from "@builder.io/qwik";

export const helperTextSeverityOptions = ["danger", "highlight", "none", "warning"] as const;
export type HelperTextSeverity = (typeof helperTextSeverityOptions)[number];

export type HelperTextProps = {
  class?: ClassList;
  severity?: HelperTextSeverity;
};

export const HelperText = component$(({ class: pClass, severity = "none" }: HelperTextProps) => {
  return (
    <p
      class={[
        "mt-1 text-xs",
        severity === "danger" && "text-danger-base",
        severity === "highlight" && "text-accent-base",
        severity === "none" && "text-app-text-weaker",
        severity === "warning" && "text-warning-base",
        pClass,
      ]}
      role="tooltip"
    >
      <Slot />
    </p>
  );
});
