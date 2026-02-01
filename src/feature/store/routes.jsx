import { lazy } from "react";
import ProtectedRoute from "@/core/utils/ProtectRoute";
import SuspenseWrapper from "@/core/utils/SuspenseWrapper";
import StoreLayout from "@/core/layouts/StoreLayout";

const DashboardPage = lazy(() => import("@feature/dashboard/pages/Dashboard"));
const ProductsPage = lazy(() => import("./pages/Products"));
const OrdersPage = lazy(() => import("./pages/Orders"));
const CustomersPage = lazy(() => import("./pages/Customers"));
const AnalyticsPage = lazy(() => import("./pages/Analytics"));
const AppearancePage = lazy(() => import("./pages/Appearance"));
const DeveloperToolsPage = lazy(() => import("./pages/DeveloperTools"));
const SettingsPage = lazy(() => import("./pages/Settings"));

export const storeRoutes = [
    {
        path: "/organizations/:id/stores/:storeId",
        element: (
            <ProtectedRoute>
                <SuspenseWrapper>
                    <StoreLayout />
                </SuspenseWrapper>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <SuspenseWrapper>
                        <DashboardPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <SuspenseWrapper>
                        <DashboardPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "products",
                element: (
                    <SuspenseWrapper>
                        <ProductsPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "orders",
                element: (
                    <SuspenseWrapper>
                        <OrdersPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "customers",
                element: (
                    <SuspenseWrapper>
                        <CustomersPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "analytics",
                element: (
                    <SuspenseWrapper>
                        <AnalyticsPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "appearance",
                element: (
                    <SuspenseWrapper>
                        <AppearancePage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "developer-tools",
                element: (
                    <SuspenseWrapper>
                        <DeveloperToolsPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "settings",
                element: (
                    <SuspenseWrapper>
                        <SettingsPage />
                    </SuspenseWrapper>
                ),
            },
        ],
    },
];
