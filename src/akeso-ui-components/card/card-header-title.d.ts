import type { ClassList, QwikHTMLElements } from "@builder.io/qwik";
export type CardHeaderTitleProps<C extends keyof QwikHTMLElements> = {
    as?: C;
    class?: ClassList;
} & QwikHTMLElements[C];
export declare const CardHeaderTitle: <C extends keyof HTMLElementTagNameMap>(props: import("@builder.io/qwik").PublicProps<CardHeaderTitleProps<C>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
