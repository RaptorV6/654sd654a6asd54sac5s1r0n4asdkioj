import type { JSXOutput, QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
export type InputRadioProps = {
    direction?: "horizontal" | "vertical";
    optionLabelPosition?: "left" | "right";
    options: {
        label: JSXOutput;
        value: string;
    }[];
} & InputBaseProps<string> & Omit<QwikIntrinsicElements["input"], "bind:checked" | "popovertarget" | "popovertargetaction" | "ref" | "type" | "value">;
export declare const InputRadio: import("@builder.io/qwik").Component<InputRadioProps>;
