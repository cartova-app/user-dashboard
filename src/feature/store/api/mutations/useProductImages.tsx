import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProductImageFn, removeProductImageFn } from '../../services/product';

export const useAddProductImage = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, file }: { productId: string; file: File }) => addProductImageFn(storeId, productId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', storeId] });
    },
  });
};

export const useRemoveProductImage = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, key }: { productId: string; key: string }) =>
      removeProductImageFn(storeId, productId, key),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', storeId] });
    },
  });
};
