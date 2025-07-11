import type { QwikIntrinsicElements, Signal } from "@builder.io/qwik";
export type MenuProps = {
    "bind:isOpenSig"?: Signal<boolean>;
    id: string;
    ref: Signal<HTMLElement | undefined>;
} & Omit<QwikIntrinsicElements["div"], "id" | "ref">;
export declare const Menu: import("@builder.io/qwik").Component<MenuProps>;
