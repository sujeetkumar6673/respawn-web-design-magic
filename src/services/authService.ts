import { mockUsers } from './mockData';
import { userApi } from './api';

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

export const authService = {
  // Login using userApi
  async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      // Use userApi for authentication
      const user = await userApi.auth.signIn(credentials);
      return user;
    } catch (error) {
      console.error('Login error in authService:', error);
      throw error;
    }
  },

  // Registration using userApi
  async register(userData: RegisterData): Promise<User> {
    try {
      // Use userApi for registration
      const user = await userApi.auth.signUp(userData);
      return user;
    } catch (error) {
      console.error('Registration error in authService:', error);
      throw error;
    }
  },

  // Get current user from localStorage (keeping this as is for now)
  async getCurrentUser(): Promise<User | null> {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
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

  // Logout using userApi
  async logout(): Promise<void> {
    try {
      // Use userApi for logout
      await userApi.auth.logout();
    } catch (error) {
      console.error('Logout error in authService:', error);
      // Continue with local cleanup even if API fails
    }
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
