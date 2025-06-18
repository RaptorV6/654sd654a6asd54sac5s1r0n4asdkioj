import type { ClassList } from "@builder.io/qwik";

import {
  Alert,
  Button,
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
} from "@akeso/ui-components";
import { i18nFormatDate } from "@akeso/utils";
import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

import type { TransformedInterventions } from "../palliative-functions";

import { DisabledCheckbox } from "./disabled-checkbox";
import { usePalliativeCardContext } from "./palliative-card-context";
import { PalliativeCardNewInterventionDialog } from "./palliative-card-new-intervention-dialog";
import { PalliativeCardUpdateInterventionDialog } from "./palliative-card-update-intervention-dialog";
import { palliativeCareThemes } from "./palliative-care-themes";

type PalliativeCardInterventionsProps = {
  class?: ClassList;
};

export const PalliativeCardInterventions = component$<PalliativeCardInterventionsProps>(({ class: pClass }) => {
  const cardCtx = usePalliativeCardContext();
  const navigate = useNavigate();

  let prevYear = 0;
  let yearSelection = true;

  return (
    <Card class={pClass}>
      <CardHeader class="flex">
        <CardHeaderTitle class="flex-1">Intervence</CardHeaderTitle>
        <div>
          <AddInterventionButton />
        </div>
      </CardHeader>
      <CardBody>
        {cardCtx.card.transformedInterventions.interventionAt.length > 0 ? (
          <div class="w-full overflow-x-auto">
            <DataTable>
              <DataTableHead>
                <DataTableHeadRow>
                  <DataTableHeadCol
                    class="sticky left-0 z-20 whitespace-nowrap bg-app-surface-lowered pr-9"
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
                          "min-w-fit whitespace-nowrap px-6 text-center",
                          yearSelection
                            ? "text-accent-600 dark:text-accent-400"
                            : "text-highlight-500 dark:text-highlight-400",
                        ]}
                        key={index}
                      >
                        <button
                          onClick$={async () => {
                            const interventionId = cardCtx.card.transformedInterventions.id[index];
                            if (interventionId) {
                              await navigate(`?intervention-update-dialog=${interventionId}`, { scroll: false });
                            } else {
                              console.error("Chyba, není k dispozici id intervence pro úpravu");
                            }
                          }}
                          type="button"
                        >
                          {i18nFormatDate(date)}
                        </button>
                      </DataTableHeadCol>
                    );
                  })}
                </DataTableHeadRow>
              </DataTableHead>

              <DataTableBody>
                {Object.entries(palliativeCareThemes).map(([key, label]) => (
                  <DataTableBodyRow key={key}>
                    <DataTableBodyCol
                      class="sticky left-0 z-20 min-w-fit bg-app-surface-base md:whitespace-nowrap"
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
                      <DataTableBodyCol class="text-center " key={index}>
                        <DisabledCheckbox checked={value} />
                      </DataTableBodyCol>
                    ))}
                  </DataTableBodyRow>
                ))}

                <DataTableBodyRow key="other">
                  <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-base" colSpan={2}>
                    Jiné
                  </DataTableBodyCol>
                  {cardCtx.card.transformedInterventions["other"].map((value: string, index: number) => (
                    <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                      {value}
                    </DataTableBodyCol>
                  ))}
                </DataTableBodyRow>

                <DataTableBodyRow>
                  <DataTableBodyCol
                    class="whitespace-no-wrap sticky left-0 w-48 min-w-fit bg-app-surface-base"
                    rowSpan={6}
                  >
                    Intervenující profese
                  </DataTableBodyCol>
                  <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-base">
                    Sestra
                  </DataTableBodyCol>
                  {cardCtx.card.transformedInterventions["attendedNurse"].map((value, index) => (
                    <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                      <DisabledCheckbox checked={value} />
                    </DataTableBodyCol>
                  ))}
                </DataTableBodyRow>
                <DataTableBodyRow>
                  <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-base">
                    Lékař
                  </DataTableBodyCol>
                  {cardCtx.card.transformedInterventions["attendedDoctor"].map((value, index) => (
                    <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                      <DisabledCheckbox checked={value} />
                    </DataTableBodyCol>
                  ))}
                </DataTableBodyRow>
                <DataTableBodyRow>
                  <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-base">
                    Sociální pracovník
                  </DataTableBodyCol>
                  {cardCtx.card.transformedInterventions["attendedSocialWorker"].map((value, index) => (
                    <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                      <DisabledCheckbox checked={value} />
                    </DataTableBodyCol>
                  ))}
                </DataTableBodyRow>
                <DataTableBodyRow>
                  <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-base">
                    Kaplan/spirituální asistent
                  </DataTableBodyCol>
                  {cardCtx.card.transformedInterventions["attendedCaplan"].map((value, index) => (
                    <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                      <DisabledCheckbox checked={value} />
                    </DataTableBodyCol>
                  ))}
                </DataTableBodyRow>
                <DataTableBodyRow>
                  <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-base">
                    Psycholog
                  </DataTableBodyCol>
                  {cardCtx.card.transformedInterventions["attendedPsychologist"].map((value, index) => (
                    <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                      <DisabledCheckbox checked={value} />
                    </DataTableBodyCol>
                  ))}
                </DataTableBodyRow>
                <DataTableBodyRow>
                  <DataTableBodyCol class="whitespace-no-wrap sticky left-0 min-w-fit bg-app-surface-base">
                    Jiné
                  </DataTableBodyCol>
                  {cardCtx.card.transformedInterventions["attendedOther"].map((value, index) => (
                    <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                      {value}
                    </DataTableBodyCol>
                  ))}
                </DataTableBodyRow>

                <DataTableBodyRow key="lengthMin">
                  <DataTableBodyCol class="whitespace-no-wrap sticky left-0  min-w-fit bg-app-surface-base" colSpan={2}>
                    Délka trvání intervence
                  </DataTableBodyCol>
                  {cardCtx.card.transformedInterventions["lengthMin"].map((value: string, index: number) => (
                    <DataTableBodyCol class="truncate whitespace-normal text-center" key={index}>
                      {value} min
                    </DataTableBodyCol>
                  ))}
                </DataTableBodyRow>
              </DataTableBody>
            </DataTable>
          </div>
        ) : (
          <div class="flex items-center justify-center">
            <Alert class="text-center" severity="info">
              <p class="mt-4">Zatím nejsou zadané žádné intervence</p>
              <div class="mb-4 mt-8">
                <AddInterventionButton />
              </div>
            </Alert>
          </div>
        )}
      </CardBody>
      <PalliativeCardNewInterventionDialog />

      <PalliativeCardUpdateInterventionDialog />
    </Card>
  );
});

const AddInterventionButton = component$(() => {
  const navigate = useNavigate();
  return (
    <Button
      onClick$={async () => {
        await navigate("?new-intervention-dialog", { scroll: false });
      }}
      severity="accent"
      type="button"
    >
      Přidat nový záznam
    </Button>
  );
});
