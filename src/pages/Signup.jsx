import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { gsap } from "gsap";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { register, isLoading } = useAuthStore();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
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

    if (!form.username || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      shake();
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      shake();
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      shake();
      return;
    }

    const result = await register({
      username: form.username,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      password: form.password,
      password2: form.confirm,
    });

    if (result.success) {
      toast.success("Account created successfully!");
      navigate("/", { replace: true });
    } else {
      setError(result.error || "Unable to create account. Try again.");
      shake();
    }
  };

  return (
    <AuthLayout
      eyebrow="Join us"
      headingLines={["Create your", "account today."]}
      subtext="Join our community and save your favorites, track orders, and get curated drops."
      footer={
        <div className="auth-helper">
          <span className="auth-secondary-link auth-secondary-link-none">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="auth-secondary-link"
            aria-label="Go to login"
          >
            Sign in
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <h2>Sign up</h2>
        {error ? (
          <div className="auth-error" role="alert">
            {error}
          </div>
        ) : null}
        <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="first_name">First Name</label>
            <div className="input-wrap">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                value={form.first_name}
                onChange={onChange}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="last_name">Last Name</label>
            <div className="input-wrap">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                value={form.last_name}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
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
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="janedoe"
              value={form.username}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <div className="input-wrap">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
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
              <rect x="6" y="10" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="confirm">Confirm password</label>
          <div className="input-wrap">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="6" y="10" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="auth-actions">
          <span />
          <button
            className="auth-cta"
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Creating…" : "Create account"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
