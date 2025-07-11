import type { QwikIntrinsicElements } from "@builder.io/qwik";
export declare const cardBorderOptions: readonly ["no", "normal", "strong"];
export type CardBorder = (typeof cardBorderOptions)[number];
export declare const cardSeverityOptions: readonly ["accent", "background", "highlight", "lowered", "none", "raised", "smoke"];
export type CardSeverity = (typeof cardSeverityOptions)[number];
export declare const cardVariantOptions: readonly ["flat", "levelled", "normal", "significant"];
export type CardVariant = (typeof cardVariantOptions)[number];
export type CardProps = QwikIntrinsicElements["div"] & {
    active?: boolean;
    bordered?: CardBorder;
    divided?: boolean;
    severity?: CardSeverity;
    toEdge?: boolean;
    variant?: CardVariant;
};
export declare const Card: import("@builder.io/qwik").Component<CardProps>;
