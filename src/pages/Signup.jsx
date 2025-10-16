import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { gsap } from "gsap";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
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

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      shake();
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      shake();
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      // TODO: integrate real signup
      // navigate("/login");
    } catch (err) {
      setError("Unable to create account. Try again.");
      shake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Join us"
      headingLines={["Create your", "account today."]}
      subtext="Join our community and save your favorites, track orders, and get curated drops."
      footer={
        <div className="auth-helper">
          <span className="auth-secondary-link">Already have an account?</span>
          <Link to="/login" className="auth-secondary-link" aria-label="Go to login">
            Sign in
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <h2>Sign up</h2>
        {error ? <div className="auth-error" role="alert">{error}</div> : null}
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <div className="input-wrap">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>
        </div>
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
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="6" y="10" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5"/>
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
          <button className="auth-cta" type="submit" disabled={loading} aria-busy={loading}>
            {loading ? "Creating…" : "Create account"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
