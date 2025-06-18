import { ActionButton, Button, FieldDate, FieldHidden, PreviewText } from "@akeso/ui-components";
import { i18nFormatDate } from "@akeso/utils";
import { component$ } from "@builder.io/qwik";
import { routeAction$, z } from "@builder.io/qwik-city";
import { formAction$, useForm, zodForm$ } from "@modular-forms/qwik";

import { serverGetSession } from "~/routes/plugin@auth";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

import { useProcedureContext } from "./procedure-provider";
import { useFindTask } from "./utils";

// eslint-disable-next-line qwik/loader-location
export const useProcedureStagingExamsReservationOutsideAction = routeAction$(async (values, requestEvent) => {
  const { user } = serverGetSession(requestEvent);
  const { procedureId } = requestEvent.params;

  await serverDoneProcedureTask({
    doneBy: user.id,
    procedureId,
    result: { self: true },
    taskKind: "stagingExaminationAppointmetsReservation",
  });
});

const formSchema = z
  .object({
    abdomenCT: z.date({ coerce: true, required_error: "Pole je povinné" }),
    coloscopy: z.date({ coerce: true, required_error: "Pole je povinné" }),
    rtg_SP: z.date({ coerce: true, required_error: "Pole je povinné" }),
    smallPelvisNMR: z.date({ coerce: true }).optional(),
    surgeryKind: z.number(),
  })
  .superRefine((o, ctx) => {
    if (o.surgeryKind === 2 && o.smallPelvisNMR == null) {
      ctx.addIssue({ code: "custom", message: "Pole je povinné" });
    }
  });

type FormValues = z.infer<typeof formSchema>;

export const useProcedureStagingExamsReservationDatesAction = formAction$<FormValues>(async (values, requestEvent) => {
  const { user } = serverGetSession(requestEvent);
  const { procedureId } = requestEvent.params;

  await serverDoneProcedureTask({
    doneBy: user.id,
    procedureId,
    result: { self: true },
    taskKind: "stagingExaminationAppointmetsReservation",
  });
}, zodForm$(formSchema));

type ProcedureStagingExamsReservationProps = {
  actionExpected: boolean;
};
export const ProcedureStagingExamsReservation = component$(
  ({ actionExpected }: ProcedureStagingExamsReservationProps) => {
    const { procedure } = useProcedureContext();
    const { findTask } = useFindTask();
    const actionSelf = useProcedureStagingExamsReservationOutsideAction();

    const surgeryKind = procedure.surgery?.name === "Karcinom rekta" ? 2 : 1;
    const tsk = findTask("stagingExaminationAppointmetsReservation");

    /* eslint-disable @typescript-eslint/no-unnecessary-condition */
    const [datesFormStore, DatesForm] = useForm<FormValues>({
      action: useProcedureStagingExamsReservationDatesAction(),
      loader: {
        value: {
          abdomenCT: tsk?.result?.dates?.abdomenCT,
          coloscopy: tsk?.result?.dates?.coloscopy,
          rtg_SP: tsk?.result?.dates?.rtg_SP,
          smallPelvisNMR: tsk?.result?.dates?.smallPelvisNMR,
          surgeryKind: surgeryKind,
        },
      },
      validate: zodForm$(formSchema),
    });
    /* eslint-enable @typescript-eslint/no-unnecessary-condition */

    return (
      <>
        {actionExpected ? (
          <>
            <div class="flex flex-wrap gap-4">
              <Button href="https://amos.nember.cz" target="_blank" type="link">
                Objenat stagingová vyšetření v Amos
              </Button>

              <ActionButton action={actionSelf} params={{}} variant="outline">
                Stagingová vyšetření mimo Akeso
              </ActionButton>
            </div>
            <div class="mt-4">
              <p>Zadejte rezervované terminy vyštření</p>
              <DatesForm.Form class="form-styles mt-4">
                <FieldHidden name="surgeryKind" of={datesFormStore} />

                <FieldDate label="Koloskopie" name="coloscopy" of={datesFormStore} />
                {surgeryKind === 2 && <FieldDate label="NMR malé pánve" name="smallPelvisNMR" of={datesFormStore} />}
                <FieldDate label="CT břicha" name="abdomenCT" of={datesFormStore} />
                <FieldDate label="RTG S+P" name="rtg_SP" of={datesFormStore} />

                <div class="mt-4">
                  <Button type="submit">Hotovo</Button>
                </div>
              </DatesForm.Form>
            </div>
          </>
        ) : (
          <>
            <div class="mt-4">
              {tsk && tsk.result.dates ? (
                <div>
                  <PreviewText label="Koloskopie" value={i18nFormatDate(tsk.result.dates.coloscopy)} />
                  {surgeryKind === 2 && tsk.result.dates.smallPelvisNMR && (
                    <PreviewText label="NMR malé pánve" value={i18nFormatDate(tsk.result.dates.smallPelvisNMR)} />
                  )}
                  <PreviewText label="CT břicha" value={i18nFormatDate(tsk.result.dates.abdomenCT)} />
                  <PreviewText label="RTG S+P" value={i18nFormatDate(tsk.result.dates.rtg_SP)} />
                </div>
              ) : (
                <div>Pacient absolvuje stagingová vyšetření mimo Akeso.</div>
              )}
            </div>
          </>
        )}
      </>
    );
  },
);
