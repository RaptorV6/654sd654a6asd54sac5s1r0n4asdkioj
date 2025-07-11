import type { ClassList, QwikIntrinsicElements } from "@builder.io/qwik";
export declare const pillSeverityOptions: readonly ["accent", "danger", "highlight", "info", "none", "progress", "success", "warning"];
export type PillSeverity = (typeof pillSeverityOptions)[number];
export declare const pillSizeOptions: readonly ["base", "sm"];
export type PillSize = (typeof pillSizeOptions)[number];
export type PillProps<C extends keyof QwikIntrinsicElements> = QwikIntrinsicElements[C] & {
    as?: C;
    class?: ClassList;
    dot?: boolean;
    flat?: boolean;
    pulse?: boolean;
    severity?: PillSeverity;
    size?: PillSize;
};
export declare const Pill: <C extends keyof QwikIntrinsicElements>(props: import("@builder.io/qwik").PublicProps<PillProps<C>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
