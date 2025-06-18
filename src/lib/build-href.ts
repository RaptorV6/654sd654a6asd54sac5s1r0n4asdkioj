import { joinToPathName } from "@akeso/utils";

export function buildHref(slug: string | URLSearchParams, ...nextSlugs: (string | URLSearchParams)[]): string {
  let qp = "";
  const setQp = (searchParams: string | URLSearchParams): void => {
    qp = `?${searchParams}`;
  };

  // If is only change of search params of current pathname
  if (typeof slug !== "string") {
    return `?${slug}`;
  }

  const isAbsolute = slug.startsWith("/");
  const slugs: string[] = [];

  for (const s of [slug, ...nextSlugs]) {
    if (!qp) {
      if (typeof s === "string") {
        if (s.includes("?")) {
          const [sl, _qp] = s.split("?");
          slugs.push(sl);
          setQp(_qp);
        } else {
          slugs.push(s);
        }
      } else {
        setQp(s);
      }
    }
  }

  return joinToPathName({ leading: isAbsolute }, ...slugs) + qp;
}
