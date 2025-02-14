import axios from "axios";
import axiosRetry from "axios-retry";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});

// Thêm Access Token vào header của mọi request
instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Tự động retry request nếu lỗi 401 (hết hạn token)
axiosRetry(instance, {
  retries: 3,
  retryCondition: (error) => error?.response?.status === 401,
  retryDelay: (retryCount) => retryCount * 500,
});

// Xử lý response & tự động refresh token nếu hết hạn
instance.interceptors.response.use(
  (response) => (response && response.data ? response.data : response),
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Gọi API refresh token
        const res = await axios.post(`${process.env.REACT_APP_API}/auth/refresh-token`, {
          refreshToken,
        });

        if (res.data?.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return instance(error.config); // Retry request với token mới
        }
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
