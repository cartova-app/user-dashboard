import axiosInstance from "@/core/config/axiosInstance";
import { API_END_POINTS } from "@/core/constants/api";

export interface StoreData {
  name: string;
  domain?: string;
  description?: string;
  theme?: string;
  type?: string;
  defaultCurrency?: string;
  allowedCurrencies?: string[];
}

export const getAllStoresFn = async () => {
  const response = await axiosInstance.get(API_END_POINTS.STORE.GET_ALL);
  return response.data;
};

export const createStoreFn = async (data: StoreData) => {
  const response = await axiosInstance.post(API_END_POINTS.STORE.CREATE, data);
  return response.data;
};
