import type { Signal } from "@builder.io/qwik";

import type { OjpSal } from "../_mock-events";

export interface DragState {
  readonly draggedEventId: Signal<string>;
  readonly draggedEventType: Signal<string>;
  readonly dropPreview: Signal<DropPreview | null>;
}

export interface DropPreview {
  readonly date: Date;
  readonly sal: OjpSal;
  readonly slotIndex: number;
}
