import ProtectedRoute from "@/core/utils/ProtectRoute";
import SuspenseWrapper from "@/core/utils/SuspenseWrapper";
import ErrorBoundary from "@/core/utils/ErrorBoundary";
import { lazy } from "react";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardLayout = lazy(() => import("@core/layouts/Dashboard"));
export const dashboardRoutes = [
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <SuspenseWrapper>
                    <DashboardLayout />
                </SuspenseWrapper>
            </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <SuspenseWrapper>
                    <Dashboard />
                </SuspenseWrapper>,
            },
        ],
    },
];
