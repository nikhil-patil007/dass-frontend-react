import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "@/assets/styles/nav.css";
import ToggleButton from "./navbar/ToggleButton";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isExperienceView =
    location.pathname === "/" || location.pathname === "/experience";

  const toggleView = () => {
    if (isExperienceView) {
      navigate("/collections");
    } else {
      navigate("/");
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

  const handleMouseEnter = () => tl.current?.play();
  const handleMouseLeave = () => tl.current?.reverse();

  return (
    <nav className="navbar">
      <div className="logo">Dass</div>

      <div className="toggle-center-wrapper">
        <ToggleButton></ToggleButton>
      </div>
    </nav>
  );
}
