import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const api = axios.create({ baseURL });

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// Response interceptor — only redirect to /login for protected routes,
// NOT on /login or /signup themselves (would cause an infinite loop).
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    const isAuthPage = currentPath === "/login" || currentPath === "/signup";

    if ((status === 401) && !isAuthPage) {
      // Expired/invalid token on a protected page → go to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    // Let the error propagate so individual pages can show the right message
    return Promise.reject(err);
  }
);

export default api;
