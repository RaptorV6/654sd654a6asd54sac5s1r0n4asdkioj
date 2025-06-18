import type { ClassList } from "@builder.io/qwik";

import { component$, Slot } from "@builder.io/qwik";

type CalendarProps = {
  class?: ClassList;
};

export const Calendar = component$<CalendarProps>((props) => {
  return (
    <div {...props} class={["flex h-full flex-col", props.class]}>
      <Slot />
    </div>
  );
});
