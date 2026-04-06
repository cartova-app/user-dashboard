import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateCategoryData } from '../../services/category';
import { updateCategoryFn } from '../../services/category';

const useUpdateCategory = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: UpdateCategoryData }) =>
      updateCategoryFn(storeId, categoryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', storeId] });
    },
  });
};

export default useUpdateCategory;
