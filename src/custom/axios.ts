import axios from "axios";
import axiosRetry from "axios-retry";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
  timeout: 10000, // Thêm timeout
});

// Thêm interceptor để gửi token trong header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // Kiểm tra token có tồn tại và hợp lệ
  if (token && token !== 'undefined' && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Nếu không có token hợp lệ, xóa token và chuyển về login
    localStorage.removeItem('token');
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
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
    // Xử lý lỗi token
    if (error?.response?.status === 401 || 
        error?.response?.data?.message?.includes('TokenExpiredError')) {
      // Xóa token
      localStorage.removeItem('token');
      
      // Nếu không phải ở trang login, chuyển về login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    // Xử lý các lỗi khác
    return Promise.reject(error?.response?.data || error);
  }
);

export default instance;
