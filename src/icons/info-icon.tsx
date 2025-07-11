import type { QwikIntrinsicElements } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

export const InfoIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1.5em" viewBox="0 0 16 16" width="1.5em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8 15c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6"
        fill="currentColor"
      ></path>
      <circle cx="8" cy="6" fill="currentColor" r=".75"></circle>
      <path d="M8 12c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5" fill="currentColor"></path>
    </svg>
  );
});
