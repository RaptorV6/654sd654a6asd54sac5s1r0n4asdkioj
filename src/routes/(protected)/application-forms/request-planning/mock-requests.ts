import { splitCsv } from "~/lib/mock-client-helpers";

import csvText from "./requests.csv?raw";

export interface MockRequest {
  alergie: string;
  cp: string;
  dg: string;
  ext_zad: boolean;
  icp: string;
  id: string;
  issueDate: string;
  jmeno: string;
  odbornost: string;
  urgency: "Rutina" | "Statim";
  vaha?: string;
  vyska?: string;
}

const cols = [
  "id",
  "ext",
  "urgency",
  "jmeno",
  "cp",
  "dg",
  "vyska",
  "vaha",
  "alergie",
  "icp",
  "odbornost",
  "issueDate",
] as const;

let csv = csvText.trim();

export let mockRequests: MockRequest[] = splitCsv(csv, cols).map((row) => ({
  alergie: row.alergie,
  cp: row.cp,
  dg: row.dg,
  ext_zad: row.ext === "true",
  icp: row.icp,
  id: row.id,
  issueDate: row.issueDate,
  jmeno: row.jmeno,
  odbornost: row.odbornost,
  urgency: row.urgency as "Rutina" | "Statim",
  vaha: row.vaha || undefined,
  vyska: row.vyska,
}));

export function addMockRequest(data: Omit<MockRequest, "id">): MockRequest {
  const nextId = String(Math.max(...mockRequests.map((r) => Number(r.id))) + 1);
  const newReq: MockRequest = { id: nextId, ...data };

  mockRequests.push(newReq);

  const line = [
    nextId,
    data.ext_zad,
    data.urgency,
    data.jmeno,
    data.cp,
    data.dg,
    data.vyska ?? "",
    data.vaha ?? "",
    data.alergie,
    data.icp,
    data.odbornost,
    data.issueDate,
  ].join(";");

  csv += `\n${line}`;

  return newReq;
}

// Odstraní request z interního pole i z raw CSV stringu
export function removeMockRequest(id: string): boolean {
  const before = mockRequests.length;
  mockRequests = mockRequests.filter((r) => r.id !== id);
  if (mockRequests.length === before) return false;

  const lines = csv.split("\n");
  const header = lines[0];
  const data = lines.slice(1).filter((line) => {
    const cols = line.split(";");
    return cols[0] !== id;
  });
  csv = [header, ...data].join("\n");

  return true;
}
