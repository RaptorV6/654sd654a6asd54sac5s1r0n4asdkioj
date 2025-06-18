import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import type { InternsAmbExpectationBreath } from "~/iris";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailBreath = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(async (breath: InternsAmbExpectationBreath, breathO2Note?: string) => {
    const r = await updateExpectation$({
      breath,
      breathO2Note: breath === "O2" ? breathO2Note || "" : "",
      id: detailCtx.expectation.id,
      updatedById: user.id,
    });
    if (r.success) {
      detailCtx.updateExpectation(r.data);
    }
  });

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Dýchání</ExpectationBlockTitle>
      <div class="form-styles form-grid mt-2 grid-cols-1">
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.breath === "SPONTANEOUS"}
              id="breath-spontaneous"
              name="breath"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("SPONTANEOUS");
                }
              }}
              type="radio"
            />
            <label for="breath-spontaneous">Spontální</label>
          </div>
        </div>

        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.breath === "INVASIVE"}
              id="breath-intensive"
              name="breath"
              onInput$={async (_, el) => {
                if (el.checked) {
                  await update$("INVASIVE");
                }
              }}
              type="radio"
            />
            <label for="breath-intensive">Invazivní</label>
          </div>
        </div>

        <div>
          <div class="form-check">
            <div class="input-group">
              <input
                checked={detailCtx.expectation.breath === "O2"}
                id="breath-rec"
                name="breath"
                onInput$={async (_, el) => {
                  if (el.checked) {
                    await update$("O2");
                  }
                }}
                type="radio"
              />
              <label for="breath-rec">O2</label>
            </div>
          </div>
          {detailCtx.expectation.breath === "O2" && (
            <div class="form-group">
              <label for="breath-rec-doc">Průtok</label>
              <div class="input-group">
                <input
                  name="doctor"
                  onInput$={async (_, el) => {
                    await update$("O2", el.value);
                  }}
                  type="text"
                  value={detailCtx.expectation.breathO2Note}
                />
                <p class="adornment">l/min</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ExpectationBlock>
  );
});
