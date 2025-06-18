import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import type { InternsAmbExpectationCardPossession } from "~/iris";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailIdCard = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(async (idCardPossession: InternsAmbExpectationCardPossession) => {
    const r = await updateExpectation$({ id: detailCtx.expectation.id, idCardPossession, updatedById: user.id });
    if (r.success) {
      detailCtx.updateExpectation(r.data);
    }
  });

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Občanský průkaz</ExpectationBlockTitle>
      <div class="form-styles form-grid mt-2 grid-cols-1">
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.idCardPossession === "DEPARTMENT"}
              id="id-card-department"
              name="id-card"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("DEPARTMENT");
                }
              }}
              type="radio"
            />
            <label for="id-card-department">Předán na oddělení</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.idCardPossession === "PATIENT"}
              id="id-card-patient"
              name="id-card"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("PATIENT");
                }
              }}
              type="radio"
            />
            <label for="id-card-patient">Předán pacientovi</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.idCardPossession === "LESS"}
              id="id-card-less"
              name="id-card"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("LESS");
                }
              }}
              type="radio"
            />
            <label for="id-card-less">Nemá u sebe</label>
          </div>
        </div>
      </div>
    </ExpectationBlock>
  );
});
