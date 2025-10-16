import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "@/assets/styles/detailPage.css";

export default function ProductDetails({ products }) {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [catProduct, setCatProduct] = useState(null);

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

  return (
    <div className="detail-wrapper">
      {product && (
        <>
          {/* --- Product Section --- */}
          <section className="horizontal-section w-fc" id="detail-section1">
            <div
              className={`relative section-padding h100 ${
                window.innerWidth <= 991
                  ? "w100 inner-flex inner-flex-small"
                  : "w-fc row-flex inner-flex-zero"
              }`}
            >
              {/* Text section */}
              <div className="inner-flex inner-flex-big h100">
                <div className="inner-flex">
                  <div className="section-title">
                    <h2>{product.name}</h2>
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
                <div className="product-image">
                  <img
                    className={`h100 product-fade-img ${
                      mainLoaded ? "fade-in" : "fade-out"
                    }`}
                    src={mainSrc || placeholder}
                    alt={product.name}
                  />
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
