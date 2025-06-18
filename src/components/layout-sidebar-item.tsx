import type { ClassList, JSXOutput, QRL } from "@builder.io/qwik";

import { AvatarNiceText } from "@akeso/ui-components";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

type LayoutSidebarItemProps = {
  class?: ClassList;
  end?: boolean;
  href?: string;
  icon?: JSXOutput;
  initials?: string;
  label: string;
  onClick$?: QRL<(event: PointerEvent, element: HTMLButtonElement) => any>;
  subitems?: {
    end?: boolean;
    href: string;
    label: string;
  }[];
};

export const LayoutSidebarItem = component$(({ class: pClass, ...props }: LayoutSidebarItemProps) => {
  if (props.href != null && props.subitems != null) {
    throw new Error("<SidebarItem> can be link or expandable element. Set 'children' or 'href' props, NOT both.");
  }

  return (
    <li class={pClass}>
      {props.href ? <SidebarItemLink {...props} href={props.href} /> : <SidebarItemButton {...props} />}
    </li>
  );
});

type SidebarItemLinkProps = {
  end?: boolean;
  href: string;
  icon?: JSXOutput;
  initials?: string;
  label: string;
};

const SidebarItemLink = component$(({ end, href, icon, initials, label }: SidebarItemLinkProps) => {
  const location = useLocation();
  const isActive = useSignal<boolean>(false);

  useTask$(({ track }) => {
    const pathname = track(() => location.url.pathname);
    if (href) {
      if (end && pathname === href) {
        isActive.value = true;
      } else if (pathname.startsWith(href)) {
        isActive.value = true;
      } else {
        isActive.value = false;
      }
    }
  });

  return (
    <Link
      class={[
        "group flex w-full items-center gap-x-2 rounded px-3 py-2 text-sm leading-4",
        isActive.value ? "bg-accent-base text-accent-text-contrast" : "text-app-text-strong hover:bg-app-nav-hover",
      ]}
      // class="group flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-white"
      href={href}
    >
      {icon && (
        <span
          class={[isActive.value ? "text-accent-text-contrast" : "text-app-text-base group-hover:text-app-text-base"]}
        >
          {icon}
        </span>
      )}
      {initials && !icon && <AvatarNiceText>{initials.slice(0, 2)}</AvatarNiceText>}
      <span>{label}</span>
    </Link>
  );
});

type SidebarItemButtonProps = {
  icon?: JSXOutput;
  initials?: string;
  label: string;
  onClick$?: QRL<(event: PointerEvent, element: HTMLButtonElement) => any>;
  subitems?: {
    end?: boolean;
    href: string;
    label: string;
  }[];
};

const SidebarItemButton = component$(({ icon, initials, label, onClick$, subitems }: SidebarItemButtonProps) => {
  const location = useLocation();
  const activeSubitemHref = useSignal<null | string>(null);
  const expanded = useSignal<boolean>(false);

  useTask$(({ track }) => {
    const pathname = track(() => location.url.pathname);
    if (subitems) {
      for (const item of subitems)
        if (item.end && pathname === item.href) {
          activeSubitemHref.value = item.href;
        } else if (pathname.startsWith(item.href)) {
          activeSubitemHref.value = item.href;
        } else {
          activeSubitemHref.value = null;
        }
    }

    if (activeSubitemHref.value) {
      expanded.value = true;
    }
  });

  return (
    <>
      <button
        class={[
          "group flex w-full items-center gap-x-2 rounded px-3 py-2 text-sm leading-4",
          activeSubitemHref.value
            ? "bg-accent-weaker text-app-text-strong"
            : "text-app-text-strong hover:bg-app-nav-hover",
        ]}
        onClick$={async (event, target) => {
          expanded.value = !expanded.value;
          await onClick$?.(event, target);
        }}
        role={"button"}
        type="button"
      >
        {icon && (
          <span
            class={[
              activeSubitemHref.value
                ? "text-accent-text-contrast"
                : "text-app-text-base group-hover:text-accent-text-contrast",
            ]}
          >
            {icon}
          </span>
        )}
        {initials && !icon && <AvatarNiceText>{initials.slice(0, 2)}</AvatarNiceText>}
        <span>{label}</span>

        {subitems && subitems.length && (
          <svg
            aria-hidden="true"
            class={["ml-auto inline-block h-5 w-5 shrink-0 text-gray-400", expanded.value && "rotate-90 text-gray-500"]}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clip-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              fill-rule="evenodd"
            />
          </svg>
        )}
      </button>
      {subitems && subitems.length && expanded.value && (
        <ul class="mt-1 pl-2" id="sub-menu-1">
          {subitems.map((item, idx) => (
            <SidebarItemButtonSubitem
              key={`${item.href}-${idx}`}
              {...item}
              isActive={item.href === activeSubitemHref.value}
            />
          ))}
        </ul>
      )}
    </>
  );
});

type SidebarItemButtonSubitemProps = {
  href: string;
  isActive: boolean;
  label: string;
};

const SidebarItemButtonSubitem = component$(({ href, isActive, label }: SidebarItemButtonSubitemProps) => {
  return (
    <li>
      <Link
        class={[
          "block rounded px-3 py-2 text-sm leading-4",
          isActive ? "bg-accent-base text-accent-text-contrast" : "text-app-text-strong hover:bg-app-nav-hover",
        ]}
        href={href}
      >
        {label}
      </Link>
    </li>
  );
});
