import type { QRL } from "@builder.io/qwik";

import {
  $,
  component$,
  createContextId,
  Slot,
  useContext,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import type { SubscriptionHandler } from "~/subscriptions";

import { useSubscription } from "~/subscriptions";

import {
  type ExpectationDetailData,
  fetchExpectationDetailInvasion,
  fetchExpectationDetailMedication,
  fetchExpectationDetailOrdination,
  fetchExpectationDetailPhysiologicFunction,
  fetchExpectationDetailScalars,
} from "./fetch-expectation-detail";

export type ExpectationDetailContext = {
  expectation: ExpectationDetailData;
  updateExpectation: QRL<(nextExpectation: Partial<ExpectationDetailData>) => void>;
};

const ExpectationDetailContextId = createContextId<ExpectationDetailContext>("ExpectationDetailContext");

type ExpectationDetailProviderProps = {
  detail: ExpectationDetailData;
};

export const ExpectationDetailProvider = component$<ExpectationDetailProviderProps>(({ detail }) => {
  const contextStore = useStore<ExpectationDetailContext>({
    expectation: detail,
    updateExpectation: $(function (this: ExpectationDetailContext, nextExpectation) {
      this.expectation = { ...this.expectation, ...nextExpectation };
    }),
  });

  useTask$(({ track }) => {
    const d = track(() => detail);
    contextStore.expectation = d;
  });

  useContextProvider(ExpectationDetailContextId, contextStore);

  const handleExpectationRemoteChange$: SubscriptionHandler = $(async (message) => {
    const o = await loadExpectationScalars$(message.objectId);
    if (o && contextStore.expectation.id === o.id) {
      contextStore.expectation = {
        ...contextStore.expectation,
        ...o,
      };
    }
  });
  useSubscription("INTERNS_AMP_EXPECTATION_UPDATED", handleExpectationRemoteChange$);

  const handleExpectationInvasionRemoteChange$: SubscriptionHandler = $(async (message) => {
    const o = await loadExpectationInvasion$(message.objectId);
    if (o != null && contextStore.expectation.id === o.expectationId) {
      const n = updateArrayItem(o, contextStore.expectation.invasions);
      contextStore.expectation.invasions = n;
    }
  });
  useSubscription("INTERNS_AMP_EXPECTATION_INVASION_CREATED", handleExpectationInvasionRemoteChange$);
  useSubscription("INTERNS_AMP_EXPECTATION_INVASION_UPDATED", handleExpectationInvasionRemoteChange$);

  const handleExpectationMedicationRemoteChange$: SubscriptionHandler = $(async (message) => {
    const o = await loadExpectationMedication$(message.objectId);
    if (o != null && contextStore.expectation.id === o.expectationId) {
      const n = updateArrayItem(o, contextStore.expectation.medications);
      contextStore.expectation.medications = n;
    }
  });
  useSubscription("INTERNS_AMP_EXPECTATION_MEDICATION_CREATED", handleExpectationMedicationRemoteChange$);
  useSubscription("INTERNS_AMP_EXPECTATION_MEDICATION_UPDATED", handleExpectationMedicationRemoteChange$);

  const handleExpectationOrdinationRemoteChange$: SubscriptionHandler = $(async (message) => {
    const o = await loadExpectationOrdination$(message.objectId);
    if (o != null && contextStore.expectation.id === o.expectationId) {
      const n = updateArrayItem(o, contextStore.expectation.ordinations);
      contextStore.expectation.ordinations = n;
    }
  });
  useSubscription("INTERNS_AMP_EXPECTATION_ORDINATION_CREATED", handleExpectationOrdinationRemoteChange$);
  useSubscription("INTERNS_AMP_EXPECTATION_ORDINATION_UPDATED", handleExpectationOrdinationRemoteChange$);

  const handleExpectationPhysiologicFunctionRemoteChange$: SubscriptionHandler = $(async (message) => {
    const o = await loadExpectationPhysio$(message.objectId);
    if (o != null && contextStore.expectation.id === o.expectationId) {
      const n = updateArrayItem(o, contextStore.expectation.physiologicFunctions);
      contextStore.expectation.physiologicFunctions = n;
    }
  });
  useSubscription(
    "INTERNS_AMP_EXPECTATION_PHYSIOLOGIC_FUNCTION_CREATED",
    handleExpectationPhysiologicFunctionRemoteChange$,
  );
  useSubscription(
    "INTERNS_AMP_EXPECTATION_PHYSIOLOGIC_FUNCTION_UPDATED",
    handleExpectationPhysiologicFunctionRemoteChange$,
  );

  return <Slot />;
});

export const useExpectationDetailContext = () => useContext(ExpectationDetailContextId);

function updateArrayItem<T extends { id: string }>(o: null | T, arr: null | T[]): T[] {
  if (!o) return arr ?? [];
  if (arr == null) return [o];

  const idx = arr.findIndex((i) => i.id === o.id);
  const next = [...arr];

  if (idx === -1) return [o, ...next];

  next[idx] = o;
  return next;
}

const loadExpectationScalars$ = server$(async function (id: string) {
  return fetchExpectationDetailScalars(this.env, id);
});

const loadExpectationInvasion$ = server$(async function (id: string) {
  return fetchExpectationDetailInvasion(this.env, id);
});

const loadExpectationMedication$ = server$(async function (id: string) {
  return fetchExpectationDetailMedication(this.env, id);
});

const loadExpectationOrdination$ = server$(async function (id: string) {
  return fetchExpectationDetailOrdination(this.env, id);
});

const loadExpectationPhysio$ = server$(async function (id: string) {
  return fetchExpectationDetailPhysiologicFunction(this.env, id);
});
