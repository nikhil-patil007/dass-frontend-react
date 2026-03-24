import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import "@/assets/styles/detailPage.css";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
// Load our overrides AFTER Fancybox CSS so they win
import "@/assets/styles/fancybox-overrides.css";

export default function ProductDetails({ products }) {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [catProduct, setCatProduct] = useState(null);
  const { has, toggle } = useWishlist();
  const {
    add: addToCart,
    remove: removeFromCart,
    items: cartItems,
  } = useCart();
  const inCart = product
    ? cartItems.some((it) => String(it.id) === String(product.id))
    : false;

  // --- Main product image states ---
  const [mainSrc, setMainSrc] = useState(""); // actual image src after load
  const [mainLoaded, setMainLoaded] = useState(false);

  // --- Suggestion images states ---
  const [suggestionSrc, setSuggestionSrc] = useState({});
  const [suggestionLoaded, setSuggestionLoaded] = useState({});

  // transparent 1x1 GIF as placeholder
  const placeholder =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  useEffect(() => {
    const wrapper = document.querySelector(".detail-wrapper");
    if (wrapper) {
      if (window.innerWidth > 991) {
        wrapper.scrollLeft = 0;
      }
      //  else {
      //   window.scrollTo(0, 0);
      // }
    }

    if (slug) {
      const selected = products.find((p) => p.slug === slug);
      const similar = products.filter(
        (p) => p.category === selected.category && p.slug !== slug
      );
      setProduct(selected);
      setCatProduct(similar);

      // reset image states on slug change
      setMainSrc("");
      setMainLoaded(false);
      setSuggestionSrc({});
      setSuggestionLoaded({});
    }
  }, [products, slug]);

  // --- Properly load main image ---
  useEffect(() => {
    if (product?.image) {
      const img = new Image();
      img.src = product.image;
      img.onload = () => {
        setMainSrc(product.image);
        setMainLoaded(true);
      };
    }
  }, [product]);

  // --- Horizontal scroll for desktop ---
  useEffect(() => {
    const wrapper = document.querySelector(".detail-wrapper");
    if (!wrapper || window.innerWidth <= 991) return;

    const handleWheel = (e) => {
      // If the user is scrolling inside a vertically-scrollable child
      // (e.g. the spec/text column), let the vertical scroll pass through
      let el = e.target;
      while (el && el !== wrapper) {
        if (el.scrollHeight > el.clientHeight + 1) {
          const atTop = el.scrollTop <= 0 && e.deltaY < 0;
          const atBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 1 &&
            e.deltaY > 0;
          if (!atTop && !atBottom) {
            // natural vertical scroll inside this element
            return;
          }
        }
        el = el.parentElement;
      }
      e.preventDefault();
      wrapper.scrollLeft += e.deltaY;
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", handleWheel);
  }, []);

  // --- Preload suggestion images ---
  useEffect(() => {
    if (!catProduct) return;

    catProduct.forEach((p, i) => {
      const img = new Image();
      img.src = p.image;
      img.onload = () => {
        setSuggestionSrc((prev) => ({ ...prev, [i]: p.image }));
        setSuggestionLoaded((prev) => ({ ...prev, [i]: true }));
      };
    });
  }, [catProduct]);

  // --- Open Fancybox gallery from product images ---
  const openGallery = useCallback(() => {
    if (!product) return;
    const imgs = (
      product.images && product.images.length ? product.images : [product.image]
    ).filter(Boolean);

    if (!imgs.length) return;

    Fancybox.show(
      imgs.map((src) => ({ src, type: "image" })),
      {
        // Fancybox v4 config: keep only counter + close; enable arrows
        Thumbs: false,
        Toolbar: {
          display: ["counter", "close"],
        },
        Carousel: {
          Navigation: true,
          Dots: false,
        },
        animated: true,
      }
    );
  }, [product]);

  return (
    <div className="detail-wrapper">
      {product && (
        <>
          {/* --- Product Section --- */}
          <section
            className={`horizontal-section ${
              window.innerWidth <= 991 ? "w100" : "w80"
            }`}
            id="detail-section1"
          >
            <div
              className={`relative section-padding-l h100 w100 ${
                window.innerWidth <= 991
                  ? "inner-flex inner-flex-small"
                  : "row-flex inner-flex-zero"
              }`}
            >
              {/* Text section */}
              <div className="inner-flex inner-flex-big h100">
                <div className="inner-flex">
                  <div className="section-title pd-title-with-heart">
                    <h2>{product.name}</h2>
                    <div className="row-flex inner-flex-small">
                      <button
                        className={`pd-heart pd-heart-outline ${
                          has(product?.id) ? "active" : ""
                        }`}
                        onClick={() => product && toggle(product.id)}
                        aria-label="Toggle wishlist"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.001 20.727c-.375 0-.75-.12-1.062-.36C8.07 18.37 6.03 16.59 4.69 15.06 3.11 13.25 2.25 11.78 2.25 10.06 2.25 7.59 4.24 5.6 6.71 5.6c1.26 0 2.45.5 3.29 1.35h0c.84-.85 2.03-1.35 3.29-1.35 2.47 0 4.46 1.99 4.46 4.46 0 1.72-.86 3.19-2.44 5.0-1.34 1.53-3.38 3.32-6.216 5.303-.311.218-.686.338-1.061.338z"
                            fill={
                              has(product?.id) ? "var(--orange-color)" : "none"
                            }
                            stroke="#000"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span className="pd-tooltip">
                          {has(product?.id) ? "Saved" : "Add to wishlist"}
                        </span>
                      </button>
                      <button
                        className={`pd-cart ${inCart ? "active" : ""}`}
                        onClick={() => {
                          if (!product) return;
                          inCart
                            ? removeFromCart(product.id)
                            : addToCart(product.id, 1);
                        }}
                        aria-label={inCart ? "Remove from cart" : "Add to cart"}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 6h14l-1.5 9h-11z"
                            fill={inCart ? "var(--orange-color)" : "none"}
                            stroke="#000"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="9"
                            cy="19"
                            r="1.5"
                            fill={inCart ? "#2ecc71" : "#000"}
                          />
                          <circle
                            cx="17"
                            cy="19"
                            r="1.5"
                            fill={inCart ? "#2ecc71" : "#000"}
                          />
                        </svg>
                        <span className="pd-tooltip">
                          {inCart ? "Remove from cart" : "Add to cart"}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div
                    className={`section-subtitle ${
                      window.innerWidth <= 991 ? "w100" : "w70"
                    }`}
                  >
                    <h2>{product.description}</h2>
                  </div>
                </div>

                <div className="inner-flex inner-flex-small">
                  <div className="section-subtitle">
                    <h2>Specifications</h2>
                  </div>
                  <div
                    className={`spec-div inner-flex inner-flex-zero ${
                      window.innerWidth <= 991 ? "w100" : "w80"
                    }`}
                  >
                    <div className="spec-item">
                      <div className="text">
                        <p>Products</p>
                      </div>
                      <div className="value">
                        <p>7</p>
                      </div>
                    </div>
                    <div className="spec-item">
                      <div className="text">
                        <p>Material</p>
                      </div>
                      <div className="value">
                        <p>Stoneware</p>
                      </div>
                    </div>
                    <div className="spec-item">
                      <div className="text">
                        <p>Color Palette</p>
                      </div>
                      <div className="value">
                        <p>Bluew</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Product Image */}
              <div
                className={`h100 relative ${
                  window.innerWidth <= 991 ? "w100" : "w50"
                }`}
              >
                <div
                  className="product-image is-clickable"
                  role="button"
                  tabIndex={0}
                  aria-label="Open product gallery"
                  onClick={openGallery}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openGallery();
                    }
                  }}
                >
                  <img
                    className={`h100 product-fade-img ${
                      mainLoaded ? "fade-in" : "fade-out"
                    }`}
                    src={mainSrc || placeholder}
                    alt={product.name}
                  />
                  {/* Desktop hover overlay to indicate click */}
                  <div className="product-image-overlay">
                    <span className="overlay-label">View gallery</span>
                    <svg
                      className="overlay-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                    >
                      <path
                        d="M15 3h6v6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M21 3l-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9 21H3v-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M3 21l7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  {/* Mobile persistent zoom icon (non-blocking) */}
                  <div className="product-image-zoom-icon" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M20 20l-3.5-3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 11h6M11 8v6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Suggestion Section --- */}
          <section
            className={`${
              window.innerWidth <= 991 ? "w100" : "w-fc"
            } row-flex alc`}
            id="detail-section2"
            style={{ padding: 0 }}
          >
            <div className="grid-suggestion">
              <div
                className="section-subtitle"
                style={window.innerWidth <= 991 ? {} : { paddingTop: "3rem" }}
              >
                <h2>
                  More Like <br className="hide-mobile-only" /> This
                </h2>
              </div>

              {catProduct &&
                catProduct.map((p, i) => (
                  <div key={i} className="suggestion-item inner-flex">
                    <Link to={`/products/${p.slug}`}>
                      <div className="item-img">
                        <img
                          src={suggestionSrc[i] || placeholder}
                          alt={p.name}
                          className={`product-fade-img ${
                            suggestionLoaded[i] ? "fade-in" : "fade-out"
                          }`}
                        />
                      </div>
                      <div className="item-name">
                        <h3>{p.name}</h3>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
