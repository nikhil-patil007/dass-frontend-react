import React from "react";
import "../assets/styles/nav.css";

export default function Navbar({ onToggleView, viewMode }) {
  return (
    <nav className="navbar">
      <div className="logo">Dass {viewMode}</div>
      <div className="links">
        <button onClick={() => onToggleView("canvas")}>Experience</button>
        <button onClick={() => onToggleView("grid")}>Collections</button>
      </div>
    </nav>
  );
}
