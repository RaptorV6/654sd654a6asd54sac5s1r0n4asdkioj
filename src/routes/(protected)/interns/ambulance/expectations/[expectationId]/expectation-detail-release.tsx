import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import type { InternsAmbExpectationRelease } from "~/iris";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailRelease = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(async (release: InternsAmbExpectationRelease) => {
    const r = await updateExpectation$({ id: detailCtx.expectation.id, release, updatedById: user.id });
    if (r.success) {
      detailCtx.updateExpectation(r.data);
    }
  });

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Odchod</ExpectationBlockTitle>
      <div class="form-styles form-grid mt-2 grid-cols-1">
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.release === "ADMISSION"}
              id="release-admission"
              name="release"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("ADMISSION");
                }
              }}
              type="radio"
            />
            <label for="release-admission">Příjem na oddělení</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.release === "TRANSFER"}
              id="release-transfer"
              name="release"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("TRANSFER");
                }
              }}
              type="radio"
            />
            <label for="release-transfer">Překlad</label>
          </div>
        </div>
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.release === "RELEASE"}
              id="release-release"
              name="release"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("RELEASE");
                }
              }}
              type="radio"
            />
            <label for="release-release">Propuštění</label>
          </div>
        </div>
      </div>
    </ExpectationBlock>
  );
});
