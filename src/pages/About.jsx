import React, { useRef, useLayoutEffect, useEffect } from "react";
import "@/assets/styles/about.css";
import { gsap } from "gsap";
import TextReveal from "@/components/TextReveal";
import { Link } from "react-router-dom";

const About = ({ products }) => {
  const bannerRef = useRef(null);
  const imgRef = useRef(null);

  // Simple parallax on banner
  useLayoutEffect(() => {
    const banner = bannerRef.current;
    const img = imgRef.current;
    if (!banner || !img) return;

    const rect = banner.getBoundingClientRect();
    const scrollProgress = rect.top / window.innerHeight;
    const parallaxY = scrollProgress * -5;

    img.style.transform = `translateY(${parallaxY}%)`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const banner = bannerRef.current;
      const img = imgRef.current;
      if (!banner || !img) return;

      const rect = banner.getBoundingClientRect();
      const scrollProgress = rect.top / window.innerHeight;
      const parallaxY = scrollProgress * -5;

      img.style.transform = `translateY(${parallaxY}%)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about_wrapper nav-padding">
      <section className="section-padding section-padding-t">
        <div className="italic section-title text-center">
          <h2>Let's Celebrate</h2>
        </div>
        <div className="small-text">
          <h3>About DASS</h3>
        </div>
        <div className="about_banner" ref={bannerRef}>
          <img
            ref={imgRef}
            src="./assets/images/about_banner_5.webp"
            alt="About Banner"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="row-flex jc-s-b inner-flex-big">
          <div className="w20">
            <div className="sec_2_image">
              <img
                src="./assets/images/about_banner_6.webp"
                alt="About Image"
              />
            </div>
          </div>
          <div className="text_content w50">
            <TextReveal
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius in quae veniam. Veniam fugiat consequatur tempora voluptatum beatae labore repellat unde eum cumque, obcaecati officiis quibusdam modi, id sed exercitationem assumenda a est ipsum illum in minima corporis."
              id="animate-text-bottom"
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="bg-green section-padding sec-3">
          <div className="row-flex inner-flex-medium jc-s-b">
            <div className="w50 inner-flex inner-flex-medium mr-auto">
              <div className="sec-3-title">
                <TextReveal text="Our Vision" id="sec-3-title1" />
              </div>
              <div className="text_content">
                <TextReveal
                  text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
                  asperiores natus nemo praesentium, magni aperiam dolorum
                  consequuntur aliquam atque voluptatum!"
                  id="sec-3-content1"
                />
              </div>
            </div>
            <div className="w40 inner-flex inner-flex-medium m-auto">
              <div className="sec-3-title">
                <TextReveal text="Our Mission" id="sec-3-title2" />
              </div>
              <div className="text_content2">
                <TextReveal
                  text="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias eligendi nostrum eum eos temporibus enim, nobis
                  explicabo, ea numquam non impedit pariatur et iste ipsum?"
                  id="sec-3-content2"
                />
              </div>
              <div className="mission-img">
                <img src="./assets/images/about_banner_3.jpeg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding sec-4 relative">
        <div className="overlay"></div>
        <div
          className="row-flex jc-s-b inner-flex-big relative"
          style={{ top: "90%", zIndex: 2 }}
        >
          <div className="w30 mr-auto">
            <div className="sec-4-title">
              <h1>Out Story</h1>
            </div>
          </div>
          <div className="sec-4-content w40">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              nostrum corrupti provident blanditiis, eveniet numquam ea aliquid
              aperiam cumque culpa ratione fuga accusamus placeat nihil corporis
              consequatur, recusandae doloremque distinctio.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding sec-5 relative">
        Pending Swiper
      </section>

      <section className="section-padding text-center sec-6 relative inner-flex alc jc-c">
        <div className="section-title">
          <h2>
            Discover The <br /> DASS Collection
          </h2>
        </div>
        <div className="section-subtitle">
          <h2>
            Bring elegance and unforgettable <br /> experience to your style
            with DASS Jewellery.
          </h2>
        </div>
        <div className="section-subtitle-btn cp">
          <Link to="/">
            <h2>
              Explore collections
              <span className="btn-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" fill="none" class="icon-8px"><path d="M1.00195 4.99999H15.002M11 8.99999L15 4.99999L11 1.00055" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>
            </h2>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
