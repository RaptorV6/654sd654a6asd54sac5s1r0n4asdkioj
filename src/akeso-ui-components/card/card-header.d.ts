import type { QwikIntrinsicElements } from "@builder.io/qwik";
export declare const cardHeaderVatiantOptions: readonly ["lowered", "none", "reised"];
export type CardHeaderVatiant = (typeof cardHeaderVatiantOptions)[number];
export type CardHeaderProps = QwikIntrinsicElements["div"] & {
    variant?: CardHeaderVatiant;
};
export declare const CardHeader: import("@builder.io/qwik").Component<CardHeaderProps>;
