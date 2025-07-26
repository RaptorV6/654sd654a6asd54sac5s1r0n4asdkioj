import type { QRL, Signal } from "@builder.io/qwik";

import { Button } from "@akeso/ui-components";
import { component$ } from "@builder.io/qwik";

import type { CollisionInfo, DraggedEventInfo } from "./ojp-collision-detection";

export interface CollisionModalProps {
  "bind:show": Signal<boolean>;
  collisionInfo: CollisionInfo | null;
  draggedEventInfo: DraggedEventInfo | null;
  onCancel$: QRL<() => void>;
  onConfirm$: QRL<() => void>;
}

export const OjpCollisionModal = component$<CollisionModalProps>(
  ({ "bind:show": show, collisionInfo, draggedEventInfo, onCancel$, onConfirm$ }) => {
    if (!show.value || !collisionInfo || !draggedEventInfo) {
      return null;
    }

    const getModalTitle = (): string => {
      if (collisionInfo.isOutOfBounds) {
        return "Událost by opustila kalendář";
      }
      return "Kolize s existujícími událostmi";
    };

    const getModalMessage = (): string => {
      if (collisionInfo.isOutOfBounds) {
        const reason = collisionInfo.outOfBoundsReason;
        if (reason === "before-start") {
          return "Událost by začínala před začátkem kalendáře. Akce bude zrušena.";
        } else if (reason === "after-end") {
          return "Událost by končila po konci kalendáře. Akce bude zrušena.";
        }
        return "Událost by opustila povolenou oblast kalendáře.";
      }

      const eventCount = collisionInfo.conflictingEvents.length;
      return `Tážená událost koliduje s ${eventCount} ${eventCount === 1 ? "událostí" : "událostmi"}. Kolidující události se automaticky posunou.`;
    };

    return (
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style="z-index: 9999;">
        <div class="max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h2 class="mb-4 text-lg font-semibold text-gray-900">{getModalTitle()}</h2>
          <p class="mb-6 text-sm text-gray-600">{getModalMessage()}</p>

          <div class="flex justify-end gap-3">
            <Button onClick$={onCancel$} type="button" variant="outline">
              {collisionInfo.isOutOfBounds ? "Zavřít" : "Zrušit"}
            </Button>
            {!collisionInfo.isOutOfBounds && (
              <Button onClick$={onConfirm$} severity="accent" type="button" variant="contained">
                Ano, posunout události
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  },
);
