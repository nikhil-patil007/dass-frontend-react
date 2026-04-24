import React from "react";
import "@/assets/styles/loader.css";

/**
 * Reusable loader / spinner component.
 *
 * Variants:
 *   - "fullscreen" : centered overlay covering the viewport (app init)
 *   - "page"       : centered within the current page section
 *   - "inline"     : small inline spinner for buttons / cards
 */
export default function Loader({ variant = "page", text = "" }) {
  if (variant === "fullscreen") {
    return (
      <div className="loader-overlay">
        <div className="loader-content">
          <div className="loader-ring">
            <span></span>
          </div>
          {text && <p className="loader-text">{text}</p>}
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span className="loader-inline">
        <span className="loader-dot"></span>
        <span className="loader-dot"></span>
        <span className="loader-dot"></span>
      </span>
    );
  }

  // Default: page variant
  return (
    <div className="loader-page">
      <div className="loader-content">
        <div className="loader-ring">
          <span></span>
        </div>
        {text && <p className="loader-text">{text}</p>}
      </div>
    </div>
  );
}
