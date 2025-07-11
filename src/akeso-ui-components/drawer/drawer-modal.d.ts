import type { QwikIntrinsicElements, Signal } from "@builder.io/qwik";
import type { DrawerPosition } from "./drawer-options";
export type DrawerModalProps = {
    "bind:open": Signal<boolean>;
    disableCloseOnBakdropClick?: boolean;
    position: DrawerPosition;
    ref?: Signal<HTMLDialogElement | undefined>;
} & Omit<QwikIntrinsicElements["dialog"], "open" | "ref">;
export declare const DrawerModal: import("@builder.io/qwik").Component<DrawerModalProps>;
