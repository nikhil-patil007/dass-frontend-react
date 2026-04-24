/**
 * Cart store — Zustand
 *
 * Manages server-side cart for authenticated users.
 * Falls back to localStorage for guests (preserves current behaviour).
 */

import { create } from "zustand";
import api from "@/lib/axios";
import ENDPOINTS from "@/lib/endpoints";

const GUEST_STORAGE_KEY = "cartItems";

const readGuestCart = () => {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeGuestCart = (items) => {
  try {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* noop */
  }
};

const useCartStore = create((set, get) => ({
  // ── State ───────────────────────────────────────────────────────────
  cart: null, // Full cart object from API ({ id, items: [...], ... })
  guestItems: readGuestCart(), // [{id, qty}] — for unauthenticated users
  isLoading: false,
  error: null,

  // ── Computed-like helpers ────────────────────────────────────────────
  getCartCount: () => {
    const { cart, guestItems } = get();
    if (cart?.items) {
      return cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    }
    return guestItems.reduce((sum, item) => sum + (item.qty || 0), 0);
  },

  getCartItems: () => {
    const { cart, guestItems } = get();
    return cart?.items || guestItems;
  },

  // ── Server-side (authenticated) ─────────────────────────────────────

  /** GET /api/carts/ */
  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.CART.DETAIL);
      set({ cart: data, isLoading: false });
      return data;
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return null;
    }
  },

  /** POST /api/carts/add/ */
  addToCart: async (productId, quantity = 1) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post(ENDPOINTS.CART.ADD, {
        product_id: productId,
        quantity,
      });
      set({ cart: data.cart, isLoading: false });
      return { success: true, message: data.message };
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return { success: false, error: err.apiMessage };
    }
  },

  /** PUT /api/carts/items/:itemId/ */
  updateCartItem: async (itemId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.put(ENDPOINTS.CART.UPDATE_ITEM(itemId), {
        quantity,
      });
      set({ cart: data.cart, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return { success: false, error: err.apiMessage };
    }
  },

  /** DELETE /api/carts/items/:itemId/remove/ */
  removeCartItem: async (itemId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.delete(ENDPOINTS.CART.REMOVE_ITEM(itemId));
      set({ cart: data.cart, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return { success: false, error: err.apiMessage };
    }
  },

  /** DELETE /api/carts/clear/ */
  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.delete(ENDPOINTS.CART.CLEAR);
      set({ cart: data.cart, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return { success: false };
    }
  },

  // ── Guest helpers (localStorage) ────────────────────────────────────

  addGuestItem: (id, qty = 1) =>
    set((state) => {
      const items = [...state.guestItems];
      const idx = items.findIndex((p) => String(p.id) === String(id));
      if (idx >= 0) {
        items[idx] = { ...items[idx], qty: (items[idx].qty || 0) + qty };
      } else {
        items.push({ id, qty });
      }
      writeGuestCart(items);
      return { guestItems: items };
    }),

  removeGuestItem: (id) =>
    set((state) => {
      const items = state.guestItems.filter(
        (p) => String(p.id) !== String(id),
      );
      writeGuestCart(items);
      return { guestItems: items };
    }),

  updateGuestItemQty: (id, qty) =>
    set((state) => {
      const items = state.guestItems
        .map((p) => (String(p.id) === String(id) ? { ...p, qty } : p))
        .filter((p) => p.qty > 0);
      writeGuestCart(items);
      return { guestItems: items };
    }),

  clearGuestCart: () => {
    writeGuestCart([]);
    set({ guestItems: [] });
  },

  /** After login, merge guest cart into server cart. */
  syncGuestCartToServer: async () => {
    const { guestItems, addToCart, fetchCart, clearGuestCart } = get();
    if (!guestItems.length) return;

    for (const item of guestItems) {
      await addToCart(item.id, item.qty);
    }
    clearGuestCart();
    await fetchCart();
  },
}));

export default useCartStore;
