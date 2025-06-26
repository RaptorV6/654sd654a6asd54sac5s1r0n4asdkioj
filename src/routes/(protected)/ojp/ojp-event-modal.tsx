// src/routes/(protected)/ojp/ojp-event-modal.tsx
import type { Signal } from "@builder.io/qwik";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  PreviewText,
} from "@akeso/ui-components";
import { $, component$, useStore, useTask$ } from "@builder.io/qwik";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";

import type { OjpEvent, OjpSal } from "./_mock-events";

import {
  getDenFromDate,
  getSalInfo,
  OJP_JINE,
  OJP_OPERACNI_VYKONY,
  OJP_OPERATORI,
  OJP_SALY,
  OJP_TYPY,
} from "./_mock-events";
import { serverAddOjpEvent, serverDeleteOjpEvent, serverUpdateOjpEvent } from "./_server-actions";

type OjpEventModalProps = {
  "bind:show": Signal<boolean>;
  event?: OjpEvent;
  initialDateTime?: Date;
  initialSal?: OjpSal;
  mode: "edit" | "new" | "view";
  onEventChange: Signal<number>;
  onModeChange?: Signal<"edit" | "new" | "view">;
};

type FormData = {
  casDo: string;
  casOd: string;
  datum: string;
  jine: string;
  operacniVykon: string;
  operator: string;
  poznamka: string;
  sal: string;
  title: string;
  typ: string;
};

export const OjpEventModal = component$<OjpEventModalProps>(
  ({ "bind:show": showSig, event, initialDateTime, initialSal, mode, onEventChange, onModeChange }) => {
    const currentMode = useStore({ value: mode });
    const timeFormatter = new Intl.DateTimeFormat("cs", { hourCycle: "h23", timeStyle: "short" });
    const isLoading = useStore({ value: false });

    const formData = useStore<FormData>({
      casDo: "",
      casOd: "",
      datum: "",
      jine: "",
      operacniVykon: "",
      operator: "",
      poznamka: "",
      sal: "",
      title: "",
      typ: "",
    });

    const errorMessage = useStore({ message: "" });

    // Sledování změn módu
    useTask$(({ track }) => {
      track(() => mode);
      currentMode.value = mode;
    });

    // Inicializace formuláře
    useTask$(({ track }) => {
      track(() => showSig.value);
      track(() => currentMode.value);
      track(() => event);
      track(() => initialDateTime);
      track(() => initialSal);

      if (showSig.value) {
        if ((currentMode.value === "edit" || currentMode.value === "view") && event) {
          // Editace nebo zobrazení existující události
          formData.sal = event.sal;
          formData.datum = event.dateFrom.toISOString().split("T")[0];
          formData.casOd = event.dateFrom.toTimeString().slice(0, 5);
          formData.casDo = event.dateTo.toTimeString().slice(0, 5);
          formData.title = event.title;
          formData.typ = event.typ;
          formData.operator = event.operator || "";
          formData.poznamka = event.poznamka || "";

          // Pokus o určení operačního výkonu nebo jiné kategorie
          const matchingVykon = OJP_OPERACNI_VYKONY.find((v) => event.title.includes(v.name));
          if (matchingVykon) {
            formData.operacniVykon = matchingVykon.id;
          }

          const matchingJine = OJP_JINE.find((j) => event.title.includes(j.name));
          if (matchingJine) {
            formData.jine = matchingJine.id;
          }
        } else if (currentMode.value === "new") {
          // Nová událost
          formData.sal = initialSal || "BEZOVY";
          formData.datum = initialDateTime?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0];
          formData.casOd = initialDateTime?.toTimeString().slice(0, 5) || "08:00";
          formData.casDo = "";
          formData.title = "";
          formData.typ = "operace";
          formData.operator = "";
          formData.operacniVykon = "";
          formData.jine = "";
          formData.poznamka = "";
        }
      }
    });

    const handleSave = $(async () => {
      if (!formData.datum || !formData.casOd || !formData.casDo) {
        errorMessage.message = "Vyplňte povinná pole";
        return;
      }

      isLoading.value = true;
      errorMessage.message = "";

      try {
        const [hodinyOd, minutyOd] = formData.casOd.split(":").map(Number);
        const [hodinyDo, minutyDo] = formData.casDo.split(":").map(Number);

        const dateFrom = new Date(formData.datum);
        dateFrom.setHours(hodinyOd, minutyOd, 0, 0);

        const dateTo = new Date(formData.datum);
        dateTo.setHours(hodinyDo, minutyDo, 0, 0);

        if (dateTo <= dateFrom) {
          errorMessage.message = "Čas konce musí být později než čas začátku";
          return;
        }

        // Generování title ak nie je zadané
        let title = formData.title;
        if (!title) {
          if (formData.operacniVykon) {
            const vykon = OJP_OPERACNI_VYKONY.find((v) => v.id === formData.operacniVykon);
            title = vykon?.name || "Operace";
          } else if (formData.jine) {
            const jine = OJP_JINE.find((j) => j.id === formData.jine);
            title = jine?.name || "Jiné";
          } else {
            title = "Nová událost";
          }
        }

        const eventData = {
          dateFrom,
          dateTo,
          den: getDenFromDate(dateFrom),
          operator: formData.operator || undefined,
          poznamka: formData.poznamka || undefined,
          sal: formData.sal as OjpSal,
          title,
          typ: formData.typ as any,
        };

        let result;
        if (currentMode.value === "edit" && event) {
          result = await serverUpdateOjpEvent(event.id, eventData);
        } else {
          result = await serverAddOjpEvent(eventData);
        }

        if (result.success) {
          showSig.value = false;
          onEventChange.value++; // Trigger refresh
        } else {
          errorMessage.message = "Chyba při ukládání události";
        }
      } catch (error) {
        errorMessage.message = "Nastala neočekávaná chyba";
        console.error("Save error:", error);
      } finally {
        isLoading.value = false;
      }
    });

    const handleDelete = $(async () => {
      if ((currentMode.value === "edit" || currentMode.value === "view") && event) {
        isLoading.value = true;

        try {
          const result = await serverDeleteOjpEvent(event.id);

          if (result.success) {
            showSig.value = false;
            onEventChange.value++; // Trigger refresh
          } else {
            errorMessage.message = "Chyba při mazání události";
          }
        } catch (error) {
          errorMessage.message = "Nastala neočekávaná chyba";
          console.error("Delete error:", error);
        } finally {
          isLoading.value = false;
        }
      }
    });

    const handleEdit = $(() => {
      currentMode.value = "edit";
      if (onModeChange) {
        onModeChange.value = "edit";
      }
    });

    const filteredOperatori = OJP_OPERATORI.filter((op) => {
      if (!formData.operacniVykon) return true;
      const vykon = OJP_OPERACNI_VYKONY.find((v) => v.id === formData.operacniVykon);
      return vykon?.operatori.includes(op.id) ?? true;
    });

    const filteredVykony = OJP_OPERACNI_VYKONY.filter((vykon) => {
      return vykon.saly.includes(formData.sal as OjpSal);
    });

    const isReadonly = currentMode.value === "view";
    const isNewEvent = currentMode.value === "new";
    const salInfo = event ? getSalInfo(event.sal) : null;

    const getModalTitle = () => {
      switch (currentMode.value) {
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
        <DialogBody>
          <div class="space-y-4">
            {errorMessage.message && <div class="rounded bg-red-100 p-3 text-red-700">{errorMessage.message}</div>}

            {isLoading.value && (
              <div class="rounded bg-blue-100 p-3 text-blue-700">
                {currentMode.value === "edit" ? "Ukládám změny..." : isNewEvent ? "Přidávám událost..." : "Načítám..."}
              </div>
            )}

            {/* View mód - zobrazení základních informací */}
            {isReadonly && event && (
              <Card>
                <CardHeader>
                  <CardHeaderTitle>Přehled události</CardHeaderTitle>
                </CardHeader>
                <CardBody>
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <PreviewText label="Název" value={event.title} />
                    <PreviewText label="Typ" value={event.typ} />
                    <PreviewText label="Sál" value={salInfo?.displayName || event.sal} />
                    <PreviewText label="Den" value={event.den} />
                    <PreviewText label="Začátek" value={timeFormatter.format(event.dateFrom)} />
                    <PreviewText label="Konec" value={timeFormatter.format(event.dateTo)} />
                    <PreviewText label="Doba trvání" value={`${event.duration} min`} />
                    {event.operator && <PreviewText label="Operatér" value={event.operator} />}
                  </div>
                  {event.poznamka && (
                    <div class="mt-4">
                      <PreviewText label="Poznámka" value={event.poznamka} />
                    </div>
                  )}
                </CardBody>
              </Card>
            )}

            {/* Edit/New mód - formulář - zde zůstává stejný kód jako předtím */}
            {!isReadonly && (
              <>
                {/* Základní informace */}
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Základní informace</CardHeaderTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div class="form-styles">
                        <label class="block text-sm font-medium text-gray-700">Sál *</label>
                        <select
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          disabled={isLoading.value}
                          onInput$={(_, element) => {
                            formData.sal = (element as HTMLSelectElement).value;
                          }}
                          required
                          value={formData.sal}
                        >
                          {OJP_SALY.map((sal) => (
                            <option key={sal.name} value={sal.name}>
                              {sal.displayName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div class="form-styles">
                        <label class="block text-sm font-medium text-gray-700">Typ *</label>
                        <select
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          disabled={isLoading.value}
                          onInput$={(_, element) => {
                            formData.typ = (element as HTMLSelectElement).value;
                          }}
                          required
                          value={formData.typ}
                        >
                          {OJP_TYPY.map((typ) => (
                            <option key={typ.id} value={typ.id}>
                              {typ.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div class="form-styles">
                        <label class="block text-sm font-medium text-gray-700">Datum *</label>
                        <input
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          disabled={isLoading.value}
                          onInput$={(_, element) => {
                            formData.datum = (element as HTMLInputElement).value;
                          }}
                          required
                          type="date"
                          value={formData.datum}
                        />
                      </div>

                      <div class="form-styles">
                        <label class="block text-sm font-medium text-gray-700">Čas od *</label>
                        <input
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          disabled={isLoading.value}
                          onInput$={(_, element) => {
                            formData.casOd = (element as HTMLInputElement).value;
                          }}
                          required
                          type="time"
                          value={formData.casOd}
                        />
                      </div>

                      <div class="form-styles">
                        <label class="block text-sm font-medium text-gray-700">Čas do *</label>
                        <input
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          disabled={isLoading.value}
                          onInput$={(_, element) => {
                            formData.casDo = (element as HTMLInputElement).value;
                          }}
                          required
                          type="time"
                          value={formData.casDo}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Operační detaily */}
                {formData.typ === "operace" && (
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>Operační detaily</CardHeaderTitle>
                    </CardHeader>
                    <CardBody>
                      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="form-styles">
                          <label class="block text-sm font-medium text-gray-700">Operační výkon</label>
                          <select
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            disabled={isLoading.value}
                            onInput$={(_, element) => {
                              formData.operacniVykon = (element as HTMLSelectElement).value;
                              formData.operator = "";
                            }}
                            value={formData.operacniVykon}
                          >
                            <option value="">-- Vyberte --</option>
                            {filteredVykony.map((vykon) => (
                              <option key={vykon.id} value={vykon.id}>
                                {vykon.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div class="form-styles">
                          <label class="block text-sm font-medium text-gray-700">Operatér</label>
                          <select
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            disabled={isLoading.value}
                            onInput$={(_, element) => {
                              formData.operator = (element as HTMLSelectElement).value;
                            }}
                            value={formData.operator}
                          >
                            <option value="">-- Vyberte --</option>
                            {filteredOperatori.map((op) => (
                              <option key={op.id} value={op.id}>
                                {op.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Jiné aktivity */}
                {(formData.typ === "uklid" || formData.typ === "pauza") && (
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>Jiné aktivity</CardHeaderTitle>
                    </CardHeader>
                    <CardBody>
                      <div class="form-styles">
                        <label class="block text-sm font-medium text-gray-700">Typ aktivity</label>
                        <select
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          disabled={isLoading.value}
                          onInput$={(_, element) => {
                            formData.jine = (element as HTMLSelectElement).value;
                          }}
                          value={formData.jine}
                        >
                          <option value="">-- Vyberte --</option>
                          {OJP_JINE.map((jine) => (
                            <option key={jine.id} value={jine.id}>
                              {jine.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Dodatečné informace */}
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Dodatečné informace</CardHeaderTitle>
                  </CardHeader>
                  <CardBody>
                    <div class="space-y-4">
                      <div class="form-styles">
                        <label class="block text-sm font-medium text-gray-700">Název události</label>
                        <input
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          disabled={isLoading.value}
                          onInput$={(_, element) => {
                            formData.title = (element as HTMLInputElement).value;
                          }}
                          placeholder="Automaticky se vygeneruje podle výběru"
                          type="text"
                          value={formData.title}
                        />
                      </div>

                      <div class="form-styles">
                        <label class="block text-sm font-medium text-gray-700">Poznámka</label>
                        <textarea
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          disabled={isLoading.value}
                          onInput$={(_, element) => {
                            formData.poznamka = (element as HTMLTextAreaElement).value;
                          }}
                          rows={3}
                          value={formData.poznamka}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}
          </div>
        </DialogBody>

        <DialogFooter class="flex items-center justify-between">
          <div>
            {(currentMode.value === "edit" || currentMode.value === "view") && event?.typ !== "svatek" && (
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
              disabled={isLoading.value}
              onClick$={() => {
                showSig.value = false;
                errorMessage.message = "";
              }}
              type="button"
            >
              {isReadonly ? "Zavřít" : "Zrušit"}
            </Button>

            {isReadonly && event?.typ !== "svatek" && (
              <Button
                disabled={isLoading.value}
                onClick$={handleEdit}
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
                {isNewEvent ? "Přidat" : "Uložit"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </Dialog>
    );
  },
);
