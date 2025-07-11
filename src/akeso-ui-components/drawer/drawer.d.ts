import type { DrawerModalProps } from "./drawer-modal";
import type { DrawerVariant } from "./drawer-options";
import type { DrawerPopoverProps } from "./drawer-popover";
export { useDrawerContext } from "./drawer-context";
export type { DrawerPosition, DrawerVariant } from "./drawer-options";
type DrawerIntrinsicElements = {
    modal: DrawerModalProps;
    popover: DrawerPopoverProps;
};
export type DrawerProps<V extends DrawerVariant = "modal"> = {
    variant?: "modal" | "popover";
} & DrawerIntrinsicElements[V];
export declare const Drawer: <V extends "popover" | "modal" = "modal">(props: import("@builder.io/qwik").PublicProps<DrawerProps<V>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
