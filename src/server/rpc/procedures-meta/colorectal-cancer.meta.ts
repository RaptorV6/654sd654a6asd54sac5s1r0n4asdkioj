import type { ProcedureMeta } from "../procedure-meta.types";

import { buildProcedureMeta } from "./utils";

export const procedureColorectalCancerMeta: ProcedureMeta = buildProcedureMeta({
  department: "surgery",
  group: "preop",
  kind: "colorectal-cancer",
  name: "Předoperační postup kolorektálního karcinomu",
  steps: [
    { label: "Vstupní návštěva indikační ambulance" },
    { label: "Mezidobí I" },
    { label: "Kontrolní návštěva indikační ambulance" },
    { label: "Mezidobí II" },
    { label: "Anesteziologické vyšetření" },
    { label: "Příjem do nemocnice" },
  ],
  stepsCount: 6,
});
