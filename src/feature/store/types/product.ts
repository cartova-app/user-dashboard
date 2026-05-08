import type { Category } from './category';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  visible: boolean;
  images: { key: string; url: string }[];
  quantity: number;
  createdAt: string;
  updatedAt: string;
  storeId: string;
  creatorId: string;
  categories: Category[];
  slug: string;
  store: {
    id: string;
    name: string;
    slug: string;
  };

  storeName: string;
}

export interface ProductsResponse {
  items: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductsParams {
  q?: string;
  categories?: string;
  sort?: 'asc' | 'desc';
  sortBy?: 'name' | 'price' | 'createdAt' | 'updatedAt';
  page?: number;
  limit?: number;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  categories?: string[];
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  categories?: string[];
}
