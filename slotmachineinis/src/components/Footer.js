import React from "react";
import "./Css/Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function Footer() {
  const inisWeb = () => {
    window.location = "https://zodiacblockchainsolutions.com/";
  };
  const Instagram = () => {
    window.location = "https://www.instagram.com/zodiacblockchainsolutions/";
  };
  const Tiktok = () => {
    window.location = "https://www.tiktok.com/@zodiacblockchainsolution";
  };
  const LinkedIn = () => {
    window.location =
      "https://www.linkedin.com/company/zodiac-blockchain-solutionss/";
  };

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          More infor about us and our team
        </p>

        <div class="footer-links">
          <div className="footer-link-wrapper">
            <div class="footer-link-items">
              <h2>About Us</h2>
              <Link to="/games">How it works</Link>
              <Link onClick={LinkedIn}>Investors</Link>
              <Link to="/">Terms of Service</Link>{" "}
              {/* Onclick poner unos terminos y condicios (paginas por internet) */}
            </div>
            <div class="footer-link-items">
              <h2>Contact Us</h2>
              <Link onClick={LinkedIn}>Contact</Link>
              <Link onClick={LinkedIn}>Support</Link>
            </div>
          </div>
          <div className="footer-link-wrapper">
            <div class="footer-link-items">
              <h2>Social Media</h2>
              <Link
                class="social-icon-link linkedin"
                onClick={LinkedIn}
                target="_blank"
                aria-label="LinkedIn"
              >
                <i class="fab fa-linkedin" />
              </Link>
              <Link
                class="social-icon-link instagram"
                onClick={Instagram}
                target="_blank"
                aria-label="Instagram"
              >
                <i class="fab fa-instagram" />
              </Link>
              <Link
                class="social-icon-link tiktok"
                onClick={Tiktok}
                target="_blank"
                aria-label="Tik-Tok"
              >
                <i class="fab fa-tiktok" />
              </Link>
            </div>
          </div>
        </div>

        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              ZODIAC
              <img class="navbar-icon" src="/images/gemini.png" />
              {/*  La imagen no es cuadrada */}
            </Link>
          </div>
          <small class="website-rights">Sergi Alsina 2022</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
