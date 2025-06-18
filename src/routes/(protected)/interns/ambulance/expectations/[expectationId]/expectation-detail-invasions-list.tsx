import { List } from "@akeso/ui-components";
import { i18nPluralize } from "@akeso/utils";
import { component$, useComputed$, useSignal } from "@builder.io/qwik";

import { ExpectationDetailInvasionsListItem } from "./expectation-detail-invasions-list-item";
import { useExpectationDetailContext } from "./expectation-detail-provider";

const SHOW_MORE_LIMIT = 2;

export const ExpectationDetailInvasionsList = component$(() => {
  const detailCtx = useExpectationDetailContext();
  const canShowMore = useComputed$(
    () =>
      Array.isArray(detailCtx.expectation.physiologicFunctions) &&
      detailCtx.expectation.physiologicFunctions.length > SHOW_MORE_LIMIT,
  );
  const showAll = useSignal<boolean>(canShowMore.value && false);

  if (!Array.isArray(detailCtx.expectation.invasions) || detailCtx.expectation.invasions.length === 0) {
    return null;
  }

  return (
    <>
      <List class="mt-2">
        {detailCtx.expectation.invasions
          .filter((_, idx) => idx < SHOW_MORE_LIMIT || showAll.value)
          .map((invasion, idx) => (
            <ExpectationDetailInvasionsListItem editable={idx === 0} invasion={invasion} key={invasion.id} />
          ))}
      </List>
      {canShowMore.value && (
        <div class="text-right text-xs text-app-text-link">
          <button
            onClick$={() => {
              showAll.value = !showAll.value;
            }}
            type="button"
          >
            {showAll.value
              ? "zobrazit méně záznamů"
              : `zobrazit ${i18nPluralize(detailCtx.expectation.physiologicFunctions.length - SHOW_MORE_LIMIT, {
                  few: (n) => `další ${n} záznamy`,
                  one: "další záznam",
                  other: (n) => `dalších ${n} zaznamů`,
                })}`}
          </button>
        </div>
      )}
    </>
  );
});
