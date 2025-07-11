import type { ClassList } from "@builder.io/qwik";
export declare const helperTextSeverityOptions: readonly ["danger", "highlight", "none", "warning"];
export type HelperTextSeverity = (typeof helperTextSeverityOptions)[number];
export type HelperTextProps = {
    class?: ClassList;
    severity?: HelperTextSeverity;
};
export declare const HelperText: import("@builder.io/qwik").Component<HelperTextProps>;
