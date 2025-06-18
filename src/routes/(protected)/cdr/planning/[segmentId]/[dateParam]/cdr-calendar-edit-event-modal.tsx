import {
  Alert,
  Button,
  ButtonLabelIcon,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  FieldCheckbox,
  FieldDate,
  FieldNumber,
  FieldRadioSelect,
  FieldTime,
  InputAdornmentText,
  PreviewText,
} from "@akeso/ui-components";
import { dateAddMinutes } from "@akeso/utils";
import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
import { insert, remove, reset, setValue, submit, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

import { DeleteIcon } from "~/components/icons-outline";

import { _mock_employees, _mock_medicalProcedures, _mock_organizationHierarchy } from "../../_mock-data";
import { useCdrCalendarContext } from "./cdr-calendar-context";

const formSchema = v.object({
  assignedEmployeeIds: v.pipe(v.array(v.pipe(v.string(), v.minLength(1))), v.minLength(1)),
  date: v.date("Pole je povinné."),
  duration: v.pipe(v.number("Pole je povinné."), v.integer("Zadejte celé číslo.")),
  medicalProcedureId: v.pipe(v.string("Vyberte proceduru."), v.minLength(1, "Vyberte proceduru.")),
  startTime: v.pipe(v.string("Pole je povinné."), v.isoTime("Neplatný čas.")),
  stations: v.record(v.string(), v.boolean()),
});
type FormInput = v.InferInput<typeof formSchema>;
// type FormOutput = v.InferOutput<typeof formSchema>;

export const CdrCalendarEditEventModal = component$((/* { "bind:show": showSig, event } */) => {
  const ctx = useCdrCalendarContext();

  const titleSig = useSignal<string>("");
  const openDialogSig = useSignal(false);

  const availStations = _mock_organizationHierarchy.filter((oh) =>
    ["2C", "2D", "3A", "3B", "3C", "3D", "5P"].includes(oh.id),
  );

  const [formStore, { FieldArray, Form }] = useForm<FormInput>({
    fieldArrays: ["assignedEmployeeIds"],
    loader: {
      value: {
        assignedEmployeeIds: [],
        date: undefined,
        duration: undefined,
        medicalProcedureId: undefined,
        startTime: "08:00",
        stations: Object.fromEntries(availStations.map((s) => [s.id, s.id === ctx.selectedStationId])),
      },
    },
    validate: valiForm$(formSchema),
  });

  // Track edit data changes...
  useTask$(({ track }) => {
    track(() => ctx.editData);
    // ... open or close dialog ...
    openDialogSig.value = ctx.editData != null;
    // ... if are edit data set, prepare form based on editation mode ...
    if (ctx.editData) {
      const timeFormatter = new Intl.DateTimeFormat("cs", { hour: "2-digit", hourCycle: "h23", minute: "2-digit" });
      if (ctx.editData.mode === "new") {
        titleSig.value = "Nová položka programu";
        reset(formStore, {
          initialValues: {
            assignedEmployeeIds: [],
            date: ctx.editData.data.startDateTime,
            duration: undefined,
            medicalProcedureId: undefined,
            startTime: timeFormatter.format(ctx.editData.data.startDateTime),
            stations: Object.fromEntries(availStations.map((s) => [s.id, s.id === ctx.selectedStationId])),
          },
        });
      } else {
        titleSig.value = ctx.editData.data.title ?? "";

        // Create list of selected organization hierarchy item IDs.
        const ohs = ctx.editData.data.organizationHierarchies.map((oh) => oh.id);

        reset(formStore, {
          initialValues: {
            // assignedEmployeeIds: ctx.editData.data.assigned.map((i) => i.employee.id),
            assignedEmployeeIds: ["lechovská-veronika"],
            date: ctx.editData.data.dateFrom,
            duration: ctx.editData.data.duration,
            medicalProcedureId: ctx.editData.data.medicalProcedure.id,
            startTime: timeFormatter.format(ctx.editData.data.dateFrom),
            stations: Object.fromEntries(availStations.map((s) => [s.id, ohs.includes(s.id)])),
          },
        });
      }
    } else {
      //... if data are un
      reset(formStore);
      titleSig.value = "";
    }
  });

  // Track dialog open signal. Unset edit data if dialog is closed.
  useTask$(({ track }) => {
    track(() => openDialogSig.value);
    if (openDialogSig.value === false) {
      ctx.editData = null;
    }
  });

  // Update duration by average medical procedure time.
  // Do it only if field of duration was not touched.
  useTask$(({ track }) => {
    const medicalProcedureId = track(() => formStore.internal.fields.medicalProcedureId?.value);
    const procedure = _mock_medicalProcedures.find((p) => p.id === medicalProcedureId);
    if (procedure && !formStore.internal.fields.duration?.touched) {
      setValue(formStore, "duration", procedure.avgTimeMin, { shouldTouched: false });
    }
  });

  // Compute time to
  const timeToSig = useComputed$(() => {
    const dt = formStore.internal.fields.date?.value;
    const tf = formStore.internal.fields.startTime?.value;
    const d = formStore.internal.fields.duration?.value;
    if (dt && tf && d) {
      const tfp = tf.split(":").map((c) => Number(c));
      return dateAddMinutes(d, new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), tfp[0], tfp[1]))
        .toTimeString()
        .slice(0, 5);
    }
    return "";
  });

  return (
    <Dialog bind:show={openDialogSig}>
      <DialogHeader>
        <h1>{titleSig.value}</h1>
      </DialogHeader>
      <DialogBody stoppropagation:click>
        <Form class="form-styles mt-4">
          <FieldRadioSelect
            label="Vyšetření"
            name="medicalProcedureId"
            of={formStore}
            options={_mock_medicalProcedures.map((p) => ({
              label: p.name,
              value: p.id,
            }))}
          />
          <div class="mt-4 flex flex-col gap-4 md:flex-row">
            <div class="flex-1">
              <FieldDate label="Datum" name="date" of={formStore} />
              <FieldTime label="Začátek" name="startTime" of={formStore} />
              <FieldNumber
                adornmentEnd={<InputAdornmentText>min</InputAdornmentText>}
                label="Délka trvání"
                name="duration"
                of={formStore}
              />
              <PreviewText label="Konec" value={timeToSig.value} />
            </div>
            <div class="mt-4 flex-1 sm:mt-0">
              <fieldset>
                <legend class="text-sm text-app-text-weak">
                  Pro oddělení <abbr class="text-error-text-base">*</abbr>
                </legend>
                <ul>
                  {availStations.map((station) => (
                    <li key={station.id}>
                      <FieldCheckbox
                        label={station.name}
                        name={`stations.${station.id}`}
                        of={formStore}
                        required={false}
                      />
                    </li>
                  ))}
                </ul>
              </fieldset>
              <fieldset class="mt-4">
                <legend class="text-sm text-app-text-weak">
                  Přiřazení pracovníci <abbr class="text-error-text-base">*</abbr>
                </legend>
                <FieldArray name="assignedEmployeeIds">
                  {(fieldArray) => {
                    if (fieldArray.items.length === 0) {
                      return (
                        <>
                          <Alert class="text-xs" severity="info">
                            Nejsou definování žádní pracovníci
                          </Alert>
                          <div class="mt-2">
                            <Button
                              onClick$={() => {
                                insert(formStore, "assignedEmployeeIds", { value: "" });
                              }}
                              severity="success"
                              type="button"
                            >
                              Přidat pracovníka
                            </Button>
                          </div>
                        </>
                      );
                    }

                    return (
                      <div class="space-y-2">
                        {fieldArray.items.map((item, index) => (
                          <div class="items-top flex gap-2" key={item}>
                            <FieldRadioSelect
                              class="flex-1"
                              label="Pracovník"
                              labelSrOnly
                              name={`assignedEmployeeIds.${index}`}
                              of={formStore}
                              options={_mock_employees.map((e) => ({
                                label: e.fullName,
                                value: e.id,
                              }))}
                            />
                            <div>
                              <Button
                                onClick$={() => {
                                  remove(formStore, "assignedEmployeeIds", { at: index });
                                }}
                                severity="danger"
                                type="button"
                              >
                                <ButtonLabelIcon as={DeleteIcon} standalone />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div class="mt-2">
                          <Button
                            onClick$={() => {
                              insert(formStore, "assignedEmployeeIds", { value: "" });
                            }}
                            severity="success"
                            type="button"
                          >
                            Přidat pracovníka
                          </Button>
                        </div>
                      </div>
                    );
                  }}
                </FieldArray>
              </fieldset>
            </div>
          </div>
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick$={() => {
            submit(formStore);
          }}
          severity="accent"
          type="button"
        >
          Uložit
        </Button>
      </DialogFooter>
    </Dialog>
  );
});
