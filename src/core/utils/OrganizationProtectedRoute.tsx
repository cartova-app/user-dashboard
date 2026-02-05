import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authClient } from "@/core/config/auth-client";

interface OrganizationProtectedRouteProps {
  children: ReactNode;
}

const OrganizationProtectedRoute = ({
  children,
}: OrganizationProtectedRouteProps) => {
  const { data, error, isPending, isRefetching } = authClient.useSession();

  // Show loading state while checking authentication
  if (isPending || isRefetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!data?.session.activeOrganizationId || error) {
    return <Navigate to="/organizations" replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default OrganizationProtectedRoute;
