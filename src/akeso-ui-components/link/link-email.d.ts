import type { ClassList, JSXOutput, QwikIntrinsicElements } from "@builder.io/qwik";
export type LinkEmailProps = Omit<QwikIntrinsicElements["a"], "href"> & {
    class?: ClassList;
    email: null | string | undefined;
    fallback?: JSXOutput;
};
export declare const LinkEmail: import("@builder.io/qwik").Component<LinkEmailProps>;
