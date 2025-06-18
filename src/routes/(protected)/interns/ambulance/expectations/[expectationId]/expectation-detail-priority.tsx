import type { ClassList } from "@builder.io/qwik";

import { InputRadioButtons } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import { useAuthUser } from "~/routes/plugin@auth";

import type { ExpectationDetailData } from "./fetch-expectation-detail";

import { useExpectationDetailContext } from "./expectation-detail-provider";
import { priorityToText } from "./priority-to-text";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

type ExpectationDetailPriorityProps = {
  class?: ClassList;
};

export const ExpectationDetailPriority = component$<ExpectationDetailPriorityProps>(({ class: pClass }) => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  return (
    <div class={pClass}>
      <InputRadioButtons
        direction="vertical"
        error=""
        label="Priorita"
        name="priority"
        onInput$={async (_, el) => {
          const r = await updateExpectation$({
            id: detailCtx.expectation.id,
            priority: el.value as NonNullable<ExpectationDetailData["priority"]>,
            updatedById: user.id,
          });
          if (r.success) {
            detailCtx.updateExpectation(r.data);
          }
        }}
        options={(["CRITICAL", "HIGH", "STABILIZED"] as const).map((p) => ({
          label: `Priorita ${priorityToText(p)}`,
          value: p,
        }))}
        required={false}
        value={detailCtx.expectation.priority}
      />
    </div>
  );
});
