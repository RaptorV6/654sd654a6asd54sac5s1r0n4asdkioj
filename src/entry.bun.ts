/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Bun HTTP server when building for production.
 *
 * Learn more about the Bun integration here:
 * - https://qwik.dev/docs/deployments/bun/
 * - https://bun.sh/docs/api/http
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/bun";
import qwikCityPlan from "@qwik-city-plan";
import { manifest } from "@qwik-client-manifest";

import render from "./entry.ssr";
import { subscriptionWebsocketConfig, subscriptionWebsocketRoute } from "./subscriptions/websocket";

// Create the Qwik City Bun middleware
const { notFound, router, staticFile } = createQwikCity({
  manifest,
  qwikCityPlan,
  render,
});

// Allow for dynamic port
const port = Number(Bun.env.PORT ?? 3000);

// eslint-disable-next-line no-console
console.log(`Server started: http://localhost:${port}/`);

Bun.serve({
  async fetch(request: Request, server) {
    const staticResponse = await staticFile(request);
    if (staticResponse) {
      return staticResponse;
    }

    // Run Websocket
    const websocketUpgradedResult = await subscriptionWebsocketRoute(request, server);
    if (websocketUpgradedResult) {
      return websocketUpgradedResult.response;
    }

    // Server-side render this request with Qwik City
    const qwikCityResponse = await router(request);
    if (qwikCityResponse) {
      return qwikCityResponse;
    }

    // Path not found
    return notFound(request);
  },
  port,
  websocket: subscriptionWebsocketConfig,
});
