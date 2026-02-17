import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://route-posts.routemisr.com",
  timeout: 1000,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.token = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
