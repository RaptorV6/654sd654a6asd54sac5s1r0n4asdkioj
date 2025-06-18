import { component$ } from "@builder.io/qwik";

import { useExpectationDetailContext } from "./expectation-detail-provider";
import { priorityToText } from "./priority-to-text";

export const ExpectationDetailPriorityPreview = component$(() => {
  const detailCtx = useExpectationDetailContext();

  return (
    <div class="flex items-center justify-center">
      <div
        class={[
          "inline-flex h-12 w-12 items-center justify-center rounded-full",

          detailCtx.expectation.priority === "CRITICAL" && "bg-danger-base text-danger-text-contrast",
          detailCtx.expectation.priority === "HIGH" && "bg-warning-base text-warning-text-contrast",
          detailCtx.expectation.priority === "STABILIZED" && "bg-success-base text-success-text-contrast",
        ]}
      >
        {priorityToText(detailCtx.expectation.priority)}
      </div>
    </div>
  );
});
