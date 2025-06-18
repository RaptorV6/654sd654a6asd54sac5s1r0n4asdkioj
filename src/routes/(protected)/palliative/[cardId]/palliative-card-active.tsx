import { Button, useToaster } from "@akeso/ui-components";
import { $, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

import type { ServerUpdateCardInput } from "../palliative-cards-rpc";
import type { UpdatePalliativeCardQrl } from "../types";

import { updateCard } from "../palliative-functions";
import { PalliativeCardBereaved } from "./palliative-card-bereaved";
import { PalliativeCardCareContext } from "./palliative-card-care-context";
import { PalliativeCareEndDialog } from "./palliative-card-care-end-dialog";
import { usePalliativeCardContext } from "./palliative-card-context";
import { PalliativeCardDates } from "./palliative-card-dates";
import { PalliativeCardDepartment } from "./palliative-card-department";
import { PalliativeCardDiagnosis } from "./palliative-card-diagnosis";
import { PalliativeCardGoalOfCare } from "./palliative-card-goal-of-care";
import { PalliativeCardHeader } from "./palliative-card-header";
import { PalliativeCardInterventions } from "./palliative-card-interventions";
import { PalliativeCardSignalCode } from "./palliative-card-signal-code";
import { PalliativeCardSurpriseQuestion } from "./palliative-card-surprise-question";

export const PalliativeCardActive = component$(() => {
  const cardCtx = usePalliativeCardContext();
  const { toastError$, toastSuccess$ } = useToaster();
  const navigate = useNavigate();

  const updatePalliativeCard$: UpdatePalliativeCardQrl = $(async (values: Omit<ServerUpdateCardInput, "id">) => {
    if (!cardCtx.card.id) {
      const errorMessage = "Chyba při aktualizaci karty, není dostupné id.";
      console.error("v updatePalliativeCard$: ", errorMessage);
      await toastError$(errorMessage);
      return { card: null, success: false };
    }

    const errorMessage = "Chyba při aktualizaci karty.";

    try {
      const updateData: ServerUpdateCardInput = {
        ...values,
        id: cardCtx.card.id,
      };

      const r = await updateCard(updateData);

      if (r.success) {
        await toastSuccess$("Změna byla uložena.");
        return r;
      }

      console.error(errorMessage);
      await toastError$(errorMessage);
      return { card: null, success: false };
    } catch (error) {
      console.error(errorMessage, error);
      await toastError$(`${errorMessage} ${error}`);
      return { card: null, success: false };
    }
  });

  return (
    <div class="space-y-4">
      <PalliativeCardHeader />

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <PalliativeCardDates updatePalliativeCard$={updatePalliativeCard$} />
        <PalliativeCardBereaved updatePalliativeCard$={updatePalliativeCard$} />
        <PalliativeCardSignalCode updatePalliativeCard$={updatePalliativeCard$} />
        <PalliativeCardDepartment updatePalliativeCard$={updatePalliativeCard$} />
        <PalliativeCardDiagnosis updatePalliativeCard$={updatePalliativeCard$} />
        <PalliativeCardSurpriseQuestion updatePalliativeCard$={updatePalliativeCard$} />
        <PalliativeCardCareContext updatePalliativeCard$={updatePalliativeCard$} />
        <PalliativeCardGoalOfCare updatePalliativeCard$={updatePalliativeCard$} />
      </div>

      <PalliativeCardInterventions />

      <div class="mt-6 flex items-center justify-center">
        <Button
          onClick$={$(() => {
            navigate("?care-end-dialog", { scroll: false });
          })}
          severity="danger"
          type="button"
          variant="contained"
        >
          Ukončit péči
        </Button>
      </div>

      <PalliativeCareEndDialog updatePalliativeCard$={updatePalliativeCard$} />
    </div>
  );
});
