import axiosInstance from '@/core/config/axiosInstance';
import { API_END_POINTS } from '@/core/constants/api';

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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: { key: string; url: string } | null;
  visible: boolean;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
  storeId: string;
  creatorId: string;
  parentId: string | null;
}

export interface CategoriesResponse {
  items: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getProductsFn = async (
  storeId: string,
  params?: ProductsParams,
): Promise<ProductsResponse> => {
  const response = await axiosInstance.get(
    API_END_POINTS.PRODUCTS.BASE(storeId),
    { params },
  );
  return response.data;
};

export const getProductByIdFn = async (
  storeId: string,
  productId: string,
): Promise<Product> => {
  const response = await axiosInstance.get(
    API_END_POINTS.PRODUCTS.BY_ID(storeId, productId),
  );
  return response.data;
};

export const createProductFn = async (
  storeId: string,
  data: CreateProductData,
): Promise<Product> => {
  const response = await axiosInstance.post(
    API_END_POINTS.PRODUCTS.BASE(storeId),
    data,
  );
  return response.data;
};

export const updateProductFn = async (
  storeId: string,
  productId: string,
  data: UpdateProductData,
): Promise<Product> => {
  const response = await axiosInstance.put(
    API_END_POINTS.PRODUCTS.BY_ID(storeId, productId),
    data,
  );
  return response.data;
};

export const deleteProductFn = async (
  storeId: string,
  productId: string,
): Promise<Product> => {
  const response = await axiosInstance.delete(
    API_END_POINTS.PRODUCTS.BY_ID(storeId, productId),
  );
  return response.data;
};

export const addProductImageFn = async (
  storeId: string,
  productId: string,
  file: File,
): Promise<Product> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post(
    API_END_POINTS.PRODUCTS.IMAGES(storeId, productId),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return response.data;
};

export const removeProductImageFn = async (
  storeId: string,
  productId: string,
  key: string,
): Promise<Product> => {
  const response = await axiosInstance.delete(
    API_END_POINTS.PRODUCTS.IMAGES(storeId, productId),
    {
      data: { key },
    },
  );
  return response.data;
};

export const getCategoriesFn = async (
  storeId: string,
  params?: { page?: number; limit?: number; q?: string },
): Promise<CategoriesResponse> => {
  const response = await axiosInstance.get(
    API_END_POINTS.CATEGORIES.BASE(storeId),
    { params },
  );
  return response.data;
};
