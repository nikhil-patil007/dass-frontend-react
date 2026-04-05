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
  const [isExperienceView, setIsExperienceView] = useState(
    location.pathname === "/" || location.pathname === "/experience",
  );

  let showViewBtn =
    location.pathname === "/" || location.pathname === "/experience";

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
      tl.to(
        texts,
        { opacity: 0, y: 20, duration: 0.35, ease: "power2.inOut" },
        0,
      ).to(imgs, { scale: 0, duration: 0.5, ease: "power3.inOut" }, 0);
    });
  };

  const toggleView = async () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    // Run exit animation for current view BEFORE route change
    if (isExperienceView) {
      await animateCanvasExit();
      // Mark that grid should play an intro animation on entry
      try {
        sessionStorage.setItem("gridIntro", "1");
      } catch {}
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
    setIsExperienceView(
      location.pathname === "/" || location.pathname === "/experience",
    );
  }, [location]);

  const handleMouseEnter = () => tl.current?.play();
  const handleMouseLeave = () => tl.current?.reverse();

  return (
    <>
      <nav
        // className={`navbar ${location.pathname === "/" || (window.innerWidth > 991 && location.pathname.includes("/products")) ? "navbar-fix" : ""}`}
        className={`navbar ${location.pathname === "/" || !location.pathname.includes("/products") ? "navbar-fix" : ""}`}
      >
        <div className="logo-wrapper">
          <Link
            to="/"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "start",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {/* <span className="logo cp" style={{ lineHeight: 1 }}>
              HOUSE OF
            </span>
            <span className="logo cp" style={{ lineHeight: 1, marginTop: 2 }}>
              DASS
            </span> */}
            {/* <svg
              style={{ width: 180 }}
              id="Layer_2"
              data-name="Layer 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 731.92 362.95"
            >
              <g id="Layer_1-2" data-name="Layer 1">
                <g>
                  <g>
                    <text class="cls-4" transform="translate(320.34 272.87)">
                      <tspan x="0" y="0">
                        House{" "}
                      </tspan>
                      <tspan class="cls-7" x="76.54" y="0">
                        o
                      </tspan>
                      <tspan x="90.62" y="0">
                        f
                      </tspan>
                    </text>
                    <text class="cls-5" transform="translate(322.23 359.61)">
                      <tspan x="0" y="0">
                        Luxury Jewels
                      </tspan>
                    </text>
                    <text class="cls-6" transform="translate(270.78 335.43)">
                      <tspan class="cls-1" x="0" y="0">
                        D
                      </tspan>
                      <tspan class="cls-8" x="47.68" y="0">
                        A
                      </tspan>
                      <tspan class="cls-1" x="98.06" y="0">
                        A
                      </tspan>
                      <tspan x="148.66" y="0">
                        S
                      </tspan>
                    </text>
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="365.96"
                      y1="123.7"
                      x2="365.96"
                      y2="101.71"
                    />
                    <line
                      class="cls-3"
                      x1="365.96"
                      y1="89.21"
                      x2="365.96"
                      y2="74.42"
                    />
                    <line
                      class="cls-3"
                      x1="365.96"
                      y1="171.83"
                      x2="365.96"
                      y2="136.77"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="313.35"
                      y1="62.31"
                      x2="308.47"
                      y2="34.62"
                    />
                    <line
                      class="cls-3"
                      x1="305.69"
                      y1="18.88"
                      x2="302.41"
                      y2=".26"
                    />
                    <line
                      class="cls-3"
                      x1="324.04"
                      y1="122.91"
                      x2="316.25"
                      y2="78.77"
                    />
                    <line
                      class="cls-3"
                      x1="340.71"
                      y1="217.46"
                      x2="327.21"
                      y2="140.89"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="284.91"
                      y1="137.99"
                      x2="277.39"
                      y2="117.33"
                    />
                    <line
                      class="cls-3"
                      x1="273.12"
                      y1="105.58"
                      x2="268.06"
                      y2="91.68"
                    />
                    <line
                      class="cls-3"
                      x1="301.38"
                      y1="183.22"
                      x2="289.38"
                      y2="150.27"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="214.48"
                      y1="98.29"
                      x2="200.42"
                      y2="73.95"
                    />
                    <line
                      class="cls-3"
                      x1="192.43"
                      y1="60.1"
                      x2="182.98"
                      y2="43.73"
                    />
                    <line
                      class="cls-3"
                      x1="245.25"
                      y1="151.59"
                      x2="222.84"
                      y2="112.77"
                    />
                    <line
                      class="cls-3"
                      x1="293.26"
                      y1="234.74"
                      x2="254.38"
                      y2="167.4"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="213.64"
                      y1="179.14"
                      x2="199.51"
                      y2="162.29"
                    />
                    <line
                      class="cls-3"
                      x1="191.47"
                      y1="152.71"
                      x2="181.97"
                      y2="141.39"
                    />
                    <line
                      class="cls-3"
                      x1="244.58"
                      y1="216.01"
                      x2="222.05"
                      y2="189.15"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="133.88"
                      y1="165.92"
                      x2="112.35"
                      y2="147.85"
                    />
                    <line
                      class="cls-3"
                      x1="100.1"
                      y1="137.58"
                      x2="85.62"
                      y2="125.43"
                    />
                    <line
                      class="cls-3"
                      x1="181.03"
                      y1="205.48"
                      x2="146.69"
                      y2="176.67"
                    />
                    <line
                      class="cls-3"
                      x1="254.57"
                      y1="267.2"
                      x2="195.01"
                      y2="217.22"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="160.74"
                      y1="242.18"
                      x2="141.7"
                      y2="231.18"
                    />
                    <line
                      class="cls-3"
                      x1="130.87"
                      y1="224.93"
                      x2="118.07"
                      y2="217.54"
                    />
                    <line
                      class="cls-3"
                      x1="202.43"
                      y1="266.25"
                      x2="172.07"
                      y2="248.72"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="81.27"
                      y1="257.04"
                      x2="54.86"
                      y2="247.43"
                    />
                    <line
                      class="cls-3"
                      x1="39.83"
                      y1="241.96"
                      x2="22.07"
                      y2="235.49"
                    />
                    <line
                      class="cls-3"
                      x1="139.1"
                      y1="278.09"
                      x2="96.98"
                      y2="262.76"
                    />
                    <line
                      class="cls-3"
                      x1="229.32"
                      y1="310.93"
                      x2="156.26"
                      y2="284.34"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="132.6"
                      y1="319.51"
                      x2="110.94"
                      y2="315.69"
                    />
                    <line
                      class="cls-3"
                      x1="98.63"
                      y1="313.52"
                      x2="84.07"
                      y2="310.95"
                    />
                    <line
                      class="cls-3"
                      x1="180"
                      y1="327.87"
                      x2="145.47"
                      y2="321.78"
                    />
                  </g>
                  <g>
                    <g>
                      <line
                        class="cls-3"
                        x1="63"
                        y1="360.66"
                        x2="34.89"
                        y2="360.66"
                      />
                      <line class="cls-3" x1="18.9" y1="360.66" y2="360.66" />
                      <line
                        class="cls-3"
                        x1="124.55"
                        y1="360.66"
                        x2="79.72"
                        y2="360.66"
                      />
                      <line
                        class="cls-3"
                        x1="220.56"
                        y1="360.66"
                        x2="142.8"
                        y2="360.66"
                      />
                    </g>
                    <g>
                      <line
                        class="cls-3"
                        x1="668.91"
                        y1="360.66"
                        x2="697.03"
                        y2="360.66"
                      />
                      <line
                        class="cls-3"
                        x1="713.01"
                        y1="360.66"
                        x2="731.92"
                        y2="360.66"
                      />
                      <line
                        class="cls-3"
                        x1="607.37"
                        y1="360.66"
                        x2="652.2"
                        y2="360.66"
                      />
                      <line
                        class="cls-3"
                        x1="511.36"
                        y1="360.66"
                        x2="589.11"
                        y2="360.66"
                      />
                    </g>
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="599.32"
                      y1="319.51"
                      x2="620.97"
                      y2="315.69"
                    />
                    <line
                      class="cls-3"
                      x1="633.29"
                      y1="313.52"
                      x2="647.85"
                      y2="310.95"
                    />
                    <line
                      class="cls-3"
                      x1="551.91"
                      y1="327.87"
                      x2="586.44"
                      y2="321.78"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="650.64"
                      y1="257.04"
                      x2="677.06"
                      y2="247.43"
                    />
                    <line
                      class="cls-3"
                      x1="692.08"
                      y1="241.96"
                      x2="709.85"
                      y2="235.49"
                    />
                    <line
                      class="cls-3"
                      x1="592.81"
                      y1="278.09"
                      x2="634.94"
                      y2="262.76"
                    />
                    <line
                      class="cls-3"
                      x1="502.59"
                      y1="310.93"
                      x2="575.65"
                      y2="284.34"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="571.17"
                      y1="242.18"
                      x2="590.22"
                      y2="231.18"
                    />
                    <line
                      class="cls-3"
                      x1="601.04"
                      y1="224.93"
                      x2="613.85"
                      y2="217.54"
                    />
                    <line
                      class="cls-3"
                      x1="529.49"
                      y1="266.25"
                      x2="559.85"
                      y2="248.72"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="598.04"
                      y1="165.92"
                      x2="619.57"
                      y2="147.85"
                    />
                    <line
                      class="cls-3"
                      x1="631.82"
                      y1="137.58"
                      x2="646.3"
                      y2="125.43"
                    />
                    <line
                      class="cls-3"
                      x1="550.89"
                      y1="205.48"
                      x2="585.23"
                      y2="176.67"
                    />
                    <line
                      class="cls-3"
                      x1="477.34"
                      y1="267.2"
                      x2="536.9"
                      y2="217.22"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="518.27"
                      y1="179.14"
                      x2="532.41"
                      y2="162.29"
                    />
                    <line
                      class="cls-3"
                      x1="540.44"
                      y1="152.71"
                      x2="549.95"
                      y2="141.39"
                    />
                    <line
                      class="cls-3"
                      x1="487.33"
                      y1="216.01"
                      x2="509.87"
                      y2="189.15"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="517.44"
                      y1="98.29"
                      x2="531.49"
                      y2="73.95"
                    />
                    <line
                      class="cls-3"
                      x1="539.49"
                      y1="60.1"
                      x2="548.94"
                      y2="43.73"
                    />
                    <line
                      class="cls-3"
                      x1="486.66"
                      y1="151.59"
                      x2="509.08"
                      y2="112.77"
                    />
                    <line
                      class="cls-3"
                      x1="438.66"
                      y1="234.74"
                      x2="477.54"
                      y2="167.4"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="447"
                      y1="137.99"
                      x2="454.52"
                      y2="117.33"
                    />
                    <line
                      class="cls-3"
                      x1="458.8"
                      y1="105.58"
                      x2="463.86"
                      y2="91.68"
                    />
                    <line
                      class="cls-3"
                      x1="430.54"
                      y1="183.22"
                      x2="442.53"
                      y2="150.27"
                    />
                  </g>
                  <g>
                    <line
                      class="cls-3"
                      x1="418.57"
                      y1="62.31"
                      x2="423.45"
                      y2="34.62"
                    />
                    <line
                      class="cls-3"
                      x1="426.22"
                      y1="18.88"
                      x2="429.51"
                      y2=".26"
                    />
                    <line
                      class="cls-3"
                      x1="407.88"
                      y1="122.91"
                      x2="415.66"
                      y2="78.77"
                    />
                    <line
                      class="cls-3"
                      x1="391.21"
                      y1="217.46"
                      x2="404.71"
                      y2="140.89"
                    />
                  </g>
                  <path
                    class="cls-2"
                    d="M510.91,360.66c-2.45-28.05-11.47-55.31-27.38-78.55-15.89-22.82-36.68-43.21-62.48-54.46-34.55-15.19-74.98-12.11-109.11,2.59-29.57,12.98-54.61,35.8-70.69,63.77-11.72,20.36-18.37,43.21-20.25,66.65,0,0-.9,0-.9,0-3.19-38.68,12.29-78.64,39.64-106.21,43.65-43.82,106.16-52.14,162.42-29.48,17.95,7.12,35.09,16.89,49.26,30.22,28.37,26.93,43.78,67.2,40.38,105.47h-.9Z"
                  />
                </g>
              </g>
            </svg> */}
            <img src="/assets/logo.svg" alt="The DASS" />
          </Link>
        </div>
      </nav>
      {(location.pathname === "/" || location.pathname === "/collections") && (
        <div
          className="toggle-center-wrapper"
          onClick={() => {
            toggleView();
          }}
        >
          <ToggleButton isExperienceView={isExperienceView}></ToggleButton>
        </div>
      )}
    </>
  );
}
