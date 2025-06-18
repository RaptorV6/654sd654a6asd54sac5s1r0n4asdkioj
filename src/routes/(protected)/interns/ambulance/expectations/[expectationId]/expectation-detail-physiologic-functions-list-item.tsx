import { Button, Dialog, DialogHeader, ListItem } from "@akeso/ui-components";
import { component$, useSignal } from "@builder.io/qwik";

import { LockFilledIcon } from "~/components/icons-outline";
import { ListItemDateTime } from "~/components/list-item-date-time";

import type { ExpectationDetailData } from "./fetch-expectation-detail";

import { ExpectationDetailPhysiologicFunctionsUpdateForm } from "./expectation-detail-physiologic-functions-update-form";

type ExpectationDetailPhysiologicFunctionsListItemProps = {
  editable?: boolean;
  physiologicFunction: NonNullable<ExpectationDetailData["physiologicFunctions"]>[number];
};

export const ExpectationDetailPhysiologicFunctionsListItem =
  component$<ExpectationDetailPhysiologicFunctionsListItemProps>(({ editable, physiologicFunction }) => {
    const editDialogShowSig = useSignal(false);
    const _editable = physiologicFunction.editable && editable;

    return (
      <ListItem class="grid grid-cols-6 gap-4 !px-0">
        <div>
          <ListItemDateTime time={physiologicFunction.createdAt} />
        </div>
        <div class="col-span-4">
          <div class="grid grid-cols-4 gap-4">
            <div class="inline-flex items-center gap-2">
              <svg class="h-6 w-6 text-app-text-weaker" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clip-rule="evenodd"
                  d="M35 9.5a3.5 3.5 0 1 1 7 0v6c0 1.583-1.05 2.92-2.492 3.353c.008 1.054.021 2.074.035 3.06c.05 3.722.092 6.95-.187 9.604c-.4 3.804-1.491 6.795-4.456 8.542c-3.367 1.985-8.205 2.584-12.171 2.085c-1.99-.251-3.856-.79-5.255-1.644c-1.015-.62-1.856-1.46-2.244-2.523c-2.085-.093-4.16-.472-5.8-1.152c-1.765-.732-3.43-2-3.43-3.985V13.122h.003A2.558 2.558 0 0 1 6 13c0-2.761 4.477-5 10-5s10 2.239 10 5c0 .04-.001.082-.003.122H26v5.949a6.945 6.945 0 0 1 1.232.292a7.003 7.003 0 0 1-1.233 13.566c-.046 2.015-1.657 3.29-3.434 4.014c-1.449.59-3.23.92-5.054 1.022c.241.286.572.563 1.006.828c1.073.657 2.635 1.136 4.462 1.366c3.668.462 8.026-.126 10.905-1.823c2.143-1.262 3.106-3.447 3.483-7.028c.266-2.53.226-5.573.177-9.224v-.001a565.22 565.22 0 0 1-.037-3.226A3.501 3.501 0 0 1 35 15.5zm-12.823 5.247C23.774 13.948 24 13.215 24 13c0-.215-.226-.948-1.823-1.747C20.699 10.515 18.518 10 16 10s-4.7.515-6.177 1.253C8.226 12.052 8 12.785 8 13c0 .215.226.948 1.823 1.747C11.301 15.485 13.482 16 16 16s4.7-.515 6.177-1.253M16 18c3.271 0 6.176-.785 8-2v3.07a6.945 6.945 0 0 0-1.232.293a7.003 7.003 0 0 0 1.23 13.566c-.045.778-.674 1.545-2.187 2.161c-1.525.621-3.632.933-5.8.909a20.927 20.927 0 0 1-.92-.031V17.98c.3.013.603.02.909.02m9 3.5l-1.5 5l1.5 2l1.5-2z"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>
              <span class="flex-1 text-sm">{physiologicFunction.bloodPressure}</span>
            </div>
            <div class="inline-flex items-center gap-2">
              <svg class="h-5 w-5 text-app-text-weaker" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
                  fill="currentColor"
                />
              </svg>
              <span class="flex-1 text-sm">{physiologicFunction.pulse}</span>
            </div>
            <div class="inline-flex items-center gap-2">
              <svg class="h-4 w-4 text-app-text-weaker" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path
                  clip-rule="evenodd"
                  d="M7 .75L6.47.22a.75.75 0 0 1 1.06 0zM7 12.5c-.838 0-2.072-.328-2.796-.98A3.84 3.84 0 0 1 2.94 8.904c.005-.674.251-1.478.676-2.348c.423-.868.996-1.744 1.582-2.534A28 28 0 0 1 7 1.841zM7 .75l.53-.53l.002.001l.003.004l.012.011l.043.045l.16.165a29 29 0 0 1 2.258 2.682c.616.833 1.246 1.79 1.724 2.77c.473.969.828 2.02.828 3.025l-.001.042a5.34 5.34 0 0 1-1.76 3.67C9.722 13.606 8.087 14 7 14c-1.085 0-2.72-.394-3.799-1.364a5.34 5.34 0 0 1-1.76-3.713c0-1.005.354-2.056.828-3.026c.478-.98 1.107-1.936 1.724-2.769A29 29 0 0 1 6.41.281l.043-.045l.012-.011l.003-.004h.001V.22z"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>
              <span class="flex-1 text-sm">{physiologicFunction.saturation}</span>
            </div>
            <div class="inline-flex items-center gap-2">
              <svg class="h-5 w-5 text-app-text-weaker" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clip-rule="evenodd"
                  d="M18.714 43.199a1 1 0 0 1-.904-1.087l.803-8.717l4.044 2.14l.931-5.594a1 1 0 0 1 1.973.329l-1.386 8.33l-3.846-2.034l-.527 5.729a1 1 0 0 1-1.088.904M4.706 29.753a1 1 0 0 1 .385-1.361l7.943-4.439l.549 4.757l5.443-2.54a1 1 0 1 1 .845 1.813l-7.957 3.713l-.523-4.533l-5.324 2.975a1 1 0 0 1-1.36-.385M9.355 9.552a1 1 0 0 1 1.373-.336l7.967 4.835l-3.977 2.903l5.068 3.607a1 1 0 1 1-1.16 1.63l-7.329-5.216l3.796-2.77l-5.402-3.28a1 1 0 0 1-.336-1.373m21.902-4.214a1 1 0 0 1 .81 1.158l-1.502 8.522l-3.803-2.433l-1.366 5.403a1 1 0 0 1-1.939-.49l2.046-8.094l3.613 2.313l.982-5.568a1 1 0 0 1 1.159-.811m12.597 14.025a1 1 0 0 1-.395 1.358l-7.616 4.177l-.483-4.509l-5.097 2.33a1 1 0 0 1-.832-1.82l7.621-3.482l.46 4.284l4.985-2.734a1 1 0 0 1 1.357.396m-5.19 18.126a1 1 0 0 1-1.373.336l-7.519-4.563l3.717-2.713l-4.652-3.311a1 1 0 0 1 1.16-1.63l6.912 4.92l-3.535 2.58l4.954 3.007a1 1 0 0 1 .336 1.374"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>
              <span class="flex-1 text-sm">{physiologicFunction.pain}</span>
            </div>
          </div>
          {physiologicFunction.note && <div class="mt-2 text-xs text-app-text-weak">{physiologicFunction.note}</div>}
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
                <ExpectationDetailPhysiologicFunctionsUpdateForm
                  onSaved$={() => {
                    editDialogShowSig.value = false;
                  }}
                  physiologicFunction={physiologicFunction}
                />
              </Dialog>
            </>
          )}
        </div>
      </ListItem>
    );
  });
