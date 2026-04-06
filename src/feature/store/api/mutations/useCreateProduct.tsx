import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProductFn } from '../../services/product';
import type { CreateProductData } from '../../services/product';

const useCreateProduct = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductData) => createProductFn(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', storeId] });
    },
  });
};

export default useCreateProduct;
