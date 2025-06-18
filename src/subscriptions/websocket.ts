import type { Server, ServerWebSocket, WebSocketHandler } from "bun";
import type { RedisClientType } from "redis";

import { createClient as redisCreateClient } from "redis";

type RemoteMeta = { id: string };
const remoteMap: Map<string, ServerWebSocket<RemoteMeta>> = new Map();

let redisClient: RedisClientType | undefined = undefined;

export async function subscriptionWebsocketRoute(
  request: Request,
  server: Server,
): Promise<{ response: Response | undefined } | null> {
  const url = new URL(request.url);

  if (url.pathname === "/__ws__") {
    // upgrade the request to a WebSocket
    if (
      server.upgrade(request, {
        data: {
          id: Math.random().toString(20).slice(2, 14),
        },
      })
    ) {
      return { response: undefined };
    }

    return { response: new Response("Upgrade failed", { status: 500 }) };
  }

  return null;
}

export const subscriptionWebsocketConfig: WebSocketHandler<RemoteMeta> = {
  close(ws) {
    if (remoteMap.has(ws.data.id)) {
      remoteMap.delete(ws.data.id);
    }
    if (redisClient) {
      redisClient.close();
    }
  },
  message() {
    // Do not cover message reveiving
  },
  async open(ws) {
    if (!remoteMap.has(ws.data.id)) {
      remoteMap.set(ws.data.id, ws);
    }
    if (!redisClient) {
      redisClient = redisCreateClient({
        url: import.meta.env.IRIS_MESSAGES_URL,
      });
      await redisClient.connect();
    }

    await redisClient.subscribe(
      ["article"],
      (msg) => {
        ws.send(msg);
      },
      false,
    );
  },
};
