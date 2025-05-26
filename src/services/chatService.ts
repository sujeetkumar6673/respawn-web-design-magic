
import { mockChatMessages } from './mockData';

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isUser: boolean;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const chatService = {
  // Mock get chat messages
  async getChatMessages(): Promise<ChatMessage[]> {
    await delay(400);
    return [...mockChatMessages];
  },

  // Mock send message
  async sendMessage(message: string): Promise<ChatMessage> {
    await delay(800);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'User',
      message,
      timestamp: new Date().toISOString(),
      isUser: true
    };
    
    mockChatMessages.push(userMessage);
    
    // Simulate AI response
    setTimeout(async () => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'AI Assistant',
        message: 'Thank you for your message. I understand your concern and I\'m here to help.',
        timestamp: new Date().toISOString(),
        isUser: false
      };
      
      mockChatMessages.push(aiResponse);
    }, 1000);
    
    return userMessage;
  }
};
