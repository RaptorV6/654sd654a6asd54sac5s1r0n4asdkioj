import type { QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
export type InputRadioSelectProps = {
    emptyOptionLabel?: string;
    options: {
        label: string;
        value: string;
    }[];
} & InputBaseProps<string> & Omit<QwikIntrinsicElements["select"], "bind:checked" | "popovertarget" | "popovertargetaction" | "ref" | "type" | "value">;
export declare const InputRadioSelect: import("@builder.io/qwik").Component<InputRadioSelectProps>;
