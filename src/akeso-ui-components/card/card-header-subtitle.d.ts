import type { ClassList, QwikHTMLElements } from "@builder.io/qwik";
export type CardHeaderSubtitleProps<C extends keyof QwikHTMLElements> = QwikHTMLElements[C] & {
    as?: C;
    class?: ClassList;
};
export declare const CardHeaderSubtitle: <C extends keyof HTMLElementTagNameMap>(props: import("@builder.io/qwik").PublicProps<CardHeaderSubtitleProps<C>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
