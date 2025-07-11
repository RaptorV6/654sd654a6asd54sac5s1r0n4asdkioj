import type { JSXOutput, QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
export type InputRadioButtonsProps = {
    direction?: "horizontal" | "vertical";
    options: {
        label: JSXOutput;
        value: string;
    }[];
} & InputBaseProps<string> & Omit<QwikIntrinsicElements["input"], "bind:checked" | "popovertarget" | "popovertargetaction" | "ref" | "type" | "value">;
export declare const InputRadioButtons: import("@builder.io/qwik").Component<InputRadioButtonsProps>;
