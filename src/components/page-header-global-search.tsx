import { component$ } from "@builder.io/qwik";

export const PageHeaderGlobalSearch = component$(() => {
  return (
    <form action="#" class="relative flex flex-1" method="GET">
      <label class="sr-only" for="search-field">
        Search
      </label>
      <svg
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-0 ml-1 h-full w-5 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          clip-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          fill-rule="evenodd"
        />
      </svg>
      <input
        class="block h-full w-full rounded-md border-0 bg-transparent py-2 pl-8 pr-0 text-white transition-all placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:shadow-sm focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm dark:focus:bg-white/5"
        id="search-field"
        name="search"
        placeholder="Search..."
        type="search"
      />
    </form>
  );
});
