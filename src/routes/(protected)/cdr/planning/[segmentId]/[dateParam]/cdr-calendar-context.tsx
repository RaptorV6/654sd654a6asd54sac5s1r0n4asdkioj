import { component$, createContextId, Slot, useContext, useContextProvider, useStore } from "@builder.io/qwik";

import type { CdrCalendarEventWithDateToAndDuration } from "./cdr-calendar-loaders";

export type CdrCalendarContext = {
  editData:
    | { data: { startDateTime: Date }; mode: "new" }
    | { data: CdrCalendarEventWithDateToAndDuration; mode: "edit" }
    | null;
  previewData: CdrCalendarEventWithDateToAndDuration | null;
  selectedStationId: string;
};

const CdrCalendarContextId = createContextId<CdrCalendarContext>("CdrCalendarContext");

type CdrCalendarProviderProps = {
  selectedStationId: string;
};

export const CdrCalendarProvider = component$<CdrCalendarProviderProps>((props) => {
  const contextStore = useStore<Omit<CdrCalendarContext, "editDialogOpenSig">>({
    editData: null,
    previewData: null,
    selectedStationId: props.selectedStationId,
  });

  useContextProvider(CdrCalendarContextId, contextStore);

  return (
    <>
      <Slot />
    </>
  );
});

export const useCdrCalendarContext = () => useContext(CdrCalendarContextId);
