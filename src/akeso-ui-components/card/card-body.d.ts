import type { QwikIntrinsicElements } from "@builder.io/qwik";
export declare const cardBodyVatiantOptions: readonly ["lowered", "none", "reised"];
export type CardBodyVatiant = (typeof cardBodyVatiantOptions)[number];
export type CardBodyProps = QwikIntrinsicElements["div"] & {
    toEdge?: boolean;
    variant?: CardBodyVatiant;
};
export declare const CardBody: import("@builder.io/qwik").Component<CardBodyProps>;
