import type { ClassList, QRL } from "@builder.io/qwik";

import { Card, CardBody, CardHeader, FieldRadio } from "@akeso/ui-components";
import { component$, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { enumPalliativeCareSurpriseQuestionKind } from "~/iris";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";

import { usePalliativeCardContext } from "./palliative-card-context";

const FormSchema = v.object({
  surpriseQuestion: v.optional(v.enum_(enumPalliativeCareSurpriseQuestionKind)),
});
type FormValues = v.InferInput<typeof FormSchema>;

type PalliativeCardSurpriseProps = {
  class?: ClassList;
  updatePalliativeCard$: QRL<(values: Omit<ServerUpdateCardInput, "id">) => void>;
};

export const PalliativeCardSurpriseQuestion = component$<PalliativeCardSurpriseProps>(
  ({ class: pClass, updatePalliativeCard$ }) => {
    const cardCtx = usePalliativeCardContext();

    const [formStore, { Form }] = useForm<FormValues>({
      loader: {
        value: {
          surpriseQuestion: cardCtx.card.surpriseQuestion !== null ? cardCtx.card.surpriseQuestion : undefined,
        },
      },
      validate: valiForm$(FormSchema),
    });

    useTask$(({ track }) => {
      const surpriseQuestion = track(() => formStore.internal.fields.surpriseQuestion?.value);
      if (isServer) return;
      if (formStore.dirty && surpriseQuestion != null) {
        submit(formStore);
      }
    });

    return (
      <Card class={pClass}>
        <CardHeader>
          <div>Surprise Question</div>
          <div>nepřekvapivé úmrtí v horizontu 12 měsíců</div>
        </CardHeader>

        <CardBody>
          <Form
            class="form-styles space-y-4"
            onSubmit$={async (values) => {
              await updatePalliativeCard$(values);
              reset(formStore, {
                initialValues: {
                  surpriseQuestion: values.surpriseQuestion ?? undefined,
                },
              });
            }}
          >
            <FieldRadio
              direction="vertical"
              label="SurpriseQuestion"
              labelSrOnly
              name="surpriseQuestion"
              of={formStore}
              options={[
                { label: "pozitivní = nebyl bych překvapen", value: "POSITIVE" },
                { label: "negativní = byl bych překvapen", value: "NEGATIVE" },
                { label: "nevím", value: "DONT_KNOW" },
                { label: "nerelevantní", value: "IRRELEVANT" },
              ]}
              required={false}
            />
          </Form>
        </CardBody>
      </Card>
    );
  },
);
