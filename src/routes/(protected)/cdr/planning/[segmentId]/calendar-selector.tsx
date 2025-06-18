import { component$ } from "@builder.io/qwik";

export const CalendarSelector = component$(() => {
  return (
    <header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
      <h1 class="text-base font-semibold text-gray-900">
        <time dateTime="2022-01">January 2022</time>
      </h1>
      <div class="flex items-center">
        <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            type="button"
          >
            <span class="sr-only">Previous week</span>
            <svg aria-hidden="true" class="size-5" data-slot="icon" fill="currentColor" viewBox="0 0 20 20">
              <path
                clip-rule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                fill-rule="evenodd"
              />
            </svg>
          </button>
          <button
            class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            type="button"
          >
            Today
          </button>
          <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
          <button
            class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            type="button"
          >
            <span class="sr-only">Next week</span>
            <svg aria-hidden="true" class="size-5" data-slot="icon" fill="currentColor" viewBox="0 0 20 20">
              <path
                clip-rule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                fill-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div class="hidden md:ml-4 md:flex md:items-center">
          <div class="relative">
            <button
              aria-expanded="false"
              aria-haspopup="true"
              class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              type="button"
            >
              Week view
              <svg
                aria-hidden="true"
                class="-mr-1 size-5 text-gray-400"
                data-slot="icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clip-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  fill-rule="evenodd"
                />
              </svg>
            </button>

            {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          */}
            {/* <div
                aria-labelledby="menu-button"
                aria-orientation="vertical"
                class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                role="menu"
                tabIndex={-1}
              >
                <div class="py-1" role="none">
                  <!-- Active: "bg-gray-100 text-gray-900 outline-none", Not Active: "text-gray-700" -->
                  <a
                    class="block px-4 py-2 text-sm text-gray-700"
                    href="#"
                    id="menu-item-0"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Day view
                  </a>
                  <a
                    class="block px-4 py-2 text-sm text-gray-700"
                    href="#"
                    id="menu-item-1"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Week view
                  </a>
                  <a
                    class="block px-4 py-2 text-sm text-gray-700"
                    href="#"
                    id="menu-item-2"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Month view
                  </a>
                  <a
                    class="block px-4 py-2 text-sm text-gray-700"
                    href="#"
                    id="menu-item-3"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Year view
                  </a>
                </div>
              </div> */}
          </div>
          <div class="ml-6 h-6 w-px bg-gray-300"></div>
          <button
            class="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            type="button"
          >
            Add event
          </button>
        </div>
        <div class="relative ml-6 md:hidden">
          <button
            aria-expanded="false"
            aria-haspopup="true"
            class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
            id="menu-0-button"
            type="button"
          >
            <span class="sr-only">Open menu</span>
            <svg aria-hidden="true" class="size-5" data-slot="icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
          </button>

          {/* <!--
          Dropdown menu, show/hide based on menu state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        --> */}
          {/* <div
              aria-labelledby="menu-0-button"
              aria-orientation="vertical"
              class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              tabIndex={-1}
            >
              <div class="py-1" role="none">
                <!-- Active: "bg-gray-100 text-gray-900 outline-none", Not Active: "text-gray-700" -->
                <a
                  class="block px-4 py-2 text-sm text-gray-700"
                  href="#"
                  id="menu-0-item-0"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Create event
                </a>
              </div>
              <div class="py-1" role="none">
                <a
                  class="block px-4 py-2 text-sm text-gray-700"
                  href="#"
                  id="menu-0-item-1"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Go to today
                </a>
              </div>
              <div class="py-1" role="none">
                <a
                  class="block px-4 py-2 text-sm text-gray-700"
                  href="#"
                  id="menu-0-item-2"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Day view
                </a>
                <a
                  class="block px-4 py-2 text-sm text-gray-700"
                  href="#"
                  id="menu-0-item-3"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Week view
                </a>
                <a
                  class="block px-4 py-2 text-sm text-gray-700"
                  href="#"
                  id="menu-0-item-4"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Month view
                </a>
                <a
                  class="block px-4 py-2 text-sm text-gray-700"
                  href="#"
                  id="menu-0-item-5"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Year view
                </a>
              </div>
            </div> */}
        </div>
      </div>
    </header>
  );
});
