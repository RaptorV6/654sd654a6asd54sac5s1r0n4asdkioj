import type { ClassList } from "@builder.io/qwik";

import { Card, CardBody, PreviewText } from "@akeso/ui-components";
import { i18nFormatDate } from "@akeso/utils";
import { component$ } from "@builder.io/qwik";

import { usePalliativeCardContext } from "./palliative-card-context";

type PalliativeCardHeaderProps = {
  class?: ClassList;
};

export const PalliativeCardHeader = component$<PalliativeCardHeaderProps>(({ class: pCLass }) => {
  const cardCtx = usePalliativeCardContext();

  return (
    <Card class={pCLass}>
      <CardBody class="form-styles">
        <div class="form-grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <PreviewText label="Jméno klienta" value={cardCtx.card.patient?.fullName || "neznámé jméno"} />
          <PreviewText
            label="Rodné číslo"
            value={
              cardCtx.card.patient?.birthRegistrationNumber
                ? cardCtx.card.patient.birthRegistrationNumber
                : "neznámé rč"
            }
          />
          <PreviewText
            label="Datum narození"
            value={
              cardCtx.card.patient?.birthDate
                ? i18nFormatDate(cardCtx.card.patient.birthDate)
                : "neznámé datum narození"
            }
          />
        </div>
      </CardBody>
    </Card>
  );
});
