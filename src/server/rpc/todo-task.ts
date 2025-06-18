import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import { Prisma } from "@prisma/client";

import { prisma } from "./mock-db-prisma";

const todoTaskSelectFields = Prisma.validator()({
  dueDate: true,
  href: true,
  id: true,
  procedures: {
    select: {
      procedureId: true,
    },
  },
  subTitle: true,
  title: true,
} satisfies Prisma.TodoTaskSelect);

export async function serverFindActiveTodoTasksDueByDepartnemt(
  env: EnvGetter,
  input: {
    department: string;
    departmentRole?: string;
  },
) {
  return (
    await prisma.todoTask.findMany({
      select: todoTaskSelectFields,
      where: {
        doneAt: null,
        dueByDepartment: input.department,
        dueByDepartmentRole: input.departmentRole,
      },
    })
  ).map(({ procedures, ...tt }) => ({
    ...tt,
    procedureId: procedures[0]?.procedureId ?? null,
  }));
}

export async function serverCreateTodoTask(
  env: EnvGetter,
  input: {
    dueByDepartment: string;
    dueByDepartmentRole?: string;
    dueDate?: Date;
    href?: string;
    procedureId?: string;
    subTitle?: string;
    title: string;
  },
) {
  return prisma.todoTask.create({
    data: {
      dueByDepartment: input.dueByDepartment,
      dueByDepartmentRole: input.dueByDepartmentRole,
      dueDate: input.dueDate,
      href: input.href,
      subTitle: input.subTitle,
      title: input.title,
      ...(input.procedureId
        ? {
            procedures: {
              create: {
                procedureId: input.procedureId,
              },
            },
          }
        : {}),
    },
    select: todoTaskSelectFields,
  });
}
