import type { ClassList, QwikIntrinsicElements } from "@builder.io/qwik";
export declare const statusIndicatorSeverityOptions: readonly ["accent", "danger", "highlight", "info", "none", "progress", "success", "warning"];
export type StatusIndicatorSeverity = (typeof statusIndicatorSeverityOptions)[number];
export declare const statusIndicatorSizeOptions: readonly ["base", "lg"];
export type StatusIndicatorSize = (typeof statusIndicatorSizeOptions)[number];
export type StatusIndicatorProps<C extends keyof QwikIntrinsicElements> = QwikIntrinsicElements[C] & {
    as?: C;
    class?: ClassList;
    pulse?: boolean;
    severity?: StatusIndicatorSeverity;
    size?: StatusIndicatorSize;
};
export declare const StatusIndicator: <C extends keyof QwikIntrinsicElements>(props: import("@builder.io/qwik").PublicProps<StatusIndicatorProps<C>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
