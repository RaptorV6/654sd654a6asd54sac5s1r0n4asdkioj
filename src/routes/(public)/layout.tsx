import type { RequestHandler } from "@builder.io/qwik-city";

import { component$, Slot } from "@builder.io/qwik";

import { LayoutFooter } from "~/components/layout-footer";

import { serverGetSession } from "../plugin@auth";

export const onRequest: RequestHandler = (event) => {
  const session = serverGetSession(event, true);
  if (session && new Date(session.expires) > new Date()) {
    if (event.url.pathname === "/auth/login/" || !event.url.pathname.startsWith("/auth")) {
      throw event.redirect(302, "/");
    }
  }
};

export default component$(() => {
  return (
    <div class="flex min-h-full flex-col bg-blue-900">
      <main class="flex-1">
        <div class="relative isolate overflow-hidden">
          <svg
            aria-hidden="true"
            class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          >
            <defs>
              <pattern
                height={200}
                id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                patternUnits="userSpaceOnUse"
                width={200}
                x="50%"
                y={-1}
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg class="overflow-visible fill-gray-800/20" x="50%" y={-1}>
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                stroke-width={0}
              />
            </svg>
            <rect fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" height="100%" stroke-width={0} width="100%" />
          </svg>

          <div
            aria-hidden="true"
            class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          >
            <div
              class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
          <Slot />
        </div>
      </main>

      {/* Footer */}
      <LayoutFooter />
    </div>
  );
});
