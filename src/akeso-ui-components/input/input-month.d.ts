import type { QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
export type InputMonthProps = InputBaseProps<string> & Omit<QwikIntrinsicElements["input"], "bind:checked" | "popovertarget" | "popovertargetaction" | "ref" | "type" | "value">;
export declare const InputMonth: import("@builder.io/qwik").Component<InputMonthProps>;
