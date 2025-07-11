import type { QwikIntrinsicElements, Signal } from "@builder.io/qwik";
export type DialogProps = {
    "bind:show": Signal<boolean>;
    closeButton?: boolean;
    disableCloseOnBakdropClick?: boolean;
    ref?: Signal<HTMLDialogElement | undefined>;
} & Omit<QwikIntrinsicElements["dialog"], "ref">;
export declare const Dialog: import("@builder.io/qwik").Component<DialogProps>;
