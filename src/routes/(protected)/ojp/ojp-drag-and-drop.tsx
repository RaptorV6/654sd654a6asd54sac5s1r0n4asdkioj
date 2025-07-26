/* eslint-disable no-console */
import type { QRL, Signal } from "@builder.io/qwik";

import { $, useSignal, useTask$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal } from "./_mock-events";
import type { CollisionInfo, DraggedEventInfo } from "./ojp-collision-detection";

import { createDraggedEventInfoFromSnapshot, detectEventCollisions } from "./ojp-collision-detection";

// Types pro drag & drop
export interface DragState {
  dragElement: HTMLElement;
  elementOffset?: { x: number; y: number };
  eventId: string;
  eventType: string;
  originalEvent: OjpEventPositioned; // ✅ Snapshot pôvodného eventu
  originalSeparator?: OjpEventPositioned; // ✅ Snapshot separátora (ak existuje)
  separatorElement?: HTMLElement;
  separatorId?: string;
  startPos: { x: number; y: number };
}

export interface DragAndDropAPI {
  currentCollisionInfo: Signal<CollisionInfo | null>;
  currentDraggedEventInfo: Signal<DraggedEventInfo | null>;
  draggedEventId: Signal<string>;
  draggedEventType: Signal<string>;
  handleEventDrop: QRL<
    (eventId: string, separatorId: string | undefined, date: Date, sal: OjpSal, slotIndex: number) => void
  >;
  handleStartDrag: QRL<
    (eventId: string, eventType: string, startPos: { x: number; y: number }, element: HTMLElement) => void
  >;
}

interface UseDragAndDropProps {
  events: Signal<OjpEventPositioned[]>;
  onCollisionDetected$?: QRL<(collisionInfo: CollisionInfo, draggedEventInfo: DraggedEventInfo) => void>;
  onEventDrop$?: QRL<
    (eventId: string, separatorId: string | undefined, newDate: Date, newSal: OjpSal, newTime: Date) => void
  >;
  timeHourFrom: number;
  timeHourTo: number;
}

export function useDragAndDrop({
  events,
  onCollisionDetected$,
  onEventDrop$,
  timeHourFrom,
  timeHourTo,
}: UseDragAndDropProps): DragAndDropAPI {
  // Drag state
  const dragState = useSignal<DragState | null>(null);
  const draggedEventId = useSignal<string>("");
  const draggedEventType = useSignal<string>("");

  // Collision detection state
  const currentCollisionInfo = useSignal<CollisionInfo | null>(null);
  const currentDraggedEventInfo = useSignal<DraggedEventInfo | null>(null);

  // Global mouse tracking
  useTask$(({ cleanup, track }) => {
    const currentDragState = track(() => dragState.value);

    if (currentDragState) {
      draggedEventId.value = currentDragState.eventId;
      draggedEventType.value = currentDragState.eventType;

      const handleGlobalMouseMove = $((e: MouseEvent) => {
        if (!dragState.value) return;

        const deltaX = e.clientX - dragState.value.startPos.x;
        const deltaY = e.clientY - dragState.value.startPos.y;

        // ✅ TRANSLATEUJ HLAVNÍ EVENT
        dragState.value.dragElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        // ✅ TRANSLATEUJ PROPOJENÝ EVENT POKUD EXISTUJE
        if (dragState.value.separatorElement) {
          dragState.value.separatorElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }

        // ✅ HIT DETECTION BASED ON ELEMENT LEFT EDGE, NOT MOUSE
        const elementRect = dragState.value.dragElement.getBoundingClientRect();
        const elementLeftX = elementRect.left;
        const elementCenterY = elementRect.top + elementRect.height / 2;

        const elementsUnderElement = document.elementsFromPoint(elementLeftX, elementCenterY);
        const dropSlot = elementsUnderElement.find((el) => el.hasAttribute("data-drop-slot"));

        let hasCollision = false;
        let isOutOfBounds = false;

        if (dropSlot) {
          // Výpočet nových časů pro collision detection
          const date = new Date(dropSlot.getAttribute("data-date") || "");
          const sal = dropSlot.getAttribute("data-sal") as OjpSal;
          const slotIndex = parseInt(dropSlot.getAttribute("data-slot-index") || "0");

          const minutesFromStart = slotIndex * 5;
          const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
          const minutes = minutesFromStart % 60;

          const newTime = new Date(date);
          newTime.setHours(hours, minutes, 0, 0);

          // ✅ Vytvoř info o táhané události zo snapshot-u (nie zo search v events)
          const draggedEventInfo = createDraggedEventInfoFromSnapshot(
            dragState.value.originalEvent,
            dragState.value.originalSeparator,
            date,
            sal,
            newTime,
          );

          // Detekuj kolize
          const collisionInfo = detectEventCollisions({
            draggedEventInfo,
            events: events.value,
            timeHourFrom,
            timeHourTo,
          });

          currentCollisionInfo.value = collisionInfo;
          currentDraggedEventInfo.value = draggedEventInfo;

          hasCollision = collisionInfo.hasCollision;
          isOutOfBounds = collisionInfo.isOutOfBounds;
        } else {
          // Mimo drop slot
          isOutOfBounds = true;
          currentCollisionInfo.value = null;
          currentDraggedEventInfo.value = null;
        }

        // ✅ VISUAL FEEDBACK BASED ON COLLISION STATE
        const shouldShowInvalid = !dropSlot || hasCollision || isOutOfBounds;
        dragState.value.dragElement.setAttribute("data-drop-invalid", shouldShowInvalid ? "true" : "false");
        if (dragState.value.separatorElement) {
          dragState.value.separatorElement.setAttribute("data-drop-invalid", shouldShowInvalid ? "true" : "false");
        }
      });

      const handleGlobalMouseUp = $(() => {
        if (!dragState.value) return;

        const eventId = dragState.value.eventId;
        const separatorId = dragState.value.separatorId;

        const elementRect = dragState.value.dragElement.getBoundingClientRect();
        const elementLeftX = elementRect.left;
        const elementCenterY = elementRect.top + elementRect.height / 2;
        const elementsUnderElement = document.elementsFromPoint(elementLeftX, elementCenterY);
        const dropSlot = elementsUnderElement.find((el) => el.hasAttribute("data-drop-slot"));

        // ✅ CLEANUP STYLING - HLAVNÍ EVENT
        dragState.value.dragElement.style.transform = "";
        dragState.value.dragElement.removeAttribute("data-being-dragged");
        dragState.value.dragElement.removeAttribute("data-drop-invalid");

        // ✅ CLEANUP STYLING - PROPOJENÝ EVENT
        if (dragState.value.separatorElement) {
          dragState.value.separatorElement.style.transform = "";
          dragState.value.separatorElement.removeAttribute("data-being-dragged");
          dragState.value.separatorElement.removeAttribute("data-drop-invalid");
        }

        // Úlož collision info before cleanup
        const finalCollisionInfo = currentCollisionInfo.value;
        const finalDraggedEventInfo = currentDraggedEventInfo.value;

        // Cleanup collision state
        currentCollisionInfo.value = null;
        currentDraggedEventInfo.value = null;

        dragState.value = null;
        draggedEventId.value = "";
        draggedEventType.value = "";

        if (dropSlot) {
          // Drop slot found - proceeding with collision logic

          const date = new Date(dropSlot.getAttribute("data-date") || "");
          const sal = dropSlot.getAttribute("data-sal") as OjpSal;
          const slotIndex = parseInt(dropSlot.getAttribute("data-slot-index") || "0");

          const minutesFromStart = slotIndex * 5;
          const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
          const minutes = minutesFromStart % 60;

          const newTime = new Date(date);
          newTime.setHours(hours, minutes, 0, 0);

          // Rozhodneť na základě collision info
          if (finalCollisionInfo && finalDraggedEventInfo) {
            if (finalCollisionInfo.isOutOfBounds) {
              console.log("🔴 [DRAG] Out of bounds - calling onCollisionDetected");
              if (onCollisionDetected$) {
                onCollisionDetected$(finalCollisionInfo, finalDraggedEventInfo);
              }
              return;
            } else if (finalCollisionInfo.hasCollision) {
              console.log("🟠 [DRAG] Collision detected - calling onCollisionDetected");
              if (onCollisionDetected$) {
                onCollisionDetected$(finalCollisionInfo, finalDraggedEventInfo);
              }
              return;
            }
          }
          console.log("🟢 [DRAG] No collision - normal drop");
          if (onEventDrop$) {
            onEventDrop$(eventId, separatorId, date, sal, newTime);
          }
        }
      });

      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);

      cleanup(() => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      });
    } else {
      draggedEventId.value = "";
      draggedEventType.value = "";
    }
  });

  const handleStartDrag = $(
    (eventId: string, eventType: string, startPos: { x: number; y: number }, element: HTMLElement) => {
      element.setAttribute("data-being-dragged", "true");

      const draggedEvent = events.value.find((e) => e.id === eventId);
      if (!draggedEvent) return;

      // ✅ NAJDI PROPOJENÝ EVENT - OBOUSMĚRNĚ
      let separatorId: string | undefined;
      let separatorElement: HTMLElement | undefined;
      let separatorEvent: OjpEventPositioned | undefined;

      if (eventType === "operace") {
        // ✅ OPERACE → hledej navazující separátor
        const separator = events.value.find((event) => {
          if (event.id === eventId) return false; // Skip sebe
          if (event.sal !== draggedEvent.sal) return false; // Musí být stejný sál
          if (event.dateFrom.toDateString() !== draggedEvent.dateFrom.toDateString()) return false; // Stejný den
          if (event.typ !== "uklid") return false; // Je to úklid?

          // Začíná těsně po operaci? (tolerance 5 min)
          const timeDiff = Math.abs(event.dateFrom.getTime() - draggedEvent.dateTo.getTime());
          return timeDiff < 5 * 60 * 1000; // 5 minut tolerance
        });

        if (separator) {
          separatorId = separator.id;
          separatorEvent = separator;
          separatorElement = document.querySelector(`[data-event-id="${separator.id}"]`) as HTMLElement;
        }
      } else if (eventType === "uklid") {
        // ✅ SEPARÁTOR → hledej předchozí operaci
        const operation = events.value.find((event) => {
          if (event.id === eventId) return false; // Skip sebe
          if (event.sal !== draggedEvent.sal) return false; // Musí být stejný sál
          if (event.dateFrom.toDateString() !== draggedEvent.dateFrom.toDateString()) return false; // Stejný den
          if (event.typ !== "operace") return false; // Je to operace?

          // Končí těsně před separátorem? (tolerance 5 min)
          const timeDiff = Math.abs(event.dateTo.getTime() - draggedEvent.dateFrom.getTime());
          return timeDiff < 5 * 60 * 1000; // 5 minut tolerance
        });

        if (operation) {
          separatorId = operation.id;
          separatorEvent = operation;
          separatorElement = document.querySelector(`[data-event-id="${operation.id}"]`) as HTMLElement;
        }
      }

      // ✅ NASTAV DRAG STYLING NA PROPOJENÝ EVENT
      separatorElement?.setAttribute("data-being-dragged", "true");

      dragState.value = {
        dragElement: element,
        elementOffset: {
          x: startPos.x - element.getBoundingClientRect().left,
          y: startPos.y - element.getBoundingClientRect().top,
        },
        eventId,
        eventType,
        originalEvent: draggedEvent, // ✅ Ulož snapshot pôvodného eventu
        originalSeparator: separatorEvent, // ✅ Ulož snapshot separátora
        separatorElement,
        separatorId,
        startPos,
      };
    },
  );

  const handleEventDrop = $(
    (eventId: string, separatorId: string | undefined, date: Date, sal: OjpSal, slotIndex: number) => {
      if (onEventDrop$) {
        const minutesFromStart = slotIndex * 5;
        const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
        const minutes = minutesFromStart % 60;

        const newTime = new Date(date);
        newTime.setHours(hours, minutes, 0, 0);

        onEventDrop$(eventId, separatorId, date, sal, newTime);
      }
    },
  );

  return {
    currentCollisionInfo,
    currentDraggedEventInfo,
    draggedEventId,
    draggedEventType,
    handleEventDrop,
    handleStartDrag,
  };
}
