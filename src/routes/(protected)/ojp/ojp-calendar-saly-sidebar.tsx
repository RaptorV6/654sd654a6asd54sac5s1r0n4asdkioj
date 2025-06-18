import { component$ } from "@builder.io/qwik";

import type { OjpSalInfo } from "./_mock-events";

type OjpCalendarSalySidebarProps = {
  dayName: string;
  rowIndex: number;
  sal: OjpSalInfo;
  showDayName: boolean;
};

export const OjpCalendarSalySidebar = component$<OjpCalendarSalySidebarProps>(
  ({ dayName, rowIndex, sal, showDayName }) => {
    return (
      <div
        class="border-r-2 border-gray-300 bg-gray-50 p-2"
        style={`grid-column: 1; grid-row: ${rowIndex + 1}; background-color: ${sal.bgColor};`}
      >
        {showDayName && <div class="mb-1 text-xs font-bold uppercase text-gray-700">{dayName}</div>}
        <div class="text-sm font-semibold" style={`color: ${sal.color};`}>
          {sal.displayName}
        </div>
        <div class="text-xs text-gray-600">{sal.vykony} výkonů</div>
        <div class="text-xs text-gray-600">{sal.uhrada.toLocaleString()} Kč</div>
      </div>
    );
  },
);
