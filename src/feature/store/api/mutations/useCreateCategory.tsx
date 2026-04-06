import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateCategoryData } from '../../services/category';
import { createCategoryFn } from '../../services/category';

const useCreateCategory = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryData) => createCategoryFn(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', storeId] });
    },
  });
};

export default useCreateCategory;
