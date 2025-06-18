import {
  Button,
  ButtonLabelIcon,
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  List,
  ListItem,
  StatusIndicator,
} from "@akeso/ui-components";
import { i18nFormatNumber, i18nPluralize } from "@akeso/utils";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";

import { ConfirmDeleteAction } from "~/components/confirm-delete-action";
import { CheckboxBlankIcon, CheckboxCheckedIcon, EditIcon } from "~/components/icons-outline";

import { useCdrCalendarContext } from "./cdr-calendar-context";

export const CdrCalendarPreviewEventModal = component$(() => {
  const timeFormatter = new Intl.DateTimeFormat("cs", { hourCycle: "h23", timeStyle: "short" });
  const ctx = useCdrCalendarContext();

  const showSig = useSignal(false);
  useTask$(({ track }) => {
    track(() => ctx.previewData);
    showSig.value = ctx.previewData != null;
  });
  useTask$(({ track }) => {
    track(() => showSig.value);
    if (showSig.value === false) {
      ctx.previewData = null;
    }
  });

  return (
    <Dialog bind:show={showSig}>
      <DialogHeader class="flex items-center gap-2">
        <h1 class="flex-1">{ctx.previewData?.title}</h1>
        <Button
          class="inline-flex items-center"
          onClick$={() => {
            if (ctx.previewData) {
              ctx.editData = {
                data: ctx.previewData,
                mode: "edit",
              };
              // showSig.value = false;
            }
          }}
          size="sm"
          stoppropagation:click
          type="button"
        >
          <ButtonLabelIcon as={EditIcon} sm />
          Upravit
        </Button>
      </DialogHeader>
      <DialogBody stoppropagation:click>
        {ctx.previewData && (
          <>
            <p class="mt-2 text-sm text-app-text-weaker">{ctx.previewData.description}</p>

            <p class="my-2 text-base text-accent-base">
              <time dateTime={ctx.previewData.dateFrom.toISOString()}>
                {timeFormatter.format(ctx.previewData.dateFrom)}
              </time>
              {" - "}
              <time dateTime={ctx.previewData.dateTo!.toISOString()}>
                {timeFormatter.format(ctx.previewData.dateTo!)}
              </time>
              {` (${ctx.previewData.duration!} min)`}
            </p>

            <dl class="grid grid-cols-3 rounded border border-app-border-base p-4 text-sm">
              <dd class="font-bold">Výkon</dd>
              <dt class="col-span-2">{ctx.previewData.medicalProcedure.name}</dt>

              <dd class="mt-1 font-bold">Role</dd>
              <dt class="col-span-2 mt-1">{ctx.previewData.medicalProcedure.medicalProcedureGroup}</dt>

              <dd class="mt-1 font-bold">Průměrná délka</dd>
              <dt class="col-span-2 mt-1">{i18nFormatNumber(ctx.previewData.medicalProcedure.avgTimeMin)} min</dt>

              <dd class="mt-1 font-bold">Požadavky na místnot</dd>
              <dt class="col-span-2 mt-1">
                <div class="inline-flex items-center gap-2">
                  <span>
                    {i18nPluralize(ctx.previewData.medicalProcedure.roomCount, {
                      few: (n) => `${n} místnosti`,
                      one: (n) => `${n} místnost`,
                      other: (n) => `${n} místností`,
                    })}
                  </span>
                  <span class="inline-flex gap-1">
                    {ctx.previewData.medicalProcedure.roomIsShared ? (
                      <CheckboxCheckedIcon class="h-5 w-5 shrink-0" />
                    ) : (
                      <CheckboxBlankIcon class="h-5 w-5 shrink-0" />
                    )}
                    <span>Sdílená</span>
                  </span>
                  <span class="inline-flex gap-1">
                    {ctx.previewData.medicalProcedure.roomIsVirtual ? (
                      <CheckboxCheckedIcon class="h-5 w-5 shrink-0" />
                    ) : (
                      <CheckboxBlankIcon class="h-5 w-5 shrink-0" />
                    )}
                    <span>Virtuílní</span>
                  </span>
                </div>
                {ctx.previewData.medicalProcedure.roomNote && (
                  <p class="mt-2 text-xs text-app-text-weaker">{ctx.previewData.medicalProcedure.roomNote}</p>
                )}
              </dt>
            </dl>

            <Card class="mt-4">
              <CardHeader class="flex items-center justify-between">
                <CardHeaderTitle class="flex-1">Přiřazení pracovníci</CardHeaderTitle>
                <p class="text-sm">
                  {ctx.previewData.stats.count}
                  {" | "}
                  <span class="text-yellow-500">{ctx.previewData.stats.unavailable}</span>
                  {" | "}
                  <span class="text-error-text-base">{ctx.previewData.stats.collision}</span>
                </p>
              </CardHeader>
              <CardBody>
                <List>
                  {ctx.previewData.assigned.map((assign) => (
                    <ListItem class="flex items-center" key={assign.employee.id}>
                      <div class="flex-1">
                        <p class="text-sm">{assign.employee.fullName}</p>
                        <p class="text-xs text-app-text-weaker">{assign.employee.contract}</p>
                      </div>
                      <StatusIndicator severity="success" />
                    </ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
          </>
        )}
      </DialogBody>
      <DialogFooter>
        <ConfirmDeleteAction
          onConfirmed$={() => {
            // TODO: odstranit zaznam
            // Something like:
            // await removeEvent(ctx.previewData?.id);

            showSig.value = false;
          }}
          size="xs"
          variant="outline"
        />
      </DialogFooter>
    </Dialog>
  );
});
