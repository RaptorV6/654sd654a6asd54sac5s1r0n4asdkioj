import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

import { component$, Slot } from "@builder.io/qwik";

import { MainLayoutProviders } from "~/contexts/main-layout-providers";

export const onGet: RequestHandler = async ({ cacheControl, url }) => {
  if (["/"].includes(url.pathname)) {
    // // Control caching for this request for best performance and to reduce hosting costs:
    // // https://qwik.builder.io/docs/caching/
    // cacheControl({
    //   // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    //   maxAge: 5,
    //   // Always serve a cached response by default, up to a week stale
    //   staleWhileRevalidate: 60 * 60 * 24 * 7,
    // });
    cacheControl({
      maxAge: 0,
      public: true,
    });
  }
};

export const head: DocumentHead = ({ head }) => ({
  title: head.title ? `${head.title} - Sirona` : "Sirona",
});

export default component$(() => {
  return (
    <MainLayoutProviders>
      <Slot />
    </MainLayoutProviders>
  );
});
