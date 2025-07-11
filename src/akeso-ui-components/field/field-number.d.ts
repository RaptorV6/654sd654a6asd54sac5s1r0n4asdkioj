import type { FieldPath, FieldValues, ResponseData } from "@modular-forms/qwik";
import type { FieldBaseProps, ForwardedInputProps } from "../../types/field.types";
import type { InputNumberProps } from "../input/input-number";
export type FieldNumberProps<TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>> = FieldBaseProps<TFieldValues, TResponseData, TFieldName> & ForwardedInputProps<InputNumberProps>;
export declare const FieldNumber: <TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>>(props: import("@builder.io/qwik").PublicProps<FieldNumberProps<TFieldValues, TResponseData, TFieldName>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
