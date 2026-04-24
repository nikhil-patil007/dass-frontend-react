import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import useCartStore from "@/store/useCartStore";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import "@/assets/styles/cart.css";

export default function Cart() {
  const {
    cart,
    isLoading,
    fetchCart,
    updateCartItem,
    removeCartItem,
    clearCart,
  } = useCartStore();
  const containerRef = useRef(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchCart();
    }
  }, [fetchCart]);

  const items = cart?.items || [];
  const subtotal = parseFloat(cart?.total_price || 0);

  useEffect(() => {
    if (!items.length) return;
    const ctx = gsap.context(() => {
      gsap.from(".cart-hero", { opacity: 0, duration: 0.4 });
      gsap.from(".cart-row", { opacity: 0, duration: 0.3, stagger: 0.05, delay: 0.05 });
    }, containerRef);
    return () => ctx.revert();
  }, [items.length]);

  const handleIncrement = async (item) => {
    const result = await updateCartItem(item.id, item.quantity + 1);
    if (!result.success) toast.error(result.error);
  };

  const handleDecrement = async (item) => {
    if (item.quantity <= 1) {
      handleRemove(item.id);
      return;
    }
    const result = await updateCartItem(item.id, item.quantity - 1);
    if (!result.success) toast.error(result.error);
  };

  const handleRemove = async (itemId) => {
    const result = await removeCartItem(itemId);
    if (result.success) toast.success("Item removed");
    else toast.error(result.error);
  };

  const handleClear = async () => {
    await clearCart();
    toast.success("Cart cleared");
  };

  // Show loader on first load
  if (isLoading && !cart) {
    return <Loader variant="page" text="Loading your cart…" />;
  }

  if (!items.length) {
    return (
      <section ref={containerRef} className="cart-page">
        <div className="cart-hero empty">
          <h1>Your Cart</h1>
          <p>Your cart is empty. Keep shopping to add items.</p>
          <Link to="/collections" className="cart-btn">Browse Collection</Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="cart-page">
      <div className="cart-hero">
        <h1>Your Cart</h1>
        <button className="cart-clear" onClick={handleClear} disabled={isLoading}>Clear all</button>
      </div>
      <div className="cart-grid">
        <div className="cart-list">
          {items.map((item) => {
            const product = item.product || {};
            const thumbnail = product.thumbnail;
            const name = product.name || item.product_name || "Product";
            const price = parseFloat(product.selling_price || product.base_price || item.price || 0);
            const slug = product.slug || "";

            return (
              <div className="cart-row" key={item.id}>
                <Link to={slug ? `/products/${slug}` : "#"} className="cart-thumb">
                  {thumbnail ? (
                    <img src={thumbnail} alt={name} loading="lazy" />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#999" }}>No image</div>
                  )}
                </Link>
                <div className="cart-info">
                  <h3>{name}</h3>
                  <div className="cart-price">₹{price.toFixed(2)}</div>
                  <div className="cart-qty">
                    <button onClick={() => handleDecrement(item)} aria-label="Decrease" disabled={isLoading}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)} aria-label="Increase" disabled={isLoading}>+</button>
                  </div>
                  <button className="cart-remove" onClick={() => handleRemove(item.id)} disabled={isLoading}>Remove</button>
                </div>
                <div className="cart-line-total">₹{parseFloat(item.line_total || 0).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
        <aside className="cart-summary">
          <div className="sum-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="sum-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <button className="cart-checkout">Proceed to Checkout</button>
          <Link to="/collections" className="cart-continue cp">Continue Shopping</Link>
        </aside>
      </div>
    </section>
  );
}
