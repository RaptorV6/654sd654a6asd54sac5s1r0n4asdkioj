import type { QwikHTMLElements } from "@builder.io/qwik";
export declare const listVariantOptions: readonly ["cards", "divided", "plain"];
export type ListVariant = (typeof listVariantOptions)[number];
export type ListOwnProps = {
    active?: boolean;
    condensed?: boolean;
    variant?: ListVariant;
};
export type ListProps<C extends "div" | "ol" | "ul"> = {
    as?: C;
} & ListOwnProps & QwikHTMLElements[C];
export declare const List: <C extends "div" | "ol" | "ul">(props: import("@builder.io/qwik").PublicProps<ListProps<C>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
