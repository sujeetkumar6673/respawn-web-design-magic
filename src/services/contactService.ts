
import { Contact } from '@/components/chat/ChatContactList';
import { mockChatContacts, mockCurrentUsers } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface CurrentUser {
  id: string;
  name: string;
  avatar?: string;
}

export const contactService = {
  // Get contacts for a specific user
  async getContactsForUser(userId: string): Promise<Contact[]> {
    await delay(300);
    return mockChatContacts[userId] || [];
  },

  // Get current user data
  async getCurrentUser(userId: string): Promise<CurrentUser | null> {
    await delay(200);
    return mockCurrentUsers[userId] || null;
  },

  // Get all available users (for switching between different user contexts)
  async getAvailableUsers(): Promise<CurrentUser[]> {
    await delay(200);
    return Object.values(mockCurrentUsers);
  }
};
