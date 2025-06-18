import type { QRL } from "@builder.io/qwik";

import { Button, Card, CardBody, CardHeader, List, ListItem } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

import type { ExpectationListItem } from "./fetch-expectation-list";

type PatientSelectionProps = {
  currentDetailId: null | string | undefined;
  expectations: ExpectationListItem[];
  navigateToDetail$: QRL<(expectationId: string) => void>;
};

export const ExpectationSelection = component$((props: PatientSelectionProps) => {
  return (
    <>
      <PatientSelectionXs {...props} />
      <PatientSelectionList {...props} />
    </>
  );
});

export const PatientSelectionXs = component$(
  ({ currentDetailId, expectations, navigateToDetail$ }: PatientSelectionProps) => {
    return (
      <Card class="sm:hidden">
        <CardBody>
          <div class="flex flex-wrap items-end gap-4">
            <div class="form-styles flex-1">
              <div class="form-group">
                <label>Vyberte pacienta</label>
                <div class="input-group">
                  <select
                    onInput$={async (_, el) => {
                      await navigateToDetail$(el.value);
                    }}
                  >
                    <option value="">--- Vyberte pacienta ---</option>
                    {expectations.map((exp) => (
                      <option key={exp.id} selected={currentDetailId === exp.id} value={exp.id}>
                        {[exp.patient.fullName, exp.patient.birthRegistrationNumber, exp.priority.toUpperCase()]
                          .filter((i): i is string => !!i)
                          .join(" - ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <ReloadListButton />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  },
);

export const PatientSelectionList = component$(
  ({ currentDetailId, expectations, navigateToDetail$ }: PatientSelectionProps) => {
    return (
      <Card class="hidden h-full sm:block">
        <CardHeader>
          <ReloadListButton />
        </CardHeader>
        <CardBody class="h-full overflow-y-auto">
          <List class="pb-4">
            {expectations.map((exp) => {
              const isCurrent = exp.id === currentDetailId;

              return (
                <ListItem
                  class={[
                    "text-sm",
                    !isCurrent && exp.priority === "CRITICAL" && "bg-danger-base !text-danger-text-contrast",
                    !isCurrent && exp.priority === "HIGH" && "bg-warning-base !text-warning-text-contrast",
                    !isCurrent && exp.priority === "STABILIZED" && "bg-success-base !text-success-text-contrast",
                    isCurrent && "bg-accent-base !text-accent-text-contrast",
                  ]}
                  key={exp.id}
                  onClick$={async () => {
                    await navigateToDetail$(exp.id);
                  }}
                  role="button"
                >
                  <p>{exp.patient.fullName}</p>
                  <p class="text-xs">{exp.patient.birthRegistrationNumber}</p>
                </ListItem>
              );
            })}
          </List>
        </CardBody>
      </Card>
    );
  },
);

const ReloadListButton = component$(() => {
  const navigate = useNavigate();
  return (
    <Button
      onClick$={() => {
        navigate();
      }}
      type="button"
    >
      Znovu načíst seznam
    </Button>
  );
});
