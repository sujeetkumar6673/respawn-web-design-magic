
import { mockUsers } from './mockData';

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
  }>;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Mock login - simplified for demo
  async login(email: string, password: string): Promise<User | null> {
    await delay(1000);
    
    // Find user by email in mock data
    const foundUser = mockUsers.find(user => user.email === email);
    
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
      id: '00000000-0000-0000-0000-000000000001', // Use proper GUID format
      email,
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
  async register(userData: Omit<User, 'id' | 'isAuthenticated'>): Promise<User> {
    await delay(1500);
    
    const newUser: User = {
      ...userData,
      id: '00000000-0000-0000-0000-000000000001', // Use proper GUID format
      isAuthenticated: true,
      contacts: []
    };
    
    // Add to mock users array
    mockUsers.push(newUser);
    
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
        // Ensure the user ID is in the correct format
        if (user.id && !user.id.includes('-')) {
          user.id = '00000000-0000-0000-0000-000000000001';
        }
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
