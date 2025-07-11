import type { QwikIntrinsicElements, Signal } from "@builder.io/qwik";
export type AlertDialogProps = {
    "bind:returnValue": Signal<string>;
    "bind:show": Signal<boolean>;
    ref?: Signal<HTMLDialogElement | undefined>;
} & Omit<QwikIntrinsicElements["dialog"], "ref" | "role">;
export declare const AlertDialog: import("@builder.io/qwik").Component<AlertDialogProps>;
