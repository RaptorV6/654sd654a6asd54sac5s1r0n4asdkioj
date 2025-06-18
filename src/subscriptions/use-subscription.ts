import { useContext, useId, useVisibleTask$ } from "@builder.io/qwik";

import type { SubscriptionHandler } from "./provider";
import type { SubscriptionMessageType } from "./types";

import { SubscriptionsContextId } from "./provider";

export function useSubscription(messageType: SubscriptionMessageType, handler: SubscriptionHandler) {
  const subscriberId = useId();
  const subscriptionsContext = useContext(SubscriptionsContextId);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    subscriptionsContext.register(subscriberId, messageType, handler);
    cleanup(() => {
      subscriptionsContext.unregister(subscriberId);
    });
  });
}
