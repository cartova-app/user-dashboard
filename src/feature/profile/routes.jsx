import { lazy } from "react";
import ProtectedRoute from "@/core/utils/ProtectRoute";
import SuspenseWrapper from "@/core/utils/SuspenseWrapper";

// Add profile pages when they're created
// const ProfilePage = lazy(() => import("./pages/ProfilePage"));

export const profileRoutes = [
    // Example: Uncomment and modify when you have profile pages
    // {
    //     path: "/profile",
    //     element: (
    //         <ProtectedRoute>
    //             <SuspenseWrapper>
    //                 <ProfilePage />
    //             </SuspenseWrapper>
    //         </ProtectedRoute>
    //     ),
    // },
];
