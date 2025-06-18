import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import type { InternsAmbExpectationTransportation } from "~/iris";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailTransport = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(async (transportation: InternsAmbExpectationTransportation) => {
    const r = await updateExpectation$({ id: detailCtx.expectation.id, transportation, updatedById: user.id });
    if (r.success) {
      detailCtx.updateExpectation(r.data);
    }
  });

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Transport</ExpectationBlockTitle>
      <div class="form-styles form-grid mt-2 grid-cols-1">
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.transportation === "WALKING"}
              id="transport-walking"
              name="transport"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("WALKING");
                }
              }}
              type="radio"
            />
            <label for="transport-walking">Chůze</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.transportation === "SITTING"}
              id="transport-sitting"
              name="transport"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("SITTING");
                }
              }}
              type="radio"
            />
            <label for="transport-sitting">V sedě</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.transportation === "LYING"}
              id="transport-lying"
              name="transport"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("LYING");
                }
              }}
              type="radio"
            />
            <label for="transport-lying">V leže</label>
          </div>
        </div>
      </div>
    </ExpectationBlock>
  );
});
