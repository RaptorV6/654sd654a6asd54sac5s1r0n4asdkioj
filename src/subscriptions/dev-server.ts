import { subscriptionWebsocketConfig, subscriptionWebsocketRoute } from "./websocket";

const server = Bun.serve({
  async fetch(request, server) {
    const websocketUpgradedResult = await subscriptionWebsocketRoute(request, server);
    if (websocketUpgradedResult) {
      return websocketUpgradedResult.response;
    }

    return new Response("Invalid path", { status: 404 });
  },
  port: 3030,
  websocket: subscriptionWebsocketConfig,
});

console.info(`Websocket listening on ${server.hostname}:${server.port}`);
