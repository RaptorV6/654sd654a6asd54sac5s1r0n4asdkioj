import type { DefineMockClient } from "~/lib/mock-client-helpers";

import { createMockGqlClient } from "~/lib/mock-client-helpers";

import * as md from "./_mock-ojp-data";

function getNestedValue(obj: any, path: string): null | number | string | undefined {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function multiSort<T>(arr: T[], keys: string[], direction: "asc" | "desc" = "asc"): T[] {
  return [...arr].sort((a, b) => {
    for (const key of keys) {
      let aValue = getNestedValue(a, key);
      let bValue = getNestedValue(b, key);

      if (aValue == null) aValue = "";
      if (bValue == null) bValue = "";

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
}

type MockClient = DefineMockClient<
  {
    ojpProcedureList: [
      {
        search?: string;
        sortBy?: "lastName" | "surgery";
        sortDirection?: "asc" | "desc";
        type: "other" | "surgery";
      },
      {
        ojpProcedureListOther: md.OjpProcedureListItemOther[];
        ojpProcedureListSurgery: md.OjpProcedureListItemSurgery[];
      },
    ];
  },
  Record<string, never> // zatím žádné mutace
>;

export const _mock_cdr_createIrisClient = createMockGqlClient<MockClient>({
  mutation: {},
  query: {
    ojpProcedureList(args) {
      const { search = "", sortBy = "lastName", sortDirection = "asc", type } = args;
      const searchTerms = search.toLowerCase().split(/\s+/).filter(Boolean);

      if (type === "other") {
        const filtered = md.ojpProcedureListItemOtherMap.filter((slot) => {
          const description = (slot.description || "").toLowerCase();
          return searchTerms.every((term) => description.includes(term));
        });

        const sorted = multiSort(filtered, ["description"], sortDirection);

        return { ojpProcedureListOther: sorted, ojpProcedureListSurgery: [] };
      } else {
        const filtered = md.ojpProcedureListItemSurgeryMap.filter((slot) => {
          const firstName = slot.surgeon.firstName.toLowerCase();
          const lastName = slot.surgeon.lastName.toLowerCase();
          const surgery = slot.surgery.toLowerCase();
          return searchTerms.every(
            (term) => firstName.includes(term) || lastName.includes(term) || surgery.includes(term),
          );
        });

        const sorted = multiSort(
          filtered,
          sortBy === "surgery"
            ? ["surgery", "surgeon.lastName", "surgeon.firstName"]
            : ["surgeon.lastName", "surgeon.firstName", "surgery"],
          sortDirection,
        );

        return { ojpProcedureListOther: [], ojpProcedureListSurgery: sorted };
      }
    },
  },
});
