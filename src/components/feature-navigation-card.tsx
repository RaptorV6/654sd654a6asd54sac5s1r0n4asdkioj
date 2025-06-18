import type { ClassList, JSXOutput } from "@builder.io/qwik";

import { ButtonMoreMenu } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

type FeatureNavigationCardProps = {
  class?: ClassList;
  href: string;
  label: string;
  moreOptions?: JSXOutput;
  shortBgColor?: string;
  shortFgColor?: string;
  shortName?: null | string;
  sublabel?: null | string;
};

export const FeatureNavigationCard = component$<FeatureNavigationCardProps>(
  ({ class: rootClass, href, label, moreOptions, shortBgColor, shortFgColor, shortName, sublabel }) => (
    <li class={["flex min-h-14 rounded bg-app-surface-base shadow-sm hover:shadow-lg"]}>
      <div
        class={[
          "flex w-16 flex-shrink-0 items-center justify-center rounded-l border-b border-l border-t border-app-border-base bg-app-surface-base text-sm font-medium uppercase text-app-text-base",
          rootClass,
        ]}
        style={{ backgroundColor: shortBgColor, color: shortFgColor }}
      >
        {shortName?.slice(0, 3)}
      </div>
      <div class="flex flex-1 items-center justify-between truncate rounded-r border-b border-r border-t border-app-border-base">
        <div class="group relative flex-1 truncate px-4 py-2 text-sm">
          <p class="font-medium text-app-text-base group-hover:text-app-text-strong">{label}</p>
          {sublabel && <p class="text-app-text-weaker">{sublabel}</p>}
          <Link class="absolute inset-0" href={href}>
            <span class="sr-only">{label}</span>
          </Link>
        </div>
        {moreOptions && <ButtonMoreMenu class="ml-1">{moreOptions}</ButtonMoreMenu>}
      </div>
    </li>
  ),
);
