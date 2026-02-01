import { createBrowserRouter, Navigate } from "react-router-dom";
import { authRoutes } from "@/feature/auth/routes";
import { dashboardRoutes } from "@/feature/dashboard/routes";
import { profileRoutes } from "@/feature/profile/routes";
import { organizationRoutes } from "@/feature/organization/routes";
import { storeRoutes } from "@/feature/store/routes";
import ProtectedRoute from "@/core/utils/ProtectRoute";

// Combine all feature routes
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Navigate to="/organizations" replace />
            </ProtectedRoute>
        ),
    },
    ...dashboardRoutes,
    ...authRoutes,
    ...profileRoutes,
    ...organizationRoutes,
    ...storeRoutes,
]);

export default router;
