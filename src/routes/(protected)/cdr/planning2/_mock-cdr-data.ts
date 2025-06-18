import { dateAddDays, dateNextMidnight, datePrevMidnight } from "@akeso/utils";

import type { CalendarEventPosition } from "~/lib/calendar/calendar-events-position";

import { dateFirstIsoWeekMonday } from "~/lib/date-first-iso-week-monday";
import { dateMonthDateRangeCalendar } from "~/lib/date-month-date-range-calendar";
import { dateWeekNumber } from "~/lib/date-week-number";
import { splitCsv } from "~/lib/mock-client-helpers";

//----------------------------------------------------------------------------------------------------------------------
//
// Stations
//
//----------------------------------------------------------------------------------------------------------------------

const stationsSourceCols = ["code", "departmentCode", "clinicCode", "facilityCode", "name"] as const;

const stationsSource = `AMB;AMB;CDR;RNB;Ambulance
SP;AMB;CDR;RNB;Spánkovka
2A;2AB;CDR;RNB;Stacionář (děti)
2B;2AB;CDR;RNB;2B
2C;2CD;CDR;RNB;2C
2D;2CD;CDR;ENB;2D
3A;3AB;CDR;RNB;3A
3B;3AB;CDR;RNB;3B
3C;3CD;CDR;RNB;3C
3D;3CD;CDR;RNB;3D
4A;4AB;CDR;RNB;4A
4B;4AB;CDR;RNB;4B
4C;4CD;CDR;RNB;4C
4D;4CD;CDR;RNB;4D
5P;5P;CDR;RNB;5P`;

/* eslint-disable perfectionist/sort-object-types */
export type Station = {
  id: string;
  code: string;
  departmentCode: string;
  clinicCode: string;
  facilityCode: string;
  name: string;
};
/* eslint-enable perfectionist/sort-object-types */

export const stations: Station[] = splitCsv(stationsSource, stationsSourceCols).map((cols) => {
  /* eslint-disable perfectionist/sort-objects */
  const item: Station = {
    id: cols.code,
    code: cols.code,
    departmentCode: cols.departmentCode,
    clinicCode: cols.clinicCode,
    facilityCode: cols.facilityCode,
    name: cols.name,
  };
  /* eslint-enable perfectionist/sort-objects */
  return item;
});

function textToStation(text: string): Station {
  const ft = text.trim();
  const station = stations.find((i) => i.code === ft);
  if (!station) {
    throw new Error(`textToStation: Station by text '${text}' not found.`);
  }
  return station;
}

//----------------------------------------------------------------------------------------------------------------------
//
// Employees
//
//----------------------------------------------------------------------------------------------------------------------

const employeesSourceCols = ["code", "firstName", "lastName"] as const;

const employeesSource = `VeronikaLechovská;Veronika;Lechovská
KarolínaŠtípská;Karolína;Štípská
MonikaBublová;Monika;Bublová
JanekSzutkowski;Janek;Szutkowski
TerezaRoznerová;Tereza;Roznerová
PavlínaDvořáková;Pavlína;Dvořáková
DominikaRoztočilová;Dominika;Roztočilová
KašperováPoldaufová;Kašperová;Poldaufová
MagdalénaAndělová;Magdaléna;Andělová
MartinMikula;Martin;Mikula
SimonaMichlEgriová;Simona;Michl Egriová
DorotaCiencialová;Dorota;Ciencialová
TerezaPříhodová;Tereza;Příhodová
MichaelaUlrichová;Michaela;Ulrichová
VáclavHejný;Václav;Hejný
MartinKoryčanský;Martin;Koryčanský
PavlínaHavránková;Pavlína;Havránková
MichaelaMijaAdamová;Michaela Mija;Adamová
PetraHrdličková;Petra;Hrdličková
NellyKalinová;Nelly;Kalinová
MartinaŽovincová;Martina;Žovincová
MelisaSchneiderová;Melisa;Schneiderová
MarinaJermářová;Marina;Jermářová
VlaďkaPlzáková;Vlaďka;Plzáková
KristýnaJosrová;Kristýna;Josrová
AntonínRychtecký;Antonín;Rychtecký
MariePalánová;Marie;Palánová`;

/* eslint-disable perfectionist/sort-object-types */
export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
};
/* eslint-enable perfectionist/sort-object-types */
export const employeesMap: Employee[] = splitCsv(employeesSource, employeesSourceCols).map((cols) => {
  /* eslint-disable perfectionist/sort-objects */
  const item: Employee = {
    id: cols.code,
    firstName: cols.firstName,
    lastName: cols.lastName,
    fullName: `${cols.lastName} ${cols.firstName}`,
  };
  /* eslint-enable perfectionist/sort-objects */
  return item;
});

function textToEmloyee(text: string): Employee {
  const ft = text.trim();
  const emp = employeesMap.find((x) => x.id === ft);
  if (!emp) {
    throw new Error(`textToEmloyee: employee by text '${text}' not found.`);
  }
  return emp;
}

//----------------------------------------------------------------------------------------------------------------------
//
// Program segments
//
//----------------------------------------------------------------------------------------------------------------------

type ProgramSegmentCode = "COMPLEMENTS" | "PSYCHOTHERAPY" | "ZP";

type ProgramSegment = {
  code: ProgramSegmentCode;
  id: string;
  name: string;
};

function textToProgramSegment(text: string): ProgramSegment {
  const v = (text || "").trim();
  if (v === "Komplementy")
    return {
      code: "COMPLEMENTS",
      id: "COMPLEMENTS",
      name: "Komplementy",
    };
  if (v === "Psychoterapie")
    return {
      code: "PSYCHOTHERAPY",
      id: "PSYCHOTHERAPY",
      name: "Psychoterapie",
    };
  return {
    code: "ZP",
    id: "ZP",
    name: "Lékař/sestra",
  };
}

//----------------------------------------------------------------------------------------------------------------------
//
// Program levels
//
//----------------------------------------------------------------------------------------------------------------------

type ProgramLevelCode = "BASIC" | "COMPLEMENT" | "NEUROSTYMULATION" | "PSYCHOTHERAPY";
type ProgramLevel = {
  code: ProgramLevelCode;
  id: string;
  name: string;
};

const textToProgramLevel = (text: string): ProgramLevel => {
  const v = (text || "").trim();
  if (v === "Komplementární terapie")
    return {
      code: "COMPLEMENT",
      id: "COMPLEMENT",
      name: "Komplementární terapie",
    };
  if (v === "Psychoterapie")
    return {
      code: "PSYCHOTHERAPY",
      id: "PSYCHOTHERAPY",
      name: "Psychoterapie",
    };
  if (v === "Neurostimulační terapie")
    return {
      code: "NEUROSTYMULATION",
      id: "NEUROSTYMULATION",
      name: "Neurostimulační terapie",
    };
  if (v === "Základní")
    return {
      code: "BASIC",
      id: "BASIC",
      name: "Základní",
    };

  throw new Error(`textToProgramLevel: Program level '${text}' not found.`);
};

//----------------------------------------------------------------------------------------------------------------------
//
// Competence roles
//
//----------------------------------------------------------------------------------------------------------------------

const competenceRolesSourceCols = ["code", "name"] as const;

const competenceRolesSource = `K1;Psycholog ve zdravotnictví
K2;Psycholog ve zdravotnictví
K3;Klinický psycholog
PT;Psychoterapeut
T;Psychoterapeut
A;Adiktolog
NT;Nutriční terapeut
K;Kaplanka`;

export type CompetenceRoleCode = "A" | "K" | "K1" | "K2" | "K3" | "NT" | "PT" | "T";

/* eslint-disable perfectionist/sort-object-types */
export type CompetenceRole = {
  id: string;
  code: string;
  name: string;
};
/* eslint-enable perfectionist/sort-object-types */
export const competenceRoles: CompetenceRole[] = splitCsv(competenceRolesSource, competenceRolesSourceCols).map(
  (cols) => {
    /* eslint-disable perfectionist/sort-objects */
    const item: CompetenceRole = {
      id: cols.code,
      code: cols.code,
      name: cols.name,
    };
    /* eslint-enable perfectionist/sort-objects */
    return item;
  },
);

function textToCompetenceRole(text: string): CompetenceRole {
  const ft = text.trim();
  const r = competenceRoles.find((i) => i.code === ft);
  if (!r) {
    throw new Error(`textToCompetenceRole: role by text '${text}' not found.`);
  }
  return r;
}
function competenceRoleByCode(code: CompetenceRoleCode): CompetenceRole {
  const r = competenceRoles.find((i) => i.code === code);
  if (!r) {
    throw new Error(`competenceRoleByCode: role by code '${code}' not found.`);
  }
  return r;
}

//----------------------------------------------------------------------------------------------------------------------
//
// Medical procedures
//
//----------------------------------------------------------------------------------------------------------------------

const medicalProceduresSourceCols = ["code", "name"] as const;

const medicalProceduresSource = `Budíček;Budíček
Snídaně;Snídaně
Oběd;Oběd
Večeře;Večeře
Rozcvička;Rozcvička
Vizita s ošetřujícím lékařem;Vizita s ošetřujícím lékařem
Vizita se službu majícím lékařem;Vizita se službu majícím lékařem
Primářská vizita;Primářská vizita
Komunita;Komunita
Aquaterapie;Aquaterapie
Textilní dílna;Textilní dílna
Pletení a háčkování;Pletení a háčkování
Program na oddělení;Program na oddělení
Muzikoterapie;Muzikoterapie
Pohybová terapie;Pohybová terapie
Keramická dílna;Keramická dílna
Tvůrčí činnosti;Tvůrčí činnosti
Individuální volný program;Individuální volný program
Návštěvy;Návštěvy
Výdej ranní medikace;Výdej ranní medikace
Výdej polední medikace;Výdej polední medikace
Výdej večerní medikace;Výdej večerní medikace
Výdej noční medikace;Výdej noční medikace
Relaxace;Relaxace
Večerní komunita/klub;Večerní komunita/klub
Noční klid;Noční klid
IPT;Individuální psychoterapie
SPT;Skupinová psychoterapie
CK1_3;Cílené kognitivní vyšetření 1/3
CK2_3;Cílené kognitivní vyšetření 2/3
CK3_3;Cílené kognitivní vyšetření 3/3
PV1_3;Psychologické vyšetření 1/3
PV2_3;Psychologické vyšetření 2/3
PV3_3;Psychologické vyšetření 3/3
Pohybové hry;Pohybové hry
Ranní předávání informací;Ranní předávání informací
Snídaně, výdej ranní medikace;Snídaně, výdej ranní medikace
Oběd, výdej polední medikace;Oběd, výdej polední medikace
Večeře, výdej večerní medikace;Večeře, výdej večerní medikace
Screening RehaCom;Screening RehaCom
Trénink RehaCom;Trénink RehaCom
Arteterapie;Arteterapie
Schůze týmu oddělení;Schůze týmu oddělení
Psychoedukace;Psychoedukace
Psychoedukace - Co je to ADHD;Psychoedukace - Co je to ADHD
Psychoedukace - Emoční regulace a zvládání stresu;Psychoedukace - Emoční regulace a zvládání stresu
Psychoedukace - Výživa a její vliv na poruchy pozornosti;Psychoedukace - Výživa a její vliv na poruchy pozornosti
Psychoedukace - Farmakoterapeutické možnosti u ADHD;Psychoedukace - Farmakoterapeutické možnosti u ADHD
Psychoedukace - Moderní závislosti a poruchy pozornosti;Psychoedukace - Moderní závislosti a poruchy pozornosti
Psychoedukace - Neurobiologie ADHD;Psychoedukace - Neurobiologie ADHD
Psychoedukace - Závislost na návykových látkách a poruchy pozornosti;Psychoedukace - Závislost na návykových látkách a poruchy pozornosti
Psychoedukace - Spánek a spánková hygiena při ADHD;Psychoedukace - Spánek a spánková hygiena při ADHD
Nutriční edukace;Nutriční edukace
Teatroterapie;Teatroterapie
Pohybové terapie;Pohybové terapie
Filmoterapie;Filmoterapie
Příjem pacientů;Příjem pacientů
Prohlídka budovy CDR;Prohlídka budovy CDR
Aktivizační cvičení;Aktivizační cvičení
Ranní komunita;Ranní komunita
Psychologická diagnostika - Anamnéza;Psychologická diagnostika - Anamnéza
Psychologická diagnostika - WAIS;Psychologická diagnostika - WAIS
Psychologická diagnostika - DIVA;Psychologická diagnostika - DIVA
Psychologická diagnostika - IVA + dotazníky;Psychologická diagnostika - IVA + dotazníky
Podpůrný rozhovor;Podpůrný rozhovor
Krátká porada týmu;Krátká porada týmu
Fitness;Fitness
Reflexe dne;Reflexe dne
Spánková diagnostika;Spánková diagnostika
Pohybová diagnostika - kinesiologický rozbor;Pohybová diagnostika - kinesiologický rozbor
Pohybová diagnostika - Chůze a stabilita;Pohybová diagnostika - Chůze a stabilita
Pohybová diagnostika - Hodnocení jemné motoriky a reakční rychlosti;Pohybová diagnostika - Hodnocení jemné motoriky a reakční rychlosti
Psychoedukace - Chvála pohybu;Psychoedukace - Chvála pohybu
Závěrečný pohovor;Závěrečný pohovor
Odchod pacientů;Odchod pacientů
Fototerapie;Fototerapie
Fyzioterapie;Fyzioterapie
Individuální fitness;Individuální fitness
Aquafitness;Aquafitness
Bazén s plavčíkem;Bazén s plavčíkem
Fyzioterapie skupina;Fyzioterapie skupina
Kulinoterapie;Kulinoterapie
Odpočinek;Odpočinek
Holistické poradenství;Holistické poradenství
Skupinové plavání;Skupinové plavání
Odpolední klub;Odpolední klub
Sauna a bazén;Sauna a bazén
Relaxace se sestrou;Relaxace se sestrou
`;

/* eslint-disable perfectionist/sort-object-types */
export type MedicalProcedure = {
  id: string;
  code: string;
  name: string;
};
/* eslint-enable perfectionist/sort-object-types */
export const medicalProcedures: MedicalProcedure[] = splitCsv(medicalProceduresSource, medicalProceduresSourceCols).map(
  (cols) => {
    /* eslint-disable perfectionist/sort-objects */
    const item: MedicalProcedure = {
      id: cols.code,
      code: cols.code,
      name: cols.name,
    };
    /* eslint-enable perfectionist/sort-objects */
    return item;
  },
);

function textToMedicalProcedure(text: string): MedicalProcedure {
  const ft = text.trim();
  const mp = medicalProcedures.find((i) => i.name === ft);

  if (!mp) {
    throw new Error(`textToMedicalProcedure: Medical procedure by text '${text}' not found.`);
  }

  return mp;
}

//----------------------------------------------------------------------------------------------------------------------
//
// Resources
//
//----------------------------------------------------------------------------------------------------------------------

const resourcesSourceCols = [
  "stationsPrimary",
  "stationsWithContinuity",
  "stationSecondary",
  "stationsNew",
  "_nevim",
  "employeeId",
  "contract",
  "roles",
] as const;

const resourcesSource = `2D,2C;3C;5P,AMB;;4A,4B;VeronikaLechovská;0.8;K1,K2,K3,PT
2D,2C;3C;;;4A,4B;KarolínaŠtípská;1;K1,K2
2D,2C;3C;;;;MonikaBublová;1;K1,NT
2D,2C;3C;5P;;;JanekSzutkowski;0.8;K1,K2,PT
2D,2C;3C;;;;TerezaRoznerová;0.8;PT,A
2D,2C;3C;5P;;;PavlínaDvořáková;0.8;T
2D,2C;3C;;5P;;DominikaRoztočilová;0.5;A,NT
2D,2C;3C;;5P;;KašperováPoldaufová;0.5;K,T
2D,2C;3C;;;;MagdalénaAndělová;0.5;A
3C;2D,2C;;;;MartinMikula;1;K1,K2
3C;2D,2C;2A;;;SimonaMichlEgriová;0.6;T
3C;2D,2C;;;;DorotaCiencialová;0.5;K1,K2
2A;2D,2C;3C;5P;;TerezaPříhodová;1;K1,K2,PT
2A;;SL;;;MichaelaUlrichová;0.8;K1,K2,PT
2A;;AMB;;;VáclavHejný;0.5;K1,K2
2A;;;;;MartinKoryčanský;0.2;
2A;;;;;PavlínaHavránková;0.1;
2A;;;;;MichaelaMijaAdamová;0.5;
4A,4B;;;;;PetraHrdličková;0.5;
3B;;;;;NellyKalinová;0.5;K1,K2
3B;;;;;MartinaŽovincová;1;K1
3B;;;;;MelisaSchneiderová;1;K1,K2
3B;;;;;MarinaJermářová;0.9;
AMB;;2C;;;VlaďkaPlzáková;0.8;K1,K2
AMB;;2D;;;KristýnaJosrová;1;
AMB;;;;;AntonínRychtecký;0.5;
AMB;;;;;MariePalánová;0.8;`;

/* eslint-disable perfectionist/sort-object-types */
export type Resource = {
  id: string;
  stationsPrimaryCodes: string[];
  stationsWithContinuityCodes: string[];
  stationSecondaryCodes: string[];
  stationsNewCodes: string[];
  employee: Employee;
  contract: number;
  competenceRoles: CompetenceRole[];
};
/* eslint-enable perfectionist/sort-object-types */
export const resourcesMap: Resource[] = splitCsv(resourcesSource, resourcesSourceCols).map((cols) => {
  /* eslint-disable perfectionist/sort-objects */
  const item: Resource = {
    id: `resource_${cols.employeeId}`,
    stationsPrimaryCodes: cols.stationsPrimary.split(","),
    stationsWithContinuityCodes: cols.stationsWithContinuity.split(","),
    stationSecondaryCodes: cols.stationSecondary.split(","),
    stationsNewCodes: cols.stationsNew.split(","),
    employee: textToEmloyee(cols.employeeId),
    contract: Number(cols.contract || "0"),
    competenceRoles: cols.roles
      .split(",")
      .map((x) => x.trim())
      .filter((x) => !!x)
      .map((x) => textToCompetenceRole(x)),
  };
  /* eslint-enable perfectionist/sort-objects */
  return item;
});

//----------------------------------------------------------------------------------------------------------------------
//
// Station groups
//
//----------------------------------------------------------------------------------------------------------------------

const stationGroupsSourceCols = ["code", "stationCode", "name"] as const;
const stationGroupsSource = `
2C_A;2C;A
2C_B;2C;B
3C_A;3C;A
3C_B;3C;B
3B_A;3B;A
3B_B;3B;B
4A_P1;4A;P1
4A_P2;4A;P2
4A_P3;4A;P3
4A_P4;4A;P4
4A_P5;4A;P5`;

/* eslint-disable perfectionist/sort-object-types */
type StationGroup = {
  id: string;
  code: string;
  station: Station;
  name: string;
};
/* eslint-enable perfectionist/sort-object-types */

const stationGroups: StationGroup[] = splitCsv(stationGroupsSource, stationGroupsSourceCols).map((cols) => {
  /* eslint-disable perfectionist/sort-objects */
  const item: StationGroup = {
    id: cols.code,
    code: cols.code,
    station: textToStation(cols.stationCode),
    name: cols.name,
  };
  /* eslint-enable perfectionist/sort-objects */

  return item;
});

function textToStationGroup(station: string, text: string): StationGroup {
  const ft = text.trim();
  const r = stationGroups.filter((i) => i.station.id === station).find((i) => i.name === ft);
  if (!r) {
    throw new Error(`textToStationGroup: group by text '${text}' for station '${station}' not found.`);
  }
  return r;
}
function allStationGroups(station: string): StationGroup[] {
  return stationGroups.filter((i) => i.station.id === station);
}
function allStationGroupCount(station: string): number {
  return allStationGroups(station).length;
}

//----------------------------------------------------------------------------------------------------------------------
//
// Station runs
//
//----------------------------------------------------------------------------------------------------------------------

const stationRunsSourceCols = ["code", "stationCode", "name"] as const;
const stationRunsSource = `
2C_1;2C;1. týden
2D_1;2D;1. týden
3C_1;3C;1. týden
3B_1;3B;1. týden
3B_2;3B;2. týden
3B_3;3B;3. týden
3B_4;3B;4. týden
3B_5;3B;5. týden
3B_6;3B;6. týden
4A_1;4A;1. týden
4A_2;4A;2. týden
5P_1;5P;1. týden`;

/* eslint-disable perfectionist/sort-object-types */
type StationRun = {
  id: string;
  station: Station;
  code: string;
  name: string;
};
/* eslint-enable perfectionist/sort-object-types */

const stationRuns: StationRun[] = splitCsv(stationRunsSource, stationRunsSourceCols).map((cols) => {
  /* eslint-disable perfectionist/sort-objects */
  const item: StationRun = {
    id: cols.code,
    station: textToStation(cols.stationCode),
    code: cols.code,
    name: cols.name,
  };
  /* eslint-enable perfectionist/sort-objects */
  return item;
});

function textToStationRun(station: string, text: string): StationRun {
  const ft = text.trim();
  const r = stationRuns.filter((i) => i.station.id === station).find((i) => i.code === ft);
  if (!r) {
    throw new Error(`textToStationRun: station run by text '${text}' for station '${station}' not found.`);
  }
  return r;
}
function allStationRuns(stationId: string): StationRun[] {
  return stationRuns.filter((r) => r.station.id === stationId);
}

/* eslint-disable perfectionist/sort-object-types */
type StationRunPerWeek = {
  id: string;
  station: Station;
  weekNumber: number;
  weekFrom: Date;
  weekTo: Date;
  stationRun: StationRun;
};
/* eslint-enable perfectionist/sort-object-types */

const stationRunsPerWeek: StationRunPerWeek[] = ["2C", "2D", "3C", "3B", "4A", "5P"]
  .map((stationId) => {
    // Firs monday of year
    let monday = dateFirstIsoWeekMonday(2025);
    const runs = allStationRuns(stationId);
    const runsCount = runs.length;

    return Array.from({ length: 52 }, (_, idx) => {
      const nextMonday = dateAddDays(7, monday);
      const r: StationRunPerWeek = {
        id: `${stationId}_${monday.toISOString().slice(0, 10)}`,
        station: textToStation(stationId),
        stationRun: runs[idx % runsCount],
        weekFrom: monday,
        weekNumber: dateWeekNumber(monday),
        weekTo: nextMonday,
      };
      monday = nextMonday;
      return r;
    });
  })
  .flat();

function getStationRunByDate(stationId: string, date: Date): StationRun {
  const runPerweek = stationRunsPerWeek.find(
    (x) => x.station.id === stationId && x.weekFrom <= date && date < x.weekTo,
  );
  if (!runPerweek) {
    throw new Error(`getStationRunByDate: station run per week not defined for '${stationId}' and date '${date}'.`);
  }
  return runPerweek.stationRun;
}

//----------------------------------------------------------------------------------------------------------------------
//
// Program template
//
//----------------------------------------------------------------------------------------------------------------------

const programTemplateSourceCols = [
  "segment",
  "level",
  "station",
  "procedureName",
  "titleNote",
  "group",
  "sharedStations",
  "k1",
  "k2",
  "k3",
  "pt",
  "t",
  "a",
  "nt",
  "k",
  "_informace",
  "runCodes",
  "evenOdd",
  "exactWeek",
  "po",
  "ut",
  "st",
  "ct",
  "pa",
  "so",
  "ne",
  "timeFrom",
  "timeTo",
  "roomName",
  "capacity",
  "_serviceOvner",
  "slotType",
  "shiftInProgramForPatient",
  "shiftInProgramForEmployee",
] as const;

const programTemplateSource = `
Lékař/sestra	Základní	2C	Noční klid													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:20	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2C	Budíček													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	7:20	7:30	Oddělení 2C	22	N/A	Standard	ANO	ANO
Komplementy	Komplementární terapie 	2C	Rozcvička			2D										2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	7:45	8:00	Oddělení 2C	22	ANO	Sdílený	ANO	ANO
Lékař/sestra	Základní	2C	Snídaně													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:00	8:20	Oddělení 2C	22	N/A	Standard	ANO	ANO
Lékař/sestra	Základní	2C	Výdej ranní medikace													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:20	8:45	Oddělení 2C	22	N/A	Standard	ANO	ANO
Lékař/sestra	Základní	2C	Vizita s ošetřujícím lékařem													2C_1			ANO	ANO	NE	ANO	ANO	NE	NE	8:45	9:45	Oddělení 2C	22	N/A	Standard	ANO	ANO
Lékař/sestra	Základní	2C	Vizita se službu majícím lékařem													2C_1			NE	NE	NE	NE	NE	ANO	ANO	8:45	9:45	Oddělení 2C	22	N/A	Standard	ANO	ANO
Lékař/sestra	Základní	2C	Komunita													2C_1			ANO	ANO	NE	ANO	ANO	ANO	ANO	9:45	10:30	Oddělení 2C	22	N/A	Standard	ANO	ANO
Lékař/sestra	Základní	2C	Komunita													2C_1			NE	NE	ANO	NE	NE	NE	NE	8:45	9:00	Oddělení 2C	22	N/A	Standard	ANO	ANO
Komplementy	Komplementární terapie 	2C	Aquaterapie													2C_1			ANO	NE	NE	NE	ANO	ANO	NE	10:30	12:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Textilní dílna													2C_1			ANO	NE	NE	ANO	NE	NE	NE	10:30	12:00	Textilní dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Pletení a háčkování													2C_1			ANO	NE	NE	NE	NE	NE	NE	10:30	12:00	Pletení a háčkování	4	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Program na oddělení													2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Oddělení 2C	15	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Muzikoterapie		A											2C_1			NE	ANO	NE	NE	NE	NE	NE	10:30	12:00	Muzikoterapie	10	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Pohybová terapie													2C_1			NE	ANO	NE	NE	NE	NE	NE	10:30	12:00	Tělocvična	12	ANO	Standard		
Lékař/sestra	Základní	2C	Primářská vizita													2C_1			NE	NE	ANO	NE	NE	NE	NE	9:15	10:30	Oddělení 2C	11	N/A	Standard		
Komplementy	Komplementární terapie 	2C	Aquaterapie		B											2C_1			NE	NE	ANO	NE	NE	NE	NE	9:15	10:30	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Keramická dílna													2C_1			NE	NE	ANO	NE	NE	NE	NE	9:15	10:30	Keramická dílna	8	ANO	Standard		
Lékař/sestra	Základní	2C	Primářská vizita													2C_1			NE	NE	ANO	NE	NE	NE	NE	10:30	12:00	Oddělení 2C	11	N/A	Standard		
Komplementy	Komplementární terapie 	2C	Aquaterapie		A											2C_1			NE	NE	ANO	NE	NE	NE	NE	10:30	12:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Keramická dílna		A											2C_1			NE	NE	ANO	NE	NE	NE	NE	10:30	12:00	Keramická dílna	8	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Pohybová terapie													2C_1			NE	NE	NE	ANO	NE	NE	NE	10:30	12:00	Multifunkční místnost	10	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Muzikoterapie		B											2C_1			NE	NE	NE	ANO	NE	NE	NE	10:30	12:00	Muzikoterapie	10	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Keramická dílna													2C_1			NE	NE	NE	NE	ANO	NE	NE	10:30	12:00	Keramická dílna	8	ANO	Standard		
Komplementy	Komplementární terapie 	2C	Tvůrčí činnosti													2C_1			NE	NE	NE	NE	ANO	NE	NE	10:30	12:00	Pletení a háčkování	6	ANO	Standard		
Psychoterapie	Psychoterapie	2C	Psychologické vyšetření 1/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Psychologické vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Cílené kognitivní vyšetření 1/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Cílené kognitivní vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Lékař/sestra	Základní	2C	Oběd													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:00	12:30	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2C	Výdej polední medikace													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:30	13:00	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2C	Individuální volný program													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	13:00	13:30	Oddělení 2C	22	N/A	Standard		
Psychoterapie	Psychoterapie	2C	Psychologické vyšetření 1/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2C_1			NE	ANO	NE	NE	ANO	NE	NE	13:00	15:30	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Psychologické vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			NE	ANO	NE	NE	ANO	NE	NE	13:00	15:30	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Cílené kognitivní vyšetření 1/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			NE	ANO	NE	NE	ANO	NE	NE	13:00	15:30	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Cílené kognitivní vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			NE	ANO	NE	NE	ANO	NE	NE	13:00	15:30	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2C_1			NE	ANO	NE	NE	ANO	NE	NE	13:30	14:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			NE	ANO	NE	NE	ANO	NE	NE	13:30	14:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2C_1			NE	ANO	NE	NE	ANO	NE	NE	14:15	15:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2C_1			NE	ANO	NE	NE	ANO	NE	NE	14:15	15:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Skupinová psychoterapie		A		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			ANO	NE	ANO	NE	ANO	NE	NE	13:30	15:00		11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	2C	Skupinová psychoterapie		B		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			ANO	NE	ANO	NE	ANO	NE	NE	13:30	15:00		11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	2C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			NE	ANO	NE	NE	ANO	NE	NE	13:30	14:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			NE	ANO	NE	NE	ANO	NE	NE	14:15	15:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			ANO	NE	NE	NE	NE	NE	NE	15:00	15:45	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			ANO	NE	NE	NE	NE	NE	NE	15:45	16:30	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			ANO	ANO	NE	ANO	ANO	NE	NE	15:30	16:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2C_1			ANO	ANO	NE	ANO	ANO	NE	NE	16:15	17:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Lékař/sestra	Základní	2C	Návštěvy													2C_1			NE	NE	ANO	NE	NE	NE	NE	15:00	17:30						
Lékař/sestra	Základní	2C	Individuální volný program													2C_1			ANO	NE	ANO	NE	ANO	NE	NE	15:30	17:00	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2C	Večeře													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	17:30	18:00	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2C	Výdej večerní medikace													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	18:00	18:30	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2C	Relaxace													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	19:45	20:00	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2C	Večerní komunita/klub													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:00	21:00	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2C	Výdej noční medikace													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	21:30	22:00	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2C	Noční klid													2C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	24:00	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2D	Noční klid													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:20	Oddělení 2D	22	N/A	Standard		
Komplementy	Komplementární terapie 	2D	Rozcvička			2C										2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	7:45	8:00	Oddělení 2C	22	ANO	Sdílený		
Lékař/sestra	Základní	2D	Rozcvička	pro Ty, co nemohou z oddělení												2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	7:45	8:00	Oddělení 2D				ANO	ANO
Lékař/sestra	Základní	2D	Snídaně													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:00	8:20	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Výdej ranní medikace													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:20	8:45	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Vizita s ošetřujícím lékařem													2D_1			ANO	ANO	ANO	NE	ANO	NE	NE	8:45	9:45	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Vizita se službu majícím lékařem													2D_1			NE	NE	NE	NE	NE	ANO	ANO	8:45	9:45	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Komunita													2D_1			ANO	ANO	NE	ANO	ANO	ANO	ANO	9:45	10:30	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Komunita													2D_1			NE	NE	ANO	NE	NE	NE	NE	9:00	9:15	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Primářská vizita													2D_1			NE	NE	NE	ANO	NE	NE	NE	9:15	10:30	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Primářská vizita													2D_1			NE	NE	NE	ANO	NE	NE	NE	10:30	12:00	Oddělení 2D	22	N/A	Standard		
Psychoterapie	Psychoterapie	2D	Psychologické vyšetření 1/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2D	Psychologické vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2D	Cílené kognitivní vyšetření 1/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2D	Cílené kognitivní vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2D	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2D	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2D	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2D	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2D	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	2D	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			ANO	ANO	ANO	ANO	ANO	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Komplementy	Komplementární terapie 	2D	Keramická dílna													2D_1			ANO	NE	NE	NE	NE	NE	NE	10:30	12:00	Oddělení 2D	4	ANO	Standard		
Komplementy	Komplementární terapie 	2D	Tvůrčí činnosti 													2D_1			NE	ANO	NE	NE	ANO	NE	NE	10:30	12:00	Oddělení 2D	5	ANO	Standard		
Komplementy	Komplementární terapie 	2D	Pohybové hry													2D_1			NE	NE	ANO	NE	NE	NE	NE	10:30	12:00	Tělocvična	14	ANO	Standard		
Komplementy	Komplementární terapie 	2D	Pletení a háčkování													2D_1			NE	NE	ANO	NE	NE	NE	NE	10:30	12:00	Oddělení 2D	4	ANO	Standard		
Komplementy	Komplementární terapie 	2D	Aquaterapie													2D_1			NE	NE	NE	NE	NE	NE	ANO	10:30	12:00	Bazén	11	ANO	Standard		
Lékař/sestra	Základní	2D	Oběd													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:00	12:30	Oddělení 2C	22	N/A	Standard		
Lékař/sestra	Základní	2D	Výdej polední medikace													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:30	13:00	Oddělení 2C	22	N/A	Standard		
Komplementy	Komplementární terapie 	2D	Aquaterapie													2D_1			NE	ANO	NE	NE	ANO	NE	NE	13:30	14:30	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	2D	Pletení a háčkování													2D_1			NE	ANO	NE	NE	NE	NE	NE	13:30	15:00	Oddělení 2D	4	ANO	Standard		
Komplementy	Komplementární terapie 	2D	Keramická dílna													2D_1			NE	NE	NE	NE	ANO	NE	NE	13:30	15:00	Oddělení 2D	4	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Psychologické vyšetření 1/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2D_1			NE	ANO	NE	NE	ANO	NE	NE	13:00	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Psychologické vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			NE	ANO	NE	NE	ANO	NE	NE	13:00	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Cílené kognitivní vyšetření 1/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			NE	ANO	NE	NE	ANO	NE	NE	13:00	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Cílené kognitivní vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			NE	ANO	NE	NE	ANO	NE	NE	13:00	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2D_1			NE	ANO	NE	NE	ANO	NE	NE	13:30	14:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			NE	ANO	NE	NE	ANO	NE	NE	13:30	14:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		2D_1			NE	ANO	NE	NE	ANO	NE	NE	14:15	15:00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		2D_1			NE	ANO	NE	NE	ANO	NE	NE	14:15	15:00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Skupinová psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2D_1			ANO	NE	NE	NE	ANO	NE	NE	13:30	15:00	virtuální místnosti psychologů	22	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	2D	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2D_1			NE	ANO	NE	NE	ANO	NE	NE	13:30	14:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2D_1			NE	ANO	NE	NE	ANO	NE	NE	14:15	15:00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2D_1			ANO	NE	NE	NE	NE	NE	NE	15:00	15:45	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2D_1			ANO	NE	NE	NE	NE	NE	NE	15:45	16:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2D_1			ANO	ANO	NE	ANO	ANO	NE	NE	15:30	16:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	2D	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		2D_1			ANO	ANO	NE	ANO	ANO	NE	NE	16:15	17:00	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	2D	Návštěvy													2D_1			NE	NE	ANO	NE	NE	NE	NE	14:30	17:30						
Komplementy	Komplementární terapie 	2D	Pohybové hry													2D_1			NE	NE	NE	NE	NE	ANO	NE	15:30	17:00	Tělocvična	14	ANO	Standard		
Lékař/sestra	Základní	2D	Večeře													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	17:30	18:00	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Výdej večerní medikace													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	18:00	18:30	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Relaxace													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	19:45	20:00	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Večerní komunita/klub													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:00	21:00	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Výdej noční medikace													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	21:30	22:00	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	2D	Noční klid													2D_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	24:00	Oddělení 2D	22	N/A	Standard		
Lékař/sestra	Základní	3C	Noční klid													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:20	Oddělení 3C	1	ANO	Standard		
Lékař/sestra	Základní	3C	Budíček													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	7:20	7:30	Oddělení 3C	22	N/A	Standard		
Komplementy	Komplementární terapie 	3C	Rozcvička			3B										3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	7:30	7:45	Tělocvična	22	N/A	Standard		
Lékař/sestra	Základní	3C	Ranní předávání informací													3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	7:45	8:00	Oddělení 3C	22	N/A	Standard		
Lékař/sestra	Základní	3C	Snídaně, výdej ranní medikace													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:00	8:30	Oddělení 3C	22	N/A	Standard		
Lékař/sestra	Základní	3C	Vizita s ošetřujícím lékařem													3C_1			ANO	NE	ANO	ANO	ANO	NE	NE	8:30	9:00	Oddělení 3C	22	N/A	Standard		
Lékař/sestra	Základní	3C	Vizita se službu majícím lékařem													3C_1			NE	NE	NE	NE	NE	ANO	ANO	8:30	9:30	Oddělení 3C	22	N/A	Standard		
Lékař/sestra	Základní	3C	Komunita													3C_1			ANO	NE	ANO	ANO	ANO	ANO	ANO	9:15	10:15	Oddělení 3C	22	N/A	Standard		
Lékař/sestra	Základní	3C	Komunita													3C_1			NE	ANO	NE	NE	NE	NE	NE	8:30	9:00	Oddělení 3C	22	N/A	Standard		
Lékař/sestra	Základní	3C	Komunita													3C_1			NE	NE	NE	NE	NE	ANO	ANO	9:30	10:30	Oddělení 3C	22	N/A	Standard		
Psychoterapie	Psychoterapie	3C	Psychologické vyšetření 1/3				NE	ANO	ANO	NE	NE	NE	NE	NE		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Psychologické vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Cílené kognitivní vyšetření 1/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Cílené kognitivní vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			ANO	ANO	ANO	ANO	ANO	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Sdílený		
Psychoterapie	Psychoterapie	3C	Screening RehaCom													3C_1			ANO	NE	ANO	NE	NE	NE	NE	10:30	11:15	Virtuální realita	1	ANO	Standard		
Psychoterapie	Psychoterapie	3C	Trénink RehaCom													3C_1			ANO	NE	ANO	NE	NE	NE	NE	11:15	12:00	Virtuální realita	4	ANO	Standard		
Komplementy	Komplementární terapie 	3C	Arteterapie		A											3C_1			ANO	NE	NE	NE	NE	NE	NE	10:30	12:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3C	Muzikoterapie		B											3C_1			ANO	NE	NE	NE	NE	NE	NE	10:30	12:00	Muzikoterapie	10	ANO	Standard		
Komplementy	Komplementární terapie 	3C	Arteterapie		B											3C_1			NE	NE	ANO	NE	NE	NE	NE	10:30	12:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3C	Muzikoterapie		A											3C_1			NE	NE	ANO	NE	NE	NE	NE	10:30	12:00	Muzikoterapie	10	ANO	Standard		
Lékař/sestra	Základní	3C	Oběd													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:10	12:30	Oddělení 3C	22				
Lékař/sestra	Základní	3C	Schůze týmu oddělení													3C_1			ANO	NE	ANO	ANO	ANO	NE	NE	12:30	13:00	Oddělení 3C	22				
Lékař/sestra	Základní	3C	Individuální volný program													3C_1			ANO	NE	NE	ANO	ANO	ANO	ANO	12:30	13:30	Oddělení 3C	22				
Lékař/sestra	Základní	3C	Individuální volný program													3C_1			NE	NE	ANO	NE	NE	NE	NE	13:30	15:00	Oddělení 3C	22				
Psychoterapie	Psychoterapie	3C	Psychologické vyšetření 1/3				NE	ANO	ANO	NE	NE	NE	NE	NE		3C_1			NE	ANO	NE	ANO	NE	NE	NE	13:00	15:30	virtuální místnosti psychologů	1				
Psychoterapie	Psychoterapie	3C	Psychologické vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			NE	ANO	NE	ANO	NE	NE	NE	13:00	15:30	virtuální místnosti psychologů	1				
Psychoterapie	Psychoterapie	3C	Cílené kognitivní vyšetření 1/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			NE	ANO	NE	ANO	NE	NE	NE	13:00	15:30	virtuální místnosti psychologů	1				
Psychoterapie	Psychoterapie	3C	Cílené kognitivní vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			NE	ANO	NE	ANO	NE	NE	NE	13:00	15:30	virtuální místnosti psychologů	1				
Psychoterapie	Psychoterapie	3C	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		3C_1			NE	ANO	NE	ANO	NE	NE	NE	13:00	14:15	virtuální místnosti psychologů	1				
Psychoterapie	Psychoterapie	3C	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			NE	ANO	NE	ANO	NE	NE	NE	13:00	14:15	virtuální místnosti psychologů	1				
Psychoterapie	Psychoterapie	3C	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		3C_1			NE	ANO	NE	ANO	NE	NE	NE	14:15	15:00	virtuální místnosti psychologů	1				
Psychoterapie	Psychoterapie	3C	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		3C_1			NE	ANO	NE	ANO	NE	NE	NE	14:15	15:00	virtuální místnosti psychologů	1				
Psychoterapie	Psychoterapie	3C	Skupinová psychoterapie		A		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		3C_1			ANO	NE	NE	ANO	NE	NE	NE	13:30	15:00	Skupinová psychoterapie - A	11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3C	Skupinová psychoterapie		B		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		3C_1			ANO	NE	NE	ANO	NE	NE	NE	13:30	15:00	Skupinová psychoterapie - B	11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3C	Screening RehaCom													3C_1			NE	ANO	NE	NE	NE	NE	NE	13:30	15:00	Virtuální realita	1				
Psychoterapie	Psychoterapie	3C	Trénink RehaCom													3C_1			NE	ANO	NE	NE	NE	NE	NE	13:30	15:00	Virtuální realita	4				
Psychoterapie	Psychoterapie	3C	Psychoedukace							ANO	ANO				vyskytuje je pouze lichý týden	3C_1	L		NE	NE	ANO	NE	NE	NE	NE	13:30	15:00	Skupinová psychoterapie - B	22	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3C	Nutriční edukace							ANO			ANO		vyskytuje je pouze sudý týden	3C_1	S		NE	NE	ANO	NE	NE	NE	NE	13:30	15:00	Skupinová psychoterapie - B	22	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3C	Skupinová psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		3C_1			NE	NE	NE	NE	ANO	NE	NE	13:30	15:00	Skupinová psychoterapie - B	22	ANO	2 terapeuti/1 slot		
Lékař/sestra	Základní	3C	Návštěvy													3C_1			NE	NE	ANO	NE	NE	NE	NE	15:00	17:30	Oddělení 3C	22	N/A	Standard		
Komplementy	Komplementární terapie 	3C	Pohybové hry													3C_1			ANO	NE	NE	NE	NE	NE	NE	16:00	17:00	Tělocvična	12	ANO	Standard		
Komplementy	Komplementární terapie 	3C	Keramická dílna													3C_1			ANO	NE	NE	NE	NE	NE	NE	15:30	17:00	Keramická dílna	8	ANO	Standard		
Komplementy	Komplementární terapie 	3C	Aquaterapie													3C_1			NE	ANO	NE	ANO	NE	ANO	ANO	16:00	17:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3C	Teatroterapie													3C_1			ANO	NE	NE	NE	ANO	NE	NE	15:30	17:00	Kinosál	10	ANO	Standard		
Komplementy	Komplementární terapie 	3C	Pohybové terapie													3C_1			NE	NE	NE	ANO	NE	NE	NE	16:00	17:00	Multifunkční místnost	10	ANO	Standard		
Komplementy	Komplementární terapie 	3C	Filmoterapie												vyskytuje se 1.týden v sobotu	3C_1		1	NE	NE	NE	NE	NE	ANO	NE	15:30	17:30	Kinosál	22	ANO	Standard		
Psychoterapie	Psychoterapie	3C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		3C_1			ANO	NE	NE	NE	NE	NE	NE	15:00	15:45	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		3C_1			ANO	NE	NE	NE	NE	NE	NE	15:45	16:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		3C_1			ANO	ANO	NE	ANO	ANO	NE	NE	15:30	16:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3C	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		3C_1			ANO	ANO	NE	ANO	ANO	NE	NE	16:15	17:00	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3C	Večeře, výdej večerní medikace													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	17:30	18:00	Oddělení 3C	1	ANO	Standard		
Lékař/sestra	Základní	3C	Individuální volný program													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	18:00	19:30	Oddělení 3C	1	ANO	Standard		
Lékař/sestra	Základní	3C	Relaxace													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	19:45	20:00	Oddělení 3C	1	ANO	Standard		
Lékař/sestra	Základní	3C	Večerní komunita/klub													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:00	21:00	Oddělení 3C	1	ANO	Standard		
Lékař/sestra	Základní	3C	Výdej noční medikace													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	21:30	22:00	Oddělení 3C	1	ANO	Standard		
Lékař/sestra	Základní	3C	Noční klid													3C_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	24:00	Oddělení 3C	1	ANO	Standard		
Lékař/sestra	Základní	3B	Noční klid												1.týden	3B_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:20	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Budíček												1.týden	3B_1			NE	ANO	ANO	ANO	ANO	ANO	ANO	7:20	7:30	Oddělení 3B	18	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Rozcvička			3C									1.týden	3B_1			NE	ANO	ANO	ANO	ANO	NE	NE	7:30	7:45	Tělocvična	20	ANO	Standard		
Lékař/sestra	Základní	3B	Příjem pacientů												1.týden	3B_1			ANO	NE	NE	NE	NE	NE	NE	8:00	15:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Příjem pacientů												1.týden	3B_1			NE	ANO	NE	NE	NE	NE	NE	8:00	13:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Snídaně												1.týden	3B_1			NE	ANO	ANO	ANO	ANO	ANO	ANO	8:00	8:15	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej ranní medikace												1.týden	3B_1			NE	ANO	ANO	ANO	ANO	ANO	ANO	8:15	8:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita s ošetřujícím lékařem												1.týden	3B_1			NE	ANO	ANO	ANO	ANO	NE	NE	8:30	9:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita se službu majícím lékařem												1.týden	3B_1			NE	NE	NE	NE	NE	ANO	ANO	8:30	9:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												1.týden	3B_1			NE	NE	ANO	ANO	ANO	NE	NE	9:00	10:15	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												1.týden	3B_1			NE	NE	NE	NE	NE	ANO	ANO	9:30	10:30	Oddělení 3B	18	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	1.týden	3B_1			NE	NE	ANO	NE	NE	NE	NE	10:30	12:00	Skupinová psychoterapie - A	18	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		A		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	1.týden	3B_1			NE	NE	NE	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - A	11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		B		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	1.týden	3B_1			NE	NE	NE	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - B	11	ANO	2 terapeuti/1 slot		
Lékař/sestra	Základní	3B	Oběd												1.týden	3B_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:00	12:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												1.týden	3B_1			NE	ANO	NE	NE	NE	NE	NE	12:30	13:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Schůze týmu oddělení												1.týden	3B_1			NE	NE	ANO	ANO	ANO	NE	NE	12:00	12:30	Oddělení 3B					
Lékař/sestra	Základní	3B	Primářská vizita												1.týden	3B_1			NE	NE	ANO	NE	NE	NE	NE	12:30	14:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Primářská vizita												1.týden	3B_1			NE	NE	ANO	NE	NE	NE	NE	14:00	15:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												1.týden	3B_1			NE	ANO	NE	NE	NE	NE	NE	13:00	14:30	Oddělení 3B	18	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		A										1.týden	3B_1			NE	NE	NE	ANO	NE	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		B										1.týden	3B_1			NE	NE	NE	NE	ANO	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												1.týden	3B_1			NE	NE	NE	NE	NE	ANO	ANO	13:30	15:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybová terapie		B										1.týden	3B_1			NE	NE	NE	ANO	NE	NE	NE	13:45	14:45	Jógová místnost	10				
Komplementy	Komplementární terapie 	3B	Pohybová terapie		A										1.týden	3B_1			NE	NE	NE	NE	ANO	NE	NE	13:45	14:45	Jógová místnost	10				
Lékař/sestra	Základní	3B	Prohlídka budovy CDR												1.týden	3B_1			ANO	NE	NE	NE	NE	NE	NE	15:30	17:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Návštěvy												1.týden	3B_1			NE	NE	ANO	NE	NE	NE	NE	15:30	17:30	Oddělení 3B	18	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												1.týden	3B_1			NE	NE	ANO	NE	ANO	NE	NE	15:30	17:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												1.týden	3B_1			NE	NE	NE	ANO	NE	NE	NE	15:30	17:00	Japonský stacionář	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Textilní dílna												1.týden	3B_1			NE	NE	NE	ANO	NE	NE	NE	15:30	17:00	Textilní dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybové hry												1.týden	3B_1			NE	NE	NE	ANO	NE	NE	NE	15:30	17:00	Tělocvična	14	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Muzikoterapie		A										1.týden	3B_1			NE	NE	NE	NE	ANO	NE	NE	15:30	17:00	Muzikoterapie	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Keramická dílna												1.týden	3B_1			NE	NE	NE	NE	ANO	NE	NE	15:30	17:00	Keramická dílna	8	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Filmoterapie												1.týden	3B_1		1	NE	NE	NE	NE	NE	ANO	NE	15:30	17:30	Kinosál	18	ANO	Standard		
Lékař/sestra	Základní	3B	Prohlídka budovy CDR												1.týden	3B_1			NE	ANO	NE	NE	NE	NE	NE	16:00	17:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												1.týden	3B_1			ANO	NE	NE	NE	NE	NE	NE	17:00	17:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Večeře, výdej večerní medikace												1.týden	3B_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	17:30	18:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												1.týden	3B_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	18:00	19:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Relaxace												1.týden	3B_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	19:45	20:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Večerní komunita/klub												1.týden	3B_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:00	21:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej noční medikace												1.týden	3B_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	21:30	22:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Noční klid												1.týden	3B_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	24:00	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Noční klid												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:20	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Budíček												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	7:20	7:30	Oddělení 3B	18	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Rozcvička			3C									2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	NE	NE	7:30	7:45	Tělocvična	20	ANO	Standard		
Lékař/sestra	Základní	3B	Snídaně												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:00	8:15	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej ranní medikace												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:15	8:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita s ošetřujícím lékařem												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	NE	NE	8:30	9:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita se službu majícím lékařem												2.týden	3B_2			NE	NE	NE	NE	NE	ANO	ANO	8:30	9:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	NE	NE	9:00	10:15	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												2.týden	3B_2			NE	NE	NE	NE	NE	ANO	ANO	9:30	10:30	Oddělení 3B	18	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		A		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - A	11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		B		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - B	11	ANO	2 terapeuti/1 slot		
Lékař/sestra	Základní	3B	Oběd												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:00	12:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												2.týden	3B_2			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:30	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Schůze týmu oddělení												2.týden	3B_2			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:00	Oddělení 3B					
Lékař/sestra	Základní	3B	Primářská vizita												2.týden	3B_2			NE	NE	ANO	NE	NE	NE	NE	12:30	14:00	Oddělení 3B	18	N/A	Standard		
Lékař/sestra	Základní	3B	Primářská vizita												2.týden	3B_2			NE	NE	ANO	NE	NE	NE	NE	14:00	15:30	Oddělení 3B	18	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	2.týden	3B_2			ANO	ANO	NE	ANO	ANO	NE	NE	12:45	13:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	2.týden	3B_2			NE	NE	ANO	NE	NE	NE	NE	12:30	13:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	2.týden	3B_2			NE	NE	ANO	NE	NE	NE	NE	13:15	14:00	virtuální místnosti psychologů	1	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		A										2.týden	3B_2			ANO	NE	NE	ANO	NE	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		B										2.týden	3B_2			NE	ANO	NE	NE	ANO	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												2.týden	3B_2			NE	NE	NE	NE	NE	ANO	ANO	13:30	15:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybová terapie		B										2.týden	3B_2			ANO	NE	NE	ANO	NE	NE	NE	13:45	14:45	Jógová místnost	10				
Komplementy	Komplementární terapie 	3B	Pohybová terapie		A										2.týden	3B_2			NE	ANO	NE	NE	ANO	NE	NE	13:45	14:45	Jógová místnost	10				
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	2.týden	3B_2			NE	NE	ANO	NE	NE	NE	NE	14:00	14:45	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	2.týden	3B_2			NE	NE	ANO	NE	NE	NE	NE	14:45	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Návštěvy												2.týden	3B_2			NE	NE	ANO	NE	NE	NE	NE	15:00	17:30	Oddělení 3B	18	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												2.týden	3B_2			ANO	NE	ANO	NE	ANO	NE	NE	15:30	17:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												2.týden	3B_2			ANO	NE	NE	NE	NE	NE	NE	15:30	17:00	Kinosál	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												2.týden	3B_2			NE	NE	NE	ANO	NE	NE	NE	15:30	17:00	Japonský stacionář	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Textilní dílna												2.týden	3B_2			ANO	NE	NE	ANO	NE	NE	NE	15:30	17:00	Textilní dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybové hry												2.týden	3B_2			NE	ANO	NE	ANO	NE	NE	NE	15:30	17:00	Tělocvična	14	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Muzikoterapie		B										2.týden	3B_2			NE	ANO	NE	NE	ANO	NE	NE	15:30	17:00	Muzikoterapie	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Keramická dílna												2.týden	3B_2			NE	ANO	NE	NE	ANO	NE	NE	15:30	17:00	Keramická dílna	8	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	NE	NE	15:30	16:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	2.týden	3B_2			NE	NE	NE	NE	ANO	NE	NE	16:15	17:00	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Večeře, výdej večerní medikace												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	17:30	18:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	18:00	19:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Relaxace												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	19:45	20:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Večerní komunita/klub												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:00	21:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej noční medikace												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	21:30	22:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Noční klid												2.týden	3B_2			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	24:00	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Noční klid												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:20	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Budíček												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	7:20	7:30	Oddělení 3B	20	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Rozcvička			3C									3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	NE	NE	7:30	7:45	Tělocvična	20	ANO	Standard		
Lékař/sestra	Základní	3B	Snídaně												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:00	8:15	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej ranní medikace												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:15	8:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita s ošetřujícím lékařem												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	NE	NE	8:30	9:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita se službu majícím lékařem												3.týden	3B_3			NE	NE	NE	NE	NE	ANO	ANO	8:30	9:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	NE	NE	9:00	10:15	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												3.týden	3B_3			NE	NE	NE	NE	NE	ANO	ANO	9:30	10:30	Oddělení 3B	20	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		A		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - A	11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		B		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - B	11	ANO	2 terapeuti/1 slot		
Lékař/sestra	Základní	3B	Oběd												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:00	12:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												3.týden	3B_3			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Schůze týmu oddělení												3.týden	3B_3			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:00	Oddělení 3B	20				
Lékař/sestra	Základní	3B	Primářská vizita												3.týden	3B_3			NE	NE	ANO	NE	NE	NE	NE	12:30	14:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Primářská vizita												3.týden	3B_3			NE	NE	ANO	NE	NE	NE	NE	14:00	15:30	Oddělení 3B	20	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	3.týden	3B_3			ANO	ANO	NE	ANO	ANO	NE	NE	12:45	13:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	3.týden	3B_3			NE	NE	ANO	NE	NE	NE	NE	12:30	13:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	3.týden	3B_3			NE	NE	ANO	NE	NE	NE	NE	13:15	14:00	virtuální místnosti psychologů	1	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		A										3.týden	3B_3			ANO	NE	NE	ANO	NE	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		B										3.týden	3B_3			NE	ANO	NE	NE	ANO	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												3.týden	3B_3			NE	NE	NE	NE	NE	ANO	ANO	13:30	15:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybová terapie		B										3.týden	3B_3			ANO	NE	NE	ANO	NE	NE	NE	13:45	14:45	Jógová místnost	10				
Komplementy	Komplementární terapie 	3B	Pohybová terapie		A										3.týden	3B_3			NE	ANO	NE	NE	ANO	NE	NE	13:45	14:45	Jógová místnost	10				
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	3.týden	3B_3			NE	NE	ANO	NE	NE	NE	NE	14:00	14:45	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	3.týden	3B_3			NE	NE	ANO	NE	NE	NE	NE	14:45	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Návštěvy												3.týden	3B_3			NE	NE	ANO	NE	NE	NE	NE	15:00	17:30	Oddělení 3B	20	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												3.týden	3B_3			ANO	NE	ANO	NE	ANO	NE	NE	15:30	17:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												3.týden	3B_3			ANO	NE	NE	NE	NE	NE	NE	15:30	17:00	Kinosál	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												3.týden	3B_3			NE	NE	NE	ANO	NE	NE	NE	15:30	17:00	Japonský stacionář	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Textilní dílna												3.týden	3B_3			ANO	NE	NE	ANO	NE	NE	NE	15:30	17:00	Textilní dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybové hry												3.týden	3B_3			NE	ANO	NE	ANO	NE	NE	NE	15:30	17:00	Tělocvična	14	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Muzikoterapie		A										3.týden	3B_3			NE	ANO	NE	NE	ANO	NE	NE	15:30	17:00	Muzikoterapie	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Keramická dílna												3.týden	3B_3			NE	ANO	NE	NE	ANO	NE	NE	15:30	17:00	Keramická dílna	8	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	NE	NE	15:30	16:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	3.týden	3B_3			NE	NE	NE	NE	ANO	NE	NE	16:15	17:00	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Večeře, výdej večerní medikace												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	17:30	18:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	18:00	19:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Relaxace												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	19:45	20:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Večerní komunita/klub												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:00	21:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej noční medikace												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	21:30	22:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Noční klid												3.týden	3B_3			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	24:00	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Noční klid												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:20	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Budíček												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	7:20	7:30	Oddělení 3B	20	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Rozcvička			3C									4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	NE	NE	7:30	7:45	Tělocvična	20	ANO	Standard		
Lékař/sestra	Základní	3B	Snídaně												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:00	8:15	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej ranní medikace												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:15	8:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita s ošetřujícím lékařem												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	NE	NE	8:30	9:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita se službu majícím lékařem												4.týden	3B_4			NE	NE	NE	NE	NE	ANO	ANO	8:30	9:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	NE	NE	9:00	10:15	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												4.týden	3B_4			NE	NE	NE	NE	NE	ANO	ANO	9:30	10:30	Oddělení 3B	20	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		A		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - A	11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		B		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - B	11	ANO	2 terapeuti/1 slot		
Lékař/sestra	Základní	3B	Oběd												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:00	12:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												4.týden	3B_4			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Schůze týmu oddělení												4.týden	3B_4			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:00	Oddělení 3B					
Lékař/sestra	Základní	3B	Primářská vizita												4.týden	3B_4			NE	NE	ANO	NE	NE	NE	NE	12:30	14:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Primářská vizita												4.týden	3B_4			NE	NE	ANO	NE	NE	NE	NE	14:00	15:30	Oddělení 3B	20	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	4.týden	3B_4			ANO	ANO	NE	ANO	ANO	NE	NE	12:45	13:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	4.týden	3B_4			NE	NE	ANO	NE	NE	NE	NE	12:30	13:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	4.týden	3B_4			NE	NE	ANO	NE	NE	NE	NE	13:15	14:00	virtuální místnosti psychologů	1	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		A										4.týden	3B_4			ANO	NE	NE	ANO	NE	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		B										4.týden	3B_4			NE	ANO	NE	NE	ANO	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												4.týden	3B_4			NE	NE	NE	NE	NE	ANO	ANO	13:30	15:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybová terapie		B										4.týden	3B_4			ANO	NE	NE	ANO	NE	NE	NE	13:45	14:45	Jógová místnost	10				
Komplementy	Komplementární terapie 	3B	Pohybová terapie		A										4.týden	3B_4			NE	ANO	NE	NE	ANO	NE	NE	13:45	14:45	Jógová místnost	10				
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	4.týden	3B_4			NE	NE	ANO	NE	NE	NE	NE	14:00	14:45	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	4.týden	3B_4			NE	NE	ANO	NE	NE	NE	NE	14:45	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Návštěvy												4.týden	3B_4			NE	NE	ANO	NE	NE	NE	NE	15:00	17:30	Oddělení 3B	20	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												4.týden	3B_4			ANO	NE	ANO	NE	ANO	NE	NE	15:30	17:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												4.týden	3B_4			ANO	NE	NE	NE	NE	NE	NE	15:30	17:00	Kinosál	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												4.týden	3B_4			NE	NE	NE	ANO	NE	NE	NE	15:30	17:00	Japonský stacionář	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Textilní dílna												4.týden	3B_4			ANO	NE	NE	ANO	NE	NE	NE	15:30	17:00	Textilní dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybové hry												4.týden	3B_4			NE	ANO	NE	ANO	NE	NE	NE	15:30	17:00	Tělocvična	14	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Muzikoterapie		B										4.týden	3B_4			NE	ANO	NE	NE	ANO	NE	NE	15:30	17:00	Muzikoterapie	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Keramická dílna												4.týden	3B_4			NE	ANO	NE	NE	ANO	NE	NE	15:30	17:00	Keramická dílna	8	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	NE	NE	15:30	16:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	4.týden	3B_4			NE	NE	NE	NE	ANO	NE	NE	16:15	17:00	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Večeře, výdej večerní medikace												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	17:30	18:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	18:00	19:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Relaxace												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	19:45	20:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Večerní komunita/klub												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:00	21:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej noční medikace												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	21:30	22:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Noční klid												4.týden	3B_4			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	24:00	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Noční klid												5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:20	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Budíček												5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	NE	NE	7:20	7:30	Oddělení 3B	20	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Rozcvička			3C									5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	NE	NE	7:30	7:45	Tělocvična	20	ANO	Standard		
Lékař/sestra	Základní	3B	Snídaně												5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	NE	NE	8:00	8:15	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej ranní medikace												5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	NE	NE	8:15	8:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita s ošetřujícím lékařem												5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	NE	NE	8:30	9:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	NE	NE	9:00	10:15	Oddělení 3B	20	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		A		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - A	11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		B		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - B	11	ANO	2 terapeuti/1 slot		
Lékař/sestra	Základní	3B	Oběd												5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	NE	NE	12:00	12:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												5.týden	3B_5			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Schůze týmu oddělení												5.týden	3B_5			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:00	Oddělení 3B					
Lékař/sestra	Základní	3B	Primářská vizita												5.týden	3B_5			NE	NE	ANO	NE	NE	NE	NE	12:30	14:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Primářská vizita												5.týden	3B_5			NE	NE	ANO	NE	NE	NE	NE	14:00	15:30	Oddělení 3B	20	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	5.týden	3B_5			ANO	ANO	NE	ANO	NE	NE	NE	12:45	13:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	5.týden	3B_5			NE	NE	ANO	NE	NE	NE	NE	12:30	13:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	5.týden	3B_5			NE	NE	ANO	NE	NE	NE	NE	13:15	14:00	virtuální místnosti psychologů	1	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		A										5.týden	3B_5			ANO	NE	NE	ANO	NE	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		B										5.týden	3B_5			NE	ANO	NE	NE	NE	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybová terapie		B										5.týden	3B_5			ANO	NE	NE	ANO	NE	NE	NE	13:45	14:45	Jógová místnost	10				
Komplementy	Komplementární terapie 	3B	Pohybová terapie		A										5.týden	3B_5			NE	ANO	NE	NE	NE	NE	NE	13:45	14:45	Jógová místnost	10				
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	5.týden	3B_5			NE	NE	ANO	NE	NE	NE	NE	14:00	14:45	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	5.týden	3B_5			NE	NE	ANO	NE	NE	NE	NE	14:45	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Návštěvy												5.týden	3B_5			NE	NE	ANO	NE	NE	NE	NE	15:00	17:30	Oddělení 3B	20	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												5.týden	3B_5			ANO	NE	ANO	NE	NE	NE	NE	15:30	17:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												5.týden	3B_5			ANO	NE	NE	NE	NE	NE	NE	15:30	17:00	Kinosál	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												5.týden	3B_5			NE	NE	NE	ANO	NE	NE	NE	15:30	17:00	Japonský stacionář	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Textilní dílna												5.týden	3B_5			ANO	NE	NE	ANO	NE	NE	NE	15:30	17:00	Textilní dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybové hry												5.týden	3B_5			NE	ANO	NE	ANO	NE	NE	NE	15:30	17:00	Tělocvična	14	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Muzikoterapie		A										5.týden	3B_5			NE	ANO	NE	NE	NE	NE	NE	15:30	17:00	Muzikoterapie	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Keramická dílna												5.týden	3B_5			NE	ANO	NE	NE	NE	NE	NE	15:30	17:00	Keramická dílna	8	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	5.týden	3B_5			ANO	ANO	ANO	ANO	NE	NE	NE	15:30	16:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	5.týden	3B_5			NE	NE	NE	NE	NE	NE	NE	16:15	17:00	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Večeře, výdej večerní medikace												5.týden	3B_5			ANO	ANO	ANO	ANO	NE	NE	NE	17:30	18:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												5.týden	3B_5			ANO	ANO	ANO	ANO	NE	NE	NE	18:00	19:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Relaxace												5.týden	3B_5			ANO	ANO	ANO	ANO	NE	NE	NE	19:45	20:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Večerní komunita/klub												5.týden	3B_5			ANO	ANO	ANO	ANO	NE	NE	NE	20:00	21:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej noční medikace												5.týden	3B_5			ANO	ANO	ANO	ANO	NE	NE	NE	21:30	22:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Noční klid												5.týden	3B_5			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	24:00	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Noční klid												6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	0:00	7:20	Oddělení 3B	1	ANO	Standard		
Lékař/sestra	Základní	3B	Budíček												6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	7:20	7:30	Oddělení 3B	20	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Rozcvička			3C									6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	7:30	7:45	Tělocvična	20	ANO	Standard		
Lékař/sestra	Základní	3B	Snídaně												6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	8:00	8:15	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej ranní medikace												6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	8:15	8:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Vizita s ošetřujícím lékařem												6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	8:30	9:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Komunita												6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	9:00	10:15	Oddělení 3B	20	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		A		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - A	11	ANO	2 terapeuti/1 slot		
Psychoterapie	Psychoterapie	3B	Skupinová psychoterapie		B		ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	10:30	12:00	Skupinová psychoterapie - B	11	ANO	2 terapeuti/1 slot		
Lékař/sestra	Základní	3B	Oběd												6.týden	3B_6			ANO	ANO	ANO	ANO	ANO	NE	NE	12:00	12:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												6.týden	3B_6			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Schůze týmu oddělení												6.týden	3B_6			ANO	ANO	NE	ANO	ANO	NE	NE	12:30	13:00	Oddělení 3B					
Lékař/sestra	Základní	3B	Primářská vizita												6.týden	3B_6			NE	NE	ANO	NE	NE	NE	NE	12:30	14:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Primářská vizita												6.týden	3B_6			NE	NE	ANO	NE	NE	NE	NE	14:00	15:30	Oddělení 3B	20	N/A	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	6.týden	3B_6			ANO	ANO	NE	ANO	NE	NE	NE	12:45	13:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	6.týden	3B_6			NE	NE	ANO	NE	NE	NE	NE	12:30	13:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	6.týden	3B_6			NE	NE	ANO	NE	NE	NE	NE	13:15	14:00	virtuální místnosti psychologů	1	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		A										6.týden	3B_6			ANO	NE	NE	ANO	NE	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Arteterapie		B										6.týden	3B_6			NE	ANO	NE	NE	NE	NE	NE	13:30	15:00	Arteateliér	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybová terapie		B										6.týden	3B_6			ANO	NE	NE	ANO	NE	NE	NE	13:45	14:45	Jógová místnost	10				
Komplementy	Komplementární terapie 	3B	Pohybová terapie		A										6.týden	3B_6			NE	ANO	NE	NE	NE	NE	NE	13:45	14:45	Jógová místnost	10				
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	6.týden	3B_6			NE	NE	ANO	NE	NE	NE	NE	14:00	14:45	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	6.týden	3B_6			NE	NE	ANO	NE	NE	NE	NE	14:45	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Návštěvy												6.týden	3B_6			NE	NE	ANO	NE	NE	NE	NE	15:00	17:30	Oddělení 3B	20	N/A	Standard		
Komplementy	Komplementární terapie 	3B	Aquaterapie												6.týden	3B_6			ANO	NE	ANO	NE	NE	NE	NE	15:30	17:00	Bazén	11	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie 												6.týden	3B_6			ANO	NE	NE	NE	NE	NE	NE	15:30	17:00	Kinosál	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Teatroterapie												6.týden	3B_6			NE	NE	NE	ANO	NE	NE	NE	15:30	17:00	Japonský stacionář	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Textilní dílna												6.týden	3B_6			ANO	NE	NE	ANO	NE	NE	NE	15:30	17:00	Textilní dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Pohybové hry												6.týden	3B_6			NE	ANO	NE	ANO	NE	NE	NE	15:30	17:00	Tělocvična	14	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Muzikoterapie		B										6.týden	3B_6			NE	ANO	NE	NE	NE	NE	NE	15:30	17:00	Muzikoterapie	10	ANO	Standard		
Komplementy	Komplementární terapie 	3B	Keramická dílna												6.týden	3B_6			NE	ANO	NE	NE	NE	NE	NE	15:30	17:00	Keramická dílna	8	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	6.týden	3B_6			ANO	ANO	ANO	ANO	NE	NE	NE	15:30	16:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	3B	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	6.týden	3B_6			NE	NE	NE	NE	NE	NE	NE	16:15	17:00	virtuální místnosti psychologů	1	ANO	Standard		
Lékař/sestra	Základní	3B	Večeře, výdej večerní medikace												6.týden	3B_6			ANO	ANO	ANO	ANO	NE	NE	NE	17:30	18:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Individuální volný program												6.týden	3B_6			ANO	ANO	ANO	ANO	NE	NE	NE	18:00	19:30	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Relaxace												6.týden	3B_6			ANO	ANO	ANO	ANO	NE	NE	NE	19:45	20:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Večerní komunita/klub												6.týden	3B_6			ANO	ANO	ANO	ANO	NE	NE	NE	20:00	21:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Výdej noční medikace												6.týden	3B_6			ANO	ANO	ANO	ANO	NE	NE	NE	21:30	22:00	Oddělení 3B	20	N/A	Standard		
Lékař/sestra	Základní	3B	Noční klid												6.týden	3B_6			ANO	ANO	ANO	ANO	NE	NE	NE	22:00	24:00	Oddělení 4A	10	ANO	Standard		
Lékař/sestra	Základní	4A	Noční klid												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:20	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Schůze týmu oddělení												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	NE	NE	NE	NE	NE	8:30	9:00	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Příjem pacientů												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	NE	NE	NE	NE	NE	9:00	13:00	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Budíček												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	ANO	ANO	ANO	ANO	ANO	7:20	7:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Aktivizační cvičení												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	ANO	ANO	ANO	ANO	ANO	7:30	7:45	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Snídaně												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	ANO	ANO	ANO	ANO	ANO	7:45	8:15	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Ranní komunita												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	ANO	ANO	ANO	ANO	ANO	8:15	8:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Výdej ranní medikace												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	ANO	ANO	ANO	ANO	ANO	8:30	8:45	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Vizita s ošetřujícím lékařem												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	ANO	ANO	ANO	NE	NE	8:45	10:00	Oddělení 4A	10	N/A	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - Anamnéza		P4										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	NE	NE	NE	NE	NE	9:00	11:00	Oddělení 4A - pokoj č.4	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - WAIS		P2										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	ANO	NE	NE	NE	NE	9:00	11:30	Společenská místnost - pokoj č. 11	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - WAIS		P4										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	ANO	NE	NE	NE	9:00	11:30	Společenská místnost - pokoj č. 11	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - WAIS		P3										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	NE	ANO	NE	NE	9:00	11:30	Společenská místnost - pokoj č. 11	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - Anamnéza		P3										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	NE	NE	NE	NE	NE	9:00	11:00	Oddělení 4A - pokoj č.3	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - DIVA		P5										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	ANO	NE	NE	NE	NE	9:00	11:00	Oddělení 4A -pokoj č.5	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - WAIS		P5										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	ANO	NE	NE	NE	9:00	11:30	Oddělení 4A - Hovorna	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - WAIS		P1										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	NE	ANO	NE	NE	9:00	11:30	Oddělení 4A - Hovorna	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - Anamnéza		P5										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	NE	NE	NE	NE	NE	9:00	11:00	Oddělení 4A- pokoj č.5	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - IVA + dotazníky		P1										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	ANO	NE	NE	NE	NE	9:00	11:00	Oddělení 4A- pokoj č.1	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Muzikoterapie												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	ANO	NE	NE	NE	9:00	10:00	Muzikoterapie	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - DIVA		P1										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	NE	NE	NE	NE	NE	10:30	12:30	Oddělení 4A- pokoj č.1	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - Anamnéza		P1										1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	NE	NE	NE	NE	NE	11:00	13:00	Oddělení 4A- pokoj č.1	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - DIVA		P2										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	NE	NE	NE	NE	NE	11:00	13:00	Oddělení 4A- pokoj č.2	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - IVA + dotazníky		P3										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	ANO	NE	NE	NE	NE	11:00	13:00	Oddělení 4A- pokoj č.3	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Podpůrný rozhovor		P2										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	ANO	NE	NE	NE	10:30	11:00	Oddělení 4A - pokoj č.2	1	ANO	Standard		
Lékař/sestra	Základní	4A	Krátká porada týmu												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	ANO	NE	ANO	NE	NE	10:00	10:30	Oddělení 4A		ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - Anamnéza		P2										1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	NE	NE	NE	NE	NE	11:00	13:00	Oddělení 4A - pokoj č.2	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - DIVA		P3										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	ANO	NE	NE	NE	11:45	13:15	Oddělení 4A- pokoj č.3	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - IVA + dotazníky		P4										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	NE	ANO	NE	NE	12:00	14:30	Oddělení 4A- pokoj č.4	1	ANO	Standard		
Lékař/sestra	Základní	4A	Oběd, výdej polední medikace												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	11:30	13:30	Oddělení 4A	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - DIVA		P4										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	ANO	NE	NE	NE	NE	11:45	13:30	Oddělení 4A- pokoj č.4	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychoedukace - Co je to ADHD												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	NE	NE	NE	NE	NE	13:30	14:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychoedukace - Emoční regulace a zvládání stresu												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	NE	NE	NE	NE	NE	13:30	14:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychoedukace - Výživa a její vliv na poruchy pozornosti												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	ANO	NE	NE	NE	NE	13:30	14:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychoedukace - Farmakoterapeutické možnosti u ADHD												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	ANO	NE	NE	NE	13:30	14:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Lékař/sestra	Základní	4A	Individuální volný program												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	NE	ANO	NE	NE	NE	14:30	15:30	Oddělení 4A	10	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Muzikoterapie												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	NE	NE	NE	NE	NE	14:45	15:45	Muzikoterapie	10	ANO	Standard		
Lékař/sestra	Základní	4A	Krátká porada týmu												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	NE	NE	NE	NE	NE	14:45	15:15	Oddělení 4A					
Komplementy	Komplementární terapie 	4A	Pohybové hry												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	ANO	NE	NE	NE	NE	14:45	15:45	Tělocvična	10	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Aquaterapie												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	NE	ANO	NE	NE	14:45	15:45	Bazén	10	ANO	Standard		
Lékař/sestra	Základní	4A	Schůze týmu oddělení												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	ANO	NE	NE	NE	14:45	15:45	Oddělení 4A	10	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Fitness												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	NE	NE	NE	NE	NE	15:30	17:00	Fitness	10	ANO	Standard		
Lékař/sestra	Základní	4A	Individuální volný program												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	ANO	NE	ANO	NE	NE	15:45	17:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Večeře, výdej večerní medikace												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	17:30	18:00	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Prohlídka budovy CDR												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	NE	NE	NE	NE	NE	18:30	19:00		10				
Lékař/sestra	Základní	4A	Individuální volný program												1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	ANO	ANO	ANO	ANO	ANO	18:30	19:45	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Relaxace												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	19:45	20:00	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Reflexe dne												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:00	20:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Individuální volný program												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:30	21:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Výdej noční medikace												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	21:30	22:00	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Noční klid												1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	24:00	Oddělení 4A	10	N/A	Standard		
Psychoterapie	Psychoterapie	4A	Spánková diagnostika		P1										1.TÝDEN BĚHU (kapacita 5)	4A_1			ANO	NE	NE	NE	NE	NE	NE	22:00	22:15	Oddělení 4A - pokoj č.1	1	N/A	Standard		
Psychoterapie	Psychoterapie	4A	Spánková diagnostika		P2										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	ANO	NE	NE	NE	NE	NE	22:00	22:15	Oddělení 4A - pokoj č.2	1	N/A	Standard		
Psychoterapie	Psychoterapie	4A	Spánková diagnostika		P3										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	ANO	NE	NE	NE	NE	22:00	22:15	Oddělení 4A - pokoj č.3	1	N/A	Standard		
Psychoterapie	Psychoterapie	4A	Spánková diagnostika		P4										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	ANO	NE	NE	NE	22:00	22:15	Oddělení 4A - pokoj č.4	1	N/A	Standard		
Psychoterapie	Psychoterapie	4A	Spánková diagnostika		P5										1.TÝDEN BĚHU (kapacita 5)	4A_1			NE	NE	NE	NE	ANO	NE	NE	22:00	22:15	Oddělení 4A - pokoj č.5	1	N/A	Standard		
Lékař/sestra	Základní	4A	Noční klid												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	ANO	NE	NE	0:00	7:20	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Budíček												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	ANO	NE	NE	7:20	7:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Aktivizační cvičení												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	ANO	NE	NE	7:30	7:45	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Snídaně												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	ANO	NE	NE	7:45	8:15	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Ranní komunita												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	ANO	NE	NE	8:15	8:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Výdej ranní medikace												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	ANO	NE	NE	8:30	8:45	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Vizita s ošetřujícím lékařem												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	ANO	ANO	ANO	NE	NE	8:45	11:00	Oddělení 4A	10	N/A	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - kinesiologický rozbor		P1										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	9:00	10:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Chůze a stabilita		P2										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	9:00	10:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Hodnocení jemné motoriky a reakční rychlosti		P5										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	9:00	10:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Muzikoterapie												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	ANO	NE	NE	NE	9:00	10:00	Muzikoterapie	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychoedukace - Chvála pohybu												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	NE	ANO	NE	NE	9:30	10:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Podpůrný rozhovor		P4										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	9:00	9:30	Oddělení 4A -pokoj č.4	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Podpůrný rozhovor		P3										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	9:00	9:30	Oddělení 4A -pokoj č.3	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Podpůrný rozhovor		P5										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	9:00	9:30	Oddělení 4A -pokoj č.5	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - kinesiologický rozbor		P3										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	10:00	11:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Chůze a stabilita		P4										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	10:00	11:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Hodnocení jemné motoriky a reakční rychlosti		P2										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	10:00	11:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - kinesiologický rozbor		P5										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	11:00	12:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Chůze a stabilita		P4										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	11:00	12:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Hodnocení jemné motoriky a reakční rychlosti		P3										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	11:00	12:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - kinesiologický rozbor		P2										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	10:00	11:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Chůze a stabilita		P5										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	10:00	11:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Hodnocení jemné motoriky a reakční rychlosti		P4										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	10:00	11:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - kinesiologický rozbor		P4										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	11:00	12:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Chůze a stabilita		P3										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	11:00	12:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Pohybová diagnostika - Hodnocení jemné motoriky a reakční rychlosti		P1										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	11:00	12:00	Fitness	1	ANO	Standard		
Lékař/sestra	Základní	4A	Vizita s ošetřujícím lékařem												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	ANO	NE	NE	NE	10:00	11:00	Oddělení 4A	10	N/A	Standard		
Psychoterapie	Psychoterapie	4A	Závěrečný pohovor		P1										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	NE	ANO	NE	NE	10:45	11:30	Oddělení 4A - Hovorna	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Závěrečný pohovor		P2										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	NE	ANO	NE	NE	10:45	11:30	Společenská místnost - pokoj č. 11	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Závěrečný pohovor		P3										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	NE	ANO	NE	NE	11:30	12:15	Oddělení 4A - Hovorna	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Závěrečný pohovor		P4										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	NE	ANO	NE	NE	11:30	12:15	Společenská místnost - pokoj č. 11	1	ANO	Standard		
Lékař/sestra	Základní	4A	Oběd, výdej polední medikace												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	ANO	NE	NE	11:30	12:30	Oddělení 4A	10	N/A	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - IVA + dotazníky		P4										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	12:00	13:30	Oddělení 4A -pokoj č.5	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychologická diagnostika - IVA + dotazníky		P4										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	12:00	13:30	Oddělení 4A -pokoj č.5	1	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Závěrečný pohovor		P5										2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	NE	ANO	NE	NE	12:15	13:00	Oddělení 4A - Hovorna	1	ANO	Standard		
Lékař/sestra	Základní	4A	Individuální volný program												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	NE	NE	NE	NE	NE	NE	12:30	14:45	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Individuální volný program												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	ANO	ANO	ANO	NE	NE	12:30	13:30	Oddělení 4A	10	N/A	Standard		
Psychoterapie	Psychoterapie	4A	Psychoedukace - Moderní závislosti a poruchy pozornosti												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	13:30	14:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychoedukace - Neurobiologie ADHD												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	13:30	14:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychoedukace - Závislost na návykových látkách a poruchy pozornosti												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	ANO	NE	NE	NE	13:30	14:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Psychoterapie	Psychoterapie	4A	Psychoedukace - Spánek a spánková hygiena při ADHD												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	NE	ANO	NE	NE	13:30	14:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Lékař/sestra	Základní	4A	Individuální volný program												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	14:30	15:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Schůze týmu oddělení												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	ANO	NE	NE	NE	14:45	15:45	Oddělení 4A	10				
Lékař/sestra	Základní	4A	Odchod pacientů												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	NE	NE	ANO	NE	NE	14:30	15:30	Oddělení 4A	10	N/A	Standard		
Komplementy	Komplementární terapie 	4A	Aquaterapie												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	NE	NE	ANO	NE	NE	NE	14:45	15:45	Bazén	10	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Filmoterapie												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	NE	ANO	NE	NE	NE	NE	14:45	17:30	Oddělení 4A - Společenská místnost	10	ANO	Standard		
Komplementy	Komplementární terapie 	4A	Fitness												2.TÝDEN BĚHU (kapacita 5)	4A_2			NE	ANO	NE	NE	NE	NE	NE	15:30	17:00	Fitness	10	ANO	Standard		
Lékař/sestra	Základní	4A	Individuální volný program												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	NE	NE	ANO	NE	NE	NE	15:45	17:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Večeře, výdej večerní medikace												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	NE	NE	NE	17:30	18:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Individuální volný program												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	NE	NE	NE	18:30	19:45	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Relaxace												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	NE	NE	NE	19:45	20:00	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Reflexe dne												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	NE	NE	NE	20:00	20:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Individuální volný program												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	NE	NE	NE	20:30	21:30	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Výdej noční medikace												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	NE	NE	NE	21:30	22:00	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	4A	Noční klid												2.TÝDEN BĚHU (kapacita 5)	4A_2			ANO	ANO	ANO	ANO	NE	NE	NE	22:00	24:00	Oddělení 4A	10	N/A	Standard		
Lékař/sestra	Základní	5P	Noční klid													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	0:00	7:10	Oddělení 5P	8				
Lékař/sestra	Základní	5P	Budíček													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	7:10	7:20	Oddělení 5A	8	N/A	Standard		
Komplementy	Komplementární terapie 	5P	Rozcvička			3C										5P_1			ANO	ANO	ANO	ANO	ANO	NE	NE	7:30	7:45	Tělocvična	8	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Snídaně, výdej ranní medikace													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	7:50	8:15	Oddělení 5P	8	N/A	Standard		
Neurostimulace	Neurostimulační terapie	5P	Fototerapie													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:15	8:45	Fototerapie	8	N/A	Standard		
Lékař/sestra	Základní	5P	Vizita s ošetřujícím lékařem													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	8:30	9:00	Oddělení 5A	8	N/A	Standard		
Komplementy	Komplementární terapie 	5P	Pletení a háčkování													5P_1			ANO	ANO	ANO	NE	ANO	NE	NE	9:00	10:00	Pletení a háčkování	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Textilní dílna													5P_1			ANO	NE	NE	NE	NE	NE	NE	9:00	10:00	Textilní dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			ANO	NE	ANO	NE	NE	NE	NE	9:00	10:00	Ambulance 10	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			ANO	NE	ANO	NE	NE	NE	NE	9:00	10:00	Fitness fyzio	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Aquaterapie													5P_1			ANO	NE	NE	NE	NE	NE	NE	9:15	10:15	Bazén	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Individuální fitness													5P_1			NE	NE	ANO	ANO	NE	NE	NE	9:00	10:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Tvůrčí činnosti													5P_1			NE	NE	NE	ANO	ANO	NE	NE	9:00	10:00	Arteateliér	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Aquafitness													5P_1			NE	NE	NE	NE	ANO	NE	NE	9:00	10:00	Bazén	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Bazén s plavčíkem													5P_1			NE	NE	NE	NE	NE	ANO	ANO	9:15	10:15	Bazén	8	ANO	Standard		
Lékař/sestra	Základní	5P	Individuální volný program													5P_1			NE	NE	NE	NE	NE	ANO	ANO	10:15	12:00	Oddělení 5P	8	N/A	Standard		
Psychoterapie	Psychoterapie	5P	Psychologické vyšetření 1/3				NE	ANO	ANO	NE	NE	NE	NE	NE		5P_1			ANO	ANO	ANO	ANO	NE	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Psychologické vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		5P_1			ANO	ANO	ANO	ANO	NE	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Cílené kognitivní vyšetření 1/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		5P_1			ANO	ANO	ANO	ANO	NE	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Cílené kognitivní vyšetření 2/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		5P_1			ANO	ANO	ANO	ANO	NE	NE	NE	9:30	12:00	virtuální místnosti psychologů	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			ANO	NE	NE	ANO	NE	NE	NE	10:00	11:00	Ambulance 10	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie skupina													5P_1			ANO	NE	ANO	NE	NE	NE	NE	10:00	11:00	Multifunkční místnost	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fitness													5P_1			NE	ANO	NE	NE	NE	NE	NE	10:00	11:00	Fitness	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fitness													5P_1			NE	NE	NE	NE	ANO	NE	NE	10:30	11:30	Fitness	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Aquafitness													5P_1			NE	ANO	NE	NE	NE	NE	NE	10:30	11:30	Bazén	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Individuální fitness													5P_1			NE	NE	ANO	NE	NE	NE	NE	10:30	11:30	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Aquaterapie													5P_1			NE	NE	NE	ANO	NE	NE	NE	10:15	11:15	Bazén	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Kulinoterapie													5P_1			NE	NE	NE	NE	ANO	NE	NE	10:30	12:00	Kulinoterapie	4	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		5P_1			ANO	NE	NE	NE	NE	NE	NE	10:00	11.00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		5P_1			NE	NE	NE	ANO	NE	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		5P_1			NE	NE	NE	ANO	NE	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		5P_1			ANO	ANO	ANO	ANO	NE	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		5P_1			ANO	ANO	ANO	ANO	NE	NE	NE	10:30	11:15	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Psychologické vyšetření 3/3				NE	ANO	ANO	NE	NE	NE	NE	NE		5P_1			ANO	ANO	ANO	ANO	NE	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Cílené kognitivní vyšetření 3/3				ANO	ANO	ANO	NE	NE	NE	NE	NE		5P_1			ANO	ANO	ANO	ANO	NE	NE	NE	11:15	12:00	virtuální místnosti psychologů	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			ANO	NE	ANO	NE	NE	NE	NE	11:00	12:00	Ambulance 10	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			ANO	NE	ANO	NE	NE	NE	NE	11:00	12:00	Fitness fyzio	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Teatroterapie 													5P_1			NE	ANO	NE	ANO	NE	NE	NE	11:00	12:00	Apartmán	1	ANO	Standard		
Lékař/sestra	Základní	5P	Individuální volný program													5P_1			NE	NE	NE	NE	NE	ANO	ANO	10:15	12:00	Oddělení 5P	8	N/A	Standard		
Lékař/sestra	Základní	5P	Oběd, výdej polední medikace													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	12:00	12:30	Oddělení 5P	8	N/A	Standard		
Lékař/sestra	Základní	5P	Odpočinek													5P_1			ANO	ANO	NE	NE	NE	NE	NE	12:30	12:00	Oddělení 5P	8	N/A	Standard		
Lékař/sestra	Základní	5P	Odpočinek													5P_1			NE	NE	ANO	NE	NE	NE	NE	12:30	14:00	Oddělení 5P	8	N/A	Standard		
Lékař/sestra	Základní	5P	Individuální volný program													5P_1			NE	NE	NE	NE	ANO	NE	NE	12:30	16:00	Oddělení 5P	8	N/A	Standard		
Lékař/sestra	Základní	5P	Individuální volný program													5P_1			NE	NE	NE	NE	NE	ANO	ANO	12:30	15:00	Oddělení 5P	8	N/A	Standard		
Psychoterapie	Psychoterapie	5P	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		5P_1			NE	ANO	NE	NE	NE	NE	NE	13:00	14:00	virtuální místnosti psychologů	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Textilní dílna													5P_1			ANO	NE	NE	ANO	NE	NE	NE	13:00	14:00	Textilní dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Keramická dílna													5P_1			ANO	ANO	NE	ANO	NE	NE	NE	13:30	14:30	Keramická dílna	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Teatroterapie 													5P_1			NE	ANO	NE	ANO	NE	NE	NE	13:30	14:30	Apartmán	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Holistické poradenství													5P_1			NE	ANO	NE	NE	NE	NE	NE	13:30	14:30	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			NE	ANO	NE	NE	NE	NE	NE	13:30	14:30	Fitness fyzio	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			NE	NE	NE	ANO	NE	NE	NE	13:30	14:30	Ambulance 10	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			NE	ANO	NE	NE	NE	NE	NE	14:30	15.30	Fitness fyzio	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			NE	NE	NE	ANO	NE	NE	NE	14:30	15.30	Ambulance 10	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Skupinové plavání													5P_1			NE	NE	ANO	NE	NE	NE	NE	14:00	15:00	Bazén	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fitness													5P_1			NE	NE	ANO	NE	NE	NE	NE	14:30	15:30	Fitness	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Tvůrčí činnosti													5P_1			NE	NE	NE	ANO	NE	NE	NE	13:30	14:30	Arteateliér	4	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Muzikoterapie													5P_1			NE	NE	NE	ANO	NE	NE	NE	14:00	15:00	Muzikoterapie	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		5P_1			NE	ANO	NE	NE	NE	NE	NE	14:00	15:00	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO		5P_1			NE	NE	ANO	NE	NE	NE	NE	14:30	15:30	virtuální místnosti psychologů	1	ANO	Standard		
Psychoterapie	Psychoterapie	5P	Individuální psychoterapie				ANO	ANO	ANO	ANO	ANO	ANO	ANO	ANO	pouze sudé týdny	5P_1	S		NE	NE	NE	ANO	NE	NE	NE	15:00	16:00	virtuální místnosti psychologů	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Muzikoterapie													5P_1			ANO	NE	NE	NE	NE	NE	NE	15:00	16:00	Muzikoterapie	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Individuální fitness													5P_1			NE	ANO	NE	NE	NE	NE	NE	15:00	16:00	Fitness	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Fyzioterapie													5P_1			NE	NE	NE	ANO	NE	NE	NE	15:30	16:30	Ambulance 10	1	ANO	Standard		
Komplementy	Komplementární terapie 	5P	Teatroterapie			3C										5P_1			NE	NE	NE	NE	ANO	NE	NE	15:30	17:00	Kinosál	4	ANO	Standard		
Lékař/sestra	Základní	5P	Odpolední klub													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	16:00	17:00	Oddělení 5P	8				
Komplementy	Komplementární terapie 	5P	Večeře, výdej večerní medikace													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	17:00	17:30	Oddělení 5P	8				
Komplementy	Komplementární terapie 	5P	Fitness													5P_1			ANO	ANO	ANO	NE	ANO	ANO	ANO	18:00	20:00	Fitness	8				
Lékař/sestra	Základní	5P	Sauna a bazén													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	20:00	21:00	Bazén	8				
Lékař/sestra	Základní	5P	Relaxace se sestrou													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	21:30	22:00	Oddělení 5P	8				
Lékař/sestra	Základní	5P	Výdej noční medikace													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:00	22:15	Oddělení 5P	8				
Lékař/sestra	Základní	5P	Noční klid													5P_1			ANO	ANO	ANO	ANO	ANO	ANO	ANO	22:30	24:00	Oddělení 5P	8				
`;

/* eslint-disable perfectionist/sort-object-types */
export type ProgramTemplateItem = {
  id: string;
  segment: ProgramSegment;
  level: ProgramLevel;
  station: Station;
  medicalProcedure: MedicalProcedure;
  titleNote: string;
  groups: StationGroup[];
  sharedWithStations: Station[];
  competenceRoles: CompetenceRole[];
  stationRuns: StationRun[];
  weekEvenOdd: "BOTH" | "EVEN" | "ODD";
  weekExact: null | number;
  days: {
    po: boolean;
    ut: boolean;
    st: boolean;
    ct: boolean;
    pa: boolean;
    so: boolean;
    ne: boolean;
  };
  timeFrom: string;
  timeTo: string;
  room: string;
  roomCapacity: number;
  slotType: string;
  shiftInProgramForPatient: boolean;
  shiftInProgramForEmployee: boolean;
};
/* eslint-enable perfectionist/sort-object-types */

export const programTemplate = splitCsv(programTemplateSource, programTemplateSourceCols, "\t").map((cols) => {
  /* eslint-disable perfectionist/sort-objects */
  const item: ProgramTemplateItem = {
    id: [cols.station, cols.procedureName, cols.runCodes].join("-").replace(/\s|,/g, "_"),
    segment: textToProgramSegment(cols.segment),
    level: textToProgramLevel(cols.level),
    station: textToStation(cols.station),
    medicalProcedure: textToMedicalProcedure(cols.procedureName),
    titleNote: cols.titleNote || "",
    groups: cols.group ? [textToStationGroup(cols.station, cols.group)] : allStationGroups(cols.station),
    sharedWithStations: !cols.sharedStations
      ? []
      : cols.sharedStations
          .trim()
          .split(",")
          .map((i) => textToStation(i)),
    competenceRoles: [
      cols.k1 === "ANO" ? competenceRoleByCode("K1") : null,
      cols.k2 === "ANO" ? competenceRoleByCode("K2") : null,
      cols.k3 === "ANO" ? competenceRoleByCode("K3") : null,
      cols.pt === "ANO" ? competenceRoleByCode("PT") : null,
      cols.t === "ANO" ? competenceRoleByCode("T") : null,
      cols.a === "ANO" ? competenceRoleByCode("A") : null,
      cols.nt === "ANO" ? competenceRoleByCode("NT") : null,
      cols.k === "ANO" ? competenceRoleByCode("K") : null,
    ].filter((i) => !!i),
    stationRuns: ((rc) => rc.split(",").map((i) => textToStationRun(cols.station, i)))((cols.runCodes || "").trim()),
    weekEvenOdd: ((v) => (v === "S" ? "EVEN" : v === "L" ? "ODD" : "BOTH"))((cols.evenOdd || "").trim()),
    weekExact: cols.exactWeek ? Number(cols.exactWeek) : null,
    days: {
      po: cols.po === "ANO",
      ut: cols.ut === "ANO",
      st: cols.st === "ANO",
      ct: cols.ct === "ANO",
      pa: cols.pa === "ANO",
      so: cols.so === "ANO",
      ne: cols.ne === "ANO",
    },
    timeFrom: cols.timeFrom,
    timeTo: cols.timeTo,
    room: cols.roomName,
    roomCapacity: cols.capacity ? Number(cols.capacity) : 0,
    slotType: cols.slotType,
    shiftInProgramForPatient: cols.shiftInProgramForPatient === "ANO",
    shiftInProgramForEmployee: cols.shiftInProgramForEmployee === "ANO",
  };
  /* eslint-enable perfectionist/sort-objects */
  return item;
});

const dayNumToDayKey = (dn: number) => {
  if (dn == 0) return "ne";
  if (dn == 1) return "po";
  if (dn == 2) return "ut";
  if (dn == 3) return "st";
  if (dn == 4) return "ct";
  if (dn == 5) return "pa";
  if (dn == 6) return "so";
  return "ne";
};

const setDateTime = (d: Date, time: string): Date => {
  const [h, m] = time.split(":").map((i) => Number(i));
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m);
};

export type CdrCalendarEvent = {
  assigned: { employee: { fullName: string; id: string } }[];
  competenceRoles: CompetenceRole[];
  dateFrom: Date;
  dateTo: Date;
  description: null | string;
  duration: number;
  id: string;
  level: ProgramLevel;
  medicalProcedure: MedicalProcedure;
  room: {
    capacity: number;
    name: string;
    shared: boolean;
  } | null;
  station: Station;
  title: string;
};

export type CdrCalendarEventPositioned = CalendarEventPosition & CdrCalendarEvent;

export const treatmentProgramEvents: CdrCalendarEvent[] = [];
treatmentProgramEvents.push(...programTemplateToEvents("2C", new Date(2025, 6, 1)));
treatmentProgramEvents.push(...programTemplateToEvents("2C", new Date(2025, 7, 1)));

function treatmentProgramEventsExistsByDate(stationId: string, date: Date): boolean {
  const pmt = datePrevMidnight(date);
  const nmt = dateNextMidnight(date);

  return treatmentProgramEvents.some((x) => x.station.id === stationId && x.dateFrom >= pmt && x.dateTo <= nmt);
}

function programTemplateItemToCalendarEvent(
  templateItem: ProgramTemplateItem,
  dateFrom: Date,
  dateTo: Date,
  stationGroupCount: number,
): CdrCalendarEvent {
  const hrtime = process.hrtime();
  return {
    assigned: [],
    competenceRoles: templateItem.competenceRoles,
    dateFrom,
    dateTo,
    description: null,
    duration: (dateTo.getTime() - dateFrom.getTime()) / (60 * 1000),
    id: `${templateItem.station.id}_${hrtime[0] * 1000000 + hrtime[1]}`,
    level: templateItem.level,
    medicalProcedure: templateItem.medicalProcedure,
    room: {
      capacity: Number(templateItem.roomCapacity),
      name: templateItem.room,
      shared: templateItem.slotType === "Sdílený",
    },
    station: templateItem.station,
    title: [
      templateItem.medicalProcedure.name,
      templateItem.titleNote,
      templateItem.groups.length === 0 || templateItem.groups.length >= stationGroupCount
        ? ""
        : ` ${templateItem.groups.map((g) => g.name).join(", ")}`,
      templateItem.sharedWithStations.length
        ? " " + [templateItem.station.code, ...templateItem.sharedWithStations.map((s) => s.code)].join(", ")
        : "",
    ]
      .filter((i) => !!i)
      .join(" "),
  };
}

export function programTemplateToEvents(stationId: string, dateOfMonth: Date): CdrCalendarEvent[] {
  const template = programTemplate.filter((i) => i.station.id === stationId);
  const events: CdrCalendarEvent[] = [];

  const stationGroupCount = allStationGroupCount(stationId);

  const [calendarDateFrom, calendarDateTo] = dateMonthDateRangeCalendar(dateOfMonth);
  const calendarDatesCount =
    Math.ceil((calendarDateTo.getTime() - calendarDateFrom.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  const dates: Date[] = Array.from(
    { length: calendarDatesCount },
    (_, i): Date =>
      new Date(calendarDateFrom.getFullYear(), calendarDateFrom.getMonth(), calendarDateFrom.getDate() + i),
  );

  for (const date of dates) {
    const dateHasRecords = treatmentProgramEventsExistsByDate(stationId, date);
    // Skip date if has some records...
    // TODO: everide date events => First remove records of the date.
    if (dateHasRecords) continue;

    const dayEvents: CdrCalendarEvent[] = [];

    const dateDay = date.getDay();
    const dayKey = dayNumToDayKey(dateDay);
    const dateWeek = dateWeekNumber(date);

    // Determine run
    const stationRun = getStationRunByDate(stationId, date);
    // Determine week even/odd
    const dwx = dateWeek % 2 ? "EVEN" : "ODD";

    const items = template.filter((item) => {
      let p = true;
      p &&= item.weekEvenOdd === "BOTH" || item.weekEvenOdd === dwx;
      p &&= item.stationRuns.some((sr) => sr.code === stationRun.code);
      return p;
    });

    for (const templateItem of items) {
      // Skip item if not applyed at current day o week
      if (!templateItem.days[dayKey]) continue;

      // Skip item if not specific week of month
      if (templateItem.weekExact) {
        let currentWeekDate = date;
        let weekInMonth = 1;
        for (let i = 0; i < 12; i++) {
          const prevWeekDate = dateAddDays(-7, currentWeekDate);
          if (prevWeekDate.getMonth() < date.getMonth()) break;
          weekInMonth++;
          currentWeekDate = prevWeekDate;
        }
        if (templateItem.weekExact !== weekInMonth) continue;
      }

      const dateFrom = setDateTime(date, templateItem.timeFrom);
      const dateTo = setDateTime(date, templateItem.timeTo);

      const item = programTemplateItemToCalendarEvent(templateItem, dateFrom, dateTo, stationGroupCount);
      dayEvents.push(item);
    }

    // Resolve competence roles
    dayEvents.forEach((e) => {
      if (e.competenceRoles.length) {
        e.assigned = resourcesMap
          .filter((emp) => emp.stationsPrimaryCodes.includes(stationId))
          .filter((emp) => e.competenceRoles.some((c) => emp.competenceRoles.some((er) => er.id === c.id)));
      }
    });

    events.push(...dayEvents);
  }

  return events;
}

// role;procedure;[segment|timeMin|canSplitToParts/...];roomCount;roomIsVirual;roomIsShared
const medicalProceduresCompetencesMapSource = `K1;IPT;[*|90|1,2];1;ANO;ANO
K1;SPT;[*|90|1];2;NE;NE
K1;PV2_3;[*|150|1];1;ANO;ANO
K1;CK1_3;[*|150|1];1;ANO;ANO
K1;CK2_3;[*|150|1];1;ANO;ANO
K1;CK3_3;[*|45|1];1;ANO;ANO
K2;IPT;[*|90|1,2/5P|60|1];1;ANO;ANO
K2;SPT;[*|90|1];2;NE;NE
K2;PV1_3;[*|150|1];1;ANO;ANO
K2;PV2_3;[*|150|1];1;ANO;ANO
K2;PV3_3;[*|45|1];1;ANO;ANO
K2;CK1_3;[*|150|1];1;ANO;ANO
K2;CK2_3;[*|150|1];1;ANO;ANO
K2;CK3_3;[*|45|1];1;ANO;ANO
K3;IPT;[*|90|1,2/5P|60|1];1;ANO;ANO
K3;SPT;[*|90|1];2;NE;NE
K3;PV1_3;[*|150|1];1;ANO;ANO
K3;PV2_3;[*|150|1];1;ANO;ANO
K3;PV3_3;[*|45|1];1;ANO;ANO
PT;IPT;[*|90|1,2/5P|60|1];1;ANO;ANO
PT;SPT;[*|90|1];2;NE;NE
T;IPT;[*|90|1,2/5P|60|1];1;ANO;ANO
T;SPT;[*|90|1];2;NE;NE
A;IPT;[*|90|1,2/5P|60|1];1;ANO;ANO
A;SPT;[*|90|1];2;NE;NE
NT;IPT;[*|90|1,2/5P|60|1];1;ANO;ANO
NT;SPT;[*|90|1];2;NE;NE
K;IPT;[*|90|1,2/5P|60|1];1;ANO;ANO
K;SPT;[*|90|1];2;NE;NE`;

/* eslint-disable perfectionist/sort-object-types */
export type MedicalProceduresCompetencesMap = {
  competenceRoleCode: string;
  medicalProcedureCode: string;
  avgTime: MedicalProceduresCompetencesMapAvgTime[];
  roomCount: number;
  roomIsVirual: boolean;
  roomIsShared: boolean;
};
export type MedicalProceduresCompetencesMapAvgTime = {
  stationCode: string;
  timeMin: number;
  splits: number[];
};
/* eslint-enable perfectionist/sort-object-types */
export const medicalProceduresCompetencesMap: MedicalProceduresCompetencesMap[] = splitCsv(
  medicalProceduresCompetencesMapSource,
).map((cols) => {
  /* eslint-disable perfectionist/sort-objects */
  const item: MedicalProceduresCompetencesMap = {
    competenceRoleCode: cols[0],
    medicalProcedureCode: cols[1],
    avgTime: ((v): MedicalProceduresCompetencesMapAvgTime[] => {
      const ii = v
        .slice(1, -1)
        .split("/")
        .map((i) => i.split("|"));
      return stations.map((station) => {
        const stp = ii.find((i) => i[0] === station.code) ?? ii[0];
        return {
          stationCode: station.code,
          timeMin: Number(stp[1]),
          splits: stp[2].split(",").map((i) => Number(i)),
        } satisfies MedicalProceduresCompetencesMapAvgTime;
      });
    })(cols[2]),
    roomCount: Number(cols[3]),
    roomIsVirual: cols[4] === "ANO",
    roomIsShared: cols[5] === "ANO",
  };
  /* eslint-enable perfectionist/sort-objects */
  return item;
});
