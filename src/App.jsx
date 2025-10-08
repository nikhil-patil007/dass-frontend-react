import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CanvasView from "./components/CanvasView";
import GridView from "./components/GridView";
import "./assets/styles/global.css";

function App() {
  const [viewMode, setViewMode] = useState("canvas"); // "canvas" or "grid"

  // Dummy data
  const images = [
    "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
    "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
    "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
    "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
    "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
    "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
    "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
  ];

  const products = [
    { name: "Plate A", description: "Beautiful ceramic plate", image: "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp" },
    { name: "Plate B", description: "Elegant bowl", image: "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp" },
    { name: "Plate c", description: "Beautiful ceramic plate", image: "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp" },
    { name: "Plate D", description: "Elegant bowl", image: "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp" },
    { name: "Plate E", description: "Beautiful ceramic plate", image: "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp" },
    { name: "Plate F", description: "Elegant bowl", image: "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp" },
  ];

  return (
    <div className="App">
      <Navbar onToggleView={setViewMode} viewMode={viewMode} />
      {viewMode === "canvas" ? (
        <CanvasView images={images} />
      ) : (
        <GridView products={products} />
      )}
    </div>
  );
}

export default App;
