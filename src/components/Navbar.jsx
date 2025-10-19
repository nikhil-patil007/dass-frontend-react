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

  const toggleView = () => {
    if (isExperienceView) {
      navigate("/collections");
      setIsExperienceView(false)
    } else {
      navigate("/");
      setIsExperienceView(true)
    }
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
        <div className="logo cp"><Link to={'/'}>Dass</Link></div>
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
