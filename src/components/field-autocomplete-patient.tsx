import type { FieldBaseProps } from "@akeso/ui-components";
import type { FieldPath, FieldValues, ResponseData } from "@modular-forms/qwik";

import { component$ } from "@builder.io/qwik";
import { Field, reset, setValue } from "@modular-forms/qwik";

import { InputAutocompletePatient } from "./input-autocomplete-patient";

type PatientAutocompleteFieldProps<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> = FieldBaseProps<TFieldValues, TResponseData, TFieldName>;

export const FieldAutocompletePatient = component$(
  <TFieldValues extends FieldValues, TResponseData extends ResponseData, TFieldName extends FieldPath<TFieldValues>>({
    keepActive,
    keepState,
    name,
    of,
    transform,
    validate,
    ...iProps
  }: PatientAutocompleteFieldProps<TFieldValues, TResponseData, TFieldName>) => {
    return (
      <Field
        keepActive={keepActive}
        keepState={keepState}
        name={name}
        of={of}
        transform={transform}
        type={"string" as any}
        validate={validate}
      >
        {(fieldStore, fieldProps) => (
          <InputAutocompletePatient
            {...iProps}
            {...fieldProps}
            error={fieldStore.error}
            setFieldValue$={(v) => {
              if (v === undefined) {
                reset(of, name);
              } else {
                setValue(of, name, v as any);
              }
            }}
            value={fieldStore.value as any}
          />
        )}
      </Field>
    );
  },
);
