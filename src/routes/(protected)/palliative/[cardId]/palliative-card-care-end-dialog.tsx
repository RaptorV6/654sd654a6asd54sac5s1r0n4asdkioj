import type { QRL } from "@builder.io/qwik";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  FieldDate,
  FieldRadio,
  FieldText,
  useToaster,
} from "@akeso/ui-components";
import { dateAddDays, dateOnlyISODateString } from "@akeso/utils";
import { $, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { reset, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { enumPalliativeCareEndKind } from "~/iris";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";
import type { UpdateCardResult } from "../palliative-functions";

import { palliativeCareEndKindMap } from "../types";
import { usePalliativeCardContext, usePalliativeCardInterventionDialogsContext } from "./palliative-card-context";

const PalliativeCareEndFormSchema = v.object({
  endAt: v.date(),
  endKind: v.enum_(enumPalliativeCareEndKind, "Zadejte způsob ukončení péče"),
  endKindOtherText: v.optional(v.string()),
});
type PalliativeCareEndFormValues = v.InferInput<typeof PalliativeCareEndFormSchema>;

type PalliativeCardInterventionDialogProps = {
  updatePalliativeCard$: QRL<(values: Omit<ServerUpdateCardInput, "id">) => Promise<UpdateCardResult>>;
};

export const PalliativeCareEndDialog = component$<PalliativeCardInterventionDialogProps>(
  ({ updatePalliativeCard$ }) => {
    const { openCareEndDialogSig } = usePalliativeCardInterventionDialogsContext();
    const cardCtx = usePalliativeCardContext();

    const [formStore, { Form }] = useForm<PalliativeCareEndFormValues>({
      loader: {
        value: {
          endAt: new Date(),
          endKind: undefined,
          endKindOtherText: undefined,
        },
      },
      validate: valiForm$(PalliativeCareEndFormSchema),
    });

    const navigate = useNavigate();
    const { toastError$ } = useToaster();

    return (
      <Dialog
        bind:show={openCareEndDialogSig}
        onClose$={() => {
          navigate("./", { scroll: false });
          reset(formStore);
        }}
      >
        <DialogHeader>
          <h2>
            <span class="block">Ukončení péče</span>
            <span class="mt-2 block">
              {cardCtx.card.patient?.fullName} (rč: {cardCtx.card.patient?.birthRegistrationNumber})
            </span>
          </h2>
        </DialogHeader>
        <Form
          onSubmit$={$(async (values: PalliativeCareEndFormValues) => {
            if (!formStore.invalid) {
              const result = await updatePalliativeCard$(values);
              if (result.success && result.card) {
                cardCtx.card = result.card;
              }
              openCareEndDialogSig.value = false;
            } else {
              console.error("Chyba při ukončení karty, formulář není validní.");
              await toastError$("Chyba při ukončení karty, formulář není validní ");
            }
          })}
        >
          <DialogBody class="form-styles">
            <div class="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <FieldDate
                label="Datum ukončení péče"
                max={dateOnlyISODateString(new Date())}
                min={dateOnlyISODateString(dateAddDays(-365))}
                name="endAt"
                of={formStore}
                required={true}
              />

              <FieldRadio
                direction="vertical"
                label="Způsob ukončení péče"
                name="endKind"
                of={formStore}
                options={Object.entries(palliativeCareEndKindMap).map(([value, label]) => ({
                  label,
                  value,
                }))}
              />
            </div>

            {formStore.internal.fields.endKind?.value === "OTHER" && (
              <FieldText
                inputType="textarea"
                label='Text k volbě "jiné"'
                name="endKindOtherText"
                of={formStore}
                required={false}
              />
            )}
          </DialogBody>

          <DialogFooter>
            <Button disabled={formStore.submitting} severity="danger" type="submit" variant="contained">
              Ukončit
            </Button>
          </DialogFooter>
        </Form>
      </Dialog>
    );
  },
);
