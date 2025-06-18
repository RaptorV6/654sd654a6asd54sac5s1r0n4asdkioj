import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";

type SubNav = "indicationCard" | "overview" | "preoperativeExaminations" | "stagingExaminations" | "todo";

// TODO: Je potrebne toto dorobit tak, aby bola komponenta vseobecna...
export const PageNavigation = component$(({ procedureId }: { procedureId: number }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const current = useSignal<SubNav>(() => (procedureId === 13 ? "todo" : "overview"));

  useTask$(({ track }) => {
    const pathname = track(() => location.url.pathname);
    const pathPart = pathname.split("/")[5];
    switch (pathPart) {
      case "indication-card":
        current.value = "indicationCard";
        break;
      case "preoperative-examinations":
        current.value = "preoperativeExaminations";
        break;
      case "staging-examinations":
        current.value = "stagingExaminations";
        break;
      case "todo":
        current.value = "todo";
        break;
    }
  });

  /* eslint-disable perfectionist/sort-objects */
  const navigationItems: Record<
    SubNav,
    {
      href: string;
      label: string;
    } | null
  > = {
    todo:
      procedureId === 13
        ? {
            href: `/hospital/yy/${procedureId}/todo`,
            label: "Aktuální krok",
          }
        : null,
    overview: {
      href: `/hospital/yy/${procedureId}`,
      label: "Přehled",
    },
    indicationCard: {
      href: `/hospital/yy/${procedureId}/indication-card`,
      label: "Indikační karta",
    },
    stagingExaminations: {
      href: `/hospital/yy/${procedureId}/staging-examinations`,
      label: "Stagingová vyšetření",
    },
    preoperativeExaminations: {
      href: `/hospital/yy/${procedureId}/preoperative-examinations`,
      label: "Předoperační vyšetření",
    },
  };
  /* eslint-enable perfectionist/sort-objects */

  return (
    <div class="relative my-4 border-b border-app-border-strong pb-5 sm:pb-0">
      <div class="sm:hidden">
        <label class="sr-only" for="current-tab">
          Select a tab
        </label>
        <select
          class="block w-full rounded border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-app-border-base focus:ring-2 focus:ring-inset focus:ring-app-border-hover"
          id="current-tab"
          name="current-tab"
          onInput$={(e, el) => {
            e.preventDefault();
            const selectedKey = el.value as keyof typeof navigationItems;
            const selectedItem = navigationItems[selectedKey];
            if (selectedItem) {
              navigate(selectedItem.href);
            }
          }}
          value={Object.keys(navigationItems).find((key) => current.value === key)}
        >
          {Object.entries(navigationItems).map(
            ([key, item]) =>
              item && (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ),
          )}
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8 overflow-x-auto">
          {Object.entries(navigationItems).map(
            ([key, item]) =>
              item && (
                <Link
                  aria-current={current.value === key ? "page" : undefined}
                  class={[
                    current.value === key
                      ? "border-app-text-link text-app-text-link"
                      : "border-transparent text-app-text-base hover:border-app-border-hover hover:text-app-text-strong",
                    "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium",
                  ]}
                  href={item.href}
                  key={key}
                >
                  {item.label}
                </Link>
              ),
          )}
        </nav>
      </div>
    </div>
  );
});
