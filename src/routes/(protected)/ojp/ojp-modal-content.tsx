import { Button, Card, CardBody, InputDate, InputRadioSelect, InputTime } from "@akeso/ui-components";
import { $, component$, useComputed$ } from "@builder.io/qwik";

import { OJP_SALY } from "./_mock-events";
import { allProcedures } from "./ojp-procedure-data";

type TabType = "pauzy" | "pridat" | "vlastni";

type OjpModalContentProps = {
  activeTab: TabType;
  data: any;
  errorMessage: string;
};

export const OjpModalContent = component$<OjpModalContentProps>(({ activeTab, data, errorMessage }) => {
  const salOptions = OJP_SALY.map((sal) => ({
    label: sal.displayName,
    value: sal.name,
  }));

  const availableTypes = useComputed$(() => {
    const types = new Set<string>();
    allProcedures.forEach((proc) => {
      if (proc.type && proc.surgeon.firstName && proc.surgeon.lastName) {
        types.add(proc.type);
      }
    });
    return Array.from(types).sort();
  });

  const operatorsForType = useComputed$(() => {
    if (!data.typ) return [];

    const unique = new Map();
    allProcedures.forEach((proc) => {
      if (proc.surgeon.firstName && proc.surgeon.lastName && proc.type === data.typ) {
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

  const currentProcedures = useComputed$(() => {
    if (!data.operator || !data.typ) return [];
    const [firstName, lastName] = data.operator.split(" ");

    return allProcedures.filter(
      (proc) => proc.surgeon.firstName === firstName && proc.surgeon.lastName === lastName && proc.type === data.typ,
    );
  });

  const directProcedures = useComputed$(() => {
    if (activeTab === "pauzy") {
      return allProcedures.filter((p) => p.type === "Pauza" || p.type === "Úklid");
    }
    if (activeTab === "vlastni") {
      return allProcedures.filter((p) => p.type === "Ostatní");
    }
    return [];
  });

  const calculateEndTime = useComputed$(() => {
    if (!data.procedure || !data.casOd) return "";

    let totalDuration = data.procedure.duration;

    if (activeTab === "pridat") {
      totalDuration *= data.repeatCount;
      const separatorOptions = [
        { duration: 15, id: "us-basic", name: "ÚS" },
        { duration: 30, id: "us-tep", name: "ÚS TEP" },
        { duration: 45, id: "us-extended", name: "ÚS+" },
      ];

      for (let i = 1; i <= data.repeatCount; i++) {
        const separator = data.separators?.[i] || separatorOptions[0];
        totalDuration += separator.duration;
      }
    }

    const [hours, minutes] = data.casOd.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(hours, minutes + totalDuration, 0, 0);
    return endTime.toTimeString().slice(0, 5);
  });

  const handleOperatorSelect = $((operator: any) => {
    data.operator = operator.fullName;
    data.vykon = "";
    data.procedure = null;
  });

  const handleTypeSelect = $((type: string) => {
    data.typ = type;
    data.operator = "";
    data.vykon = "";
    data.procedure = null;
  });

  const handleProcedureSelect = $((procedure: any) => {
    data.procedure = procedure;
    data.vykon = procedure.surgery;
  });

  return (
    <div class="space-y-6">
      {/* ✅ Základní údaje s Akeso Input komponenty */}
      <Card>
        <CardBody>
          <div class="grid grid-cols-4 gap-4">
            <InputRadioSelect
              emptyOptionLabel="Vyberte sál"
              error=""
              label="Sál"
              name="sal"
              onInput$={(_: any, target: any) => (data.sal = target.value)}
              options={salOptions}
              required
              value={data.sal}
            />
            <InputDate
              error=""
              label="Datum"
              name="datum"
              onInput$={(_: any, target: any) => (data.datum = target.value)}
              required
              value={data.datum}
            />
            <InputTime
              error=""
              label="Čas od"
              name="casOd"
              onInput$={(_: any, target: any) => (data.casOd = target.value)}
              required
              value={data.casOd}
            />
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Čas do</label>
              <div class="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500">
                {calculateEndTime.value || "---"}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ✅ Fixní výška pro selection oblast */}
      <div class="h-[300px] space-y-4 overflow-y-auto">
        {activeTab === "pridat" && (
          <>
            <div class="flex items-center gap-4">
              <span class="w-20 text-sm font-medium">Typ:</span>
              {data.typ ? (
                <div class="flex flex-1 items-center gap-2">
                  <span class="flex-1 rounded border bg-gray-50 px-3 py-2">{data.typ}</span>
                  <Button
                    onClick$={() => {
                      data.typ = "";
                      data.operator = "";
                      data.vykon = "";
                      data.procedure = null;
                    }}
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    Změnit
                  </Button>
                </div>
              ) : (
                <div class="grid flex-1 grid-cols-4 gap-2">
                  {availableTypes.value.map((type) => (
                    <Button
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
              )}
            </div>

            {data.typ && (
              <div class="flex items-center gap-4">
                <span class="w-20 text-sm font-medium">Operatér:</span>
                {data.operator ? (
                  <div class="flex flex-1 items-center gap-2">
                    <span class="flex-1 rounded border bg-gray-50 px-3 py-2">{data.operator}</span>
                    <Button
                      onClick$={() => {
                        data.operator = "";
                        data.vykon = "";
                        data.procedure = null;
                      }}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      Změnit
                    </Button>
                  </div>
                ) : (
                  <div class="grid flex-1 grid-cols-6 gap-1">
                    {operatorsForType.value.map((op) => (
                      <Button
                        class="h-8 px-1 text-xs"
                        key={op.fullName}
                        onClick$={() => handleOperatorSelect(op)}
                        size="xs"
                        type="button"
                        variant="outline"
                      >
                        {op.fullName}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {data.operator && data.typ && (
              <div class="flex items-center gap-4">
                <span class="w-20 text-sm font-medium">Výkon:</span>
                {data.vykon ? (
                  <div class="flex flex-1 items-center gap-2">
                    <span class="flex-1 rounded border bg-gray-50 px-3 py-2">{data.vykon}</span>
                    <Button
                      onClick$={() => {
                        data.vykon = "";
                        data.procedure = null;
                      }}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      Změnit
                    </Button>
                  </div>
                ) : (
                  <div class="flex-1">
                    {currentProcedures.value.length > 0 ? (
                      <div class="grid grid-cols-3 gap-2">
                        {currentProcedures.value.map((proc) => (
                          <Button
                            class="h-12 p-2 text-xs leading-tight"
                            key={proc.id}
                            onClick$={() => handleProcedureSelect(proc)}
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            <div class="truncate font-medium">{proc.surgery}</div>
                            <div class="mt-1 text-xs opacity-75">{proc.duration} min</div>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div class="rounded border bg-gray-50 p-4 text-sm text-gray-500">
                        Žádné výkony pro operatéra "{data.operator}" v kategorii "{data.typ}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {(activeTab === "pauzy" || activeTab === "vlastni") && (
          <div class="space-y-4">
            <h3 class="text-lg font-medium">{activeTab === "pauzy" ? "Pauzy a úklid:" : "Vlastní:"}</h3>
            <div class="grid grid-cols-4 gap-2">
              {directProcedures.value.map((proc) => (
                <Button
                  class="h-12 p-2 text-xs leading-tight"
                  key={proc.id}
                  onClick$={() => handleProcedureSelect(proc)}
                  severity={data.procedure?.id === proc.id ? "accent" : "none"}
                  size="sm"
                  type="button"
                  variant={data.procedure?.id === proc.id ? "contained" : "outline"}
                >
                  <div class="truncate font-medium">{proc.secondIdSurgeonSurgery}</div>
                  <div class="mt-1 text-xs opacity-75">{proc.duration} min</div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <Card class="border-red-200">
          <CardBody class="text-sm text-red-600">{errorMessage}</CardBody>
        </Card>
      )}
    </div>
  );
});
