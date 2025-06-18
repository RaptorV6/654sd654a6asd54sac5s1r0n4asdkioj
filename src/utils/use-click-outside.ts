import type { QRL, Signal } from "@builder.io/qwik";

import { $, useOnWindow } from "@builder.io/qwik";

export default function useClickOutside(
  anchorRef: Signal<HTMLElement | undefined>,
  handler: QRL<(event: PointerEvent, target: HTMLElement) => Promise<void> | void>,
) {
  useOnWindow(
    "click",
    $(async (event) => {
      const target = event.target as HTMLElement;
      if (target != anchorRef.value) {
        await handler(event, target);
      }
    }),
  );
}
