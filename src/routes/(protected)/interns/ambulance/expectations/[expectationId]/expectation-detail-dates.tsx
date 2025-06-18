import type { ClassList } from "@builder.io/qwik";

import { PreviewText } from "@akeso/ui-components";
import { i18nFormatDateTime } from "@akeso/utils";
import { component$ } from "@builder.io/qwik";

import { useExpectationDetailContext } from "./expectation-detail-provider";

type ExpectationDetailDatesProps = {
  class?: ClassList;
};
export const ExpectationDetailDates = component$<ExpectationDetailDatesProps>(({ class: pClass }) => {
  const detailCtx = useExpectationDetailContext();

  return (
    <div class={[/*"form-grid grid-cols-2",*/ pClass]}>
      <PreviewText label="Datum a čas zahájení" value={i18nFormatDateTime(detailCtx.expectation.startAt)} />
      <PreviewText label="Datum a čas ukončení" value={i18nFormatDateTime(detailCtx.expectation.endAt)} />
    </div>
  );
});
