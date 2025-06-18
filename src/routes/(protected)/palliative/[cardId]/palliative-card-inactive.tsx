import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  DataTable,
  DataTableBody,
  DataTableBodyCol,
  DataTableBodyRow,
  DataTableHead,
  DataTableHeadCol,
  DataTableHeadRow,
  PreviewText,
} from "@akeso/ui-components";
import { i18nFormatDate } from "@akeso/utils";
import { component$ } from "@builder.io/qwik";

import type { TransformedInterventions } from "../palliative-functions";

import {
  palliativeCareContextKindMap,
  palliativeCareContextTargetMap,
  palliativeCareDepartmentMap,
  palliativeCareDiagnosisKindMap,
  palliativeCareEndKindMap,
  palliativeCareGoalOfCareMap,
  palliativeCareInterventionsForBereavedKindMap,
  palliativeCareSurpriseQuestionMap,
} from "../types";
import { DisabledCheckbox } from "./disabled-checkbox";
import { usePalliativeCardContext } from "./palliative-card-context";
import { PalliativeCardHeader } from "./palliative-card-header";
import { palliativeCareThemes } from "./palliative-care-themes";

export const PalliativeCardInactive = component$(() => {
  const cardCtx = usePalliativeCardContext();
  let prevYear = 0;
  let yearSelection = true;

  return (
    <div class="space-y-4">
      <div class="form-styles bg-app-surface-lowered p-7">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <p class="text-xl">Karta s ukončenou péčí</p>
          <PreviewText
            label="Datum ukončení péče"
            value={cardCtx.card.endAt ? i18nFormatDate(cardCtx.card.endAt) : ""}
          />
          <PreviewText
            label="Způsob ukončení péče"
            value={palliativeCareEndKindMap[cardCtx.card.endKind || ""] || ""}
          />
          {cardCtx.card.endKind === "OTHER" && (
            <PreviewText
              label="Text k 'jiné'"
              value={cardCtx.card.endKindOtherText ? cardCtx.card.endKindOtherText : ""}
            />
          )}
        </div>
      </div>

      <div class="space-y-4">
        <PalliativeCardHeader class="bg-app-surface-lowered" />

        <div class="form-styles grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card class="bg-app-surface-lowered">
            <CardHeader>Zahájení péče</CardHeader>
            <CardBody>
              <PreviewText
                label="Datum vyžádání intervence"
                value={cardCtx.card.interventionRequestAt ? i18nFormatDate(cardCtx.card.interventionRequestAt) : ""}
              />
              <PreviewText
                label="Datum hospitalizace"
                value={cardCtx.card.hospitalizationAt ? i18nFormatDate(cardCtx.card.hospitalizationAt) : ""}
              />
            </CardBody>
          </Card>

          <Card class="bg-app-surface-lowered">
            <CardHeader>Intervence u pozůstalých</CardHeader>
            <CardBody>
              <PreviewText
                label="Intervence u pozůstalých"
                labelSrOnly
                value={palliativeCareInterventionsForBereavedKindMap[cardCtx.card.interventionsForBereaved || ""] || ""}
              />
            </CardBody>
          </Card>

          <Card class="bg-app-surface-lowered">
            <CardHeader>Signální kód</CardHeader>
            <CardBody>
              <div class="mt-4">
                <DisabledCheckbox
                  checked={cardCtx.card.signalCodeSet ? cardCtx.card.signalCodeSet : false}
                  label="Signální kód zadán"
                />
              </div>
              <PreviewText label="Signální kód" value={cardCtx.card.signalCodeDrg ? cardCtx.card.signalCodeDrg : ""} />
            </CardBody>
          </Card>

          <Card class="bg-app-surface-lowered">
            <CardHeader>Oddělení</CardHeader>
            <CardBody>
              <PreviewText label="Oddělení" value={palliativeCareDepartmentMap[cardCtx.card.department || ""] || ""} />

              {cardCtx.card.department === "OTHER" && (
                <PreviewText
                  label="Text k 'jiné'"
                  value={cardCtx.card.departmentOther ? cardCtx.card.departmentOther : ""}
                />
              )}
              <PreviewText label="Poznámka" value={cardCtx.card.departmentNote ? cardCtx.card.departmentNote : ""} />
            </CardBody>
          </Card>

          <Card class="bg-app-surface-lowered">
            <CardHeader>DG (MKN)</CardHeader>
            <CardBody>
              <PreviewText label="Diagnóza" value={cardCtx.card.diagnosisCode ? cardCtx.card.diagnosisCode : ""} />
              <PreviewText
                label="druh diagnózy"
                labelSrOnly
                value={palliativeCareDiagnosisKindMap[cardCtx.card.diagnosisKind || ""] || ""}
              />
            </CardBody>
          </Card>

          <Card class="bg-app-surface-lowered">
            <CardHeader>
              <div>Surprise Question</div>
              <div>nepřekvapivé úmrtí v horizontu 12 měsíců</div>
            </CardHeader>
            <CardBody>
              <PreviewText
                label="Surprise question"
                labelSrOnly
                value={palliativeCareSurpriseQuestionMap[cardCtx.card.surpriseQuestion || ""] || ""}
              />
            </CardBody>
          </Card>

          <Card class="bg-app-surface-lowered">
            <CardHeader>Kontext péče</CardHeader>
            <CardBody>
              <PreviewText
                label="Kontext - druh"
                labelSrOnly
                value={palliativeCareContextKindMap[cardCtx.card.careContextKind || ""] || ""}
              />
              <PreviewText
                label="Kontext - cíl"
                labelSrOnly
                value={palliativeCareContextTargetMap[cardCtx.card.careContextTarget || ""] || ""}
              />
              {cardCtx.card.careContextTarget === "OTHER" && (
                <PreviewText
                  label="Text k 'jiné'"
                  value={cardCtx.card.careContextTargetOther ? cardCtx.card.careContextTargetOther : ""}
                />
              )}
            </CardBody>
          </Card>

          <Card class="bg-app-surface-lowered">
            <CardHeader>Cíl péče</CardHeader>
            <CardBody>
              <PreviewText
                label="Cíl péče"
                labelSrOnly
                value={palliativeCareGoalOfCareMap[cardCtx.card.goalOfCare || ""] || ""}
              />
              {cardCtx.card.goalOfCare === "OTHER" && (
                <PreviewText
                  label="Text k 'jiné'"
                  value={cardCtx.card.goalOfCareOtherText ? cardCtx.card.goalOfCareOtherText : ""}
                />
              )}
            </CardBody>
          </Card>
        </div>

        <Card class="bg-app-surface-lowered">
          <CardHeader class="flex">
            <CardHeaderTitle class="flex-1">Intervence {cardCtx.card.patient?.fullName}</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            <div class="w-full overflow-x-auto">
              <DataTable>
                <DataTableHead>
                  <DataTableHeadRow class="">
                    <DataTableHeadCol
                      class="border-b-1 sticky left-0 z-20 ms-20 whitespace-nowrap bg-app-surface-raised pr-9"
                      colSpan={2}
                    >
                      Dominantní řešená problematika
                    </DataTableHeadCol>
                    {cardCtx.card.transformedInterventions.interventionAt.map((date, index) => {
                      // Ensure date is date
                      date = new Date(date);
                      if (prevYear === 0) {
                        prevYear = date.getFullYear();
                      }
                      if (prevYear !== date.getFullYear()) {
                        yearSelection = !yearSelection;
                        prevYear = date.getFullYear();
                      }

                      return (
                        <DataTableHeadCol
                          class={[
                            "min-w-fit whitespace-nowrap bg-app-surface-raised px-6 text-center",
                            yearSelection
                              ? "text-accent-600 dark:text-accent-400"
                              : "text-highlight-500 dark:text-highlight-400",
                          ]}
                          key={index}
                        >
                          {i18nFormatDate(date)}
                        </DataTableHeadCol>
                      );
                    })}
                  </DataTableHeadRow>
                </DataTableHead>

                <DataTableBody>
                  {Object.entries(palliativeCareThemes).map(([key, label]) => (
                    <DataTableBodyRow key={key}>
                      <DataTableBodyCol
                        class="sticky left-0 z-20 min-w-fit bg-app-surface-raised md:whitespace-nowrap"
                        colSpan={2}
                      >
                        {label}
                      </DataTableBodyCol>
                      {cardCtx.card.transformedInterventions[
                        key as keyof Omit<
                          TransformedInterventions,
                          | "attendedCaplan"
                          | "attendedDoctor"
                          | "attendedNurse"
                          | "attendedOther"
                          | "attendedPsychologist"
                          | "attendedSocialWorker"
                          | "id"
                          | "interventionAt"
                          | "lengthMin"
                          | "other"
                        >
                      ].map((value: boolean, index: number) => (
                        <DataTableBodyCol class="text-center" key={index}>
                          {typeof value === "boolean" ? <DisabledCheckbox checked={value} /> : ""}
                        </DataTableBodyCol>
                      ))}
                    </DataTableBodyRow>
                  ))}
                  <DataTableBodyRow key="other">
                    <DataTableBodyCol
                      class="sticky left-0 z-20 min-w-fit bg-app-surface-raised md:whitespace-nowrap"
                      colSpan={2}
                    >
                      Jiné
                    </DataTableBodyCol>
                    {cardCtx.card.transformedInterventions["other"].map((value, id) => (
                      <DataTableBodyCol class="whitespace-normal text-center" key={id}>
                        {value}
                      </DataTableBodyCol>
                    ))}
                  </DataTableBodyRow>

                  <DataTableBodyRow>
                    <DataTableBodyCol
                      class="whitespace-no-wrap sticky left-0 w-48 min-w-fit bg-app-surface-raised"
                      rowSpan={6}
                    >
                      Intervenující profese
                    </DataTableBodyCol>
                    <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-raised">
                      Sestra
                    </DataTableBodyCol>
                    {cardCtx.card.transformedInterventions["attendedNurse"].map((value, index) => (
                      <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                        <DisabledCheckbox checked={value} />
                      </DataTableBodyCol>
                    ))}
                  </DataTableBodyRow>
                  <DataTableBodyRow>
                    <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-raised">
                      Lékař
                    </DataTableBodyCol>
                    {cardCtx.card.transformedInterventions["attendedDoctor"].map((value, index) => (
                      <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                        <DisabledCheckbox checked={value} />
                      </DataTableBodyCol>
                    ))}
                  </DataTableBodyRow>
                  <DataTableBodyRow>
                    <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-raised">
                      Sociální pracovník
                    </DataTableBodyCol>
                    {cardCtx.card.transformedInterventions["attendedSocialWorker"].map((value, index) => (
                      <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                        <DisabledCheckbox checked={value} />
                      </DataTableBodyCol>
                    ))}
                  </DataTableBodyRow>
                  <DataTableBodyRow>
                    <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-raised">
                      Kaplan/spirituální asistent
                    </DataTableBodyCol>
                    {cardCtx.card.transformedInterventions["attendedCaplan"].map((value, index) => (
                      <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                        <DisabledCheckbox checked={value} />
                      </DataTableBodyCol>
                    ))}
                  </DataTableBodyRow>
                  <DataTableBodyRow>
                    <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-raised">
                      Psycholog
                    </DataTableBodyCol>
                    {cardCtx.card.transformedInterventions["attendedPsychologist"].map((value, index) => (
                      <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                        <DisabledCheckbox checked={value} />
                      </DataTableBodyCol>
                    ))}
                  </DataTableBodyRow>
                  <DataTableBodyRow>
                    <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-raised">
                      Jiné
                    </DataTableBodyCol>
                    {cardCtx.card.transformedInterventions["attendedOther"].map((value, index) => (
                      <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                        {value}
                      </DataTableBodyCol>
                    ))}
                  </DataTableBodyRow>

                  <DataTableBodyRow key="lengthMin">
                    <DataTableBodyCol
                      class="sticky left-0 z-20 min-w-fit bg-app-surface-raised md:whitespace-nowrap"
                      colSpan={2}
                    >
                      Délka trvání intervence
                    </DataTableBodyCol>
                    {cardCtx.card.transformedInterventions["lengthMin"].map((value, index) => (
                      <DataTableBodyCol class="text-center" key={index}>
                        {value}
                      </DataTableBodyCol>
                    ))}
                  </DataTableBodyRow>
                </DataTableBody>
              </DataTable>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
});
