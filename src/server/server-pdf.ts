import type { PdfPrinterRequestBody } from "@akeso/forge-form";
import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import { PDFDocument } from "pdf-lib";

import { envGet } from "~/utils/env-get";

async function generatePdf(env: EnvGetter, pdfData: PdfPrinterRequestBody) {
  const serviceUrl = envGet(env, "IRIS_URL_PDF");

  return fetch(serviceUrl, {
    body: JSON.stringify(pdfData),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });
}

export async function serverGetPdfAsDataUrl(env: EnvGetter, pdfData: PdfPrinterRequestBody) {
  const response = await generatePdf(env, pdfData);
  if (!response.ok) return "";

  const buf = new Uint8Array(await response.arrayBuffer());
  let string = "";
  buf.forEach((byte) => {
    string += String.fromCharCode(byte);
  });
  return `data:application/pdf;base64,${btoa(string)}`;
}

/**
 * Merges data URLs of separate PDF files to single PDF file.
 *
 * @param input Array of Data URLs.
 * @returns Data URL of merged PDF file.
 */
export async function serverMergePdfs(input: string[]): Promise<string> {
  const out = await PDFDocument.create();
  out.setProducer("Akeso");
  out.setCreationDate(new Date());

  for (const inpDataUrl of input) {
    const srcDoc = await PDFDocument.load(inpDataUrl, {
      // allow merging of encrypted pdfs (issue #88)
      ignoreEncryption: true,
    });

    const copiedPages = await out.copyPages(srcDoc, srcDoc.getPageIndices());
    copiedPages.forEach((page) => {
      out.addPage(page);
    });
  }

  return out.saveAsBase64({ dataUri: true });
}
