/**
 * ProtectedRoute — wraps routes that require authentication.
 *
 * Waits for the auth store to initialize (the /me check),
 * then either renders children or redirects to /login.
 */

import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isLoading = useAuthStore((s) => s.isLoading);
  const location = useLocation();

  // Still checking cookie-based session — show nothing (or a spinner)
  if (!isInitialized || isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <span className="loader" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve the intended destination so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
