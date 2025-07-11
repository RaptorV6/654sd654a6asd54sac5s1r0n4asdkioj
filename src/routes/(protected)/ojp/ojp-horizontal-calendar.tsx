import type { QRL, Signal } from "@builder.io/qwik";

import { useToaster } from "@akeso/ui-components";
import { $, component$, sync$, useComputed$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";

import type { OjpEventPositioned, OjpSal, OjpSalInfo } from "./_mock-events";

import { OjpEventComponent } from "./ojp-event-component";

const calendarStyles = `
  .ojp-time-slot {
    will-change: transform;
    backface-visibility: hidden;
    transform: translateZ(0);
  }
  
  .ojp-drop-valid {
    background: linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.25)) !important;
    border: 2px dashed #22c55e !important;
    animation: pulse-valid 0.8s ease-in-out infinite alternate;
    transform: scale(1.02);
  }
  
  .ojp-drop-invalid {
    background: linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.25)) !important;
    border: 2px dashed #ef4444 !important;
    animation: pulse-invalid 0.8s ease-in-out infinite alternate;
    transform: scale(1.02);
  }
  
  @keyframes pulse-valid {
    from { 
      background-color: rgba(34, 197, 94, 0.1);
      box-shadow: 0 0 0 rgba(34, 197, 94, 0.4);
    }
    to { 
      background-color: rgba(34, 197, 94, 0.25);
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
    }
  }
  
  @keyframes pulse-invalid {
    from { 
      background-color: rgba(239, 68, 68, 0.1);
      box-shadow: 0 0 0 rgba(239, 68, 68, 0.4);
    }
    to { 
      background-color: rgba(239, 68, 68, 0.25);
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
    }
  }
  
  .ojp-calendar-grid {
    contain: layout style paint;
  }
  
  .ojp-sal-header {
    contain: layout style;
  }
  
  .ojp-drag-ghost {
    position: absolute;
    top: -1000px;
    left: -1000px;
    opacity: 0.8;
    transform: rotate(3deg);
    pointer-events: none;
    z-index: 9999;
    padding: 8px 12px;
    background: rgba(59, 130, 246, 0.9);
    color: white;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

type OjpHorizontalCalendarProps = {
  dates: { date: Date }[];
  events: OjpEventPositioned[];
  newEventTrigger: Signal<{ dateTime: Date; forceOtherSlots?: boolean; sal: OjpSal } | null>;
  onEventClick$?: QRL<(event: any) => void>;
  onEventDrop$?: QRL<(eventId: string, newDate: Date, newSal: OjpSal, newTime: Date) => void>;
  saly: OjpSalInfo[];
  timeHourFrom: number;
  times: { time: Date }[];
};

type StructureItem =
  | { date: Date; dayIndex: number; dayName: string; type: "day" }
  | { date: Date; dayIndex: number; sal: OjpSalInfo; type: "sal" };

export const OjpHorizontalCalendar = component$<OjpHorizontalCalendarProps>(
  ({ dates, events, newEventTrigger, onEventClick$, onEventDrop$, saly, timeHourFrom, times }) => {
    useStyles$(calendarStyles);
    const { toastError$ } = useToaster();
    const dayNames = ["PONDĚLÍ", "ÚTERÝ", "STŘEDA", "ČTVRTEK", "PÁTEK"];

    const slotWidth = 24;
    const totalSlots = times.length * 12;
    const salsWidth = 140;
    const rowHeight = 40;

    const scrollContainerRef = useSignal<HTMLDivElement>();
    const scrollLeft = useSignal(0);
    const viewportWidth = useSignal(800);
    const draggedEventId = useSignal<string>("");
    const dropPreview = useSignal<{ date: Date; sal: OjpSal; slotIndex: number } | null>(null);
    const draggedEventType = useSignal<string>("");
    const dragGhostRef = useSignal<HTMLDivElement>();

    const validationResults = useSignal<Map<string, boolean>>(new Map());

    useTask$(({ track }) => {
      track(() => scrollContainerRef.value);
      if (scrollContainerRef.value) {
        viewportWidth.value = scrollContainerRef.value.clientWidth;
      }
    });

    const handleScroll = $((e: Event) => {
      const target = e.target as HTMLDivElement;
      scrollLeft.value = target.scrollLeft;
    });

    const totalGridWidth = salsWidth + totalSlots * slotWidth;
    const hoursGridTemplate = `${salsWidth}px repeat(${times.length}, ${12 * slotWidth}px)`;
    const minutesGridTemplate = `${salsWidth}px repeat(${totalSlots}, ${slotWidth}px)`;

    const structure: StructureItem[] = [];

    dates.forEach((date, dayIndex) => {
      structure.push({
        date: date.date,
        dayIndex,
        dayName: dayNames[dayIndex] || dayNames[0],
        type: "day",
      });

      saly.forEach((sal) => {
        structure.push({
          date: date.date,
          dayIndex,
          sal,
          type: "sal",
        });
      });
    });

    const validSlots = useComputed$(() => {
      const valid = new Set<string>();

      // Pro každý den/sál spočítej kde může operace začít
      structure.forEach((item) => {
        if (item.type === "sal") {
          const rowEvents = events
            .filter(
              (event) => event.dateFrom.toDateString() === item.date.toDateString() && event.sal === item.sal.name,
            )
            .sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());

          // Projdi všechny sloty a označ validní pro operace
          for (let slot = 0; slot < totalSlots; slot++) {
            const slotMinutes = slot * 5;
            const slotHours = timeHourFrom + Math.floor(slotMinutes / 60);
            const slotMins = slotMinutes % 60;
            const slotTime = new Date(item.date);
            slotTime.setHours(slotHours, slotMins, 0, 0);

            // Najdi událost která končí právě v tomto čase
            const endingEvent = rowEvents.find(
              (event) => Math.abs(event.dateTo.getTime() - slotTime.getTime()) < 30000, // 30s tolerance
            );

            // Validní slot = za úklidem/pauzou NEBO na začátku dne bez operace
            const isValid =
              (!endingEvent && slot === 0) || // začátek dne
              (endingEvent && (endingEvent.typ === "uklid" || endingEvent.typ === "pauza"));

            if (isValid) {
              valid.add(`${item.date.toDateString()}-${item.sal.name}-${slot}`);
            }
          }
        }
      });

      return valid;
    });

    const getVykonyCount = (date: Date, salName: OjpSal): number => {
      return events.filter(
        (event) =>
          event.dateFrom.toDateString() === date.toDateString() && event.sal === salName && event.typ === "operace",
      ).length;
    };

    const handleSlotDoubleClick = $((date: Date, sal: OjpSal, slotIndex: number) => {
      const minutesFromStart = slotIndex * 5;
      const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
      const minutes = minutesFromStart % 60;

      const newDateTime = new Date(date);
      newDateTime.setHours(hours, minutes, 0, 0);

      const existingOperations = events.filter(
        (event) =>
          event.dateFrom.toDateString() === date.toDateString() && event.sal === sal && event.typ === "operace",
      );

      const shouldForceOtherSlots = existingOperations.length > 0;

      newEventTrigger.value = {
        dateTime: newDateTime,
        forceOtherSlots: shouldForceOtherSlots,
        sal,
      };
    });

    const handleEventDrop = $((eventId: string, date: Date, sal: OjpSal, slotIndex: number) => {
      if (onEventDrop$) {
        const minutesFromStart = slotIndex * 5;
        const hours = timeHourFrom + Math.floor(minutesFromStart / 60);
        const minutes = minutesFromStart % 60;

        const newTime = new Date(date);
        newTime.setHours(hours, minutes, 0, 0);

        onEventDrop$(eventId, date, sal, newTime);
      }
      draggedEventId.value = "";
      dropPreview.value = null;
      draggedEventType.value = "";
    });

    return (
      <div class="flex h-full flex-col">
        {/* 🔧 CUSTOM DRAG GHOST */}
        <div class="ojp-drag-ghost" id="drag-ghost" ref={dragGhostRef}>
          📅 Přesouvám událost...
        </div>

        <div class="flex-1 overflow-auto" onScroll$={handleScroll} ref={scrollContainerRef}>
          <div class="ojp-calendar-grid" style={`min-width: ${totalGridWidth}px; width: 100%;`}>
            <div class="sticky top-0 z-30 border-b bg-white shadow-sm">
              <div
                class="grid"
                style={`grid-template-columns: ${hoursGridTemplate}; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
              >
                <div class="sticky left-0 z-40 flex items-center justify-center border-r-2 border-gray-400 bg-gray-50 text-sm font-bold">
                  Den / Sál
                </div>
                {times.map((time) => (
                  <div
                    class="flex items-center justify-center border-r border-gray-300 bg-gray-50 text-lg font-semibold"
                    key={`hour-${time.time.getHours()}`}
                  >
                    {String(time.time.getHours()).padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              <div
                class="grid text-xs"
                style={`grid-template-columns: ${minutesGridTemplate}; height: ${rowHeight / 2}px; min-width: ${totalGridWidth}px;`}
              >
                <div class="sticky left-0 z-40 border-r-2 border-gray-400 bg-gray-50"></div>
                {times.flatMap((time) =>
                  Array.from({ length: 12 }, (_, i) => (
                    <div
                      class="flex items-center justify-center border-r border-gray-200 bg-gray-50 text-gray-600"
                      key={`minute-${time.time.getHours()}-${i * 5}`}
                    >
                      {String(i * 5).padStart(2, "0")}
                    </div>
                  )),
                )}
              </div>
            </div>

            {/* Kalendářové řádky */}
            <div style={`min-width: ${totalGridWidth}px;`}>
              {structure.map((item: StructureItem) => {
                if (item.type === "day") {
                  return (
                    <div
                      class="grid border-b border-gray-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      key={`day-${item.dayIndex}`}
                      style={`grid-template-columns: ${salsWidth}px 1fr; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
                    >
                      <div class="sticky left-0  flex items-center justify-center border-r-2 border-blue-400 bg-gradient-to-r from-blue-600 to-blue-700 font-bold">
                        {item.dayName} {item.date.toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit" })}
                      </div>
                      <div class="border-r border-blue-400"></div>
                    </div>
                  );
                } else {
                  const rowEvents = events.filter(
                    (event) =>
                      event.dateFrom.toDateString() === item.date.toDateString() && event.sal === item.sal.name,
                  );

                  const vykonyCount = getVykonyCount(item.date, item.sal.name);

                  return (
                    <div
                      class="relative grid border-b border-gray-200"
                      key={`sal-${item.dayIndex}-${item.sal.name}`}
                      style={`grid-template-columns: ${minutesGridTemplate}; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
                    >
                      <div
                        class="ojp-sal-header sticky left-0 flex items-center justify-center border-r-2 border-gray-300 text-xs"
                        style={`background-color: ${item.sal.bgColor}; color: ${item.sal.color};`}
                      >
                        <div class="text-center">
                          <div class="font-semibold">{item.sal.displayName}</div>
                          <div class="text-xs opacity-75">{vykonyCount} výkonů</div>
                        </div>
                      </div>

                      {/* 🔧 SMART TIME SLOTS s pre-computed validací */}
                      {Array.from({ length: totalSlots }, (_, slotIndex) => {
                        const validationKey = `${item.date.toDateString()}-${item.sal.name}-${slotIndex}`;
                        const isValid = validationResults.value.get(validationKey) ?? true;

                        const isDropPreview =
                          dropPreview.value &&
                          dropPreview.value.date.toDateString() === item.date.toDateString() &&
                          dropPreview.value.sal === item.sal.name &&
                          dropPreview.value.slotIndex === slotIndex;

                        return (
                          <div
                            class={`
                              ojp-time-slot relative cursor-pointer border-r border-gray-200 transition-all duration-200
                              hover:bg-blue-100 hover:bg-opacity-50
                              ${isDropPreview ? (isValid ? "ojp-drop-valid" : "ojp-drop-invalid") : ""}
                            `}
                            key={`slot-${slotIndex}`}
                            onDblClick$={() => {
                              handleSlotDoubleClick(item.date, item.sal.name, slotIndex);
                            }}
                            onDragLeave$={sync$((e: DragEvent) => {
                              const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                              const x = e.clientX;
                              const y = e.clientY;

                              if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                                dropPreview.value = null;
                              }
                            })}
                            onDragOver$={sync$(() => {
                              if (draggedEventType.value === "operace") {
                                // Magnet: zkus 3 sloty kolem aktuální pozice
                                const snapTargets = [slotIndex - 1, slotIndex, slotIndex + 1];
                                const validSnap = snapTargets.find(
                                  (slot) =>
                                    slot >= 0 &&
                                    slot < totalSlots &&
                                    validSlots.value.has(`${item.date.toDateString()}-${item.sal.name}-${slot}`),
                                );

                                if (validSnap !== undefined) {
                                  dropPreview.value = {
                                    date: item.date,
                                    sal: item.sal.name,
                                    slotIndex: validSnap,
                                  };
                                  return;
                                }
                              }
                              if (draggedEventType.value) {
                                dropPreview.value = {
                                  date: item.date,
                                  sal: item.sal.name,
                                  slotIndex,
                                };
                              }
                            })}
                            // Opravený onDrop handler
                            onDrop$={sync$((e: DragEvent) => {
                              const data = e.dataTransfer!.getData("application/json");
                              if (data) {
                                try {
                                  const parsed = JSON.parse(data);

                                  if (parsed.type === "ojp-event") {
                                    // Najdi dragovanou událost
                                    const draggedEvent = events.find((evt) => evt.id === parsed.eventId);

                                    if (!draggedEvent) {
                                      return;
                                    }

                                    // Spočítej nový čas
                                    const targetMinutes = slotIndex * 5;
                                    const targetHours = timeHourFrom + Math.floor(targetMinutes / 60);
                                    const targetMins = targetMinutes % 60;
                                    const newStartTime = new Date(item.date);
                                    newStartTime.setHours(targetHours, targetMins, 0, 0);
                                    const newEndTime = new Date(
                                      newStartTime.getTime() + draggedEvent.duration * 60 * 1000,
                                    );

                                    // VALIDACE PŘÍMO ZDE
                                    let isValid = true;
                                    let reason = "";

                                    if (draggedEvent.typ === "operace") {
                                      // Najdi všechny události v tomto řádku (kromě dragované)
                                      const rowEvents = events.filter(
                                        (event) =>
                                          event.dateFrom.toDateString() === item.date.toDateString() &&
                                          event.sal === item.sal.name &&
                                          event.id !== parsed.eventId,
                                      );

                                      // Najdi všechny operace v řádku
                                      const operationsInRow = rowEvents.filter((e) => e.typ === "operace");

                                      // Kontrola překrývání
                                      const overlapping = rowEvents.find((event) => {
                                        return newStartTime < event.dateTo && newEndTime > event.dateFrom;
                                      });

                                      if (overlapping) {
                                        isValid = false;
                                        reason = "Událost se překrývá s jinou";
                                      }

                                      // Kontrola operací za sebou - zjednodušená logika
                                      if (isValid && operationsInRow.length > 0) {
                                        // Seřaď všechny operace včetně nové podle času
                                        const allOperations = [
                                          ...operationsInRow,
                                          {
                                            dateFrom: newStartTime,
                                            dateTo: newEndTime,
                                            id: "new",
                                            typ: "operace",
                                          },
                                        ].sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());

                                        // Zkontroluj že mezi každými dvěma operacemi je úklid/pauza
                                        for (let i = 0; i < allOperations.length - 1; i++) {
                                          const currentOp = allOperations[i];
                                          const nextOp = allOperations[i + 1];

                                          // Najdi úklid/pauzu mezi těmito operacemi
                                          const cleaningBetween = rowEvents.find(
                                            (event) =>
                                              (event.typ === "uklid" || event.typ === "pauza") &&
                                              event.dateFrom >= currentOp.dateTo &&
                                              event.dateTo <= nextOp.dateFrom,
                                          );

                                          if (!cleaningBetween) {
                                            isValid = false;
                                            reason = "Mezi operacemi musí být úklid nebo pauza";
                                            break;
                                          }
                                        }
                                      }
                                    } else if (draggedEvent.typ === "uklid" || draggedEvent.typ === "pauza") {
                                      // NOVÁ VALIDACE: kontrola zdrojového řádku po odebrání úklidu
                                      const sourceRowEvents = events.filter(
                                        (event) =>
                                          event.dateFrom.toDateString() === draggedEvent.dateFrom.toDateString() &&
                                          event.sal === draggedEvent.sal &&
                                          event.id !== parsed.eventId,
                                      );

                                      // Najdi všechny události v cílovém řádku (kontrola překrývání)
                                      const targetRowEvents = events.filter(
                                        (event) =>
                                          event.dateFrom.toDateString() === item.date.toDateString() &&
                                          event.sal === item.sal.name &&
                                          event.id !== parsed.eventId,
                                      );

                                      // Kontrola překrývání v cílovém řádku
                                      const overlapping = targetRowEvents.find((event) => {
                                        return newStartTime < event.dateTo && newEndTime > event.dateFrom;
                                      });

                                      if (overlapping) {
                                        isValid = false;
                                        reason = "Událost se překrývá s jinou";
                                      }

                                      // Kontrola zdrojového řádku - vzniknou operace za sebou?
                                      if (isValid) {
                                        const operations = sourceRowEvents
                                          .filter((e) => e.typ === "operace")
                                          .sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());

                                        for (let i = 0; i < operations.length - 1; i++) {
                                          const currentOp = operations[i];
                                          const nextOp = operations[i + 1];

                                          // Najdi úklid/pauzu mezi těmito operacemi (kromě dragované)
                                          const cleaningBetween = sourceRowEvents.find(
                                            (event) =>
                                              (event.typ === "uklid" || event.typ === "pauza") &&
                                              event.dateFrom >= currentOp.dateTo &&
                                              event.dateTo <= nextOp.dateFrom,
                                          );

                                          if (!cleaningBetween) {
                                            isValid = false;
                                            reason = "Nelze přesunout úklid - vznikly by operace za sebou";
                                            break;
                                          }
                                        }
                                      }
                                    }

                                    if (isValid) {
                                      handleEventDrop(parsed.eventId, item.date, item.sal.name, slotIndex);
                                    } else {
                                      toastError$(reason, { duration: 3000 });
                                    }
                                  }
                                } catch {
                                  toastError$("Chyba při přesouvání události", { duration: 3000 });
                                }
                              }

                              dropPreview.value = null;
                            })}
                            preventdefault:dragover
                            preventdefault:drop
                            title="Poklepejte pro přidání události nebo přetáhněte událost"
                          >
                            {isDropPreview && (
                              <div class="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
                                <div
                                  class={`rounded border px-2 py-1 text-xs font-bold shadow-lg ${
                                    isValid
                                      ? "border-green-200 bg-green-50 text-green-800"
                                      : "border-red-200 bg-red-50 text-red-800"
                                  }`}
                                >
                                  {isValid ? "✓ Přesunout zde" : "✗ Operace musí mít mezeru"}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Události */}
                      {rowEvents.map((event) => (
                        <OjpEventComponent
                          event={event}
                          intervalMinutes={5}
                          intervalWidth={slotWidth}
                          isDragging={draggedEventId.value === event.id}
                          key={event.id}
                          onEventClick$={onEventClick$}
                          scrollLeft={scrollLeft.value}
                          timeHourFrom={timeHourFrom}
                          viewportWidth={viewportWidth.value}
                        />
                      ))}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
