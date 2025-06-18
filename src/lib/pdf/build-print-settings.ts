import type { PdfPrinterRequestBody, PdfPrinterRequestBodyPdfOptions } from "./pdf-printer";

type Hospital = "AP" | "NH" | "RNB";

export type BuildPrintSettingsOptionsBase = {
  disableFooter?: boolean;
  disableHeader?: boolean;
  pdfOptions?: PdfPrinterRequestBodyPdfOptions;
};

type BuildPrintSettingsOptions = {
  hospital: Hospital;
  html: string;
} & BuildPrintSettingsOptionsBase;

export async function buildPrintSettings(options: BuildPrintSettingsOptions): Promise<PdfPrinterRequestBody> {
  return {
    html: options.html,
    pdfOptions: {
      ...options.pdfOptions,
      footerTemplate: options.disableFooter
        ? " "
        : options.pdfOptions?.footerTemplate ?? footerTemplateByHospital(options.hospital),
      headerTemplate: options.disableHeader
        ? " "
        : options.pdfOptions?.headerTemplate ?? headerTemplateByHospital(options.hospital),
      margin: {
        bottom: options.pdfOptions?.margin?.bottom ?? "3cm",
        left: options.pdfOptions?.margin?.left ?? "2cm",
        right: options.pdfOptions?.margin?.right ?? "2cm",
        top: options.pdfOptions?.margin?.top ?? "2cm",
      },
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function headerTemplateByHospital(hospital: Hospital) {
  return " ";
}

function footerTemplateByHospital(hospital: Hospital) {
  if (hospital === "AP") {
    return [
      '<div style="padding-top: 0.2cm; padding-bottom: 0.5cm; padding-left: 2.2cm; padding-right: 2.2cm; width: 100%;">',
      '  <div style="text-align: right; font-size: 12px;">',
      '    <span class="pageNumber" style="font-weight: bold;"></span> z <span class="totalPages" style="font-weight: bold;"></span>',
      "  </div>",
      '  <div style="padding-top: 0.25cm; width: 70%; font-size: 10px; color: gray;">',
      "    NH Hospital a.s, Okruhova 1135/14. 15 0 Praine 5- Stodülky; IC: 27872963D; IC: CZ 699004146 SpolecnostjezapsanauMastskei osouluv 7laze,oddilB,viozka13753",
      "  </div>",
      "</div>",
    ]
      .map((s) => s.trim())
      .join("");
  }

  if (hospital === "NH") {
    return [
      '<div style="padding-top: 0.2cm; padding-bottom: 0.5cm; padding-left: 2.2cm; padding-right: 2.2cm; width: 100%;">',
      '  <div style="text-align: right; font-size: 12px;">',
      '    <span class="pageNumber" style="font-weight: bold;"></span> z <span class="totalPages" style="font-weight: bold;"></span>',
      "  </div>",
      '  <div style="padding-top: 0.25cm; width: 70%; font-size: 10px; color: gray;">',
      "    NH Hospital a.s, Okruhova 1135/14. 15 0 Praine 5- Stodülky; IC: 27872963D; IC: CZ 699004146 SpolecnostjezapsanauMastskei osouluv 7laze,oddilB,viozka13753",
      "  </div>",
      "</div>",
    ]
      .map((s) => s.trim())
      .join("");
  }

  return " ";
}
