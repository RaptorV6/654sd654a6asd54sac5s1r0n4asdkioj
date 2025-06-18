import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import { envGet } from "~/utils/env-get";

import type { Client, FieldsSelection, Query, QueryGenqlSelection } from "./client";

import { createClient } from "./client";
import { linkTypeMap } from "./client/runtime";
import types from "./client/types";
import { decodeResponse, encodeRequest } from "./result-codec";

export type IrisClient = Client;
export type IrisClientOrEnv = EnvGetter | IrisClient;

const typeMap = linkTypeMap(types as any);

export const createIrisClient = (envOrClient: IrisClientOrEnv): IrisClient => {
  if (isIrisClient(envOrClient)) return envOrClient;

  const url = envGet(envOrClient, "IRIS_URL_GRAPHQL");
  if (!url) {
    throw new Error("Environment variable 'IRIS_URL_GRAPHQL' is undefined.");
  }

  const c = createClient({
    headers: {},
    url,
  });

  const query: (typeof c)["query"] = async (req) => {
    const encodedRequest = encodeRequest(typeMap.Query!, req);
    const response = await c.query(encodedRequest);
    const decodedResponse = decodeResponse(typeMap.Query!, response);
    return decodedResponse;
  };

  const mutation: (typeof c)["mutation"] = async (req) => {
    const encodedRequest = encodeRequest(typeMap.Mutation!, req);
    const response = await c.mutation(encodedRequest);
    const decodedResponse = decodeResponse(typeMap.Mutation!, response);
    return decodedResponse;
  };

  return { mutation, query };
};

export * from "./client";
export * from "./scalar-types";

export function isIrisClient(v: unknown): v is IrisClient {
  return (
    v != null &&
    typeof v === "object" &&
    "query" in v &&
    "mutation" in v &&
    typeof v.query === "function" &&
    typeof v.mutation === "function"
  );
}

export type IrisQuerySelection<K extends keyof QueryGenqlSelection, R extends QueryGenqlSelection[K]> = FieldsSelection<
  Query,
  Record<K, R>
>;
