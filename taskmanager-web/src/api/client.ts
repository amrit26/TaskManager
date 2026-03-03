import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.title ||
      err?.response?.data?.detail ||
      err.message ||
      "Unexpected error";

    return Promise.reject(new Error(message));
  }
);
