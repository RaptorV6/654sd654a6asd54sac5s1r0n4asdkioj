import type { JSXOutput } from "@builder.io/qwik";
import type { FieldPath, FieldValues, ResponseData } from "@modular-forms/qwik";
import type { FieldBaseProps } from "../../types/field.types";
import type { InputTextType } from "../input/input-text";
export type FieldTextProps<TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>> = FieldBaseProps<TFieldValues, TResponseData, TFieldName> & {
    adornmentEnd?: JSXOutput;
    adornmentStart?: JSXOutput;
    inputType: InputTextType;
};
export declare const FieldText: <TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>>(props: import("@builder.io/qwik").PublicProps<FieldTextProps<TFieldValues, TResponseData, TFieldName>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => JSXOutput;
