import type { Scalars } from "~/iris";
import type { DefineMockClient } from "~/lib/mock-client-helpers";

import { dateMonthDateRangeCalendar } from "~/lib/date-month-date-range-calendar";
import { createMockGqlClient } from "~/lib/mock-client-helpers";

import * as md from "./_mock-cdr-data";

type MockClient = DefineMockClient<
  // Query
  {
    station: [
      {
        /** Station ID */
        id: Scalars["ID"];
      },
      md.Station | null,
    ];
    stations: [undefined, md.Station[]];
    treatmentProgramEvents: [
      {
        dateOfMonth: Date;
        stationId: Scalars["ID"];
      },
      md.CdrCalendarEvent[],
    ];
    treatmentProgramTemplateItem: [
      {
        /** Template item ID */
        id: Scalars["ID"];
      },
      md.ProgramTemplateItem | null,
    ];
    treatmentProgramTemplateItems: [
      {
        /** Station ID */
        stationId?: Scalars["ID"];
      },
      md.ProgramTemplateItem[],
    ];
  },
  // Mutation
  {
    generateTreatmentProgramFromTemplate: [
      {
        input: {
          dayOfMonth: Date;
          stationId: Scalars["ID"];
        };
      },
      boolean,
    ];
  }
>;

export const _mock_cdr_createIrisClient = createMockGqlClient<MockClient>({
  mutation: {
    generateTreatmentProgramFromTemplate(args) {
      const events: md.CdrCalendarEvent[] = md.programTemplateToEvents(args.input.stationId, args.input.dayOfMonth);
      md.treatmentProgramEvents.push(...events);
      return true;
    },
  },
  query: {
    station(args) {
      return md.stations.find((s) => s.code === args.id) ?? null;
    },
    stations() {
      return md.stations;
    },
    treatmentProgramEvents(args) {
      const [dateFrom, dateTo] = dateMonthDateRangeCalendar(args.dateOfMonth, { midnightEdges: true });
      const res = md.treatmentProgramEvents.filter(
        (e) => e.station.id === args.stationId && e.dateFrom >= dateFrom && e.dateTo < dateTo,
      );
      return res;
    },
    treatmentProgramTemplateItem(args) {
      return md.programTemplate.find((i) => i.id === args.id) ?? null;
    },
    treatmentProgramTemplateItems(args) {
      let res = md.programTemplate;
      if (args.stationId) {
        res = md.programTemplate.filter((i) => i.station.id === args.stationId);
      }
      return res;
    },
  },
});
