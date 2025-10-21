import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CanvasView from "@/components/CanvasView";
import GridView from "@/components/GridView";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import ProductDetails from "@/pages/ProductDetails";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import products from "@/assets/data/products";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import "@/assets/styles/global.css";
import "aos/dist/aos.css";
import AOS from "aos";
import MenuBtn from "./components/MenuBtn";
import ScrollToTop from "./components/ScrollToTop";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import Footer from "@/components/Footer";

function App() {
  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const location = useLocation();

  // Track viewport width to control footer visibility on product pages
  useEffect(() => {
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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
    <WishlistProvider>
      <CartProvider>
        <div className="App">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<CanvasView products={products} />} />
            <Route path="/experience" element={<Navigate to="/" replace />} />
            <Route path="/collections" element={<GridView products={products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products/:slug" element={<ProductDetails products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/wishlist" element={<Wishlist products={products} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MenuBtn />
          {(() => {
            const isCanvas = location.pathname === "/";
            const isProductDetail = location.pathname.startsWith("/products/");
            const isDesktop = winWidth > 991; // >991 hides footer on product detail
            const isAuth = location.pathname === "/login" || location.pathname === "/signup";
            const showFooter = !isCanvas && !isAuth && !(isProductDetail && isDesktop);
            return showFooter ? <Footer /> : null;
          })()}
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
