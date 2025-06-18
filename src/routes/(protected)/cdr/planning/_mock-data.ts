/* eslint-disable perfectionist/sort-object-types */
export type _Mock_OrganizationHierarchy = {
  id: string;
  name: string;
  parentId: null | string;
};
/* eslint-enable perfectionist/sort-object-types */

// prettier-ignore
export const _mock_organizationHierarchy = [
  { id: "ROOT", name: "root", parentId: null },
  { id: "RNB", name: "RNB", parentId: "ROOT" },
  { id: "CDR", name: "CDR", parentId: "RNB" },
  { id: "2CD", name: "2CD", parentId: "CDR" },
  { id: "2C", name: "2C", parentId: "2CD" },
  { id: "2D", name: "2D", parentId: "2CD" },
  { id: "3AB", name: "3AB", parentId: "CDR" },
  { id: "3A", name: "3A", parentId: "3AB" },
  { id: "3B", name: "3B", parentId: "3AB" },
  { id: "3CD", name: "3CD", parentId: "CDR" },
  { id: "3C", name: "3C", parentId: "3CD" },
  { id: "3D", name: "3D", parentId: "3CD" },
  { id: "5P-st", name: "5P st", parentId: "CDR" },
  { id: "5P", name: "5P", parentId: "5P-st" },
] satisfies _Mock_OrganizationHierarchy[];

/* eslint-disable perfectionist/sort-object-types */
export type _Mock_MedicalProcedure = {
  id: string;
  name: string;
  avgTimeMin: number;
  roomIsVirtual: boolean;
  roomIsShared: boolean;
  roomCount: number;
  roomNote: null | string;
  medicalProcedureGroup: string;
};
/* eslint-enable perfectionist/sort-object-types */

// prettier-ignore
export const _mock_medicalProcedures = [
  { avgTimeMin: 90, id: "individuální-psychoterapie-90",	medicalProcedureGroup: "K1",	name: "Individuální psychoterapie 90", roomCount: 1, roomIsShared: true, roomIsVirtual: true, roomNote: null, },
  { avgTimeMin: 45, id: "individuální-psychoterapie-45",	medicalProcedureGroup: "K1",	name: "Individuální psychoterapie 45", 	roomCount: 1, roomIsShared: true, roomIsVirtual: true, roomNote: null, },
  { avgTimeMin: 90, id: "skupinová-psychoterapie",	medicalProcedureGroup: "K1",	name: "Skupinová psychoterapie", roomCount: 2, roomIsShared: false, roomIsVirtual: false, roomNote: null, },
  { avgTimeMin: 150, id: "psychologické-vyšetření-pokračování",	medicalProcedureGroup: "K1",	name: "Psychologické vyšetření - pokračování",	roomCount: 1, roomIsShared: true, roomIsVirtual: true,  roomNote: null, },
  { avgTimeMin: 150, id: "cílené-kognitivní-úvod",	medicalProcedureGroup: "K1",	name: "Cílené kognitivní - úvod",	roomCount: 1, roomIsShared: true, roomIsVirtual: true,  roomNote: null, },
  { avgTimeMin: 150, id: "cílené-kognitivní-pokračování",	medicalProcedureGroup: "K1",	name: "Cílené kognitivní - pokračování",	roomCount: 1, roomIsShared: true, roomIsVirtual: true,  roomNote: null, },
  { avgTimeMin: 45, id: "cílené-kognitivní-závěr",	medicalProcedureGroup: "K1",	name: "Cílené kognitivní - závěr",	roomCount: 1, roomIsShared: true, roomIsVirtual: true, roomNote: null, },
  { avgTimeMin: 90, id: "individuální-psychoterapie-90",	medicalProcedureGroup: "K2",	name: "Individuální psychoterapie 90", roomCount: 1, roomIsShared: true, roomIsVirtual: true,  roomNote: null, },
  { avgTimeMin: 45, id: "individuální-psychoterapie-45",	medicalProcedureGroup: "K2",	name: "Individuální psychoterapie 45", roomCount: 1, roomIsShared: true, roomIsVirtual: true, roomNote: null, },
  { avgTimeMin: 60, id: "individuální-psychoterapie",	medicalProcedureGroup: "K2",	name: "Individuální psychoterapie", roomCount: 1, roomIsShared: true, roomIsVirtual: true, roomNote: "Pouze pro 5Patro" },
  { avgTimeMin: 90, id: "skupinová-psychoterapie",	medicalProcedureGroup: "K2",	name: "Skupinová psychoterapie",	roomCount: 2, roomIsShared: false, roomIsVirtual: false, roomNote: null, },
] satisfies _Mock_MedicalProcedure[];

/* eslint-disable perfectionist/sort-object-types */
export type _Mock_MedicalProcedureGroup = {
  id: string;
  code: string;
  name: string;
};
/* eslint-enable perfectionist/sort-object-types */

// prettier-ignore
export const _mock_medicalProcedureGroups = [
  { code: "K1", id: "K1",	name: "Psycholog ve zdravotnictví", },
  { code: "K2", id: "K2",	name: "Psycholog ve zdravotnictví", },
  { code: "K3", id: "K3",	name: "Klinický psycholog", },
  { code: "PT", id: "PT",	name: "Psychoterapeut", },
  { code: "T", id: "T",	name: "Terapeut", },
  { code: "A", id: "A",	name: "Adiktolog", },
  { code: "NT", id: "NT",	name: "Nutriční terapeut", },
  { code: "K", id: "K",	name: "Kaplanka", },
] satisfies _Mock_MedicalProcedureGroup[];

/* eslint-disable perfectionist/sort-object-types */
export type _Mock_PlanningEmployee = {
  id: string;
  fullName: string;
  contract: number;
  medicalProcedureGroups: string[];
};
/* eslint-enable perfectionist/sort-object-types */

// prettier-ignore
export const _mock_employees = [
  { contract: 0.8, fullName: "Lechovská Veronika", id: "lechovská-veronika", medicalProcedureGroups: ["K1", "K2", "K3", "PT"] },
  { contract: 1, fullName: "Štípská Karolína", id: "štípská-karolína", medicalProcedureGroups: ["K1", "K2"] },
  { contract: 1, fullName: "Bublová Monika",	id: "bublová-monika", medicalProcedureGroups: ["K1", "NT"] },
] satisfies _Mock_PlanningEmployee[];

export type _Mock_MedicalProcedurePlanEventAssigned = {
  collision: boolean;
  employee: _Mock_PlanningEmployee;
  unavailable: boolean;
};
export type _Mock_MedicalProcedurePlanEvent = {
  assigned: _Mock_MedicalProcedurePlanEventAssigned[];
  dateFrom: Date;
  dateTo: Date | null;
  description: null | string;
  duration: null | number;
  id: string;
  medicalProcedure: _Mock_MedicalProcedure;
  organizationHierarchies: _Mock_OrganizationHierarchy[];
  title: null | string;
};

export const _mock_medicalProcedurePlanEvents: _Mock_MedicalProcedurePlanEvent[] = [
  {
    assigned: [
      {
        collision: false,
        employeeId: "lechovská-veronika",
        unavailable: false,
      },
      {
        collision: false,
        employeeId: "štípská-karolína",
        unavailable: false,
      },
    ].map(({ employeeId, ...rest }) => {
      const employee = _mock_employees.find((e) => e.id === employeeId)!;
      return { ...rest, employee };
    }),
    dateFrom: new Date(2025, 3 - 1, 3, 8, 0),
    dateTo: null,
    description: null,
    duration: 150,
    id: "jednicka",
    medicalProcedure: "psychologické-vyšetření-pokračování",
    organizationHierarchies: ["2C", "2D", "3C"],
    title: "2C+2D+3C / Individuální psychoterapie",
  },
  {
    assigned: [
      {
        collision: false,
        employeeId: "lechovská-veronika",
        unavailable: false,
      },
      {
        collision: false,
        employeeId: "štípská-karolína",
        unavailable: false,
      },
    ].map(({ employeeId, ...rest }) => {
      const employee = _mock_employees.find((e) => e.id === employeeId)!;
      return { ...rest, employee };
    }),
    dateFrom: new Date(2025, 3 - 1, 3, 11, 0),
    dateTo: null,
    description: "(45 min-sdílený slot)",
    duration: 150,
    id: "dvojka",
    isIndividual: false,
    medicalProcedure: "psychologické-vyšetření-pokračování",
    organizationHierarchies: ["2C", "2D", "3C"],
    title: "2CD / Huleni",
  },
  {
    assigned: [
      {
        collision: false,
        employeeId: "lechovská-veronika",
        unavailable: false,
      },
      {
        collision: false,
        employeeId: "štípská-karolína",
        unavailable: false,
      },
    ].map(({ employeeId, ...rest }) => {
      const employee = _mock_employees.find((e) => e.id === employeeId)!;
      return { ...rest, employee };
    }),
    dateFrom: new Date(2025, 3 - 1, 4, 8, 15),
    dateTo: null,
    description: null,
    duration: 45,
    id: "trojka",
    isIndividual: false,
    medicalProcedure: "cílené-kognitivní-pokračování",
    organizationHierarchies: ["2C", "2D", "3C"],
    title: "2CD / Individuální psychoterapie",
  },
].map((o) => {
  const { medicalProcedure: mp, organizationHierarchies: oh, ...rest } = o;
  const organizationHierarchies = oh.map((x) => _mock_organizationHierarchy.find((y) => y.id === x)!);
  const medicalProcedure = _mock_medicalProcedures.find((z) => z.id === mp)!;

  return { ...rest, medicalProcedure, organizationHierarchies };
});
