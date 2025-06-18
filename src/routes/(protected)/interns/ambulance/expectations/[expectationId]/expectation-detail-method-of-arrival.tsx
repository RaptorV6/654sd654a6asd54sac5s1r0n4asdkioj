import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import type { InternsAmbExpectationArrivalKind } from "~/iris";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailMethodOfArrival = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(async (arrivalKind: InternsAmbExpectationArrivalKind, arrivalKindText?: string) => {
    const r = await updateExpectation$({
      arrivalKind,
      arrivalKindText: arrivalKind === "RECOMMENDATION" ? arrivalKindText || "" : "",
      id: detailCtx.expectation.id,
      updatedById: user.id,
    });
    if (r.success) {
      detailCtx.updateExpectation(r.data);
    }
  });

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Způsob příchodu</ExpectationBlockTitle>
      <div class="form-styles form-grid grid-cols-1 sm:grid-cols-3">
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.arrivalKind === "RZP_RLP"}
              id="arrival-rzp-rlp"
              name="arrival"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("RZP_RLP");
                }
              }}
              type="radio"
            />
            <label for="arrival-rzp-rlp">RZP / RLP</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.arrivalKind === "NO_RECOMMENDATION"}
              id="arrival-no-rec"
              name="arrival"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("NO_RECOMMENDATION");
                }
              }}
              type="radio"
            />
            <label for="arrival-no-rec">bez doporučení</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.arrivalKind === "RECOMMENDATION"}
              id="arrival-rec"
              name="arrival"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("RECOMMENDATION");
                }
              }}
              type="radio"
            />
            <label for="arrival-rec">na doporučení lékaře</label>
          </div>
        </div>
        {detailCtx.expectation.arrivalKind === "RECOMMENDATION" && (
          <div class="col-span-3">
            <div class="form-group">
              <label for="arrival-rec-doc">Jméno lékaře</label>
              <div class="input-group">
                <input
                  name="doctor"
                  onInput$={async (_, el) => {
                    await update$("RECOMMENDATION", el.value);
                  }}
                  type="text"
                  value={detailCtx.expectation.arrivalKindText}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ExpectationBlock>
  );
});
