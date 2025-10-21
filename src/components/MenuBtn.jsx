import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import { useWishlist } from "@/context/WishlistContext";
import { useLocation } from "react-router-dom";

const MenuBtn = () => {
  const [menuBtn, setMenuBtn] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);
  const observerRef = useRef(null);
  const toggleMenu = () => setMenuBtn(!menuBtn);
  const { count } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    if (menuBtn) AOS.refresh();
  }, [menuBtn]);

  // Hide the menu bar when footer is ≥20% visible on screen
  useEffect(() => {
    const footerEl = document.querySelector('.site-footer');

    // Reset hidden state when route changes; footer may appear/disappear
    setHideForFooter(false);

    // Clean up previous observer if any
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!footerEl) return; // No footer on this route

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setHideForFooter(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      { threshold: [0, 0.2, 0.5, 1] }
    );

    io.observe(footerEl);
    observerRef.current = io;

    return () => {
      io.disconnect();
      observerRef.current = null;
    };
  }, [location.pathname]);

  return (
    <div
      className={`row-flex menu-bar alc jc-c ${menuBtn ? "" : "inner-flex-smallest"} ${hideForFooter ? 'menu-bar--hidden' : ''}`}
      onClick={toggleMenu}
    >
      <div className={`menu-btn cp ${menuBtn ? "open" : ""}`}>
        <div className={`menu-btn_burger ${menuBtn ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`menu ${menuBtn ? "open" : ""}`}>
        <ul>
          {menuBtn && (
            <>
              <li
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-duration="400"
                data-aos-delay="100"
              >
                <NavLink
                  to="/collections"
                  className={({ isActive }) => (isActive ? "active_page" : "")}
                  end
                >
                  collections
                </NavLink>
              </li>
              <li
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-duration="400"
                data-aos-delay="200"
              >
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "active_page" : "")}
                  end
                >
                  about
                </NavLink>
              </li>
              <li
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-duration="400"
                data-aos-delay="250"
              >
                {count > 0 && <span className="menu-badge">{count}</span>}
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) => (isActive ? "active_page" : "")}
                  end
                >
                  wishlist
                </NavLink>
              </li>
              <li
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-duration="400"
                data-aos-delay="300"
              >
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active_page" : "")}
                  end
                >
                  login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {!menuBtn && (
        <div className="menu-close">
          <ul>
            <li data-aos="bounce-in" data-aos-delay="100">
              <NavLink>menu</NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuBtn;