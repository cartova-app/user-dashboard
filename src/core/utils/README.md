# Route Protection Guide

This project uses Better Auth for authentication and route protection. Here's how to use the route guards:

## Components

### ProtectedRoute

Protects routes that require authentication. Redirects to `/login` if user is not authenticated.

**Usage:**

```jsx
import ProtectedRoute from "@/core/utils/ProtectRoute";

{
    path: "/dashboard",
    element: (
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    ),
}
```

### GuestRoute

Protects routes that should only be accessible to unauthenticated users (login, signup). Redirects to `/` if user is already authenticated.

**Usage:**

```jsx
import GuestRoute from "@/core/utils/GuestRoute";

{
    path: "/login",
    element: (
        <GuestRoute>
            <Login />
        </GuestRoute>
    ),
}
```

## Features

### Loading States

Both components show a loading spinner while checking authentication status, preventing flash of wrong content.

### Redirect After Login

The `ProtectedRoute` saves the location the user was trying to access and redirects them there after login:

```jsx
// In your login component
const location = useLocation();
const navigate = useNavigate();

const handleLogin = async (credentials) => {
  await authClient.signIn.email(credentials);
  const from = location.state?.from?.pathname || "/";
  navigate(from, { replace: true });
};
```

## How It Works

1. **ProtectedRoute**:
   - Checks session using `authClient.useSession()`
   - Shows loading spinner while checking
   - Redirects to `/login` if no session
   - Saves attempted URL for post-login redirect

2. **GuestRoute**:
   - Checks session using `authClient.useSession()`
   - Shows loading spinner while checking
   - Redirects to dashboard if session exists
   - Prevents authenticated users from seeing login/signup

## Better Auth Integration

The route guards use Better Auth's `useSession` hook which:

- Automatically checks authentication status
- Provides loading state (`isPending`)
- Returns user session data
- Syncs across tabs/windows

## Example Feature Routes

Check the feature route files for examples:

- `src/feature/auth/routes.jsx` - Uses GuestRoute
- `src/feature/dashboard/routes.jsx` - Uses ProtectedRoute
- `src/feature/profile/routes.jsx` - Uses ProtectedRoute
