
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "@core/utils/ProtectRoute";
import ErrorBoundary from "@core/utils/ErrorBoundary";
import SuspenseWrapper from "@/core/utils/SuspenseWrapper";



// Lazy loaded components
const Login = lazy(() => import("@feature/auth/pages/Login"));
const SignUp = lazy(() => import("@feature/auth/pages/SignUp"));
// Wrapper component with Suspense and ErrorBoundary

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <SuspenseWrapper>
                </SuspenseWrapper>
            </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary></ErrorBoundary>,
        children: [
            {
                index: true,
                element: <SuspenseWrapper></SuspenseWrapper>,
            },
        ]
    },

    {
        path: "/Sign-up",
        element: <SuspenseWrapper><SignUp /></SuspenseWrapper>,
    },

]);

export default router;
