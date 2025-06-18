/* eslint no-console: "warn" */
import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import type { Prisma } from "@prisma/client";

import { dateAddDays } from "@akeso/utils";
import { z } from "@builder.io/qwik-city";
// import { v4 as randomUUID } from "uuid";

import type { EmployeeBrief } from "./employee";
import type { ProcedureKind } from "./procedure-meta.types";

import { serverFindEmployeeBriefs } from "./employee";
import { procedureStepFromDb, procedureStepToDb } from "./helpers";
import { prisma } from "./mock-db-prisma";
import { serverGetProcedureStep, serverUpdateProcedure } from "./procedure";

// TODO: FIXME remove this hack
const randomUUID = () => "fake-v4-uuid";

export type ProcedureTaskResponsible = "administrative" | "doctor" | "nurse" | "patient";
export type ProcedureTaskDueOffsetDeterminator = "creation" | "prevStep" | "surgeryDate";

/* eslint-disable perfectionist/sort-objects */
// prettier-ignore
const ProcedureTaskResultSchemas = z.object({
  // colorectal-cancer by steps
    // 01.01 - doctor
    'diagnosisConfirmation': z.null(),
    'surgeryIndication': z.null(),
    'surgeryDate': z.null(),
    'stagingApplicationFormsRelease': z.null(),
    'testMust': z.object({ medicalTestId: z.string() }),
    'testTug': z.object({ medicalTestId: z.string() }),
    'outpatientReport': z.null(),

    // 01.02 - nurse
    'requrestPreoperativeExaminationRelease': z.object({ method: z.enum(["printed", "paperForm"]) }),
    'questionnairePatientPreoperativeRelease': z.object({
      method: z.enum(["printed", "paperForm", "akeso.online", "onside", "emailed"]),
    }),
    'questionnairePatientPreoperativeInstructions': z.null(),
    'nextStepsPatientEducation': z.null(),
    
    // 01.02 - administrative
    'stagingExaminationAppointmetsReservation': z.object({
      self: z.boolean(),
      dates: z.object({
        abdomenCT: z.date(),
        coloscopy: z.date(),
        rtg_SP: z.date(),
        smallPelvisNMR: z.date().optional(),
      }).optional(),
    }),
    'followUpExaminationAppointmetReservation': z.null(),
    'stagingReportsDeliveryMethod': z.object({
      method: z.enum(["email", "personally"])
    }),
    'preoperativeReportsDeliveryMethod': z.object({
      method: z.enum(["email", "personally"])
    }),
    'questionnairePatientPreoperativeFulfill': z.null(),

    // 02.01 - patient
    'stagingExaminationsCompletion': z.null(),
    'preoperativeExaminationsCompletion': z.null(),
    'questionnairePatientPreoperativeCompletion': z.null(),
    'nutritionalPreparationStarted': z.null(),
    'prehabilitationStarted': z.null(),

    // 02.01 - administrative
    'stagingExaminationsCompletionCheck': z.null(),
    'preoperativeExaminationsCompletionCheck': z.null(),

    // 03.01 - doctor
    'finalDiagnosisConfirmation': z.null(),

    // 03.01 - administrative
    'questionnairePatientPreoperativeCheckFinal': z.null(),
    'preoperativeExaminationsCompletionCheck2': z.null(),

    // 04.01 - administrative
    'preoperativeExaminationsCompletionCheckFinal': z.null(),
    'surgeryDateConfirmation': z.null(),

    // 05.01 - doctor
    'additionalAnaestheticExaminations': z.null(),

    // 06.01 - doctor
    'patientIntake': z.null(),
});
/* eslint-enable perfectionist/sort-objects */

const procedureTaskKindEnumSchema = ProcedureTaskResultSchemas.keyof();
export type ProcedureTaskKind = z.infer<typeof procedureTaskKindEnumSchema>;
export const procedureTaskKinds = Object.keys(procedureTaskKindEnumSchema.enum) as ProcedureTaskKind[];
type InferProcedureTaskResultSchemaType<TK extends ProcedureTaskKind> = (typeof ProcedureTaskResultSchemas.shape)[TK];
export type ProcedureTaskResult<TK extends ProcedureTaskKind> = z.infer<(typeof ProcedureTaskResultSchemas.shape)[TK]>;

export function procedureTaskResultSchema<TK extends ProcedureTaskKind>(
  taskKind: TK,
): InferProcedureTaskResultSchemaType<TK> {
  return ProcedureTaskResultSchemas.shape[taskKind];
}

export type ProcedureTaskCreationTemplate = {
  dueOffsetDays: number;
  dueOffsetDeterminator: ProcedureTaskDueOffsetDeterminator;
  procedureStep: { major: number; minor?: number };
  responsible: ProcedureTaskResponsible;
  taskKind: string;
  taskLabel: string;
};

export async function serverProcedureMoveToNextStep(
  env: EnvGetter,
  input: {
    procedureId: string;
  },
): Promise<{ major: number; minor: number } | null> {
  const procedureTaskCount = await prisma.procedureTask.count({
    where: { procedureId: input.procedureId },
  });
  if (procedureTaskCount === 0) return null;

  const [procedureNextPossibleStep, procedureCurrentStep] = await Promise.all([
    prisma.procedureTask.findFirst({
      orderBy: { procedureStep: "asc" },
      select: { procedureStep: true },
      where: {
        doneAt: null,
        procedureId: input.procedureId,
      },
    }),
    prisma.procedure.findUnique({ select: { step: true }, where: { id: input.procedureId } }),
  ]);

  if (procedureCurrentStep == null) {
    return null;
  }

  if (procedureNextPossibleStep == null) {
    const nextStep = { major: 99, minor: 1 };
    console.log("UZ NENI ZADNY DALSI KROK PROCEDURY DAVAM", nextStep);
    await serverUpdateProcedure(env, { data: { step: nextStep }, procedureId: input.procedureId });
    return nextStep;
  }

  if (procedureNextPossibleStep.procedureStep !== procedureCurrentStep.step) {
    const nextStep = procedureStepFromDb(procedureNextPossibleStep.procedureStep);
    console.log("UZ NENI ZADNY DALSI KROK PROCEDURY DAVAM", nextStep);
    await serverUpdateProcedure(env, { data: { step: nextStep }, procedureId: input.procedureId });
    return nextStep;
  }

  return procedureStepFromDb(procedureCurrentStep.step);
}

export type ProcedureCurrentActivity = "ALL_DONE" | "CANCELED" | "DONE" | "FILL" | "WAITING" | "WAITING_NOTING_TODAY";

export async function serverProcedureActivity(
  env: EnvGetter,
  input: {
    procedureId: string;
    responsible: ProcedureTaskResponsible;
  },
): Promise<null | ProcedureCurrentActivity> {
  const { procedureId, responsible } = input;

  const procedureStep = await serverGetProcedureStep({ procedureId: input.procedureId });
  if (procedureStep == null) return null;

  if (procedureStep.major >= 99) {
    return "ALL_DONE";
  }

  const getTasksState = (pid: string, r: ProcedureTaskResponsible, s: { major: number; minor: number }) =>
    Promise.all([
      serverCountProcedureTasksForStep({ procedureId: pid, status: "todo", step: { major: s.major } }),
      serverCountProcedureTasksForStep({ procedureId: pid, status: "todo", step: s }),
      serverCountProcedureTasksForStep({ procedureId: pid, responsible: r, status: "todo", step: s }),
      serverCountProcedureTasksForStep({ procedureId: pid, responsible: r, status: "todo", step: s, today: true }),
      serverCountProcedureTasksForStep({ procedureId: pid, responsible: r, status: "all", step: s }),
    ]);

  let [
    tasksForMajorStepTodo,
    tasksForCurrentStepTodo,
    tasksForResposibleTodo,
    tasksForResposibleTodoToday,
    tasksForResposibleAll,
  ] = await getTasksState(procedureId, responsible, procedureStep);

  console.log("----- serverProcedureFoo ------");
  console.log("procedureStep", procedureStep);
  console.log("responsible", responsible);
  console.log("procedureId", procedureId);
  console.log("tasksForMajorStepTodo", tasksForMajorStepTodo);
  console.log("tasksForCurrentStepTodo", tasksForCurrentStepTodo);
  console.log("tasksForResposibleTodo", tasksForResposibleTodo);
  console.log("tasksForResposibleTodoToday", tasksForResposibleTodoToday);
  console.log("tasksForResposibleAll", tasksForResposibleAll);

  if (tasksForMajorStepTodo === 0 || tasksForCurrentStepTodo === 0) {
    // todo: move to next stape if possible
    const newProcedureStep = await serverProcedureMoveToNextStep(env, { procedureId });
    if (newProcedureStep == null) return null;

    console.log("MOVE PROCEDURE TO NEXT STEP", newProcedureStep);

    if (newProcedureStep.major === 99) return "DONE";

    [
      tasksForMajorStepTodo,
      tasksForCurrentStepTodo,
      tasksForResposibleTodo,
      tasksForResposibleTodoToday,
      tasksForResposibleAll,
    ] = await getTasksState(procedureId, responsible, newProcedureStep);

    if (tasksForMajorStepTodo == null || tasksForMajorStepTodo === 0) {
      throw new Error(
        `Procedure configuration malformed. No tasks for step ${newProcedureStep.major}.${newProcedureStep.minor}`,
      );
    }
  }

  console.log(procedureStep, responsible);
  console.log(
    tasksForMajorStepTodo,
    tasksForCurrentStepTodo,
    tasksForResposibleTodo,
    tasksForResposibleTodoToday,
    tasksForResposibleAll,
  );

  // If in current step is no taks for role => "waiting" or "done"
  if (tasksForResposibleAll === 0) {
    console.log("No tasks for responsible...");
    const tasktsTotoInFuture = await serverCountProcedureTasksForStep({
      procedureId,
      responsible,
      status: "todo",
      step: procedureStep,
      stepGt: true,
    });

    if (tasktsTotoInFuture === 0) {
      console.log("No tasks for responsible... and no task in next step");
      return "DONE";
    }

    return "WAITING";
  }
  if (tasksForResposibleTodoToday === 0) {
    console.log("No tasks for responsible for today...");
    return "WAITING_NOTING_TODAY";
  }
  if (tasksForResposibleTodo === 0 && tasksForResposibleAll > 0) return "DONE";

  console.log("som na konci");
  return "FILL";
}

export function getCreateProcedureTasks(procedureKind: ProcedureKind): Prisma.ProcedureTaskCreateManyProcedureInput[] {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (procedureKind === "colorectal-cancer") {
    return getCreateColorectalCancerProcedureTasks();
  }

  return [];
}

function getCreateColorectalCancerProcedureTasks() {
  // TODO: doplnit offset pre warning a offset pre error

  // prettier-ignore
  const taskTemplates: ProcedureTaskCreationTemplate[] = [
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 1 }, responsible: "doctor", taskKind: 'diagnosisConfirmation', taskLabel: "Potvrzení diagnózy" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 1 }, responsible: "doctor", taskKind: 'surgeryIndication', taskLabel: "Indikace konkrétního výkonu" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 1 }, responsible: "doctor", taskKind: 'surgeryDate', taskLabel: "Určení předběžného termínu operace" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 1 }, responsible: "doctor", taskKind: 'stagingApplicationFormsRelease', taskLabel: "Tisk a autorizace žádanek na stagingová vyšetření" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 1 }, responsible: "doctor", taskKind: 'testMust', taskLabel: "Provedení MUST testu" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 1 }, responsible: "doctor", taskKind: 'testTug', taskLabel: "Provedení TUG testu" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 1 }, responsible: "doctor", taskKind: 'outpatientReport', taskLabel: "Vytvoření ambulatní zprávy" },

    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 2 }, responsible: "nurse", taskKind: 'requrestPreoperativeExaminationRelease', taskLabel: "Vydání Žádosti o předoperační vyšetření" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 2 }, responsible: "nurse", taskKind: 'questionnairePatientPreoperativeRelease', taskLabel: "Vydání předoperačního dotazníku" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 2 }, responsible: "nurse", taskKind: 'questionnairePatientPreoperativeInstructions', taskLabel: "Instrukce k vyplnění dotazníku" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 2 }, responsible: "nurse", taskKind: 'nextStepsPatientEducation', taskLabel: "Edukace pacienta o dalším postupu" },

    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 2 }, responsible: "administrative", taskKind: 'stagingExaminationAppointmetsReservation', taskLabel: "Objenání stagingových vyšetření" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 2 }, responsible: "administrative", taskKind: 'followUpExaminationAppointmetReservation', taskLabel: "Objednání kontrolního vyšetření" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 2 }, responsible: "administrative", taskKind: 'stagingReportsDeliveryMethod', taskLabel: "Dohoda o způsobu předání nálezů stagingových vyšetření" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 2 }, responsible: "administrative", taskKind: 'preoperativeReportsDeliveryMethod', taskLabel: "Dohoda o způsobu předání nálezů předoperačních vyšetření" },
    { dueOffsetDays: 0, dueOffsetDeterminator: 'creation', procedureStep: { major: 1, minor: 2 }, responsible: "administrative", taskKind: 'questionnairePatientPreoperativeFulfill', taskLabel: "Pomoc s vyplněním předoperačního dotazníku" },

    { dueOffsetDays: -14, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 2, minor: 1 }, responsible: "patient", taskKind: 'stagingExaminationsCompletion', taskLabel: "Dodání nálezů stagingových vyšetření" },
    { dueOffsetDays: -14, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 2, minor: 1 }, responsible: "patient", taskKind: 'preoperativeExaminationsCompletion', taskLabel: "Dodání nálezů předoperačních vyšetření" },
    { dueOffsetDays: -14, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 2, minor: 1 }, responsible: "patient", taskKind: 'questionnairePatientPreoperativeCompletion', taskLabel: "Vyplnění předoperačního dotazníku" },
    { dueOffsetDays: -14, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 2, minor: 1 }, responsible: "patient", taskKind: 'nutritionalPreparationStarted', taskLabel: "Zahájena nutriční příprava" },
    { dueOffsetDays: -14, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 2, minor: 1 }, responsible: "patient", taskKind: 'prehabilitationStarted', taskLabel: "Zahájena prehabilitace" },

    { dueOffsetDays: -13, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 2, minor: 1 }, responsible: "administrative", taskKind: 'stagingExaminationsCompletionCheck', taskLabel: "Kontrola dodání nálezů stagingových vyšetření" },
    { dueOffsetDays: -13, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 2, minor: 1 }, responsible: "administrative", taskKind: 'preoperativeExaminationsCompletionCheck', taskLabel: "Kontrola dodání nálezů předoperačních vyšetření" },

    { dueOffsetDays: -10, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 3, minor: 1 }, responsible: "doctor", taskKind: 'finalDiagnosisConfirmation', taskLabel: "Definitivní potvrzení indikace" },

    { dueOffsetDays: -10, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 3, minor: 1 }, responsible: "administrative", taskKind: 'questionnairePatientPreoperativeCheckFinal', taskLabel: "Finální kontrola vyplnění předoperačního dotazníku" },
    { dueOffsetDays: -10, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 3, minor: 1 }, responsible: "administrative", taskKind: 'preoperativeExaminationsCompletionCheck2', taskLabel: "Kontrola dodání nálezů předoperačních vyšetření" },

    { dueOffsetDays: -5, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 4, minor: 1 }, responsible: "administrative", taskKind: 'preoperativeExaminationsCompletionCheckFinal', taskLabel: "Finální kontrola dodání nálezů předoperačních vyšetření" },
    { dueOffsetDays: -5, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 4, minor: 1 }, responsible: "administrative", taskKind: 'surgeryDateConfirmation', taskLabel: "Potvrzení termínu operace" },

    { dueOffsetDays: -2, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 5, minor: 1 }, responsible: "doctor", taskKind: 'additionalAnaestheticExaminations', taskLabel: "Anesteziologické vyšetření" },
    
    { dueOffsetDays: 0, dueOffsetDeterminator: 'surgeryDate', procedureStep: { major: 6, minor: 1 }, responsible: "doctor", taskKind: 'patientIntake', taskLabel: "Příjem do nemocnice" },
  ];

  const defaultDueDate = dateAddDays(60);

  let ranking = 0;
  return taskTemplates.map(
    (tt) =>
      ({
        dueDate: tt.dueOffsetDeterminator === "creation" ? new Date() : defaultDueDate,
        dueOffsetDays: tt.dueOffsetDays,
        dueOffsetDeterminator: tt.dueOffsetDeterminator,
        id: randomUUID(),
        procedureStep: procedureStepToDb(tt.procedureStep),
        ranking: ranking++,
        responsible: tt.responsible,
        taskKind: tt.taskKind,
        taskLabel: tt.taskLabel,
      }) satisfies Prisma.ProcedureTaskCreateManyProcedureInput,
  );
}

export async function serverRecalculateProcedureDueDates(input: { procedureId: string }) {
  const procedure = await prisma.procedure.findUnique({
    select: { createdAt: true, surgery: { select: { date: true } } },
    where: { id: input.procedureId },
  });
  if (procedure == null) throw new Error("Fatal: Procedure not found");

  const createdAt = procedure.createdAt;
  const surgeryDate = procedure.surgery?.date;

  const tasks = await prisma.procedureTask.findMany({
    select: {
      dueDate: true,
      dueOffsetDays: true,
      dueOffsetDeterminator: true,
      id: true,
    },
    where: {
      doneAt: null,
      procedureId: input.procedureId,
    },
  });

  for (const task of tasks) {
    let nextDueDate: Date | null = null;
    const dueOffsetDeterminator = task.dueOffsetDeterminator as ProcedureTaskDueOffsetDeterminator;

    if (dueOffsetDeterminator === "creation") {
      const c = dateAddDays(task.dueOffsetDays, createdAt);
      if (c != task.dueDate) nextDueDate = c;
    } else if (dueOffsetDeterminator === "surgeryDate" && surgeryDate) {
      let d = dateAddDays(task.dueOffsetDays, surgeryDate);
      // Do not go before creation date
      if (d < createdAt) {
        d = dateAddDays(2, createdAt);
      }
      if (d != task.dueDate) nextDueDate = d;
    }

    if (nextDueDate) {
      await prisma.procedureTask.update({
        data: { dueDate: nextDueDate },
        where: { id: task.id },
      });
    }
  }
}

type ServerDoneProcedureTaskOptions<TK extends ProcedureTaskKind> =
  ProcedureTaskResult<TK> extends null | undefined
    ? { taskKind: TK }
    : { result: ProcedureTaskResult<TK>; taskKind: TK };

export async function serverDoneProcedureTask<TK extends ProcedureTaskKind>(
  input:
    | {
        doneBy: string;
        procedureId: string;
        taskDescriptors: ServerDoneProcedureTaskOptions<TK>[];
      }
    | ({
        doneBy: string;
        procedureId: string;
      } & ServerDoneProcedureTaskOptions<TK>),
) {
  let taskKinds: TK[];
  let resultSettings: { result: null | Record<string, any>; taskKind: ProcedureTaskKind }[];

  if ("taskDescriptors" in input) {
    taskKinds = input.taskDescriptors.map((i) => i.taskKind);
    resultSettings = input.taskDescriptors.map<(typeof resultSettings)[number]>((i) => ({
      result: "result" in i ? i.result : null,
      taskKind: i.taskKind,
    }));
  } else {
    taskKinds = [input.taskKind];
    resultSettings = [{ result: "result" in input ? input.result : null, taskKind: input.taskKind }];
  }

  const tasks = await prisma.procedureTask.findMany({
    select: { id: true, taskKind: true },
    where: {
      procedureId: input.procedureId,
      taskKind: { in: taskKinds },
    },
  });

  for (const task of tasks) {
    const result = ((r) => (r == null ? null : JSON.stringify(r)))(
      resultSettings.find((i) => i.taskKind === task.taskKind)?.result,
    );
    await prisma.procedureTask.update({
      data: {
        doneAt: new Date(),
        doneBy: input.doneBy,
        result,
      },
      where: {
        id: task.id,
      },
    });
  }
}

export type ProcedureTask<TK extends ProcedureTaskKind> = {
  applicationFormId: null | string;
  createdAt: Date;
  doneAt: Date | null;
  doneBy: EmployeeBrief | null;
  doneByPatient: boolean | null;
  dueDate: Date;
  dueOffsetDays: number;
  dueOffsetDeterminator: ProcedureTaskDueOffsetDeterminator;
  formSubmitionId: null | string;
  id: string;
  outpatientReportId: null | string;
  patientMedicalTestId: null | string;
  procedureId: string;
  procedureStep: { major: number; minor: number };
  ranking: number;
  responsible: ProcedureTaskResponsible;
  result: ProcedureTaskResult<TK>;
  taskKind: TK;
  taskLabel: string;
  updatedAt: Date;
};

export async function serverFindProcedureTasks(input: {
  procedureId: string;
  responsible?: ProcedureTaskResponsible;
  step?: { major: number; minor?: number };
}): Promise<ProcedureTask<any>[]> {
  const rows = await prisma.procedureTask.findMany({
    orderBy: { ranking: "asc" },
    where: {
      procedureId: input.procedureId,
      procedureStep: input.step ? { startsWith: procedureStepToDb(input.step) } : undefined,
      responsible: input.responsible,
    },
  });

  const employeeBriefs = await serverFindEmployeeBriefs({
    employeeIds: rows.map((i) => i.doneBy).filter((i): i is string => !!i),
  });

  return rows.map<ProcedureTask<any>>((r) => ({
    applicationFormId: r.applicationFormId,
    createdAt: r.createdAt,
    doneAt: r.doneAt,
    doneBy: employeeBriefs.find((i) => i.id === r.doneBy) ?? null,
    doneByPatient: r.doneByPatient,
    dueDate: r.dueDate,
    dueOffsetDays: r.dueOffsetDays,
    dueOffsetDeterminator: r.dueOffsetDeterminator as ProcedureTaskDueOffsetDeterminator,
    formSubmitionId: r.formSubmitionId,
    id: r.id,
    outpatientReportId: r.outpatientReportId,
    patientMedicalTestId: r.patientMedicalTestId,
    procedureId: r.procedureId,
    procedureStep: procedureStepFromDb(r.procedureStep),
    ranking: r.ranking,
    responsible: r.responsible as ProcedureTaskResponsible,
    result: r.result == null ? null : JSON.parse(r.result),
    taskKind: r.taskKind,
    taskLabel: r.taskLabel,
    updatedAt: r.updatedAt,
  }));
}

export async function serverCountProcedureTasksForStep(input: {
  procedureId: string;
  responsible?: ProcedureTaskResponsible;
  status: "all" | "todo";
  step: { major: number; minor?: number };
  stepGt?: boolean;
  today?: boolean;
}): Promise<number> {
  return prisma.procedureTask.count({
    where: {
      doneAt: input.status === "todo" ? null : undefined,
      dueDate: input.today ? { lte: dateAddDays(1) } : undefined,
      procedureId: input.procedureId,
      procedureStep: !input.stepGt
        ? { startsWith: procedureStepToDb(input.step) }
        : { gte: procedureStepToDb({ ...input.step, minor: (input.step.minor ?? 0) + 1 }) },
      responsible: input.responsible,
    },
  });
}
