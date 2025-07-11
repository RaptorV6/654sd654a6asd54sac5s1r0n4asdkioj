import type { QwikIntrinsicElements } from "@builder.io/qwik";
export type DataTableHeadColProps = {
    center?: boolean;
    left?: boolean;
    right?: boolean;
} & QwikIntrinsicElements["th"];
export declare const DataTableHeadCol: import("@builder.io/qwik").Component<DataTableHeadColProps>;
