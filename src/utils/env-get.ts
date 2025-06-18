import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

export interface AppEnvVars {
  AUTH_ADAPTER_AUTHENTIK_CLIENT_ID: string;
  AUTH_ADAPTER_AUTHENTIK_CLIENT_SECRET: string;
  AUTH_ADAPTER_AUTHENTIK_URL_AUTHORIZATION: string;
  AUTH_ADAPTER_AUTHENTIK_URL_ENDSESSION: string;
  AUTH_ADAPTER_AUTHENTIK_URL_ISSUER: string;
  AUTH_ADAPTER_AUTHENTIK_URL_WELLKNOWN: string;
  AUTH_ADAPTER_LDAP_URL: string;
  AUTH_SECRET: string;
  IRIS_URL_GRAPHQL: string;
  IRIS_URL_PDF: string;
  ORIGIN: string | undefined;
  PORT: string | undefined;
}

type EnvVarName = keyof AppEnvVars;

export function envGet(env: EnvGetter, name: EnvVarName, type: "number", defaultValue?: number): number;
export function envGet(env: EnvGetter, name: EnvVarName, type: "boolean", defaultValue?: boolean): boolean;
export function envGet(env: EnvGetter, name: EnvVarName, type?: "string", defaultValue?: string): string;
export function envGet(env: EnvGetter, name: EnvVarName, type?: "boolean" | "number" | "string", defaultValue?: any) {
  const value = env.get(name as string);

  if (!value) {
    if (defaultValue != null) return defaultValue;
    throw new Error(`Environment variable '${name}' is undefined.`);
  }

  if (type === "number") return Number(value);
  if (type === "boolean") return ["1", "on", "true"].includes(value || "false");
  return value;
}
