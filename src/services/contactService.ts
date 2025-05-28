
import { Contact } from '@/components/chat/ChatContactList';
import { mockUsers, mockCurrentUsers } from './mockData';

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
    
    // Find user in mockUsers to get their contacts
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      console.warn(`User not found: ${userId}`);
      return [];
    }

    // Convert user contacts to Contact format
    const contacts: Contact[] = user.contacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      avatar: contact.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop`,
      lastMessage: contact.lastMessage || 'No messages yet',
      timestamp: contact.timestamp || new Date(),
      unreadCount: contact.unreadCount || 0,
      status: contact.status || 'offline'
    }));

    return contacts;
  },

  // Get current user data
  async getCurrentUser(userId: string): Promise<CurrentUser | null> {
    await delay(200);
    
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      console.warn(`User not found: ${userId}`);
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      avatar: mockCurrentUsers[userId]?.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop`
    };
  },

  // Get all available users (for switching between different user contexts)
  async getAvailableUsers(): Promise<CurrentUser[]> {
    await delay(200);
    return mockUsers.map(user => ({
      id: user.id,
      name: user.name,
      avatar: mockCurrentUsers[user.id]?.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop`
    }));
  }
};
