import type { ClassList, FunctionComponent, JSXOutput, QwikIntrinsicElements } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

type FeatureActionProps = {
  class?: ClassList;
  colors?: {
    bg: string;
    text: string;
  };
  description?: null | string;
  href: string;
  icon: FunctionComponent<QwikIntrinsicElements["svg"]>;
  label: JSXOutput;
};

export const FeatureAction = component$<FeatureActionProps>(
  ({ colors, description, href, icon: Icon, label, ...props }) => {
    const { bg: colorBg, text: colorText } = colors ?? { bg: "rgb(120 120 120 / 0.1)", text: "rgb(120 120 120)" };

    return (
      <Link class="group flex h-full w-full cursor-pointer flex-col items-center md:bg-app-surface-base" href={href}>
        <div
          class="flex-1 rounded border-t-4 bg-app-surface-base shadow group-hover:shadow-md md:w-full md:border-t-8"
          style={{ borderTopColor: colorText }}
        >
          <div
            class={["m-1 flex items-center gap-2 rounded p-2 md:m-0 md:h-20 md:rounded-none", props.class]}
            style={{ backgroundColor: colorBg, color: colorText }}
          >
            <p class="m-0 hidden p-0 text-sm text-app-text-base md:inline-block md:flex-1 md:uppercase">{label}</p>
            <Icon class="h-6 w-6 shrink-0 text-inherit md:h-7 md:w-7" />
          </div>
          <p class="hidden p-2 text-sm text-app-text-weaker md:block">{description}</p>
        </div>
        <p class="relative mt-1 text-center text-xs md:hidden">{label}</p>
      </Link>
    );
  },
);
