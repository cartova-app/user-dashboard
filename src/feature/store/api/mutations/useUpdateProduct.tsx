import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateProductData } from '../../services/product';
import { updateProductFn } from '../../services/product';

const useUpdateProduct = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: UpdateProductData }) =>
      updateProductFn(storeId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', storeId] });
    },
  });
};

export default useUpdateProduct;
