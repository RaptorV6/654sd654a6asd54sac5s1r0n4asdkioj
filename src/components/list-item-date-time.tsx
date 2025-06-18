// TODO: MOVE to @akeso/ui-components

import { component$ } from "@builder.io/qwik";

type ListItemDatetimeProps = {
  time: Date | null | number | string | undefined;
};

export const ListItemDateTime = component$<ListItemDatetimeProps>(({ time }) => {
  return (
    <div class="text-xs font-thin leading-normal">
      {time != null && (
        <>
          <div>{new Intl.DateTimeFormat("cs", { day: "2-digit", month: "2-digit" }).format(new Date(time))}</div>
          <div class="block">{new Intl.DateTimeFormat("cs", { timeStyle: "short" }).format(new Date(time))}</div>
        </>
      )}
    </div>
  );
});
