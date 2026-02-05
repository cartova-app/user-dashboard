import { lazy } from "react";
import ProtectedRoute from "@/core/utils/ProtectRoute";
import SuspenseWrapper from "@/core/utils/SuspenseWrapper";
import OrganizationLayout from "./layouts/OrganizationLayout";
import OrganizationsLayout from "@/core/layouts/OrganizationsLayout";
import ListStores from "../store/pages/List";
import ListTeams from "../team/pages/List";
import OrganizationProtectedRoute from "@/core/utils/OrganizationProtectedRoute";
import { Navigate } from "react-router";
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
        element: (
          <SuspenseWrapper>
            <OrganizationPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <OrganizationProtectedRoute>
          <SuspenseWrapper>
            <OrganizationsLayout />
          </SuspenseWrapper>
        </OrganizationProtectedRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/stores" replace />,
      },
      {
        path: "stores",
        element: (
          <SuspenseWrapper>
            <ListStores />
          </SuspenseWrapper>
        ),
      },
      {
        path: "team",
        element: (
          <SuspenseWrapper>
            <ListTeams />
          </SuspenseWrapper>
        ),
      },
      {
        path: "settings",
        element: (
          <SuspenseWrapper>
            <h1>Settings</h1>
          </SuspenseWrapper>
        ),
      },
    ],
  },
];
