import { API_END_POINTS } from '@/core/constants/api';

/**
 * Hierarchical query keys for the store feature (TanStack Query convention).
 * Use `invalidateQueries({ queryKey: storeKeys.all })` to drop all store-related cache.
 */
export const storeKeys = {
  all: ['stores'] as const,
  lists: () => [...storeKeys.all, 'list'] as const,
  details: () => [...storeKeys.all, 'detail'] as const,
  detail: (storeId: string) => [...storeKeys.details(), storeId] as const,
  create: () => [...storeKeys.all, 'create'] as const,
};

/** GET /stores — list */
export function storeListQueryDef() {
  return {
    url: API_END_POINTS.STORE.GET_ALL,
    queryKey: storeKeys.lists(),
  } as const;
}

/** GET /stores/:storeId — single store (used by layout loader + `useGetStore`). */
export function storeDetailQueryDef(storeId: string) {
  return {
    url: API_END_POINTS.STORE.BY_ID(storeId),
    queryKey: storeKeys.detail(storeId),
  } as const;
}

/** POST /stores — create store (mutation). */
export function storeCreateMutationDef() {
  return {
    url: API_END_POINTS.STORE.CREATE,
    mutationKey: storeKeys.create(),
  } as const;
}
