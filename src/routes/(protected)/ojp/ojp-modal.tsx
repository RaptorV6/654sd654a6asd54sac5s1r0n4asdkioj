import type { Signal } from "@builder.io/qwik";

import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Pill } from "@akeso/ui-components";
import { $, component$, useComputed$, useSignal, useStore } from "@builder.io/qwik";

import type { OjpEvent, OjpSal } from "./_mock-events";

import { addOjpEvent, updateOjpEvent } from "./_actions";
import { allProcedures } from "./ojp-procedure-data";

type TabType = "nova-sablona" | "pauzy" | "vlastni";

type SelectionState = {
  level: 1 | 2 | 3;
  operator?: { firstName: string; lastName: string };
  procedure?: any;
  type?: string;
};

type OjpModalProps = {
  "bind:show": Signal<boolean>;
  event?: OjpEvent;
  initialData?: {
    dateTime?: Date;
    sal?: OjpSal;
  };
  mode: "edit" | "new" | "view";
  refreshTrigger: Signal<number>;
};

export const OjpModal = component$<OjpModalProps>(
  ({ "bind:show": showSig, event, initialData, mode, refreshTrigger }) => {
    const activeTab = useSignal<TabType>("nova-sablona");
    const selection = useStore<SelectionState>({ level: 1 });
    const isLoading = useSignal(false);
    const errorMessage = useSignal("");

    // Get unique operators from procedure data
    const operators = useComputed$(() => {
      const unique = new Map();
      allProcedures.forEach((proc) => {
        if (proc.surgeon.firstName && proc.surgeon.lastName) {
          const key = `${proc.surgeon.firstName}_${proc.surgeon.lastName}`;
          if (!unique.has(key)) {
            unique.set(key, {
              firstName: proc.surgeon.firstName,
              fullName: `${proc.surgeon.firstName} ${proc.surgeon.lastName}`,
              lastName: proc.surgeon.lastName,
            });
          }
        }
      });
      return Array.from(unique.values());
    });

    // Get types for selected operator
    const operatorTypes = useComputed$(() => {
      if (!selection.operator) return [];

      const types = new Set<string>();
      allProcedures.forEach((proc) => {
        if (
          proc.surgeon.firstName === selection.operator!.firstName &&
          proc.surgeon.lastName === selection.operator!.lastName &&
          proc.type
        ) {
          types.add(proc.type);
        }
      });
      return Array.from(types);
    });

    // Get procedures for current operator and type
    const currentProcedures = useComputed$(() => {
      if (!selection.operator || !selection.type) return [];

      return allProcedures.filter(
        (proc) =>
          proc.surgeon.firstName === selection.operator!.firstName &&
          proc.surgeon.lastName === selection.operator!.lastName &&
          proc.type === selection.type,
      );
    });

    // Get direct procedures for tabs
    const directProcedures = useComputed$(() => {
      if (activeTab.value === "pauzy") {
        return allProcedures.filter((p) => p.type === "Pauza" || p.type === "Úklid");
      }
      if (activeTab.value === "vlastni") {
        return allProcedures.filter((p) => p.type === "Ostatní");
      }
      return [];
    });

    const getEventType = $((tab: TabType, procedureType: string) => {
      if (tab === "pauzy") {
        return procedureType === "Úklid" ? "uklid" : "pauza";
      }
      if (tab === "vlastni") {
        return "svatek";
      }
      return "operace";
    });

    const resetSelection = $(() => {
      selection.level = 1;
      selection.operator = undefined;
      selection.type = undefined;
      selection.procedure = undefined;
    });

    const handleTabChange = $((tab: TabType) => {
      activeTab.value = tab;
      resetSelection();
    });

    const handleOperatorSelect = $((operator: { firstName: string; lastName: string }) => {
      selection.operator = operator;
      selection.level = 2;
      selection.type = undefined;
      selection.procedure = undefined;
    });

    const handleTypeSelect = $((type: string) => {
      selection.type = type;
      selection.level = 3;
      selection.procedure = undefined;
    });

    const handleProcedureSelect = $((procedure: any) => {
      selection.procedure = procedure;
    });

    const handleBack = $(() => {
      if (selection.level === 3) {
        selection.level = 2;
        selection.procedure = undefined;
      } else if (selection.level === 2) {
        selection.level = 1;
        selection.type = undefined;
      }
    });

    const closeModal = $(() => {
      showSig.value = false;
      resetSelection();
      errorMessage.value = "";
    });

    const handleSave = $(async () => {
      if (!selection.procedure || !initialData?.dateTime || !initialData.sal) {
        errorMessage.value = "Vyberte prosím proceduru";
        return;
      }

      try {
        isLoading.value = true;
        errorMessage.value = "";

        const startTime = initialData.dateTime;
        const endTime = new Date(startTime.getTime() + selection.procedure.duration * 60 * 1000);

        const baseEventData = {
          casDo: endTime.toTimeString().slice(0, 5),
          casOd: startTime.toTimeString().slice(0, 5),
          datum: startTime.toISOString().split("T")[0],
          operator: selection.operator ? `${selection.operator.firstName} ${selection.operator.lastName}` : undefined,
          poznamka: selection.procedure.type || undefined,
          sal: initialData.sal,
          title: selection.procedure.surgery || selection.procedure.secondIdSurgeonSurgery,
          typ: await getEventType(activeTab.value, selection.procedure.type),
        };

        let result;
        if (mode === "new") {
          result = addOjpEvent(baseEventData);
        } else if (mode === "edit" && event?.id) {
          result = updateOjpEvent({ ...baseEventData, id: event.id });
        } else {
          errorMessage.value = "Chyba: Nenalezeno ID události pro editaci";
          return;
        }

        if (result.success) {
          refreshTrigger.value = Date.now();
          closeModal();
        } else {
          errorMessage.value = result.message || "Nastala chyba při ukládání";
        }
      } catch (error) {
        console.error("Save error:", error);
        errorMessage.value = "Nastala chyba při ukládání";
      } finally {
        isLoading.value = false;
      }
    });

    return (
      <Dialog bind:show={showSig}>
        <DialogHeader>
          <div class="flex w-full items-center justify-between">
            <span>{mode === "new" ? "Přidat událost" : mode === "edit" ? "Upravit událost" : "Detail události"}</span>

            {/* Navigation pills */}
            {activeTab.value === "nova-sablona" && selection.level > 1 && (
              <div class="flex items-center gap-2">
                <Button onClick$={handleBack} size="sm" type="button" variant="outline">
                  ← Zpět
                </Button>
                <div class="flex items-center gap-1">
                  {selection.operator && (
                    <Pill severity="accent" size="sm">
                      {selection.operator.firstName} {selection.operator.lastName}
                    </Pill>
                  )}
                  {selection.type && (
                    <Pill severity="info" size="sm">
                      {selection.type}
                    </Pill>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogHeader>

        <DialogBody>
          {/* Basic info header */}
          <Card class="mb-4">
            <CardBody>
              <div class="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span class="font-medium">Sál:</span> {initialData?.sal || "---"}
                </div>
                <div>
                  <span class="font-medium">Datum:</span>{" "}
                  {initialData?.dateTime ? initialData.dateTime.toLocaleDateString("cs-CZ") : "---"}
                </div>
                <div>
                  <span class="font-medium">Čas od:</span>{" "}
                  {initialData?.dateTime ? initialData.dateTime.toTimeString().slice(0, 5) : "---"}
                </div>
                <div>
                  <span class="font-medium">Čas do:</span>{" "}
                  {selection.procedure && initialData?.dateTime
                    ? new Date(initialData.dateTime.getTime() + selection.procedure.duration * 60 * 1000)
                        .toTimeString()
                        .slice(0, 5)
                    : "---"}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Tabs */}
          <div class="mb-6 flex gap-2">
            <Button
              onClick$={() => handleTabChange("nova-sablona")}
              severity={activeTab.value === "nova-sablona" ? "accent" : "none"}
              type="button"
              variant={activeTab.value === "nova-sablona" ? "contained" : "outline"}
            >
              Nová šablona
            </Button>
            <Button
              onClick$={() => handleTabChange("pauzy")}
              severity={activeTab.value === "pauzy" ? "accent" : "none"}
              type="button"
              variant={activeTab.value === "pauzy" ? "contained" : "outline"}
            >
              Pauzy
            </Button>
            <Button
              onClick$={() => handleTabChange("vlastni")}
              severity={activeTab.value === "vlastni" ? "accent" : "none"}
              type="button"
              variant={activeTab.value === "vlastni" ? "contained" : "outline"}
            >
              Vlastní
            </Button>
          </div>

          {/* Content based on tab and level */}
          <div class="min-h-[300px]">
            {activeTab.value === "nova-sablona" && (
              <>
                {/* Level 1: Operators */}
                {selection.level === 1 && (
                  <div>
                    <h3 class="mb-4 text-lg font-medium">Operatér:</h3>
                    <div class="grid grid-cols-3 gap-3">
                      {operators.value.map((op) => (
                        <Button
                          class="h-16 text-center text-sm"
                          key={`${op.firstName}_${op.lastName}`}
                          onClick$={() => handleOperatorSelect(op)}
                          size="base"
                          type="button"
                          variant="outline"
                        >
                          {op.fullName}
                        </Button>
                      ))}
                      {operators.value.length === 0 && (
                        <div class="col-span-3 py-8 text-center text-gray-500">Žádní operátoři k dispozici</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Level 2: Types */}
                {selection.level === 2 && selection.operator && (
                  <div>
                    <h3 class="mb-4 text-lg font-medium">Typ výkonu:</h3>
                    <div class="grid grid-cols-3 gap-3">
                      {operatorTypes.value.map((type) => (
                        <Button
                          class="h-16 text-center"
                          key={type}
                          onClick$={() => handleTypeSelect(type)}
                          size="base"
                          type="button"
                          variant="outline"
                        >
                          {type}
                        </Button>
                      ))}
                      {operatorTypes.value.length === 0 && (
                        <div class="col-span-3 py-8 text-center text-gray-500">
                          Žádné typy výkonů pro tohoto operátora
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Level 3: Procedures */}
                {selection.level === 3 && (
                  <div>
                    <h3 class="mb-4 text-lg font-medium">Výkon:</h3>
                    <div class="grid grid-cols-3 gap-3">
                      {currentProcedures.value.map((proc) => (
                        <Button
                          class="h-16 p-2 text-center text-xs leading-tight"
                          key={proc.id}
                          onClick$={() => handleProcedureSelect(proc)}
                          severity={selection.procedure?.id === proc.id ? "accent" : "none"}
                          size="base"
                          type="button"
                          variant={selection.procedure?.id === proc.id ? "contained" : "outline"}
                        >
                          <div class="truncate">{proc.surgery || proc.secondIdSurgeonSurgery}</div>
                          <div class="mt-1 text-xs opacity-75">{proc.duration} min</div>
                        </Button>
                      ))}
                      {currentProcedures.value.length === 0 && (
                        <div class="col-span-3 py-8 text-center text-gray-500">Žádné výkony pro tento typ</div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Direct procedure selection for pauzy/vlastni */}
            {(activeTab.value === "pauzy" || activeTab.value === "vlastni") && (
              <div>
                <h3 class="mb-4 text-lg font-medium">{activeTab.value === "pauzy" ? "Pauzy a úklid:" : "Vlastní:"}</h3>
                <div class="grid grid-cols-3 gap-3">
                  {directProcedures.value.map((proc) => (
                    <Button
                      class="h-16 p-2 text-center text-xs leading-tight"
                      key={proc.id}
                      onClick$={() => handleProcedureSelect(proc)}
                      severity={selection.procedure?.id === proc.id ? "accent" : "none"}
                      size="base"
                      type="button"
                      variant={selection.procedure?.id === proc.id ? "contained" : "outline"}
                    >
                      <div class="truncate">{proc.secondIdSurgeonSurgery}</div>
                      <div class="mt-1 text-xs opacity-75">{proc.duration} min</div>
                    </Button>
                  ))}
                  {directProcedures.value.length === 0 && (
                    <div class="col-span-3 py-8 text-center text-gray-500">Žádné položky k dispozici</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Selection preview */}
          {selection.procedure && (
            <Card class="mt-6">
              <CardBody>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="font-medium">Operatér:</span>{" "}
                    {selection.operator ? `${selection.operator.firstName} ${selection.operator.lastName}` : "---"}
                  </div>
                  <div>
                    <span class="font-medium">Výkon:</span>{" "}
                    {selection.procedure.surgery || selection.procedure.secondIdSurgeonSurgery}
                  </div>
                  <div>
                    <span class="font-medium">Délka:</span> {selection.procedure.duration} min
                  </div>
                  <div>
                    <span class="font-medium">Oddělení:</span> {selection.procedure.type}
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Error message */}
          {errorMessage.value && (
            <Card class="mt-4 border-red-200">
              <CardBody class="text-sm text-red-600">{errorMessage.value}</CardBody>
            </Card>
          )}
        </DialogBody>

        <DialogFooter class="flex justify-between">
          <div></div>
          <div class="flex gap-2">
            <Button onClick$={closeModal} type="button" variant="outline">
              Zrušit
            </Button>
            <Button
              disabled={!selection.procedure || isLoading.value}
              onClick$={handleSave}
              severity="accent"
              type="button"
              variant="contained"
            >
              {isLoading.value ? "Ukládám..." : mode === "new" ? "Přidat" : "Uložit"}
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    );
  },
);
