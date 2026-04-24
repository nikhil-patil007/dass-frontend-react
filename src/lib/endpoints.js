/**
 * Central registry of every backend API endpoint.
 * Keeps URL strings out of stores and components.
 */

const ENDPOINTS = {
  // ── Auth ────────────────────────────────────────────────────────────
  AUTH: {
    REGISTER: "/api/auth/register/",
    LOGIN: "/api/auth/login/",
    LOGOUT: "/api/auth/logout/",
    ME: "/api/auth/me/",
  },

  // ── Products (public, ReadOnly ViewSet) ─────────────────────────────
  PRODUCTS: {
    LIST: "/api/products/",
    DETAIL: (slug) => `/api/products/${slug}/`,
    FEATURED: "/api/products/featured/",
    BY_CATEGORY: (categorySlug) =>
      `/api/products/category/${categorySlug}/`,
  },

  // ── Categories & Materials (public) ─────────────────────────────────
  CATEGORIES: {
    LIST: "/api/categories/",
    DETAIL: (slug) => `/api/categories/${slug}/`,
  },
  MATERIALS: {
    LIST: "/api/materials/",
    DETAIL: (slug) => `/api/materials/${slug}/`,
  },

  // ── Cart (authenticated) ────────────────────────────────────────────
  CART: {
    DETAIL: "/api/carts/",
    ADD: "/api/carts/add/",
    UPDATE_ITEM: (itemId) => `/api/carts/items/${itemId}/`,
    REMOVE_ITEM: (itemId) => `/api/carts/items/${itemId}/remove/`,
    CLEAR: "/api/carts/clear/",
  },

  // ── Wishlist (authenticated) ────────────────────────────────────────
  WISHLIST: {
    LIST: "/api/wishlist/",
    ADD: "/api/wishlist/add/",
    REMOVE: (pk) => `/api/wishlist/${pk}/`,
  },

  // ── Orders (authenticated) ─────────────────────────────────────────
  ORDERS: {
    LIST: "/api/orders/",
    DETAIL: (pk) => `/api/orders/${pk}/`,
    CREATE: "/api/orders/create/",
  },

  // ── Payments (authenticated) ────────────────────────────────────────
  PAYMENTS: {
    INITIATE: "/api/payments/initiate/",
    VERIFY: "/api/payments/verify/",
  },
};

export default ENDPOINTS;
