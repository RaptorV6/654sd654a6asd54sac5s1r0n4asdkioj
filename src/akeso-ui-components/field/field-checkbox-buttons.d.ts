import type { FieldPath, FieldValues, ResponseData } from "@modular-forms/qwik";
import type { FieldBaseProps, ForwardedInputProps } from "../../types/field.types";
import type { InputCheckboxButtonsProps } from "../input/input-checkbox-buttons";
export type FieldCheckboxButtonsProps<TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>> = FieldBaseProps<TFieldValues, TResponseData, TFieldName> & ForwardedInputProps<InputCheckboxButtonsProps>;
export declare const FieldCheckboxButtons: <TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>>(props: import("@builder.io/qwik").PublicProps<FieldCheckboxButtonsProps<TFieldValues, TResponseData, TFieldName>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
