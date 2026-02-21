import { createBrowserRouter } from 'react-router-dom';
import { authRoutes } from '@/feature/auth/routes';
import { organizationRoutes } from '@/feature/organization/routes';
import { profileRoutes } from '@/feature/profile/routes';
import { storeRoutes } from '@/feature/store/routes';

// Combine all feature routes
const router = createBrowserRouter([...authRoutes, ...profileRoutes, ...organizationRoutes, ...storeRoutes]);

export default router;
