import ProtectedRoute from "@/core/utils/ProtectRoute";
import SuspenseWrapper from "@/core/utils/SuspenseWrapper";
import ErrorBoundary from "@/core/utils/ErrorBoundary";

export const dashboardRoutes = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <SuspenseWrapper>
                    {/* Dashboard layout will go here */}
                </SuspenseWrapper>
            </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <SuspenseWrapper>{/* Dashboard home */}</SuspenseWrapper>,
            },
        ],
    },
];
