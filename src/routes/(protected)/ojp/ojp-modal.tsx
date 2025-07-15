import type { Signal } from "@builder.io/qwik";

import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  InputNumber,
  Pill,
} from "@akeso/ui-components";
import { $, component$, useComputed$, useSignal, useStore } from "@builder.io/qwik";

import type { OjpEvent, OjpSal } from "./_mock-events";

import { addOjpEvent } from "./_actions";
import { allProcedures } from "./ojp-procedure-data";

type TabType = "nova-sablona" | "pauzy" | "vlastni";

type SeparatorType = {
  duration: number;
  id: string;
  name: string;
};

type SelectionState = {
  level: 1 | 2 | 3;
  operator?: { firstName: string; lastName: string };
  procedure?: any;
  repeatCount: number;
  separators: Record<number, SeparatorType>; // Po operaci N
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

export const OjpModal = component$<OjpModalProps>(({ "bind:show": showSig, initialData, mode, refreshTrigger }) => {
  const activeTab = useSignal<TabType>("nova-sablona");
  const selection = useStore<SelectionState>({
    level: 1,
    repeatCount: 1,
    separators: {},
  });
  const isLoading = useSignal(false);
  const errorMessage = useSignal("");

  // Available separators (úklid types)
  const separatorOptions: SeparatorType[] = [
    { duration: 15, id: "us-basic", name: "ÚS" },
    { duration: 30, id: "us-tep", name: "ÚS TEP" },
    { duration: 45, id: "us-extended", name: "ÚS+" },
  ];

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
    selection.repeatCount = 1;
    selection.separators = {};
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
    // ✅ OPRAVA: Initialize separators pro KAŽDOU operaci (1 až repeatCount)
    const newSeparators: Record<number, SeparatorType> = {};
    for (let i = 1; i <= selection.repeatCount; i++) {
      newSeparators[i] = separatorOptions[0]; // Default ÚS po každé operaci
    }
    selection.separators = newSeparators;
  });

  const handleSeparatorChange = $((index: number, separator: SeparatorType) => {
    selection.separators[index] = separator;
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

      let currentTime = new Date(initialData.dateTime);

      // ✅ OPRAVA: Po každé operaci vždy ÚS
      for (let i = 0; i < selection.repeatCount; i++) {
        const operationNumber = i + 1;

        // Add main procedure
        const endTime = new Date(currentTime.getTime() + selection.procedure.duration * 60 * 1000);

        const procedureEventData = {
          casDo: endTime.toTimeString().slice(0, 5),
          casOd: currentTime.toTimeString().slice(0, 5),
          datum: currentTime.toISOString().split("T")[0],
          operator: selection.operator ? `${selection.operator.firstName} ${selection.operator.lastName}` : undefined,
          poznamka: selection.procedure.type ?? undefined,
          sal: initialData.sal,
          title: selection.procedure.secondIdSurgeonSurgery,
          typ: await getEventType(activeTab.value, selection.procedure.type),
        };

        const result = addOjpEvent(procedureEventData);

        if (!result.success) {
          errorMessage.value = result.message ?? "Nastala chyba při ukládání";
          return;
        }

        currentTime = endTime;

        const separator = selection.separators[operationNumber] ?? separatorOptions[0];
        const separatorEndTime = new Date(currentTime.getTime() + separator.duration * 60 * 1000);

        const separatorEventData = {
          casDo: separatorEndTime.toTimeString().slice(0, 5),
          casOd: currentTime.toTimeString().slice(0, 5),
          datum: currentTime.toISOString().split("T")[0],
          operator: undefined,
          poznamka: undefined,
          sal: initialData.sal,
          title: separator.name,
          typ: "uklid",
        };

        const separatorResult = addOjpEvent(separatorEventData);

        if (!separatorResult.success) {
          errorMessage.value = separatorResult.message ?? "Nastala chyba při ukládání ÚS";
          return;
        }

        currentTime = separatorEndTime;
      }

      refreshTrigger.value = Date.now();
      closeModal();
    } catch (error) {
      console.error("❌ Save error:", error);
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
        </div>
      </DialogHeader>

      <DialogBody>
        {/* Basic info header */}
        <Card class="mb-4">
          <CardBody>
            <div class="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span class="font-medium">Sál:</span> {initialData?.sal ?? "---"}
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
                  ? (() => {
                      // ✅ OPRAVA: Počítej ÚS po každé operaci
                      let totalDuration = selection.procedure.duration * selection.repeatCount;
                      for (let i = 1; i <= selection.repeatCount; i++) {
                        const separator = selection.separators[i] ?? separatorOptions[0];
                        totalDuration += separator.duration;
                      }
                      return new Date(initialData.dateTime.getTime() + totalDuration * 60 * 1000)
                        .toTimeString()
                        .slice(0, 5);
                    })()
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
            size="sm"
            type="button"
            variant={activeTab.value === "nova-sablona" ? "contained" : "outline"}
          >
            Nový záznam
          </Button>
          <Button
            onClick$={() => handleTabChange("pauzy")}
            severity={activeTab.value === "pauzy" ? "accent" : "none"}
            size="sm"
            type="button"
            variant={activeTab.value === "pauzy" ? "contained" : "outline"}
          >
            Pauzy
          </Button>
          <Button
            onClick$={() => handleTabChange("vlastni")}
            severity={activeTab.value === "vlastni" ? "accent" : "none"}
            size="sm"
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
                  <div class="grid grid-cols-6 gap-1">
                    {operators.value.map((op) => (
                      <Button
                        class="h-8 px-1 text-center text-xs"
                        key={`${op.firstName}_${op.lastName}`}
                        onClick$={() => handleOperatorSelect(op)}
                        size="xs"
                        type="button"
                        variant="outline"
                      >
                        <span class="truncate">{op.fullName}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Level 2: Types */}
              {selection.level === 2 && selection.operator && (
                <div>
                  <div class="mb-4 flex items-center justify-between">
                    <h3 class="text-lg font-medium">
                      Operatér:{" "}
                      <Pill severity="accent" size="sm">
                        {selection.operator.firstName} {selection.operator.lastName}
                      </Pill>
                    </h3>
                    <Button
                      onClick$={() => {
                        selection.level = 1;
                        selection.type = undefined;
                        selection.procedure = undefined;
                      }}
                      size="xs"
                      type="button"
                      variant="outline"
                    >
                      Změň
                    </Button>
                  </div>
                  <h4 class="text-md mb-3 font-medium">Typ výkonu:</h4>
                  <div class="grid grid-cols-4 gap-2">
                    {operatorTypes.value.map((type) => (
                      <Button
                        class="h-10 text-center text-sm"
                        key={type}
                        onClick$={() => handleTypeSelect(type)}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Level 3: Procedures */}
              {selection.level === 3 && selection.operator && selection.type && (
                <div>
                  <div class="mb-4 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <Pill severity="accent" size="sm">
                        {selection.operator.firstName} {selection.operator.lastName}
                      </Pill>
                      <Pill severity="info" size="sm">
                        {selection.type}
                      </Pill>
                    </div>
                    <div class="flex gap-1">
                      <Button
                        onClick$={() => {
                          selection.level = 1;
                          selection.type = undefined;
                          selection.procedure = undefined;
                        }}
                        size="xs"
                        type="button"
                        variant="outline"
                      >
                        Změň operatéra
                      </Button>
                      <Button
                        onClick$={() => {
                          selection.level = 2;
                          selection.procedure = undefined;
                        }}
                        size="xs"
                        type="button"
                        variant="outline"
                      >
                        Změň typ
                      </Button>
                    </div>
                  </div>
                  <h4 class="text-md mb-3 font-medium">Výkon:</h4>
                  <div class="grid grid-cols-3 gap-2">
                    {currentProcedures.value.map((proc) => (
                      <Button
                        class="h-12 p-2 text-center text-xs leading-tight"
                        key={proc.id}
                        onClick$={() => handleProcedureSelect(proc)}
                        severity={selection.procedure?.id === proc.id ? "accent" : "none"}
                        size="sm"
                        type="button"
                        variant={selection.procedure?.id === proc.id ? "contained" : "outline"}
                      >
                        <div class="truncate font-medium">{proc.surgery}</div>
                        <div class="mt-1 text-xs opacity-75">{proc.duration} min</div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Direct procedure selection for pauzy/vlastni */}
          {(activeTab.value === "pauzy" || activeTab.value === "vlastni") && (
            <div>
              <h3 class="mb-4 text-lg font-medium">{activeTab.value === "pauzy" ? "Pauzy a úklid:" : "Vlastní:"}</h3>
              <div class="grid grid-cols-4 gap-2">
                {directProcedures.value.map((proc) => (
                  <Button
                    class="h-12 p-2 text-center text-xs leading-tight"
                    key={proc.id}
                    onClick$={() => handleProcedureSelect(proc)}
                    severity={selection.procedure?.id === proc.id ? "accent" : "none"}
                    size="sm"
                    type="button"
                    variant={selection.procedure?.id === proc.id ? "contained" : "outline"}
                  >
                    <div class="truncate font-medium">{proc.secondIdSurgeonSurgery}</div>
                    <div class="mt-1 text-xs opacity-75">{proc.duration} min</div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selection preview with repeat count */}
        {selection.procedure && (
          <Card class="mt-6">
            <CardBody>
              <div class="mb-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="font-medium">Operatér:</span>{" "}
                  {selection.operator ? `${selection.operator.firstName} ${selection.operator.lastName}` : "---"}
                </div>
                <div>
                  <span class="font-medium">Výkon:</span> {selection.procedure.surgery}
                </div>
                <div>
                  <span class="font-medium">Délka:</span> {selection.procedure.duration} min
                </div>
                <div>
                  <span class="font-medium">Oddělení:</span> {selection.procedure.type}
                </div>
              </div>

              <div class="border-t pt-4">
                <InputNumber
                  error=""
                  label="Počet opakování"
                  max={10}
                  min={1}
                  name="repeatCount"
                  onInput$={(_, target) => {
                    const newCount = parseInt(target.value) || 1;
                    selection.repeatCount = newCount;

                    // ✅ OPRAVA: Update separators pro KAŽDOU operaci (1 až newCount)
                    const newSeparators: Record<number, SeparatorType> = {};
                    for (let i = 1; i <= newCount; i++) {
                      newSeparators[i] = selection.separators[i] ?? separatorOptions[0];
                    }
                    selection.separators = newSeparators;
                  }}
                  value={selection.repeatCount}
                />

                {selection.repeatCount >= 1 && (
                  <div class="mt-4">
                    <h5 class="mb-2 text-sm font-medium">Úklid po každé operaci:</h5>
                    {/* ✅ OPRAVA: Zobraz separators pro KAŽDOU operaci (1 až repeatCount) */}
                    {Array.from({ length: selection.repeatCount }, (_, i) => {
                      const operationNumber = i + 1;
                      const currentSeparator = selection.separators[operationNumber] ?? separatorOptions[0];

                      return (
                        <div class="mb-2 flex items-center gap-2" key={i}>
                          <span class="text-sm">Po {operationNumber}. operaci:</span>
                          <div class="flex gap-1">
                            {separatorOptions.map((sep) => (
                              <Button
                                class="h-8 px-2 text-xs"
                                key={sep.id}
                                onClick$={() => handleSeparatorChange(operationNumber, sep)}
                                severity={currentSeparator.id === sep.id ? "accent" : "none"}
                                size="xs"
                                type="button"
                                variant={currentSeparator.id === sep.id ? "contained" : "outline"}
                              >
                                {sep.name} ({sep.duration}min)
                              </Button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <p class="mt-2 text-xs text-gray-500">
                  Celková doba:{" "}
                  {(() => {
                    let total = selection.procedure.duration * selection.repeatCount;
                    // ✅ OPRAVA: Počítej ÚS po každé operaci
                    for (let i = 1; i <= selection.repeatCount; i++) {
                      const separator = selection.separators[i] ?? separatorOptions[0];
                      total += separator.duration;
                    }
                    return total;
                  })()}{" "}
                  min
                </p>
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
          <Button onClick$={closeModal} size="sm" type="button" variant="outline">
            Zrušit
          </Button>
          <Button
            disabled={!selection.procedure || isLoading.value}
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
