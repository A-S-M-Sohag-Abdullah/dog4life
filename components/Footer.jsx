import React, { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";
import logo from "../public/assets/logo.svg"; // Adjust the path as needed
import Link from "next/link";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer
      className={`${styles.main} ${styles.footer}`}
      aria-label="Footer"
      style={{ backgroundColor: "#F0EEE7" }}
    >
      <div className={` relative z-50 ${styles.footerGrid}`}>
        {/* Dodgeball logo */}
        <div className={styles.footerLogo}>
          <Link href="/">
            <img src={logo.src} alt="" />
          </Link>
        </div>

        {/* Company */}
        <nav
          className={`relative z-50 ${styles.footerLinks}`}
          aria-label="Company"
        >
          <h4>Company</h4>
          <Link href="#">About</Link>
          <Link href="#">Join Us</Link>
          <Link href="#">Events</Link>
          <Link href="#">FAQ</Link>
        </nav>

        {/* Community */}
        <nav className={styles.footerLinks} aria-label="Community">
          <h4>Community</h4>
          <Link href="#">WhatsApp</Link>
          <Link href="#">Discord</Link>
          <Link href="#">Newsletter</Link>
        </nav>

        {/* Legal */}
        <nav className={styles.footerLinks} aria-label="Legal">
          <h4>Legal</h4>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/code-of-conduct">Rules</Link>
          <Link href="/code-of-conduct">Code of Conduct</Link>
        </nav>

        {/* Contact + social */}
        <div className={`${styles.footerLinks} ${styles.footerContact}`}>
          <h4>Contact</h4>
          <p>
            <Link href="mailto:gronsdodgeball@gmail.com">
              gronsdodgeball@gmail.com
            </Link>
          </p>
          <div className={styles.socialIcons}>
            <Link
              href="https://instagram.com/gronsdodgeball"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img
                src="/assets/socials/instagram.svg"
                alt="Instagram"
                width="28"
                height="28"
              />
            </Link>
            <Link
              href="https://tiktok.com/@gronsdodgeball"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <img
                src="/assets/socials/tiktok.svg"
                alt="TikTok"
                width="28"
                height="28"
              />
            </Link>
            <Link
              href="https://facebook.com/gronsdodgeball"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <img
                src="/assets/socials/facebook.svg"
                alt="Facebook"
                width="28"
                height="28"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`relative z-50 ${styles.footerBottom}`}>
        <div>&copy; {year} Gron’s Dodgeball. All rights reserved.</div>
        <div
          className={styles.paymentIcons}
          aria-label="Payment Methods"
          style={{ position: "relative" }}
        >
          <style>
            {`
              .${styles.paymentIcons} img:hover {
                filter: none;
                opacity: 1;
              }
            `}
          </style>
          <img
            src="/assets/paymenticons/ideal.svg"
            alt="iDEAL"
            width="40"
            height="20"
          />
          <img
            src="/assets/paymenticons/applepay.svg"
            alt="Apple Pay"
            width="40"
            height="20"
          />
          <img
            src="/assets/paymenticons/googlepay.svg"
            alt="Google Pay"
            width="40"
            height="20"
          />
          <img
            src="/assets/paymenticons/visapay.svg"
            alt="Visa"
            width="40"
            height="20"
          />
          <img
            src="/assets/paymenticons/mastercard.svg"
            alt="MasterCard"
            width="40"
            height="20"
          />
          <img
            src="/assets/paymenticons/amex.svg"
            alt="PayPal"
            width="40"
            height="20"
          />
        </div>
      </div>
    </footer>
  );
}
