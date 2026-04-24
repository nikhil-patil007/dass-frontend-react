import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import useWishlistStore from "@/store/useWishlistStore";
import useCartStore from "@/store/useCartStore";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import "@/assets/styles/wishlist.css";

export default function Wishlist() {
  const {
    wishlistItems,
    isLoading,
    fetchWishlist,
    removeFromWishlist,
  } = useWishlistStore();
  const { addToCart } = useCartStore();
  const containerRef = useRef(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchWishlist();
    }
  }, [fetchWishlist]);

  // Mount animation
  useEffect(() => {
    if (!wishlistItems.length) return;
    const ctx = gsap.context(() => {
      gsap.from(".wl-hero", { opacity: 0, duration: 0.5, ease: "power2.out" });
      gsap.from(".wl-card", { opacity: 0, duration: 0.4, ease: "power1.out", stagger: 0.05, delay: 0.05 });
    }, containerRef);
    return () => ctx.revert();
  }, [wishlistItems.length]);

  const handleRemove = async (wishlistItemId) => {
    const result = await removeFromWishlist(wishlistItemId);
    if (result.success) toast.success("Removed from wishlist");
    else toast.error(result.error);
  };

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId, 1);
    if (result.success) toast.success(result.message);
    else toast.error(result.error);
  };

  // Show loader on first load
  if (isLoading && !wishlistItems.length) {
    return <Loader variant="page" text="Loading wishlist…" />;
  }

  if (!wishlistItems.length) {
    return (
      <section ref={containerRef} className="wishlist-page">
        <div className="wl-hero empty">
          <h1>Wishlist</h1>
          <p>Your wishlist is empty. Start exploring our collection.</p>
          <Link to="/collections" className="wl-btn cp">Browse Collection</Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="wishlist-page">
      <div className="wl-hero">
        <h1>Wishlist</h1>
        <p>Saved items you love. Keep them handy and come back anytime.</p>
      </div>

      <div className="wl-grid">
        {wishlistItems.map((item) => {
          const product = item.product || {};
          const name = product.name || "Product";
          const slug = product.slug || "";
          const price = parseFloat(product.selling_price || product.base_price || 0);
          const thumbnail = product.thumbnail;
          const inStock = product.is_in_stock !== false;

          return (
            <article className="wl-card" key={item.id}>
              <Link to={slug ? `/products/${slug}` : "#"} className="wl-thumb">
                {thumbnail ? (
                  <img src={thumbnail} alt={name} loading="lazy" />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#999" }}>No image</div>
                )}
              </Link>
              <div className="wl-info">
                <h3>{name}</h3>
                <div className="wl-meta">
                  <span className="wl-price">₹{price.toFixed(2)}</span>
                  <span className={`wl-stock ${inStock ? "in" : "out"}`}>
                    {inStock ? "In stock" : "Out of stock"}
                  </span>
                </div>
              </div>
              <div className="wl-actions">
                <button
                  className="wl-remove cp"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${name}`}
                  disabled={isLoading}
                >
                  Remove
                </button>
                {inStock && (
                  <button
                    className="wl-view cp"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={isLoading}
                  >
                    Add to Cart
                  </button>
                )}
                <Link to={slug ? `/products/${slug}` : "#"} className="wl-view cp">View</Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
