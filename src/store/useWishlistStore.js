import { create } from "zustand";
import api from "@/lib/axios";
import ENDPOINTS from "@/lib/endpoints";

const GUEST_KEY = "wishlistIds";
const readGuest = () => { try { return JSON.parse(localStorage.getItem(GUEST_KEY)) || []; } catch { return []; } };
const writeGuest = (ids) => { try { localStorage.setItem(GUEST_KEY, JSON.stringify(ids)); } catch {} };

const useWishlistStore = create((set, get) => ({
  wishlistItems: [],
  guestIds: readGuest(),
  isLoading: false,
  error: null,

  getWishlistCount: () => get().wishlistItems.length || get().guestIds.length,

  hasProduct: (pid) => {
    const { wishlistItems, guestIds } = get();
    if (wishlistItems.length) return wishlistItems.some(i => String(i.product?.id || i.product_id) === String(pid));
    return guestIds.some(id => String(id) === String(pid));
  },

  fetchWishlist: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.WISHLIST.LIST);
      set({ wishlistItems: data, isLoading: false });
      return data;
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return [];
    }
  },

  addToWishlist: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post(ENDPOINTS.WISHLIST.ADD, { product_id: productId });
      await get().fetchWishlist();
      set({ isLoading: false });
      return { success: true, message: data.message };
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return { success: false, error: err.apiMessage };
    }
  },

  removeFromWishlist: async (wishlistItemId) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(ENDPOINTS.WISHLIST.REMOVE(wishlistItemId));
      set(s => ({ wishlistItems: s.wishlistItems.filter(i => i.id !== wishlistItemId), isLoading: false }));
      return { success: true };
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return { success: false, error: err.apiMessage };
    }
  },

  toggleWishlist: async (productId) => {
    const { wishlistItems, addToWishlist, removeFromWishlist } = get();
    const existing = wishlistItems.find(i => String(i.product?.id || i.product_id) === String(productId));
    return existing ? removeFromWishlist(existing.id) : addToWishlist(productId);
  },

  toggleGuestWishlist: (id) => set(s => {
    const exists = s.guestIds.some(x => String(x) === String(id));
    const ids = exists ? s.guestIds.filter(x => String(x) !== String(id)) : [...s.guestIds, id];
    writeGuest(ids);
    return { guestIds: ids };
  }),

  clearGuestWishlist: () => { writeGuest([]); set({ guestIds: [] }); },

  syncGuestWishlistToServer: async () => {
    const { guestIds, addToWishlist, clearGuestWishlist } = get();
    if (!guestIds.length) return;
    for (const id of guestIds) await addToWishlist(id);
    clearGuestWishlist();
  },
}));

export default useWishlistStore;
