import type { Signal } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, FieldDate } from "@akeso/ui-components";
import { component$, useStore, useTask$ } from "@builder.io/qwik";
import { setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";

import type { OjpEventFormData } from "./_actions";
import type { OjpEvent } from "./_mock-events";

import { useAddOjpEventAction, useDeleteOjpEventAction, useUpdateOjpEventAction } from "./_actions";
import { OJP_OPERATORI, OJP_SALY, OJP_TYPY } from "./_mock-events";

const OjpEventSchema = v.object({
  casDo: v.pipe(v.string(), v.regex(/^\d{2}:\d{2}$/)),
  casOd: v.pipe(v.string(), v.regex(/^\d{2}:\d{2}$/)),
  datum: v.pipe(v.string(), v.isoDate()),
  operator: v.optional(v.string()),
  poznamka: v.optional(v.string()),
  sal: v.pipe(v.string(), v.nonEmpty()),
  title: v.pipe(v.string(), v.nonEmpty(), v.minLength(1, "Název je povinný")),
  typ: v.pipe(v.string(), v.nonEmpty()),
});

type OjpEventModalProps = {
  "bind:show": Signal<boolean>;
  event?: OjpEvent;
  initialDateTime?: Date;
  initialSal?: string;
  mode: "edit" | "new" | "view";
};

export const OjpEventModal = component$<OjpEventModalProps>(
  ({ "bind:show": showSig, event, initialDateTime, initialSal, mode }) => {
    const addAction = useAddOjpEventAction();
    const updateAction = useUpdateOjpEventAction();
    const deleteAction = useDeleteOjpEventAction();

    const modalState = useStore({ mode });

    const [formStore, { Form: QwikForm }] = useForm<OjpEventFormData>({
      loader: {
        value: {
          casDo: "09:00",
          casOd: "08:00",
          datum: new Date().toISOString().split("T")[0],
          operator: "",
          poznamka: "",
          sal: "BEZOVY",
          title: "",
          typ: "operace",
        },
      },
      validate: valiForm$(OjpEventSchema),
    });

    // Inicializace formuláře
    useTask$(({ track }) => {
      track(() => showSig.value);
      track(() => modalState.mode);

      if (showSig.value) {
        if ((modalState.mode === "edit" || modalState.mode === "view") && event) {
          // Editace nebo zobrazení existující události
          setValue(formStore, "sal", event.sal);
          setValue(formStore, "datum", event.dateFrom.toISOString().split("T")[0]);
          setValue(formStore, "casOd", event.dateFrom.toTimeString().slice(0, 5));
          setValue(formStore, "casDo", event.dateTo.toTimeString().slice(0, 5));
          setValue(formStore, "title", event.title);
          setValue(formStore, "typ", event.typ);
          setValue(formStore, "operator", event.operator || "");
          setValue(formStore, "poznamka", event.poznamka || "");
        } else if (modalState.mode === "new") {
          // Nová událost
          setValue(formStore, "sal", initialSal || "BEZOVY");
          setValue(
            formStore,
            "datum",
            initialDateTime?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
          );
          setValue(formStore, "casOd", initialDateTime?.toTimeString().slice(0, 5) || "08:00");
          setValue(formStore, "casDo", "09:00");
          setValue(formStore, "title", "");
          setValue(formStore, "typ", "operace");
          setValue(formStore, "operator", "");
          setValue(formStore, "poznamka", "");
        }
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

        <QwikForm
          onSubmit$={async (values) => {
            let actionResult;

            if (isNewEvent) {
              actionResult = await addAction.submit(values);
            } else if (event) {
              actionResult = await updateAction.submit({ ...values, id: event.id });
            }

            // Zavřít modal pouze při úspěchu
            if (actionResult?.value.success) {
              showSig.value = false;
              // Volitelně reset form
              if (isNewEvent) {
                setValue(formStore, "title", "");
                setValue(formStore, "poznamka", "");
              }
            }
          }}
        >
          <DialogBody class="form-styles">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Sál */}
              <div>
                <label class="block text-sm font-medium text-gray-700">Sál *</label>
                <select
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                  disabled={isReadonly}
                  onInput$={(_, element) => {
                    setValue(formStore, "sal", (element as HTMLSelectElement).value);
                  }}
                  required
                  value={formStore.internal.fields.sal?.value || ""}
                >
                  {OJP_SALY.map((sal) => (
                    <option key={sal.name} value={sal.name}>
                      {sal.displayName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Typ */}
              <div>
                <label class="block text-sm font-medium text-gray-700">Typ *</label>
                <select
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                  disabled={isReadonly}
                  onInput$={(_, element) => {
                    setValue(formStore, "typ", (element as HTMLSelectElement).value);
                  }}
                  required
                  value={formStore.internal.fields.typ?.value || ""}
                >
                  {OJP_TYPY.map((typ) => (
                    <option key={typ.id} value={typ.id}>
                      {typ.name}
                    </option>
                  ))}
                </select>
              </div>

              <FieldDate label="Datum *" name="datum" of={formStore} required />

              {/* Čas od */}
              <div>
                <label class="block text-sm font-medium text-gray-700">Čas od *</label>
                <input
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                  disabled={isReadonly}
                  onInput$={(_, element) => {
                    setValue(formStore, "casOd", (element as HTMLInputElement).value);
                  }}
                  required
                  type="time"
                  value={formStore.internal.fields.casOd?.value || ""}
                />
              </div>

              {/* Čas do */}
              <div>
                <label class="block text-sm font-medium text-gray-700">Čas do *</label>
                <input
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                  disabled={isReadonly}
                  onInput$={(_, element) => {
                    setValue(formStore, "casDo", (element as HTMLInputElement).value);
                  }}
                  required
                  type="time"
                  value={formStore.internal.fields.casDo?.value || ""}
                />
              </div>

              {/* Název události */}
              <div>
                <label class="block text-sm font-medium text-gray-700">Název události *</label>
                <input
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                  disabled={isReadonly}
                  onInput$={(_, element) => {
                    setValue(formStore, "title", (element as HTMLInputElement).value);
                  }}
                  required
                  type="text"
                  value={formStore.internal.fields.title?.value || ""}
                />
              </div>

              {/* Operátor */}
              <div>
                <label class="block text-sm font-medium text-gray-700">Operátor</label>
                <select
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                  disabled={isReadonly}
                  onInput$={(_, element) => {
                    setValue(formStore, "operator", (element as HTMLSelectElement).value);
                  }}
                  value={formStore.internal.fields.operator?.value || ""}
                >
                  <option value="">-- Vyberte --</option>
                  {OJP_OPERATORI.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Poznámka */}
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700">Poznámka</label>
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-100"
                disabled={isReadonly}
                onInput$={(_, element) => {
                  setValue(formStore, "poznamka", (element as HTMLTextAreaElement).value);
                }}
                rows={3}
                value={formStore.internal.fields.poznamka?.value || ""}
              />
            </div>

            {(addAction.value?.failed || updateAction.value?.failed) && (
              <div class="mt-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
                {addAction.value?.message || updateAction.value?.message || "Nastala chyba při ukládání"}
              </div>
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
                  onClick$={async () => {
                    await deleteAction.submit({ id: event.id });
                    if (deleteAction.value?.success) {
                      showSig.value = false;
                    }
                  }}
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
                <Button severity="accent" type="submit" variant="contained">
                  {isNewEvent ? "Přidat" : "Uložit"}
                </Button>
              )}
            </div>
          </DialogFooter>
        </QwikForm>
      </Dialog>
    );
  },
);
