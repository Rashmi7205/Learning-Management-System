import axios, { AxiosInstance } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken }
          );

          const { token } = response.data;
          localStorage.setItem(
            process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "courseloop_token",
            token
          );
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem(
          process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "courseloop_token"
        );
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
