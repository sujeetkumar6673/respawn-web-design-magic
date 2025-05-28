
import axios from "axios";
import { ChatMessage } from "../types/chat";

const BASE_URL = "http://localhost:5295/api";

export const getChatHistory = async (
  senderId: string,
  receiverId: string
): Promise<ChatMessage[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/chat/history`, {
      params: { senderId, receiverId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
};
