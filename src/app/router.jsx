import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "@/feature/auth/routes";
import { dashboardRoutes } from "@/feature/dashboard/routes";
import { profileRoutes } from "@/feature/profile/routes";

// Combine all feature routes
const router = createBrowserRouter([
    ...dashboardRoutes,
    ...authRoutes,
    ...profileRoutes,
]);

export default router;
