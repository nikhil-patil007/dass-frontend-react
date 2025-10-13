import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../assets/styles/canvas.css";

export default function CanvasView({ products }) {
  const wrapperRef = useRef(null);
  const surfaceRef = useRef(null);
  const itemRefs = useRef([]);
  const floatNameRef = useRef(null);
  const animationRef = useRef(null);

  const [drag, setDrag] = useState({ active: false, x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [dragEnabled, setDragEnabled] = useState(false);

  const canvasPadding = 50;

  // Build grid layout
  useEffect(() => {
    const imgSize = 200;
    const isMobile = window.innerWidth < 768;
    const gap = isMobile ? 5 : 10;
    const cols = 10;
    const rows = Math.ceil(products.length / 5);

    const width = cols * (imgSize + gap);
    const height = rows * (imgSize + gap);

    setGridSize({ width, height });
    setDrag((d) => ({
      ...d,
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2,
    }));
  }, [products]);

  // Zoom animation from center
  useEffect(() => {
    if (!surfaceRef.current) return;

    const inner = surfaceRef.current.querySelector(".surface-inner");
    if (!inner) return;

    gsap.set(inner, { scale: 0.6, opacity: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => setDragEnabled(true),
    });

    tl.to(inner, { opacity: 1, duration: 0.8 }).to(inner, { scale: 1, duration: 1.2 });
  }, []);

  // Animate items when they enter the view (only first time)
  useEffect(() => {
    if (!wrapperRef.current || !surfaceRef.current) return;

    const animatedItems = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const itemId = el.dataset.itemId;
          
          if (entry.isIntersecting) {
            if (!animatedItems.has(itemId)) {
              gsap.to(el, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" });
              animatedItems.add(itemId);
            } else {
              gsap.set(el, { opacity: 1, scale: 1 });
            }
          } else {
            if (!animatedItems.has(itemId)) {
              gsap.to(el, { opacity: 0, scale: 0, duration: 0.3, ease: "power1.in" });
            }
          }
        });
      },
      { root: wrapperRef.current, threshold: 0.2 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  // Scroll wheel support
  useEffect(() => {
    if (!wrapperRef.current) return;

    const handleWheel = (e) => {
      if (!dragEnabled) return;
      
      e.preventDefault();
      
      const wrapperWidth = wrapperRef.current.offsetWidth;
      const wrapperHeight = wrapperRef.current.offsetHeight;

      const minX = wrapperWidth - gridSize.width - canvasPadding;
      const minY = wrapperHeight - gridSize.height - canvasPadding;
      const maxX = canvasPadding;
      const maxY = canvasPadding;

      setDrag((prev) => {
        let newX = prev.x - e.deltaX;
        let newY = prev.y - e.deltaY;

        // Clamp with soft overdrag
        if (newX > maxX) newX = maxX + (newX - maxX) * 0.3;
        if (newX < minX) newX = minX + (newX - minX) * 0.3;
        if (newY > maxY) newY = maxY + (newY - maxY) * 0.3;
        if (newY < minY) newY = minY + (newY - minY) * 0.3;

        return { ...prev, x: newX, y: newY };
      });

      // Bounce back when wheel stops
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.delayedCall(0.15, () => {
        setDrag((prev) => {
          let finalX = prev.x;
          let finalY = prev.y;

          if (prev.x > maxX) finalX = maxX;
          if (prev.x < minX) finalX = minX;
          if (prev.y > maxY) finalY = maxY;
          if (prev.y < minY) finalY = minY;

          if (finalX !== prev.x || finalY !== prev.y) {
            const dragObj = { x: prev.x, y: prev.y };
            gsap.to(dragObj, {
              x: finalX,
              y: finalY,
              duration: 0.5,
              ease: "power2.out",
              onUpdate: () => {
                setDrag((current) => ({ ...current, x: dragObj.x, y: dragObj.y }));
              },
            });
          }

          return prev;
        });
      });
    };

    const wrapper = wrapperRef.current;
    wrapper.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [dragEnabled, gridSize, canvasPadding]);

  const getClientPos = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const startDrag = (e) => {
    if (!dragEnabled) return;
    
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    const { x, y } = getClientPos(e);
    setDrag((prev) => ({
      ...prev,
      active: true,
      offsetX: x - prev.x,
      offsetY: y - prev.y,
    }));
  };

  const moveDrag = (e) => {
    const { x, y } = getClientPos(e);

    if (floatNameRef.current) {
      gsap.to(floatNameRef.current, {
        x: x + 15,
        y: y + 15,
        duration: 0.1,
        ease: "power3.out",
      });
    }

    if (!drag.active || !dragEnabled) return;

    const wrapperWidth = wrapperRef.current.offsetWidth;
    const wrapperHeight = wrapperRef.current.offsetHeight;

    const minX = wrapperWidth - gridSize.width - canvasPadding;
    const minY = wrapperHeight - gridSize.height - canvasPadding;
    const maxX = canvasPadding;
    const maxY = canvasPadding;

    let newX = x - drag.offsetX;
    let newY = y - drag.offsetY;

    if (newX > maxX) newX = maxX + (newX - maxX) * 0.3;
    if (newX < minX) newX = minX + (newX - minX) * 0.3;
    if (newY > maxY) newY = maxY + (newY - maxY) * 0.3;
    if (newY < minY) newY = minY + (newY - minY) * 0.3;

    const isMobile = window.innerWidth < 768;
    
    // Smooth follow effect - faster on mobile
    gsap.to(drag, {
      x: newX,
      y: newY,
      duration: isMobile ? 0.15 : 0.3,
      ease: isMobile ? "power1.out" : "power2.out",
      overwrite: true,
      onUpdate: () => {
        setDrag((prev) => ({ ...prev, x: drag.x, y: drag.y }));
      }
    });
  };

  const endDrag = () => {
    if (!wrapperRef.current || !drag.active) return;

    const wrapperWidth = wrapperRef.current.offsetWidth;
    const wrapperHeight = wrapperRef.current.offsetHeight;

    const minX = wrapperWidth - gridSize.width - canvasPadding;
    const minY = wrapperHeight - gridSize.height - canvasPadding;
    const maxX = canvasPadding;
    const maxY = canvasPadding;

    let finalX = drag.x;
    let finalY = drag.y;

    if (drag.x > maxX) finalX = maxX;
    if (drag.x < minX) finalX = minX;
    if (drag.y > maxY) finalY = maxY;
    if (drag.y < minY) finalY = minY;

    setDrag((prev) => ({ ...prev, active: false }));

    if (finalX !== drag.x || finalY !== drag.y) {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const dragObj = { x: drag.x, y: drag.y };

      gsap.to(dragObj, {
        x: finalX,
        y: finalY,
        duration: isDesktop ? 0.6 : 0.3,
        ease: "power2.out",
        onUpdate: () => {
          setDrag((prev) => ({ ...prev, x: dragObj.x, y: dragObj.y }));
        },
      });
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="canvas-wrapper"
        onMouseDown={startDrag}
        onMouseMove={moveDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={startDrag}
        onTouchMove={moveDrag}
        onTouchEnd={endDrag}
      >
        <div
          ref={surfaceRef}
          className="canvas-surface"
          style={{
            width: gridSize.width,
            height: gridSize.height,
            transform: `translate(${drag.x}px, ${drag.y}px)`,
          }}
        >
          <div className="surface-inner" style={{ width: "100%", height: "100%" }}>
            {products.map((product, i) => {
              const imgSize = 200;
              const isMobile = window.innerWidth < 768;
              const gap = isMobile ? 5 : 10;
              const row = Math.floor(i / 5);
              const indexInRow = i % 5;
              const colIndex = row % 2 === 0 ? indexInRow * 2 : indexInRow * 2 + 1;
              const x = colIndex * (imgSize + gap);
              const y = row * (imgSize + gap);

              return (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-item-id={i}
                  className="canvas-item"
                  style={{
                    left: x,
                    top: y,
                    transform: "rotate(45deg) scale(0)",
                    opacity: 0,
                  }}
                  onMouseEnter={() => setHoveredProduct(product)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onTouchStart={() => setHoveredProduct(product)}
                  onTouchEnd={() => setHoveredProduct(null)}
                >
                  <img src={product.image} alt={`product-${i}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {hoveredProduct && window.innerWidth >= 768 && (
        <div
          ref={floatNameRef}
          className="floating-name"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            pointerEvents: "none",
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "14px",
            zIndex: 9999,
            whiteSpace: "nowrap",
            transform: "translate(0px, 0px)",
          }}
        >
          {hoveredProduct.name}
        </div>
      )}
    </>
  );
}