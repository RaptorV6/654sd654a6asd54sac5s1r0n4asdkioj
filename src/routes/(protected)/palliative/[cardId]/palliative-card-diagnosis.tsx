import type { ClassList, QRL } from "@builder.io/qwik";

import { Card, CardBody, CardHeader, FieldRadio, FieldText } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { enumPalliativeCareDiagnosisKind } from "~/iris";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";

import { palliativeCareDiagnosisKindMap } from "../types";
import { usePalliativeCardContext } from "./palliative-card-context";

const FormSchema = v.object({
  diagnosisCode: v.optional(v.string()),
  diagnosisKind: v.optional(v.enum_(enumPalliativeCareDiagnosisKind)),
});
type FormValues = v.InferInput<typeof FormSchema>;

type PalliativeCardDiagnosisProps = {
  class?: ClassList;
  updatePalliativeCard$: QRL<(values: Omit<ServerUpdateCardInput, "id">) => void>;
};

export const PalliativeCardDiagnosis = component$<PalliativeCardDiagnosisProps>(
  ({ class: pClass, updatePalliativeCard$ }) => {
    const cardCtx = usePalliativeCardContext();

    const [formStore, { Form }] = useForm<FormValues>({
      loader: {
        value: {
          diagnosisCode: cardCtx.card.diagnosisCode !== null ? cardCtx.card.diagnosisCode : undefined,
          diagnosisKind: cardCtx.card.diagnosisKind !== null ? cardCtx.card.diagnosisKind : undefined,
        },
      },
      validate: valiForm$(FormSchema),
    });

    const timerIdSig = useSignal(0);

    useTask$(({ cleanup, track }) => {
      const diagnosisCode = track(() => formStore.internal.fields.diagnosisCode?.value);
      // neprovádíme useTask na serveru
      if (isServer) return;

      // zrušení odpočítávání, pokud probíhá, aby se uložilo více písmen najednou
      clearTimeout(timerIdSig.value);

      if (formStore.dirty && diagnosisCode != null) {
        timerIdSig.value = Number(setTimeout(() => submit(formStore), 500));
      }
      cleanup(() => clearTimeout(timerIdSig.value));
    });

    useTask$(({ track }) => {
      const diagnosisKind = track(() => formStore.internal.fields.diagnosisKind?.value);
      if (isServer) return;
      if (formStore.dirty && diagnosisKind != null) {
        submit(formStore);
      }
    });

    return (
      <>
        <Card class={pClass}>
          <CardHeader>DG (MKN)</CardHeader>
          <CardBody>
            <Form
              class="form-styles space-y-4"
              onSubmit$={async (values) => {
                await updatePalliativeCard$(values);
                reset(formStore, {
                  initialValues: {
                    diagnosisCode: values.diagnosisCode ?? undefined,
                    diagnosisKind: values.diagnosisKind ?? undefined,
                  },
                });
              }}
            >
              <FieldText inputType="textarea" label="Diagnóza" name="diagnosisCode" of={formStore} required={false} />

              <FieldRadio
                direction="vertical"
                label="Druh diagnózy"
                labelSrOnly
                name="diagnosisKind"
                of={formStore}
                options={Object.entries(palliativeCareDiagnosisKindMap).map(([value, label]) => ({
                  label,
                  value,
                }))}
                required={false}
              />
            </Form>
          </CardBody>
        </Card>
      </>
    );
  },
);
