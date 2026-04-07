import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { FullScreenLoader } from '@/core/components/ui/LoadingFallback';
import { authClient } from '@/core/config/auth-client';

interface OrganizationProtectedRouteProps {
  children: ReactNode;
}

const OrganizationProtectedRoute = ({ children }: OrganizationProtectedRouteProps) => {
  const { data, error, isPending } = authClient.useSession();

  // Show loading state only on initial load (not during background refetches like org switch)
  if (isPending) {
    return <FullScreenLoader />;
  }

  // Redirect to login if not authenticated
  if (!data?.session.activeOrganizationId || error) {
    return <Navigate to="/organizations" replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default OrganizationProtectedRoute;
