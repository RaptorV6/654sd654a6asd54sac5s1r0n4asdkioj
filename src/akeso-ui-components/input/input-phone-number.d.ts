import type { QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
export type InputPhoneNumberProps = InputBaseProps<string> & Omit<QwikIntrinsicElements["input"], "bind:checked" | "popovertarget" | "popovertargetaction" | "ref" | "type" | "value">;
export declare const InputPhoneNumber: import("@builder.io/qwik").Component<InputPhoneNumberProps>;
