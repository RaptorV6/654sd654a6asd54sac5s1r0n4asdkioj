import type { QwikIntrinsicElements } from "@builder.io/qwik";
export declare const alertDialogContentSeverityOptions: readonly ["danger", "warning"];
export type AlertDialogContentSeverity = (typeof alertDialogContentSeverityOptions)[number];
export type AlertDialogContentProps = {
    severity?: AlertDialogContentSeverity;
} & QwikIntrinsicElements["div"];
export declare const AlertDialogContent: import("@builder.io/qwik").Component<AlertDialogContentProps>;
