import type { Signal } from "@builder.io/qwik";

import { Dialog, DialogBody, DialogHeader } from "@akeso/ui-components";
import { component$, Resource, useResource$ } from "@builder.io/qwik";

import { serverCdrProgramPdfDataUrl } from "./_loaders";

type CdrCalendarPdfPreviewProps = {
  "bind:show": Signal<boolean>;
};

export const CdrCalendarPdfPreview = component$<CdrCalendarPdfPreviewProps>(({ "bind:show": showSig }) => {
  // const pdfDateUrl = useCdrProgramPdfDataUrl();
  return (
    <Dialog bind:show={showSig}>
      <DialogHeader>
        <h2>PDF</h2>
      </DialogHeader>
      <DialogBody>{showSig.value && <CdrCalendarPdfPreviewContent />}</DialogBody>
    </Dialog>
  );
});

const CdrCalendarPdfPreviewContent = component$(() => {
  const pfdDataUrlResource = useResource$(async ({ cleanup }) => {
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const pdfDataUrl = serverCdrProgramPdfDataUrl();
    return pdfDataUrl;
  });

  return (
    <Resource
      onResolved={(pdfDataUrl) => {
        return <embed class="h-[80vh] w-full" src={pdfDataUrl}></embed>;
      }}
      value={pfdDataUrlResource}
    />
  );
});
