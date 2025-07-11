import type { QwikIntrinsicElements, Signal } from "@builder.io/qwik";
import type { DrawerPosition } from "./drawer";
export type DrawerPopoverProps = {
    "bind:open": Signal<boolean>;
    disableCloseOnBakdropClick?: boolean;
    position: DrawerPosition;
    ref?: Signal<HTMLDivElement | undefined>;
} & Omit<QwikIntrinsicElements["div"], "ref">;
export declare const DrawerPopover: import("@builder.io/qwik").Component<DrawerPopoverProps>;
