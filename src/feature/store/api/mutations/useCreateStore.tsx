import { useMutation, useQueryClient } from '@tanstack/react-query';
import { storeCreateMutationDef, storeKeys } from '@/feature/store/api/storeQueryDefinitions';
import { createStoreFn } from '@/feature/store/services/store';

const useCreateStore = () => {
  const queryClient = useQueryClient();
  const { mutationKey } = storeCreateMutationDef();
  return useMutation({
    mutationKey,
    mutationFn: createStoreFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeKeys.all });
    },
    onError: (error) => {
      console.error('Create store failed:', error);
    },
  });
};

export default useCreateStore;
