import { useQuery } from '@tanstack/react-query';
import type { CategoriesParams } from '../../services/category';
import { getCategoriesFn } from '../../services/category';

const useGetCategories = (storeId: string, params?: CategoriesParams) => {
  return useQuery({
    queryKey: ['categories', storeId, params],
    queryFn: () => getCategoriesFn(storeId, params),
    enabled: !!storeId,
  });
};

export default useGetCategories;
