/**
 * Auth store — Zustand
 *
 * Manages: user object, loading flags, and auth API calls.
 * The JWT tokens themselves live in HttpOnly cookies (set by the backend),
 * so we only track the user profile on the client.
 */

import { create } from "zustand";
import api from "@/lib/axios";
import ENDPOINTS from "@/lib/endpoints";

const useAuthStore = create((set, get) => ({
  // ── State ───────────────────────────────────────────────────────────
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false, // true once the initial /me check completes
  error: null,

  // ── Actions ─────────────────────────────────────────────────────────

  /**
   * Called once on app boot — checks whether the user is already
   * authenticated (cookie still valid).
   */
  initialize: async () => {
    if (get().isInitialized) return;
    set({ isLoading: true });
    try {
      const { data } = await api.get(ENDPOINTS.AUTH.ME);
      set({
        user: data,
        isAuthenticated: true,
        isInitialized: true,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
        isLoading: false,
      });
    }
  },

  /**
   * POST /api/auth/login/
   * Backend sets access_token & refresh_token cookies on success.
   */
  login: async ({ username, password }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, {
        username,
        password,
      });
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { success: true, data };
    } catch (err) {
      const message = err.apiMessage || "Login failed.";
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  /**
   * POST /api/auth/register/
   * Backend creates the user and sets JWT cookies on success.
   */
  register: async ({ username, email, first_name, last_name, password, password2 }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post(ENDPOINTS.AUTH.REGISTER, {
        username,
        email,
        first_name,
        last_name,
        password,
        password2,
      });
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { success: true, data };
    } catch (err) {
      const message = err.apiMessage || "Registration failed.";
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  /**
   * POST /api/auth/logout/
   * Backend clears the HttpOnly cookies.
   */
  logout: async () => {
    try {
      await api.post(ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // Even if the request fails, clear local state
    }
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  /**
   * GET /api/auth/me/ — refresh user profile from server.
   */
  fetchUser: async () => {
    try {
      const { data } = await api.get(ENDPOINTS.AUTH.ME);
      set({ user: data, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },

  /** Internal: used by the axios 401 interceptor. */
  _clearAuth: () =>
    set({ user: null, isAuthenticated: false, error: null }),

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
