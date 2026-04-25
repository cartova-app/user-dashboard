import {
  mutationOptions,
  queryOptions,
  type QueryClient,
} from "@tanstack/react-query";
import { get, post } from "@/core/config/axiosInstance";
import { storeDefinitions } from "@/feature/store/api/constants";
import type {
  StoreData,
  StoreDetail,
  StoreListResponse,
} from "@/feature/store/types";

export const storeDefs = storeDefinitions;

export const storeListQueryOptions = () =>
  queryOptions({
    queryKey: storeDefs.list.key(),
    queryFn: () => get<StoreListResponse>(storeDefs.list.url),
  });

export const storeDetailQueryOptions = (storeId: string | undefined) =>
  queryOptions({
    queryKey: storeDefs.detail.key(storeId ?? ""),
    queryFn: () => get<StoreDetail>(storeDefs.detail.url(storeId ?? "")),
    enabled: !!storeId,
  });

export const storeCreateMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: storeDefs.create.key(),
    mutationFn: (payload: StoreData) => post(storeDefs.create.url, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeDefs.all.key() });
    },
  });
