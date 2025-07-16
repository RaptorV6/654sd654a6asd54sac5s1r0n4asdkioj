import type { Signal } from "@builder.io/qwik";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@akeso/ui-components";
import { $, component$, useComputed$, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import type { OjpEvent, OjpSal } from "./_mock-events";

import { addOjpEvent } from "./_actions";
import { OjpModalContent } from "./ojp-modal-content";
import { OjpModalPreview } from "./ojp-modal-preview";
import { allProcedures } from "./ojp-procedure-data"; // ✅ Import pro všechny procedures

type TabType = "pauzy" | "pridat" | "vlastni";

type OjpModalProps = {
  "bind:show": Signal<boolean>;
  event?: OjpEvent;
  initialData?: {
    dateTime?: Date;
    sal?: OjpSal;
  };
  mode: "edit" | "new";
  refreshTrigger: Signal<number>;
};

export const OjpModal = component$<OjpModalProps>(({ "bind:show": showSig, initialData, mode, refreshTrigger }) => {
  const activeTab = useSignal<TabType>("pridat");
  const isLoading = useSignal(false);
  const errorMessage = useSignal("");

  const modalData = useStore({
    casOd: initialData?.dateTime ? initialData.dateTime.toTimeString().slice(0, 5) : "",
    datum: initialData?.dateTime ? initialData.dateTime.toISOString().split("T")[0] : "",
    operator: "",
    procedure: null as any,
    repeatCount: 1,
    sal: initialData?.sal || "",
    separators: {} as Record<number, any>,
    typ: "",
    vykon: "",
  });

  // ✅ Computed pro načítání separátorů z procedure listu
  const separatorOptions = useComputed$(() => {
    return allProcedures
      .filter(
        (proc) =>
          // Hledáme "other" procedures s cleaning ID
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

  const closeModal = $(() => {
    showSig.value = false;
    errorMessage.value = "";
    activeTab.value = "pridat";
    modalData.casOd = "";
    modalData.datum = "";
    modalData.operator = "";
    modalData.procedure = null;
    modalData.repeatCount = 1;
    modalData.sal = "";
    modalData.separators = {};
    modalData.typ = "";
    modalData.vykon = "";
  });

  const handleSave = $(async () => {
    if (!modalData.procedure || !modalData.datum || !modalData.casOd || !modalData.sal) {
      errorMessage.value = "Vyplňte všechny povinné údaje";
      return;
    }

    try {
      isLoading.value = true;
      errorMessage.value = "";

      if (activeTab.value === "pauzy" || activeTab.value === "vlastni") {
        const startTime = new Date(`${modalData.datum}T${modalData.casOd}`);
        const endTime = new Date(startTime.getTime() + modalData.procedure.duration * 60 * 1000);

        const eventData = {
          casDo: endTime.toTimeString().slice(0, 5),
          casOd: modalData.casOd,
          datum: modalData.datum,
          operator: undefined,
          poznamka: undefined,
          sal: modalData.sal,
          title: modalData.procedure.secondIdSurgeonSurgery || modalData.procedure.surgery,
          typ: activeTab.value === "pauzy" ? "pauza" : "svatek",
        };

        const result = addOjpEvent(eventData);
        if (!result.success) {
          errorMessage.value = result.message || "Nastala chyba při ukládání";
          return;
        }
      } else {
        let currentTime = new Date(`${modalData.datum}T${modalData.casOd}`);

        for (let i = 0; i < modalData.repeatCount; i++) {
          const operationNumber = i + 1;

          // Přidej operaci
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
          if (!result.success) {
            errorMessage.value = result.message || "Nastala chyba při ukládání";
            return;
          }

          currentTime = endTime;

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
          if (!separatorResult.success) {
            errorMessage.value = separatorResult.message || "Nastala chyba při ukládání ÚS";
            return;
          }

          currentTime = separatorEndTime;
        }
      }

      refreshTrigger.value = Date.now();
      closeModal();
    } catch (error) {
      console.error("Save error:", error);
      errorMessage.value = "Nastala chyba při ukládání";
    } finally {
      isLoading.value = false;
    }
  });

  useTask$(({ track }: { track: (signal: any) => void }) => {
    track(() => showSig.value);
    track(() => initialData);

    if (showSig.value && initialData) {
      modalData.sal = initialData.sal || "";
      modalData.datum = initialData.dateTime ? initialData.dateTime.toISOString().split("T")[0] : "";
      modalData.casOd = initialData.dateTime ? initialData.dateTime.toTimeString().slice(0, 5) : "";
    }
  });

  return (
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
              Přidat událost
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
        <div></div>
        <div class="flex gap-3">
          <Button onClick$={closeModal} size="sm" type="button" variant="outline">
            Zrušit
          </Button>
          <Button
            disabled={!modalData.procedure || isLoading.value}
            onClick$={handleSave}
            severity="accent"
            size="sm"
            type="button"
            variant="contained"
          >
            {isLoading.value ? "Ukládám..." : mode === "new" ? "Přidat" : "Uložit"}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
});
