import { List } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { ExpectationDetailMedicationsListItem } from "./expectation-detail-medications-list-item";
import { useExpectationDetailContext } from "./expectation-detail-provider";

export const ExpectationDetailMedicationsList = component$(() => {
  const detailCtx = useExpectationDetailContext();

  if (!Array.isArray(detailCtx.expectation.medications) || detailCtx.expectation.medications.length === 0) {
    return null;
  }

  return (
    <List class="mt-2">
      {detailCtx.expectation.medications.map((medication) => (
        <ExpectationDetailMedicationsListItem key={medication.id} medication={medication} />
      ))}
    </List>
  );
});
