import type { FieldPath, FieldValues, ResponseData } from "@modular-forms/qwik";
import type { FieldBaseProps, ForwardedInputProps } from "../../types/field.types";
import type { InputRadioProps } from "../input/input-radio";
export type FieldRadioProps<TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>> = FieldBaseProps<TFieldValues, TResponseData, TFieldName> & ForwardedInputProps<InputRadioProps>;
export declare const FieldRadio: <TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>>(props: import("@builder.io/qwik").PublicProps<FieldRadioProps<TFieldValues, TResponseData, TFieldName>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
