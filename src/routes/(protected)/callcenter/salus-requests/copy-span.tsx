import { component$ } from "@builder.io/qwik";

import { CopyIcon } from "~/icons";

type CopySpanProps = {
  textToCopy: null | string;
  title: string;
};
export const CopySpan = component$<CopySpanProps>(({ textToCopy, title }) => {
  return (
    <span
      class="cursor-pointer px-4"
      onClick$={() => {
        navigator.clipboard.writeText(textToCopy || "");
      }}
      title={title}
    >
      <CopyIcon />
    </span>
  );
});
