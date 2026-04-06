import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategoryIconFn, updateCategoryIconFn } from '../../services/category';

export const useUpdateCategoryIcon = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, file }: { categoryId: string; file: File }) =>
      updateCategoryIconFn(storeId, categoryId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', storeId] });
    },
  });
};

export const useDeleteCategoryIcon = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: string) => deleteCategoryIconFn(storeId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', storeId] });
    },
  });
};
