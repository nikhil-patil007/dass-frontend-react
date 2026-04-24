import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { gsap } from "gsap";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isLoading } = useAuthStore();

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const shake = () => {
    gsap.fromTo(
      ".auth-form",
      { x: -6 },
      { x: 0, duration: 0.3, ease: "power2.out", repeat: 1, yoyo: true },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("Please enter username and password.");
      shake();
      return;
    }

    const result = await login({
      username: form.username,
      password: form.password,
    });

    if (result.success) {
      toast.success("Welcome back!");
      // Redirect to where the user was trying to go, or home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Something went wrong. Try again.");
      shake();
    }
  };

  return (
    <AuthLayout
      eyebrow="Account"
      headingLines={["Welcome back,", "let's get you in."]}
      subtext="Access your cart, order history and personalized recommendations."
      footer={
        <div className="auth-helper">
          <span className="auth-secondary-link auth-secondary-link-none ">
            New here?
          </span>
          <Link
            to="/signup"
            className="auth-secondary-link"
            aria-label="Go to signup"
          >
            Create an account
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <h2>Sign in</h2>
        {error ? (
          <div className="auth-error" role="alert">
            {error}
          </div>
        ) : null}
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <div className="input-wrap">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="8"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M4 20a8 8 0 0 1 16 0"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="your_username"
              value={form.username}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <div className="input-wrap">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="6"
                y="10"
                width="12"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M9 10V8a3 3 0 0 1 6 0v2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="auth-actions">
          <label className="auth-helper">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={onChange}
            />
            <span>Remember me</span>
          </label>
          <button
            className="auth-cta"
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
