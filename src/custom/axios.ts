import axios from "axios";
import axiosRetry from "axios-retry";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});

// Thêm interceptor để gửi token trong header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Chỉ retry khi thực sự cần thiết
axiosRetry(instance, {
  retries: 1, // Giảm số lần retry
  retryCondition: (error) => {
    // Chỉ retry với một số lỗi cụ thể
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
           error?.response?.status === 401;
  },
  retryDelay: () => {
    return 1000; // Delay cố định 1 giây
  },
});

instance.interceptors.response.use(
  (response) => {
    return response && response.data ? response.data : response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi là token hết hạn và chưa thử refresh
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Xóa token cũ
        localStorage.removeItem('token');
        
        // Chuyển người dùng về trang login
        window.location.href = '/login';
        return Promise.reject(error);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Xử lý các lỗi khác
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;
