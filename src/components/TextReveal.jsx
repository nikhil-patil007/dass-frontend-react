import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/assets/styles/about.css";

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ text, className, id }) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Split text into lines
        const split = new SplitType(textRef.current, {
            types: "lines",
            lineClass: "line_wrapper",
            tagName: "div", // outer wrapper for each line
        });

        // Wrap each line in a span for animation
        document.querySelectorAll(`#${id} .line_wrapper`).forEach((line) => {
            const span = document.createElement("span");
            span.innerHTML = line.innerHTML;
            span.style.display = "inline-block";
            span.style.transform = "translateY(100%)";
            line.innerHTML = "";
            line.appendChild(span);
        });

        // Animate lines on scroll
        gsap.to(`#${id} .line_wrapper span`, {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });
    }, []);

    return (
        <h2 ref={textRef} className={className} id={id}>
            {text}
        </h2>
    );
};

export default TextReveal;
