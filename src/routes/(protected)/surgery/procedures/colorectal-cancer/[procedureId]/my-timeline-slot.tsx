/**
 * Shadow copy of ui-components. There is bug and this solution is working.
 *
 * TODO: resolve problem with import from UI components.
 */

import type {
  ClassList,
  FunctionComponent,
  JSXOutput,
  QwikHTMLElements,
  QwikIntrinsicElements,
} from "@builder.io/qwik";

import { HumanTimeSpan, type StatusIndicatorSeverity, type StatusIndicatorSize } from "@akeso/ui-components";
import { $, component$, Slot, useSignal, useStyles$ } from "@builder.io/qwik";

type TimelineSlotProps = {
  class?: ClassList;
  defaultExpanded?: boolean;
  doneAt?: Date | null | undefined;
  doneBy?: null | string | undefined;
  expandable?: boolean;
  hideContent?: boolean;
  pulse?: boolean;
  severity?: StatusIndicatorSeverity;
  title: JSXOutput;
  titleAs?: keyof QwikHTMLElements;
};

export const MyTimelineSlot = component$(
  ({
    class: pClass,
    defaultExpanded = false,
    doneAt,
    doneBy,
    expandable,
    hideContent = false,
    pulse,
    severity,
    title,
    titleAs,
  }: TimelineSlotProps) => {
    useStyles$(`
    .timeline-slot:last-of-type .timeline-slot-line {
      display: none;
    }

    .timeline-slot .timeline-slot-title {
      display: flex;
      margin-top: 0.25rem;
      row-gap: 0.25rem;
    }

    .timeline-slot .timeline-slot-title[role="button"] {
      cursor: pointer;
    }
  `);

    const TileComponent = (titleAs || "h4") as any as FunctionComponent<{ class?: ClassList }>;

    const expandedSig = useSignal(defaultExpanded);
    const handleExpansionToggle$ = $(() => {
      expandedSig.value = !expandedSig.value;
    });

    return (
      <div class={["timeline-slot relative flex gap-x-4", pClass]}>
        <div class="timeline-slot-line absolute -bottom-6 left-0 top-0 flex w-4 justify-center">
          <div class="w-px bg-app-border-base"></div>
        </div>
        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-app-surface-base">
          <StatusIndicator class="mr-2" pulse={pulse} severity={severity} />
        </div>
        <div class="flex-auto space-y-4">
          <div
            class="timeline-slot-title"
            onClick$={expandable ? handleExpansionToggle$ : undefined}
            role={expandable ? "button" : undefined}
          >
            <TileComponent class="flex-auto text-sm font-medium">{title}</TileComponent>
            <div class="-my-0.5 inline-flex flex-none flex-col flex-wrap items-end justify-start text-xs leading-5 text-app-text-weaker">
              {doneBy && <div>{doneBy}</div>}
              {doneAt && <HumanTimeSpan date={doneAt} />}
            </div>
          </div>
          {!hideContent && (!expandable || expandedSig.value) && <Slot />}
        </div>
      </div>
    );
  },
);

type StatusIndicatorProps<C extends keyof QwikIntrinsicElements> = {
  as?: C;
  class?: ClassList;
  pulse?: boolean;
  severity?: StatusIndicatorSeverity;
  size?: StatusIndicatorSize;
} & QwikIntrinsicElements[C];

export const StatusIndicator = component$(
  <C extends keyof QwikIntrinsicElements>({
    as: asProp,
    class: classProp,
    pulse = false,
    severity = "none",
    size = "base",
    ...rootProps
  }: StatusIndicatorProps<C>) => {
    const Component = (asProp ?? "span") as FunctionComponent | string;
    return (
      <Component
        {...rootProps}
        class={["relative flex", size === "base" && "h-3 w-3", size === "lg" && "h-4 w-4", classProp]}
      >
        {pulse && (
          <span
            class={[
              severity === "none" && "bg-neutral-400/75",
              severity === "info" && "bg-info-400/75",
              severity === "success" && "bg-success-400/75",
              severity === "warning" && "bg-warning-400/75",
              severity === "danger" && "bg-danger-400/75",
              severity === "highlight" && "bg-highlight-400/75",
              severity === "progress" && "bg-progress-400/75",
              severity === "accent" && "bg-accent-400/75",
              "absolute inline-flex h-full w-full animate-ping rounded-full",
            ]}
          />
        )}
        <span
          class={[
            "relative inline-flex h-full w-full items-center justify-center rounded-full",
            severity === "none" && "bg-neutral-500/20 text-neutral-500 dark:bg-neutral-300/30 dark:text-neutral-300",
            severity === "info" && "bg-info-400/20 text-info-400 dark:bg-info-400/50",
            severity === "success" && "bg-success-400/20 text-success-400 dark:bg-success-400/50",
            severity === "warning" && "bg-warning-400/20 text-warning-400 dark:bg-warning-400/50",
            severity === "danger" && "bg-danger-400/20 text-danger-400 dark:bg-danger-400/50",
            severity === "highlight" && "bg-highlight-400/20 text-highlight-400 dark:bg-highlight-400/50",
            severity === "progress" && "bg-progress-400/20 text-progress-400 dark:bg-progress-400/50",
            severity === "accent" && "bg-accent-400/20 text-accent-400 dark:bg-accent-400/50",
          ]}
        >
          <span
            class={[
              "inline-flex rounded-full bg-current",
              size === "base" && "h-1.5 w-1.5",
              size === "lg" && " h-2 w-2",
            ]}
          />
        </span>
      </Component>
    );
  },
);
