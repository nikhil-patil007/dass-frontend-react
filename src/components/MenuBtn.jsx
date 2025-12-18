import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useLocation } from "react-router-dom";

const MenuBtn = () => {
  const [menuBtn, setMenuBtn] = useState(false);
  const [filterBtn, setFilterBtn] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [filterMounted, setFilterMounted] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);
  const observerRef = useRef(null);
  const menuCloseTimerRef = useRef(null);
  const filterCloseTimerRef = useRef(null);
  const CLOSE_ANIMATION_MS = 600;

  const openMenu = () => {
    if (menuCloseTimerRef.current) {
      clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
    setMenuMounted(true);
    setMenuBtn(true);
  };

  const openFilter = () => {
    if (filterCloseTimerRef.current) {
      clearTimeout(filterCloseTimerRef.current);
      filterCloseTimerRef.current = null;
    }
    setFilterMounted(true);
    setFilterBtn(true);
  };

  const closeMenuAnimated = (onClosed) => {
    if (!menuBtn && !menuMounted) {
      onClosed?.();
      return;
    }

    setMenuBtn(false);

    if (menuCloseTimerRef.current) {
      clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }

    // Keep contents mounted long enough for the CSS transition to play.
    menuCloseTimerRef.current = setTimeout(() => {
      setMenuMounted(false);
      menuCloseTimerRef.current = null;
      onClosed?.();
    }, CLOSE_ANIMATION_MS);
  };

  const closeFilterAnimated = (onClosed) => {
    if (!filterBtn && !filterMounted) {
      onClosed?.();
      return;
    }

    setFilterBtn(false);

    if (filterCloseTimerRef.current) {
      clearTimeout(filterCloseTimerRef.current);
      filterCloseTimerRef.current = null;
    }

    filterCloseTimerRef.current = setTimeout(() => {
      setFilterMounted(false);
      filterCloseTimerRef.current = null;
      onClosed?.();
    }, CLOSE_ANIMATION_MS);
  };

  const toggleMenu = () => {
    if (menuBtn) {
      closeMenuAnimated();
      return;
    }

    // If filter is open/closing, close it first, then open menu.
    if (filterBtn || filterMounted) {
      closeFilterAnimated(openMenu);
      return;
    }

    openMenu();
  };

  const toggleFilter = () => {
    if (filterBtn) {
      closeFilterAnimated();
      return;
    }

    // If menu is open/closing, close it first, then open filter.
    if (menuBtn || menuMounted) {
      closeMenuAnimated(openFilter);
      return;
    }

    openFilter();
  };
  const { count } = useWishlist();
  const { count: cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (menuBtn || filterBtn) AOS.refresh();
  }, [menuBtn, filterBtn]);

  useEffect(() => {
    return () => {
      if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current);
      if (filterCloseTimerRef.current)
        clearTimeout(filterCloseTimerRef.current);
    };
  }, []);

  // Hide the menu bar when footer is ≥20% visible on screen
  useEffect(() => {
    const footerEl = document.querySelector(".site-footer");

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
        setHideForFooter(
          entry.isIntersecting && entry.intersectionRatio >= 0.2
        );
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
      className={`row-flex menu-bar alc jc-c inner-flex-small ${
        hideForFooter ? "menu-bar--hidden" : ""
      }`}
    >
      <div
        onClick={toggleMenu}
        className={`row-flex alc jc-c menu-bar__group ${
          menuBtn || menuMounted ? "" : "inner-flex-smallest"
        }`}
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
            {menuMounted && (
              <>
                <li
                  data-aos="fade-up"
                  data-aos-anchor-placement="bottom-bottom"
                  data-aos-duration="400"
                  data-aos-delay="100"
                >
                  <NavLink
                    to="/collections"
                    className={({ isActive }) =>
                      isActive ? "active_page" : ""
                    }
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
                    className={({ isActive }) =>
                      isActive ? "active_page" : ""
                    }
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
                    className={({ isActive }) =>
                      isActive ? "active_page" : ""
                    }
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
                  {cartCount > 0 && (
                    <span className="menu-badge">{cartCount}</span>
                  )}
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive ? "active_page" : ""
                    }
                    end
                  >
                    cart
                  </NavLink>
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-anchor-placement="bottom-bottom"
                  data-aos-duration="400"
                  data-aos-delay="350"
                >
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active_page" : ""
                    }
                    end
                  >
                    login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {!menuMounted && (
          <div className="menu-close">
            <ul>
              <li data-aos="bounce-in" data-aos-delay="100">
                <NavLink>menu</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div
        className={`row-flex alc jc-c ${
          filterBtn || filterMounted ? "" : "inner-flex-smallest"
        } menu-bar__group ${
          location.pathname != "/" ? "menu-bar menu-bar--hidden" : ""
        }`}
        onClick={toggleFilter}
      >
        <div className={`filter-btn menu-btn cp ${filterBtn ? "open" : ""}`}>
          <div
            className={`filter-btn menu-btn_burger ${filterBtn ? "open" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`filter menu ${filterBtn ? "open" : ""}`}>
          <ul>
            {filterMounted && (
              <>
                <li
                  data-aos="fade-up"
                  data-aos-anchor-placement="bottom-bottom"
                  data-aos-duration="400"
                  data-aos-delay="100"
                >
                  <NavLink
                  // className={({ isActive }) =>
                  //   isActive ? "active_page" : ""
                  // }
                  >
                    ring
                  </NavLink>
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-anchor-placement="bottom-bottom"
                  data-aos-duration="400"
                  data-aos-delay="100"
                >
                  <NavLink
                  // className={({ isActive }) =>
                  //   isActive ? "active_page" : ""
                  // }
                  >
                    necklace
                  </NavLink>
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-anchor-placement="bottom-bottom"
                  data-aos-duration="400"
                  data-aos-delay="100"
                >
                  <NavLink>earrings</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {!filterMounted && (
          <div className="filter-close menu-close">
            <ul>
              <li data-aos="bounce-in" data-aos-delay="100">
                <NavLink>filter</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBtn;
