
import { mockUsers } from './mockData';

export interface User {
  id?: string;
  email: string;
  name: string;
  phone?: string;
  city?: string;
  isAuthenticated: boolean;
}

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

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Mock login service
  async login(credentials: LoginCredentials): Promise<User> {
    await delay(500); // Simulate network delay
    
    // Find user in mock data
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In real implementation, validate password
    // For now, just return user with authenticated status
    return {
      ...user,
      isAuthenticated: true
    };
  },

  // Mock register service
  async register(userData: RegisterData): Promise<User> {
    await delay(700); // Simulate network delay
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      city: userData.city,
      isAuthenticated: true
    };
    
    // In real implementation, save to database
    mockUsers.push({ ...newUser, isAuthenticated: false });
    
    return newUser;
  },

  // Mock logout service
  async logout(): Promise<void> {
    await delay(200);
    // In real implementation, invalidate token on server
    return;
  },

  // Mock get current user service
  async getCurrentUser(): Promise<User | null> {
    await delay(300);
    // In real implementation, validate token and return user
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
};
