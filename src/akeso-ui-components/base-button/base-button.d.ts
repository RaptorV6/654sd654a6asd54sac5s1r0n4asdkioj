import type { ClassList, QRL, QwikIntrinsicElements, Signal } from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";
export type BaseButtonContext = {
    loadingSig: Signal<boolean>;
};
export declare const BaseButtonContextId: import("@builder.io/qwik").ContextId<BaseButtonContext>;
type BaseButtonButtonProps = {
    class?: ClassList;
    onClick$: QRL<(event: PointerEvent, element: HTMLButtonElement) => Promise<unknown> | unknown>;
    type: "button";
} & Omit<QwikIntrinsicElements["button"], "class" | "onClick$" | "type">;
type BaseButtonLinkProps = {
    class?: ClassList;
    disabled?: boolean;
    download?: boolean | string;
    href: string;
    target?: "_blank";
    type: "link";
} & Omit<LinkProps, "class" | "download" | "href" | "target" | "type">;
type BaseButtonPopoverProps = {
    class?: ClassList;
    popoverId: string;
    type: "popover-trigger";
} & Omit<QwikIntrinsicElements["button"], "class" | "onClick$" | "popovertarget" | "type">;
type BaseButtonResetProps = {
    class?: ClassList;
    type: "reset";
} & Omit<QwikIntrinsicElements["button"], "class" | "type">;
type BaseButtonSubmitProps = {
    "bind:loading"?: Signal<boolean>;
    class?: ClassList;
    type: "submit";
} & Omit<QwikIntrinsicElements["button"], "class" | "type">;
export interface BaseButtonIntrinsicElements {
    button: BaseButtonButtonProps;
    link: BaseButtonLinkProps;
    "popover-trigger": BaseButtonPopoverProps;
    reset: BaseButtonResetProps;
    submit: BaseButtonSubmitProps;
}
export type BaseButtonProps<T extends keyof BaseButtonIntrinsicElements> = BaseButtonIntrinsicElements[T] & {
    type: T;
};
export declare const BaseButton: <T extends keyof BaseButtonIntrinsicElements>(props: import("@builder.io/qwik").PublicProps<BaseButtonProps<T>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
export {};
