import Fuse from "fuse.js";

import type { ProcedureGroup, ProcedureGroupMeta, ProcedureKind } from "./procedure-meta.types";

import { procedureColorectalCancerMeta } from "./procedures-meta/colorectal-cancer.meta";

/* eslint-disable perfectionist/sort-objects */
const procedureGroupsMetaDef: Record<ProcedureGroup, Omit<ProcedureGroupMeta, "code">> = {
  preop: { name: "Předoperační postupy" },
  op: { name: "Operační postupy" },
};
/* eslint-enable perfectionist/sort-objects */

const procedureGroupsMeta = Object.entries(procedureGroupsMetaDef).map(([code, props]) => ({ code, ...props }));

const proceduresMeta = [procedureColorectalCancerMeta];

const procedureGroups = procedureGroupsMeta.map((g) => {
  const procedures = proceduresMeta.filter((pm) => pm.group === g.code);

  return {
    ...g,
    procedures,
  };
});

export async function serverProceduresMetaAutocomplete(department: null | string, q: string) {
  let departmentProcedureGroups: typeof procedureGroups = procedureGroups;
  if (department) {
    departmentProcedureGroups = procedureGroups.map((pg) => {
      const procedures = pg.procedures.filter((p) => p.department === department);
      return { ...pg, procedures };
    });
  }

  if (!q || q.length < 2) return departmentProcedureGroups;

  const fuse = new Fuse(departmentProcedureGroups, {
    keys: ["procedures.name"],
    minMatchCharLength: 2,
  });

  return fuse.search(q).map((fr) => fr.item);
}

export async function serverProcedureMeta(kind: ProcedureKind) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return proceduresMeta.find((pm) => pm.kind === kind) ?? null;
}
