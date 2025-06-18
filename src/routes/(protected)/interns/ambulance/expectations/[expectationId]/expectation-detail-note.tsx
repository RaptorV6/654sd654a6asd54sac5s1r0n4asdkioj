import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { ReactiveTextareaField } from "./reactive-textarea-field";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailNote = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(async (id: string, data: { note?: string }) => {
    const r = await updateExpectation$({ id, note: data.note || "", updatedById: user.id });
    if (r.success) {
      detailCtx.updateExpectation(r.data);
    }
  });

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Poznámky</ExpectationBlockTitle>
      <div class="form-styles mt-2">
        <ReactiveTextareaField
          editable
          entity={detailCtx.expectation}
          label="Poznámky"
          labelSrOnly
          name="note"
          update$={update$}
        />
      </div>
    </ExpectationBlock>
  );
});
