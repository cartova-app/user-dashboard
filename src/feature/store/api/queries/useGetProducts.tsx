import { useQuery } from '@tanstack/react-query';
import type { ProductsParams } from '../../services/product';
import { getProductsFn } from '../../services/product';

const useGetProducts = (storeId: string, params?: ProductsParams) => {
  return useQuery({
    queryKey: ['products', storeId, params],
    queryFn: () => getProductsFn(storeId, params),
    enabled: !!storeId,
  });
};

export default useGetProducts;
