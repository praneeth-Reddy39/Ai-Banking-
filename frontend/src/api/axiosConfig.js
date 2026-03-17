import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      localStorage.removeItem("token");
      if (typeof window !== "undefined") {
        const current = window.location.pathname;
        if (current !== "/login") window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
