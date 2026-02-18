import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://route-posts.routemisr.com",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      toast.error(error.response?.data?.message);
      localStorage.removeItem("token");
    } else {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
