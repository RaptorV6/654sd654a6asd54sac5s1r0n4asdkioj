import type { FunctionComponent, QwikIntrinsicElements } from "@builder.io/qwik";
export type ButtonLabelIconProps = {
    as: FunctionComponent<QwikIntrinsicElements["svg"]>;
    ending?: boolean;
    sm?: boolean;
    standalone?: boolean;
    xs?: boolean;
} & QwikIntrinsicElements["svg"];
export declare const ButtonLabelIcon: import("@builder.io/qwik").Component<ButtonLabelIconProps>;
