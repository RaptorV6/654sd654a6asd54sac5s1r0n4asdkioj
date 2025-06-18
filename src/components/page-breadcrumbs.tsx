import type { ClassList } from "@builder.io/qwik";

import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { HomeOutlineIcon } from "./icons-outline";

type PageBreadcrumbsProps = { class?: ClassList; homeIsCurrent?: boolean; homeLabel?: string; homeUrl?: string };

export const PageBreadcrumbs = component$((props: PageBreadcrumbsProps) => {
  const Content = () => (
    <>
      <span class="sr-only">{props.homeLabel || "Home"}</span>
      <HomeOutlineIcon class="-mt-1 h-4 w-4" />
    </>
  );
  return (
    <ol class={["bg-trasparent -mx-8 mb-2 flex flex-wrap items-center px-8 pb-2 pt-3", props.class]}>
      <li aria-current={props.homeIsCurrent ? "page" : undefined} class="items-top flex text-sm leading-normal">
        {props.homeIsCurrent ? (
          <Content />
        ) : (
          <Link class={"text-app-text-link opacity-30"} href={props.homeUrl || "/"}>
            <Content />
          </Link>
        )}
      </li>
      <Slot />
    </ol>
  );
});
