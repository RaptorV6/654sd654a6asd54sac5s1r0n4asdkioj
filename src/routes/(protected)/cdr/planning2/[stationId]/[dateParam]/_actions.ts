import { routeAction$, valibot$ } from "@builder.io/qwik-city";
import * as v from "valibot";

import { _mock_cdr_createIrisClient } from "../../_mock-cdr-client";

const GenerateTreatmentProgramSchema = v.object({
  dayOfMonth: v.pipe(
    v.string(),
    v.transform((x) => new Date(x)),
  ),
  stationId: v.string(),
});

export type GenerateTreatmentProgramValues = v.InferInput<typeof GenerateTreatmentProgramSchema>;

// eslint-disable-next-line qwik/loader-location
export const useGenerateTreatmentProgramAction = routeAction$(async (values, { env }) => {
  try {
    await _mock_cdr_createIrisClient(env).mutation({
      generateTreatmentProgramFromTemplate: {
        __args: {
          input: values,
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Generating treatment program events from template failed with error", error);
    return { failed: true };
  }
}, valibot$(GenerateTreatmentProgramSchema));
