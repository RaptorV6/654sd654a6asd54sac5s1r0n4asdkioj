import type { ClassList, JSXOutput, QRLEventHandlerMulti } from "@builder.io/qwik";

import { $, component$, Slot } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export type PageProgressHorizontalItemStatus = "completed" | "current" | "upcoming";

export type PageProgressHorizontalStep<TCode extends string> = {
  code: TCode;
  href?: string;
  onClick$?: QRLEventHandlerMulti<PointerEvent, HTMLButtonElement>;
  subTitle?: JSXOutput;
  title: JSXOutput;
};

export type PageProgressHorizontalProps<TCode extends string> = {
  class?: ClassList;
  currentStepCode: null | string | undefined;
  disableForwardNavigation?: boolean;
  steps: PageProgressHorizontalStep<TCode>[];
};

export const PageProgressHorizontal = component$(
  <TCode extends string>({
    class: rootClass,
    currentStepCode,
    disableForwardNavigation,
    steps,
  }: PageProgressHorizontalProps<TCode>) => {
    const currentStepIntex = steps.findIndex((s) => s.code === currentStepCode);

    const getStepStatus = (stepIndex: number): PageProgressHorizontalItemStatus => {
      if (stepIndex === currentStepIntex) return "current";
      if (stepIndex < currentStepIntex) return "completed";
      return "upcoming";
    };

    return (
      <PageProgressHorizontalRoot class={rootClass}>
        {steps.map((step, idx) => (
          <PageProgressHorizontalItem
            disableForwardNavigation={disableForwardNavigation}
            href={step.href}
            key={step.code}
            last={idx === steps.length - 1}
            onClick$={step.onClick$}
            status={getStepStatus(idx)}
            title={step.title}
          />
        ))}
      </PageProgressHorizontalRoot>
    );
  },
);

type PageProgressHorizontalRootProps = {
  class?: ClassList;
};

export const PageProgressHorizontalRoot = component$<PageProgressHorizontalRootProps>(({ class: rootClass }) => {
  return (
    <nav aria-label="Progress" class={rootClass}>
      <ol class="flex items-center" role="list">
        <Slot />
      </ol>
    </nav>
  );
});

type PageProgressHorizontalItemProps = {
  disableForwardNavigation?: boolean;
  href?: string;
  last: boolean;
  onClick$?: QRLEventHandlerMulti<PointerEvent, HTMLButtonElement>;
  status: PageProgressHorizontalItemStatus;
  subTitle?: JSXOutput;
  title: JSXOutput;
};

export const PageProgressHorizontalItem = component$<PageProgressHorizontalItemProps>(
  ({ disableForwardNavigation, href, last, onClick$, status, subTitle, title }) => {
    const navigate = useNavigate();
    const handleHref$ = $(async () => {
      if (href) {
        await navigate(href);
      }
    });
    const disabledNavigation = disableForwardNavigation && status === "upcoming";

    return (
      <li class={["page-progress-item group relative flex min-w-8 items-center sm:min-w-20"]}>
        {!last && (
          <div aria-hidden="true" class="absolute inset-0 flex items-center">
            <div class={["h-0.5 w-full", status === "completed" ? "bg-accent-base" : "bg-app-border-base"]}></div>
          </div>
        )}
        <div>
          <button
            aria-current={status === "current" ? "step" : undefined}
            class={[
              "relative flex h-8 w-8 items-center justify-center rounded-full",
              status === "completed" && "bg-accent-base group-hover:bg-accent-hover",
              status === "current" && "border-2 border-accent-base bg-app-surface-base",
              status === "upcoming" &&
                "border-2 border-app-border-base bg-app-surface-base group-hover:border-app-border-hover",
            ]}
            disabled={disabledNavigation}
            onClick$={[onClick$, handleHref$]}
            type="button"
          >
            {status === "completed" && (
              <svg
                aria-hidden="true"
                class="h-5 w-5 text-accent-text-contrast"
                data-slot="icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clip-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  fill-rule="evenodd"
                />
              </svg>
            )}
            {status === "current" && <span aria-hidden="true" class="h-2.5 w-2.5 rounded-full bg-accent-base" />}
            {status === "upcoming" && (
              <span
                aria-hidden="true"
                class="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-app-border-hover"
              />
            )}
            <span class="sr-only">{title}</span>
          </button>
        </div>
        <button
          class="relative ml-2 mr-8 flex min-w-0 flex-col bg-app-surface-base px-2"
          disabled={disabledNavigation}
          onClick$={[onClick$, handleHref$]}
          type="button"
        >
          <span class={["text-sm font-bold", status === "current" && "text-accent-text-base"]}>{title}</span>
          {subTitle && <span class="text-sm text-app-text-weaker">{subTitle}</span>}
        </button>
      </li>
    );
  },
);
