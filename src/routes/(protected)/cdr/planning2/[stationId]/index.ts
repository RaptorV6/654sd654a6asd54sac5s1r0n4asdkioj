import type { RequestHandler } from "@builder.io/qwik-city";

import { buildHref } from "~/lib/build-href";

import { getDateParam } from "../get-date-param";

export const onGet: RequestHandler = ({ params, redirect }) => {
  const d = new Date();
  redirect(303, buildHref("/cdr/planning2/", params.stationId, getDateParam(d)));
};
