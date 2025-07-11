import { type QwikHTMLElements } from "@builder.io/qwik";
export type ListItemProps<C extends "div" | "li" | "span"> = QwikHTMLElements[C] & {
    as?: C;
};
export declare const ListItem: <C extends "div" | "li" | "span">(props: import("@builder.io/qwik").PublicProps<ListItemProps<C>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
