import type { Signal } from "@builder.io/qwik";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  Dialog,
  DialogBody,
  DialogHeader,
  List,
  ListItem,
  StatusIndicator,
} from "@akeso/ui-components";
import { i18nFormatDate, i18nFormatNumber, i18nFormatTime } from "@akeso/utils";
import { component$ } from "@builder.io/qwik";

import type { CdrCalendarEvent } from "../../_mock-cdr-data";

type CdrCalendarEventDetailModalProps = {
  "bind:show": Signal<boolean>;
  event: CdrCalendarEvent;
};

export const CdrCalendarEventDetailModal = component$<CdrCalendarEventDetailModalProps>(
  ({ "bind:show": showSig, event }) => {
    return (
      <Dialog bind:show={showSig}>
        <DialogHeader>
          <h2>{event.title}</h2>
        </DialogHeader>
        <DialogBody>
          <p class="text-sm text-app-text-link">
            {i18nFormatDate(event.dateFrom)} {i18nFormatTime(event.dateFrom)}
            {" - "}
            {i18nFormatTime(event.dateTo!)} ({i18nFormatNumber(event.duration!)}min)
          </p>
          <div class="flex items-center justify-between text-left text-[0.6rem]/5 text-blue-500 group-hover:text-blue-700">
            <div class="inline-flex items-center gap-2 text-sm">
              <>
                {!event.room?.shared ? (
                  <svg
                    class="h-4 w-4 shrink-0"
                    height="32"
                    viewBox="0 0 24 24"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    class="h-5 w-5 shrink-0"
                    height="32"
                    viewBox="0 0 24 24"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 18q-.425 0-.712-.288T0 17v-.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0q-.425 0-.712-.288T6 17v-.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V17q0 .425-.287.713T17 18zm12.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V17q0 .425-.288.713T23 18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12"
                      fill="currentColor"
                    />
                  </svg>
                )}{" "}
                {event.room?.capacity}
              </>
            </div>
            <div class="inline-flex items-center gap-2 pr-2">
              <svg
                class="h-4 w-4 shrink-0"
                height="32"
                viewBox="0 0 24 24"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z" fill="currentColor" />
              </svg>

              {/* <span>
              {event.stats.count}
              {" | "}
              <span class="text-yellow-500">{event.stats.unavailable}</span>
              {" | "}
              <span class="text-error-text-base">{event.stats.collision}</span>
            </span> */}
            </div>
          </div>
          <Card class="mt-4">
            <CardBody>
              <p>
                Procedura: <span class="font-bold">{event.medicalProcedure.name}</span>
              </p>
            </CardBody>
          </Card>
          <Card class="mt-4">
            <CardHeader>
              <CardHeaderTitle>Místnost</CardHeaderTitle>
            </CardHeader>
            <CardBody>
              <div>Název: {event.room?.name}</div>
              <div>Kapacita: {event.room?.capacity}</div>
            </CardBody>
          </Card>
          {/* <Card class="mt-4">
          <CardHeader>
            <CardHeaderTitle>Slot</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            <div>Typ</div>
          </CardBody>
        </Card> */}
          {event.assigned.length > 0 && (
            <Card class="mt-4">
              <CardHeader>
                <CardHeaderTitle>Personál</CardHeaderTitle>
              </CardHeader>
              <CardBody>
                <List>
                  {event.assigned.map((per) => (
                    <ListItem class="flex items-center gap-4" key={per.employee.id}>
                      <StatusIndicator severity="success" />
                      <span class="flex-1">{per.employee.fullName}</span>
                    </ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
          )}
        </DialogBody>
      </Dialog>
    );
  },
);
