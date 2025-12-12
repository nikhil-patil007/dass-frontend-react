import React from "react";

export default function SplitHoverText({ text = "", className = "" }) {
  const letters = Array.from(text).map((ch) => (ch === " " ? "\u00A0" : ch));
  //   console.log(letters);
  return (
    <span className={`split-hover ${className}`} aria-hidden="true">
      <span className="split-line split-line--top">
        {letters.map((ch, i) => (
          <span className="char" style={{ "--i": i }} key={`top-${i}`}>
            {ch}
          </span>
        ))}
      </span>
      <span className="split-line split-line--bottom">
        {letters.map((ch, i) => (
          <span className="char" style={{ "--i": i }} key={`bot-${i}`}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
