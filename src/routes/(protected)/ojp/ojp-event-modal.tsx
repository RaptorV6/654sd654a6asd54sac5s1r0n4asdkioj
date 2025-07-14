import type { Signal } from "@builder.io/qwik";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  FieldDate,
  FieldRadioSelect,
  FieldText,
  FieldTime,
  InputCheckbox,
} from "@akeso/ui-components";
import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { reset, setValue, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";

import type { OjpEvent, OjpSal } from "./_mock-events";

import { addOjpEvent, deleteOjpEvent, updateOjpEvent } from "./_actions";
import { _mock_ojp_events, OJP_SALY } from "./_mock-events";
import { searchProcedures } from "./ojp-procedure-data";

const OjpEventFormSchema = v.object({
  casDo: v.pipe(v.string(), v.regex(/^\d{2}:\d{2}$/)),
  casOd: v.pipe(v.string(), v.regex(/^\d{2}:\d{2}$/)),
  datum: v.pipe(v.string(), v.isoDate()),
  operator: v.optional(v.string()),
  poznamka: v.optional(v.string()),
  sal: v.pipe(v.string(), v.nonEmpty()),
  title: v.pipe(v.string(), v.nonEmpty()),
  typ: v.pipe(v.string(), v.nonEmpty()),
});
type FormInput = v.InferInput<typeof OjpEventFormSchema>;

type OjpEventModalProps = {
  "bind:show": Signal<boolean>;
  event?: OjpEvent;
  initialData?: {
    dateTime?: Date;
    forceOtherSlots?: boolean; // 🔧 Přidej tuhle property
    sal?: OjpSal;
  };
  mode: "edit" | "new" | "view";
  refreshTrigger: Signal<number>;
};

export const OjpEventModal = component$<OjpEventModalProps>(
  ({ "bind:show": showSig, event, initialData, mode, refreshTrigger }) => {
    const modalState = useStore({ mode });
    const isLoading = useSignal(false);
    const isDeleting = useSignal(false);
    const errorMessage = useSignal("");

    const [formStore, { Form }] = useForm<FormInput>({
      loader: {
        value: {
          casDo: "",
          casOd: "",
          datum: "",
          operator: "",
          poznamka: "",
          sal: "",
          title: "",
          typ: "",
        },
      },
      validate: valiForm$(OjpEventFormSchema),
    });

    // Zobrazovací data (jen pro UI, neukládají se)
    const displayData = useStore({
      department: "",
      doctorName: "",
    });

    // Vyhledávání procedur
    const searchTerm = useSignal("");
    const showOtherProcedures = useSignal(false);
    const selectedProcedure = useSignal<any>(null);
    const showProcedures = useSignal(false);

    // Filtrované procedury
    const filteredProcedures = useSignal<any[]>([]);

    useTask$(({ track }) => {
      const currentEvent = track(() => event);
      const isOpen = track(() => showSig.value);
      const data = track(() => initialData);

      // Pokud se modal otevírá s novou událostí, resetuj error state
      if (isOpen && currentEvent) {
        errorMessage.value = "";
        isLoading.value = false;
        isDeleting.value = false;

        // 🔧 Přidej kontrolu existence data
        if (data?.forceOtherSlots) {
          showOtherProcedures.value = true;
        }
      }
    });
    // Reset state při zavření modalu
    useTask$(({ track }) => {
      const isOpen = track(() => showSig.value);

      if (!isOpen) {
        // Reset všech state hodnot
        modalState.mode = mode;
        isLoading.value = false;
        isDeleting.value = false;
        errorMessage.value = "";

        reset(formStore);

        // Reset zobrazovacích dat
        Object.assign(displayData, {
          department: "",
          doctorName: "",
        });

        // Reset vyhledávání
        searchTerm.value = "";
        showOtherProcedures.value = false;
        selectedProcedure.value = null;
        showProcedures.value = false;
        filteredProcedures.value = [];
      }
    });

    useTask$(({ track }) => {
      const search = track(() => searchTerm.value);
      const selected = track(() => selectedProcedure.value);

      // Pokud je něco vybráno a uživatel mění search term, resetuj selection
      if (selected && search) {
        const expectedName =
          selected.surgeon.firstName && selected.surgeon.lastName
            ? `${selected.surgeon.firstName} ${selected.surgeon.lastName}`
            : selected.surgery;

        // Pokud se search term liší od očekávaného jména, resetuj
        if (search !== expectedName) {
          selectedProcedure.value = null;
        }
      }
    });

    // Původní useTask$ zůstává stejný
    useTask$(({ track }) => {
      const search = track(() => searchTerm.value);
      const showOther = track(() => showOtherProcedures.value);
      const selected = track(() => selectedProcedure.value);

      // Pro "other" sloty nepotřebujeme vyhledávání, protože máme select
      if (showOther) {
        filteredProcedures.value = [];
        showProcedures.value = false;
        return;
      }

      // Pokud je už něco vybráno, neotevírej dropdown
      if (selected) {
        showProcedures.value = false;
        return;
      }

      if (search.length < 2) {
        filteredProcedures.value = [];
        showProcedures.value = false;
        return;
      }

      const filtered = searchProcedures(search, "surgery");
      filteredProcedures.value = filtered;
      showProcedures.value = filtered.length > 0;
    });

    useTask$(({ track }) => {
      const isOpen = track(() => showSig.value);
      const currentMode = track(() => modalState.mode);
      const data = track(() => initialData);

      if (isOpen && currentMode === "new" && data) {
        const dateStr = data.dateTime
          ? data.dateTime.toISOString().split("T")[0]
          : "";
        const timeStr = data.dateTime
          ? data.dateTime.toTimeString().slice(0, 5)
          : "";

        reset(formStore, {
          initialValues: {
            casDo: timeStr,
            casOd: timeStr,
            datum: dateStr,
            operator: "",
            poznamka: "",
            sal: data.sal ?? "",
            title: "",
            typ: "",
          },
        });

        displayData.doctorName = "";
        displayData.department = "";
        searchTerm.value = "";
        selectedProcedure.value = null;

        if (data.forceOtherSlots) {
          showOtherProcedures.value = true;
        }
      }
    });

    useTask$(({ track }) => {
      const currentEvent = track(() => event);
      const currentMode = track(() => modalState.mode);

      if ((currentMode === "edit" || currentMode === "view") && currentEvent) {
        reset(formStore, {
          initialValues: {
            casDo: currentEvent.dateTo.toTimeString().slice(0, 5),
            casOd: currentEvent.dateFrom.toTimeString().slice(0, 5),
            datum: currentEvent.dateFrom.toISOString().split("T")[0],
            operator: currentEvent.operator || "",
            poznamka: currentEvent.poznamka || "",
            sal: currentEvent.sal,
            title: currentEvent.title,
            typ: currentEvent.typ,
          },
        });

        // Pro zobrazení v search fieldu - zkusíme operační výkon nebo operátora
        if (currentEvent.operator) {
          searchTerm.value = currentEvent.operator;
        } else if (currentEvent.title) {
          searchTerm.value = currentEvent.title;
        }

        // Resetujeme zobrazovací data
        displayData.doctorName = "";
        displayData.department = "";
      }
    });

    const selectProcedure = $((procedure: any) => {
      selectedProcedure.value = procedure;

      const doctorName =
        procedure.surgeon.firstName && procedure.surgeon.lastName
          ? `${procedure.surgeon.firstName} ${procedure.surgeon.lastName}`
          : "";

      searchTerm.value = doctorName || procedure.surgery;
      showProcedures.value = false;

      setValue(formStore, "title", procedure.secondIdSurgeonSurgery);

      if (procedure.type === "Úklid") {
        setValue(formStore, "typ", "uklid");
      } else if (procedure.type === "Pauza") {
        setValue(formStore, "typ", "pauza");
      } else if (procedure.type === "Svátek") {
        setValue(formStore, "typ", "svatek");
      } else {
        setValue(formStore, "typ", "operace");
      }

      setValue(formStore, "operator", procedure.surgery);

      displayData.doctorName = doctorName;
      displayData.department = procedure.type;

      const casOd = formStore.internal.fields.casOd?.value;
      if (casOd) {
        const [hours, minutes] = casOd.split(":").map(Number);
        const startTime = new Date();
        startTime.setHours(hours, minutes, 0, 0);
        const endTime = new Date(startTime.getTime() + procedure.duration * 60 * 1000);
        setValue(formStore, "casDo", endTime.toTimeString().slice(0, 5));
      }
    });

    const closeModal = $(() => {
      modalState.mode = mode; // Reset na původní mode
      showSig.value = false;
    });

    const handleSave = $(() => {
      if (isLoading.value || isDeleting.value) return;
      submit(formStore);
    });

    const handleDelete = $(() => {
      if (!event || isLoading.value || isDeleting.value) return;

      if (!event.id) {
        console.error("🔍 No event ID found!");
        errorMessage.value = "Chyba: Nenalezeno ID události";
        return;
      }
      try {
        isLoading.value = true;
        isDeleting.value = true;

        const result = deleteOjpEvent({ id: event.id });

        if (result.success) {
          refreshTrigger.value = Date.now();
          closeModal();
          return; // Ihned skonči
        } else {
          errorMessage.value = result.message || "Nastala chyba při mazání";
        }
      } catch (error) {
        console.error("Delete error:", error);
        errorMessage.value = "Nastala chyba při mazání";
      } finally {
        isLoading.value = false;
        isDeleting.value = false;
      }
    });

    const handleSubmit = $((values: FormInput) => {
      if (isLoading.value || isDeleting.value) return;
      try {
        isLoading.value = true;
        errorMessage.value = "";

        if (modalState.mode === "new" && values.typ === "operace") {
          const currentDate = new Date(values.datum);
          const existingEvents = _mock_ojp_events.filter(
            (evt) => evt.dateFrom.toDateString() === currentDate.toDateString() && evt.sal === values.sal,
          );
          const operations = existingEvents
            .filter((evt) => evt.typ === "operace")
            .sort((a, b) => b.dateTo.getTime() - a.dateTo.getTime());
          if (operations.length > 0) {
            const lastOperation = operations[0];
            const cleaningAfterLastOp = existingEvents.find(
              (evt) => (evt.typ === "uklid" || evt.typ === "pauza") && evt.dateFrom >= lastOperation.dateTo,
            );
            if (!cleaningAfterLastOp) {
              errorMessage.value =
                "Po operaci musí následovat úklid nebo pauza. Použijte 'Zobrazit ostatní sloty'.";
              return;
            }
          }
        }

        let result;
        if (modalState.mode === "new") {
          result = addOjpEvent(values);
        } else if (event) {
          result = updateOjpEvent({ ...values, id: event.id });
        }

        if (result?.success) {
          refreshTrigger.value = Date.now();
          closeModal();
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

        <DialogBody stoppropagation:click>
          <Form class="form-styles" onSubmit$={handleSubmit}>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FieldRadioSelect
                disabled={isReadonly}
                label="Sál"
                name="sal"
                of={formStore}
                options={OJP_SALY.map((s) => ({ label: s.displayName, value: s.name }))}
              />
              <FieldDate disabled={isReadonly} label="Datum" name="datum" of={formStore} />

              <div class="md:col-span-2">
                <InputCheckbox
                  class="!mt-0"
                  disabled={isReadonly}
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
                {showOtherProcedures.value ? (
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Vyberte slot</label>
                    <select
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                      disabled={isReadonly}
                      onInput$={(_, element) => {
                        const selectedId = (element as HTMLSelectElement).value;
                        if (selectedId) {
                          const otherProcedures = searchProcedures('', 'other');
                          const procedure = otherProcedures.find((p) => p.id === selectedId);
                          if (procedure) {
                            selectProcedure(procedure);
                          }
                        }
                      }}
                      value={selectedProcedure.value?.id || ''}
                    >
                      <option value="">-- Vyberte slot --</option>
                      {searchProcedures('', 'other').map((procedure) => (
                        <option key={procedure.id} value={procedure.id}>
                          {`${procedure.secondIdSurgeonSurgery} (${procedure.duration.toString()} min)`}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div class="relative">
                    <input
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                      disabled={isReadonly}
                      onInput$={(_, element) => {
                        searchTerm.value = (element as HTMLInputElement).value;
                      }}
                      placeholder="Zadejte jméno lékaře nebo operační výkon..."
                      type="text"
                      value={searchTerm.value || ''}
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
                                {procedure.duration} min | {procedure.secondIdSurgeonSurgery} | {procedure.type}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!showOtherProcedures.value && displayData.doctorName && (
                <div>
                  <label class="block text-sm font-medium text-gray-700">Lékař</label>
                  <input
                    class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    disabled
                    type="text"
                    value={displayData.doctorName}
                  />
                </div>
              )}

              {!showOtherProcedures.value && displayData.department && (
                <div>
                  <label class="block text-sm font-medium text-gray-700">Oddělení</label>
                  <input
                    class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    disabled
                    type="text"
                    value={displayData.department}
                  />
                </div>
              )}

              <FieldTime
                disabled={isReadonly}
                label="Čas od"
                name="casOd"
                of={formStore}
                onInput$={(_, element) => {
                  const val = (element as HTMLInputElement).value;
                  const proc = selectedProcedure.value;
                  if (proc && val) {
                    const [h, m] = val.split(':').map(Number);
                    const start = new Date();
                    start.setHours(h, m, 0, 0);
                    const end = new Date(start.getTime() + proc.duration * 60 * 1000);
                    setValue(formStore, 'casDo', end.toTimeString().slice(0, 5));
                  }
                }}
              />

              <FieldTime disabled={isReadonly} label="Čas do" name="casDo" of={formStore} />

              <FieldText disabled={isReadonly} inputType="text" label="Název události" name="title" of={formStore} />
            </div>

            <div class="mt-4">
              {!showOtherProcedures.value && (
                <FieldText
                  disabled={isReadonly}
                  inputType="text"
                  label="Operační výkon"
                  name="operator"
                  of={formStore}
                  required={false}
                />
              )}
              <FieldText
                disabled={isReadonly}
                inputType="textarea"
                label="Poznámka"
                name="poznamka"
                of={formStore}
                required={false}
              />
            </div>

            {errorMessage.value && (
              <div class="mt-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
                {errorMessage.value}
              </div>
            )}
          </Form>
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
                disabled={isLoading.value || isDeleting.value}
                onClick$={handleDelete}
                severity="accent"
                variant="contained"
              >
                Smazat
              </ButtonWithConfirmation>
            )}
          </div>

          <div class="flex gap-2">
            <Button onClick$={closeModal} type="button">
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
                disabled={isLoading.value || isDeleting.value}
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
