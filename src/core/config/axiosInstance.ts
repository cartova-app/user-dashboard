import axios from "axios";
import i18next from "i18next";

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

export default axiosInstance;
