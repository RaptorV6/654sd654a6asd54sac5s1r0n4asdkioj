import type { QRL, Signal } from "@builder.io/qwik";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogContentDescription,
  AlertDialogContentTitle,
  AlertDialogFooter,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@akeso/ui-components";
import { $, component$, useComputed$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import type { OjpEvent, OjpSal } from "./_mock-events";

import { addOjpEvent, deleteOjpEvent, updateOjpEvent } from "./_actions";
import { OjpModalContent } from "./ojp-modal-content";
import { OjpModalPreview } from "./ojp-modal-preview";
import { allProcedures } from "./ojp-procedure-data";

type TabType = "pauzy" | "pridat" | "vlastni";

type OjpModalProps = {
  "bind:show": Signal<boolean>;
  eventSignal?: Signal<null | OjpEvent>;
  eventsSignal?: Signal<OjpEvent[]>;
  initialData?: {
    dateTime?: Date;
    sal?: OjpSal;
  };
  mode: "edit" | "new";
  refreshTrigger: Signal<number>;
};

export const OjpModal = component$<OjpModalProps>(
  ({ "bind:show": showSig, eventSignal, eventsSignal, initialData, mode, refreshTrigger }) => {
    const activeTab = useSignal<TabType>("pridat");
    const isLoading = useSignal(false);
    const errorMessage = useSignal("");

    // AlertDialog signals
    const confirmDialogShow = useSignal(false);
    const confirmDialogReturnValue = useSignal("");

    // Confirmation dialog data
    const confirmDialog = useStore({
      message: "",
      onConfirm: null as null | QRL<() => void>,
      severity: "danger" as "danger" | "warning",
      title: "",
    });

    const modalData = useStore({
      casOd: "",
      datum: "",
      operator: "",
      procedure: null as any,
      repeatCount: 1,
      sal: "",
      separators: {} as Record<number, any>,
      typ: "",
      vykon: "",
    });

    // Original data for change detection - separované aby se předešlo reference sharing
    const originalData = useStore({
      casOd: "",
      datum: "",
      operator: "",
      procedure: null as any,
      sal: "",
      separatorId: "", // ✅ ZMĚNA: trackuj jen ID místo objektu
      typ: "",
      vykon: "",
    });

    // Get current event from signal
    const currentEvent = useComputed$(() => eventSignal?.value || null);

    // Computed: detect changes for edit mode
    const hasChanges = useComputed$(() => {
      if (mode === "new") return true;

      // ✅ OPRAVA: porovnávej separator ID místo celého objektu
      const currentSeparatorId = modalData.separators[1]?.id || "";

      return (
        modalData.casOd !== originalData.casOd ||
        modalData.datum !== originalData.datum ||
        modalData.operator !== originalData.operator ||
        modalData.sal !== originalData.sal ||
        modalData.typ !== originalData.typ ||
        modalData.vykon !== originalData.vykon ||
        modalData.procedure?.id !== originalData.procedure?.id ||
        currentSeparatorId !== originalData.separatorId
      );
    });

    // Computed: najít navazující úklid
    const relatedCleanup = useComputed$(() => {
      if (mode !== "edit" || !currentEvent.value || !eventsSignal?.value.length) return null;

      const events = eventsSignal.value;
      const current = currentEvent.value;
      return (
        events.find(
          (e) =>
            e.typ === "uklid" &&
            e.sal === current.sal &&
            Math.abs(e.dateFrom.getTime() - current.dateTo.getTime()) < 10 * 60 * 1000,
        ) || null
      );
    });

    // Computed: najít celou sérii (operace + úklidy)
    const relatedSeries = useComputed$(() => {
      if (mode !== "edit" || !currentEvent.value || !eventsSignal?.value.length) return [];

      const events = eventsSignal.value;
      const current = currentEvent.value;
      const series = [current];

      // Najít všechny navazující úklidy
      let lastEvent = current;
      let nextCleanup = events.find(
        (e) =>
          e.typ === "uklid" &&
          e.sal === lastEvent.sal &&
          Math.abs(e.dateFrom.getTime() - lastEvent.dateTo.getTime()) < 10 * 60 * 1000,
      );

      while (nextCleanup) {
        series.push(nextCleanup);
        lastEvent = nextCleanup;

        // Najít další úklid
        nextCleanup = events.find(
          (e) =>
            e.typ === "uklid" &&
            e.sal === lastEvent.sal &&
            Math.abs(e.dateFrom.getTime() - lastEvent.dateTo.getTime()) < 10 * 60 * 1000,
        );
      }

      return series;
    });

    const separatorOptions = useComputed$(() => {
      return allProcedures
        .filter(
          (proc) =>
            proc.type === "Úklid" ||
            (proc.secondIdSurgeonSurgery &&
              (proc.secondIdSurgeonSurgery.includes("Úklid sálu běžný") ||
                proc.secondIdSurgeonSurgery.includes("Úklid sálu  po TEP"))),
        )
        .map((proc) => ({
          duration: proc.duration,
          id: proc.id,
          name: proc.secondIdSurgeonSurgery || "Úklid",
        }));
    });

    // Load data when modal opens
    useTask$(({ track }) => {
      track(() => showSig.value);
      track(() => eventSignal?.value);
      track(() => mode);
      track(() => relatedCleanup.value);

      const event = eventSignal?.value;

      if (!showSig.value) return;

      // Clear error
      errorMessage.value = "";

      if (mode === "edit" && event) {
        // Determine tab based on event type
        let tab: TabType = "pridat";
        if (event.typ === "pauza" || event.typ === "uklid") {
          tab = "pauzy";
        } else if (event.typ === "svatek") {
          tab = "vlastni";
        }
        activeTab.value = tab;

        // Find matching procedure
        const procedure = allProcedures.find((p) => {
          // Exact matches first
          if (p.surgery === event.title) return true;
          if (p.secondIdSurgeonSurgery === event.title) return true;

          // Partial matches for complex titles
          if (p.secondIdSurgeonSurgery && event.title.includes(p.secondIdSurgeonSurgery)) return true;
          if (event.title.includes(p.surgery)) return true;

          return false;
        });

        // Najít odpovídající separator na základě nalezeného úklidu
        const cleanup = relatedCleanup.value;
        let selectedSeparator = separatorOptions.value[0]; // default

        if (cleanup) {
          const foundSeparator = separatorOptions.value.find(
            (sep) => sep.name === cleanup.title || sep.duration === cleanup.duration,
          );
          if (foundSeparator) {
            selectedSeparator = foundSeparator;
          }
        }

        // Prepare event data
        const eventData = {
          casOd: event.dateFrom.toTimeString().slice(0, 5),
          datum: event.dateFrom.toISOString().split("T")[0],
          operator: event.operator || "",
          procedure: procedure || null,
          repeatCount: 1,
          sal: event.sal,
          separators: { 1: selectedSeparator },
          typ: procedure?.type || event.typ,
          vykon: procedure?.surgery || event.title,
        };

        // ✅ OPRAVA: separátní ukládání original data
        const originalEventData = {
          casOd: event.dateFrom.toTimeString().slice(0, 5),
          datum: event.dateFrom.toISOString().split("T")[0],
          operator: event.operator || "",
          procedure: procedure || null,
          sal: event.sal,
          separatorId: selectedSeparator.id, // ✅ jen ID
          typ: procedure?.type || event.typ,
          vykon: procedure?.surgery || event.title,
        };

        Object.assign(modalData, eventData);
        Object.assign(originalData, originalEventData);
      } else if (mode === "new") {
        // Reset for new mode
        activeTab.value = "pridat";

        const newData = {
          casOd: initialData?.dateTime ? initialData.dateTime.toTimeString().slice(0, 5) : "",
          datum: initialData?.dateTime ? initialData.dateTime.toISOString().split("T")[0] : "",
          operator: "",
          procedure: null,
          repeatCount: 1,
          sal: initialData?.sal || "",
          separators: {},
          typ: "",
          vykon: "",
        };

        Object.assign(modalData, newData);
        Object.assign(originalData, {
          casOd: "",
          datum: "",
          operator: "",
          procedure: null,
          sal: "",
          separatorId: "",
          typ: "",
          vykon: "",
        });
      }
    });

    const closeModal = $(() => {
      showSig.value = false;
      errorMessage.value = "";
      activeTab.value = "pridat";

      // Reset data
      Object.assign(modalData, {
        casOd: "",
        datum: "",
        operator: "",
        procedure: null,
        repeatCount: 1,
        sal: "",
        separators: {},
        typ: "",
        vykon: "",
      });

      Object.assign(originalData, {
        casOd: "",
        datum: "",
        operator: "",
        procedure: null,
        sal: "",
        separatorId: "",
        typ: "",
        vykon: "",
      });
    });

    const handleDelete = $(() => {
      const event = currentEvent.value;
      if (!event) return;

      const series = relatedSeries.value;
      const seriesCount = series.length;

      confirmDialog.title = "Smazat události";
      confirmDialog.message = `Opravdu chcete smazat ${seriesCount > 1 ? `${seriesCount} souvisejících událostí` : "událost"} "${event.title}"${seriesCount > 1 ? " včetně navazujících úklidů?" : "?"}`;
      confirmDialog.severity = "danger";
      confirmDialog.onConfirm = $(() => {
        // Smazat celou sérii
        let hasError = false;
        for (const seriesEvent of series) {
          const result = deleteOjpEvent({ id: seriesEvent.id });
          if (result.failed) {
            hasError = true;
            errorMessage.value = result.message || "Nastala chyba při mazání";
            break;
          }
        }

        if (!hasError) {
          refreshTrigger.value = Date.now();
          closeModal();
        }
        confirmDialogShow.value = false;
      });

      confirmDialogShow.value = true;
    });

    const executeSave = $(async () => {
      if (!modalData.procedure || !modalData.datum || !modalData.casOd || !modalData.sal) {
        errorMessage.value = "Vyplňte všechny povinné údaje";
        return;
      }

      try {
        isLoading.value = true;
        errorMessage.value = "";

        if (mode === "edit") {
          const event = currentEvent.value;
          const series = relatedSeries.value;

          if (!event) {
            errorMessage.value = "Chyba při načítání události";
            return;
          }

          if (activeTab.value === "pauzy" || activeTab.value === "vlastni") {
            // Jednoduchý update pro pauzy/vlastní
            const startTime = new Date(`${modalData.datum}T${modalData.casOd}`);
            const endTime = new Date(startTime.getTime() + modalData.procedure.duration * 60 * 1000);

            const updateData = {
              casDo: endTime.toTimeString().slice(0, 5),
              casOd: modalData.casOd,
              datum: modalData.datum,
              id: event.id,
              operator: modalData.operator || undefined,
              poznamka: modalData.procedure.type || undefined,
              sal: modalData.sal,
              title: modalData.procedure.secondIdSurgeonSurgery || modalData.procedure.surgery,
              typ: activeTab.value === "pauzy" ? "pauza" : "svatek",
            };

            const result = updateOjpEvent(updateData);
            if (result.failed) {
              errorMessage.value = result.message || "Nastala chyba při ukládání";
              return;
            }
          } else {
            // Update operace + separator série s posunem
            const startTime = new Date(`${modalData.datum}T${modalData.casOd}`);
            let currentTime = startTime;

            // ✅ PŘED UPDATE: zjisti rozdíl v délce separátoru
            const cleanupEvent = series.find((e) => e.typ === "uklid");
            const newSeparator = modalData.separators[1] || separatorOptions.value[0];
            const oldSeparatorDuration = cleanupEvent?.duration || 0;
            const newSeparatorDuration = newSeparator.duration;
            const durationDiff = newSeparatorDuration - oldSeparatorDuration; // v minutách

            // Update operace
            const operationEndTime = new Date(currentTime.getTime() + modalData.procedure.duration * 60 * 1000);

            const operationUpdateData = {
              casDo: operationEndTime.toTimeString().slice(0, 5),
              casOd: modalData.casOd,
              datum: modalData.datum,
              id: event.id,
              operator: modalData.operator || undefined,
              poznamka: modalData.procedure.type || undefined,
              sal: modalData.sal,
              title: modalData.procedure.secondIdSurgeonSurgery || modalData.procedure.surgery,
              typ: "operace",
            };

            const operationResult = updateOjpEvent(operationUpdateData);
            if (operationResult.failed) {
              errorMessage.value = operationResult.message || "Nastala chyba při ukládání operace";
              return;
            }

            currentTime = operationEndTime;

            // Update separator
            if (cleanupEvent) {
              const separatorEndTime = new Date(currentTime.getTime() + newSeparator.duration * 60 * 1000);

              const separatorUpdateData = {
                casDo: separatorEndTime.toTimeString().slice(0, 5),
                casOd: currentTime.toTimeString().slice(0, 5),
                datum: modalData.datum,
                id: cleanupEvent.id,
                operator: undefined,
                poznamka: undefined,
                sal: modalData.sal,
                title: newSeparator.name,
                typ: "uklid",
              };

              const separatorResult = updateOjpEvent(separatorUpdateData);
              if (separatorResult.failed) {
                errorMessage.value = separatorResult.message || "Nastala chyba při ukládání úklidu";
                return;
              }

              // ✅ POSUN následujících událostí
              if (durationDiff !== 0 && eventsSignal?.value) {
                const allEvents = eventsSignal.value;
                const oldSeparatorEndTime = cleanupEvent.dateTo.getTime();

                // Najít všechny události ve stejném sále které začínají po původním konci separátoru
                const eventsToShift = allEvents.filter(
                  (e) =>
                    e.sal === modalData.sal &&
                    e.dateFrom.getTime() >= oldSeparatorEndTime - 60000 && // tolerance 1 min
                    e.id !== event.id &&
                    e.id !== cleanupEvent.id,
                );

                // Posunout všechny následující události
                for (const eventToShift of eventsToShift) {
                  const newStartTime = new Date(eventToShift.dateFrom.getTime() + durationDiff * 60 * 1000);
                  const newEndTime = new Date(eventToShift.dateTo.getTime() + durationDiff * 60 * 1000);

                  const shiftUpdateData = {
                    casDo: newEndTime.toTimeString().slice(0, 5),
                    casOd: newStartTime.toTimeString().slice(0, 5),
                    datum: newStartTime.toISOString().split("T")[0],
                    id: eventToShift.id,
                    operator: eventToShift.operator || undefined,
                    poznamka: eventToShift.poznamka || undefined,
                    sal: eventToShift.sal,
                    title: eventToShift.title,
                    typ: eventToShift.typ,
                  };

                  updateOjpEvent(shiftUpdateData);
                  // Pokračuj i při chybě posunu
                }
              }
            }
          }
        } else {
          // Create new event(s) - existing logic
          if (activeTab.value === "pauzy" || activeTab.value === "vlastni") {
            const startTime = new Date(`${modalData.datum}T${modalData.casOd}`);
            const endTime = new Date(startTime.getTime() + modalData.procedure.duration * 60 * 1000);

            const eventData = {
              casDo: endTime.toTimeString().slice(0, 5),
              casOd: modalData.casOd,
              datum: modalData.datum,
              operator: modalData.operator || undefined,
              poznamka: modalData.procedure.type || undefined,
              sal: modalData.sal,
              title: modalData.procedure.secondIdSurgeonSurgery || modalData.procedure.surgery,
              typ: activeTab.value === "pauzy" ? "pauza" : "svatek",
            };

            const result = addOjpEvent(eventData);

            if (result.failed) {
              errorMessage.value = result.message || "Nastala chyba při ukládání";
              return;
            }
          } else {
            // Series creation for "pridat" tab
            let currentTime = new Date(`${modalData.datum}T${modalData.casOd}`);

            for (let i = 0; i < modalData.repeatCount; i++) {
              const operationNumber = i + 1;

              // Add operation
              const endTime = new Date(currentTime.getTime() + modalData.procedure.duration * 60 * 1000);

              const procedureEventData = {
                casDo: endTime.toTimeString().slice(0, 5),
                casOd: currentTime.toTimeString().slice(0, 5),
                datum: modalData.datum,
                operator: modalData.operator || undefined,
                poznamka: modalData.procedure.type || undefined,
                sal: modalData.sal,
                title: modalData.procedure.secondIdSurgeonSurgery || modalData.procedure.surgery,
                typ: "operace",
              };

              const result = addOjpEvent(procedureEventData);
              if (result.failed) {
                errorMessage.value = result.message || "Nastala chyba při ukládání";
                return;
              }

              currentTime = endTime;

              // Add separator
              const separator = modalData.separators[operationNumber] || separatorOptions.value[0];
              const separatorEndTime = new Date(currentTime.getTime() + separator.duration * 60 * 1000);

              const separatorEventData = {
                casDo: separatorEndTime.toTimeString().slice(0, 5),
                casOd: currentTime.toTimeString().slice(0, 5),
                datum: modalData.datum,
                operator: undefined,
                poznamka: undefined,
                sal: modalData.sal,
                title: separator.name,
                typ: "uklid",
              };

              const separatorResult = addOjpEvent(separatorEventData);
              if (separatorResult.failed) {
                errorMessage.value = separatorResult.message || "Nastala chyba při ukládání ÚS";
                return;
              }

              currentTime = separatorEndTime;
            }
          }
        }

        refreshTrigger.value = Date.now();
        closeModal();
      } catch {
        errorMessage.value = "Nastala chyba při ukládání";
      } finally {
        isLoading.value = false;
      }
    });

    const handleSave = $(() => {
      if (mode === "edit" && hasChanges.value) {
        // Show confirmation for edit with changes
        confirmDialog.title = "Uložit změny";
        confirmDialog.message = "Chcete uložit provedené změny?";
        confirmDialog.severity = "warning";
        confirmDialog.onConfirm = $(() => {
          executeSave();
          confirmDialogShow.value = false;
        });
        confirmDialogShow.value = true;
      } else {
        // Direct save for new or edit without changes
        executeSave();
      }
    });

    const handleConfirmCancel = $(() => {
      confirmDialogShow.value = false;
    });

    return (
      <>
        <Dialog bind:show={showSig} closeButton>
          <DialogHeader>
            <div class="flex w-full items-center justify-between">
              <div class="flex gap-3">
                <Button
                  class="transition-all duration-300"
                  onClick$={() => (activeTab.value = "pridat")}
                  severity={activeTab.value === "pridat" ? "accent" : "none"}
                  size="sm"
                  type="button"
                  variant={activeTab.value === "pridat" ? "contained" : "outline"}
                >
                  {mode === "edit" ? "Upravit událost" : "Přidat událost"}
                </Button>
                <Button
                  class="transition-all duration-300"
                  onClick$={() => (activeTab.value = "pauzy")}
                  severity={activeTab.value === "pauzy" ? "accent" : "none"}
                  size="sm"
                  type="button"
                  variant={activeTab.value === "pauzy" ? "contained" : "outline"}
                >
                  Pauzy
                </Button>
                <Button
                  class="transition-all duration-300"
                  onClick$={() => (activeTab.value = "vlastni")}
                  severity={activeTab.value === "vlastni" ? "accent" : "none"}
                  size="sm"
                  type="button"
                  variant={activeTab.value === "vlastni" ? "contained" : "outline"}
                >
                  Vlastní
                </Button>
              </div>
            </div>
          </DialogHeader>

          <DialogBody class="max-h-[800px] w-[1400px] overflow-y-auto">
            <div class="space-y-6">
              <OjpModalContent
                activeTab={activeTab.value}
                data={modalData}
                errorMessage={errorMessage.value}
                showSignal={showSig}
              />
              <OjpModalPreview activeTab={activeTab.value} data={modalData} separatorOptions={separatorOptions.value} />
            </div>
          </DialogBody>

          <DialogFooter class="flex justify-between">
            <div>
              {mode === "edit" && (
                <Button onClick$={handleDelete} severity="danger" size="sm" type="button" variant="contained">
                  Smazat
                </Button>
              )}
            </div>
            <div class="flex gap-3">
              <Button onClick$={closeModal} size="sm" type="button" variant="outline">
                Zrušit
              </Button>
              <Button
                disabled={!modalData.procedure || isLoading.value || (mode === "edit" && !hasChanges.value)}
                onClick$={handleSave}
                severity="accent"
                size="sm"
                type="button"
                variant="contained"
              >
                {isLoading.value ? "Ukládám..." : mode === "edit" ? "Uložit" : "Přidat"}
              </Button>
            </div>
          </DialogFooter>
        </Dialog>

        {/* Confirmation Dialog */}
        <AlertDialog bind:returnValue={confirmDialogReturnValue} bind:show={confirmDialogShow}>
          <AlertDialogContent severity={confirmDialog.severity}>
            <AlertDialogContentTitle>{confirmDialog.title}</AlertDialogContentTitle>
            <AlertDialogContentDescription>{confirmDialog.message}</AlertDialogContentDescription>
          </AlertDialogContent>
          <AlertDialogFooter>
            <Button onClick$={handleConfirmCancel} type="button" variant="outline">
              Ne
            </Button>
            <Button
              onClick$={confirmDialog.onConfirm || $(() => {})}
              severity={confirmDialog.severity === "danger" ? "danger" : "accent"}
              type="button"
              variant="contained"
            >
              Ano
            </Button>
          </AlertDialogFooter>
        </AlertDialog>
      </>
    );
  },
);
