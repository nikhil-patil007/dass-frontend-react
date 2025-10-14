import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CanvasView from "@/components/CanvasView";
import GridView from "@/components/GridView";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import ProductDetails from "@/pages/ProductDetails";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import products from "@/assets/data/products";
import "@/assets/styles/global.css";
import "aos/dist/aos.css";
import AOS from "aos";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  // const products = useMemo(
  //   () =>
  //     Array.from({ length: 50 }, (_, i) => ({
  //       name: `Plate ${String.fromCharCode(65 + (i % 26))}${i >= 26 ? Math.floor(i / 26) : ""
  //         }`,
  //       description: i % 2 === 0 ? "Beautiful ceramic plate" : "Elegant bowl",
  //       image:
  //         "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
  //       images: [
  //         "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
  //         "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
  //         "https://cdn.prod.website-files.com/677b8a552071e1f09b594a24/67d96efac6037c23fa15d6c4_Light%20Blue%20Sea%20Bowl%2016.webp",
  //       ],
  //       slug: i % 2 === 0 ? "beautiful-ceramic-plate" : "elegant-bowl",
  //     })),
  //   [],
  // );

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<CanvasView products={products} />} />
        <Route path="/experience" element={<Navigate to="/" replace />} />
        <Route path="/collections" element={<GridView products={products} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
