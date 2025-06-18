import type { QwikIntrinsicElements } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

export const BoldIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.8 19V5h5.525q1.625 0 3 1T16.7 8.775q0 1.275-.575 1.963t-1.075.987q.625.275 1.388 1.025T17.2 15q0 2.225-1.625 3.113t-3.05.887zm3.025-2.8h2.6q1.2 0 1.463-.612t.262-.888q0-.275-.262-.887T12.35 13.2H9.825zm0-5.7h2.325q.825 0 1.2-.425t.375-.95q0-.6-.425-.975t-1.1-.375H9.825z"
        fill="currentColor"
      ></path>
    </svg>
  );
});

export const ItalicIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 19v-2.5h4l3-9H8V5h10v2.5h-3.5l-3 9H15V19z" fill="currentColor"></path>
    </svg>
  );
});
