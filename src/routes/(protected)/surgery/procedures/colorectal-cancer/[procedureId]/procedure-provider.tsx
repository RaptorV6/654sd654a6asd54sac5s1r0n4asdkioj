import {
  component$,
  createContextId,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

import type { Procedure } from "~/server/rpc/procedure";
import type { ProcedureCurrentActivity } from "~/server/rpc/procedure-tasks";

type ProcedureContext = {
  activity: ProcedureCurrentActivity;
  procedure: Procedure;
};

const ProcedureContextId = createContextId<ProcedureContext>("ProcedureContextId");

export function useProcedureContext() {
  return useContext(ProcedureContextId);
}

type ProcedureProviderProps = ProcedureContext;

export const ProcedureContext = component$(({ activity, procedure }: ProcedureProviderProps) => {
  const currentActivity = useSignal(activity);
  const procedureContextStore = useStore<ProcedureContext>({ activity, procedure });
  useContextProvider(ProcedureContextId, procedureContextStore);

  // Fix scroll to pop of page
  useTask$(({ track }) => {
    const act = track(() => activity);
    if (isBrowser && act !== currentActivity.value) {
      window.scrollTo(0, 0);
      currentActivity.value = act;
    }
  });

  useTask$(({ track }) => {
    track(() => activity);
    track(() => procedure);

    procedureContextStore.activity = activity;
    procedureContextStore.procedure = procedure;
  });

  return <Slot />;
});
