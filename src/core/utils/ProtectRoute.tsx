import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authClient } from '@/core/config/auth-client';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { data: session, isPending } = authClient.useSession();

  // Show loading state while checking authentication
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
