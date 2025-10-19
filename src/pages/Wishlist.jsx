import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import productsData from "@/assets/data/products";
import "@/assets/styles/wishlist.css";
import { useWishlist } from "@/context/WishlistContext";

export default function Wishlist({ products = productsData }) {
    const { ids, remove: ctxRemove } = useWishlist();
    const containerRef = useRef(null);

    const items = useMemo(() => {
        const map = new Map(products.map((p) => [String(p.id), p]));
        return ids.map((id) => map.get(String(id))).filter(Boolean);
    }, [ids, products]);

    // Mount animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".wl-hero", { opacity: 0, duration: 0.5, ease: "power2.out" });
            gsap.from(".wl-card", { opacity: 0, duration: 0.4, ease: "power1.out", stagger: 0.05, delay: 0.05 });
        }, containerRef);
        return () => ctx.revert();
    }, [items.length]);

    // using context remove

    if (!items.length) {
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
                {items.map((p) => (
                    <article className="wl-card" key={p.id}>
                        {/* Thumbnail wrapper keeps a consistent height across cards */}
                        <Link to={`/products/${p.slug}`} className="wl-thumb">
                            <img src={p.image} alt={p.name} loading="lazy" />
                        </Link>
                        <div className="wl-info">
                            <h3>{p.name}</h3>
                            <div className="wl-meta">
                                <span className="wl-price">${p.price?.toFixed(2)}</span>
                                <span className={`wl-stock ${p.inStock ? "in" : "out"}`}>
                                    {p.inStock ? "In stock" : "Out of stock"}
                                </span>
                            </div>
                        </div>
                        <div className="wl-actions">
                            <button className="wl-remove cp" onClick={() => ctxRemove(p.id)} aria-label={`Remove ${p.name}`}>
                                Remove
                            </button>
                            <Link to={`/products/${p.slug}`} className="wl-view cp">View</Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
