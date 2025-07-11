import { component$ } from "@builder.io/qwik";

type OjpCalendarGridHeaderProps = {
  rowHeight: number;
  salsWidth: number;
  slotWidth: number;
  times: { time: Date }[];
  totalGridWidth: number;
  totalSlots: number;
};

export const OjpCalendarGridHeader = component$<OjpCalendarGridHeaderProps>(
  ({ rowHeight, salsWidth, slotWidth, times, totalGridWidth, totalSlots }) => {
    const hoursGridTemplate = `${salsWidth}px repeat(${times.length}, ${12 * slotWidth}px)`;
    const minutesGridTemplate = `${salsWidth}px repeat(${totalSlots}, ${slotWidth}px)`;

    return (
      <div class="sticky top-0 z-30 border-b bg-white shadow-sm">
        {/* Hodiny */}
        <div
          class="grid"
          style={`grid-template-columns: ${hoursGridTemplate}; height: ${rowHeight}px; min-width: ${totalGridWidth}px;`}
        >
          <div class="sticky left-0 z-40 flex items-center justify-center border-r-2 border-gray-400 bg-gray-100 text-sm font-bold">
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

        {/* Minuty */}
        <div
          class="grid text-xs"
          style={`grid-template-columns: ${minutesGridTemplate}; height: ${rowHeight / 2}px; min-width: ${totalGridWidth}px;`}
        >
          <div class="sticky left-0 z-40 border-r-2 border-gray-400 bg-gray-100"></div>
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
    );
  },
);
