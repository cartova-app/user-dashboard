import {
  mutationOptions,
  queryOptions,
  type QueryClient,
} from "@tanstack/react-query";
import { del, get, put, post, sendForm } from "@/core/config/axiosInstance";
import { categoryDefinitions } from "@/feature/store/api/constants";
import type {
  CategoriesParams,
  CategoriesResponse,
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from "@/feature/store/types";

const invalidateCategoryAll = (queryClient: QueryClient, storeId: string) => () => {
  queryClient.invalidateQueries({ queryKey: categoryDefs.all.key(storeId) });
};

export const categoryDefs = categoryDefinitions;

export const categoryListQueryOptions = (
  storeId: string | undefined,
  params?: CategoriesParams,
) =>
  queryOptions({
    queryKey: categoryDefs.list.key(storeId ?? "", params),
    queryFn: () =>
      get<CategoriesResponse>(categoryDefs.list.url(storeId ?? ""), { params }),
    enabled: !!storeId,
  });

export const createCategoryMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
) =>
  mutationOptions({
    mutationKey: categoryDefs.create.key(storeId),
    mutationFn: (payload: CreateCategoryData) =>
      post<Category>(categoryDefs.create.url(storeId), payload),
    onSuccess: invalidateCategoryAll(queryClient, storeId),
  });

export const updateCategoryMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
  params?: CategoriesParams,
  
) =>
  mutationOptions({
    mutationKey: categoryDefs.update.key(storeId),

    mutationFn: ({
      categoryId,
      data,
    }: {
      categoryId: string;
      data: UpdateCategoryData;
    }) => {
      const payload = {
        name: data.name,
        description: data.description,
        rank: data.rank,
      };

      return put(
        categoryDefs.update.url(storeId, categoryId),
        payload
      );
    },
onSuccess: invalidateCategoryAll(queryClient, storeId)
  });

export const deleteCategoryMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
) =>
  mutationOptions({
    mutationKey: categoryDefs.delete.key(storeId),
    mutationFn: (categoryId: string) =>
      del<Category>(categoryDefs.delete.url(storeId, categoryId)),
    onSuccess: invalidateCategoryAll(queryClient, storeId),
  });

export const updateCategoryIconMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
) =>
  mutationOptions({
    mutationKey: categoryDefs.updateIcon.key(storeId),
    mutationFn: ({
      categoryId,
      file,
    }: {
      categoryId: string;
      file: File;
    }) => sendForm<Category>("patch", categoryDefs.updateIcon.url(storeId, categoryId), { file }),
    onSuccess: invalidateCategoryAll(queryClient, storeId),
  });

export const deleteCategoryIconMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
) =>
  mutationOptions({
    mutationKey: categoryDefs.deleteIcon.key(storeId),
    mutationFn: (categoryId: string) =>
      del<Category>(categoryDefs.deleteIcon.url(storeId, categoryId)),
    onSuccess: invalidateCategoryAll(queryClient, storeId),
  });
