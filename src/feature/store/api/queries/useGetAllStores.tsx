import { useQuery } from '@tanstack/react-query';
import { storeListQueryDef } from '@/feature/store/api/storeQueryDefinitions';
import { fetchStoreList } from '@/feature/store/services/store';

const useGetAllStores = () => {
  const { queryKey } = storeListQueryDef();
  return useQuery({
    queryKey,
    queryFn: fetchStoreList,
  });
};

export default useGetAllStores;
