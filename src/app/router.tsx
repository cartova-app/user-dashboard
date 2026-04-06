import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/core/pages/NotFound";
import {
  globalLoaderPendingElement,
  globalRouteErrorElement,
} from "@/core/routing/globalDataRouteUi";
import { authRoutes } from "@/feature/auth/routes";
import { organizationRoutes } from "@/feature/organization/routes";
import { profileRoutes } from "@/feature/profile/routes";
import { storeRoutes } from "@/feature/store/routes";

const childRoutes = [
  ...authRoutes,
  ...profileRoutes,
  ...organizationRoutes,
  ...storeRoutes,
  { path: "*", element: <NotFound /> },
];

// Pathless root: global route errors bubble here; shared loader pending UI for the tree.
const router = createBrowserRouter([
  {
    id: "app-root",
    errorElement: globalRouteErrorElement,
    hydrateFallbackElement: globalLoaderPendingElement,
    children: childRoutes,
  },
]);

export default router;
