import type { QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
export type InputCheckboxProps = InputBaseProps<boolean> & Omit<QwikIntrinsicElements["input"], "bind:checked" | "popovertarget" | "popovertargetaction" | "ref" | "type" | "value"> & {
    labelPosition?: "left" | "right";
    switch?: boolean;
};
export declare const InputCheckbox: import("@builder.io/qwik").Component<InputCheckboxProps>;
