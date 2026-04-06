export const API_END_POINTS = {
  STORE: {
    GET_ALL: '/api/dashboard/stores',
    CREATE: '/api/dashboard/stores',
    GET: '/api/dashboard/stores',
    BY_ID: (storeId: string) => `/api/dashboard/stores/${storeId}`,
  },
  PRODUCTS: {
    BASE: (storeId: string) => `/api/dashboard/stores/${storeId}/products`,
    BY_ID: (storeId: string, productId: string) => `/api/dashboard/stores/${storeId}/products/${productId}`,
    IMAGES: (storeId: string, productId: string) => `/api/dashboard/stores/${storeId}/products/${productId}/images`,
  },
  CATEGORIES: {
    BASE: (storeId: string) => `/api/dashboard/stores/${storeId}/categories`,
    BY_ID: (storeId: string, categoryId: string) => `/api/dashboard/stores/${storeId}/categories/${categoryId}`,
    ICON: (storeId: string, categoryId: string) => `/api/dashboard/stores/${storeId}/categories/${categoryId}/icon`,
    IS_NAME_AVAILABLE: (storeId: string) => `/api/dashboard/stores/${storeId}/categories/is-name-available`,
  },
};

export type QueryDefinitions = {
  [key: string]: {
    key: readonly unknown[] | ((...args: any[]) => readonly unknown[]);
    url: string | ((...args: any[]) => string);
  };
};
