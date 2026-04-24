/**
 * Product store — Zustand
 *
 * Manages: product lists, single product detail, categories, materials,
 * search / filter state, and loading flags.
 */

import { create } from "zustand";
import api from "@/lib/axios";
import ENDPOINTS from "@/lib/endpoints";

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
   */
  fetchProducts: async (overrideParams = {}) => {
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
      set({ error: err.apiMessage, isLoading: false });
      return [];
    }
  },

  /**
   * GET /api/products/featured/
   */
  fetchFeaturedProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.PRODUCTS.FEATURED);
      set({ featuredProducts: data, isLoading: false });
      return data;
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return [];
    }
  },

  /**
   * GET /api/products/:slug/
   */
  fetchProductDetail: async (slug) => {
    set({ isDetailLoading: true, productDetail: null, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.PRODUCTS.DETAIL(slug));
      set({ productDetail: data, isDetailLoading: false });
      return data;
    } catch (err) {
      set({ error: err.apiMessage, isDetailLoading: false });
      return null;
    }
  },

  /**
   * GET /api/products/category/:slug/
   */
  fetchProductsByCategory: async (categorySlug) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(
        ENDPOINTS.PRODUCTS.BY_CATEGORY(categorySlug),
      );
      set({ products: data, isLoading: false });
      return data;
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return [];
    }
  },

  /**
   * GET /api/categories/
   */
  fetchCategories: async () => {
    try {
      const { data } = await api.get(ENDPOINTS.CATEGORIES.LIST);
      set({ categories: data });
      return data;
    } catch (err) {
      set({ error: err.apiMessage });
      return [];
    }
  },

  /**
   * GET /api/materials/
   */
  fetchMaterials: async () => {
    try {
      const { data } = await api.get(ENDPOINTS.MATERIALS.LIST);
      set({ materials: data });
      return data;
    } catch (err) {
      set({ error: err.apiMessage });
      return [];
    }
  },

  clearProductDetail: () => set({ productDetail: null }),
}));

export default useProductStore;
