// ✅ FIXED: index.js
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  async (req) => {
    const token = localStorage.getItem("Authentication");
    if (token) {
      req.headers.Authorization = token;
    }
    return req;
  },
  (error) => Promise.reject(error),
);

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// ✅ Directly export the configured instance
export default axios;
