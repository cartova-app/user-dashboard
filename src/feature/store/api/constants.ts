import type { QueryDefinitions } from '@/core/constants/api';

const storeAllKey = () => ['stores'] as const;
const categoryAllKey = (storeId: string) => ['categories', storeId] as const;
const productAllKey = (storeId: string) => ['products', storeId] as const;

export const storeDefinitions = {
  all: {
    key: storeAllKey,
    url: '/api/dashboard/stores',
  },
  list: {
    key: () => [...storeAllKey(), 'list'] as const,
    url: '/api/dashboard/stores',
  },
  detail: {
    key: (storeId: string) => [...storeAllKey(), 'detail', storeId] as const,
    url: (storeId: string) => `/api/dashboard/stores/${storeId}`,
  },
  create: {
    key: () => [...storeAllKey(), 'create'] as const,
    url: '/api/dashboard/stores',
  },
} as const satisfies QueryDefinitions;

export const categoryDefinitions = {
  all: {
    key: categoryAllKey,
    url: (storeId: string) => `/api/dashboard/stores/${storeId}/categories`,
  },
  list: {
    key: (storeId: string, params?: unknown) => [...categoryAllKey(storeId), 'list', params] as const,
    url: (storeId: string) => `/api/dashboard/stores/${storeId}/categories`,
  },
  create: {
    key: (storeId: string) => [...categoryAllKey(storeId), 'create'] as const,
    url: (storeId: string) => `/api/dashboard/stores/${storeId}/categories`,
  },
  update: {
    key: (storeId: string) => [...categoryAllKey(storeId), 'update'] as const,
    url: (storeId: string, categoryId: string) => `/api/dashboard/stores/${storeId}/categories/${categoryId}`,
  },
  delete: {
    key: (storeId: string) => [...categoryAllKey(storeId), 'delete'] as const,
    url: (storeId: string, categoryId: string) => `/api/dashboard/stores/${storeId}/categories/${categoryId}`,
  },
  updateIcon: {
    key: (storeId: string) => [...categoryAllKey(storeId), 'icon', 'update'] as const,
    url: (storeId: string, categoryId: string) => `/api/dashboard/stores/${storeId}/categories/${categoryId}/icon`,
  },
  deleteIcon: {
    key: (storeId: string) => [...categoryAllKey(storeId), 'icon', 'delete'] as const,
    url: (storeId: string, categoryId: string) => `/api/dashboard/stores/${storeId}/categories/${categoryId}/icon`,
  },
} as const satisfies QueryDefinitions;

export const productDefinitions = {
  all: {
    key: productAllKey,
    url: (storeId: string) => `/api/dashboard/stores/${storeId}/products`,
  },
  list: {
    key: (storeId: string, params?: unknown) => [...productAllKey(storeId), 'list', params] as const,
    url: (storeId: string) => `/api/dashboard/stores/${storeId}/products`,
  },
  detail: {
    key: (storeId: string, productId: string) => [...productAllKey(storeId), 'detail', productId] as const,
    url: (storeId: string, productId: string) => `/api/dashboard/stores/${storeId}/products/${productId}`,
  },
  create: {
    key: (storeId: string) => [...productAllKey(storeId), 'create'] as const,
    url: (storeId: string) => `/api/dashboard/stores/${storeId}/products`,
  },
  update: {
    key: (storeId: string) => [...productAllKey(storeId), 'update'] as const,
    url: (storeId: string, productId: string) => `/api/dashboard/stores/${storeId}/products/${productId}`,
  },
  delete: {
    key: (storeId: string) => [...productAllKey(storeId), 'delete'] as const,
    url: (storeId: string, productId: string) => `/api/dashboard/stores/${storeId}/products/${productId}`,
  },
  addImage: {
    key: (storeId: string) => [...productAllKey(storeId), 'images', 'add'] as const,
    url: (storeId: string, productId: string) => `/api/dashboard/stores/${storeId}/products/${productId}/images`,
  },
  removeImage: {
    key: (storeId: string) => [...productAllKey(storeId), 'images', 'remove'] as const,
    url: (storeId: string, productId: string) => `/api/dashboard/stores/${storeId}/products/${productId}/images`,
  },
} as const satisfies QueryDefinitions;
