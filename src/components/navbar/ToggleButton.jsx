import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "@/assets/styles/nav.css";

const ToggleButton = ({ isExperienceView }) => {
  const buttonRef = useRef(null);
  const dotsRef = useRef([]);       // 7 original hexagon dots
  const extraDotsRef = useRef([]);  // 2 extra dots for grid
  const textRef = useRef(null);
  const altTextRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const allDots = dotsRef.current;
    const container = allDots[0]?.parentNode;
    
    if (!container) return;

    // Clear existing extra dots
    extraDotsRef.current.forEach(el => el?.remove());
    extraDotsRef.current = [];

    // Create 2 extra dots for grid (middle-left & middle-right)
    const createExtraDot = () => {
      const el = document.createElement("span");
      Object.assign(el.style, {
        position: "absolute",
        width: "4px",
        height: "4px",
        background: "#222",
        borderRadius: "50%",
        opacity: "0",
        transform: "scale(0)",
      });
      container.appendChild(el);
      return el;
    };

    const extraLeft = createExtraDot();
    const extraRight = createExtraDot();
    extraDotsRef.current = [extraLeft, extraRight];

    // Hexagon positions (7 dots)
    const hexPositions = [
      { left: 8, top: 0 },      // top
      { left: 14.93, top: 4 },  // top-right
      { left: 14.93, top: 14 }, // bottom-right
      { left: 8, top: 18 },     // bottom
      { left: 1.07, top: 14 },  // bottom-left
      { left: 1.07, top: 4 },   // top-left
      { left: 8, top: 9 },      // center
    ];

    // 3x3 grid positions
    const gridPositions = [
      { x: 0, y: 0 },   // 0 top-left
      { x: 8, y: 0 },   // 1 top-center
      { x: 16, y: 0 },  // 2 top-right
      { x: 0, y: 8 },   // 3 middle-left (extra)
      { x: 8, y: 8 },   // 4 center
      { x: 16, y: 8 },  // 5 middle-right (extra)
      { x: 0, y: 16 },  // 6 bottom-left
      { x: 8, y: 16 },  // 7 bottom-center
      { x: 16, y: 16 }, // 8 bottom-right
    ];

    const allGridDots = [...allDots, ...extraDotsRef.current];

    // Set initial positions based on current view
    if (isExperienceView) {
      // Show hexagon (7 dots)
      allDots.forEach((dot, i) => {
        if (!dot) return;
        gsap.set(dot, {
          left: `${hexPositions[i].left}px`,
          top: `${hexPositions[i].top}px`,
          scale: 1,
          opacity: 1,
        });
      });
      // hide extra dots
      extraDotsRef.current.forEach(el => gsap.set(el, { scale: 0, opacity: 0 }));
    } else {
      // Show grid (9 dots)
      allGridDots.forEach((dot, i) => {
        if (!dot) return;
        gsap.set(dot, {
          left: `${gridPositions[i].x}px`,
          top: `${gridPositions[i].y}px`,
          scale: 1,
          opacity: 1,
        });
      });
    }

    // Kill previous timeline
    if (tl.current) {
      tl.current.kill();
    }

    // Create new timeline for morph animation
    tl.current = gsap.timeline({ paused: true });

    if (isExperienceView) {
      // Animate hexagon → grid (7 dots → 9 dots)
      allGridDots.forEach((dot, i) => {
        if (!dot) return;
        tl.current.to(dot, {
          left: `${gridPositions[i].x}px`,
          top: `${gridPositions[i].y}px`,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }, 0);
      });
    } else {
      // Animate grid → hexagon (9 dots → 7 dots)
      allDots.forEach((dot, i) => {
        if (!dot) return;
        tl.current.to(dot, {
          left: `${hexPositions[i].left}px`,
          top: `${hexPositions[i].top}px`,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }, 0);
      });
      // Hide extra dots
      extraDotsRef.current.forEach(el => {
        tl.current.to(el, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.out",
        }, 0);
      });
    }

    // Text animation
    gsap.set(textRef.current, { xPercent: -50, yPercent: -50, y: 0, opacity: 1 });
    gsap.set(altTextRef.current, { xPercent: -50, yPercent: -50, y: 30, opacity: 0 });

    tl.current.to(textRef.current, { y: -30, opacity: 0, duration: 0.4, ease: "power2.out" }, '<')
      .to(altTextRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, '<');

    // Hover handlers
    const play = () => tl.current?.play();
    const reverse = () => tl.current?.reverse();

    button.addEventListener("mouseenter", play);
    button.addEventListener("mouseleave", reverse);

    return () => {
      button.removeEventListener("mouseenter", play);
      button.removeEventListener("mouseleave", reverse);
      tl.current?.kill();
    };
  }, [isExperienceView]);

  // Hexagon initial dots
  const hexDots = [
    { left: 8, top: 0 },
    { left: 14.93, top: 4 },
    { left: 14.93, top: 14 },
    { left: 8, top: 18 },
    { left: 1.07, top: 14 },
    { left: 1.07, top: 4 },
    { left: 8, top: 9 },
  ];

  return (
    <button
      ref={buttonRef}
      className="toggle-button-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        background: "transparent",
        border: "none",
        padding: "0",
        cursor: "pointer",
        color: "#222",
        fontSize: "14px",
        fontWeight: "500",
      }}
    >
      {/* Left icon box */}
      <div
        className="toggle-dots-container"
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          background: "#f5f5f0",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "24px",
            height: "24px",
          }}
        >
          {hexDots.map((pos, i) => (
            <span
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              style={{
                position: "absolute",
                left: `${pos.left}px`,
                top: `${pos.top}px`,
                width: "4px",
                height: "4px",
                background: "#222",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right text box */}
      <div
        className="toggle-text-container-box"
        style={{
          position: "relative",
          height: "40px",
          minWidth: "140px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "16px",
          paddingRight: "16px",
          background: "#f5f5f0",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          <span
            ref={textRef}
            style={{
              display: "block",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {!isExperienceView ? "grid view" : "experience view"}
          </span>
          <span
            ref={altTextRef}
            style={{
              display: "block",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {!isExperienceView ? "experience view" : "grid view"}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ToggleButton;
