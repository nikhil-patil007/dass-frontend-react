/**
 * Axios instance with interceptors for the Dass E-Commerce API.
 *
 * Auth strategy (mirrors the Django backend):
 *   – JWT tokens are stored in HttpOnly cookies set by the server.
 *   – Every request sends `withCredentials: true` so the browser
 *     automatically attaches the cookies.
 *   – On a 401 response the auth store is reset and the user is
 *     redirected to /login.
 */

import axios from "axios";

// ── Base instance ──────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 15_000,
  withCredentials: true, // Required: sends HttpOnly cookies automatically
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request interceptor ───────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Cookies are sent automatically via `withCredentials`.
    // If a non-JSON body is provided (e.g. FormData for file uploads),
    // let the browser set the correct Content-Type.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ──────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expired or invalid → clear local auth state.
      // Lazy-import to avoid circular deps.
      import("@/store/useAuthStore").then(({ default: useAuthStore }) => {
        const { user, _clearAuth } = useAuthStore.getState();
        if (user) {
          // Only redirect if we thought we were logged in
          _clearAuth();
          window.location.href = "/login";
        }
      });
    }

    // Surface a user-friendly error message
    const message =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    // Attach the normalized message for easy consumption
    error.apiMessage = message;

    return Promise.reject(error);
  },
);

export default api;
