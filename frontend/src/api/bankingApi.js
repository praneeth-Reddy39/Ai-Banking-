import api from "./axiosConfig";

export const authApi = {
  login: (email, password) => api.post("/api/auth/login", { email, password }),
  register: (payload) => api.post("/api/auth/register", payload),
};

export const dashboardApi = {
  get: () => api.get("/api/dashboard"),
};

export const transactionsApi = {
  list: () => api.get("/api/transactions"),
  create: (payload) => api.post("/api/transactions", payload),
  update: (id, payload) => api.put(`/api/transactions/${id}`, payload),
  delete: (id) => api.delete(`/api/transactions/${id}`),
};

export const accountsApi = {
  list: () => api.get("/api/accounts"),
  create: (payload) => api.post("/api/accounts", payload),
};

export const analyticsApi = {
  transactions: () => api.get("/api/analytics/transactions"),
};
