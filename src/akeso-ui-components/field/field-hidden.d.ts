import type { QwikIntrinsicElements } from "@builder.io/qwik";
import type { FieldPath, FieldValues, ResponseData } from "@modular-forms/qwik";
import type { FieldBaseProps } from "../../types/field.types";
export type FieldHiddenProps<TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>> = Omit<FieldBaseProps<TFieldValues, TResponseData, TFieldName>, "helperText" | "label" | "labelSrOnly"> & Omit<QwikIntrinsicElements["input"], "bind:checked" | "id" | "popovertarget" | "popovertargetaction" | "type" | "value">;
export declare const FieldHidden: <TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>>(props: import("@builder.io/qwik").PublicProps<FieldHiddenProps<TFieldValues, TResponseData, TFieldName>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
