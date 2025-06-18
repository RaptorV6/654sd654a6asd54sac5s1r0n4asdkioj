import type { ClassList, QRL } from "@builder.io/qwik";

import { Card, CardBody, CardHeader, FieldDate } from "@akeso/ui-components";
import { component$, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";

import { usePalliativeCardContext } from "./palliative-card-context";

const FormSchema = v.object({
  hospitalizationAt: v.optional(
    v.pipe(
      v.union([v.date(), v.string()]),
      v.transform((i) => new Date(i)),
    ),
  ),
  interventionRequestAt: v.optional(
    v.pipe(
      v.union([v.date(), v.string()]),
      v.transform((i) => new Date(i)),
      v.maxValue(new Date(), "Datum nesmí být pozdější než dnešní."),
    ),
  ),
});

type FormValues = v.InferInput<typeof FormSchema>;

type PalliativeCardDatesProps = {
  class?: ClassList;
  updatePalliativeCard$: QRL<(values: Omit<ServerUpdateCardInput, "id">) => void>;
};

export const PalliativeCardDates = component$<PalliativeCardDatesProps>(({ class: pClass, updatePalliativeCard$ }) => {
  const cardCtx = usePalliativeCardContext();

  const [formStore, { Form }] = useForm<FormValues>({
    loader: {
      value: {
        hospitalizationAt: cardCtx.card.hospitalizationAt ?? undefined,
        interventionRequestAt: cardCtx.card.interventionRequestAt ?? undefined,
      },
    },

    validate: valiForm$(FormSchema),
  });

  useTask$(({ track }) => {
    const hospitalizationAt = track(() => formStore.internal.fields.hospitalizationAt?.value);
    const interventionRequestAt = track(() => formStore.internal.fields.interventionRequestAt?.value);

    if (isServer) return;
    if (formStore.dirty && (hospitalizationAt != null || interventionRequestAt != null)) {
      submit(formStore);
    }
  });

  return (
    <>
      <Card class={pClass}>
        <CardHeader>Zahájení péče</CardHeader>
        <CardBody>
          <Form
            class="form-styles space-y-4"
            onSubmit$={async (values) => {
              await updatePalliativeCard$(values);
              reset(formStore, {
                initialValues: {
                  hospitalizationAt: values.hospitalizationAt ?? undefined,
                  interventionRequestAt: values.interventionRequestAt ?? undefined,
                },
              });
            }}
          >
            <FieldDate
              label="Datum hospitalizace"
              max={new Date("2024-12-31").toISOString().split("T")[0]}
              min={new Date("2024-01-01").toISOString().split("T")[0]}
              name="hospitalizationAt"
              of={formStore}
              required={false}
            />
            <FieldDate
              label="Datum vyžádání intervence"
              max={new Date().toISOString().split("T")[0]}
              min={new Date("2024-01-01").toISOString().split("T")[0]}
              name="interventionRequestAt"
              of={formStore}
              required={false}
            />
          </Form>
        </CardBody>
      </Card>
    </>
  );
});
