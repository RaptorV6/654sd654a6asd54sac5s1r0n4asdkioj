import type { QwikIntrinsicElements } from "@builder.io/qwik";
import type { FormProps } from "@builder.io/qwik-city";
import type { ButtonSeverity, ButtonSize, ButtonVariant } from "../button/button";
export type ActionButtonProps<I, O> = Omit<QwikIntrinsicElements["button"], "type"> & {
    action: FormProps<O, I>["action"];
    params: Record<string, string> | null;
    pill?: boolean;
    severity?: ButtonSeverity;
    size?: ButtonSize;
    variant?: ButtonVariant;
};
export declare const ActionButton: <I, O>(props: import("@builder.io/qwik").PublicProps<ActionButtonProps<I, O>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
