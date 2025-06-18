import type { ClassList, QRL } from "@builder.io/qwik";

import { Card, CardBody, CardHeader, FieldRadio, FieldText } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { reset, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { enumPalliativeCareDepartmentKind } from "~/iris";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";

import { palliativeCareDepartmentMap } from "../types";
import { usePalliativeCardContext } from "./palliative-card-context";

const FormSchema = v.object({
  department: v.optional(v.enum_(enumPalliativeCareDepartmentKind)),
  departmentNote: v.optional(v.string()),
  departmentOther: v.optional(v.string()),
});
type FormValues = v.InferInput<typeof FormSchema>;

type PalliativeCardDepartmentProps = {
  class?: ClassList;
  updatePalliativeCard$: QRL<(values: Omit<ServerUpdateCardInput, "id">) => void>;
};

export const PalliativeCardDepartment = component$<PalliativeCardDepartmentProps>(
  ({ class: pClass, updatePalliativeCard$ }) => {
    const cardCtx = usePalliativeCardContext();

    const [formStore, { Form }] = useForm<FormValues>({
      loader: {
        value: {
          department: cardCtx.card.department !== null ? cardCtx.card.department : undefined,
          departmentNote: cardCtx.card.departmentNote !== null ? cardCtx.card.departmentNote : undefined,
          departmentOther: cardCtx.card.departmentOther !== null ? cardCtx.card.departmentOther : undefined,
        },
      },
      validate: valiForm$(FormSchema),
    });

    const timerIdSig = useSignal(0);

    useTask$(({ cleanup, track }) => {
      const departmentOther = track(() => formStore.internal.fields.departmentOther?.value);
      const departmentNote = track(() => formStore.internal.fields.departmentNote?.value);

      // neprovádíme useTask na serveru
      if (isServer) return;

      if (formStore.dirty && (departmentOther != null || departmentNote != null)) {
        // zrušení odpočítávání, pokud probíhá, aby se uložilo více písmen najednou
        clearTimeout(timerIdSig.value);
        timerIdSig.value = Number(setTimeout(() => submit(formStore), 500));
      }

      cleanup(() => clearTimeout(timerIdSig.value));
    });

    useTask$(({ track }) => {
      const department = track(() => formStore.internal.fields.department?.value);

      if (isServer) return;

      if (formStore.dirty && department != null) {
        submit(formStore);
      }
    });

    return (
      <Card class={pClass}>
        <CardHeader>Oddělení</CardHeader>
        <CardBody>
          <Form
            class="form-styles space-y-4"
            onSubmit$={async (values) => {
              await updatePalliativeCard$(values);
              reset(formStore, {
                initialValues: {
                  department: values.department ?? undefined,
                  departmentNote: values.departmentNote ?? undefined,
                  departmentOther: values.departmentOther ?? undefined,
                },
              });
            }}
          >
            <FieldRadio
              direction="vertical"
              label="Oddělení"
              labelSrOnly
              name="department"
              of={formStore}
              options={Object.entries(palliativeCareDepartmentMap).map(([value, label]) => ({
                label,
                value,
              }))}
              required={false}
            />

            {formStore.internal.fields.department?.value === "OTHER" && (
              <FieldText
                inputType="text"
                label="Popis k volbě 'jiné'"
                name="departmentOther"
                of={formStore}
                required={false}
              />
            )}

            <FieldText inputType="textarea" label="Poznámka" name="departmentNote" of={formStore} required={false} />
          </Form>
        </CardBody>
      </Card>
    );
  },
);
