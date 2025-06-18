import { Button, ButtonLabelIcon, FieldHidden, FieldRadioSelect, FieldText } from "@akeso/ui-components";
import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { reset, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { AddOutlineIcon } from "~/components/icons-outline";
import {
  createIrisClient,
  enumInternsAmbExpectationInvasionKind,
  enumInternsAmbExpectationInvasionPerformed,
} from "~/iris";
import { useAuthUser } from "~/routes/plugin@auth";

import { InvasionPerformedSelectOptions, InvasionSelectOptions } from "./expectation-detail-invasions-helpers";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { InvasionFragment } from "./fetch-expectation-detail";

const msg = {
  required: "Pole je povinné.",
};

const InvasionCreateFormSchema = v.object({
  caliber: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  createdById: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  expectationId: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  kind: v.enum_(enumInternsAmbExpectationInvasionKind, msg.required),
  locality: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  note: v.string(),
  performed: v.enum_(enumInternsAmbExpectationInvasionPerformed, msg.required),
});

type InvasionCreateFormValues = v.InferOutput<typeof InvasionCreateFormSchema>;

const createExpectationInvasion$ = server$(async function (input: InvasionCreateFormValues) {
  const iris = createIrisClient(this.env);

  try {
    const {
      createInternsAmbExpectationInvasion: { internsAmbExpectationInvasion },
    } = await iris.mutation({
      createInternsAmbExpectationInvasion: {
        __args: {
          input,
        },
        internsAmbExpectationInvasion: InvasionFragment,
      },
    });

    return {
      data: internsAmbExpectationInvasion,
      success: true,
    };
  } catch (error) {
    console.error("createExpectationInvasion$: invasion creation failed with error", error);
    return { failed: true };
  }
});

export const ExpectationDetailInvasionsCreateForm = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const [formStore, { Form }] = useForm<InvasionCreateFormValues>({
    loader: {
      value: {
        caliber: "",
        createdById: user.id,
        expectationId: detailCtx.expectation.id,
        kind: undefined,
        locality: "",
        note: "",
        performed: undefined,
      },
    },
    validate: valiForm$(InvasionCreateFormSchema),
  });

  const createItem$ = $(async (data: InvasionCreateFormValues) => {
    const r = await createExpectationInvasion$(data);
    if (r.success) {
      const idx = detailCtx.expectation.invasions.findIndex((i) => i.id === r.data.id);
      if (idx === -1) {
        detailCtx.expectation.invasions = [r.data, ...detailCtx.expectation.invasions];
      } else {
        detailCtx.expectation.invasions[idx] = r.data;
      }

      reset(formStore);
    }
  });

  return (
    <Form
      class="form-styles flex gap-4 !p-0"
      onSubmit$={async (values) => {
        await createItem$(values);
      }}
    >
      <div class="form-grid !mt-0 flex-1 grid-cols-4">
        <FieldHidden name="expectationId" of={formStore} />
        <FieldHidden name="createdById" of={formStore} />
        <FieldRadioSelect label="Typ" name="kind" of={formStore} options={InvasionSelectOptions} />
        <FieldText inputType="text" label="Lokalizace" name="locality" of={formStore} />
        <FieldText inputType="text" label="Kalibr" name="caliber" of={formStore} />
        <FieldRadioSelect
          label="Kde zavedeno"
          name="performed"
          of={formStore}
          options={InvasionPerformedSelectOptions}
        />
        <div class="col-span-4">
          <FieldText inputType="textarea" label="Poznámka" name="note" of={formStore} required={false} />
        </div>
        <div class="col-span-4 flex items-center justify-end">
          <Button class="inline-flex items-center" severity="success" size="xs" type="submit" variant="contained">
            <ButtonLabelIcon as={AddOutlineIcon} />
            Přidat záznam
          </Button>
        </div>
      </div>
    </Form>
  );
});
