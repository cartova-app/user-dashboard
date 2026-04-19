import {
  mutationOptions,
  queryOptions,
  type QueryClient,
} from "@tanstack/react-query";
import { del, get, post, patch, sendForm } from "@/core/config/axiosInstance";
import { productDefinitions } from "@/feature/store/api/constants";
import type {
  CreateProductData,
  Product,
  ProductsParams,
  ProductsResponse,
  UpdateProductData,
} from "@/feature/store/types";

const invalidateProductAll = (queryClient: QueryClient, storeId: string) => () => {
  queryClient.invalidateQueries({ queryKey: productDefs.all.key(storeId) });
};

export const productDefs = productDefinitions;

export const productListQueryOptions = (
  storeId: string,
  params?: ProductsParams,
) =>
  queryOptions({
    queryKey: productDefs.list.key(storeId, params),
    queryFn: () =>
      get<ProductsResponse>(productDefs.list.url(storeId), { params }),
  });

export const productDetailQueryOptions = (
  storeId: string,
  productId: string,
) =>
  queryOptions({
    queryKey: productDefs.detail.key(storeId, productId),
    queryFn: () =>
      get<Product>(productDefs.detail.url(storeId, productId)),
  });

export const createProductMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
) =>
  mutationOptions({
    mutationKey: productDefs.create.key(storeId),
    mutationFn: (payload: CreateProductData) =>
      post<Product>(productDefs.create.url(storeId), payload),
    onSuccess: invalidateProductAll(queryClient, storeId),
  });

export const updateProductMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
) =>
  mutationOptions({
    mutationKey: productDefs.update.key(storeId),
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: UpdateProductData;
    }) =>
      patch<Product>(productDefs.update.url(storeId, productId), data),
    onSuccess: invalidateProductAll(queryClient, storeId),
  });

export const deleteProductMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
) =>
  mutationOptions({
    mutationKey: productDefs.delete.key(storeId),
    mutationFn: (productId: string) =>
      del<Product>(productDefs.delete.url(storeId, productId)),
    onSuccess: invalidateProductAll(queryClient, storeId),
  });

export const addProductImageMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
) =>
  mutationOptions({
    mutationKey: productDefs.addImage.key(storeId),
    mutationFn: ({
      productId,
      file,
    }: {
      productId: string;
      file: File;
    }) =>
      sendForm<Product>(
        "post",
        productDefs.addImage.url(storeId, productId),
        { file },
      ),
    onSuccess: invalidateProductAll(queryClient, storeId),
  });

export const removeProductImageMutationOptions = (
  queryClient: QueryClient,
  storeId: string,
) =>
  mutationOptions({
    mutationKey: productDefs.removeImage.key(storeId),
    mutationFn: ({
      productId,
      key,
    }: {
      productId: string;
      key: string;
    }) =>
      del<Product>(productDefs.removeImage.url(storeId, productId), {
        data: { imageKey: key },
      }),
    onSuccess: invalidateProductAll(queryClient, storeId),
  });