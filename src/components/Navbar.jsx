import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "@/assets/styles/nav.css";
import ToggleButton from "./navbar/ToggleButton";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { count } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isExperienceView, setIsExperienceView] = useState(location.pathname === "/" || location.pathname === "/experience")

  let showViewBtn = location.pathname === "/" || location.pathname === "/experience";

  const isTransitioningRef = useRef(false);

  const animateCanvasExit = () => {
    // Scale out each visible canvas item individually (not the whole surface)
    const items = document.querySelectorAll(".canvas-item");
    if (!items || items.length === 0) return Promise.resolve();
    return new Promise((resolve) => {
      // ensure transformOrigin center for a clean shrink
      gsap.set(items, { transformOrigin: "50% 50%" });
      gsap.to(items, {
        scale: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: resolve,
      });
    });
  };

  const animateGridExit = () => {
    const imgs = document.querySelectorAll(".grid-item img");
    const texts = document.querySelectorAll(".grid-item .info");
    if ((!imgs || imgs.length === 0) && (!texts || texts.length === 0)) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: resolve });
      tl.to(texts, { opacity: 0, y: 20, duration: 0.35, ease: "power2.inOut" }, 0)
        .to(imgs, { scale: 0, duration: 0.5, ease: "power3.inOut" }, 0);
    });
  };

  const toggleView = async () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    // Run exit animation for current view BEFORE route change
    if (isExperienceView) {
      await animateCanvasExit();
      // Mark that grid should play an intro animation on entry
      try { sessionStorage.setItem("gridIntro", "1"); } catch { }
      navigate("/collections");
      setIsExperienceView(false);
    } else {
      await animateGridExit();
      navigate("/");
      setIsExperienceView(true);
    }

    // Small safety delay to avoid accidental double clicks
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 100);
  };

  const textContainerRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    if (!textContainerRef.current) return;
    const [text, textHover] = textContainerRef.current.children;

    tl.current = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power2.out" },
    });

    tl.current
      .to(text, { y: -24, opacity: 0 }, 0)
      .fromTo(textHover, { y: 24, opacity: 0 }, { y: 0, opacity: 1 }, 0.1);
  }, []);

  useEffect(() => {
    setIsExperienceView(location.pathname === "/" || location.pathname === "/experience")
  }, [location])

  const handleMouseEnter = () => tl.current?.play();
  const handleMouseLeave = () => tl.current?.reverse();

  return (
    <>
      <nav className="navbar">
        <div >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <span className="logo cp" style={{ lineHeight: 1 }}>HOUSE OF</span>
            <span className="logo cp" style={{ lineHeight: 1, marginTop: 2 }}>DASS</span>
          </Link>
        </div>

        <div className="nav-cart-link">
          <Link to="/cart" className="nav-cart-inner">
            <span className="nav-cart-text">Cart</span>
            <svg className="nav-cart-icon" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6h14l-1.5 9h-11z" fill="currentColor" />
              <circle cx="9" cy="19" r="1.5" fill="currentColor" />
              <circle cx="17" cy="19" r="1.5" fill="currentColor" />
            </svg>
            {count > 0 && <span className="nav-cart-badge">{count}</span>}
          </Link>
        </div>

      </nav>
      {(location.pathname === "/" || location.pathname === "/collections") &&
        <div className="toggle-center-wrapper" onClick={() => { toggleView() }} >
          <ToggleButton isExperienceView={isExperienceView}></ToggleButton>
        </div>
      }
    </>
  );
}
