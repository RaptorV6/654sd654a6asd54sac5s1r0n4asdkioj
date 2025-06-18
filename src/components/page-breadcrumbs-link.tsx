import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

type PageBreadcrumbsLinkProps = { href: string };

export const PageBreadcrumbsLink = component$((props: PageBreadcrumbsLinkProps) => {
  return (
    <li class="pl-2 text-sm leading-normal text-app-text-link before:float-left before:pr-2 before:text-app-text-link before:content-['/']">
      <Link class={"opacity-50"} href={props.href}>
        <Slot />
      </Link>
    </li>
  );
});
