import type { ClassList, Signal } from "@builder.io/qwik";
export type ExpandableProps = {
    "bind:expanded"?: Signal<boolean>;
    class?: ClassList;
    expanded?: boolean;
};
export declare const Expandable: import("@builder.io/qwik").Component<ExpandableProps>;
export type ExpandableTriggerProps = {
    class?: ClassList;
};
export declare const ExpandableTrigger: import("@builder.io/qwik").Component<ExpandableTriggerProps>;
export type ExpandableContentProps = {
    class?: ClassList;
};
export declare const ExpandableContent: import("@builder.io/qwik").Component<ExpandableContentProps>;
