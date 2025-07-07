import type { Signal } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@akeso/ui-components";
import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";

import type { OjpEvent, OjpSal } from "./_mock-events";
import type { OjpProcedureListItemSurgery } from "./procedure-list/_mock-ojp-data";

import { addOjpEvent, deleteOjpEvent, updateOjpEvent } from "./_actions";
import { OJP_SALY } from "./_mock-events";
import { ojpProcedureListItemSurgeryMap } from "./procedure-list/_mock-ojp-data";

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
    const selectedProcedure = useSignal<null | OjpProcedureListItemSurgery>(null);
    const showProcedures = useSignal(false);

    // Filtrované procedury
    const filteredProcedures = useSignal<OjpProcedureListItemSurgery[]>([]);

    useTask$(({ track }) => {
      const search = track(() => searchTerm.value.toLowerCase());

      if (search.length < 2) {
        filteredProcedures.value = [];
        showProcedures.value = false;
        return;
      }

      const searchTerms = search.split(/\s+/).filter(Boolean);
      const filtered = ojpProcedureListItemSurgeryMap.filter((procedure) => {
        const firstName = procedure.surgeon.firstName.toLowerCase();
        const lastName = procedure.surgeon.lastName.toLowerCase();
        const surgery = procedure.surgery.toLowerCase();
        return searchTerms.every(
          (term) => firstName.includes(term) || lastName.includes(term) || surgery.includes(term),
        );
      });

      filteredProcedures.value = filtered.slice(0, 10); // Max 10 výsledků
      showProcedures.value = filtered.length > 0;
    });

    // Inicializace formuláře
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
          formData.casDo = timeStr; // Bude se přepočítat při výběru procedury
        }

        if (data.sal) {
          formData.sal = data.sal;
        }

        // Reset
        formData.title = "";
        formData.typ = "";
        formData.operator = "";
        formData.poznamka = "";
        searchTerm.value = "";
        selectedProcedure.value = null;
      } else if (isOpen && (currentMode === "edit" || currentMode === "view") && event) {
        formData.sal = event.sal;
        formData.datum = event.dateFrom.toISOString().split("T")[0];
        formData.casOd = event.dateFrom.toTimeString().slice(0, 5);
        formData.casDo = event.dateTo.toTimeString().slice(0, 5);
        formData.title = event.title;
        formData.typ = event.typ;
        formData.operator = event.operator || "";
        formData.poznamka = event.poznamka || "";

        // Pre-vyplnit search
        if (event.operator) {
          searchTerm.value = event.operator;
        }
      }
    });

    const selectProcedure = $((procedure: OjpProcedureListItemSurgery) => {
      selectedProcedure.value = procedure;
      searchTerm.value = `${procedure.surgeon.firstName} ${procedure.surgeon.lastName}`;
      showProcedures.value = false;

      // Auto-vyplnění
      formData.title = procedure.secondIdSurgeonSurgery;
      formData.typ = "operace";
      formData.operator = `${procedure.surgeon.firstName} ${procedure.surgeon.lastName}`;

      // Přepočet času do
      if (formData.casOd) {
        const [hours, minutes] = formData.casOd.split(":").map(Number);
        const startTime = new Date();
        startTime.setHours(hours, minutes, 0, 0);

        const endTime = new Date(startTime.getTime() + procedure.duration * 60 * 1000);
        formData.casDo = endTime.toTimeString().slice(0, 5);
      }
    });

    const handleSave = $(async () => {
      try {
        isLoading.value = true;
        errorMessage.value = "";

        const values = {
          casDo: formData.casDo,
          casOd: formData.casOd,
          datum: formData.datum,
          operator: formData.operator,
          poznamka: formData.poznamka,
          sal: formData.sal,
          title: formData.title,
          typ: formData.typ,
        };

        let result;
        if (modalState.mode === "new") {
          result = await addOjpEvent(values);
        } else if (event) {
          result = await updateOjpEvent({ ...values, id: event.id });
        }

        if (result?.success) {
          showSig.value = false;
          refreshTrigger.value++;
        } else {
          errorMessage.value = result?.message || "Nastala chyba při ukládání";
        }
      } catch {
        errorMessage.value = "Nastala chyba při ukládání";
      } finally {
        isLoading.value = false;
      }
    });

    const handleDelete = $(async () => {
      if (!event) return;

      try {
        isLoading.value = true;
        const result = await deleteOjpEvent({ id: event.id });

        if (result.success) {
          showSig.value = false;
          refreshTrigger.value++;
        } else {
          errorMessage.value = result.message || "Nastala chyba při mazání";
        }
      } catch {
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
                value={formData.sal}
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
                value={formData.datum}
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
                  value={searchTerm.value}
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
                value={formData.casOd}
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
                value={formData.casDo}
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
                value={formData.title}
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
                value={formData.operator}
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
              value={formData.poznamka}
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
