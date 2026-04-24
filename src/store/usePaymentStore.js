/**
 * Payment store — Zustand
 */
import { create } from "zustand";
import api from "@/lib/axios";
import ENDPOINTS from "@/lib/endpoints";

const usePaymentStore = create((set) => ({
  paymentData: null, // Razorpay order data from initiate
  isLoading: false,
  error: null,

  /** POST /api/payments/initiate/ — create Razorpay order */
  initiatePayment: async (orderId, method = "cod") => {
    set({ isLoading: true, error: null, paymentData: null });
    try {
      const { data } = await api.post(ENDPOINTS.PAYMENTS.INITIATE, {
        order_id: orderId,
        method,
      });
      set({ paymentData: data, isLoading: false });
      return { success: true, data };
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return { success: false, error: err.apiMessage };
    }
  },

  /** POST /api/payments/verify/ — verify Razorpay signature */
  verifyPayment: async ({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    order_id,
  }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post(ENDPOINTS.PAYMENTS.VERIFY, {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        order_id,
      });
      set({ isLoading: false });
      return { success: true, data };
    } catch (err) {
      set({ error: err.apiMessage, isLoading: false });
      return { success: false, error: err.apiMessage };
    }
  },

  clearPaymentData: () => set({ paymentData: null, error: null }),
}));

export default usePaymentStore;
