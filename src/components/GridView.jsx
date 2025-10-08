import React from "react";
import "../assets/styles/grid.css"

export default function GridView({ products }) {
  return (
    <div className="grid-wrapper">
      {products.map((p, i) => (
        <div className="grid-item" key={i}>
          <img src={p.image} alt={p.name} />
          <div className="info">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
