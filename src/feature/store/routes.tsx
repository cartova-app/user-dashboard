import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import NotFound from '@/core/pages/NotFound';
import { globalLoaderPendingElement } from '@/core/routing/globalDataRouteUi';
import SuspenseWrapper from '@/core/utils/SuspenseWrapper';
import { STORE_LAYOUT_ROUTE_ID, StoreRoute, storeLayoutLoader } from '@/feature/store/storeRoute';

const DashboardPage = lazy(() => import('./pages/Dashboard'));
const ProductsPage = lazy(() => import('./pages/Products'));
const CategoriesPage = lazy(() => import('./pages/Categories'));
const OrdersPage = lazy(() => import('./pages/Orders'));
const CustomersPage = lazy(() => import('./pages/Customers'));
const AnalyticsPage = lazy(() => import('./pages/Analytics'));
const AppearancePage = lazy(() => import('./pages/Appearance'));
const DeveloperToolsPage = lazy(() => import('./pages/DeveloperTools'));
const SettingsPage = lazy(() => import('./pages/Settings'));

export const storeRoutes = [
  {
    id: STORE_LAYOUT_ROUTE_ID,
    path: '/stores/:storeId',
    loader: storeLayoutLoader,
    hydrateFallbackElement: globalLoaderPendingElement,
    element: <StoreRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'products',
        element: (
          <SuspenseWrapper>
            <ProductsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'categories',
        element: (
          <SuspenseWrapper>
            <CategoriesPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'orders',
        element: (
          <SuspenseWrapper>
            <OrdersPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'customers',
        element: (
          <SuspenseWrapper>
            <CustomersPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'analytics',
        element: (
          <SuspenseWrapper>
            <AnalyticsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'appearance',
        element: (
          <SuspenseWrapper>
            <AppearancePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'developer-tools',
        element: (
          <SuspenseWrapper>
            <DeveloperToolsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'settings',
        element: (
          <SuspenseWrapper>
            <SettingsPage />
          </SuspenseWrapper>
        ),
      },
      { path: '*', element: <NotFound variant="embedded" /> },
    ],
  },
];
