import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useCart } from "@/context/CartContext";
import products from "@/assets/data/products";
import "@/assets/styles/cart.css";

export default function Cart() {
  const { items, increment, decrement, remove, clear } = useCart();
  const containerRef = useRef(null);

  const rows = useMemo(() => {
    const map = new Map(products.map((p) => [String(p.id), p]));
    return items.map((it) => ({ ...map.get(String(it.id)), qty: it.qty })).filter(Boolean);
  }, [items]);

  const subtotal = rows.reduce((sum, r) => sum + (r.price || 0) * (r.qty || 0), 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cart-hero", { opacity: 0, duration: 0.4 });
      gsap.from(".cart-row", { opacity: 0, duration: 0.3, stagger: 0.05, delay: 0.05 });
    }, containerRef);
    return () => ctx.revert();
  }, [rows.length]);

  if (!rows.length) {
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
        <button className="cart-clear" onClick={clear}>Clear all</button>
      </div>
      <div className="cart-grid">
        <div className="cart-list">
          {rows.map((p) => (
            <div className="cart-row" key={p.id}>
              <Link to={`/products/${p.slug}`} className="cart-thumb">
                <img src={p.image} alt={p.name} loading="lazy" />
              </Link>
              <div className="cart-info">
                <h3>{p.name}</h3>
                <div className="cart-price">${p.price?.toFixed(2)}</div>
                <div className="cart-qty">
                  <button onClick={() => decrement(p.id)} aria-label="Decrease">−</button>
                  <span>{p.qty}</span>
                  <button onClick={() => increment(p.id)} aria-label="Increase">+</button>
                </div>
                <button className="cart-remove" onClick={() => remove(p.id)}>Remove</button>
              </div>
              <div className="cart-line-total">${(p.price * p.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <aside className="cart-summary">
          <div className="sum-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
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
