import type { Signal } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, FieldDate } from "@akeso/ui-components";
import { $, component$, useStore, useTask$ } from "@builder.io/qwik";
import { setValue, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { ButtonWithConfirmation } from "~/components/button-with-confirmation";

import type { OjpEventFormData } from "./_actions";
import type { OjpEvent, OjpSal } from "./_mock-events";

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
  initialData?: {
    dateTime?: Date;
    sal?: OjpSal;
  };
  mode: "edit" | "new" | "view";
};

export const OjpEventModal = component$<OjpEventModalProps>(({ "bind:show": showSig, event, initialData, mode }) => {
  const addAction = useAddOjpEventAction();
  const updateAction = useUpdateOjpEventAction();
  const deleteAction = useDeleteOjpEventAction();

  const modalState = useStore({ mode });

  const [formStore] = useForm<OjpEventFormData>({
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
    validate: valiForm$(OjpEventSchema),
  });

  useTask$(({ track }) => {
    const isOpen = track(() => showSig.value);
    const currentMode = track(() => modalState.mode);
    const data = track(() => initialData);

    if (isOpen && currentMode === "new" && data) {
      if (data.dateTime) {
        const dateStr = data.dateTime.toISOString().split("T")[0];
        const timeStr = data.dateTime.toTimeString().slice(0, 5);

        const endTime = new Date(data.dateTime);
        endTime.setHours(endTime.getHours() + 1);
        const endTimeStr = endTime.toTimeString().slice(0, 5);

        setValue(formStore, "datum", dateStr);
        setValue(formStore, "casOd", timeStr);
        setValue(formStore, "casDo", endTimeStr);
      }

      if (data.sal) {
        setValue(formStore, "sal", data.sal);
      }

      setValue(formStore, "title", "");
      setValue(formStore, "typ", "operace");
      setValue(formStore, "operator", "");
      setValue(formStore, "poznamka", "");
    } else if (isOpen && (currentMode === "edit" || currentMode === "view") && event) {
      setValue(formStore, "sal", event.sal);
      setValue(formStore, "datum", event.dateFrom.toISOString().split("T")[0]);
      setValue(formStore, "casOd", event.dateFrom.toTimeString().slice(0, 5));
      setValue(formStore, "casDo", event.dateTo.toTimeString().slice(0, 5));
      setValue(formStore, "title", event.title);
      setValue(formStore, "typ", event.typ);
      setValue(formStore, "operator", event.operator || "");
      setValue(formStore, "poznamka", event.poznamka || "");
    }
  });

  useTask$(({ track }) => {
    const addResult = track(() => addAction.value);
    const updateResult = track(() => updateAction.value);
    const deleteResult = track(() => deleteAction.value);

    if (addResult?.success || updateResult?.success || deleteResult?.success) {
      showSig.value = false;
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

  const handleSave = $(async () => {
    const values = {
      casDo: formStore.internal.fields.casDo?.value || "",
      casOd: formStore.internal.fields.casOd?.value || "",
      datum: formStore.internal.fields.datum?.value || "",
      operator: formStore.internal.fields.operator?.value || "",
      poznamka: formStore.internal.fields.poznamka?.value || "",
      sal: formStore.internal.fields.sal?.value || "",
      title: formStore.internal.fields.title?.value || "",
      typ: formStore.internal.fields.typ?.value || "",
    };

    if (isNewEvent) {
      await addAction.submit(values);
    } else if (event) {
      await updateAction.submit({ ...values, id: event.id });
    }
  });

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
            <Button onClick$={handleSave} severity="accent" type="button" variant="contained">
              {isNewEvent ? "Přidat" : "Uložit"}
            </Button>
          )}
        </div>
      </DialogFooter>
    </Dialog>
  );
});
