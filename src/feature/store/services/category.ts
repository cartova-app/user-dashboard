import axiosInstance from '@/core/config/axiosInstance';
import { API_END_POINTS } from '@/core/constants/api';

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

export interface CategoriesParams {
  q?: string;
  sort?: 'asc' | 'desc';
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  page?: number;
  limit?: number;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  visible?: boolean;
  isMain?: boolean;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  visible?: boolean;
  isMain?: boolean;
}

export const getCategoriesFn = async (
  storeId: string,
  params?: CategoriesParams,
): Promise<CategoriesResponse> => {
  const response = await axiosInstance.get(
    API_END_POINTS.CATEGORIES.BASE(storeId),
    { params },
  );
  return response.data;
};

export const getCategoryByIdFn = async (
  storeId: string,
  categoryId: string,
): Promise<Category> => {
  const response = await axiosInstance.get(
    API_END_POINTS.CATEGORIES.BY_ID(storeId, categoryId),
  );
  return response.data;
};

export const createCategoryFn = async (
  storeId: string,
  data: CreateCategoryData,
): Promise<Category> => {
  const response = await axiosInstance.post(
    API_END_POINTS.CATEGORIES.BASE(storeId),
    data,
  );
  return response.data;
};

export const updateCategoryFn = async (
  storeId: string,
  categoryId: string,
  data: UpdateCategoryData,
): Promise<Category> => {
  const response = await axiosInstance.put(
    API_END_POINTS.CATEGORIES.BY_ID(storeId, categoryId),
    data,
  );
  return response.data;
};

export const deleteCategoryFn = async (
  storeId: string,
  categoryId: string,
): Promise<Category> => {
  const response = await axiosInstance.delete(
    API_END_POINTS.CATEGORIES.BY_ID(storeId, categoryId),
  );
  return response.data;
};

export const updateCategoryIconFn = async (
  storeId: string,
  categoryId: string,
  file: File,
): Promise<Category> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.put(
    API_END_POINTS.CATEGORIES.ICON(storeId, categoryId),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return response.data;
};

export const deleteCategoryIconFn = async (
  storeId: string,
  categoryId: string,
): Promise<Category> => {
  const response = await axiosInstance.delete(
    API_END_POINTS.CATEGORIES.ICON(storeId, categoryId),
  );
  return response.data;
};

export const isCategoryNameAvailableFn = async (
  storeId: string,
  name: string,
): Promise<boolean> => {
  const response = await axiosInstance.get(
    API_END_POINTS.CATEGORIES.IS_NAME_AVAILABLE(storeId),
    {
      params: { name },
    },
  );
  return response.data;
};
