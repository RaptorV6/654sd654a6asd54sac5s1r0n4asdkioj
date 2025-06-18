import type { TimelineSlotProps } from "@akeso/ui-components";

import { Timeline } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import { RoleTag } from "~/components/role-tag";

import { MyTimelineSlot } from "./my-timeline-slot";
import { useProcedureContext } from "./procedure-provider";

export const ColorectalCancerChecklist = component$(() => {
  const { procedure } = useProcedureContext();
  const now = new Date();
  const procedureStep = procedure.step;

  return (
    <Timeline>
      {procedure.tasks.map((task) => {
        let severity: TimelineSlotProps["severity"] = "none";
        let pulse: boolean = false;

        const { doneAt, dueDate, responsible } = task;

        if (doneAt != null) {
          severity = "success";
        } else if (procedure.step.major === 1 && task.procedureStep.major === 1) {
          severity = "progress";
          pulse = true;
        } else if (dueDate < now) {
          severity = "warning";
          pulse = true;
        } else if (responsible === "patient" && procedureStep.major === 2) {
          severity = "progress";
          pulse = true;
        }

        const title = (
          <span class="text-sm">
            {task.taskLabel} <RoleTag role={task.responsible as any} size="sm" />
          </span>
        );

        // const title = task.taskKind;

        return (
          <MyTimelineSlot
            doneAt={doneAt}
            doneBy={task.doneBy?.fullName}
            key={task.id}
            pulse={pulse}
            severity={severity}
            title={title}
          />
        );
      })}
    </Timeline>
  );
});
