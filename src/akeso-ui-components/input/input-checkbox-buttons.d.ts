import type { JSXOutput, QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
export type InputCheckboxButtonsProps = {
    direction?: "horizontal" | "vertical";
    labelPosition?: "left" | "right";
    options: {
        label: JSXOutput;
        value: boolean;
    }[];
} & InputBaseProps<boolean> & Omit<QwikIntrinsicElements["input"], "bind:checked" | "popovertarget" | "popovertargetaction" | "ref" | "type" | "value">;
export declare const InputCheckboxButtons: import("@builder.io/qwik").Component<InputCheckboxButtonsProps>;
