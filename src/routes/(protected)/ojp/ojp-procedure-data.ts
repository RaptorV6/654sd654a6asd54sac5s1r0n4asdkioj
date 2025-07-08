import { ojpProcedureListItemSurgeryMap } from "./procedure-list/_mock-ojp-data";

// Přidáme jiné typy procedur
export type OjpProcedureItem = {
  duration: number;
  id: string;
  secondIdSurgeonSurgery: string;
  surgeon: { firstName: string; lastName: string };
  surgery: string;
  type: string;
};

const otherProcedures: OjpProcedureItem[] = [
  {
    duration: 10,
    id: "uklid-basic",
    secondIdSurgeonSurgery: "ÚS",
    surgeon: { firstName: "", lastName: "" },
    surgery: "Úklid sálu běžný",
    type: "Úklid",
  },
  {
    duration: 30,
    id: "uklid-tep",
    secondIdSurgeonSurgery: "ÚS TEP",
    surgeon: { firstName: "", lastName: "" },
    surgery: "Úklid sálu po TEP",
    type: "Úklid",
  },
  {
    duration: 60,
    id: "obed-pauza",
    secondIdSurgeonSurgery: "OBĚDOVÁ PAUZA",
    surgeon: { firstName: "", lastName: "" },
    surgery: "Obědová pauza",
    type: "Pauza",
  },
  {
    duration: 30,
    id: "tech-pauza",
    secondIdSurgeonSurgery: "TECHNICKÁ PAUZA",
    surgeon: { firstName: "", lastName: "" },
    surgery: "Technická pauza",
    type: "Pauza",
  },
  {
    duration: 60,
    id: "dovolena",
    secondIdSurgeonSurgery: "DOVOLENÁ",
    surgeon: { firstName: "", lastName: "" },
    surgery: "Dovolená",
    type: "Svátek", // <-- ZMĚNA: z "Ostatní" na "Svátek"
  },
  {
    duration: 60,
    id: "mimo-provoz",
    secondIdSurgeonSurgery: "MIMO PROVOZ",
    surgeon: { firstName: "", lastName: "" },
    surgery: "Mimo provoz",
    type: "Svátek", // <-- ZMĚNA: z "Ostatní" na "Svátek"
  },
  {
    duration: 60,
    id: "statni-svatek",
    secondIdSurgeonSurgery: "STÁTNÍ SVÁTEK",
    surgeon: { firstName: "", lastName: "" },
    surgery: "Státní svátek",
    type: "Svátek", // <-- ZMĚNA: z "Ostatní" na "Svátek"
  },
  {
    duration: 30,
    id: "jine",
    secondIdSurgeonSurgery: "JINÉ",
    surgeon: { firstName: "", lastName: "" },
    surgery: "Jiné",
    type: "Ostatní", // <-- Nechat jako "Ostatní"
  },
];

// Kombinace všech procedur
export const allProcedures: OjpProcedureItem[] = [
  ...ojpProcedureListItemSurgeryMap.map((item) => ({
    duration: item.duration,
    id: item.id,
    secondIdSurgeonSurgery: item.secondIdSurgeonSurgery,
    surgeon: item.surgeon,
    surgery: item.surgery,
    type: item.type,
  })),
  ...otherProcedures,
];

export function searchProcedures(searchTerm: string, type: "other" | "surgery" = "surgery"): OjpProcedureItem[] {
  if (searchTerm.length < 2) return [];

  const searchTerms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

  // Filtruj podle typu
  const dataToSearch =
    type === "other"
      ? otherProcedures
      : ojpProcedureListItemSurgeryMap.map((item) => ({
          duration: item.duration,
          id: item.id,
          secondIdSurgeonSurgery: item.secondIdSurgeonSurgery,
          surgeon: item.surgeon,
          surgery: item.surgery,
          type: item.type,
        }));

  return dataToSearch
    .filter((procedure) => {
      const firstName = procedure.surgeon.firstName.toLowerCase();
      const lastName = procedure.surgeon.lastName.toLowerCase();
      const surgery = procedure.surgery.toLowerCase();
      const type = procedure.type.toLowerCase();

      return searchTerms.every(
        (term) => firstName.includes(term) || lastName.includes(term) || surgery.includes(term) || type.includes(term),
      );
    })
    .slice(0, 15);
}
