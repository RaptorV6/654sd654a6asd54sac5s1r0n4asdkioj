import type { QRL } from "@builder.io/qwik";

import { $, component$, createContextId, Slot, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";

import type { SubscriptionMessage, SubscriptionMessageType } from "./types";

export type SubscriptionHandler = QRL<(message: SubscriptionMessage) => void>;

type SubscriptionsContext = {
  register: QRL<
    (this: SubscriptionsContext, id: string, messageType: SubscriptionMessageType, next: SubscriptionHandler) => void
  >;
  subscribers: Record<
    string,
    {
      messageType: SubscriptionMessageType;
      next: SubscriptionHandler;
    }
  >;
  unregister: QRL<(this: SubscriptionsContext, id: string) => void>;
};

export const SubscriptionsContextId = createContextId<SubscriptionsContext>("SubscriptionsContext");

export const SubscriptionsProvider = component$(() => {
  const subscriptionsContext = useStore<SubscriptionsContext>({
    register: $(function (this, id, messageType, next) {
      if (!(id in this.subscribers)) {
        this.subscribers[id] = { messageType, next };
      }
    }),
    subscribers: {},
    unregister: $(function (this, id) {
      if (!(id in this.subscribers)) {
        delete this.subscribers[id];
      }
    }),
  });

  useContextProvider(SubscriptionsContextId, subscriptionsContext);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    ({ cleanup }) => {
      const socket = new WebSocket("/__ws__");

      const handler = (event: MessageEvent<string>) => {
        if (event.data) {
          const eventMessage: SubscriptionMessage = JSON.parse(event.data);
          for (const subscriber of Object.values(subscriptionsContext.subscribers)) {
            if (subscriber.messageType === "*" || eventMessage.messageType === subscriber.messageType) {
              subscriber.next(eventMessage);
            }
          }
        }
      };
      socket.addEventListener("message", handler);
      cleanup(() => {
        socket.removeEventListener("message", handler);
        socket.close();
      });
    },
    { strategy: "document-ready" },
  );

  return <Slot />;
});
