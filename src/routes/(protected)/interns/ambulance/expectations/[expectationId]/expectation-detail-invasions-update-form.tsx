import type { QRL } from "@builder.io/qwik";

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

import type { ExpectationDetailData } from "./fetch-expectation-detail";

import { InvasionPerformedSelectOptions, InvasionSelectOptions } from "./expectation-detail-invasions-helpers";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { InvasionFragment } from "./fetch-expectation-detail";

const msg = {
  required: "Pole je povinné.",
};

const InvasionUpdateFormSchema = v.object({
  caliber: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  id: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  kind: v.enum_(enumInternsAmbExpectationInvasionKind, msg.required),
  locality: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  note: v.string(),
  performed: v.enum_(enumInternsAmbExpectationInvasionPerformed, msg.required),
  updatedById: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
});

type InvasionUpdateFormValues = v.InferOutput<typeof InvasionUpdateFormSchema>;

const updateExpectationInvasion$ = server$(async function (input: InvasionUpdateFormValues) {
  const iris = createIrisClient(this.env);

  try {
    const {
      updateInternsAmbExpectationInvasion: { internsAmbExpectationInvasion },
    } = await iris.mutation({
      updateInternsAmbExpectationInvasion: {
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
    console.error("updateExpectationInvasion$: invasion update failed with error", error);
    return { failed: true };
  }
});

const buildInitialValues = (
  user: { id: string },
  invasion: NonNullable<ExpectationDetailData["invasions"]>[number],
): InvasionUpdateFormValues => ({
  caliber: invasion.caliber || "",
  id: invasion.id,
  kind: invasion.kind,
  locality: invasion.locality || "",
  note: invasion.note || "",
  performed: invasion.performed,
  updatedById: user.id,
});

type ExpectationDetailInvasionsUpdateFormProps = {
  invasion: NonNullable<ExpectationDetailData["invasions"]>[number];
  onSaved$: QRL<(success: boolean) => void>;
};

export const ExpectationDetailInvasionsUpdateForm = component$<ExpectationDetailInvasionsUpdateFormProps>(
  ({ invasion, onSaved$ }) => {
    const detailCtx = useExpectationDetailContext();
    const user = useAuthUser();

    const [formStore, { Form }] = useForm<InvasionUpdateFormValues>({
      loader: {
        value: buildInitialValues(user, invasion),
      },
      validate: valiForm$(InvasionUpdateFormSchema),
    });

    const updateItem$ = $(async (data: InvasionUpdateFormValues) => {
      const r = await updateExpectationInvasion$(data);
      if (r.success) {
        const idx = detailCtx.expectation.invasions.findIndex((i) => i.id === r.data.id);
        if (idx === -1) {
          detailCtx.expectation.invasions = [r.data, ...detailCtx.expectation.invasions];
        } else {
          detailCtx.expectation.invasions[idx] = r.data;
        }

        reset(formStore, { initialValues: buildInitialValues(user, r.data) });
      }

      await onSaved$(r.success === true);
    });

    return (
      <Form
        class="form-styles flex gap-4 !p-0"
        onSubmit$={async (values) => {
          await updateItem$(values);
        }}
      >
        <div class="form-grid !mt-0 flex-1 grid-cols-4">
          <FieldHidden name="id" of={formStore} />
          <FieldHidden name="updatedById" of={formStore} />
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
              Upravit záznam
            </Button>
          </div>
        </div>
      </Form>
    );
  },
);
