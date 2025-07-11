import type { FieldPath, FieldValues, ResponseData } from "@modular-forms/qwik";
import type { FieldBaseProps } from "../../types/field.types";
export type FieldPhoneNumberProps<TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>> = FieldBaseProps<TFieldValues, TResponseData, TFieldName>;
export declare const FieldPhoneNumber: <TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>>(props: import("@builder.io/qwik").PublicProps<FieldPhoneNumberProps<TFieldValues, TResponseData, TFieldName>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
