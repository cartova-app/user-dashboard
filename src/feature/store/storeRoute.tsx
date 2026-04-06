/**
 * Store area route module — loader + shell (`ProtectedRoute`, `Suspense`, layout + `Outlet`).
 *
 * Route-level error and loader pending UI live in `@/core/routing` (pathless app root + shared elements).
 */
import axios from 'axios';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { queryClient } from '@/app/query-client';
import StoreLayout from '@/core/layouts/StoreLayout';
import ProtectedRoute from '@/core/utils/ProtectRoute';
import SuspenseWrapper from '@/core/utils/SuspenseWrapper';
import { storeDetailQueryDef } from '@/feature/store/api/storeQueryDefinitions';
import { fetchStoreById, type StoreDetail } from '@/feature/store/services/store';

/** Pass to `useRouteLoaderData(STORE_LAYOUT_ROUTE_ID)` from child routes when needed. */
export const STORE_LAYOUT_ROUTE_ID = 'store-layout' as const;

export async function storeLayoutLoader({ params }: LoaderFunctionArgs) {
  const storeId = params.storeId;
  if (!storeId) {
    throw new Response(null, { status: 400, statusText: 'Missing store' });
  }

  const { queryKey } = storeDetailQueryDef(storeId);

  try {
    const store = await queryClient.ensureQueryData<StoreDetail>({
      queryKey,
      queryFn: () => fetchStoreById(storeId),
    });
    return { store };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) {
        throw new Response(null, { status: 404, statusText: 'Not Found' });
      }
      if (status === 403) {
        throw new Response(null, { status: 403, statusText: 'Forbidden' });
      }
    }
    throw error;
  }
}

/** Shell for `/stores/:storeId` — auth, lazy-boundary, sidebar layout, and child `<Outlet />`. */
export function StoreRoute() {
  return (
    <ProtectedRoute>
      <SuspenseWrapper>
        <StoreLayout />
      </SuspenseWrapper>
    </ProtectedRoute>
  );
}
