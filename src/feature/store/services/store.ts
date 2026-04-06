import axiosInstance from '@/core/config/axiosInstance';
import {
  storeCreateMutationDef,
  storeDetailQueryDef,
  storeListQueryDef,
} from '@/feature/store/api/storeQueryDefinitions';

export interface StoreData {
  name: string;
  domain?: string;
  description?: string;
  theme?: string;
  type?: string;
  defaultCurrency?: string;
  allowedCurrencies?: string[];
}

/** Shape returned by GET /stores/:id — extend when the API exposes more fields. */
export type StoreDetail = {
  id: string;
  name: string;
  [key: string]: unknown;
};

export async function fetchStoreList() {
  const { url } = storeListQueryDef();
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function fetchStoreById(storeId: string): Promise<StoreDetail> {
  const { url } = storeDetailQueryDef(storeId);
  const { data } = await axiosInstance.get<StoreDetail>(url);
  return data;
}

export async function createStoreFn(data: StoreData) {
  const { url } = storeCreateMutationDef();
  const { data: created } = await axiosInstance.post(url, data);
  return created;
}
