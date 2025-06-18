import type { ClassList, JSXOutput } from "@builder.io/qwik";

import { component$, useId } from "@builder.io/qwik";

export type ProcedureProgressIndicatorProps = {
  class?: ClassList;
  stepCurrentMajor: number;
  steps: { label: string }[];
  title?: JSXOutput;
};

export const ProcedureProgressIndicator = component$(
  ({ class: pClass, stepCurrentMajor, steps, title }: ProcedureProgressIndicatorProps) => {
    const id = useId();

    return (
      <div class={pClass}>
        <h4 class="sr-only">Stav postupu</h4>
        <p class="text-sm font-bold text-app-text-strong">{title}</p>
        <div aria-hidden="true" class="mt-6">
          <div class="overflow-hidden rounded-full bg-gray-200">
            <div
              class="h-2 rounded-full bg-progress-base"
              style={{
                width: `${((stepCurrentMajor - (stepCurrentMajor === steps.length ? 0 : 0.5)) / 6) * 100}%`,
              }}
            ></div>
          </div>
          <div class="mt-6 hidden grid-cols-6 text-sm font-medium text-app-text-weakest sm:grid">
            {steps.map((step, idx) => (
              <div
                class={[
                  idx <= stepCurrentMajor - 1 && "text-progress-text-base",
                  idx === 0 && "text-left",
                  idx > 0 && idx < steps.length - 1 && "text-center",
                  idx === steps.length - 1 && "text-right",
                ]}
                key={`${id}-${idx}`}
              >
                {step.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
