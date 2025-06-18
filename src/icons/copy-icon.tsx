import type { QwikIntrinsicElements } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

export const CopyIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} height="1em" viewBox="0 0 512 512" width="1em">
      <rect
        fill="none"
        height="336"
        rx="57"
        ry="57"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        width="336"
        x="128"
        y="128"
      />
      <path
        d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
    </svg>
  );
});
