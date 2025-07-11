import type { Signal } from "@builder.io/qwik";
type DrawerContext = {
    isOpenSig: Signal<boolean>;
};
export declare const DrawerContextId: import("@builder.io/qwik").ContextId<DrawerContext>;
export declare function useDrawerContext(): DrawerContext;
export type DrawerProviderProps = {
    "bind:open": Signal<boolean>;
};
export declare const DrawerProvider: import("@builder.io/qwik").Component<DrawerProviderProps>;
export {};
