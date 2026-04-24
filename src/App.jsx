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
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import "@/assets/styles/global.css";
import "aos/dist/aos.css";
import AOS from "aos";
import MenuBtn from "./components/MenuBtn";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";
import Footer from "@/components/Footer";
import useProductStore from "@/store/useProductStore";

function App() {
  const [winWidth, setWinWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  // Fetch products from backend API on mount
  const products = useProductStore((s) => s.products);
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    // Fetch all products from backend
    fetchProducts();
  }, [fetchProducts]);

  const location = useLocation();

  // Track viewport width to control footer visibility on product pages
  useEffect(() => {
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
        <div className="App">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<CanvasView products={products} />} />
            <Route path="/experience" element={<Navigate to="/" replace />} />
            <Route
              path="/collections"
              element={<GridView products={products} />}
            />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/products/:slug"
              element={<ProductDetails />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/wishlist"
              element={<ProtectedRoute><Wishlist /></ProtectedRoute>}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MenuBtn />
          {(() => {
            const isCanvas = location.pathname === "/";
            const isProductDetail = location.pathname.startsWith("/products/");
            const isDesktop = winWidth > 991; // >991 hides footer on product detail
            const isAuth =
              location.pathname === "/login" || location.pathname === "/signup";
            {
              /* const showFooter = !isCanvas && !isAuth && !(isProductDetail && isDesktop); */
            }
            const showFooter = !isCanvas && !isAuth;
            return showFooter ? <Footer /> : null;
          })()}
        </div>
  );
}

export default App;
