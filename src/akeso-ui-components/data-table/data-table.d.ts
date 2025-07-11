import type { QwikIntrinsicElements } from "@builder.io/qwik";
export type DataTableProps = QwikIntrinsicElements["table"];
export declare const DataTable: import("@builder.io/qwik").Component<{
    summary?: string | undefined;
    bgColor?: string | undefined;
    align?: string | undefined;
    border?: string | undefined;
    frame?: string | undefined;
    rules?: string | undefined;
    cellPadding?: string | number | undefined;
    cellSpacing?: string | number | undefined;
    width?: import("@builder.io/qwik").Size | undefined;
} & import("@builder.io/qwik").HTMLElementAttrs & import("@builder.io/qwik").QwikAttributes<HTMLTableElement>>;
