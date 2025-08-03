"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardContainerRef = useRef(null);
  const quoteRef = useRef(null);
  const introRef = useRef(null);
  const whyLoveRef = useRef(null);
  const listItemRefs = useRef([]);
  const lastParagraphRef = useRef(null);

  useEffect(() => {
    listItemRefs.current = []; // clear list on re-render
  }, []);

  const addToListRefs = (el) => {
    if (el && !listItemRefs.current.includes(el)) {
      listItemRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 30%",
          scrub: 1.2,
        },
      });

      // Card animation
      gsap.from(cardContainerRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Inner content stagger
      gsap
        .timeline({
          scrollTrigger: {
            trigger: cardContainerRef.current,
            start: "top 75%",
          },
        })
        .from(quoteRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
        })
        .from(
          introRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          whyLoveRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
          },
          "-=0.4"
        )
        .from(
          listItemRefs.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.3,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(
          lastParagraphRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className=" relative">
      {/* Decorative Top Curve */}

      <div className="absolute -top-[2px] sm:-top-[4px] md:-top-[9px] z-[70] left-0 w-full">
        <svg
          viewBox="0 0 1440 14"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="
      M0,7
      C10,4 20,10 30,7
      C40,5 50,9 60,7
      C70,6 80,8 90,7
      C100,5 110,9 120,7
      C130,6 140,8 150,7
      C160,4 170,10 180,7
      C190,6 200,8 210,7
      C220,5 230,9 240,7
      C250,6 260,8 270,7
      C280,4 290,10 300,7
      C310,5 320,9 330,7
      C340,6 350,8 360,7
      C370,5 380,9 390,7
      C400,6 410,8 420,7
      C430,4 440,10 450,7
      C460,5 470,9 480,7
      C490,6 500,8 510,7
      C520,5 530,9 540,7
      C550,6 560,8 570,7
      C580,4 590,10 600,7
      C610,6 620,8 630,7
      C640,5 650,9 660,7
      C670,6 680,8 690,7
      C700,4 710,10 720,7
      C730,5 740,9 750,7
      C760,6 770,8 780,7
      C790,5 800,9 810,7
      C820,6 830,8 840,7
      C850,4 860,10 870,7
      C880,5 890,9 900,7
      C910,6 920,8 930,7
      C940,5 950,9 960,7
      C970,6 980,8 990,7
      C1000,4 1010,10 1020,7
      C1030,5 1040,9 1050,7
      C1060,6 1070,8 1080,7
      C1090,5 1100,9 1110,7
      C1120,6 1130,8 1140,7
      C1150,4 1160,10 1170,7
      C1180,5 1190,9 1200,7
      C1210,6 1220,8 1230,7
      C1240,5 1250,9 1260,7
      C1270,6 1280,8 1290,7
      C1300,4 1310,10 1320,7
      C1330,5 1340,9 1350,7
      C1360,6 1370,8 1380,7
      C1390,5 1400,9 1410,7
      C1420,6 1430,8 1440,7
      C1420,6 1430,8 1440,7
      L1440,14
      L0,14
      Z"
            fill="#f5e6d3"
          />
        </svg>
      </div>

      <section className={styles.about}>
        <main className={styles.main}>
          <div className={`${styles.svgContainer} relative xl:block hidden`}>
            {/*  <img
              src="/assets/AboutUsSvgs/aboutus.svg"
              alt="About Us"
              className={${styles.mainSvg} opacity-50}
              style={{
                width: "950vw", // Change this to make it bigger/smaller
                height: "auto", // Keeps aspect ratio
              }}
            /> */}

            <div className="xl:block hidden relative w-full h-full">
              <img
                src="/assets/AboutUsSvgs/wordcloud.svg"
                alt="wordcloud"
                className={`${styles.mainSvg} opacity-50`}
              />

              <img
                src="/assets/AboutUsSvgs/Asset 15.svg"
                alt="WhatsApp Group"
                className="absolute top-[-55px] left-[-159px] size-40 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src="/assets/AboutUsSvgs/Asset 16.svg"
                alt="No Experience Needed"
                className="absolute top-[-95px] left-[140px] size-50 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src="/assets/AboutUsSvgs/Asset 17.svg"
                alt="Community"
                className="absolute top-[-85px] left-[340px] size-25 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src="/assets/AboutUsSvgs/Asset 18.svg"
                alt="Groningen"
                className="absolute top-[-20px] left-[500px] size-30 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src="/assets/AboutUsSvgs/Asset 19.svg"
                alt="Foam Dodgeball"
                className="absolute top-[55px] left-[750px] size-35 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src="/assets/AboutUsSvgs/Asset 20.svg"
                alt="Inclusive Fun"
                className="absolute top-[170px] left-[660px] size-30 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src="/assets/AboutUsSvgs/Asset 21.svg"
                alt="Afterdodge"
                className="absolute top-[320px] left-[690px] size-28 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <img
                src="/assets/AboutUsSvgs/Asset 22.svg"
                alt="Youth & Adult Sessions"
                className="absolute top-[335px] left-[420px] size-40 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />

              <img
                src="/assets/AboutUsSvgs/Asset 23.svg"
                alt="Coached Sessions"
                className="absolute top-[300px] left-[220px] size-40 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />

              <img
                src="/assets/AboutUsSvgs/Asset 24.svg"
                alt="Open for All"
                className="absolute top-[280px] left-[-40px] size-30 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />

              <img
                src="/assets/AboutUsSvgs/Asset 25.svg"
                alt="Clinics & Team Building"
                className="absolute top-[90px] left-[-130px] size-45 hover:scale-110 transition-transform duration-300 cursor-pointer"
              />

              <img
                src="/assets/AboutUsSvgs/Asset 27.svg"
                alt="About Gron's Dodgeball"
                className="absolute top-[50%] left-[50%] size-60  transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>

            <div className="xl:hidden block w-full h-full">
              <img src="/assets/AboutUsSvgs/Mobile version.svg" alt="" />
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
