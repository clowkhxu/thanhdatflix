import axios from "axios";
import axiosRetry from "axios-retry";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});

// Thêm interceptor để gửi token trong header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // hoặc từ cookie
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// tự động gọi api khi lỗi
axiosRetry(instance, {
  retries: 3,
  retryCondition: (error) => {
    return error?.response?.status === 401;
  },
  retryDelay: (retryCount, error) => {
    return retryCount * 500;
  },
});


instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      // Xử lý khi token hết hạn
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    if (error && error.response && error.response.data) {
      return error.response.data;
    }
    return Promise.reject(error);
  }
);


export default instance;
