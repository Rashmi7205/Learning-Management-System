# Redux State Management Documentation

## Overview

This application uses Redux Toolkit for centralized state management with async thunks for handling API calls efficiently.

## Project Structure

```
lib/
├── store/
│   ├── store.ts          # Redux store configuration
│   ├── hooks.ts          # Custom Redux hooks
│   └── slices/
│       └── authSlice.ts  # Auth state and async thunks
├── services/
│   └── api.ts           # Centralized API service methods
├── api-client.ts        # Axios instance with interceptors
└── utils.ts

app/
├── providers/
│   └── redux-provider.tsx  # Redux Provider component
└── layout.tsx            # Updated to include ReduxProvider
```

## Configuration Files

### .env.local

Contains all backend API URLs and configuration:

- `NEXT_PUBLIC_API_BASE_URL` - Base URL for all API calls
- `NEXT_PUBLIC_AUTH_API_URL` - Auth endpoints
- Specific API endpoint URLs for different operations
- JWT token storage key

## Features

### 1. Centralized API Client

**File:** `lib/api-client.ts`

Features:

- Axios instance with default configuration
- Request interceptor: Automatically adds JWT token to headers
- Response interceptor: Handles 401 errors and token refresh
- Error handling and automatic logout on token expiration

```typescript
import apiClient from "@/lib/api-client";

// Usage
const response = await apiClient.get("/endpoint");
```

### 2. Auth Slice with Async Thunks

**File:** `lib/store/slices/authSlice.ts`

Includes thunks for:

- `loginUser` - User login with credentials
- `registerUser` - New user registration
- `logoutUser` - User logout
- `fetchUserProfile` - Get current user profile
- `updateUserProfile` - Update user information
- `forgotPassword` - Send password reset email
- `resetPassword` - Reset password with token
- `verifyEmail` - Verify user email

#### Thunk Example:

```typescript
import { useAppDispatch } from "@/lib/store/hooks";
import { loginUser } from "@/lib/store/slices/authSlice";

const dispatch = useAppDispatch();

const handleLogin = async (email, password) => {
  const result = await dispatch(loginUser({ email, password }));
  if (loginUser.fulfilled.match(result)) {
    // Login successful
  }
};
```

### 3. Custom Hooks

**File:** `lib/store/hooks.ts`

Available hooks:

```typescript
// Main auth hook with all auth state
const { user, token, isAuthenticated, isLoading, error, successMessage } =
  useAuth();

// Individual hooks
const user = useAuthUser();
const token = useAuthToken();
const isAuthenticated = useAuthIsAuthenticated();
const isLoading = useAuthIsLoading();
const error = useAuthError();
const successMessage = useAuthSuccess();
```

### 4. API Service Layer

**File:** `lib/services/api.ts`

Organized service objects:

- `authService` - Login, register, profile, password reset
- `coursesService` - Course CRUD operations
- `usersService` - User management
- `progressService` - Learning progress tracking

#### Service Example:

```typescript
import { authService } from "@/lib/services/api";

const user = await authService.login("email@example.com", "password");
const profile = await authService.getProfile();
```

### 5. Redux Provider

**File:** `app/providers/redux-provider.tsx`

Wraps the application with Redux store provider.

## Usage Examples

### Login with Redux

```typescript
"use client";

import { useAppDispatch } from "@/lib/store/hooks";
import { loginUser } from "@/lib/store/slices/authSlice";
import { useAuth } from "@/lib/store/hooks";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      // Redirect to dashboard
      window.location.href = "/dashboard";
    }
  };

  return (
    // JSX
  );
}
```

### Register with Redux

```typescript
import { registerUser } from "@/lib/store/slices/authSlice";

const handleRegister = async (formData) => {
  const result = await dispatch(
    registerUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    })
  );
};
```

### Using API Service Directly

```typescript
import { authService } from "@/lib/services/api";

// If you need to call API directly without Redux
const profile = await authService.getProfile();
```

### Error and Success Handling

```typescript
import { useAuth } from "@/lib/store/hooks";
import { clearError, clearSuccess } from "@/lib/store/slices/authSlice";

export default function Component() {
  const dispatch = useAppDispatch();
  const { error, successMessage } = useAuth();

  useEffect(() => {
    if (error) {
      console.error(error);
      // Show error toast/alert
      setTimeout(() => dispatch(clearError()), 3000);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      console.log(successMessage);
      // Show success toast/alert
      setTimeout(() => dispatch(clearSuccess()), 3000);
    }
  }, [successMessage]);
}
```

## State Structure

```typescript
{
  auth: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: "learner" | "instructor" | "admin";
      avatar?: string;
      createdAt: string;
    } | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
  }
}
```

## Token Management

### Automatic Token Refresh

The API client automatically:

1. Adds JWT token to request headers
2. Detects 401 responses (unauthorized)
3. Uses refresh token to get new access token
4. Retries the original request with new token
5. Clears tokens and redirects to login on failure

### Manual Token Handling

```typescript
// Get token from Redux
const token = useAuthToken();

// Set token (usually done automatically by thunks)
dispatch(setToken(newToken));

// Check if authenticated
const isAuth = useAuthIsAuthenticated();
```

## Best Practices

1. **Always use Redux hooks** for auth state instead of storing in component state
2. **Use API service layer** for all API calls to maintain consistency
3. **Handle loading states** using `isLoading` from Redux
4. **Display errors properly** using error messages from Redux
5. **Clear errors/success messages** after displaying them
6. **Store sensitive data** (tokens) in localStorage and manage via Redux
7. **Use environment variables** for all API URLs

## Adding New API Endpoints

1. Add endpoint URL to `.env.local`
2. Create service method in `lib/services/api.ts`
3. Create async thunk in `lib/store/slices/` (if needed)
4. Create custom hook in `lib/store/hooks.ts` (if needed)
5. Use in components via Redux hooks

## Troubleshooting

### Token not being sent

- Check if token is stored in localStorage
- Verify JWT token key matches `NEXT_PUBLIC_JWT_TOKEN_KEY`

### 401 Errors persist

- Clear localStorage manually
- Check backend refresh token endpoint
- Verify refresh token is valid

### Redux DevTools

Redux Toolkit automatically enables Redux DevTools in development. Use the extension to:

- View state changes
- Dispatch actions
- Time-travel debug
