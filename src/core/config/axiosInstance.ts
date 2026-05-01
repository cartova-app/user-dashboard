import axios, { AxiosRequestConfig } from "axios";
import i18next from "i18next";

type MultipartValue = string | number | boolean | Blob | File;
type MultipartInput = Record<string, MultipartValue | MultipartValue[] | null | undefined> | FormData;
type FormMethod = "post" | "patch" | "put";

const toFormData = (input: MultipartInput): FormData => {
  if (input instanceof FormData) return input;

  const formData = new FormData();
  for (const [key, rawValue] of Object.entries(input)) {
    if (rawValue === undefined || rawValue === null) continue;

    const values = Array.isArray(rawValue) ? rawValue : [rawValue];
    for (const value of values) {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  }

  return formData;
};

// Ensure that the environment variable is set and valid
const URL = import.meta.env.VITE_API_URL;
if (!URL) {
  console.error(
    "API URL is not defined. Please check your environment variables.",
  );
}

const config = {
  maxBodyLength: 10 * 1024 * 1024, // Set to 10MB, adjust as needed
  baseURL: URL,
  // withCredentials: true, // ✅ allows sending and receiving cookies
  headers: {
    Accept: "application/json",
  },
};

// Create an axios instance with the defined configuration
const axiosInstance = axios.create(config);

// Request interceptor to attach authorization token
axiosInstance.interceptors.request.use(
  async (request) => {
    const token = localStorage?.getItem("bearer_token"); // ✅ safe optional chaining
    // Attach the authorization token if available
    request.headers["Accept-Language"] =
      i18next.language === "ar" ? "ar-EG" : "en-US";

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    console.error("Request error:", error); // Log request error
    return Promise.reject(error);
  },
);

// Response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error responses
      console.error("API Error:", error.response.data);
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access, e.g., redirect to login
          console.warn("Unauthorized access - redirecting to login.");
          // Optionally, you could use a history.push or navigate to redirect
          window.location.href = "/login";
          break;
        case 403:
          // Handle forbidden access
          console.warn("Access forbidden - insufficient permissions.");
          break;
        case 500:
          // Handle internal server errors
          console.error("Internal server error - please try again later.");
          break;
        default:
          console.error("An unexpected error occurred.");
      }
    } else {
      // Handle errors without a response (network error, etc.)
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  },
);

export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await axiosInstance.get<T>(url, config);
  return response.data;
};

export const post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
};

export const patch = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosInstance.patch<T>(url, data, config);
  return response.data;
};

export const put = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosInstance.put<T>(url, data, config);
  return response.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await axiosInstance.delete<T>(url, config);
  return response.data;
};

export const sendForm = async <T>(
  method: FormMethod,
  url: string,
  data: MultipartInput,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosInstance.request<T>({
    method,
    url,
    data: toFormData(data),
    ...config,
  });
  return response.data;
};

export default axiosInstance;
