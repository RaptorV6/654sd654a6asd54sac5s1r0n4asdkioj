import type { ProcedureMeta } from "../procedure-meta.types";

export function buildProcedureMeta(pm: Omit<ProcedureMeta, "href">): ProcedureMeta {
  return {
    ...pm,
    href: `/${pm.department}/procedures/${pm.kind}/`,
  };
}
