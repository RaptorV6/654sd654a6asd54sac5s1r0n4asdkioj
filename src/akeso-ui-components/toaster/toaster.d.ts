import type { QRL } from "@builder.io/qwik";
declare const toastSeverityOptions: readonly ["info", "success", "warning", "error"];
export type ToastSeverity = (typeof toastSeverityOptions)[number];
declare const toasterTransitionOptions: readonly ["fade", "slideLeftFade", "slideLeftRightFade", "slideRightFade", "slideRightLeftFade", "slideUpFade", "slideUpDownFade", "slideDownFade", "slideDownUpFade", "pinItUp", "pinItDown"];
export type ToasterTransition = (typeof toasterTransitionOptions)[number];
type ToastShowHandler = QRL<(message: string, options?: Partial<Omit<ToastProps, "id">>) => string>;
export declare function useToaster(): {
    toastError$: ToastShowHandler;
    toastInfo$: ToastShowHandler;
    toastSuccess$: ToastShowHandler;
    toastWarning$: ToastShowHandler;
};
export type TosterProviderProps = {
    transition?: ToasterTransition;
};
export declare const ToasterProvider: import("@builder.io/qwik").Component<TosterProviderProps>;
type ToastProps = {
    closeOnClick: boolean;
    duration: number;
    id: string;
    severity: ToastSeverity;
};
export {};
