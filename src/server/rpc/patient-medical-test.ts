import { z } from "@builder.io/qwik-city";
import { Prisma } from "@prisma/client";
// import { v4 as randomUUID } from "uuid";

import { prisma } from "./mock-db-prisma";

// TODO: FIXME remove this hack
const randomUUID = () => "fake-v4-uuid";

const patientMedicalTestSelectFields = Prisma.validator<Prisma.PatientMedicalTestSelect>()({
  createdAt: true,
  id: true,
  kind: true,
  patientId: true,
  procedureId: true,
  result: true,
  updatedAt: true,
} satisfies Prisma.PatientMedicalTestSelect);
type PatientMedicalTestDbRow = Prisma.PatientMedicalTestGetPayload<{ select: typeof patientMedicalTestSelectFields }>;

/* eslint-disable perfectionist/sort-objects */
const PatientMedicatTestSchemas = z.object({
  must: z.object({
    positive: z.boolean(),
  }),
  tug: z.object({
    timeInSeconds: z.number(),
  }),
});
/* eslint-enable perfectionist/sort-objects */

const patientMedicalTestKindEnumSchema = PatientMedicatTestSchemas.keyof();
export type PatientMedicalTestKind = z.infer<typeof patientMedicalTestKindEnumSchema>;
export const patientMedicalTestKinds = Object.keys(patientMedicalTestKindEnumSchema.enum) as PatientMedicalTestKind[];
// type InferPatientMedicalTextResultSchemaType<TK extends PatientMedicalTestKind> =
//   (typeof PatientMedicatTestSchemas.shape)[TK];
export type PatientMedicalTestResult<TK extends PatientMedicalTestKind> = z.infer<
  (typeof PatientMedicatTestSchemas.shape)[TK]
>;

export type PatientMedicalTest<TK extends PatientMedicalTestKind> = {
  createdAt: Date;
  id: string;
  kind: TK;
  patientId: string;
  procedureId: null | string;
  result: PatientMedicalTestResult<TK>;
  updatedAt: Date;
};

// ***********************************
// ** serverFindPatientMedicalTests
// ***********************************

export async function serverFindProcedureMedicalTests(input: {
  onlyOfKind?: PatientMedicalTestKind[];
  procedureId: string;
}): Promise<PatientMedicalTest<any>[]> {
  const rows = await prisma.patientMedicalTest.findMany({
    select: patientMedicalTestSelectFields,
    where: {
      kind: input.onlyOfKind ? { in: input.onlyOfKind } : undefined,
      procedureId: input.procedureId,
    },
  });

  return rows.map((i) => decoratePatientMedicalTest(i));
}

// ************************************************
// ** serverUpsertPatientMedicalTestForProcedure
// ************************************************

type ServerUpsertPatientMedicalTestForProcedureInput<TK extends PatientMedicalTestKind> = {
  data: {
    result: PatientMedicalTestResult<TK>;
  };
  kind: TK;
  patientId: string;
  procedureId: string;
};

export async function serverUpsertPatientMedicalTestForProcedure<TK extends PatientMedicalTestKind>(
  input: ServerUpsertPatientMedicalTestForProcedureInput<TK>,
) {
  const row = await prisma.patientMedicalTest.upsert({
    create: {
      id: randomUUID(),
      kind: input.kind,
      patientId: input.patientId,
      procedureId: input.procedureId,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      result: input.data.result == null ? null : JSON.stringify(input.data.result),
    },
    select: patientMedicalTestSelectFields,
    update: {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      result: input.data.result == null ? null : JSON.stringify(input.data.result),
    },
    where: {
      patientId_kind_procedureId: {
        kind: input.kind,
        patientId: input.patientId,
        procedureId: input.procedureId,
      },
    },
  });

  return decoratePatientMedicalTest(row);
}

//
// @internal
//

function decoratePatientMedicalTest<TK extends PatientMedicalTestKind>(
  row: PatientMedicalTestDbRow,
): PatientMedicalTest<TK> {
  // if (row == null) return null;

  const { result, ...forward } = row;

  return { ...forward, result: result == null ? null : JSON.parse(result) } as PatientMedicalTest<TK>;
}
