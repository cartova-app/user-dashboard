import { useQuery } from '@tanstack/react-query';
import authClient from '@/core/config/auth-client';

export const useOrganizations = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: () => authClient.organization.list(),
  });
};
