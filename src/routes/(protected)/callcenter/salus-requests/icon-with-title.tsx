import type { JSXOutput } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

import { AddProfileIcon, ChangeProfileDataIcon, NewAccountIcon, NewAppointmentIcon } from "~/icons";

import type { PatientRequestWithPatient } from "./types";

type IconWithTitleProps = {
  employeeResponsibleId: null | string;
  requestId: string;
  requestType: PatientRequestWithPatient["requestType"];
};

export const IconWithTitle = component$<IconWithTitleProps>(({ employeeResponsibleId, requestId, requestType }) => {
  const getIconClass = (baseClass: string) => (employeeResponsibleId ? "text-app-icon-base" : baseClass);

  let icon: JSXOutput | null = null;
  let title = "";

  switch (requestType) {
    case "addDependentProfile":
      icon = <AddProfileIcon class={getIconClass("text-accent-500")} />;
      title = "Žádost o přidání podřízeného profilu";
      break;
    case "appointmentAssign":
      icon = <NewAppointmentIcon class={getIconClass("text-danger-500")} />;
      title = "Žádost o objednání";
      break;
    case "profileActivation":
      icon = <NewAccountIcon class="text-success-400" />;
      title = "Žádost o aktivaci účtu";
      break;
    case "profileDataChange":
      icon = <ChangeProfileDataIcon class={getIconClass("text-highlight-400")} />;
      title = "Žádost o změnu údajů";
      break;
    default:
      icon = null;
      title = "Neznámý typ žádosti";
  }

  return (
    <>
      <div class="mb-4 flex flex-row items-center gap-4 md:mb-0">
        <div class="mb-auto">{icon}</div>
        <div class="space-y-2 font-bold">
          <p>{title}</p>
          <p>{requestId}</p>
        </div>
      </div>
    </>
  );
});
