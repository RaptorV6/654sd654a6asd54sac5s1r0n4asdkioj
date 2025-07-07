import {
  Button,
  ButtonLabelIcon,
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
} from "@akeso/ui-components";
import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";

import { CloseOutlineIcon, SortAscIcon, SortDescIcon } from "~/components/icons-outline";
import { PageBreadcrumbs } from "~/components/page-breadcrumbs";
import { PageBreadcrumbsCurrent } from "~/components/page-breadcrumbs-current";
import { PageHeader } from "~/components/page-header";
import { PageHeaderActions } from "~/components/page-header-actions";
import { PageHeaderTitle } from "~/components/page-header-title";

import { _mock_cdr_createIrisClient } from "./_mock-ojp-client";
import { ExportToCsvAction } from "./export-to-csv-action";

const PAGE_TITLE = "OJP - seznam časových slotů";

export const head: DocumentHead = {
  title: PAGE_TITLE,
};

export const useOjpSlots = routeLoader$<{
  otherSlots: OJPOtherSlot[];
  surgerySlots: OJPSurgerySlot[];
  type: "other" | "surgery";
}>(async ({ env, query }) => {
  try {
    const type = query.get("type") === "other" ? "other" : "surgery";
    const search = query.get("search") || "";
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const sortBy = (query.get("sortBy") as "lastName" | "surgery") || "lastName";
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const sortDirection = (query.get("sortDirection") as "asc" | "desc") || "asc";

    const { ojpProcedureList } = await _mock_cdr_createIrisClient({ env, search, sortBy, sortDirection, type }).query({
      ojpProcedureList: {
        __args: {
          search: search,
          sortBy: sortBy,
          sortDirection: sortDirection,
          type: type,
        },
        ojpProcedureListOther: {
          description: true,
          duration: true,
          id: true,
          idOther: true,
        },
        ojpProcedureListSurgery: {
          duration: true,
          id: true,
          secondIdSurgeonSurgery: true,
          surgeon: {
            firstName: true,
            lastName: true,
          },
          surgery: true,
          type: true,
        },
      },
    });

    return {
      otherSlots: ojpProcedureList.ojpProcedureListOther,
      surgerySlots: ojpProcedureList.ojpProcedureListSurgery,
      type,
    };
  } catch (error) {
    console.error("Chyba při načítání slotů:", error);
    throw new Error("Chyba při načítání slotů");
  }
});

export type OJPOtherSlot = { description: string; duration: number; id: string; idOther: string };

export type OJPSurgerySlot = {
  duration: number;
  id: string;
  secondIdSurgeonSurgery: string;
  surgeon: { firstName: string; lastName: string };
  surgery: string;
  type: string;
};

export default component$(() => {
  const data = useOjpSlots();

  const { otherSlots, surgerySlots, type } = data.value;
  const location = useLocation();
  const navigate = useNavigate();

  const searchTermSig = useSignal(location.url.searchParams.get("search") || "");

  // useTask na odložené odeslání textového řetězce do url
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
        <PageHeaderTitle>{PAGE_TITLE}</PageHeaderTitle>
        <PageHeaderActions>
          <ExportToCsvAction slots={type === "surgery" ? surgerySlots : otherSlots} />
        </PageHeaderActions>
      </PageHeader>

      <PageBreadcrumbs>
        <PageBreadcrumbsCurrent>{PAGE_TITLE}</PageBreadcrumbsCurrent>
      </PageBreadcrumbs>

      <Card class="form-styles mb-4">
        <CardBody class="flex flex-col sm:flex-row sm:items-center sm:gap-8">
          <div class="flex flex-1 items-center gap-4">
            <InputText
              class="max-w-sm flex-1"
              error=""
              label="Vyhledat pacienta"
              labelSrOnly
              name="searchTerm"
              onInput$={(_, target) => {
                searchTermSig.value = target.value;
              }}
              placeholder="Zadejte lékaře nebo operační výkon..."
              type="text"
              value={searchTermSig.value}
            />
            {searchTermSig.value && (
              <Button
                onClick$={() => {
                  searchTermSig.value = "";
                }}
                type="button"
              >
                <ButtonLabelIcon as={CloseOutlineIcon} standalone>
                  <span class="sr-only">Zruš filtr</span>
                </ButtonLabelIcon>
              </Button>
            )}
          </div>

          <InputCheckbox
            class="sm:!mt-0"
            error=""
            label="Zobrazit ostatní sloty"
            name="status"
            onInput$={(_, target) => {
              searchTermSig.value = "";
              updateUrlParams(location.url, navigate, {
                ...Object.fromEntries(location.url.searchParams),
                search: undefined,
                sortBy: undefined,
                sortDirection: undefined,
                type: target.checked ? "other" : "surgery",
              });
            }}
            required={false}
            switch
            value={type === "other"}
          />
        </CardBody>
      </Card>

      {type === "other" ? <OtherSlotsTable slots={otherSlots} /> : <SurgerySlotsTable slots={surgerySlots} />}
    </>
  );
});

function updateUrlParams(
  locationUrl: URL,
  navigate: (path: string) => void,
  newParams: Record<string, null | string | undefined>,
) {
  const url = new URL(locationUrl.toString());
  const searchParams = new URLSearchParams(url.search);

  // když má klíč nastavenou novou hodnotu, nastavíme ji v url, jinak klíč z url vymažeme
  Object.entries(newParams).forEach(([key, value]) =>
    value ? searchParams.set(key, value) : searchParams.delete(key),
  );

  // zkontrolujeme, zda se mění filtr (tj. něco jiného než stránkování)
  const isFilterChange = Object.keys(newParams).some((key) => key !== "before" && key !== "after" && key !== "page");

  // Pokud se mění filtr, odstraníme stránkovací parametry
  if (isFilterChange) {
    searchParams.delete("before");
    searchParams.delete("after");
    searchParams.delete("page");
  }
  navigate(`${url.pathname}?${searchParams.toString()}`);
}

type SurgerySlotsTableProps = {
  slots: OJPSurgerySlot[];
};
const SurgerySlotsTable = component$<SurgerySlotsTableProps>(({ slots }) => {
  return (
    <DataTable>
      <DataTableHead>
        <DataTableHeadRow>
          <DataTableHeadCol>ID operatér/výkon 2</DataTableHeadCol>
          <DataTableHeadCol>Jméno</DataTableHeadCol>
          <DataTableHeadCol>
            <SortButton column="lastName" label="Příjmení" />
          </DataTableHeadCol>
          <DataTableHeadCol>Oddělení</DataTableHeadCol>
          <DataTableHeadCol>
            <SortButton column="surgery" label="Operační výkon" />
          </DataTableHeadCol>
          <DataTableHeadCol>Délka [min]</DataTableHeadCol>
        </DataTableHeadRow>
      </DataTableHead>
      <DataTableBody>
        {slots.map((slot) => (
          <DataTableBodyRow key={slot.id}>
            <DataTableBodyCol>{slot.secondIdSurgeonSurgery}</DataTableBodyCol>
            <DataTableBodyCol>{slot.surgeon.firstName}</DataTableBodyCol>
            <DataTableBodyCol>{slot.surgeon.lastName}</DataTableBodyCol>
            <DataTableBodyCol>{slot.type}</DataTableBodyCol>
            <DataTableBodyCol>{slot.surgery}</DataTableBodyCol>
            <DataTableBodyCol>{slot.duration}</DataTableBodyCol>
          </DataTableBodyRow>
        ))}
      </DataTableBody>
    </DataTable>
  );
});

type OtherSlotsTableProps = {
  slots: OJPOtherSlot[];
};
const OtherSlotsTable = component$<OtherSlotsTableProps>(({ slots }) => {
  return (
    <DataTable>
      <DataTableHead>
        <DataTableHeadRow>
          <DataTableHeadCol>ID ostatní</DataTableHeadCol>
          <DataTableHeadCol>Popis</DataTableHeadCol>
          <DataTableHeadCol>Délka [min]</DataTableHeadCol>
        </DataTableHeadRow>
      </DataTableHead>
      <DataTableBody>
        {slots.map((slot) => (
          <DataTableBodyRow key={slot.id}>
            <DataTableBodyCol>{slot.idOther}</DataTableBodyCol>
            <DataTableBodyCol>{slot.description}</DataTableBodyCol>
            <DataTableBodyCol>{slot.duration}</DataTableBodyCol>
          </DataTableBodyRow>
        ))}
      </DataTableBody>
    </DataTable>
  );
});

type SortButtonProps = {
  column: "lastName" | "surgery";
  label: string;
};

const SortButton = component$<SortButtonProps>(({ column, label }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sortBySig = useComputed$(() => location.url.searchParams.get("sortBy") || "lastName");
  const sortDirectionSig = useComputed$(() =>
    location.url.searchParams.get("sortDirection") === "desc" ? "desc" : "asc",
  );
  const isActiveSig = useComputed$(() => sortBySig.value === column);
  const isAscSig = useComputed$(() => sortDirectionSig.value === "asc");

  return (
    <div class={`flex items-center`}>
      <div>{label}</div>
      <div>
        <button
          class={`ml-2 ${isActiveSig.value ? "text-blue-500" : "text-slate-500"}`}
          onClick$={() => {
            const nextDirection = isActiveSig.value && isAscSig.value ? "desc" : "asc";

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
