
import { mockUsers } from './mockData';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  role: string;
  isAuthenticated: boolean;
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    role: string;
    avatar?: string;
    lastMessage?: string;
    timestamp?: Date;
    unreadCount?: number;
    status?: 'online' | 'offline' | 'away';
  }>;
}

// Generate a unique GUID
const generateGUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Mock login - simplified for demo
  async login(credentials: LoginCredentials): Promise<User | null> {
    await delay(1000);
    
    // Find user by email in mock data
    const foundUser = mockUsers.find(user => user.email === credentials.email);
    
    if (foundUser) {
      const authenticatedUser: User = {
        ...foundUser,
        isAuthenticated: true
      };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      return authenticatedUser;
    }
    
    // For demo purposes, create a default user if not found
    const defaultUser: User = {
      id: generateGUID(),
      email: credentials.email,
      name: 'John Doe',
      phone: '(555) 123-4567',
      city: 'New York',
      role: 'patient',
      isAuthenticated: true,
      contacts: []
    };
    
    localStorage.setItem('user', JSON.stringify(defaultUser));
    return defaultUser;
  },

  // Mock registration
  async register(userData: RegisterData): Promise<User> {
    await delay(1500);
    
    const newUser: User = {
      id: generateGUID(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      city: userData.city || '',
      role: 'patient',
      isAuthenticated: true,
      contacts: []
    };
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  },

  // Get current user from localStorage
  async getCurrentUser(): Promise<User | null> {
    await delay(200);
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        return null;
      }
    }
    
    return null;
  },

  // Mock logout
  async logout(): Promise<void> {
    await delay(500);
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.isAuthenticated === true;
      } catch {
        return false;
      }
    }
    return false;
  }
};
