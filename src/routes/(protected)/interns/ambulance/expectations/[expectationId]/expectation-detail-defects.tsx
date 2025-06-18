import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { ReactiveTextareaField } from "./reactive-textarea-field";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailDefects = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(async (id: string, data: { defect?: string }) => {
    const r = await updateExpectation$({ defect: data.defect || "", id, updatedById: user.id });
    if (r.success) {
      detailCtx.updateExpectation(r.data);
    }
  });

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Defekty</ExpectationBlockTitle>

      <ReactiveTextareaField
        editable
        entity={detailCtx.expectation}
        label="Defekty"
        labelSrOnly
        name="defect"
        update$={update$}
      />
    </ExpectationBlock>
  );
});
