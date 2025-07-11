import type { QwikHTMLElements } from "@builder.io/qwik";
export declare const alertSeverityOptions: readonly ["danger", "error", "info", "none", "success", "warning"];
export type AlertSeverity = (typeof alertSeverityOptions)[number];
export declare const alterTextSizeOptions: readonly ["base", "lg", "sm"];
export type AlertTextSize = (typeof alterTextSizeOptions)[number];
export type AlertProps<C extends keyof QwikHTMLElements> = {
    as?: C;
    severity?: AlertSeverity;
    textSize?: AlertTextSize;
} & QwikHTMLElements[C];
export declare const Alert: <C extends keyof HTMLElementTagNameMap>(props: import("@builder.io/qwik").PublicProps<AlertProps<C>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
