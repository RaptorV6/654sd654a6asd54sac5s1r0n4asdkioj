import {
  Button,
  ButtonLabelIcon,
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  Expandable,
  ExpandableContent,
  ExpandableTrigger,
  FieldDate,
  FieldRadioSelect,
  FieldTime,
  PreviewText,
} from "@akeso/ui-components";
import { $, component$, type Signal, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
import { reset, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { EditIcon } from "~/components/icons-outline";

import { OJP_SALY } from "./_mock-events";
import { allProcedures } from "./ojp-procedure-data";

type TabType = "pauzy" | "pridat" | "vlastni";

const FormSchema = v.object({
  casOd: v.pipe(v.string("Vyberte čas"), v.minLength(1, "Vyberte čas")),
  datum: v.date("Vyberte datum"),
  sal: v.pipe(v.string("Vyberte sál"), v.minLength(1, "Vyberte sál")),
});

type FormValues = v.InferInput<typeof FormSchema>;

type OjpModalContentProps = {
  activeTab: TabType;
  data: any;
  errorMessage: string;
  showSignal: Signal<boolean>;
};

export const OjpModalContent = component$<OjpModalContentProps>(({ activeTab, data, errorMessage, showSignal }) => {
  const typExpanded = useSignal(false);
  const operatorExpanded = useSignal(false);
  const vykonExpanded = useSignal(false);

  const [formStore, { Form }] = useForm<FormValues>({
    loader: {
      value: {
        casOd: data.casOd || "",
        datum: data.datum ? new Date(data.datum) : new Date(),
        sal: data.sal || "",
      },
    },
    validate: valiForm$(FormSchema),
  });

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
    const timeString = String(data.casOd);
    const timeMatch = timeString.match(/^(\d{1,2}):(\d{2})$/);
    if (!timeMatch) return "";

    const hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return "";

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

    const endTime = new Date();
    endTime.setHours(hours, minutes + totalDuration, 0, 0);
    return endTime.toTimeString().slice(0, 5);
  });

  // ✅ Reset expanded stavů při otevření modalu
  useTask$(({ track }) => {
    track(() => showSignal.value);

    if (showSignal.value) {
      // Reset na výchozí stav - pouze typ otevřený pro tab "pridat"
      typExpanded.value = activeTab === "pridat";
      operatorExpanded.value = false;
      vykonExpanded.value = false;
    }
  });

  // ✅ Automatické otevření operatéra po výběru typu
  useTask$(({ track }) => {
    track(() => data.typ);

    if (activeTab === "pridat" && data.typ && !data.operator) {
      operatorExpanded.value = true;
      typExpanded.value = false; // Zavři typ
    }
  });

  // ✅ Automatické otevření výkonu po výběru operatéra
  useTask$(({ track }) => {
    track(() => data.operator);

    if (activeTab === "pridat" && data.operator && data.typ && !data.procedure) {
      vykonExpanded.value = true;
      operatorExpanded.value = false; // Zavři operatéra
    }
  });

  const handleOperatorSelect = $((operator: any) => {
    data.operator = operator.fullName;
    data.vykon = "";
    data.procedure = null;
    // ✅ Neuzavírám operatéra zde - nechám to na automatické logice
  });

  const handleTypeSelect = $((type: string) => {
    data.typ = type;
    data.operator = "";
    data.vykon = "";
    data.procedure = null;
    // ✅ Neuzavírám typ zde - nechám to na automatické logice
  });

  const handleProcedureSelect = $((procedure: any) => {
    data.procedure = procedure;
    data.vykon = procedure.surgery;
    vykonExpanded.value = false; // ✅ Zavři výkon po výběru
  });

  // Tracking hooks
  useTask$(({ track }) => {
    const casOd = track(() => formStore.internal.fields.casOd?.value);
    const datum = track(() => formStore.internal.fields.datum?.value);
    const sal = track(() => formStore.internal.fields.sal?.value);

    if (sal !== undefined && sal !== data.sal) {
      data.sal = sal;
    }
    if (datum !== undefined) {
      const dateString = datum instanceof Date ? datum.toISOString().split("T")[0] : datum;
      if (dateString !== data.datum) {
        data.datum = dateString;
      }
    }
    if (casOd !== undefined && casOd !== data.casOd) {
      data.casOd = casOd;
    }
  });

  useTask$(({ track }) => {
    track(() => data.casOd);
    track(() => data.datum);
    track(() => data.sal);

    const currentCasOd = formStore.internal.fields.casOd?.value;
    const currentDatum = formStore.internal.fields.datum?.value;
    const currentSal = formStore.internal.fields.sal?.value;

    const expectedDatum = data.datum ? new Date(data.datum) : new Date();
    const currentDatumString = currentDatum instanceof Date ? currentDatum.toISOString().split("T")[0] : currentDatum;

    if (data.casOd !== currentCasOd || data.datum !== currentDatumString || data.sal !== currentSal) {
      reset(formStore, {
        initialValues: {
          casOd: data.casOd || "",
          datum: expectedDatum,
          sal: data.sal || "",
        },
      });
    }
  });

  return (
    <div class="space-y-6">
      {/* ✅ ZÁKLADNÍ ÚDAJE */}
      <Card>
        <CardHeader>
          <CardHeaderTitle>Základní údaje</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <Form class="form-styles">
            <div class="grid grid-cols-4 gap-6">
              <div>
                <FieldRadioSelect label="Sál" name="sal" of={formStore} options={salOptions} required />
              </div>
              <div>
                <FieldDate
                  label="Datum"
                  name="datum"
                  of={formStore}
                  onClick$={$((_, element: HTMLInputElement) => {
                    element.showPicker();
                  })}
                  required
                />
              </div>
              <div>
                <FieldTime
                  label="Čas od"
                  name="casOd"
                  of={formStore}
                  onClick$={$((_, element: HTMLInputElement) => {
                    element.showPicker();
                  })}
                  required
                />
              </div>
              <div>
                <PreviewText label="Čas do" value={calculateEndTime.value || "---"} />
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>

      {/* ✅ VÝBĚR OPERACE */}
      <Card>
        <CardHeader>
          <CardHeaderTitle>Výběr operace</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <div class="space-y-4">
            {activeTab === "pridat" && (
              <>
                {/* ✅ Expandable řádek pro Typ */}
                <Expandable bind:expanded={typExpanded}>
                  <ExpandableTrigger class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50">
                    <div class="flex items-center gap-4">
                      <span class="w-20 font-medium">Typ:</span>
                      <span class="text-gray-700">{data.typ || "Nevybráno"}</span>
                    </div>
                    <div class="flex items-center">
                      <ButtonLabelIcon as={EditIcon} standalone />
                      <span class="sr-only">Změnit typ</span>
                    </div>
                  </ExpandableTrigger>

                  <ExpandableContent>
                    <div class="grid grid-cols-6 gap-3 rounded-b-lg bg-gray-50 p-4">
                      {availableTypes.value.map((type) => (
                        <Button
                          class="transition-all duration-200"
                          key={type}
                          onClick$={() => handleTypeSelect(type)}
                          severity={data.typ === type ? "accent" : "none"}
                          size="sm"
                          type="button"
                          variant={data.typ === type ? "contained" : "outline"}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </ExpandableContent>
                </Expandable>

                {/* ✅ Expandable řádek pro Operatér */}
                {data.typ && (
                  <Expandable bind:expanded={operatorExpanded}>
                    <ExpandableTrigger class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50">
                      <div class="flex items-center gap-4">
                        <span class="w-20 font-medium">Operatér:</span>
                        <span class="text-gray-700">{data.operator || "Nevybráno"}</span>
                      </div>
                      <div class="flex items-center">
                        <ButtonLabelIcon as={EditIcon} standalone />
                        <span class="sr-only">Změnit operatéra</span>
                      </div>
                    </ExpandableTrigger>

                    <ExpandableContent>
                      <div class="grid grid-cols-4 gap-3 rounded-b-lg bg-gray-50 p-4">
                        {operatorsForType.value.map((op) => (
                          <Button
                            class="transition-all duration-200"
                            key={op.fullName}
                            onClick$={() => handleOperatorSelect(op)}
                            severity={data.operator === op.fullName ? "accent" : "none"}
                            size="sm"
                            type="button"
                            variant={data.operator === op.fullName ? "contained" : "outline"}
                          >
                            {op.fullName}
                          </Button>
                        ))}
                      </div>
                    </ExpandableContent>
                  </Expandable>
                )}

                {/* ✅ Expandable řádek pro Výkon */}
                {data.operator && data.typ && (
                  <Expandable bind:expanded={vykonExpanded}>
                    <ExpandableTrigger class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50">
                      <div class="flex items-center gap-4">
                        <span class="w-20 font-medium">Výkon:</span>
                        <span class="flex-1 truncate text-gray-700">{data.vykon || "Nevybráno"}</span>
                        {data.procedure && (
                          <span class="ml-2 text-sm text-gray-500">({data.procedure.duration} min)</span>
                        )}
                      </div>
                      <div class="flex items-center">
                        <ButtonLabelIcon as={EditIcon} standalone />
                        <span class="sr-only">Změnit výkon</span>
                      </div>
                    </ExpandableTrigger>

                    <ExpandableContent>
                      <div class="rounded-b-lg bg-gray-50 p-4">
                        {currentProcedures.value.length > 0 ? (
                          <div class="grid grid-cols-3 gap-3">
                            {currentProcedures.value.map((proc) => (
                              <Button
                                class="h-16 p-3 text-xs leading-tight"
                                key={proc.id}
                                onClick$={() => handleProcedureSelect(proc)}
                                severity={data.procedure?.id === proc.id ? "accent" : "none"}
                                size="sm"
                                type="button"
                                variant={data.procedure?.id === proc.id ? "contained" : "outline"}
                              >
                                <div class="truncate font-medium">{proc.surgery}</div>
                                <div class="mt-1 text-xs opacity-75">{proc.duration} min</div>
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <div class="rounded border bg-white p-4 text-sm text-gray-500">
                            Žádné výkony pro operatéra "{data.operator}" v kategorii "{data.typ}"
                          </div>
                        )}
                      </div>
                    </ExpandableContent>
                  </Expandable>
                )}
              </>
            )}

            {(activeTab === "pauzy" || activeTab === "vlastni") && (
              <div class="space-y-4">
                <h3 class="text-lg font-medium">{activeTab === "pauzy" ? "Pauzy a úklid:" : "Vlastní:"}</h3>
                <div class="grid grid-cols-5 gap-3">
                  {directProcedures.value.map((proc) => (
                    <Button
                      class="h-16 p-3 text-xs leading-tight"
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
        </CardBody>
      </Card>

      {errorMessage && (
        <Card class="border-red-200">
          <CardBody class="text-sm text-red-600">{errorMessage}</CardBody>
        </Card>
      )}
    </div>
  );
});
