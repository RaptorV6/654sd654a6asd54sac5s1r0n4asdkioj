import type { ProcedureTask, ProcedureTaskKind } from "~/server/rpc/procedure-tasks";

import { useProcedureContext } from "./procedure-provider";

type CreateFindTaskResult = {
  findTask: <K extends ProcedureTaskKind>(taskKind: K) => ProcedureTask<K> | undefined;
  isTaskDone: <K extends ProcedureTaskKind>(taskKind: K) => boolean;
};

export function useFindTask(): CreateFindTaskResult {
  const { procedure } = useProcedureContext();
  const procedureTasks = procedure.tasks;

  const findTask: CreateFindTaskResult["findTask"] = (taskKind) => procedureTasks.find((t) => t.taskKind === taskKind);
  const isTaskDone: CreateFindTaskResult["isTaskDone"] = (taskKind) => findTask(taskKind)?.doneAt != null;

  return { findTask, isTaskDone };
}
