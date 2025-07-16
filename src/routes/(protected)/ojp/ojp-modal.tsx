/* eslint-disable no-console */
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
  initialData?: {
    dateTime?: Date;
    sal?: OjpSal;
  };
  mode: "edit" | "new";
  refreshTrigger: Signal<number>;
};

export const OjpModal = component$<OjpModalProps>(
  ({ "bind:show": showSig, eventSignal, initialData, mode, refreshTrigger }) => {
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

    // Original data for change detection
    const originalData = useStore({
      casOd: "",
      datum: "",
      operator: "",
      procedure: null as any,
      sal: "",
      typ: "",
      vykon: "",
    });

    // Get current event from signal
    const currentEvent = useComputed$(() => eventSignal?.value || null);

    // Computed: detect changes for edit mode
    const hasChanges = useComputed$(() => {
      if (mode === "new") return true;

      return (
        modalData.casOd !== originalData.casOd ||
        modalData.datum !== originalData.datum ||
        modalData.operator !== originalData.operator ||
        modalData.sal !== originalData.sal ||
        modalData.typ !== originalData.typ ||
        modalData.vykon !== originalData.vykon ||
        modalData.procedure?.id !== originalData.procedure?.id
      );
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

        // Prepare event data
        const eventData = {
          casOd: event.dateFrom.toTimeString().slice(0, 5),
          datum: event.dateFrom.toISOString().split("T")[0],
          operator: event.operator || "",
          procedure: procedure || null,
          sal: event.sal,
          typ: procedure?.type || event.typ,
          vykon: event.title,
        };

        // Set both current and original data
        Object.assign(modalData, eventData);
        Object.assign(originalData, eventData);
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
        Object.assign(originalData, {}); // Empty for new
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
        typ: "",
        vykon: "",
      });
    });

    const handleDelete = $(() => {
      const event = currentEvent.value;
      if (!event) {
        console.error("❌ No event to delete");
        return;
      }

      confirmDialog.title = "Smazat událost";
      confirmDialog.message = `Opravdu chcete smazat událost "${event.title}"?`;
      confirmDialog.severity = "danger";
      confirmDialog.onConfirm = $(() => {
        const result = deleteOjpEvent({ id: event.id });

        if (result.failed) {
          console.error("❌ Delete failed:", result.message);
          errorMessage.value = result.message || "Nastala chyba při mazání";
        } else {
          refreshTrigger.value = Date.now();
          closeModal();
        }
        confirmDialogShow.value = false;
      });

      confirmDialogShow.value = true;
    });

    const executeSave = $(async () => {
      console.log("💾 Execute save called");

      if (!modalData.procedure || !modalData.datum || !modalData.casOd || !modalData.sal) {
        console.error("❌ Missing required data:", {
          casOd: !!modalData.casOd,
          datum: !!modalData.datum,
          procedure: !!modalData.procedure,
          sal: !!modalData.sal,
        });
        errorMessage.value = "Vyplňte všechny povinné údaje";
        return;
      }

      try {
        isLoading.value = true;
        errorMessage.value = "";

        if (mode === "edit") {
          const event = currentEvent.value;
          if (!event) {
            console.error("❌ No event for edit mode");
            return;
          }

          console.log("📝 Updating event:", event.id);

          // Update existing event
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
            typ: activeTab.value === "pauzy" ? "pauza" : activeTab.value === "vlastni" ? "svatek" : "operace",
          };

          console.log("📤 Sending update data:", updateData);
          const result = updateOjpEvent(updateData);
          console.log("📥 Update result:", result);

          if (result.failed) {
            console.error("❌ Update failed:", result.message);
            errorMessage.value = result.message || "Nastala chyba při ukládání";
            return;
          }

          console.log("✅ Update successful");
        } else {
          console.log("✨ Creating new event(s)");

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

            console.log("📤 Creating single event:", eventData);
            const result = addOjpEvent(eventData);
            console.log("📥 Add result:", result);

            if (result.failed) {
              console.error("❌ Add failed:", result.message);
              errorMessage.value = result.message || "Nastala chyba při ukládání";
              return;
            }
          } else {
            // Series creation for "pridat" tab
            console.log("📤 Creating event series");
            let currentTime = new Date(`${modalData.datum}T${modalData.casOd}`);

            for (let i = 0; i < modalData.repeatCount; i++) {
              const operationNumber = i + 1;
              console.log(`📤 Creating operation ${operationNumber}/${modalData.repeatCount}`);

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
                console.error("❌ Operation add failed:", result.message);
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
                console.error("❌ Separator add failed:", separatorResult.message);
                errorMessage.value = separatorResult.message || "Nastala chyba při ukládání ÚS";
                return;
              }

              currentTime = separatorEndTime;
            }
          }
        }

        console.log("✅ All operations successful, refreshing...");
        refreshTrigger.value = Date.now();
        closeModal();
      } catch (error) {
        console.error("💥 Save error:", error);
        errorMessage.value = "Nastala chyba při ukládání";
      } finally {
        isLoading.value = false;
      }
    });

    const handleSave = $(() => {
      console.log("💾 Handle save called, mode:", mode, "hasChanges:", hasChanges.value);

      if (mode === "edit" && hasChanges.value) {
        console.log("❓ Showing save confirmation");
        // Show confirmation for edit with changes
        confirmDialog.title = "Uložit změny";
        confirmDialog.message = "Chcete uložit provedené změny?";
        confirmDialog.severity = "warning";
        confirmDialog.onConfirm = $(() => {
          console.log("✅ User confirmed save");
          executeSave();
          confirmDialogShow.value = false;
        });
        confirmDialogShow.value = true;
      } else {
        console.log("💾 Direct save (new mode or no changes)");
        // Direct save for new or edit without changes
        executeSave();
      }
    });

    const handleConfirmCancel = $(() => {
      console.log("❌ User cancelled confirmation");
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
