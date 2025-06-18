import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import { dateAddDays } from "@akeso/utils";
import { Prisma } from "@prisma/client";
// import { v4 as randomUUID } from "uuid";

import { createIrisClient } from "~/iris";

import { prisma } from "./mock-db-prisma";

// TODO: FIXME remove this hack
const randomUUID = () => "fake-v4-uuid";

type IrisClient = ReturnType<typeof createIrisClient>;

const applicationFormSelectFields = Prisma.validator<Prisma.ApplicationFormSelect>()({
  anamnesis: true,
  applicant: {
    select: {
      ambulance: true,
      fullName: true,
      icp: true,
      specialization: true,
    },
  },
  createdAt: true,
  diagnosis: true,
  id: true,
  message: true,
  number: true,
  patientId: true,
  pdfBase64: true,
  procedure: false,
  procedureId: true,
  reasonForRequest: true,
  requestedExamination: true,
  specialRequirement: true,
  text: true,
  titleText: true,
  updatedAt: true,
} satisfies Prisma.ApplicationFormSelect);

type ApplicationFormDbRow = Prisma.ApplicationFormGetPayload<{ select: typeof applicationFormSelectFields }>;

export type ApplicationForm = {
  anamnesis: string;
  applicant: {
    ambulance: string;
    fullName: string;
    icp: string;
    specialization: string;
  };
  createdAt: Date;
  diagnosis: string;
  id: string;
  message: string;
  number: string;
  patient: {
    address: null | string;
    birthRegistrationNumber: null | string;
    fullName: string;
    id: string;
    insuranceCompanyNumber: null | string;
  };
  pdfBase64: null | string;
  procedureId: null | string;
  reasonForRequest: string;
  requestedExamination: string;
  specialRequirement: string;
  text: string;
  titleText: string;
  updatedAt: Date;
};

// **************************************
// ** serverFindPatientApplicationForms
// **************************************

type ServerFindPatientApplicationFormsInput = {
  noOlderThenDays?: number;
  patientId: string;
};

export async function serverFindPatientApplicationForms(
  env: EnvGetter,
  input: ServerFindPatientApplicationFormsInput,
): Promise<ApplicationForm[]> {
  const iris = createIrisClient(env);
  const res = await prisma.applicationForm.findMany({
    select: applicationFormSelectFields,
    where: {
      createdAt: input.noOlderThenDays ? { gte: dateAddDays(input.noOlderThenDays * -1) } : undefined,
      patientId: input.patientId,
    },
  });
  const rows: ApplicationForm[] = [];
  for (const r of res) {
    const d = await decorateApplicationFormDbRow(iris, r);
    if (d) rows.push(d);
  }
  return rows;
}

// **************************************
// ** serverCreatePatientApplicationForms
// **************************************

type ServerCreatePatientApplicationFormInput = {
  data: DeepNullable<
    {
      patient: DeepNullable<Omit<ApplicationForm["patient"], "id">>;
    } & Omit<ApplicationForm, "createdAt" | "id" | "number" | "patient" | "updatedAt">
  >;
  patientId: string;
};

export async function serverCreatePatientApplicationForm(
  env: EnvGetter,
  input: ServerCreatePatientApplicationFormInput,
): Promise<ApplicationForm | null> {
  const nextNumAgg = await prisma.applicationForm.aggregate({
    _max: {
      number: true,
    },
  });

  const nextNum = Number(nextNumAgg._max.number ?? 0) + 1;

  const row = await prisma.$transaction(async (prisma) => {
    const id = randomUUID();

    await prisma.applicationFormApplicant.create({
      data: {
        ambulance: input.data.applicant.ambulance ?? undefined,
        applicationFormId: id,
        fullName: input.data.applicant.fullName ?? undefined,
        icp: input.data.applicant.icp ?? undefined,
        specialization: input.data.applicant.specialization ?? undefined,
      },
      select: null,
    });

    const row = await prisma.applicationForm.create({
      data: {
        anamnesis: input.data.anamnesis ?? undefined,
        diagnosis: input.data.diagnosis ?? undefined,
        id,
        message: input.data.message ?? undefined,
        number: nextNum.toString().padStart(6, "0"),
        patientId: input.patientId,
        procedureId: input.data.procedureId,
        reasonForRequest: input.data.reasonForRequest ?? undefined,
        requestedExamination: input.data.requestedExamination ?? undefined,
        specialRequirement: input.data.specialRequirement ?? undefined,
        text: input.data.text ?? undefined,
        titleText: input.data.titleText ?? undefined,
      } satisfies Prisma.ApplicationFormUncheckedCreateInput,
      select: applicationFormSelectFields,
    });

    return row;
  });

  return decorateApplicationFormDbRow(createIrisClient(env), row);
}

export async function serverUpdateApplicationFormPdfUrl(
  env: EnvGetter,
  input: { applicationFormId: string; dataUrl: string },
) {
  return decorateApplicationFormDbRow(
    createIrisClient(env),
    await prisma.applicationForm.update({
      data: { pdfBase64: input.dataUrl },
      select: applicationFormSelectFields,
      where: { id: input.applicationFormId },
    }),
  );
}

//
// @internal
//

async function decorateApplicationFormDbRow(
  iris: IrisClient,
  dbRow: ApplicationFormDbRow | null,
): Promise<ApplicationForm | null> {
  if (dbRow == null) return null;

  const { patientId, ...forwardDbData } = dbRow;

  const { patient } = await iris.query({
    patient: {
      __args: {
        id: patientId,
      },
      // @ts-expect-error
      address: true,
      birthRegistrationNumber: true,
      fullName: true,
      id: true,
      insuranceCompanyNumber: true,
    },
  });

  if (patient == null) {
    console.error(`Patient '${patientId}' not found.`);
    return null;
  }
  // @ts-expect-error
  return {
    ...forwardDbData,
    // @ts-expect-error
    patient,
  } satisfies ApplicationForm;
}

type DeepNullable<T> = {
  [K in keyof T]: T[K] extends boolean | Date | number | string | undefined ? null | T[K] : DeepNullable<T[K]>;
};
