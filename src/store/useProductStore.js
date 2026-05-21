/**
 * Product store — Zustand
 *
 * Manages: product lists, single product detail, categories, materials,
 * search / filter state, and loading flags.
 *
 * Demo mode: When VITE_DEMO_MODE=true OR the backend is unreachable,
 * the store automatically falls back to local dummy data so the app
 * can be showcased without a running server.
 */

import { create } from "zustand";
import api from "@/lib/axios";
import ENDPOINTS from "@/lib/endpoints";
import demoProducts, { demoCategories, demoMaterials } from "@/assets/data/demoData";

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

const useProductStore = create((set, get) => ({
  // ── State ───────────────────────────────────────────────────────────
  products: [],
  featuredProducts: [],
  productDetail: null,
  categories: [],
  materials: [],

  isLoading: false,
  isDetailLoading: false,
  error: null,

  // Filters / search (used to build query params)
  filters: {
    category: "",
    material: "",
    min_price: "",
    max_price: "",
    search: "",
    ordering: "-created_at",
  },

  // ── Actions ─────────────────────────────────────────────────────────

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () =>
    set({
      filters: {
        category: "",
        material: "",
        min_price: "",
        max_price: "",
        search: "",
        ordering: "-created_at",
      },
    }),

  /**
   * GET /api/products/ — fetch products with current filter state.
   * Falls back to demo data when in demo mode or API unreachable.
   */
  fetchProducts: async (overrideParams = {}) => {
    if (DEMO_MODE) {
      set({ products: demoProducts, isLoading: false });
      return demoProducts;
    }

    set({ isLoading: true, error: null });
    try {
      const { filters } = get();
      const params = {};

      // Merge filters + overrides
      const merged = { ...filters, ...overrideParams };
      if (merged.category) params.category = merged.category;
      if (merged.material) params.material = merged.material;
      if (merged.min_price) params.min_price = merged.min_price;
      if (merged.max_price) params.max_price = merged.max_price;
      if (merged.search) params.search = merged.search;
      if (merged.ordering) params.ordering = merged.ordering;

      const { data } = await api.get(ENDPOINTS.PRODUCTS.LIST, { params });
      set({ products: data, isLoading: false });
      return data;
    } catch (err) {
      // Fallback to demo data on network error
      console.warn("[ProductStore] API unreachable, using demo data:", err.message);
      set({ products: demoProducts, error: null, isLoading: false });
      return demoProducts;
    }
  },

  /**
   * GET /api/products/featured/
   */
  fetchFeaturedProducts: async () => {
    if (DEMO_MODE) {
      const featured = demoProducts.filter((p) => p.is_featured);
      set({ featuredProducts: featured, isLoading: false });
      return featured;
    }

    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.PRODUCTS.FEATURED);
      set({ featuredProducts: data, isLoading: false });
      return data;
    } catch (err) {
      const featured = demoProducts.filter((p) => p.is_featured);
      set({ featuredProducts: featured, error: null, isLoading: false });
      return featured;
    }
  },

  /**
   * GET /api/products/:slug/
   */
  fetchProductDetail: async (slug) => {
    if (DEMO_MODE) {
      const found = demoProducts.find((p) => p.slug === slug) || null;
      set({ productDetail: found, isDetailLoading: false });
      return found;
    }

    set({ isDetailLoading: true, productDetail: null, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.PRODUCTS.DETAIL(slug));
      set({ productDetail: data, isDetailLoading: false });
      return data;
    } catch (err) {
      // Fallback to demo data
      const found = demoProducts.find((p) => p.slug === slug) || null;
      set({ productDetail: found, error: found ? null : err.apiMessage, isDetailLoading: false });
      return found;
    }
  },

  /**
   * GET /api/products/category/:slug/
   */
  fetchProductsByCategory: async (categorySlug) => {
    if (DEMO_MODE) {
      const filtered = demoProducts.filter((p) => p.category?.slug === categorySlug);
      set({ products: filtered, isLoading: false });
      return filtered;
    }

    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(
        ENDPOINTS.PRODUCTS.BY_CATEGORY(categorySlug),
      );
      set({ products: data, isLoading: false });
      return data;
    } catch (err) {
      const filtered = demoProducts.filter((p) => p.category?.slug === categorySlug);
      set({ products: filtered, error: null, isLoading: false });
      return filtered;
    }
  },

  /**
   * GET /api/categories/
   */
  fetchCategories: async () => {
    if (DEMO_MODE) {
      set({ categories: demoCategories });
      return demoCategories;
    }

    try {
      const { data } = await api.get(ENDPOINTS.CATEGORIES.LIST);
      set({ categories: data });
      return data;
    } catch (err) {
      set({ categories: demoCategories, error: null });
      return demoCategories;
    }
  },

  /**
   * GET /api/materials/
   */
  fetchMaterials: async () => {
    if (DEMO_MODE) {
      set({ materials: demoMaterials });
      return demoMaterials;
    }

    try {
      const { data } = await api.get(ENDPOINTS.MATERIALS.LIST);
      set({ materials: data });
      return data;
    } catch (err) {
      set({ materials: demoMaterials, error: null });
      return demoMaterials;
    }
  },

  clearProductDetail: () => set({ productDetail: null }),
}));

export default useProductStore;
