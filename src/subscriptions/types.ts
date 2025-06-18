export type ServerSubscriptionMessageType = "";

export type SubscriptionMessageType = "*" | ServerSubscriptionMessageType;

export type SubscriptionMessage = {
  messageId: string;
  messageType: SubscriptionMessageType;
  objectId: string;
};
