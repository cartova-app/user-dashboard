import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategoryFn } from '../../services/category';

const useDeleteCategory = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: string) => deleteCategoryFn(storeId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', storeId] });
    },
  });
};

export default useDeleteCategory;
