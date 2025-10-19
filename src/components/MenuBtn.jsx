import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import { useWishlist } from "@/context/WishlistContext";

const MenuBtn = () => {
  const [menuBtn, setMenuBtn] = useState(false);
  const toggleMenu = () => setMenuBtn(!menuBtn);
  const { count } = useWishlist();

  useEffect(() => {
    if (menuBtn) AOS.refresh();
  }, [menuBtn]);

  return (
    <div
      className={`row-flex menu-bar alc jc-c ${menuBtn ? "" : "inner-flex-smallest"
        }`}
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
              {/* <li
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-duration="400"
                data-aos-delay="300"
              >
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active_page" : "")}
                  end
                >
                  contact
                </NavLink>
              </li> */}
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