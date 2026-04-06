import { useQuery } from '@tanstack/react-query';
import { storeDetailQueryDef, storeKeys } from '@/feature/store/api/storeQueryDefinitions';
import { fetchStoreById } from '@/feature/store/services/store';

/** Same query key as the store layout loader — reads from cache when prefetched. */
const useGetStore = (storeId: string | undefined) => {
  return useQuery({
    queryKey: storeId ? storeDetailQueryDef(storeId).queryKey : ([...storeKeys.details(), '$disabled'] as const),
    queryFn: () => fetchStoreById(storeId as string),
    enabled: Boolean(storeId),
  });
};

export default useGetStore;
