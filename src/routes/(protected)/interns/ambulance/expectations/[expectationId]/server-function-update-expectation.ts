import type { RequestEventBase } from "@builder.io/qwik-city";

import type { UpdateInternsAmbExpectationInput } from "~/iris";

import { createIrisClient } from "~/iris";

import { ExpectationScalarFragment } from "./fetch-expectation-detail";

export async function serverFunctionUpdateExpectation(this: RequestEventBase, input: UpdateInternsAmbExpectationInput) {
  const iris = createIrisClient(this.env);

  try {
    const r = await iris.mutation({
      updateInternsAmbExpectation: {
        __args: {
          input,
        },
        internsAmbExpectation: ExpectationScalarFragment,
      },
    });

    return {
      data: r.updateInternsAmbExpectation.internsAmbExpectation,
      success: true,
    };
  } catch (error) {
    console.error("serverUpdateExpectationDetail: expectation update failed with error", error);
    return { fail: true };
  }
}
