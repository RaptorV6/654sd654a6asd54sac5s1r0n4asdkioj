import { Button, Dialog, DialogHeader, ListItem } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";

import { LockFilledIcon } from "~/components/icons-outline";
import { ListItemDateTime } from "~/components/list-item-date-time";

import type { ExpectationDetailData } from "./fetch-expectation-detail";

import { InvasionPerformedSelectOptions, InvasionSelectOptions } from "./expectation-detail-invasions-helpers";
import { ExpectationDetailInvasionsUpdateForm } from "./expectation-detail-invasions-update-form";

type ExpectationDetailInvasionsListItemProps = {
  editable?: boolean;
  invasion: NonNullable<ExpectationDetailData["invasions"]>[number];
};

export const ExpectationDetailInvasionsListItem = component$<ExpectationDetailInvasionsListItemProps>(
  ({ editable, invasion }) => {
    const editDialogShowSig = useSignal(false);
    const _editable = invasion.editable && editable;

    return (
      <ListItem class="grid grid-cols-6 gap-4 !px-0">
        <div>
          <ListItemDateTime time={invasion.createdAt} />
        </div>
        <div class="col-span-4">
          <div class="grid grid-cols-4 gap-4">
            <div class="inline-flex items-center gap-2">
              <svg class="h-5 w-5 text-app-text-weaker" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1.77 8.5A5.91 5.91 0 0 1 .5 4.84V1.58a9.65 9.65 0 0 1 8.87 0" />
                  <path d="M7.79 13.44h0a2.27 2.27 0 0 1-2-.51h0a6.66 6.66 0 0 1-2.11-6.67l.73-2.92a9.88 9.88 0 0 1 9.09 2.28l-.73 2.91a6.67 6.67 0 0 1-4.98 4.91Z" />
                  <path d="M5.61 6.51a1 1 0 0 1 1-.27a1 1 0 0 1 .73.69m2.23.57a1 1 0 0 1 1.7.43" />
                </g>
              </svg>
              <span class="flex-1 text-sm">
                {invasion.kind === "NOT_SPECIFIED"
                  ? ""
                  : InvasionSelectOptions.find((i) => i.value === invasion.kind)?.label}
              </span>
            </div>
            <div class="inline-flex items-center gap-2">
              <svg class="h-4 w-4 text-app-text-weaker" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                  clip-rule="evenodd"
                  d="M13.037.057A.75.75 0 0 1 13.5.75V2.5h1.75a.75.75 0 0 1 .53 1.28l-3 3a.75.75 0 0 1-.53.22h-.377a4 4 0 1 1-4.797-2.892a.75.75 0 0 1 .347 1.46A2.5 2.5 0 1 0 10.29 7h-.23L8.53 8.53a.75.75 0 1 1-1.06-1.06L9 5.94V3.75a.75.75 0 0 1 .22-.53l3-3a.75.75 0 0 1 .817-.163M10.5 4.061V5.5h1.44l1.5-1.5H12V2.56zM4.82 2.33a6.5 6.5 0 0 1 3.853-.796a.75.75 0 1 0 .155-1.492a8 8 0 1 0 7.129 7.128a.75.75 0 1 0-1.492.155A6.5 6.5 0 1 1 4.82 2.331Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>
              <span class="flex-1 text-sm">{invasion.locality}</span>
            </div>
            <div class="inline-flex items-center gap-2">
              <svg class="h-5 w-5 text-app-text-weaker" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m4-5v-2H8v2l-3-3l3-3v2h8V9l3 3z"
                  fill="currentColor"
                />
              </svg>
              <span class="flex-1 text-sm">{invasion.caliber}</span>
            </div>
            <div class="inline-flex items-center gap-2">
              <svg class="block h-6 w-6 text-app-text-weaker" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 16.475q2.475-2 3.738-3.85T17 9.15q0-2.25-1.4-3.7T12 4T8.4 5.45T7 9.15q0 1.625 1.263 3.475T12 16.475m0 2.05q-.3 0-.6-.1t-.55-.3q-2.95-2.35-4.4-4.587T5 9.15q0-3.125 1.95-5.137T12 2t5.05 2.013T19 9.15q0 2.15-1.45 4.388t-4.4 4.587q-.25.2-.55.3t-.6.1M12 11q.825 0 1.413-.587T14 9t-.587-1.412T12 7t-1.412.588T10 9t.588 1.413T12 11M6 22q-.425 0-.712-.288T5 21t.288-.712T6 20h12q.425 0 .713.288T19 21t-.288.713T18 22zm6-13"
                  fill="currentColor"
                />
              </svg>
              <span class="text-sm">
                {invasion.performed === "NOT_SPECIFIED"
                  ? ""
                  : InvasionPerformedSelectOptions.find((i) => i.value === invasion.performed)?.label}
              </span>
            </div>
          </div>
          {invasion.note && <div class="mt-2 text-xs text-app-text-weak">{invasion.note}</div>}
        </div>
        <div class="flex items-center justify-end">
          {!_editable && (
            <span class="inline-flex items-center justify-center px-1">
              <LockFilledIcon class="h-5 w-5 text-accent-text-base" />
            </span>
          )}
          {_editable && (
            <>
              <Button
                class="inline-flex items-center justify-center"
                onClick$={() => {
                  editDialogShowSig.value = true;
                }}
                size="sm"
                type="button"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
              <Dialog bind:show={editDialogShowSig}>
                <DialogHeader>Upravit záznam fyziologické funkce</DialogHeader>
                <ExpectationDetailInvasionsUpdateForm
                  invasion={invasion}
                  onSaved$={() => {
                    editDialogShowSig.value = false;
                  }}
                />
              </Dialog>
            </>
          )}
        </div>
      </ListItem>
    );
  },
);
