import axios, { AxiosResponse } from 'axios';
import { buildApiUrl, config } from '@/config/environment';
import { LoginCredentials, RegisterData, User } from './authService';

// API Response types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  type: 'single-choice' | 'multiple-choice' | 'text';
  required: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  recommended?: boolean;
}

// Real API signup request interface
interface SignupRequest {
  email: string;
  password: string;
  fullName: string;
  gender: string;
  hasContent: boolean;
  hasAcceptedTerms: boolean;
  roles: string[];
  assessments: Array<{
    question: string;
    answer: string;
  }>;
  subscriptionName: string;
}

// Create axios instance with default configuration
const apiClient = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const userApi = {
  // Authentication APIs
  auth: {
    /**
     * Sign in user with email and password
     * @param credentials - Email and password
     * @returns Promise<User | null>
     */
    signIn: async (credentials: LoginCredentials): Promise<User | null> => {
      try {
        // TODO: Uncomment when backend API is ready
        // const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = 
        //   await apiClient.post(buildApiUrl(config.ENDPOINTS.AUTH.SIGN_IN), credentials);
        
        // if (response.data.success && response.data.data) {
        //   const { user, token } = response.data.data;
        //   localStorage.setItem('authToken', token);
        //   localStorage.setItem('user', JSON.stringify(user));
        //   return user;
        // }
        // return null;

        // Mock implementation - remove when real API is ready
        console.log('Mock Sign In API called with:', credentials);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        // Return mock user data
        const user = {
          id: '1',
          email: credentials.email,
          name: 'John Doe',
          phone: '(555) 123-4567',
          city: 'New York',
          role: 'patient',
          isAuthenticated: true,
          contacts: []
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } catch (error) {
        console.error('Sign in API error:', error);
        throw new Error('Failed to sign in. Please check your credentials.');
      }
    },

    /**
     * Register new user with real API structure
     * @param userData - User registration data
     * @returns Promise<User>
     */
    signUp: async (userData: RegisterData): Promise<User> => {
      try {
        // Prepare the signup request with actual collected data
        const signupRequest: SignupRequest = {
          email: userData.email,
          password: userData.password,
          fullName: userData.name,
          gender: userData.gender || 'prefer-not-to-say',
          hasContent: true,
          hasAcceptedTerms: true,
          roles: userData.roles || ['caregiver'],
          assessments: userData.assessments || [],
          subscriptionName: userData.selectedPlan || 'Free'
        };

        console.log('=== API: Real API Signup Request ===');
        console.log('Request payload:', JSON.stringify(signupRequest, null, 2));
        console.log('API URL:', buildApiUrl(config.ENDPOINTS.AUTH.SIGN_UP));

        // TODO: Uncomment when you want to test with real API
        // const response: AxiosResponse<any> = 
        //   await apiClient.post(buildApiUrl(config.ENDPOINTS.AUTH.SIGN_UP), signupRequest);
        
        // console.log('=== API: Real API Signup Response ===');
        // console.log('Response:', JSON.stringify(response.data, null, 2));
        
        // // Transform API response to User format
        // const user: User = {
        //   id: response.data.id || response.data.userId || '1',
        //   email: signupRequest.email,
        //   name: signupRequest.fullName,
        //   phone: userData.phone || '',
        //   city: userData.city || '',
        //   role: 'patient',
        //   isAuthenticated: true,
        //   contacts: []
        // };
        
        // localStorage.setItem('user', JSON.stringify(user));
        // return user;

        // Mock implementation - remove when real API is ready
        console.log('=== API: Mock Sign Up called with actual data ===');
        console.log('Mock processing signup request...');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        
        // Return mock user data
        const user = {
          id: '2',
          email: userData.email,
          name: userData.name,
          phone: userData.phone || '',
          city: userData.city || '',
          role: 'patient',
          isAuthenticated: true,
          contacts: []
        };
        
        console.log('=== API: Mock user created ===', user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } catch (error) {
        console.error('=== API: Sign up error ===', error);
        throw new Error('Failed to create account. Please try again.');
      }
    },

    /**
     * Logout user
     * @returns Promise<void>
     */
    logout: async (): Promise<void> => {
      try {
        // TODO: Uncomment when backend API is ready
        // await apiClient.post(buildApiUrl(config.ENDPOINTS.AUTH.LOGOUT));
        
        // Mock implementation
        console.log('Mock Logout API called');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Logout API error:', error);
        // Always remove token on logout, even if API fails
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  },

  // Assessment APIs
  assessment: {
    /**
     * Get assessment questions
     * @returns Promise<AssessmentQuestion[]>
     */
    getQuestions: async (): Promise<AssessmentQuestion[]> => {
      try {
        // TODO: Uncomment when backend API is ready
        // const response: AxiosResponse<ApiResponse<AssessmentQuestion[]>> = 
        //   await apiClient.get(buildApiUrl(config.ENDPOINTS.ASSESSMENT.GET_QUESTIONS));
        
        // if (response.data.success && response.data.data) {
        //   return response.data.data;
        // }
        // return [];

        // Mock implementation - remove when real API is ready
        console.log('Mock Get Assessment Questions API called');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return [
          {
            id: 'caregiving_situation',
            question: "What's your primary caregiving situation?",
            options: [
              'Caring for aging parent(s)',
              'Supporting spouse/partner with health needs',
              'Managing care for child with special needs',
              'Other'
            ],
            type: 'single-choice',
            required: true
          },
          {
            id: 'daily_challenge',
            question: "What's your biggest daily challenge?",
            options: [
              'Coordinating between multiple care providers',
              'Managing medications and appointments',
              'Finding reliable care resources',
              'Balancing caregiving with work/personal life'
            ],
            type: 'single-choice',
            required: true
          }
        ];
      } catch (error) {
        console.error('Get assessment questions API error:', error);
        throw new Error('Failed to load assessment questions.');
      }
    },

    /**
     * Submit assessment answers
     * @param answers - Assessment answers
     * @returns Promise<void>
     */
    submitAssessment: async (answers: Record<string, any>): Promise<void> => {
      try {
        // TODO: Uncomment when backend API is ready
        // const response: AxiosResponse<ApiResponse> = 
        //   await apiClient.post(buildApiUrl(config.ENDPOINTS.ASSESSMENT.SUBMIT_ASSESSMENT), { answers });
        
        // if (!response.data.success) {
        //   throw new Error(response.data.error || 'Failed to submit assessment');
        // }

        // Mock implementation - remove when real API is ready
        console.log('Mock Submit Assessment API called with:', answers);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Submit assessment API error:', error);
        throw new Error('Failed to submit assessment. Please try again.');
      }
    }
  },

  // Subscription APIs
  subscriptions: {
    /**
     * Get available subscription plans
     * @returns Promise<SubscriptionPlan[]>
     */
    getPlans: async (): Promise<SubscriptionPlan[]> => {
      try {
        // TODO: Uncomment when backend API is ready
        // const response: AxiosResponse<ApiResponse<SubscriptionPlan[]>> = 
        //   await apiClient.get(buildApiUrl(config.ENDPOINTS.SUBSCRIPTIONS.GET_PLANS));
        
        // if (response.data.success && response.data.data) {
        //   return response.data.data;
        // }
        // return [];

        // Mock implementation - remove when real API is ready
        console.log('Mock Get Subscription Plans API called');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        return [
          {
            id: 'free',
            name: 'Free Plan',
            description: 'Basic health tracking',
            price: 0,
            currency: 'USD',
            features: [
              'Basic health monitoring',
              'Mobile app access',
              'Community support'
            ]
          },
          {
            id: 'premium',
            name: 'Premium Plan',
            description: 'Advanced health management',
            price: 19.99,
            currency: 'USD',
            features: [
              'Advanced analytics',
              'Priority support',
              'Caregiver coordination',
              'Health insights'
            ],
            recommended: true
          }
        ];
      } catch (error) {
        console.error('Get subscription plans API error:', error);
        throw new Error('Failed to load subscription plans.');
      }
    },

    /**
     * Create a new subscription
     * @param planId - Selected plan ID
     * @param paymentDetails - Payment information
     * @returns Promise<void>
     */
    createSubscription: async (planId: string, paymentDetails: any): Promise<void> => {
      try {
        // TODO: Uncomment when backend API is ready
        // const response: AxiosResponse<ApiResponse> = 
        //   await apiClient.post(buildApiUrl(config.ENDPOINTS.SUBSCRIPTIONS.CREATE_SUBSCRIPTION), {
        //     planId,
        //     paymentDetails
        //   });
        
        // if (!response.data.success) {
        //   throw new Error(response.data.error || 'Failed to create subscription');
        // }

        // Mock implementation - remove when real API is ready
        console.log('Mock Create Subscription API called with:', { planId, paymentDetails });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Create subscription API error:', error);
        throw new Error('Failed to create subscription. Please try again.');
      }
    },

    /**
     * Get user's current subscription
     * @returns Promise<SubscriptionPlan | null>
     */
    getUserSubscription: async (): Promise<SubscriptionPlan | null> => {
      try {
        // TODO: Uncomment when backend API is ready
        // const response: AxiosResponse<ApiResponse<SubscriptionPlan>> = 
        //   await apiClient.get(buildApiUrl(config.ENDPOINTS.SUBSCRIPTIONS.GET_USER_SUBSCRIPTION));
        
        // if (response.data.success && response.data.data) {
        //   return response.data.data;
        // }
        // return null;

        // Mock implementation - remove when real API is ready
        console.log('Mock Get User Subscription API called');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return null; // No active subscription
      } catch (error) {
        console.error('Get user subscription API error:', error);
        return null;
      }
    }
  },

  // User Profile APIs
  user: {
    /**
     * Get user profile
     * @returns Promise<User | null>
     */
    getProfile: async (): Promise<User | null> => {
      try {
        // TODO: Uncomment when backend API is ready
        // const response: AxiosResponse<ApiResponse<User>> = 
        //   await apiClient.get(buildApiUrl(config.ENDPOINTS.USER.GET_PROFILE));
        
        // if (response.data.success && response.data.data) {
        //   return response.data.data;
        // }
        // return null;

        // Mock implementation - remove when real API is ready
        console.log('Mock Get User Profile API called');
        await new Promise(resolve => setTimeout(resolve, 400));
        
        return null;
      } catch (error) {
        console.error('Get user profile API error:', error);
        return null;
      }
    },

    /**
     * Update user profile
     * @param userData - Updated user data
     * @returns Promise<User>
     */
    updateProfile: async (userData: Partial<User>): Promise<User> => {
      try {
        // TODO: Uncomment when backend API is ready
        // const response: AxiosResponse<ApiResponse<User>> = 
        //   await apiClient.put(buildApiUrl(config.ENDPOINTS.USER.UPDATE_PROFILE), userData);
        
        // if (response.data.success && response.data.data) {
        //   return response.data.data;
        // }
        // throw new Error('Failed to update profile');

        // Mock implementation - remove when real API is ready
        console.log('Mock Update User Profile API called with:', userData);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return userData as User;
      } catch (error) {
        console.error('Update user profile API error:', error);
        throw new Error('Failed to update profile. Please try again.');
      }
    }
  }
};

// Export types for use in other files
export type { ApiResponse, AssessmentQuestion, SubscriptionPlan, SignupRequest };
