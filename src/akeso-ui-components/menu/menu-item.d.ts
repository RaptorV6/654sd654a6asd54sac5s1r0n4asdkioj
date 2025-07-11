import type { ClassList, QRL, QwikIntrinsicElements, Signal } from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";
type MenuItemButtonProps = {
    class?: ClassList;
    keepOpenAfterClick?: boolean;
    onClick$: QRL<(event: PointerEvent, element: HTMLButtonElement) => Promise<unknown> | unknown>;
    type: "button";
} & Omit<QwikIntrinsicElements["button"], "class" | "onClick$" | "type">;
type MenuItemCheckProps = {
    "bind:checked": Signal<boolean>;
    class?: ClassList;
    disabled?: boolean;
    type: "check";
};
type MenuItemLinkProps = {
    disabled?: boolean;
    href: string;
    type: "link";
} & LinkProps;
interface MenuItemIntrinsicElements {
    button: MenuItemButtonProps;
    check: MenuItemCheckProps;
    link: MenuItemLinkProps;
}
export type MenuItemProps<T extends keyof MenuItemIntrinsicElements> = MenuItemIntrinsicElements[T] & {
    type: T;
};
export declare const MenuItem: <T extends keyof MenuItemIntrinsicElements>(props: import("@builder.io/qwik").PublicProps<MenuItemProps<T>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
export {};
