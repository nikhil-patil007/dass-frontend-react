/**
 * AppInitializer — runs once on mount to check session status.
 *
 * Calls /api/auth/me/ to see if the HttpOnly cookie is still valid.
 * If yes → populates the auth store with the user.
 * If no  → keeps the user as guest (no redirect).
 *
 * Also syncs guest cart/wishlist to server after auth is confirmed.
 *
 * Shows a fullscreen loader until the auth check completes.
 */

import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useCartStore from "@/store/useCartStore";
import useWishlistStore from "@/store/useWishlistStore";
import Loader from "@/components/Loader";

export default function AppInitializer({ children }) {
  const initialize = useAuthStore((s) => s.initialize);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const fetchCart = useCartStore((s) => s.fetchCart);
  const syncGuestCartToServer = useCartStore((s) => s.syncGuestCartToServer);
  const fetchWishlist = useWishlistStore((s) => s.fetchWishlist);
  const syncGuestWishlistToServer = useWishlistStore(
    (s) => s.syncGuestWishlistToServer,
  );

  // Step 1: Check auth status on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Step 2: Once auth is confirmed, fetch server cart/wishlist + sync guest data
  useEffect(() => {
    if (!isInitialized) return;
    if (isAuthenticated) {
      syncGuestCartToServer().then(() => fetchCart());
      syncGuestWishlistToServer().then(() => fetchWishlist());
    }
  }, [isInitialized, isAuthenticated]);

  // Show loader until auth check is done
  if (!isInitialized) {
    return <Loader variant="fullscreen" />;
  }

  return children;
}
