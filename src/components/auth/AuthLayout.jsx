import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "@/assets/styles/auth.css";

export default function AuthLayout({ headingLines = [], subtext, children, footer, eyebrow }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      // Slow down initial animation slightly
      tl.timeScale(0.7);
  tl.set([".auth-eyebrow", ".auth-left .line", ".auth-accent", ".auth-form", ".auth-footer"], { opacity: 0, y: 20 });
      tl.to(".auth-eyebrow", { opacity: 1, y: 0, duration: 0.5 }, 0.05);
      tl.to(".auth-left .line", { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "<0.05");
      tl.to(".auth-accent", { opacity: 1, y: 0, duration: 0.5 }, "<0.05");
  tl.to(".auth-form", { opacity: 1, y: 0, duration: 0.8 }, "<0.1");
  tl.to(".auth-footer", { opacity: 1, y: 0, duration: 0.5 }, "<0.05");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="auth-section" ref={rootRef}>
      <div className="auth-container main-container">
        <div className="auth-grid">
          <div className="auth-left">
            {eyebrow ? (
              <div className="auth-eyebrow" aria-hidden="true">{eyebrow}</div>
            ) : null}
            <h1 className="auth-headline" aria-live="polite">
              {headingLines.map((text, idx) => (
                <span className="line" key={idx}>
                  {text}
                </span>
              ))}
            </h1>
            <span className="auth-accent" aria-hidden="true" />
            {subtext ? <p className="auth-subtext">{subtext}</p> : null}
          </div>
          <div className="auth-right">
            <div className="auth-form" role="form">
              {children}
              {footer ? <div className="auth-footer">{footer}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
