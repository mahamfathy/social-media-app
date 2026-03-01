import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://route-posts.routemisr.com",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong";
    const url = error.config.url;

    if (status === 401) {
      const isAuthRequest =
        url.includes("/signin") ||
        url.includes("/signup") ||
        url.includes("/change-password");

      if (!isAuthRequest) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(message);
      }
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
