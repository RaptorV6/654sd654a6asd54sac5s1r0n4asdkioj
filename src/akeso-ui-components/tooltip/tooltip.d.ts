import type { ClassList, JSXOutput } from "@builder.io/qwik";
export type TooltipProps = {
    class?: ClassList;
    gutter?: number | undefined;
    title: JSXOutput;
};
export declare const Tooltip: import("@builder.io/qwik").Component<TooltipProps>;
