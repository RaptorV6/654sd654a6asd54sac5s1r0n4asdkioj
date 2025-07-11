import type { Signal } from "@builder.io/qwik";
export type PageProgressIndicatorContext = {
    showPageProgressIndicatorSig: Signal<boolean>;
};
export declare function useShowPageProgressIndicator(): PageProgressIndicatorContext;
export declare const PageProgressIndicatorProvider: import("@builder.io/qwik").Component<unknown>;
