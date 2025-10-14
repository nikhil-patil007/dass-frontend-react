import React, { useEffect, useRef } from "react";
import "../assets/styles/grid.css";
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

    itemsRef.current.forEach((item) => {
      const img = item.querySelector("img");
      const text = item.querySelector(".info");

      // Create a timeline for each item
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 60%",
          toggleActions: "play none none none",
          // markers: true, // Uncomment to debug
        },
      });

      // Animate image scale
      tl.fromTo(
        img,
        { scale: 0 },
        { scale: 1, duration: 0.8, ease: "power3.out" }
      );

      // Animate text rolling up AFTER image
      tl.fromTo(
        text,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "+=0.1" // slight delay after image animation
      );
    });
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
            <Link to={`/products/${p.id}`}>
              <div className="item-img">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="info">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
