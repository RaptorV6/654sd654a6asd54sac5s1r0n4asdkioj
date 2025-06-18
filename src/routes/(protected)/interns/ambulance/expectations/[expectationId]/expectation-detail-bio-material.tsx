import { $, component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import type { InternsAmbExpectationBioMaterialCollection } from "~/iris";

import { useAuthUser } from "~/routes/plugin@auth";

import { ExpectationBlock, ExpectationBlockTitle } from "./_components";
import { useExpectationDetailContext } from "./expectation-detail-provider";
import { serverFunctionUpdateExpectation } from "./server-function-update-expectation";

const updateExpectation$ = server$(serverFunctionUpdateExpectation);

export const ExpectationDetailBioMaterial = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const user = useAuthUser();

  const update$ = $(
    async (input: { info?: string; other?: string; type: InternsAmbExpectationBioMaterialCollection }) => {
      const r = await updateExpectation$({
        bioMaterialCollection: input.type,
        bioMaterialCollectionInfo: input.type === "APPLICATION" ? input.info || "" : "",
        bioMaterialCollectionOther: input.type === "OTHER" ? input.other || "" : "",
        id: detailCtx.expectation.id,
        updatedById: user.id,
      });
      if (r.success) {
        detailCtx.updateExpectation(r.data);
      }
    },
  );

  return (
    <ExpectationBlock>
      <ExpectationBlockTitle>Odběr biologického materiálu</ExpectationBlockTitle>
      <div class="form-styles form-grid mt-2 grid-cols-1">
        <div class="form-check">
          <div class="input-group">
            <input
              checked={detailCtx.expectation.bioMaterialCollection === "NOT_DONE"}
              id="bio-material-not-done"
              name="bio-material"
              onInput$={$(async (_, el) => {
                if ((el as HTMLInputElement).checked) {
                  await update$({ type: "NOT_DONE" });
                }
              })}
              type="radio"
            />
            <label for="bio-material-not-done">Neproveden</label>
          </div>
        </div>

        <div>
          <div class="form-check">
            <div class="input-group">
              <input
                checked={detailCtx.expectation.bioMaterialCollection === "APPLICATION"}
                id="bio-material-application"
                name="bio-material"
                onInput$={$(async (_, el) => {
                  if ((el as HTMLInputElement).checked) {
                    await update$({
                      info: detailCtx.expectation.bioMaterialCollectionInfo ?? undefined,
                      type: "APPLICATION",
                    });
                  }
                })}
                type="radio"
              />
              <label for="bio-material-application">Dle žádanky</label>
            </div>
          </div>
          {detailCtx.expectation.bioMaterialCollection === "APPLICATION" && (
            <div class="form-group">
              <label for="breath-rec-doc">Žádanka</label>
              <div class="input-group">
                <input
                  name="bio-material-info"
                  onInput$={async (_, el) => {
                    await update$({
                      info: el.value,
                      type: "APPLICATION",
                    });
                  }}
                  type="text"
                  value={detailCtx.expectation.bioMaterialCollectionInfo ?? ""}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <div class="form-check">
            <div class="input-group">
              <input
                checked={detailCtx.expectation.bioMaterialCollection === "OTHER"}
                id="bio-material-other"
                name="bio-material"
                onInput$={$(async (_, el) => {
                  if ((el as HTMLInputElement).checked) {
                    await update$({
                      info: undefined,
                      other: detailCtx.expectation.bioMaterialCollectionOther ?? undefined,
                      type: "OTHER",
                    });
                  }
                })}
                type="radio"
              />
              <label for="bio-material-other">Jiné</label>
            </div>
          </div>
          {detailCtx.expectation.bioMaterialCollection === "OTHER" && (
            <div class="form-group">
              <label for="breath-rec-doc">Doplňující informace</label>
              <div class="input-group">
                <textarea
                  name="bio-material-other"
                  onInput$={async (_, el) => {
                    await update$({
                      other: el.value,
                      type: "OTHER",
                    });
                  }}
                  value={detailCtx.expectation.bioMaterialCollectionOther ?? ""}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </ExpectationBlock>
  );
});
