import type { Signal } from "@builder.io/qwik";
export type MenuContext = {
    menuRef: Signal<HTMLElement | undefined>;
};
export declare const MenuContextId: import("@builder.io/qwik").ContextId<MenuContext>;
export declare const useMenuContext: () => MenuContext;
