import { mutationOptions, type QueryClient } from '@tanstack/react-query';
import { post } from '@/core/config/axiosInstance';
import { profileDefinitions } from '@/feature/profile/api/constants';
import type { StoreFormData, StorePayload } from '@/feature/profile/types/store';

export const profileDefs = profileDefinitions;

const toStorePayload = (formData: StoreFormData): StorePayload => ({
  name: formData.storeName,
  logo: formData.logo ?? null,
  description: formData.storeDescription ?? null,
  theme: formData.theme ?? 'basic',
  type: formData.type ?? 'ecommerce',
  defaultCurrency: formData.defaultCurrency ?? 'EGP',
  allowedCurrencies: formData.allowedCurrencies ?? ['EGP'],
});

export const createStoreMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: profileDefs.createStore.key(),
    mutationFn: (formData: StoreFormData) => post(profileDefs.createStore.url, toStorePayload(formData)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
