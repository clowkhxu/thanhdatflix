import axios from "axios";
import axiosRetry from "axios-retry";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
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
    if (error && error.response && error.response.data) {
      return error.response.data;
    }
    return Promise.reject(error);
  }
);


export default instance;
