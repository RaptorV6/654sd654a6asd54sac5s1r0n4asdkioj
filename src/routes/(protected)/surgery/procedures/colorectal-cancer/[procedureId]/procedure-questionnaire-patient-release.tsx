import { Alert, Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { routeAction$, zod$ } from "@builder.io/qwik-city";

import type { SalusAccount } from "~/server/rpc/procedure";

import { HelperText } from "~/components/helper-text";
import { useSalusAccountCreateContext } from "~/contexts/salus-account/salus-account-context";
import { serverGetSession } from "~/routes/plugin@auth";
import { procedureTaskResultSchema, serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";

// eslint-disable-next-line qwik/loader-location
export const useProcedureQuestionnairePatientReleaseUpdateAction = routeAction$(
  async (values, requestEvent) => {
    const { user } = serverGetSession(requestEvent);
    const { procedureId } = requestEvent.params;

    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId,
      result: values.result,
      taskKind: "questionnairePatientPreoperativeRelease",
    });
  },
  zod$({
    result: procedureTaskResultSchema("questionnairePatientPreoperativeRelease"),
  }),
);

type ProcedureQuestionnairePatientReleaseProps = {
  actionExpected: boolean;
  procedure: {
    patient: {
      emailAddress: null | string;
      id: string;
      salus: null | SalusAccount;
    };
  };
};

export const ProcedureQuestionnairePatientRelease = component$(
  ({ actionExpected, procedure }: ProcedureQuestionnairePatientReleaseProps) => {
    const updateAction = useProcedureQuestionnairePatientReleaseUpdateAction();
    const { createSalusAccountForPatientSig } = useSalusAccountCreateContext();

    const patientHasEmail = !!procedure.patient.emailAddress;
    const patientHasSalus = !!procedure.patient.salus;

    return (
      <>
        {actionExpected && (
          <div class="flex flex-col gap-6">
            {(patientHasEmail || patientHasSalus) && (
              <div>
                {!patientHasSalus && patientHasEmail && (
                  <div class="mb-4">
                    <Alert class="space-y-4 text-sm" severity="danger">
                      <p class="font-bold">
                        Pacient nemá založení účet v <AkesoOnline /> a možnost vyplnění dotazníku v <AkesoOnline /> není
                        dostupná.
                      </p>
                      <p>
                        Pacientovi můžete účet v <AkesoOnline /> založit.
                      </p>
                      <p class="font-bold">Před založením účtu prosím ověřte, že pacient souhlasí se založením účtu.</p>
                      <div>
                        <Button
                          onClick$={() => {
                            createSalusAccountForPatientSig.value = procedure.patient.id;
                          }}
                          severity="danger"
                          type="button"
                        >
                          Založit Pacientovi účet v <AkesoOnline />
                        </Button>
                      </div>
                    </Alert>
                  </div>
                )}

                <Button
                  disabled={!patientHasSalus}
                  onClick$={() => {
                    // todo: tato moznost je dostupna len v pripade, ze ma pacient vyplneny email
                    // todo: generate task for patient
                    updateAction.submit({ result: { method: "akeso.online" } });
                  }}
                  severity="highlight"
                  type="button"
                  variant="contained"
                >
                  Pacient dotazník vyplní v <AkesoOnline />
                </Button>
                <HelperText>
                  V <AkesoOnline /> pacient vyplní dotazník z pohodlí domova.
                </HelperText>
              </div>
            )}
            {/* <div>
              <Button
                onClick$={() => {
                  // todo: generate task for patient
                  updateAction.submit({ result: { method: "onside" } });
                }}
                severity="accent"
                type="button"
                variant="outline"
              >
                Vyplnit dotazník s pacientem na místě v mém počítači
              </Button>
              <HelperText>Otevře se okno, ve kterém vyplníte dotazník s asistencí pacienta.</HelperText>
              <HelperText>
                V prípadě, že pacient nebude znát odpovědi na některou z otázek na místě můžete následně dotazník
                odeslat k doplnění v <span class="italic">akeso.online</span>, nebo dotazník vytisknout a předat jej
                pacientovi k doplnění.
              </HelperText>
            </div> */}

            {patientHasEmail && (
              <div>
                <Button
                  onClick$={() => {
                    // todo: tato moznost je dostupna len v pripade, ze ma pacient vyplneny email
                    // updateAction.submit({ result: { method: "emailed" } });
                  }}
                  type="button"
                  variant="outline"
                >
                  Dotazník zaslat na email <span class="italic">{procedure.patient.emailAddress}</span>
                </Button>
                <HelperText>Pacientovi bude zaslán dotazník na uvedený email ve formě PDF přílohy.</HelperText>
                <HelperText>Pacient si dotazník vytiskne, vyplní a pošle zpět na email.</HelperText>
              </div>
            )}

            <div>
              <Button
                onClick$={() => {
                  updateAction.submit({ result: { method: "printed" } });
                }}
                type="button"
                variant="outline"
              >
                Vytisknout a předat dotazník
              </Button>
            </div>

            <div>
              <Button
                onClick$={() => {
                  updateAction.submit({ result: { method: "paperForm" } });
                }}
                type="button"
                variant="outline"
              >
                Dotazník vydán papírově
              </Button>
            </div>
          </div>
        )}
      </>
    );
  },
);

const AkesoOnline = () => <span class="italic">akeso.online</span>;
