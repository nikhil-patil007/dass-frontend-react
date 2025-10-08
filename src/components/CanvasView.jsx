import React from "react";
import "../assets/styles/canvas.css";

export default function CanvasView({ images }) {

  return (
    <div className="canvas-wrapper">
      {images.map((img, i) => (
        <img key={i} src={img} alt={`plate-${i}`} className="floating-img" />
      ))}
    </div>
  );
}
