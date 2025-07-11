import type { FunctionComponent, QRL } from "@builder.io/qwik";
import type { InputBasePropsSetFieldValueRequired } from "../../types/input.types";
import type { ListItemProps } from "../list/list-item";
export interface InputAutocompleteOption {
    disabled?: boolean;
    key: string;
}
export type InputAutocompleteProps<O extends InputAutocompleteOption, V extends string> = {
    disableOnBlur?: boolean;
    findOptions$: QRL<(abort: AbortSignal, search: string | undefined) => Promise<O[]>>;
    findSelected$: QRL<(abort: AbortSignal, id: string) => Promise<O | null>>;
    optionContent: FunctionComponent<{
        option: O;
    }>;
    renderInputValue$: QRL<(v: O) => string>;
    selectedToValue$: QRL<(v: O | undefined) => V | undefined>;
} & InputBasePropsSetFieldValueRequired<V>;
export declare const InputAutocomplete: <O extends InputAutocompleteOption, V extends string>(props: import("@builder.io/qwik").PublicProps<InputAutocompleteProps<O, V>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
export type InputAutocompleteListOptionProps<O extends InputAutocompleteOption> = {
    index: number;
    option: InputAutocompleteOption;
    renderInputValue$: QRL<(v: O) => string>;
} & ListItemProps<"li">;
export declare const InputAutocompleteListOption: <O extends InputAutocompleteOption>(props: import("@builder.io/qwik").PublicProps<InputAutocompleteListOptionProps<O>>, key: string | null, flags: number, dev?: import("@builder.io/qwik").DevJSX | undefined) => import("@builder.io/qwik").JSXOutput;
export declare const getInputAutocompleteNextEnabledOptionIndex: <O extends InputAutocompleteOption = InputAutocompleteOption>(index: number, filteredOptionsSig: {
    value: O[] | undefined;
}) => number;
export declare const getInputAutocompletePrevEnabledOptionIndex: <O extends InputAutocompleteOption = InputAutocompleteOption>(index: number, filteredOptionsSig: {
    value: O[] | undefined;
}) => number;
