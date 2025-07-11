import type { ClassList } from "@builder.io/qwik";
import type { BaseButtonIntrinsicElements } from "../base-button/base-button";
export declare const buttonSeverityOptions: readonly ["accent", "danger", "highlight", "info", "none", "progress", "success", "warning"];
export type ButtonSeverity = (typeof buttonSeverityOptions)[number];
export declare const buttonSizeOptions: readonly ["base", "lg", "sm", "xl", "xs"];
export type ButtonSize = (typeof buttonSizeOptions)[number];
export declare const buttonVariantOptions: readonly ["contained", "nice", "outline", "soft", "soft-outline"];
export type ButtonVariant = (typeof buttonVariantOptions)[number];
export type ButtonOwnProps = {
    class?: ClassList;
    pill?: boolean;
    severity?: ButtonSeverity;
    size?: ButtonSize;
    variant?: ButtonVariant;
};
export type ButtonProps<T extends keyof BaseButtonIntrinsicElements> = BaseButtonIntrinsicElements[T] & {
    type: T;
} & ButtonOwnProps;
export declare const Button: <T extends keyof BaseButtonIntrinsicElements>(props: import("@builder.io/qwik").PublicProps<ButtonProps<T>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
