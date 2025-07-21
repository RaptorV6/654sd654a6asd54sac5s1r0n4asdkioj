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

// New types for mouse-based dragging
export interface MouseDragState {
  readonly dragElement: HTMLElement | null;
  readonly eventId: string;
  readonly eventType: string;
  readonly isDragging: boolean;
  readonly originalPosition: {
    left: string;
    pointerEvents: string;
    position: string;
    top: string;
    zIndex: string;
  };
  readonly startOffset: { x: number; y: number };
}

export interface HitDetectionResult {
  readonly date: Date;
  readonly isValid: boolean;
  readonly sal: OjpSal;
  readonly slotIndex: number;
}
