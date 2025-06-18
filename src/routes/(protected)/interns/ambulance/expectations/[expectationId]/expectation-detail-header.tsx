import { CardHeader, CardHeaderTitle } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { ExpectationDetailPriorityPreview } from "./expectation-detail-priority-preview";
import { useExpectationDetailContext } from "./expectation-detail-provider";

/** @deprecated FIXME canditate for remove */
export const ExpectationDetailHeader = component$(() => {
  const detailCtx = useExpectationDetailContext();

  return (
    <CardHeader
      class={[
        "flex items-center",
        detailCtx.expectation.patient.sex === "FEMALE" && "bg-rose-200/70",
        detailCtx.expectation.patient.sex === "MALE" && "bg-blue-200/70",
      ]}
    >
      <div class="flex-1">
        <CardHeaderTitle>{detailCtx.expectation.patient.fullName}</CardHeaderTitle>
        <div>{detailCtx.expectation.patient.address.full}</div>
        <div class="mt-4 text-xs">{detailCtx.expectation.patient.birthRegistrationNumber}</div>
      </div>

      <ExpectationDetailPriorityPreview />
    </CardHeader>
  );
});
