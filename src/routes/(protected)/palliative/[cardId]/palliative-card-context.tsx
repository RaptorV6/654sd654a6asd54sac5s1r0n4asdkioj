import type { Signal } from "@builder.io/qwik";

import {
  $,
  component$,
  createContextId,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import type { PalliativeCardForDisplay } from "../palliative-cards-rpc";
import type { TransformedInterventions } from "../palliative-functions";

type PalliativeCardContext = {
  card: { transformedInterventions: TransformedInterventions } & PalliativeCardForDisplay;
};

const PalliativeCardContextId = createContextId<PalliativeCardContext>("PalliativeCardContext");

export const usePalliativeCardContext = () => useContext(PalliativeCardContextId);

type PalliativeCardInterventionDialogsContext = {
  openCareEndDialogSig: Signal<boolean>;
  openNewInterventionDialogSig: Signal<boolean>;
  selectedInterventionIdSig: Signal<null | string>;
};

const PalliativeCardInterventionDialogsContextId = createContextId<PalliativeCardInterventionDialogsContext>(
  "PalliativeCardInterventionDialogsContext",
);

export const usePalliativeCardInterventionDialogsContext = () => useContext(PalliativeCardInterventionDialogsContextId);

type PalliativeCardProviderProps = {
  card: { transformedInterventions: TransformedInterventions } & PalliativeCardForDisplay;
};

export const PalliativeCardProvider = component$<PalliativeCardProviderProps>(({ card }) => {
  const location = useLocation();

  const contextStore = useStore<PalliativeCardContext>({
    card,
  });

  useContextProvider(PalliativeCardContextId, contextStore);

  const openCareEndDialogSig = useSignal(false);
  const openNewInterventionDialogSig = useSignal(false);
  const selectedInterventionIdSig = useSignal<null | string>(null);

  useContextProvider(PalliativeCardInterventionDialogsContextId, {
    openCareEndDialogSig,
    openNewInterventionDialogSig,
    selectedInterventionIdSig,
  });

  const dialogOpenByUrlQuery = $((): void => {
    if (location.url.search === "?new-intervention-dialog") {
      openNewInterventionDialogSig.value = true;
    } else if (location.url.search.startsWith("?intervention-update-dialog")) {
      const interventionId = location.url.searchParams.get("intervention-update-dialog");
      if (interventionId) {
        selectedInterventionIdSig.value = interventionId;
      }
    } else if (location.url.search === "?care-end-dialog") {
      openCareEndDialogSig.value = true;
    } else {
      selectedInterventionIdSig.value = null;
      openNewInterventionDialogSig.value = false;
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => location.url.search);
    dialogOpenByUrlQuery();
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    dialogOpenByUrlQuery();
  });

  return <Slot />;
});
