import type { DocumentHead } from "@builder.io/qwik-city";

import { component$, Slot } from "@builder.io/qwik";

export const head: DocumentHead = ({ head }) => ({
  title: head.title ? `${head.title} - Oddělení chirurgie` : "Oddělení chirurgie",
});

export default component$(() => <Slot />);
