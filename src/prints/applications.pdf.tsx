/** @jsxImportSource react */
import type { PdfPrinterRequestBody } from "@akeso/forge-form";

import { renderToStaticMarkup } from "react-dom/server";

import styles from "./applications.pdf.css?inline";

type GetApplicationsPdfData = {
  anamnesis: string;
  applicant: {
    ambulance: string;
    fullName: string;
    icp: string;
    specialization: string;
  };
  createdAt: Date;
  diagnosis: string;
  message: string;
  number: string;
  patient: {
    address: null | string;
    birthRegistrationNumber: null | string;
    fullName: string;
    insuranceCompanyNumber: null | string;
  };
  procedureId: null | string;
  reasonForRequest: string;
  requestedExamination: string;
  specialRequirement: string;
  text: string;
  titleText: string;
  updatedAt: Date;
};

export type GetApplicationsPdfDataOptions = GetApplicationsPdfData[];

export async function getApplicationsPdfData(options: GetApplicationsPdfDataOptions): Promise<PdfPrinterRequestBody> {
  const html = renderToStaticMarkup(
    <PdfTemplate styles={styles}>
      {options.map((application) => (
        <ApplicationTemplate key={application.number} {...application} />
      ))}
    </PdfTemplate>,
  );

  return {
    html,
    pdfOptions: {
      // displayHeaderFooter: true,
      // headerTemplate: ` `,
      // footerTemplate: `
      //   <div style="padding-top: 0.2cm; padding-bottom: 0.5cm; padding-left: 2.2cm; padding-right: 2.2cm; width: 100%;">
      //     <div style="text-align: right; font-size: 12px;">
      //       <span class="pageNumber" style="font-weight: bold;"></span> z <span class="totalPages" style="font-weight: bold;"></span>
      //     </div>
      //     <div style="padding-top: 0.25cm; width: 70%; font-size: 10px; color: gray;">
      //       NH Hospital a.s, Okruhova 1135/14. 15 0 Praine 5- Stodülky; IC: 27872963D; IC: CZ 699004146 SpolecnostjezapsanauMastskei osouluv 7laze,oddilB,viozka13753
      //     </div>
      //   </div>
      // `,
      // printBackground: false,
      // landscape: false,
      // pageRanges: undefined, // "1-5"
      margin: {
        bottom: "3cm",
        left: "2cm",
        right: "2cm",
        top: "2cm",
      },
      // preferCSSPageSize: false,
    },
  };
}

function PdfTemplate({ children, styles }: { children: React.ReactNode; styles?: string }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: styles || "" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

function ApplicationTemplate({
  anamnesis,
  applicant,
  diagnosis,
  message,
  number,
  patient,
  reasonForRequest,
  requestedExamination,
  specialRequirement,
  text,
  titleText,
}: GetApplicationsPdfData) {
  return (
    <div className="pagebreak-after">
      <div className="page-header">
        <div>
          <h1>Přůvodní list k {titleText} vyšetření</h1>
          <h2>
            <span>ze dne </span>
            <span style={{ fontWeight: "normal" }}>
              {new Intl.DateTimeFormat("cs", { dateStyle: "medium", timeStyle: "medium" }).format(new Date())}
            </span>
          </h2>
        </div>
      </div>
      <div className="content">
        <div className="col-span-4" />
        <div>Č. žídanky:</div>
        <div>{number}</div>
        <div>Tisk dne:</div>
        <div>{new Intl.DateTimeFormat("cs", { dateStyle: "medium" }).format(new Date())}</div>

        <div className="border-b">Žadatel:</div>
        <div className="text-bold col-span-3 border-b">{applicant.ambulance}</div>
        <div className="border-b">IČP:</div>
        <div className="text-bold border-b">{applicant.icp}</div>
        <div className="border-b">Odbornost:</div>
        <div className="text-bold border-b">{applicant.specialization}</div>

        <div>Jméno:</div>
        <div className="text-bold col-span-3">{patient.fullName}</div>
        <div>Rodné č.</div>
        <div className="text-bold">{patient.birthRegistrationNumber}</div>
        <div>Pojišťovna</div>
        <div className="text-bold">{patient.insuranceCompanyNumber}</div>

        <div>Bydliště:</div>
        <div className="col-span-3">{patient.address}</div>
        <div className="col-span-2" />
        <div>Diagnóza:</div>
        <div>{diagnosis}</div>

        <div>Sdělení:</div>
        <div className="col-span-3">{message}</div>
        <div>Alergie:</div>
        <div className="col-span-3"></div>

        <div className="col-span-4" />
        <div>Anamnéza:</div>
        <div>{anamnesis}</div>
      </div>
      <div style={{ marginTop: "4rem" }}>
        <div>
          <span className="text-bold">Žádané vyšetření:</span> {requestedExamination}
        </div>
        <div>{text}</div>
      </div>
      <div className="content" style={{ marginTop: "4rem" }}>
        <div className="col-span-4 border-t">
          <div>Speciální požadavek:</div>
          <div>{specialRequirement}</div>
        </div>
        <div className="col-span-4 border-t">
          <div>Důvod požadavku:</div>
          <div>{reasonForRequest}</div>
        </div>
      </div>
      <div className="content" style={{ marginTop: "8rem" }}>
        <div>Vystavil:</div>
        <div className="col-span-3" />
        <div className="col-span-4 border-b border-dotted" />
        <div className="col-span-4" />
        <div className="col-span-4 text-center" style={{ paddingTop: "1rem" }}>
          {applicant.fullName}
        </div>
      </div>
    </div>
  );
}
