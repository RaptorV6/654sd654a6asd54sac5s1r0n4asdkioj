import { List } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { ExpectationDetailOrdinationsListItem } from "./expectation-detail-ordinations-list-item";
import { useExpectationDetailContext } from "./expectation-detail-provider";

export const ExpectationDetailOrdinationsList = component$(() => {
  const detailCtx = useExpectationDetailContext();

  if (!Array.isArray(detailCtx.expectation.ordinations) || detailCtx.expectation.ordinations.length === 0) {
    return null;
  }

  return (
    <List class="mt-2">
      {detailCtx.expectation.ordinations.map((ordination) => (
        <ExpectationDetailOrdinationsListItem key={ordination.id} ordination={ordination} />
      ))}
    </List>
  );
});
