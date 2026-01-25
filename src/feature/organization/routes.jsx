import { lazy } from "react";
import ProtectedRoute from "@/core/utils/ProtectRoute";
import SuspenseWrapper from "@/core/utils/SuspenseWrapper";
import OrganizationLayout from "./layouts/OrganizationLayout";

const OrganizationPage = lazy(() => import("./pages/List"));

export const organizationRoutes = [
    {
        path: "/organizations",
        element: (
            <ProtectedRoute>
                <SuspenseWrapper>
                    <OrganizationLayout />
                </SuspenseWrapper>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <SuspenseWrapper>
                    <OrganizationPage />
                </SuspenseWrapper>,
            },
        ],
    },
];
