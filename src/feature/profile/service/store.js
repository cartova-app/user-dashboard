import axiosInstance from "@/core/config/axiosInstance";
import { API_END_POINTS } from "@/core/constants/api";

export const createStoreFn = async (formData) => {
  // Map formData to API request schema
  const payload = {
    name: formData.storeName,
    logo: formData.logo || null,
    description: formData.storeDescription || null,
    domain: formData.domain || null,
    theme: formData.theme || "basic",
    type: formData.type || "ecommerce",
    defaultCurrency: formData.defaultCurrency || "EGP",
    allowedCurrencies: formData.allowedCurrencies || ["EGP"],
  };

  const response = await axiosInstance.post(API_END_POINTS.STORE.CREATE, payload);
  return response.data;
};
