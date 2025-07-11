import type { ClassList, JSXOutput, QwikHTMLElements } from "@builder.io/qwik";
import type { StatusIndicatorSeverity } from "../status-indicator/status-indicator";
export type TimelineSlotProps = {
    class?: ClassList;
    defaultExpanded?: boolean;
    doneAt?: Date | undefined;
    expandable?: boolean;
    hideContent?: boolean;
    pulse?: boolean;
    severity?: StatusIndicatorSeverity;
    title: JSXOutput;
    titleAs?: keyof QwikHTMLElements;
};
export declare const TimelineSlot: import("@builder.io/qwik").Component<TimelineSlotProps>;
