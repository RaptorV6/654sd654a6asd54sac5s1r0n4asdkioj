import { routeAction$, valibot$ } from "@builder.io/qwik-city";
import * as v from "valibot";

import { buildHref } from "~/lib/build-href";

export const SelectStationSchema = v.object({
  stationId: v.pipe(v.string(), v.nonEmpty()),
});
export type SelectStationValues = v.InferInput<typeof SelectStationSchema>;

// eslint-disable-next-line qwik/loader-location
export const useSelectStationAction = routeAction$((values, { redirect }) => {
  throw redirect(303, buildHref("/cdr/planning2/settings/schedule-template/", values.stationId));
}, valibot$(SelectStationSchema));
