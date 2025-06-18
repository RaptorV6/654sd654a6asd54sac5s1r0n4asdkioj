import { buildHref } from "./build-href";

export type HrefCallback = (slug: string | URLSearchParams, ...nextSlugs: (string | URLSearchParams)[]) => string;

export function useHref(): HrefCallback {
  const callback: HrefCallback = (slug, ...nextSlugs) => {
    return buildHref(slug, ...nextSlugs);
  };

  return callback;
}
