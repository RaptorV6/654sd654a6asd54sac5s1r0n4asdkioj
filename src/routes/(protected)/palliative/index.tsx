import type { DocumentHead } from "@builder.io/qwik-city";

import {
  Alert,
  Card,
  CardBody,
  DataTable,
  DataTableBody,
  DataTableBodyCol,
  DataTableBodyRow,
  DataTableHead,
  DataTableHeadCol,
  DataTableHeadRow,
  InputCheckbox,
  InputText,
  StatusIndicator,
} from "@akeso/ui-components";
import { i18nFormatDate } from "@akeso/utils";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
// eslint-disable-next-line perfectionist/sort-imports
import { Link, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";

import { SortAscIcon, SortDescIcon } from "~/components/icons-outline";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import type { ServerGetAllPalliativeCardsResponse } from "./palliative-cards-rpc";

import { AddPalliativeCardAction } from "./add-palliative-card-action";
import { serverGetAllPalliativeCards } from "./palliative-cards-rpc";
import { updateUrlParams } from "./palliative-functions";

const pageTitle = "Paliativní péče";

export const usePalliativeCareCardsLoader = routeLoader$(async ({ env, fail, query }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const sortBy = (query.get("sortBy") as "lastInterventionAt" | "patientFullName") || "patientFullName";
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const sortDirection = (query.get("sortDirection") as "asc" | "desc") || "asc";
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const status = (query.get("status") as "active" | "all") || "active";
    const searchTerm = query.get("search") || "";

    // získání hodnot pro stránkování
    const afterCursor = query.get("after") || null;
    const beforeCursor = query.get("before") || null;
    const paging = afterCursor ? { after: afterCursor } : beforeCursor ? { before: beforeCursor } : null;

    const cards: null | ServerGetAllPalliativeCardsResponse = await serverGetAllPalliativeCards(
      env,
      sortBy,
      sortDirection,
      status,
      searchTerm,
      paging,
    );

    // if (cards.nodes.length === 0) {
    //   return fail(404, { errorMessage: "Pro zadané podmínky nebyly nalezeny žádné karty." });
    // }

    return cards;
  } catch (error) {
    console.error("Chyba při načítání karet:", error);
    return fail(404, { errorMessage: "Chyba při načítání karet" });
  }
});

export const head: DocumentHead = {
  title: pageTitle,
};

export default component$(() => {
  const palliativeCardsSig = usePalliativeCareCardsLoader();
  const location = useLocation();
  const navigate = useNavigate();

  const excludeInactiveCardsSig = useSignal(location.url.searchParams.get("status") === null);

  // vyhledávaný řetězec v inputu je při načtení stránky převzatý z url
  const searchTermSig = useSignal(location.url.searchParams.get("search") || "");

  // useTask na odložené odeslání textového řetězce k vyhledání
  const timerIdSig = useSignal(0);
  useTask$(({ cleanup, track }) => {
    track(() => searchTermSig.value);

    clearTimeout(timerIdSig.value);

    timerIdSig.value = Number(
      setTimeout(() => {
        updateUrlParams(location.url, navigate, {
          ...Object.fromEntries(location.url.searchParams),
          search: searchTermSig.value,
        });
      }, 500),
    );

    cleanup(() => clearTimeout(timerIdSig.value));
  });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
        <PageHeaderActions>
          <AddPalliativeCardAction />
        </PageHeaderActions>
      </PageHeader>
      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>{pageTitle}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <Card class="form-styles mb-4">
        <CardBody class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <InputText
            class="max-w-sm flex-1"
            error=""
            label="Vyhledat pacienta"
            labelSrOnly
            name="searchTerm"
            onInput$={(_, target) => {
              searchTermSig.value = target.value;
            }}
            placeholder="Zadejte jméno nebo RČ ..."
            type="text"
            value={searchTermSig.value}
          />
          <InputCheckbox
            class="sm:!mt-0"
            error=""
            label="Pouze aktivní karty"
            name="status"
            onInput$={(_, target) => {
              updateUrlParams(location.url, navigate, {
                ...Object.fromEntries(location.url.searchParams),
                status: target.checked ? undefined : "all",
              });
            }}
            required={false}
            switch
            value={excludeInactiveCardsSig.value}
          />
        </CardBody>
      </Card>

      {palliativeCardsSig.value.errorMessage || !Array.isArray(palliativeCardsSig.value.nodes) ? (
        <div class="flex items-center justify-center">
          <Alert severity="error">{palliativeCardsSig.value.errorMessage}</Alert>
        </div>
      ) : palliativeCardsSig.value.nodes.length === 0 ? (
        <div class="flex items-center justify-center">
          <Alert severity="info">
            {location.url.search ? "Pro zadané podmínky nebyly nalezeny žádné karty." : "Nebyly nalezeny žádné karty."}
          </Alert>
        </div>
      ) : (
        <>
          <DataTable>
            <DataTableHead>
              <DataTableHeadRow class="align-top">
                <DataTableHeadCol>Status</DataTableHeadCol>

                <DataTableHeadCol>
                  <div>
                    <SortButton column="patientFullName" label="Pacient" />
                  </div>
                </DataTableHeadCol>

                <DataTableHeadCol>Rodné číslo</DataTableHeadCol>
                <DataTableHeadCol class="hidden text-center md:table-cell">Počet intervencí</DataTableHeadCol>

                <DataTableHeadCol>
                  <div>
                    <SortButton column="lastInterventionAt" label="Datum poslední intervence" />
                  </div>
                </DataTableHeadCol>
              </DataTableHeadRow>
            </DataTableHead>

            <DataTableBody>
              {palliativeCardsSig.value.nodes.map((card) => (
                <DataTableBodyRow key={card.id}>
                  <DataTableBodyCol>
                    <StatusIndicator severity={card.isActive ? "none" : "success"} size="lg" />
                  </DataTableBodyCol>
                  <DataTableBodyCol>
                    <button
                      class="cursor-pointer border-none bg-transparent  text-left text-app-text-link"
                      onClick$={() => {
                        navigate(`/palliative/${card.id}/`);
                      }}
                    >
                      {card.patient.fullName ? card.patient.fullName : "neznámý pacient"}
                    </button>
                  </DataTableBodyCol>
                  <DataTableBodyCol>
                    {card.patient.birthRegistrationNumber
                      ? card.patient.birthRegistrationNumber
                      : "neznámé rodné číslo"}
                  </DataTableBodyCol>
                  <DataTableBodyCol class="hidden text-center md:table-cell">
                    {card.interventionsCount}
                  </DataTableBodyCol>
                  <DataTableBodyCol class="text-center">
                    {card.lastInterventionAt ? i18nFormatDate(card.lastInterventionAt) : ""}
                  </DataTableBodyCol>
                </DataTableBodyRow>
              ))}
            </DataTableBody>
          </DataTable>

          <div class="mt-8 grid grid-cols-3 justify-items-stretch text-sm">
            <div class="justify-self-start">
              {palliativeCardsSig.value.pageInfo?.hasPreviousPage && (
                <Link
                  class="cursor-pointer rounded bg-stone-200 px-4 py-1"
                  onClick$={() => {
                    const currentPage = parseInt(location.url.searchParams.get("page") || "1");
                    updateUrlParams(location.url, navigate, {
                      after: undefined,
                      before: palliativeCardsSig.value.pageInfo?.startCursor,
                      page: (currentPage - 1).toString(),
                    });
                  }}
                >
                  Předchozí
                </Link>
              )}
            </div>

            <span class="justify-self-center">strana {parseInt(location.url.searchParams.get("page") || "1")} </span>

            <div class=" justify-self-end">
              {palliativeCardsSig.value.pageInfo?.hasNextPage && (
                <Link
                  class="cursor-pointer rounded bg-stone-200 px-4 py-1"
                  onClick$={() => {
                    const currentPage = parseInt(location.url.searchParams.get("page") || "1");

                    updateUrlParams(location.url, navigate, {
                      after: palliativeCardsSig.value.pageInfo?.endCursor,
                      before: undefined,
                      page: (currentPage + 1).toString(),
                    });
                  }}
                >
                  Další
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
});

type SortButtonProps = {
  column: "lastInterventionAt" | "patientFullName";
  label: string;
};

// funkce na zobrazení hlavičky sloupce s nabídkou volby řazení
const SortButton = component$<SortButtonProps>(({ column, label }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActiveSig = useSignal(false);
  const isAscSig = useSignal(true);

  useTask$(({ track }) => {
    track(() => location.url.search);

    const sortBy = location.url.searchParams.get("sortBy");
    const sortDirection = location.url.searchParams.get("sortDirection");

    if (sortBy === null && column === "patientFullName") {
      isActiveSig.value = true;
    } else if (sortBy === column) {
      isActiveSig.value = true;
      isAscSig.value = sortDirection === "asc";
    } else {
      isActiveSig.value = false;
    }
  });

  return (
    <div class={`flex flex-col sm:flex-row  ${column == "patientFullName" ? "justify-start" : "justify-center"}`}>
      <div>{label}</div>
      <div>
        <button
          class={`ml-2 ${isActiveSig.value ? "text-blue-500" : "text-slate-500"}`}
          onClick$={() => {
            const nextDirection = isActiveSig.value
              ? isAscSig.value
                ? "desc"
                : "asc"
              : isAscSig.value
                ? "asc"
                : "desc";

            updateUrlParams(location.url, navigate, {
              ...Object.fromEntries(location.url.searchParams),
              sortBy: column,
              sortDirection: nextDirection,
            });
          }}
        >
          {isAscSig.value ? <SortAscIcon class="h-4 w-4" /> : <SortDescIcon class="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
});
