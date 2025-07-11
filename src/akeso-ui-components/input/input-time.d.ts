import type { QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
export type InputTimeProps = InputBaseProps<string> & Omit<QwikIntrinsicElements["input"], "bind:checked" | "popovertarget" | "popovertargetaction" | "ref" | "type" | "value">;
export declare const InputTime: import("@builder.io/qwik").Component<InputTimeProps>;
