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
        (p) => p.category === selected.category && p.slug !== slug,
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

  const [selectedSize, setSelectedSize] = useState(null);
  const [isChartOpen, setIsChartOpen] = useState(false);

  const sizes = [9, 12, 14, 16, 18];
  const sizesNeck = [16, 18, 20, 22];

  useEffect((e) => {
    window.addEventListener("keydown", (e) => {
      e.key === "Escape" && setIsChartOpen(false);
    });
  }, []);

  // --- Horizontal scroll for desktop ---
  useEffect(() => {
    const wrapper = document.querySelector(".detail-wrapper");
    if (!wrapper || window.innerWidth <= 991) return;

    // const handleWheel = (e) => {
    //   // If the user is scrolling inside a vertically-scrollable child
    //   // (e.g. the spec/text column), let the vertical scroll pass through
    //   let el = e.target;
    //   while (el && el !== wrapper) {
    //     if (el.scrollHeight > el.clientHeight + 1) {
    //       const atTop = el.scrollTop <= 0 && e.deltaY < 0;
    //       const atBottom =
    //         el.scrollTop + el.clientHeight >= el.scrollHeight - 1 &&
    //         e.deltaY > 0;
    //       if (!atTop && !atBottom) {
    //         // natural vertical scroll inside this element
    //         return;
    //       }
    //     }
    //     el = el.parentElement;
    //   }
    //   e.preventDefault();
    //   wrapper.scrollLeft += e.deltaY;
    // };

    // wrapper.addEventListener("wheel", handleWheel, { passive: false });
    // return () => {
    //   wrapper.removeEventListener("wheel", handleWheel);
    // };
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
      },
    );
  }, [product]);

  // useEffect(() => {
  //   const wrapper = document.querySelector(".detail-wrapper");
  //   if (isChartOpen) {
  //     wrapper.removeEventListener("wheel", handleWheel)
  //   } else {
  //     wrapper.removeEventListener("wheel", handleWheel)
  //   }
  // }, [isChartOpen]);

  const [zip, setZip] = useState("");
  const [zipValid, setZipValid] = useState(false);

  const handleZipSubmit = (e) => {
    if (zip.length !== 6) {
      alert("Enter a valid 6-digit ZIP code");
    } else {
      setZipValid(true);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // Allow only digits
    if (/^\d*$/.test(value)) {
      setZip(value);
    }
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
    };

    return date.toLocaleDateString("en-IN", options);
  };

  return (
    <div className="detail-wrapper">
      {product && (
        <>
          {/* --- Product Section --- */}
          <section
            // className={`horizontal-section ${
            //   window.innerWidth <= 991 ? "w100" : "w90"
            // }`}
            className={`horizontal-section ${true ? "w100" : "w90"}`}
            id="detail-section1"
          >
            <div
              // className={`relative section-padding-l h100 w100 ${
              //   window.innerWidth <= 991
              //     ? "inner-flex inner-flex-small"
              //     : "row-flex inner-flex-zero"
              // }`}
              className={`relative w100 ${
                window.innerWidth <= 991
                  ? "inner-flex inner-flex-small reverse-flex"
                  : "row-flex inner-flex-zero jc-s-b"
              }`}
            >
              {/* Text section */}
              <div
                className="inner-flex inner-flex-medium h100"
                style={window.innerWidth <= 991 ? { padding: "0 2rem" } : {}}
              >
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
                        <p>Product Code</p>
                      </div>
                      <div className="value">
                        <p>{product.id}</p>
                      </div>
                    </div>
                    <div className="spec-item">
                      <div className="text">
                        <p>Category</p>
                      </div>
                      <div className="value">
                        <p>{product.category}</p>
                      </div>
                    </div>
                    <div className="spec-item">
                      <div className="text">
                        <p>Metal Color</p>
                      </div>
                      <div className="value">
                        <p>
                          {product.metalColor
                            ? product.metalColor
                            : "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="spec-item">
                      <div className="text">
                        <p>Price</p>
                      </div>
                      <div className="value">
                        <p>${product.price}</p>
                      </div>
                    </div>
                    <div className="spec-item">
                      <div className="text">
                        <p>Description</p>
                      </div>
                      <div className="value">
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`${window.innerWidth <= 991 ? "inner-flex" : "row-flex"} inner-flex-medium`}
                >
                  <div
                    className="inner-flex inner-flex-smallest"
                    style={{ flexShrink: 0 }}
                  >
                    <div className="section-subtitle">
                      <h2>Sizes</h2>
                    </div>
                    <div
                      className={`spec-div inner-flex inner-flex-zero ${
                        window.innerWidth <= 991 ? "w100" : "w100"
                      }`}
                    >
                      <div className="spec-item spec-item-size flex gap-2">
                        {product.category.includes("Necklaces")
                          ? sizesNeck.map((size) => (
                              <button
                                key={size}
                                onClick={() =>
                                  setSelectedSize((prev) =>
                                    prev === size ? null : size,
                                  )
                                }
                                className={`value px-4 py-2 border rounded 
              ${selectedSize === size ? "bg-orange text-white" : "bg-white text-black"}`}
                              >
                                <p>{size}</p>
                              </button>
                            ))
                          : sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() =>
                                  setSelectedSize((prev) =>
                                    prev === size ? null : size,
                                  )
                                }
                                className={`value px-4 py-2 border rounded 
              ${selectedSize === size ? "bg-orange text-white" : "bg-white text-black"}`}
                              >
                                <p>{size}</p>
                              </button>
                            ))}
                        <div
                          className="text"
                          onClick={() => setIsChartOpen(true)}
                        >
                          <p>~Size Chart</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inner-flex inner-flex-smallest">
                    <div className="section-subtitle">
                      <h2>Delivery Options</h2>
                    </div>
                    <div
                      className={`spec-div inner-flex inner-flex-zero ${
                        window.innerWidth <= 991 ? "w100" : "w100"
                      }`}
                    >
                      <div className="spec-item spec-item-size flex gap-2">
                        {zipValid ? (
                          <>
                            <div className="text deliver">
                              <p>
                                Delivers By{" "}
                                <span style={{ fontFamily: "open-sauce" }}>
                                  {getDeliveryDate()}
                                </span>
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setZipValid(false);
                                setZip("");
                              }}
                              className="deliver"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path d="M21 12a9 9 0 1 1-3-6.7" />
                                <polyline points="21 3 21 9 15 9" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleZipSubmit();
                              }}
                              className="flex gap-2"
                            >
                              <input
                                type="text"
                                placeholder="Enter your zip code"
                                value={zip}
                                onChange={handleChange}
                              />
                              <button type="submit">
                                <p>Check</p>
                              </button>
                            </form>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Product Image */}
              <div
                className={`h80 relative ${
                  window.innerWidth <= 991 ? "w100" : "w30"
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
                    className={`product-fade-img ${
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
            // className={`${
            //   window.innerWidth <= 991 ? "w100" : "w-fc"
            // } row-flex alc`}
            className={`${true ? "w100" : "w-fc"} horizontal-section row-flex alc`}
            id="detail-section2"
            // style={{ padding: window.innerWidth > 991 && 0 }}
          >
            <div className="grid-suggestion">
              <div
                className="section-subtitle"
                // style={window.innerWidth <= 991 ? {} : { paddingTop: "3rem" }}
                style={window.innerWidth <= 991 ? {} : { paddingTop: "3rem" }}
              >
                <h2>
                  {/* More Like <br className="hide-mobile-only" /> This */}
                  More Like This
                </h2>
              </div>

              {catProduct &&
                catProduct.slice(0, 7).map((p, i) => (
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

          {/* --- Return Policy Section --- */}
          <section
            className={`horizontal-section`}
            // style={{
            //   width: "fit-content",
            //   height: window.innerWidth <= 991 ? "fit-content" : "auto",
            //   maxWidth: "100%",
            //   paddingRight: window.innerWidth <= 991 ? "0" : "5rem",
            // }}
            style={{
              width: "100%",
              height: true ? "fit-content" : "auto",
              maxWidth: "100%",
            }}
            id="detail-section1"
          >
            <div
              // className={`relative section-padding-l h100 w100 ${
              //   window.innerWidth <= 991
              //     ? "inner-flex inner-flex-small"
              //     : "row-flex inner-flex-zero"
              // }`}
              className={`relative h100 w100 ${
                true
                  ? "inner-flex inner-flex-small"
                  : "row-flex inner-flex-zero"
              }`}
            >
              {/* Text section */}
              <div
                className="inner-flex inner-flex-medium h100"
                style={window.innerWidth <= 991 ? { padding: "0 2rem" } : {}}
              >
                <div className="inner-flex">
                  <div className="section-title">
                    <h2 style={{ fontSize: "2.4rem" }}>
                      Return And Replacement Policy
                    </h2>
                  </div>
                  <div
                    className="spec-item spec-item-return"
                    style={{
                      border: "none",
                      display: "block",
                      fontSize: "1.8rem",
                    }}
                  >
                    <ol
                      style={{ listStyleType: "decimal", paddingLeft: "20px" }}
                    >
                      <li>
                        <p>
                          Enjoy hassle-free returns within 2 days of delivery.
                        </p>
                      </li>
                      <li>
                        <p>
                          Products must be unused and packed with original tags.
                        </p>
                      </li>
                      <li>
                        <p>
                          Get your refund within 7-10 working days after pickup
                          and verification.
                        </p>
                      </li>
                      <li>
                        <p>
                          Return of Products purchased under Buy 1 Get 1 or
                          other related offers would be eligible for refund.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="inner-flex inner-flex-smallest">
                  <div
                    className="row-flex inner-flex-small alc jc-s-b"
                    style={{
                      padding: "2rem",
                      // backgroundColor: "var(--orange-color-light)",
                      backgroundColor: "#cd590980",
                      borderRadius: "4px",
                    }}
                  >
                    <div className="ret-sec block inner-flex inner-flex-smallest alc jc-c">
                      <div className="img">
                        <img
                          style={
                            window.innerWidth <= 991
                              ? { width: "60px", height: "60px" }
                              : { width: "100px", height: "100px" }
                          }
                          src="/assets/images/truck.svg"
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <p>Free Shiping</p>
                      </div>
                    </div>
                    <div className="ret-sec block inner-flex inner-flex-smallest alc jc-c">
                      <div className="img">
                        <img
                          style={
                            window.innerWidth <= 991
                              ? { width: "60px", height: "60px" }
                              : { width: "100px", height: "100px" }
                          }
                          src="/assets/images/face.svg"
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <p>Skin Safe Jewellery</p>
                      </div>
                    </div>
                    <div className="ret-sec block inner-flex inner-flex-smallest alc jc-c">
                      <div className="img">
                        <img
                          style={
                            window.innerWidth <= 991
                              ? { width: "60px", height: "60px" }
                              : { width: "100px", height: "100px" }
                          }
                          src="/assets/images/gold.svg"
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <p>18K Gold Tone Plated</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="row-flex inner-flex-small alc jc-s-b"
                    style={{
                      padding: "2rem",
                      borderRadius: "4px",
                    }}
                  >
                    <div className="ret-sec block2 inner-flex inner-flex-zero alc jc-c">
                      <div className="img">
                        <img
                          style={
                            window.innerWidth <= 991
                              ? { width: "38px" }
                              : { width: "55px" }
                          }
                          src="/assets/images/package.svg"
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <p>2 Days Return</p>
                      </div>
                    </div>
                    <div className="ret-sec block2 inner-flex inner-flex-smallest alc jc-c">
                      <div className="img">
                        <img
                          style={
                            window.innerWidth <= 991
                              ? { width: "38px" }
                              : { width: "55px" }
                          }
                          src="/assets/images/repeat-circle.svg"
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <p>10 Days Exchange</p>
                      </div>
                    </div>
                    <div className="ret-sec block2 inner-flex inner-flex-smallest alc jc-c">
                      <div className="img">
                        <img
                          style={
                            window.innerWidth <= 991
                              ? { width: "38px" }
                              : { width: "55px" }
                          }
                          src="/assets/images/rupee-circle.svg"
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <p>Cash On Delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Size Chart Modal --- */}
          {isChartOpen && (
            <div className="size-chart-modal">
              <div className="size-chart-content">
                <div
                  className="close-btn"
                  onClick={() => setIsChartOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h1 className="brand">HOUSE OF DAAS</h1>
                <h2 className="subtitle">Ring Size Guide</h2>

                <div className="instructions">
                  <p>* Choose any existing ring that fits you well</p>
                  <p>
                    * Measure the internal diameter of the ring using a ruler
                  </p>
                  <p>
                    * Use the following size guide to find your perfect size
                  </p>
                </div>

                <table className="size-table">
                  <thead>
                    <tr>
                      <th>US Size</th>
                      <th>Indian Size</th>
                      <th>Millimetres</th>
                      <th>Centimetres</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    <tr>
                      <td>5</td>
                      <td>9</td>
                      <td>15 MM</td>
                      <td>1.5 CM</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>12</td>
                      <td>16 MM</td>
                      <td>1.6 CM</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>14</td>
                      <td>17 MM</td>
                      <td>1.7 CM</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>16</td>
                      <td>18 MM</td>
                      <td>1.8 CM</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>18</td>
                      <td>19 MM</td>
                      <td>1.9 CM</td>
                    </tr>
                  </tbody> */}
                  <tbody>
                    {product.category.includes("Necklaces")
                      ? sizesNeck.map((indianSize, index) => {
                          const usSize = index + 5; // 5 → 9 mapping
                          const mm = usSize + 10; // 5→15, 6→16, etc
                          const cm = (mm / 10).toFixed(1);

                          return (
                            <tr key={indianSize}>
                              <td>{usSize}</td>
                              <td>{indianSize}</td>
                              <td>{mm} MM</td>
                              <td>{cm} CM</td>
                            </tr>
                          );
                        })
                      : sizes.map((indianSize, index) => {
                          const usSize = index + 5; // 5 → 9 mapping
                          const mm = usSize + 10; // 5→15, 6→16, etc
                          const cm = (mm / 10).toFixed(1);

                          return (
                            <tr key={indianSize}>
                              <td>{usSize}</td>
                              <td>{indianSize}</td>
                              <td>{mm} MM</td>
                              <td>{cm} CM</td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
