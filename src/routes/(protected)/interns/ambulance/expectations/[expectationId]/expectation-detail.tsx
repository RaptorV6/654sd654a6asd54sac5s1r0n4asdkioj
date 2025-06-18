import { component$ } from "@builder.io/qwik";

import { ExpectationDetailActions } from "./expectation-detail-actions";
import { ExpectationDetailBioMaterial } from "./expectation-detail-bio-material";
import { ExpectationDetailBreath } from "./expectation-detail-breath";
import { ExpectationDetailDates } from "./expectation-detail-dates";
import { ExpectationDetailDefects } from "./expectation-detail-defects";
import { ExpectationDetailIdCard } from "./expectation-detail-id-card";
import { ExpectationDetailInsuranceCard } from "./expectation-detail-insurance-card";
import { ExpectationDetailInvasions } from "./expectation-detail-invasions";
import { ExpectationDetailMedications } from "./expectation-detail-medications";
import { ExpectationDetailMethodOfArrival } from "./expectation-detail-method-of-arrival";
import { ExpectationDetailNote } from "./expectation-detail-note";
import { ExpectationDetailOrdinations } from "./expectation-detail-ordinations";
import { ExpectationDetailPhysiologicFunctions } from "./expectation-detail-physiologic-functions";
import { ExpectationDetailPriority } from "./expectation-detail-priority";
import { ExpectationDetailPriorityPreview } from "./expectation-detail-priority-preview";
import { ExpectationDetailRelease } from "./expectation-detail-release";
import { ExpectationDetailStomas } from "./expectation-detail-stomas";
import { ExpectationDetailTransport } from "./expectation-detail-transport";

export const ExpectationDetail = component$(() => {
  return (
    <div class="h-full w-full overflow-y-auto rounded border border-app-border-base bg-app-surface-base">
      <div class="form-styles w-full space-y-4 p-4">
        {/* <ExpectationDetailHeader /> */}
        <div class="grid grid-cols-5 gap-4">
          <ExpectationDetailDates class="col-span-3" />
          <ExpectationDetailPriority />
          <ExpectationDetailPriorityPreview />
        </div>
        <ExpectationDetailMethodOfArrival />
        <ExpectationDetailPhysiologicFunctions />
        <ExpectationDetailInvasions />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ExpectationDetailDefects />
          <ExpectationDetailStomas />
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ExpectationDetailBreath />
          <ExpectationDetailBioMaterial />
        </div>
        <ExpectationDetailOrdinations />
        <ExpectationDetailMedications />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <ExpectationDetailTransport />
          <ExpectationDetailRelease />
          <ExpectationDetailInsuranceCard />
          <ExpectationDetailIdCard />
        </div>
        <ExpectationDetailNote />
        <ExpectationDetailActions />
      </div>
    </div>
  );
});
