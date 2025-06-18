import type { ClassList, QRL } from "@builder.io/qwik";

import { Card, CardBody, CardHeader, FieldRadio } from "@akeso/ui-components";
import { component$, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { enumPalliativeCareInterventionsForBereavedKind } from "~/iris";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";

import { usePalliativeCardContext } from "./palliative-card-context";

const FormSchema = v.object({
  interventionsForBereaved: v.optional(v.enum_(enumPalliativeCareInterventionsForBereavedKind)),
});
type FormValues = v.InferInput<typeof FormSchema>;

type PalliativeCardBereavedProps = {
  class?: ClassList;
  updatePalliativeCard$: QRL<(values: Omit<ServerUpdateCardInput, "id">) => void>;
};

export const PalliativeCardBereaved = component$<PalliativeCardBereavedProps>(
  ({ class: pClass, updatePalliativeCard$ }) => {
    const cardCtx = usePalliativeCardContext();

    const [formStore, { Form }] = useForm<FormValues>({
      loader: {
        value: {
          interventionsForBereaved:
            cardCtx.card.interventionsForBereaved !== null ? cardCtx.card.interventionsForBereaved : undefined,
        },
      },
      validate: valiForm$(FormSchema),
    });

    useTask$(({ track }) => {
      const interventionsForBereaved = track(() => formStore.internal.fields.interventionsForBereaved?.value);
      if (isServer) return;
      if (formStore.dirty && interventionsForBereaved != null) {
        submit(formStore);
      }
    });

    return (
      <>
        <Card class={pClass}>
          <CardHeader>Intervence u pozůstalých</CardHeader>
          <CardBody>
            <Form
              class="form-styles space-y-4"
              onSubmit$={async (values) => {
                await updatePalliativeCard$(values);
                reset(formStore, {
                  initialValues: {
                    interventionsForBereaved: values.interventionsForBereaved ?? undefined,
                  },
                });
              }}
            >
              <FieldRadio
                direction="vertical"
                label="Intervence u pozůstalých"
                labelSrOnly
                name="interventionsForBereaved"
                of={formStore}
                options={[
                  {
                    label: "po úmrtí dospělého",
                    value: "ADULT",
                  },
                  {
                    label: "po úmrtí dítěte",
                    value: "CHILDREN",
                  },
                ]}
                required={false}
              />
            </Form>
          </CardBody>
        </Card>
      </>
    );
  },
);
