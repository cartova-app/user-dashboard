import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductFn } from '../../services/product';

const useDeleteProduct = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProductFn(storeId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', storeId] });
    },
  });
};

export default useDeleteProduct;
