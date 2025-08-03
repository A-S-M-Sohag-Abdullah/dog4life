"use client";

import { useEffect, useState, useRef } from "react";
import styles from "../styles/AboutUsPage.module.css";
import "../app/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const AboutSection = () => {
  const [mounted, setMounted] = useState(false);

  const canvasRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [canvasWhiteMode, setCanvasWhiteMode] = useState(false);

  useEffect(() => {
    // Trigger animation after hydration
    setMounted(true);
  }, []);

  // Canvas animation setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener("resize", setSize);

    let animationFrame;
    let lastDraw = 0;
    const fps = 12;
    const interval = 1000 / fps;
    let isAnimating = false;
    let inactivityTimeout;

    const drawNoise = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const dotCount = 1000;
      // Debug: log current mode
      console.log("drawNoise: canvasWhiteMode:", canvasWhiteMode);
      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const radius = Math.random() * 0.5 + 0.5;
        const alpha = Math.random() * 0.2 + 0.1;
        const alpha2 = Math.random() * 0.3 + 0.2;

        let r, g, b;
        if (canvasWhiteMode) {
          const isOrange = Math.random() < 0.5;
          if (isOrange) {
            r = 255;
            g = 165;
            b = 0;
          } else {
            r = 255;
            g = 255;
            b = 255;
          }
        } else {
          const isOrange = Math.random() < 0.5;
          if (isOrange) {
            r = 255;
            g = 165;
            b = 0;
          } else {
            r = 0;
            g = 0;
            b = 0;
          }
        }
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = canvasWhiteMode
          ? `rgba(${r}, ${g}, ${b}, ${alpha2})`
          : `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }
    };

    const loop = (now) => {
      if (now - lastDraw > interval) {
        drawNoise();
        lastDraw = now;
      }
      animationFrame = requestAnimationFrame(loop);
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        setShowCanvas(true);
        animationFrame = requestAnimationFrame(loop);
      }
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(stopAnimation, 30); // stop if no activity for 800ms
    };

    const stopAnimation = () => {
      if (isAnimating) {
        cancelAnimationFrame(animationFrame);
        isAnimating = false;
      }
    };

    // Events that trigger animation
    const handleUserActivity = () => {
      startAnimation();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("wheel", handleUserActivity);

    // Draw one static frame at start
    drawNoise();

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(inactivityTimeout);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("wheel", handleUserActivity);
    };
  }, [canvasWhiteMode]);

  return (
    <>
      <div className=" top-0 h-full text-black w-full left-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-700 ease-in-out ${
            showCanvas ? "opacity-[1]" : "opacity-0"
          }`}
          style={{ mixBlendMode: "multiply" }}
        />
        <NavBar />
        <div className={styles.aboutWrapper}>
          <div className={styles.sectionLabel}>ABOUT US</div>
          <p className={mounted ? styles.fadeIn : styles.hidden}>
            <span className={styles.highlight}>Born in Groningen</span>, built
            for community. Gron&apos;s Dodgeball started because we missed a place to
            just play, laugh, dodge foam balls and become a real community along
            the way.
          </p>
          <p className={mounted ? styles.fadeIn : styles.hidden}>
            Each week, people show up not just to play, but to connect. Whether
            you&apos;re a first-timer or a foam master: you&apos;re part of the dodgers.
            🧡
          </p>
          <p className={mounted ? styles.fadeIn : styles.hidden}>
            We&apos;re growing fast from{" "}
            <span className={styles.highlight}>youth dodgeball</span> to{" "}
            <span className={styles.highlight}>team-building clinics</span> for
            businesses. It’s a movement. It’s fun. It’s a new way to meet people
            offline.
          </p>
          <p className={mounted ? styles.fadeIn : styles.hidden}>
            <strong>
              Come throw with us. Or just vibe. You’re welcome either way.
            </strong>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutSection;
