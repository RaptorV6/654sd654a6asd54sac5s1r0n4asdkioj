import type { QwikIntrinsicElements } from "@builder.io/qwik";
export type DataTableBodyColProps = {
    as?: "td" | "th";
    center?: boolean;
    left?: boolean;
    right?: boolean;
} & QwikIntrinsicElements["td"];
export declare const DataTableBodyCol: import("@builder.io/qwik").Component<DataTableBodyColProps>;
