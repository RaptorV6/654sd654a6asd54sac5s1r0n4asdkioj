import { routeLoader$ } from "@builder.io/qwik-city";

import { _mock_cdr_createIrisClient } from "../../_mock-cdr-client";

// eslint-disable-next-line qwik/loader-location
export const useLoadStations = routeLoader$(async ({ env }) => {
  const { stations } = await _mock_cdr_createIrisClient(env).query({
    stations: {
      code: true,
      id: true,
    },
  });

  return stations;
});

// eslint-disable-next-line qwik/loader-location
export const useLoadProgramTemplateItems = routeLoader$(async ({ env, error, params }) => {
  const { stationId } = params;
  const { station, treatmentProgramTemplateItems } = await _mock_cdr_createIrisClient(env).query({
    station: {
      __args: {
        id: stationId,
      },
      name: true,
    },
    treatmentProgramTemplateItems: {
      __args: {
        stationId,
      },
      competenceRoles: {
        code: true,
      },
      days: {
        ct: true,
        ne: true,
        pa: true,
        po: true,
        so: true,
        st: true,
        ut: true,
      },
      group: true,
      id: true,
      level: {
        name: true,
      },
      medicalProcedure: {
        name: true,
      },
      owner: true,
      room: true,
      roomCapacity: true,
      segment: {
        name: true,
      },
      sharedWithStations: {
        name: true,
      },
      shiftInProgramForEmployee: true,
      shiftInProgramForPatient: true,
      shiftNote: true,
      slotType: true,
      timeFrom: true,
      timeTo: true,
    },
  });

  if (station == null) {
    throw error(404, "Station not found.");
  }

  return { items: treatmentProgramTemplateItems, station };
});
