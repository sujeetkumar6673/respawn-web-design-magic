
export interface ChatMessage {
  senderId: string;
  senderType: string;
  receiverId: string;
  receiverType: string;
  content: string;
  sentAt: string;
}
