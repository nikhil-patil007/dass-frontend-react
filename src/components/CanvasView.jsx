import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../assets/styles/canvas.css";
import { useNavigate } from "react-router-dom";
import ProductPopup from "./ProductPopup";

export default function CanvasView({ products }) {
  const wrapperRef = useRef(null);
  const surfaceRef = useRef(null);
  const itemRefs = useRef([]);
  const floatNameRef = useRef(null);
  const animationRef = useRef(null);
  const navigate = useNavigate();
  const [pointerStart, setPointerStart] = useState({ x: 0, y: 0 });

  const [drag, setDrag] = useState({
    active: false,
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [dragEnabled, setDragEnabled] = useState(false);
  const [positions, setPositions] = useState([]);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef(null);

  const canvasPadding = 100; // leave 100px from all four sides of the draggable view

  // Build grid layout sized exactly to the items footprint
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const imgSize = isMobile ? 180 : 250; // match render sizing
    const gap = isMobile ? 40 : 100; // match render gap
    const cols = 8; // simple grid with 8 columns
    const rows = Math.ceil((products?.length || 0) / cols) || 1;
    const step = imgSize + gap;

    // Build positions column by column with half-cell skip:
    // odd columns start half-step lower (top half-gap)
    // even columns end visually with a bottom half-gap due to overall height
    const totalCells = cols * rows;
    const pos = [];
    for (let c = 0; c < cols; c++) {
      const yStart = c % 2 === 1 ? step / 2 : 0; // odd columns offset down by half
      for (let r = 0; r < rows; r++) {
        const x = canvasPadding + c * step;
        const y = canvasPadding + yStart + r * step;
        pos.push({ x, y });
      }
    }

    // Truncate positions to totalCells (already the case) and keep for render
    const width = 2 * canvasPadding + (cols - 1) * step + imgSize;
    // Height includes bottom half-gap to balance top offset on odd columns + padding
    const height = 2 * canvasPadding + (rows - 1) * step + imgSize + step / 2;

    setPositions(pos);
    setGridSize({ width, height });
    setDrag((d) => ({
      ...d,
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2,
    }));
  }, [products]);
  // Lazy load items when they enter viewport
  useEffect(() => {
    if (!wrapperRef.current || itemRefs.current.length === 0) return;

    // Create IntersectionObserver to detect items in viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.dataset.itemId;
            if (itemId) {
              setVisibleItems((prev) => new Set(prev).add(parseInt(itemId)));
            }
          }
        });
      },
      {
        root: wrapperRef.current,
        rootMargin: "200px", // Load 200px before entering viewport
        threshold: 0,
      }
    );

    // Observe all items
    itemRefs.current.forEach((el) => {
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [positions]);

  // Sequence: item pop first, then surface zoom
  useEffect(() => {
    if (!surfaceRef.current) return;
    const inner = surfaceRef.current.querySelector(".surface-inner");
    if (!inner) return;

    gsap.set(inner, { scale: 0.9, opacity: 1, transformOrigin: "50% 50%" });
    // Wait for items to pop before zooming surface
    let itemsPopped = 0;
    const totalItems = itemRefs.current.filter(Boolean).length;
    if (totalItems === 0) return;

    // Helper to run surface zoom after all items pop
    const runSurfaceZoom = () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => setDragEnabled(true),
      });
      tl.to(inner, { scale: 1, duration: 1.5 });
    };

    // Animate all items in parallel, then zoom surface
    itemRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 1, transformOrigin: "50% 50%" },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.8)",
            delay: i * 0.05,
            onComplete: () => {
              itemsPopped++;
              if (itemsPopped === totalItems) runSurfaceZoom();
            },
          }
        );
      }
    });
  }, [products]);

  // Remove IntersectionObserver pop logic (handled above)

  // Scroll wheel support
  useEffect(() => {
    if (!wrapperRef.current) return;

    const handleWheel = (e) => {
      if (!dragEnabled) return;

      e.preventDefault();

      const wrapperWidth = wrapperRef.current.offsetWidth;
      const wrapperHeight = wrapperRef.current.offsetHeight;

      const minX = wrapperWidth - gridSize.width;
      const minY = wrapperHeight - gridSize.height;
      const maxX = 0;
      const maxY = 0;

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
                setDrag((current) => ({
                  ...current,
                  x: dragObj.x,
                  y: dragObj.y,
                }));
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
  }, [dragEnabled, gridSize]);

  const getClientPos = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const startDrag = (e) => {
    if (!dragEnabled) return;

    const { x, y } = getClientPos(e);
    setPointerStart({ x, y });

    if (animationRef.current) {
      animationRef.current.kill();
    }

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

    const minX = wrapperWidth - gridSize.width;
    const minY = wrapperHeight - gridSize.height;
    const maxX = 0;
    const maxY = 0;

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
      },
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

  const openDetail = (product) => {
    navigate(`/products/${product}`);
  };

  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const popupContainerRef = useRef(null);
  const popupRef = useRef(null);

  const animatePopupLayout = ({ open }) => {
    const popupEl = popupContainerRef.current;
    const canvasEl = wrapperRef.current;

    if (!popupEl || !canvasEl) return;

    gsap.killTweensOf([popupEl, canvasEl]);

    const duration = 0.8;
    const ease = "power3.out";

    if (open) {
      gsap.to(popupEl, { width: "60%", duration, ease });
      gsap.to(canvasEl, { width: "40%", duration, ease });
    } else {
      // Expand canvas immediately while popup collapses to avoid white gap.
      gsap.to(canvasEl, { width: "100%", duration, ease });
      gsap.to(popupEl, { width: "0%", duration, ease });
    }
  };

  const handleItemClick = (e, product) => {
    const { x, y } = getClientPos(e);
    const dx = Math.abs(x - pointerStart.x);
    const dy = Math.abs(y - pointerStart.y);

    if (dx < 5 && dy < 5) {
      setPopup(true);
      setPopupData(product);
      // Mark body as popup open to control global UI visibility
      try {
        document.body.classList.add("popup-open");
      } catch {}

      // Animate popup + canvas together (next frame ensures refs/styles are ready)
      requestAnimationFrame(() => {
        animatePopupLayout({ open: true });
      });
    }
  };

  const onClose = () => {
    const popupEl = popupContainerRef.current;
    const canvasEl = wrapperRef.current;

    if (!popupEl || !canvasEl) {
      setPopup(false);
      setPopupData(null);
      try {
        document.body.classList.remove("popup-open");
      } catch {}
      return;
    }

    // Expand canvas while popup collapses to prevent blank right side.
    animatePopupLayout({ open: false });

    // Only clear state after the collapse animation finishes.
    gsap.delayedCall(0.8, () => {
      setPopup(false);
      setPopupData(null);
      try {
        document.body.classList.remove("popup-open");
      } catch {}
    });
  };

  return (
    <>
      <div
        className="canvas-view-shell row-flex inner-flex-zero"
        onClick={() => {
          if (popup && popupData && popupRef.current?.closeWithAnimation) {
            popupRef.current.closeWithAnimation();
          }
        }}
      >
        <div
          ref={popupContainerRef}
          className="canvas-popup-slot"
          style={{ width: "0%", transition: "none" }}
        >
          <ProductPopup product={popupData} onClose={onClose} ref={popupRef} />
        </div>

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
          style={popup && popupData ? { pointerEvents: "none" } : {}}
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
            <div
              className="surface-inner"
              style={{ width: "100%", height: "100%" }}
            >
              {(() => {
                const cols = 8;
                const rows = Math.ceil((products?.length || 0) / cols) || 1;
                const totalCells = cols * rows;
                const renderProducts = Array.from(
                  { length: totalCells },
                  (_, i) => products[i % products.length]
                );
                return renderProducts.map((product, i) => {
                  const coords = positions[i] || { x: 0, y: 0 };
                  const isVisible = visibleItems.has(i);

                  return (
                    <div
                      key={i}
                      ref={(el) => (itemRefs.current[i] = el)}
                      data-item-id={i}
                      className="canvas-item"
                      style={{
                        left: coords.x,
                        top: coords.y,
                        transform: "rotate(45deg) scale(0)",
                      }}
                      onMouseEnter={() => setHoveredProduct(product)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      onTouchStart={() => setHoveredProduct(product)}
                      onTouchEnd={() => setHoveredProduct(null)}
                    >
                      {isVisible && (
                        <img
                          onClick={(e) => handleItemClick(e, product)}
                          src={product.image}
                          alt={`product-${i}`}
                          loading="lazy"
                        />
                      )}
                    </div>
                  );
                });
              })()}
            </div>
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
