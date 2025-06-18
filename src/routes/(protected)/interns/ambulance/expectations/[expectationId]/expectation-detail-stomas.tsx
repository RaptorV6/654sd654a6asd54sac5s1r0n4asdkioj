import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { ReactiveTextareaField } from "./reactive-textarea-field";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailStomas = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(async (id: string, data: { stomia?: string }) => {
    const r = await updateExpectation$({ id, stomia: data.stomia || "", updatedById: user.id });
    if (r.success) {
      detailCtx.updateExpectation(r.data);
    }
  });

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Stomie</ExpectationBlockTitle>
      <div class="form-styles mt-2">
        <ReactiveTextareaField
          editable
          entity={detailCtx.expectation}
          label="Stomie"
          labelSrOnly
          name="stomia"
          update$={update$}
        />
      </div>
    </ExpectationBlock>
  );
});
