import type { QwikIntrinsicElements } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

export const ChangeProfileDataIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} height="3em" viewBox="0 0 24 24" width="3em">
      <path
        d="m21.7 13.58l-1.28-1.28a.55.55 0 0 0-.77 0l-1 1l2.05 2.05l1-1a.55.55 0 0 0 0-.77M12 22h2.06l6.05-6.07l-2.05-2.05L12 19.94zm-2-1H5c-.53 0-1.04-.21-1.41-.59C3.21 20.04 3 19.53 3 19V5c0-.53.21-1.04.59-1.41C3.96 3.21 4.47 3 5 3h14a2 2 0 0 1 2 2v5.33a2.57 2.57 0 0 0-2 .03V5H5v14h5.11l-.11.11zm4.62-6.5L12.11 17H7.5v-.75c0-1.5 3-2.25 4.5-2.25c.7 0 1.73.16 2.62.5m-1.03-2.91c-.42.41-.99.66-1.59.66s-1.17-.25-1.59-.66A2.3 2.3 0 0 1 9.75 10c0-.6.25-1.17.66-1.59c.42-.41.99-.66 1.59-.66s1.17.25 1.59.66c.41.42.66.99.66 1.59s-.25 1.17-.66 1.59"
        fill="currentColor"
      />
    </svg>
  );
});
