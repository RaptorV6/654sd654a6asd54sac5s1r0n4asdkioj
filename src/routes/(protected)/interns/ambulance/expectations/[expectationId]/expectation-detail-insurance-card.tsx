import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import type { InternsAmbExpectationCardPossession } from "~/iris";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailInsuranceCard = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(async (insuranceCardPossession: InternsAmbExpectationCardPossession) => {
    const r = await updateExpectation$({
      id: detailCtx.expectation.id,
      insuranceCardPossession,
      updatedById: user.id,
    });
    if (r.success) {
      detailCtx.updateExpectation(r.data);
    }
  });

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Průkaz pojištěnce</ExpectationBlockTitle>
      <div class="form-styles form-grid mt-2 grid-cols-1">
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.insuranceCardPossession === "DEPARTMENT"}
              id="insurance-card-department"
              name="insurance-card"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("DEPARTMENT");
                }
              }}
              type="radio"
            />
            <label for="insurance-card-department">Předán na oddělení</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.insuranceCardPossession === "PATIENT"}
              id="insurance-card-patient"
              name="insurance-card"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("PATIENT");
                }
              }}
              type="radio"
            />
            <label for="insurance-card-patient">Předán pacientovi</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.insuranceCardPossession === "LESS"}
              id="insurance-card-less"
              name="insurance-card"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("LESS");
                }
              }}
              type="radio"
            />
            <label for="insurance-card-less">Nemá u sebe</label>
          </div>
        </div>
      </div>
    </ExpectationBlock>
  );
});
