import type { ClassList, QRL } from "@builder.io/qwik";

import { Card, CardBody, CardHeader, FieldRadio, FieldText } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { enumPalliativeCareContextKind, enumPalliativeCareContextTargetKind } from "~/iris";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";

import { palliativeCareContextKindMap, palliativeCareContextTargetMap } from "../types";
import { usePalliativeCardContext } from "./palliative-card-context";

const FormSchema = v.object({
  careContextKind: v.optional(v.enum_(enumPalliativeCareContextKind)),
  careContextTarget: v.optional(v.enum_(enumPalliativeCareContextTargetKind)),
  careContextTargetOther: v.optional(v.string()),
});
type FormValues = v.InferInput<typeof FormSchema>;

type PalliativeCardCareContextProps = {
  class?: ClassList;
  updatePalliativeCard$: QRL<(values: Omit<ServerUpdateCardInput, "id">) => void>;
};

export const PalliativeCardCareContext = component$<PalliativeCardCareContextProps>(
  ({ class: pClass, updatePalliativeCard$ }) => {
    const cardCtx = usePalliativeCardContext();

    const [formStore, { Form }] = useForm<FormValues>({
      loader: {
        value: {
          careContextKind: cardCtx.card.careContextKind !== null ? cardCtx.card.careContextKind : undefined,
          careContextTarget: cardCtx.card.careContextTarget !== null ? cardCtx.card.careContextTarget : undefined,
          careContextTargetOther:
            cardCtx.card.careContextTargetOther !== null ? cardCtx.card.careContextTargetOther : "",
        },
      },
      validate: valiForm$(FormSchema),
    });

    useTask$(({ track }) => {
      const careContextKind = track(() => formStore.internal.fields.careContextKind?.value);
      const careContextTarget = track(() => formStore.internal.fields.careContextTarget?.value);

      if (isServer) return;
      if (formStore.dirty && (careContextKind != null || careContextTarget != null)) {
        submit(formStore);
      }
    });

    // odložený submit pro text
    const timerIdSig = useSignal(0);

    useTask$(({ cleanup, track }) => {
      const careContextTargetOther = track(() => formStore.internal.fields.careContextTargetOther?.value);

      if (isServer) return;

      if (formStore.dirty && careContextTargetOther != null) {
        clearTimeout(timerIdSig.value);
        timerIdSig.value = Number(setTimeout(() => submit(formStore), 500));
      }

      cleanup(() => clearTimeout(timerIdSig.value));
    });

    return (
      <>
        <Card class={pClass}>
          <CardHeader>Kontext péče</CardHeader>
          <CardBody>
            <Form
              class="form-styles space-y-4"
              onSubmit$={async (values) => {
                await updatePalliativeCard$(values);

                reset(formStore, {
                  initialValues: {
                    careContextKind: values.careContextKind ?? undefined,
                    careContextTarget: values.careContextTarget ?? undefined,
                    careContextTargetOther: values.careContextTargetOther ?? undefined,
                  },
                });
              }}
            >
              <FieldRadio
                direction="vertical"
                label="Kontext péče - druh"
                labelSrOnly
                name="careContextKind"
                of={formStore}
                options={Object.entries(palliativeCareContextKindMap).map(([value, label]) => ({
                  label,
                  value,
                }))}
                required={false}
              />

              <FieldRadio
                direction="vertical"
                label="Kontext péče - cíl"
                labelSrOnly
                name="careContextTarget"
                of={formStore}
                options={Object.entries(palliativeCareContextTargetMap).map(([value, label]) => ({
                  label,
                  value,
                }))}
                required={false}
              />

              {/* Podmíněné zobrazení pole pro Popis */}
              {formStore.internal.fields.careContextTarget?.value === "OTHER" && (
                <FieldText
                  inputType="text"
                  label="Popis k volbě 'jiné'"
                  name="careContextTargetOther"
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
