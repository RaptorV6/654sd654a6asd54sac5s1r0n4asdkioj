export const procedureGroups = ["preop", "op"] as const;
export type ProcedureGroup = (typeof procedureGroups)[number];

export type ProcedureGroupMeta = { code: ProcedureGroup; name: string };

export const procedureDepartments = ["surgery"] as const;
export type ProcedureDepartment = (typeof procedureDepartments)[number];

export type ProcedureMetaStep = { label: string };

export const procedureKinds = ["colorectal-cancer"] as const;
export type ProcedureKind = (typeof procedureKinds)[number];

export type ProcedureMeta = {
  department: ProcedureDepartment;
  group: ProcedureGroup;
  href: string;
  kind: ProcedureKind;
  name: string;
  steps: ProcedureMetaStep[];
  stepsCount: number;
};
