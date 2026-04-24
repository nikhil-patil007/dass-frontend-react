/**
 * Order store — Zustand
 */
import { create } from "zustand";
import api from "@/lib/axios";
import ENDPOINTS from "@/lib/endpoints";

const useOrderStore = create((set, get) => ({
  orders: [],
  orderDetail: null,
  isLoading: false,
  error: null,

  /** GET /api/orders/ */
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.ORDERS.LIST);
      set({ orders: data, isLoading: false });
      return data;
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return [];
    }
  },

  /** GET /api/orders/:pk/ */
  fetchOrderDetail: async (pk) => {
    set({ isLoading: true, orderDetail: null, error: null });
    try {
      const { data } = await api.get(ENDPOINTS.ORDERS.DETAIL(pk));
      set({ orderDetail: data, isLoading: false });
      return data;
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return null;
    }
  },

  /** POST /api/orders/create/ */
  createOrder: async ({ shipping_address, notes = "" }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post(ENDPOINTS.ORDERS.CREATE, {
        shipping_address,
        notes,
      });
      set((s) => ({
        orders: [data.order, ...s.orders],
        isLoading: false,
      }));
      return { success: true, order: data.order, message: data.message };
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return { success: false, error: err.apiMessage };
    }
  },

  clearOrderDetail: () => set({ orderDetail: null }),
}));

export default useOrderStore;
