import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { FullScreenLoader } from '@/core/components/ui/LoadingFallback';
import { authClient } from '@/core/config/auth-client';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { data: session, isPending } = authClient.useSession();

  // Show loading state while checking authentication
  if (isPending) {
    return <FullScreenLoader />;
  }

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
