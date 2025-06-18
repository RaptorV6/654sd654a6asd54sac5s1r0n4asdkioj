import type { ClassList, QRL } from "@builder.io/qwik";

import { Card, CardBody, CardHeader, FieldRadio, FieldText } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { enumPalliativeCareGoalOfCareKind } from "~/iris";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";

import { palliativeCareGoalOfCareMap } from "../types";
import { usePalliativeCardContext } from "./palliative-card-context";

const FormSchema = v.object({
  goalOfCare: v.optional(v.enum_(enumPalliativeCareGoalOfCareKind)),
  goalOfCareOtherText: v.optional(v.string()),
});

type FormValues = v.InferInput<typeof FormSchema>;

type PalliativeCardGoalOfCareProps = {
  class?: ClassList;
  updatePalliativeCard$: QRL<(values: Omit<ServerUpdateCardInput, "id">) => void>;
};
export const PalliativeCardGoalOfCare = component$<PalliativeCardGoalOfCareProps>(
  ({ class: pClass, updatePalliativeCard$ }) => {
    const cardCtx = usePalliativeCardContext();

    const [formStore, { Form }] = useForm<FormValues>({
      loader: {
        value: {
          goalOfCare: cardCtx.card.goalOfCare !== null ? cardCtx.card.goalOfCare : undefined,
          goalOfCareOtherText: cardCtx.card.goalOfCareOtherText !== null ? cardCtx.card.goalOfCareOtherText : undefined,
        },
      },
      validate: valiForm$(FormSchema),
    });

    const timerIdSig = useSignal(0);

    useTask$(({ cleanup, track }) => {
      const goalOfCareOtherText = track(() => formStore.internal.fields.goalOfCareOtherText?.value);

      if (isServer) return;

      if (formStore.dirty && goalOfCareOtherText != null) {
        clearTimeout(timerIdSig.value);
        timerIdSig.value = Number(setTimeout(() => submit(formStore), 500));
      }

      cleanup(() => clearTimeout(timerIdSig.value));
    });

    useTask$(({ track }) => {
      const goalOfCare = track(() => formStore.internal.fields.goalOfCare?.value);

      if (isServer) return;

      if (formStore.dirty && goalOfCare != null) {
        submit(formStore);
      }
    });

    return (
      <>
        <Card class={pClass}>
          <CardHeader>Cíl péče</CardHeader>
          <CardBody>
            <Form
              class="form-styles"
              onSubmit$={async (values) => {
                await updatePalliativeCard$(values);
                reset(formStore, {
                  initialValues: {
                    goalOfCare: values.goalOfCare ?? undefined,
                    goalOfCareOtherText: values.goalOfCareOtherText ?? undefined,
                  },
                });
              }}
            >
              <FieldRadio
                direction="vertical"
                label="Cíl péče"
                labelSrOnly
                name="goalOfCare"
                of={formStore}
                options={Object.entries(palliativeCareGoalOfCareMap).map(([value, label]) => ({
                  label,
                  value,
                }))}
              ></FieldRadio>

              {/* Podmíněné zobrazení pole pro text k volbě "jiné" */}
              {formStore.internal.fields.goalOfCare?.value === "OTHER" && (
                <FieldText
                  inputType="textarea"
                  label="text k volbě 'jiné'"
                  name="goalOfCareOtherText"
                  of={formStore}
                  required={false}
                />
              )}
            </Form>
          </CardBody>
        </Card>
      </>
    );
  },
);
