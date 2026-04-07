import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { FullScreenLoader } from '@/core/components/ui/LoadingFallback';
import { authClient } from '@/core/config/auth-client';

interface GuestRouteProps {
  children: ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const location = useLocation();
  const { data: session, isPending } = authClient.useSession();

  // Show loading state while checking authentication
  if (isPending) {
    return <FullScreenLoader />;
  }

  // Redirect to dashboard if already authenticated
  if (session) {
    // Redirect to the page they were trying to access, or dashboard
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  // User is not authenticated, render the auth content
  return children;
};

export default GuestRoute;
