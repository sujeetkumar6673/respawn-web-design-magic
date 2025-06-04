
# API Integration Guide

This guide explains how to integrate your backend APIs with the frontend application.

## Configuration

### Environment Setup
1. Edit `src/config/environment.ts`
2. Update the `ENVIRONMENT` variable to match your current deployment stage
3. Update the API base URLs for each environment:
   - `development`: Your local backend server URL
   - `qa`: Your QA/staging server URL
   - `production`: Your production server URL

### Example Configuration
```typescript
export const config = {
  ENVIRONMENT: 'production', // Change this
  API_BASE_URLS: {
    development: 'http://localhost:8000/api',
    qa: 'https://api-staging.yourcompany.com/api',
    production: 'https://api.yourcompany.com/api'
  }
  // ... rest of config
};
```

## Enabling Real APIs

### Step 1: Update URLs
Update the API base URLs in `src/config/environment.ts` with your actual backend URLs.

### Step 2: Uncomment API Calls
In `src/services/api.ts`, for each API method:

1. **Remove or comment out** the mock implementation code
2. **Uncomment** the real API call code
3. **Test** each endpoint

### Example: Enabling Sign In API
```typescript
// Before (Mock)
signIn: async (credentials: LoginCredentials): Promise<User | null> => {
  // Mock implementation - remove when real API is ready
  console.log('Mock Sign In API called with:', credentials);
  return mockUser;
}

// After (Real API)
signIn: async (credentials: LoginCredentials): Promise<User | null> => {
  try {
    const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = 
      await apiClient.post(buildApiUrl(config.ENDPOINTS.AUTH.SIGN_IN), credentials);
    
    if (response.data.success && response.data.data) {
      const { user, token } = response.data.data;
      localStorage.setItem('authToken', token);
      return user;
    }
    return null;
  } catch (error) {
    console.error('Sign in API error:', error);
    throw new Error('Failed to sign in. Please check your credentials.');
  }
}
```

## API Endpoints Required

Your backend should implement these endpoints:

### Authentication
- `POST /auth/signin` - User login
- `POST /auth/signup` - User registration  
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token

### Assessment
- `GET /assessment/questions` - Get assessment questions
- `POST /assessment/submit` - Submit assessment answers

### Subscriptions
- `GET /subscriptions/plans` - Get available plans
- `POST /subscriptions/create` - Create new subscription
- `GET /subscriptions/user` - Get user's current subscription

### User Profile
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

## Expected Response Format

All APIs should return responses in this format:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

### Success Response Example
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token_here"
  },
  "message": "Login successful"
}
```

### Error Response Example
```json
{
  "success": false,
  "error": "Invalid credentials",
  "message": "Please check your email and password"
}
```

## Testing

1. **Mock Mode**: All APIs currently return mock data for testing
2. **Development**: Point to your local backend server
3. **QA**: Point to your staging environment
4. **Production**: Point to your production environment

## Notes

- All API calls include automatic token management
- Error handling is built into each API method
- Console logs help with debugging during development
- The axios interceptors handle authentication headers automatically
