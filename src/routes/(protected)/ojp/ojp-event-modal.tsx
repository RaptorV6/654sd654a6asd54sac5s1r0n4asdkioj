import type { Signal } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, InputCheckbox } from "@akeso/ui-components";
import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";

import type { OjpEvent, OjpSal } from "./_mock-events";

import { addOjpEvent, deleteOjpEvent, updateOjpEvent } from "./_actions";
import { OJP_SALY } from "./_mock-events";
import { searchProcedures } from "./ojp-procedure-data";

type OjpEventModalProps = {
  "bind:show": Signal<boolean>;
  event?: OjpEvent;
  initialData?: {
    dateTime?: Date;
    sal?: OjpSal;
  };
  mode: "edit" | "new" | "view";
  refreshTrigger: Signal<number>;
};

export const OjpEventModal = component$<OjpEventModalProps>(
  ({ "bind:show": showSig, event, initialData, mode, refreshTrigger }) => {
    const modalState = useStore({ mode });
    const isLoading = useSignal(false);
    const errorMessage = useSignal("");

    // Formulář data
    const formData = useStore({
      casDo: "",
      casOd: "",
      datum: "",
      operator: "",
      poznamka: "",
      sal: "",
      title: "",
      typ: "",
    });

    // Vyhledávání procedur
    const searchTerm = useSignal("");
    const showOtherProcedures = useSignal(false);
    const selectedProcedure = useSignal<any>(null);
    const showProcedures = useSignal(false);

    // Filtrované procedury
    const filteredProcedures = useSignal<any[]>([]);

    useTask$(({ track }) => {
      const search = track(() => searchTerm.value);
      const showOther = track(() => showOtherProcedures.value);

      if (search.length < 2) {
        filteredProcedures.value = [];
        showProcedures.value = false;
        return;
      }

      const filtered = searchProcedures(search, showOther ? "other" : "surgery");
      filteredProcedures.value = filtered;
      showProcedures.value = filtered.length > 0;
    });
    useTask$(({ track }) => {
      const isOpen = track(() => showSig.value);
      const currentMode = track(() => modalState.mode);
      const data = track(() => initialData);

      if (isOpen && currentMode === "new" && data) {
        if (data.dateTime) {
          const dateStr = data.dateTime.toISOString().split("T")[0];
          const timeStr = data.dateTime.toTimeString().slice(0, 5);

          formData.datum = dateStr;
          formData.casOd = timeStr;
          formData.casDo = timeStr;
        }

        if (data.sal) {
          formData.sal = data.sal;
        }

        formData.title = "";
        formData.typ = "";
        formData.operator = "";
        formData.poznamka = "";
        searchTerm.value = "";
        selectedProcedure.value = null;
      }
    });

    useTask$(({ track }) => {
      const currentEvent = track(() => event);
      const currentMode = track(() => modalState.mode);

      if ((currentMode === "edit" || currentMode === "view") && currentEvent) {
        formData.sal = currentEvent.sal;
        formData.datum = currentEvent.dateFrom.toISOString().split("T")[0];
        formData.casOd = currentEvent.dateFrom.toTimeString().slice(0, 5);
        formData.casDo = currentEvent.dateTo.toTimeString().slice(0, 5);
        formData.title = currentEvent.title;
        formData.typ = currentEvent.typ;
        formData.operator = currentEvent.operator || "";
        formData.poznamka = currentEvent.poznamka || "";

        if (currentEvent.operator) {
          searchTerm.value = currentEvent.operator;
        } else if (currentEvent.title) {
          searchTerm.value = currentEvent.title;
        }
      }
    });

    useTask$(({ track }) => {
      const currentMode = track(() => modalState.mode);
      const currentEvent = track(() => event);

      if (currentMode === "edit" && currentEvent) {
        formData.sal = currentEvent.sal;
        formData.datum = currentEvent.dateFrom.toISOString().split("T")[0];
        formData.casOd = currentEvent.dateFrom.toTimeString().slice(0, 5);
        formData.casDo = currentEvent.dateTo.toTimeString().slice(0, 5);
        formData.title = currentEvent.title;
        formData.typ = currentEvent.typ;
        formData.operator = currentEvent.operator || "";
        formData.poznamka = currentEvent.poznamka || "";
      }
    });

    const selectProcedure = $((procedure: any) => {
      selectedProcedure.value = procedure;

      const operatorName =
        procedure.surgeon.firstName && procedure.surgeon.lastName
          ? `${procedure.surgeon.firstName} ${procedure.surgeon.lastName}`
          : "";

      searchTerm.value = operatorName || procedure.surgery;
      showProcedures.value = false;

      // Auto-vyplnění
      formData.title = procedure.secondIdSurgeonSurgery;
      formData.typ = procedure.type === "Úklid" ? "uklid" : procedure.type === "Pauza" ? "pauza" : "operace";
      formData.operator = operatorName;

      // Přepočet času do
      if (formData.casOd) {
        const [hours, minutes] = formData.casOd.split(":").map(Number);
        const startTime = new Date();
        startTime.setHours(hours, minutes, 0, 0);

        const endTime = new Date(startTime.getTime() + procedure.duration * 60 * 1000);
        formData.casDo = endTime.toTimeString().slice(0, 5);
      }
    });

    const handleSave = $(() => {
      try {
        isLoading.value = true;
        errorMessage.value = "";

        // Pokud je formData prázdný, vezmi hodnotu z event
        const values = {
          casDo: formData.casDo || (event?.dateTo ? event.dateTo.toTimeString().slice(0, 5) : ""),
          casOd: formData.casOd || (event?.dateFrom ? event.dateFrom.toTimeString().slice(0, 5) : ""),
          datum: formData.datum || (event?.dateFrom ? event.dateFrom.toISOString().split("T")[0] : ""),
          operator: formData.operator || event?.operator || "",
          poznamka: formData.poznamka || event?.poznamka || "",
          sal: formData.sal || event?.sal || "",
          title: formData.title || event?.title || "",
          typ: formData.typ || event?.typ || "operace",
        };

        let result;
        if (modalState.mode === "new") {
          result = addOjpEvent(values);
        } else if (event) {
          result = updateOjpEvent({ ...values, id: event.id });
        }

        if (result?.success) {
          showSig.value = false;
          refreshTrigger.value = Date.now();
        } else {
          errorMessage.value = result?.message || "Nastala chyba při ukládání";
        }
      } catch (error) {
        console.error("Save error:", error);
        errorMessage.value = "Nastala chyba při ukládání";
      } finally {
        isLoading.value = false;
      }
    });

    const handleDelete = $(() => {
      if (!event) return;

      try {
        isLoading.value = true;
        const result = deleteOjpEvent({ id: event.id });

        if (result.success) {
          showSig.value = false;
          refreshTrigger.value = Date.now();
        } else {
          errorMessage.value = result.message || "Nastala chyba při mazání";
        }
      } catch (error) {
        console.error("Delete error:", error);
        errorMessage.value = "Nastala chyba při mazání";
      } finally {
        isLoading.value = false;
      }
    });

    const isReadonly = modalState.mode === "view";
    const isNewEvent = modalState.mode === "new";

    const getModalTitle = () => {
      switch (modalState.mode) {
        case "new":
          return "Přidat novou událost";
        case "edit":
          return "Upravit událost";
        case "view":
          return `Detail události - ${event?.title || ""}`;
        default:
          return "Událost";
      }
    };

    return (
      <Dialog bind:show={showSig}>
        <DialogHeader>{getModalTitle()}</DialogHeader>

        <DialogBody class="form-styles">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">Sál *</label>
              <select
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                disabled={isReadonly}
                onInput$={(_, element) => {
                  formData.sal = (element as HTMLSelectElement).value;
                }}
                required
                value={event?.sal || formData.sal || ""}
              >
                <option value="">-- Vyberte sál --</option>
                {OJP_SALY.map((sal) => (
                  <option key={sal.name} value={sal.name}>
                    {sal.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Datum *</label>
              <input
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                disabled={isReadonly}
                onInput$={(_, element) => {
                  formData.datum = (element as HTMLInputElement).value;
                }}
                required
                type="date"
                value={event?.dateFrom ? event.dateFrom.toISOString().split("T")[0] : formData.datum || ""}
              />
            </div>

            <div class="md:col-span-2">
              <InputCheckbox
                class="!mt-0"
                disabled={isReadonly}
                error=""
                label="Zobrazit ostatní sloty"
                name="showOther"
                onInput$={(_, target) => {
                  showOtherProcedures.value = target.checked;
                  searchTerm.value = "";
                }}
                required={false}
                switch
                value={showOtherProcedures.value}
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Vyhledat proceduru *</label>
              <div class="relative">
                <input
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                  disabled={isReadonly}
                  onInput$={(_, element) => {
                    searchTerm.value = (element as HTMLInputElement).value;
                  }}
                  placeholder="Zadejte jméno lékaře nebo operační výkon..."
                  type="text"
                  value={event?.operator || searchTerm.value || ""}
                />

                {showProcedures.value && !isReadonly && (
                  <div class="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                    <div class="max-h-60 overflow-auto">
                      {filteredProcedures.value.map((procedure) => (
                        <button
                          class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          key={procedure.id}
                          onClick$={() => selectProcedure(procedure)}
                          type="button"
                        >
                          <div class="font-medium">
                            {procedure.surgeon.firstName} {procedure.surgeon.lastName}
                          </div>
                          <div class="text-gray-600">{procedure.surgery}</div>
                          <div class="text-xs text-gray-500">
                            {procedure.duration} min | {procedure.secondIdSurgeonSurgery}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Čas od *</label>
              <input
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                disabled={isReadonly}
                onInput$={(_, element) => {
                  formData.casOd = (element as HTMLInputElement).value;

                  // Přepočet času do pokud je vybraná procedura
                  if (selectedProcedure.value && formData.casOd) {
                    const [hours, minutes] = formData.casOd.split(":").map(Number);
                    const startTime = new Date();
                    startTime.setHours(hours, minutes, 0, 0);

                    const endTime = new Date(startTime.getTime() + selectedProcedure.value.duration * 60 * 1000);
                    formData.casDo = endTime.toTimeString().slice(0, 5);
                  }
                }}
                required
                type="time"
                value={event?.dateFrom ? event.dateFrom.toTimeString().slice(0, 5) : formData.casOd || ""}
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Čas do *</label>
              <input
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                disabled={isReadonly}
                onInput$={(_, element) => {
                  formData.casDo = (element as HTMLInputElement).value;
                }}
                required
                type="time"
                value={event?.dateTo ? event.dateTo.toTimeString().slice(0, 5) : formData.casDo || ""}
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Název události *</label>
              <input
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                disabled={isReadonly}
                onInput$={(_, element) => {
                  formData.title = (element as HTMLInputElement).value;
                }}
                required
                type="text"
                value={event?.title || formData.title || ""}
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Operátor</label>
              <input
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                disabled={isReadonly}
                onInput$={(_, element) => {
                  formData.operator = (element as HTMLInputElement).value;
                }}
                type="text"
                value={event?.operator || formData.operator || ""}
              />
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Poznámka</label>
            <textarea
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
              disabled={isReadonly}
              onInput$={(_, element) => {
                formData.poznamka = (element as HTMLTextAreaElement).value;
              }}
              rows={3}
              value={event?.poznamka || formData.poznamka || ""}
            />
          </div>

          {errorMessage.value && (
            <div class="mt-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">{errorMessage.value}</div>
          )}
        </DialogBody>

        <DialogFooter class="flex items-center justify-between">
          <div>
            {(modalState.mode === "edit" || modalState.mode === "view") && event && (
              <ButtonWithConfirmation
                class="bg-red-500 hover:!bg-red-700"
                dialogActionCancelLabel="Ne"
                dialogActionConfirmLabel="Ano"
                dialogAlertText=""
                dialogTitle="Chcete skutečně smazat událost?"
                disabled={isLoading.value}
                onClick$={handleDelete}
                severity="accent"
                variant="contained"
              >
                Smazat
              </ButtonWithConfirmation>
            )}
          </div>

          <div class="flex gap-2">
            <Button
              onClick$={() => {
                showSig.value = false;
              }}
              type="button"
            >
              {isReadonly ? "Zavřít" : "Zrušit"}
            </Button>

            {isReadonly && event && (
              <Button
                onClick$={() => {
                  modalState.mode = "edit";
                }}
                severity="accent"
                type="button"
                variant="contained"
              >
                Upravit
              </Button>
            )}

            {!isReadonly && (
              <Button
                disabled={isLoading.value}
                onClick$={handleSave}
                severity="accent"
                type="button"
                variant="contained"
              >
                {isLoading.value ? "Ukládám..." : isNewEvent ? "Přidat" : "Uložit"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </Dialog>
    );
  },
);
