
// Environment configuration for different deployment stages
export const config = {
  // Current environment - change this based on your deployment
  ENVIRONMENT: 'development', // 'development' | 'qa' | 'production'
  
  // API Base URLs for different environments
  API_BASE_URLS: {
    development: 'http://localhost:3000/api', // Local development server
    qa: 'https://api-qa.yourdomain.com/api',   // QA/Staging environment
    production: 'https://api.yourdomain.com/api' // Production environment
  },
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      SIGN_IN: '/auth/signin',
      SIGN_UP: '/auth/signup',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh'
    },
    ASSESSMENT: {
      GET_QUESTIONS: '/assessment/questions',
      SUBMIT_ASSESSMENT: '/assessment/submit'
    },
    SUBSCRIPTIONS: {
      GET_PLANS: '/subscriptions/plans',
      CREATE_SUBSCRIPTION: '/subscriptions/create',
      GET_USER_SUBSCRIPTION: '/subscriptions/user'
    },
    USER: {
      GET_PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile'
    }
  }
};

// Get the current API base URL based on environment
export const getApiBaseUrl = (): string => {
  return config.API_BASE_URLS[config.ENVIRONMENT as keyof typeof config.API_BASE_URLS];
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${getApiBaseUrl()}${endpoint}`;
};
