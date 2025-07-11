import type { QwikIntrinsicElements } from "@builder.io/qwik";
export declare const cardFooterVatiantOptions: readonly ["lowered", "none", "reised"];
export type CardFooterVatiant = (typeof cardFooterVatiantOptions)[number];
export type CardFooterProps = QwikIntrinsicElements["div"] & {
    variant?: CardFooterVatiant;
};
export declare const CardFooter: import("@builder.io/qwik").Component<CardFooterProps>;
