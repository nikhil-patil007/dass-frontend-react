import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../assets/styles/popup.css";
import SplitHoverText from "./SplitHoverText";
import { Thumbs, FreeMode, Navigation, Mousewheel } from "swiper/modules";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ProductPopup = React.forwardRef(({ product, onClose }, closeRef) => {
  if (!product) return null;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const popupOverlayRef = useRef(null);
  const contentRef = useRef(null);

  // Expose close method to parent via ref
  useImperativeHandle(
    closeRef,
    () => ({
      closeWithAnimation: handleClose,
    }),
    [contentRef]
  );

  useEffect(() => {
    if (popupOverlayRef.current) {
      gsap.fromTo(
        popupOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    // Set initial content opacity to 0 and animate fade-in after popup fully opens
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.85,
      });
    }
  }, [product]);

  const handleClose = () => {
    // First fade out content
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          // After content is hidden, close the popup
          onClose();
        },
      });
    } else {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    // Only close if clicking directly on overlay, not on container
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleMainSwiperChange = (swiper) => {
    // When main swiper slides, scroll thumbnail swiper to show active thumbnail with smooth animation
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(swiper.activeIndex, 500); // 500ms smooth transition
    }
  };

  return (
    <div
      className="popup-overlay"
      ref={popupOverlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="popup-container"
        onClick={(e) => e.stopPropagation()} // prevent overlay click
      >
        <div className="popup-close" onClick={handleClose}>
          <span></span>
          <span></span>
        </div>
        <div ref={contentRef}>
          <h2 className="product-name">{product.name}</h2>
          <Swiper
            onSwiper={setMainSwiper}
            onSlideChange={handleMainSwiperChange}
            direction="vertical" // <-- make Swiper vertical
            spaceBetween={20}
            slidesPerView={1}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.2,
              releaseOnEdges: true,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs, Mousewheel]}
          >
            {/* <SwiperSlide>
            <div className="swiper_image">
              <img src={product.image} alt={product.name} />
            </div>
          </SwiperSlide> */}
            {(() => {
              // Handle both API format (objects) and plain URL strings
              const imgs = product.images && product.images.length
                ? product.images.map(img => typeof img === 'string' ? img : img.image).filter(Boolean)
                : [product.thumbnail || product.image].filter(Boolean);
              return imgs.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="swiper_image">
                    <img src={src} alt={`${product.name} ${idx}`} />
                  </div>
                </SwiperSlide>
              ));
            })()}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            spaceBetween={5}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="swiper-thumbs"
          >
            {/* <SwiperSlide>
            <div className="swiper_image">
              <img src={product.image} alt={product.name} />
            </div>
          </SwiperSlide> */}
            {(() => {
              const imgs = product.images && product.images.length
                ? product.images.map(img => typeof img === 'string' ? img : img.image).filter(Boolean)
                : [product.thumbnail || product.image].filter(Boolean);
              return imgs.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="swiper_image">
                    <img src={src} alt={`${product.name} ${idx}`} />
                  </div>
                </SwiperSlide>
              ));
            })()}
          </Swiper>
          <Link
            className="explore-btn"
            to={`/products/${product.slug}`}
            aria-label={`Explore ${product.name}`}
            style={{ zIndex: "99999" }}
          >
            <span className="explore-box text-box">
              {/* <SplitHoverText text={product.name} /> */}
              <SplitHoverText text="explore more" />
            </span>
            <span className="explore-box icon-box" aria-hidden="true">
              <svg
                className="explore-arrow"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 10"
                width="16"
                height="10"
                fill="none"
              >
                <path
                  d="M1 5h14M11 9l4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default ProductPopup;
