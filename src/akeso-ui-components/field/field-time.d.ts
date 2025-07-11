import type { FieldPath, FieldValues, ResponseData } from "@modular-forms/qwik";
import type { FieldBaseProps, ForwardedInputProps } from "../../types/field.types";
import type { InputMonthProps } from "../input/input-month";
export type FieldTimeProps<TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>> = FieldBaseProps<TFieldValues, TResponseData, TFieldName> & ForwardedInputProps<InputMonthProps>;
export declare const FieldTime: <TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>>(props: import("@builder.io/qwik").PublicProps<FieldTimeProps<TFieldValues, TResponseData, TFieldName>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
