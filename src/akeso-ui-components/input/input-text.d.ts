import type { JSXOutput, QwikIntrinsicElements } from "@builder.io/qwik";
import type { InputBaseProps } from "../../types/input.types";
type InputTextTextareaProps = InputBaseProps<string, HTMLTextAreaElement> & QwikIntrinsicElements["textarea"];
type InputTextLineProps = InputBaseProps<string, HTMLInputElement> & Omit<QwikIntrinsicElements["input"], "type">;
interface InputTextComponents {
    email: InputTextLineProps;
    password: InputTextLineProps;
    text: InputTextLineProps;
    textarea: InputTextTextareaProps;
}
export type InputTextType = keyof InputTextComponents;
export type InputTextProps<T extends InputTextType> = InputTextComponents[T] & {
    adornmentEnd?: JSXOutput;
    adornmentStart?: JSXOutput;
    type: T;
};
export declare const InputText: <T extends keyof InputTextComponents>(props: import("@builder.io/qwik").PublicProps<InputTextProps<T>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => JSXOutput;
export {};
