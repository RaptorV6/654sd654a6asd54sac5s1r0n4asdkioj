import type { ClassList, QwikIntrinsicElements } from "@builder.io/qwik";
export declare const tagSeverityOptions: readonly ["accent", "danger", "highlight", "info", "none", "progress", "success", "warning"];
export type TagSeverity = (typeof tagSeverityOptions)[number];
export declare const tagSizeOptions: readonly ["base", "sm"];
export type TagSize = (typeof tagSizeOptions)[number];
export type TagProps<C extends keyof QwikIntrinsicElements> = QwikIntrinsicElements[C] & {
    as?: C;
    class?: ClassList;
    dot?: boolean;
    flat?: boolean;
    pulse?: boolean;
    severity?: TagSeverity;
    size?: TagSize;
};
export declare const Tag: <C extends keyof QwikIntrinsicElements>(props: import("@builder.io/qwik").PublicProps<TagProps<C>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
