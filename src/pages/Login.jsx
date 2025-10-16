import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { gsap } from "gsap";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const shake = () => {
    gsap.fromTo(
      ".auth-form",
      { x: -6 },
      { x: 0, duration: 0.3, ease: "power2.out", repeat: 1, yoyo: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      shake();
      return;
    }

    try {
      setLoading(true);
      // Fake delay to show button animation
      await new Promise((r) => setTimeout(r, 800));
      // TODO: integrate real auth
      // navigate("/");
    } catch (err) {
      setError("Something went wrong. Try again.");
      shake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Account"
      headingLines={["Welcome back,", "let's get you in."]}
      subtext="Access your cart, order history and personalized recommendations."
      footer={
        <div className="auth-helper">
          <span className="auth-secondary-link">New here?</span>
          <Link to="/signup" className="auth-secondary-link" aria-label="Go to signup">
            Create an account
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <h2>Sign in</h2>
        {error ? <div className="auth-error" role="alert">{error}</div> : null}
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <div className="input-wrap">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
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
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="6" y="10" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5"/>
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
          <button className="auth-cta" type="submit" disabled={loading} aria-busy={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
