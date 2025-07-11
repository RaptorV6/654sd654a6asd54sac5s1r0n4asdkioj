import type { ClassList } from "@builder.io/qwik";
export declare const buttonMoreMenuVariantOptions: readonly ["horizontal", "vertical"];
export type ButtonMoreMenuVariant = (typeof buttonMoreMenuVariantOptions)[number];
export type ButtonMoreMenuProps = {
    class?: ClassList;
    label?: string;
    variant?: ButtonMoreMenuVariant;
};
export declare const ButtonMoreMenu: import("@builder.io/qwik").Component<ButtonMoreMenuProps>;
