import React, { useEffect, useMemo, useRef, useState } from "react";

// Contract:
// - Renders 4 tabs (Quality, Love, Creative & Bold, Original)
// - Clicking a tab changes center image and right-side title/content
// - Autoplay cycles tabs; manual interaction resets the timer
// - Shows a circular progress in .delay-spinner indicating time left
// - Animations: content fades in; image slides up over previous (stacked)

const DEFAULT_TABS = [
  {
    key: "quality",
    label: "Quality",
    title: "Quality",
    content:
      "Crafted with precision and attention to detail—materials and finishes you can feel.",
    image: "/assets/images/about_banner_6.webp",
  },
  {
    key: "love",
    label: "Love",
    title: "Love",
    content:
      "Designed to be cherished and gifted—timeless pieces that carry your stories.",
    image: "/assets/images/about_banner_5.webp",
  },
  {
    key: "creative",
    label: "Creative & Bold",
    title: "Creative & Bold",
    content:
      "A modern edge with fearless shapes and textures—statement silhouettes for every day.",
    image: "/assets/images/about_banner_3.jpeg",
  },
  {
    key: "original",
    label: "Original",
    title: "Original",
    content:
      "Distinct by design—original pieces that stand apart with clarity and confidence.",
    image: "/assets/images/about_banner_4.jpeg",
  },
];

const AUTOPLAY_DELAY = 4500; // ms

const AboutValuesTabs = ({ tabs = DEFAULT_TABS, delay = AUTOPLAY_DELAY }) => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const timerRef = useRef(null);
  const startedAtRef = useRef(null);
  const rafRef = useRef(null);
  const spinnerRef = useRef(null);

  const count = tabs.length;

  const current = useMemo(() => tabs[index % count], [tabs, index, count]);
  const previous = useMemo(
    () => tabs[prevIndex % count],
    [tabs, prevIndex, count]
  );

  const goTo = (i) => {
    setPrevIndex(index);
    setIndex(((i % count) + count) % count);
    resetAutoplay();
  };

  const next = () => goTo((index + 1) % count);

  const stopLoops = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    timerRef.current = null;
    rafRef.current = null;
  };

  const startProgressRAF = () => {
    const tick = () => {
      const elapsed = Date.now() - startedAtRef.current;
      const prog = Math.min(1, elapsed / delay);
      if (spinnerRef.current) {
        spinnerRef.current.style.setProperty("--prog", prog);
      }
      if (elapsed >= delay) {
        startedAtRef.current = Date.now();
        // advance and capture prev index atomically
        setIndex((prev) => {
          const next = (prev + 1) % count;
          setPrevIndex(prev);
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const resetAutoplay = () => {
    stopLoops();
    startedAtRef.current = Date.now();
    if (spinnerRef.current) spinnerRef.current.style.setProperty("--prog", 0);
    // Keep a coarse interval to ensure slide changes even if the tab is throttled,
    // but drive the progress with rAF for smoothness without React re-renders
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAtRef.current;
      if (elapsed >= delay) {
        startedAtRef.current = Date.now();
        setIndex((prev) => {
          const next = (prev + 1) % count;
          setPrevIndex(prev);
          return next;
        });
      }
    }, Math.min(1000, delay));
    startProgressRAF();
  };

  useEffect(() => {
    resetAutoplay();
    return () => stopLoops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, count]);

  // Build image stack once for positions; we switch classes based on active indices
  return (
    <>
      <div className="values-tabs values-tabs-desktop w80 m-auto row-flex alc jc-c inner-flex-big">
        {/* Left: Tabs */}
        <div className="text_content m-auto">
          <div className="inner-flex inner-flex-small">
            {tabs.map((t, i) => (
              <h2
                key={t.key}
                className={`tab-item ${
                  i === index ? "is-active" : "is-inactive"
                }`}
                onClick={() => goTo(i)}
              >
                {t.label}
              </h2>
            ))}
          </div>
        </div>

        {/* Middle: Image + spinner + caption */}
        <div className="w30 text-center">
          <div className="inner-flex">
            <div className="tab-img img-stack">
              {tabs.map((t, i) => {
                const isActive = i === index;
                const isPrev = i === prevIndex;
                return (
                  <img
                    key={t.key}
                    src={t.image}
                    alt={t.title}
                    className={`stack-img ${
                      isActive ? "is-active" : isPrev ? "is-prev" : "is-idle"
                    }`}
                    loading="lazy"
                  />
                );
              })}
            </div>
            <div className="text f-1">
              <h3>Our core values</h3>
            </div>
            {/* <div
                            className="delay-spinner"
                            title="Autoplay progress"
                            ref={spinnerRef}
                        /> */}
          </div>
        </div>

        {/* Right: Title + Content */}
        <div className="w30">
          <div key={index} className="title fade-in">
            <h2>{current.title}</h2>
          </div>
          <div key={`${index}-c`} className="content fade-in">
            <h2>{current.content}</h2>
          </div>
        </div>
      </div>
      {/* Mobile layout */}
      <div className="values-tabs-mobile">
        <div className="section-title text-center">
          <h2>Our core values</h2>
        </div>
        <div className="mobile-card">
          <div className="tab-img img-stack">
            {tabs.map((t, i) => {
              const isActive = i === index;
              const isPrev = i === prevIndex;
              return (
                <img
                  key={t.key}
                  src={t.image}
                  alt={t.title}
                  className={`stack-img ${
                    isActive ? "is-active" : isPrev ? "is-prev" : "is-idle"
                  }`}
                  loading="lazy"
                />
              );
            })}
          </div>
          <div key={`m-${index}`} className="mobile-card-title fade-in">
            <h3>{current.title}</h3>
          </div>
          <div key={`m-${index}-c`} className="mobile-card-content fade-in">
            <p>{current.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutValuesTabs;
