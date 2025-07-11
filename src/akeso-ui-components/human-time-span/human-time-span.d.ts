import type { QwikIntrinsicElements } from "@builder.io/qwik";
export type HumanTimeSpanProps = {
    date: Date | number | string;
    disableAutoRefresh?: boolean;
    nowDate?: Date | number | string;
    refreshInterval?: number;
} & Omit<QwikIntrinsicElements["time"], "dateTime" | "datetime">;
export declare const HumanTimeSpan: import("@builder.io/qwik").Component<HumanTimeSpanProps>;
/**
 * Human readable elapsed or remaining time (example: 3 minutes ago)
 * @param  date A Date object, timestamp or string parsable with Date.parse()
 * @param  nowDate A Date object, timestamp or string parsable with Date.parse()
 * @param  rft A Intl formater
 * @return  Human readable elapsed or remaining time
 * @author github.com/victornpb
 * @see https://stackoverflow.com/a/67338038/938822
 */
export declare function getHumanTimeSpan(date: Date | number | string, nowDate?: Date | number | string, rft?: Intl.RelativeTimeFormat): string;
export declare function createHumanTimeSpanRelativeTimeFormat(locale: string, style?: "long" | "narrow" | "short"): Intl.RelativeTimeFormat;
