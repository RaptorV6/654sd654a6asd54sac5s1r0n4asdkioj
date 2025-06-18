import type { ClassList, QRL } from "@builder.io/qwik";

import { Card, CardBody, CardHeader, FieldCheckbox, FieldRadio } from "@akeso/ui-components";
import { component$, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";

import { usePalliativeCardContext } from "./palliative-card-context";

const FormSchema = v.object({
  signalCodeDrg: v.optional(v.string()),
  signalCodeSet: v.optional(v.boolean()),
});
type FormValues = v.InferInput<typeof FormSchema>;

type PalliativeCardSignalCodeProps = {
  class?: ClassList;
  updatePalliativeCard$: QRL<(values: Omit<ServerUpdateCardInput, "id">) => void>;
};

export const PalliativeCardSignalCode = component$<PalliativeCardSignalCodeProps>(
  ({ class: pClass, updatePalliativeCard$ }) => {
    const cardCtx = usePalliativeCardContext();
    const [formStore, { Form }] = useForm<FormValues>({
      loader: {
        value: {
          signalCodeDrg: cardCtx.card.signalCodeDrg !== null ? cardCtx.card.signalCodeDrg : undefined,
          signalCodeSet: cardCtx.card.signalCodeSet !== null ? cardCtx.card.signalCodeSet : undefined,
        },
      },
      validate: valiForm$(FormSchema),
    });

    useTask$(({ track }) => {
      const signalCodeDrg = track(() => formStore.internal.fields.signalCodeDrg?.value);
      const signalCodeSet = track(() => formStore.internal.fields.signalCodeSet?.value);
      if (isServer) return;
      if (formStore.dirty && (signalCodeDrg != null || signalCodeSet != null)) {
        submit(formStore);
      }
    });

    return (
      <Card class={pClass}>
        <CardHeader>Signální kód</CardHeader>
        <CardBody>
          <Form
            class="form-styles space-y-4"
            onSubmit$={async (values) => {
              await updatePalliativeCard$(values);
              reset(formStore, {
                initialValues: {
                  signalCodeDrg: values.signalCodeDrg ?? undefined,
                  signalCodeSet: values.signalCodeSet ?? undefined,
                },
              });
            }}
          >
            <FieldCheckbox label="Signální kód zadán" name="signalCodeSet" of={formStore} required={false} />

            <FieldRadio
              direction="vertical"
              label="DRG"
              name="signalCodeDrg"
              of={formStore}
              options={[
                { label: "91935", value: "91935" },
                { label: "91936", value: "91936" },
              ]}
              required={false}
            />
          </Form>
        </CardBody>
      </Card>
    );
  },
);
