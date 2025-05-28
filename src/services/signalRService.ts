
import * as signalR from "@microsoft/signalr";
import { ChatMessage } from "../types/chat";

let connection: signalR.HubConnection;

export const startConnection = (
  onMessageReceived: (msg: ChatMessage) => void
) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5295/chathub") // Updated to your endpoint
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveMessage", (msg: ChatMessage) => {
    onMessageReceived(msg);
  });

  connection
    .start()
    .then(() => console.log("SignalR Connected"))
    .catch(err => console.error("SignalR Connection Error:", err));

  return connection;
};

export const sendMessage = (msg: ChatMessage) => {
  if (connection?.state === signalR.HubConnectionState.Connected) {
    connection.invoke("SendMessage", msg.senderId, msg.senderType, msg.receiverId, msg.receiverType, msg.content);
  }
};

export const stopConnection = () => {
  if (connection) {
    connection.stop();
  }
};
