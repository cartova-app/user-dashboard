import axiosInstance from "@/core/config/axiosInstance";
import { API_END_POINTS } from "@/core/constants/api";

export const getAllStoresFn = async () => {
  const response = await axiosInstance.get(API_END_POINTS.STORE.GET_ALL);
  return response.data;
};
export const createStoreFn = async (data) => {
  const response = await axiosInstance.post(API_END_POINTS.STORE.CREATE, data);
  return response.data;
};
