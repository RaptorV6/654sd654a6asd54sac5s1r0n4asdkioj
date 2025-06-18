import type { QRL } from "@builder.io/qwik";
import type { RequestEvent } from "@builder.io/qwik-city";

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import { useShowPageProgressIndicator } from "~/contexts/page-progress-indicator/page-progress-indicator-provider";
import { getApplicationsPdfData } from "~/prints/applications.pdf";
import { serverGetSession } from "~/routes/plugin@auth";
import {
  serverCreatePatientApplicationForm,
  serverFindPatientApplicationForms,
  serverUpdateApplicationFormPdfUrl,
} from "~/server/rpc/application-form";
import { serverDoneProcedureTask } from "~/server/rpc/procedure-tasks";
import { serverGetPdfAsDataUrl, serverMergePdfs } from "~/server/server-pdf";

const stagingApplicationForms = [
  { for: ["Karcinom tlustého střeva", "Karcinom rekta"], label: "Koloskopie" },
  { for: ["Karcinom rekta"], label: "NMR malé pánve" },
  { for: ["Karcinom tlustého střeva", "Karcinom rekta"], label: "CT břicha" },
  { for: ["Karcinom tlustého střeva", "Karcinom rekta"], label: "RTG S+P" },
];

type GetApplicationFormsPrintOutputOptions = {
  applications: {
    // anamnesis: string;
    // diagnosis: string;
    // message: string;
    // number: string;
    // reasonForRequest: string;
    // requestedExamination: string;
    // specialRequirement: string;
    text: string;
    titleText: string;
  }[];
  patient: {
    address: null | string;
    birthRegistrationNumber: null | string;
    fullName: string;
    id: string;
    insuranceCompanyNumber: null | string;
  };
  procedureId: null | string;
};

const getApplicationsPrintOutput$ = server$(async function (input: GetApplicationFormsPrintOutputOptions) {
  const { env } = this;
  const { user } = serverGetSession(this as RequestEvent);

  // TODO: call BE to obtain data, or get them from current user.
  const applicant: {
    ambulance: string;
    fullName: string;
    icp: string;
    specialization: string;
  } = {
    ambulance: "Chirurgické oddělení - Hořovice",
    fullName: user.name,
    icp: "12345679",
    specialization: "101",
  };

  const existingForms = await serverFindPatientApplicationForms(env, {
    noOlderThenDays: 1,
    patientId: input.patient.id,
  });
  const existingFormsWithPdfIndex = existingForms.filter((i) => !!i.pdfBase64).map((i) => i.titleText);

  const pdfDataURLs: string[] = existingForms.map((ef) => ef.pdfBase64).filter((u): u is string => u != null);

  for (const applicationFormData of input.applications.filter(
    (i) => !existingFormsWithPdfIndex.includes(i.titleText),
  )) {
    const af = await serverCreatePatientApplicationForm(env, {
      data: {
        anamnesis: "",
        applicant,
        diagnosis: "J60",
        message: "",
        patient: input.patient,
        pdfBase64: null,
        procedureId: input.procedureId,
        reasonForRequest: "",
        requestedExamination: "",
        specialRequirement: "",
        text: applicationFormData.text,
        titleText: applicationFormData.titleText,
      },
      patientId: input.patient.id,
    });

    if (af) {
      const pdfData = await getApplicationsPdfData([af]);
      const pdfDataURL = await serverGetPdfAsDataUrl(env, pdfData);
      await serverUpdateApplicationFormPdfUrl(env, { applicationFormId: af.id, dataUrl: pdfDataURL });
      pdfDataURLs.push(pdfDataURL);
    }
  }

  if (input.procedureId) {
    await serverDoneProcedureTask({
      doneBy: user.id,
      procedureId: input.procedureId,
      taskKind: "stagingApplicationFormsRelease",
    });
  }

  return serverMergePdfs(pdfDataURLs);
});

type ProcedureApplicationFormsPrintProps = {
  actionExpected: boolean;
  onClose$: QRL<() => void>;
  patient: GetApplicationFormsPrintOutputOptions["patient"];
  procedureId: null | string;
  surgeryName: string;
};

export const ProcedureApplicationFormsPrint = component$(
  ({ actionExpected, onClose$, patient, procedureId, surgeryName }: ProcedureApplicationFormsPrintProps) => {
    const { showPageProgressIndicatorSig } = useShowPageProgressIndicator();
    const pdfDataUrlSig = useSignal<null | string>(null);
    const showPdfDataDialogSig = useSignal(false);

    useTask$(async ({ track }) => {
      const show = track(() => showPdfDataDialogSig.value);
      // Dialog is closed and pdf data url is not empty => user closes dialog.
      if (show === false && pdfDataUrlSig.value != null) {
        await onClose$();
      }
    });

    const safs = stagingApplicationForms.filter((saf) => saf.for.includes(surgeryName));

    return (
      <>
        <div class="mb-4">
          <h3 class="text-sm">Stagingová vyšetření</h3>
          <ul class="mt-2 list-disc pl-4 text-sm">
            {safs.map((saf) => (
              <li key={saf.label}>{saf.label}</li>
            ))}
          </ul>
        </div>
        <Button
          onClick$={async () => {
            showPageProgressIndicatorSig.value = true;
            if (!pdfDataUrlSig.value) {
              const applicationText = "Karcinom tlustého střeva, prosím o vyšetření v rámci stagingu.";

              const applicationsData: GetApplicationFormsPrintOutputOptions["applications"] = safs.map((saf) => ({
                text: applicationText,
                titleText: saf.label,
              }));

              pdfDataUrlSig.value = await getApplicationsPrintOutput$({
                applications: applicationsData,
                patient,
                procedureId,
              });
            }
            showPageProgressIndicatorSig.value = false;

            if (pdfDataUrlSig.value) {
              showPdfDataDialogSig.value = true;
            }
          }}
          severity={actionExpected ? "highlight" : "none"}
          type="button"
          variant={actionExpected ? "outline" : "soft"}
        >
          {actionExpected ? "Autorizovat a vytiskmout žádanky" : "Znovu vytiskmout žádanky"}
        </Button>
        <Dialog bind:show={showPdfDataDialogSig}>
          <DialogHeader>Tisk žádanek</DialogHeader>
          <DialogBody class="h-[70vh] w-[80vw]">
            {pdfDataUrlSig.value && <embed class="h-[70vh] w-[80vw]" src={pdfDataUrlSig.value}></embed>}
          </DialogBody>
          <DialogFooter>
            <Button
              onClick$={() => {
                showPdfDataDialogSig.value = false;
              }}
              type="button"
            >
              Hotovo
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
);
