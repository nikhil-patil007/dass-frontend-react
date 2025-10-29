import React, { useEffect, useRef } from "react";
import "@/assets/styles/grid.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function GridView({ products }) {
  const itemsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    const timelines = [];

    const waitForImage = (imageEl) =>
      new Promise((resolve) => {
        if (!imageEl) return resolve();
        if (imageEl.complete && imageEl.naturalWidth > 0) return resolve();
        const onLoad = () => resolve();
        const onError = () => resolve();
        imageEl.addEventListener("load", onLoad, { once: true });
        imageEl.addEventListener("error", onError, { once: true });
      });

    itemsRef.current.forEach((item) => {
      if (!item) return;
      const img = item.querySelector("img");
      const text = item.querySelector(".info");

      // Ensure initial state: image at scale 0 (no opacity changes)
      if (img) {
        gsap.set(img, { scale: 0, transformOrigin: "50% 50%", willChange: "transform" });
      }

      waitForImage(img).then(() => {
        // Create a timeline for each item only after the image is loaded
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            once: true, // run only once for a smooth pop-out
          },
        });

        // Smooth pop-out: scale 0 -> 1 without opacity changes
        tl.to(img, { scale: 0.8, duration: 1, ease: "bounce.out" });

        // Animate text rolling up AFTER image
        tl.fromTo(
          text,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "+=0.1"
        );

        timelines.push(tl);
      });
    });

    return () => {
      // Cleanup timelines and their ScrollTriggers
      timelines.forEach((tl) => tl?.kill());
    };
  }, []);

  return (
    <div className="">
      <div className="page-title" ref={titleRef}>
        <h2>Explore collections</h2>
      </div>
      <div className="grid-wrapper">
        {products.map((p, i) => (
          <div
            className="grid-item"
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
          >
            <div className="item-img">
              <img src={p.image} alt={p.name} />
              <Link className="explore-btn" to={`/products/${p.slug}`} aria-label={`Explore ${p.name}`}>
                <span className="explore-box text-box">explore</span>
                <span className="explore-box icon-box" aria-hidden="true">
                  <svg className="explore-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" width="16" height="10" fill="none">
                    <path d="M1 5h14M11 9l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
            <div className="info">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
