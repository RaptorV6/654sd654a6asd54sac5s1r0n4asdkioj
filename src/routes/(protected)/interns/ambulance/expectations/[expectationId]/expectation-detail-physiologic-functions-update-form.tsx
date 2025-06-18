import type { QRL } from "@builder.io/qwik";

import { Button, ButtonLabelIcon, FieldHidden, FieldText } from "@akeso/ui-components";
import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { reset, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { AddOutlineIcon } from "~/components/icons-outline";
import { createIrisClient } from "~/iris";
import { useAuthUser } from "~/routes/plugin@auth";

import type { ExpectationDetailData } from "./fetch-expectation-detail";

import { useExpectationDetailContext } from "./expectation-detail-provider";
import { PhysiologicFunctionFragment } from "./fetch-expectation-detail";

const msg = {
  required: "Pole je povinné.",
};

const PhysiologicFunctionFormSchema = v.object({
  bloodPressure: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  id: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  note: v.string(),
  pain: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  pulse: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  saturation: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
  updatedById: v.pipe(v.string(msg.required), v.minLength(1, msg.required)),
});

type PhysiologicFunctionFormValues = v.InferOutput<typeof PhysiologicFunctionFormSchema>;

const updatePhysiologicFunction$ = server$(async function (input: PhysiologicFunctionFormValues) {
  const iris = createIrisClient(this.env);

  try {
    const {
      updateInternsAmbExpectationPhysiologicFunction: { internsAmbExpectationPhysiologicFunction },
    } = await iris.mutation({
      updateInternsAmbExpectationPhysiologicFunction: {
        __args: {
          input,
        },
        internsAmbExpectationPhysiologicFunction: PhysiologicFunctionFragment,
      },
    });

    return {
      data: internsAmbExpectationPhysiologicFunction,
      success: true,
    };
  } catch (error) {
    console.error("updatePhysiologicFunction$: physologic function creation failed with error:", error);
    return { failed: true };
  }
});

const buildInitialValues = (
  user: { id: string },
  physiologicFunction: NonNullable<ExpectationDetailData["physiologicFunctions"]>[number],
): PhysiologicFunctionFormValues => ({
  bloodPressure: physiologicFunction.bloodPressure || "",
  id: physiologicFunction.id,
  note: physiologicFunction.note || "",
  pain: physiologicFunction.pain || "",
  pulse: physiologicFunction.pulse || "",
  saturation: physiologicFunction.saturation || "",
  updatedById: user.id,
});

type ExpectationDetailPhysiologicFunctionsUpdateFormProps = {
  onSaved$: QRL<(success: boolean) => void>;
  physiologicFunction: NonNullable<ExpectationDetailData["physiologicFunctions"]>[number];
};

export const ExpectationDetailPhysiologicFunctionsUpdateForm =
  component$<ExpectationDetailPhysiologicFunctionsUpdateFormProps>(({ onSaved$, physiologicFunction }) => {
    const detailCtx = useExpectationDetailContext();
    const user = useAuthUser();

    const updateItem$ = $(async (data: PhysiologicFunctionFormValues) => {
      const r = await updatePhysiologicFunction$(data);
      if (r.success) {
        const idx = detailCtx.expectation.physiologicFunctions.findIndex((i) => i.id === r.data.id);
        if (idx === -1) {
          detailCtx.expectation.physiologicFunctions = [r.data, ...detailCtx.expectation.physiologicFunctions];
        } else {
          detailCtx.expectation.physiologicFunctions[idx] = r.data;
        }

        reset(formStore, { initialValues: buildInitialValues(user, r.data) });
      }

      await onSaved$(r.success === true);
    });

    const [formStore, { Form }] = useForm<PhysiologicFunctionFormValues>({
      loader: {
        value: buildInitialValues(user, physiologicFunction),
      },
      validate: valiForm$(PhysiologicFunctionFormSchema),
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
          <FieldText inputType="text" label="Krevní tlak" name="bloodPressure" of={formStore} />
          <FieldText inputType="text" label="Puls" name="pulse" of={formStore} />
          <FieldText inputType="text" label="Saturace" name="saturation" of={formStore} />
          <FieldText inputType="text" label="Bolest" name="pain" of={formStore} />
          <div class="col-span-4">
            <FieldText inputType="textarea" label="Poznámka" name="note" of={formStore} required={false} />
          </div>
          <div class="col-span-4 flex items-center justify-end">
            <Button class="inline-flex items-center" severity="accent" size="xs" type="submit" variant="contained">
              <ButtonLabelIcon as={AddOutlineIcon} />
              Upravit záznam
            </Button>
          </div>
        </div>
      </Form>
    );
  });
