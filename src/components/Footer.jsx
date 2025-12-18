// ...existing code...
import React from "react";
import { Link } from "react-router-dom";
import "@/assets/styles/footer.css";

export default function Footer() {
  const onSubscribe = (e) => e.preventDefault();

  return (
    <footer className="site-footer">
      <div className="ft-wrap">
        {/* Top: Split headline + gallery and newsletter card */}
        <div className="ft-top">
          <div className="ft-intro">
            <h2 className="ft-heading">
              There is no better way to <em>shine</em>
            </h2>

            <div className="ft-gallery">
              {/* Swap these to any images you like from /public/assets/images */}
              <img
                src="/assets/images/about_banner_5.webp"
                alt="Celebration 1"
              />
              <img
                src="/assets/images/about_banner_3.jpeg"
                alt="Celebration 2"
              />
              <img
                src="/assets/images/about_banner_6.webp"
                alt="Celebration 3"
              />
            </div>
          </div>

          <div className="ft-cta">
            <h2 className="ft-heading right">
              than with jewellery
              <br /> crafted to last —<br /> The DASS
            </h2>

            <div className="ft-newsletter">
              <span className="ft-nl-label">Newsletter</span>
              <p className="ft-nl-copy">
                Join The DASS community for new drops, exclusive offers, and
                jewellery styling tips delivered to your inbox.
              </p>

              <form className="ft-form" onSubmit={onSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  required
                />
                <span className="ft-sign-txt">Sign up</span>
                <button className="ft-arrow" aria-label="Submit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle: links, contact, socials */}
        <div className="ft-middle">
          <nav className="ft-links">
            <ul>
              <li>
                <Link to="/collections">Collections</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              {/* <li><Link to="/wishlist">Wishlist</Link></li> */}
            </ul>
          </nav>

          <address className="ft-contact">
            <a href="mailto:support@thedass.com">support@thedass.com</a>
            <span>Tel: +11 111 111 111</span>
            <span>
              The DASS Studio
              <br /> India
            </span>
          </address>

          <div className="ft-social">
            <a href="#" aria-label="Pinterest" className="ft-social-btn">
              {/* Pinterest */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 0 0-3.5 19.4c-.05-.83-.1-2.1.02-3 .11-1 .76-4.84.76-4.84s-.19-.39-.19-.97c0-.91.53-1.59 1.19-1.59.56 0 .83.42.83.93 0 .57-.36 1.42-.55 2.21-.16.67.34 1.21 1 1.21 1.2 0 2.12-1.27 2.12-3.1 0-1.62-1.16-2.76-2.82-2.76-1.92 0-3.05 1.44-3.05 2.93 0 .58.22 1.21.5 1.55.05.06.06.11.04.17-.04.19-.13.6-.15.69-.02.08-.09.11-.17.07-.63-.3-1.02-1.24-1.02-2 0-1.63 1.19-3.13 3.44-3.13 1.8 0 3.2 1.29 3.2 3.01 0 1.79-1.12 3.23-2.68 3.23-.52 0-1.02-.27-1.19-.6l-.32 1.22c-.12.46-.45 1.04-.66 1.39.5.15 1.03.23 1.58.23A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="ft-social-btn">
              {/* Instagram */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom">
          <div>
            <span>©</span> The DASS 2025
          </div>
          <div className="ft-legal">
            <a href="#">Terms &amp; Conditions</a>
            <span className="dot">•</span>
            <a href="#">Disclaimer</a>
          </div>
          <div>website by The DASS</div>
        </div>
        <div className="ft-bottom2 w100 row-flex jc-s-b alc">
          <div>
            Developed By:{" "}
            <a href="tel:+911234567890" aria-label="Call Prashant">
              Prashant
            </a>
            , Nikhil and {" "}
            <a
            href="#"
            aria-label="Open Darshan portfolio"
            onClick={(e) => {
              e.preventDefault();
              const url = "https://darshangohel-portfolio.netlify.app/"; // replace with real URL
              const w = window.open("", "darshan_portfolio", "width=1000,height=700");
              if (!w) return;
              w.document.write(`
                <html>
                  <head><title>Darshan Portfolio</title></head>
                  <body style="margin:0">
                    <iframe src="${url}" style="border:0;width:100%;height:100vh"></iframe>
                  </body>
                </html>
              `);
              w.document.close();
            }}
          >
            Darshan
          </a>
          </div>
          <div>Designed By: Aman Shah</div>
        </div>
      </div>
    </footer>
  );
}
