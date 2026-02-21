import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStoreFn } from '../../services/store';

const useCreateStore = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStoreFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
      throw error; // Re-throw for component handling
    },
  });
};

export default useCreateStore;
