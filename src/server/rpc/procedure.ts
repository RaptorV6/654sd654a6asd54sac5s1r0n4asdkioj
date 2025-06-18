import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import { Prisma } from "@prisma/client";
// import { v4 as randomUUID } from "uuid";

import type { Patient as GqlPatient } from "~/iris";

import { createIrisClient } from "~/iris";

import type { ProcedureKind, ProcedureMeta } from "./procedure-meta.types";
import type { ProcedureTask, ProcedureTaskDueOffsetDeterminator, ProcedureTaskResponsible } from "./procedure-tasks";

import { serverFindEmployeeBriefs } from "./employee";
import { procedureStepFromDb, procedureStepToDb } from "./helpers";
import { prisma } from "./mock-db-prisma";
import { serverProcedureMeta } from "./procedure-meta";
import { getCreateProcedureTasks } from "./procedure-tasks";

// TODO: FIXME remove this hack
const randomUUID = () => "fake-v4-uuid";

type IrisClient = ReturnType<typeof createIrisClient>;

const procedureSelectFields = Prisma.validator<Prisma.ProcedureSelect>()({
  asa: true,
  diagnosisConfirmed: {
    select: {
      confirmedAt: true,
      confirmedBy: true,
      status: true,
    },
  },
  id: true,
  kind: true,
  patientId: true,
  step: true,
  surgery: {
    select: {
      date: true,
      dateIsConfirmed: true,
      name: true,
    },
  },
  tasks: {
    orderBy: { ranking: "asc" },
    select: {
      applicationFormId: true,
      createdAt: true,
      doneAt: true,
      doneBy: true,
      doneByPatient: true,
      dueDate: true,
      dueOffsetDays: true,
      dueOffsetDeterminator: true,
      formSubmitionId: true,
      id: true,
      outpatientReportId: true,
      patientMedicalTestId: true,
      procedureId: true,
      procedureStep: true,
      ranking: true,
      responsible: true,
      result: true,
      taskKind: true,
      taskLabel: true,
      updatedAt: true,
    },
  },
  updatedAt: false,
});

type ProcedureDbRow = Prisma.ProcedureGetPayload<{ select: typeof procedureSelectFields }>;

export interface SalusAccount {
  id: string;
}

export interface Procedure extends Omit<ProcedureDbRow, "kind" | "step" | "tasks"> {
  kind: ProcedureKind;
  meta: ProcedureMeta;
  patient: {
    salus: null | SalusAccount;
  } & Pick<
    GqlPatient,
    | "address"
    | "birthDate"
    | "birthRegistrationNumber"
    | "emailAddress"
    | "firstName"
    | "fullName"
    | "id"
    | "insuranceCompanyNumber"
    | "lastName"
    | "phoneNumber"
    | "sex"
  >;
  step: { major: number; minor: number };
  tasks: ProcedureTask<any>[];
}

// ***********************************
// ** serverFindProcedures
// ***********************************

type ServerFindProceduresInput = {
  patientId?: string;
  procedureKind?: string;
};

export async function serverFindProcedures(env: EnvGetter, input?: ServerFindProceduresInput): Promise<Procedure[]> {
  const iris = createIrisClient(env);
  const rows = await prisma.procedure.findMany({
    select: procedureSelectFields,
    where: {
      kind: input?.procedureKind,
      patientId: input?.patientId,
    },
  });

  const res: Procedure[] = [];
  for (const row of rows) {
    const x = await decorateProcedureDbRow(iris, row);
    if (x) res.push(x);
  }
  return res;
}

// ***********************************
// ** serverGetProcedure
// ***********************************

type ServerGetProcedureInput = {
  procedureId: string;
};

export async function serverGetProcedure(env: EnvGetter, input: ServerGetProcedureInput): Promise<null | Procedure> {
  const iris = createIrisClient(env);
  const row = await prisma.procedure.findUnique({
    select: procedureSelectFields,
    where: { id: input.procedureId },
  });
  return row ? decorateProcedureDbRow(iris, row) : null;
}

// ***********************************
// ** serverGetProcedureStep
// ***********************************

export async function serverGetProcedureStep(input: { procedureId: string }): Promise<null | Procedure["step"]> {
  const row = await prisma.procedure.findUnique({
    select: { step: true },
    where: { id: input.procedureId },
  });
  return row == null ? null : procedureStepFromDb(row.step);
}

// ***********************************
// ** serverCreateProcedure
// ***********************************

type ServerCreateProcedureInput = {
  patientId: string;
  procedureKind: ProcedureKind;
};

export async function serverCreateProcedure(
  env: EnvGetter,
  input: ServerCreateProcedureInput,
): Promise<null | Procedure> {
  const iris = createIrisClient(env);

  try {
    const row = await prisma.procedure.create({
      data: {
        id: randomUUID(),
        kind: input.procedureKind,
        patientId: input.patientId,
        tasks: {
          createMany: {
            data: getCreateProcedureTasks(input.procedureKind),
          },
        },
      },
      select: procedureSelectFields,
    });

    return decorateProcedureDbRow(iris, row);
  } catch (err) {
    console.error("Procedure creation error.", err);
    return null;
  }
}

// ***********************************
// ** serverUpdateProcedure
// ***********************************

type UpdateProcedureInputData = {
  asa?: number;
  diagnosisConfirmed?: {
    confirmedBy: string;
    status: boolean;
  };
  step?: { major: number; minor: number };
  surgery?: {
    date: Date;
    dateIsConfirmed?: boolean;
    name: string;
  };
};

type ServerUpdateProcedureInput = {
  data: UpdateProcedureInputData;
  procedureId: string;
};

export async function serverUpdateProcedure(
  env: EnvGetter,
  input: ServerUpdateProcedureInput,
): Promise<null | Procedure> {
  const iris = createIrisClient(env);
  try {
    const row = await prisma.procedure.update({
      data: {
        asa: input.data.asa,
        diagnosisConfirmed: input.data.diagnosisConfirmed
          ? {
              upsert: {
                create: {
                  ...input.data.diagnosisConfirmed,
                  confirmedAt: new Date(),
                },
                update: {
                  ...input.data.diagnosisConfirmed,
                  confirmedAt: new Date(),
                },
              },
            }
          : undefined,
        step: input.data.step ? procedureStepToDb(input.data.step) : undefined,
        surgery: input.data.surgery
          ? {
              upsert: {
                create: input.data.surgery,
                update: input.data.surgery,
              },
            }
          : undefined,
      },
      select: procedureSelectFields,
      where: { id: input.procedureId },
    });
    return decorateProcedureDbRow(iris, row);
  } catch (err) {
    console.error(`Procedure '${input.procedureId}' update failed with input data`, input.data, err);
    return null;
  }
}

// ***********************************
// ** serverGetProcedurePatientId
// ***********************************

export async function serverGetProcedurePatientId(input: { procedureId: string }) {
  const res = await prisma.procedure.findUnique({
    select: { patientId: true },
    where: { id: input.procedureId },
  });

  return res == null ? null : res.patientId;
}

//
// @internal
//

async function decorateProcedureDbRow(iris: IrisClient, dbRow: ProcedureDbRow): Promise<null | Procedure> {
  const { kind: kindUntyped, step, ...procedureNotMutated } = dbRow;
  const kind = kindUntyped as ProcedureKind;

  const procedureMeta = await serverProcedureMeta(kind);

  if (procedureMeta == null) {
    console.error(`Procedure meta '${kind}' not found.`);
    return null;
  }

  const { patient } = await iris.query({
    patient: {
      __args: {
        id: dbRow.patientId,
      },
      // @ts-expect-error
      address: true,
      birthDate: true,
      birthRegistrationNumber: true,
      emailAddress: true,
      firstName: true,
      fullName: true,
      id: true,
      insuranceCompanyNumber: true,
      lastName: true,
      phoneNumber: true,
      sex: true,
    },
  });

  if (patient == null) {
    console.error(`Patient '${dbRow.patientId}' not found.`);
    return null;
  }

  // TODO: call
  const patientSalusAccount = await prisma.patientSalusAccount.findFirst({
    select: { id: true },
    where: { patientId: patient.id },
  });

  const doneByIds = Object.keys(
    procedureNotMutated.tasks.reduce(
      (r, i) => {
        if (i.doneBy) {
          r[i.doneBy] = true;
        }
        return r;
      },
      {} as Record<string, boolean>,
    ),
  );
  const doneByMap: Record<string, any> = Object.fromEntries(
    (await serverFindEmployeeBriefs({ employeeIds: doneByIds })).map((e) => [e.id, e]),
  );

  const x = {
    ...procedureNotMutated,
    kind,
    meta: procedureMeta,
    patient: {
      ...patient,
      // todo: IRIS skontrolovat, ze ma pacient v akeso online ucet
      salus: patientSalusAccount,
    },
    step: procedureStepFromDb(step),
    tasks: procedureNotMutated.tasks.map<ProcedureTask<any>>((t) => ({
      ...t,
      doneBy: t.doneBy ? doneByMap[t.doneBy] ?? null : null,
      dueOffsetDeterminator: t.dueOffsetDeterminator as ProcedureTaskDueOffsetDeterminator,
      procedureStep: procedureStepFromDb(t.procedureStep),
      responsible: t.responsible as ProcedureTaskResponsible,
      result: t.result == null ? null : (JSON.parse(t.result) as any),
    })),
  };

  // @ts-expect-error
  return x;
}
