import type { JSXOutput, QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
export type InputNumberProps = InputBaseProps<number> & Omit<QwikIntrinsicElements["input"], "bind:checked" | "popovertarget" | "popovertargetaction" | "ref" | "type" | "value"> & {
    adornmentEnd?: JSXOutput;
    adornmentStart?: JSXOutput;
};
export declare const InputNumber: import("@builder.io/qwik").Component<InputNumberProps>;
