"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const reviews = [
  {
    name: "Cindy",
    text: "I really love being part of this dodgeball community! Everyone is super friendly and welcoming.",
  },
  {
    name: "Tijmen",
    text: "I had such a great day!! I loved dodgeball in high-school, and I was just as fanatic as then.",
  },
  {
    name: "Lotte",
    text: "I had such a fun and active day. It's a great way to meet new people while doing something sporty.",
  },
  {
    name: "Lucas",
    text: "Joining as a complete beginner, I still felt welcome. There's a good balance of games and coaching.",
  },
  {
    name: "Anastasia",
    text: "I had such a fun time! It was a great way to get active and meet some really lovely people.",
  },
  {
    name: "Daniel",
    text: "Didn’t think I’d get into dodgeball again haha, but it’s seriously the highlight of my week now!",
  },
  {
    name: "Evelina",
    text: "I usually stay quiet in groups but this felt so safe and fun!!! Honestly one of the best things I’ve joined.",
  },
  {
    name: "Marva",
    text: "Came alone and was sooo nervous, but I felt at home right away!",
  },
  {
    name: "James",
    text: "This group really came out of nowhere but has quickly become the main event of my week.",
  },
  {
    name: "Jeffrey",
    text: "Super fun dodgeball club! It reminds me of gym class in school. Very welcoming and chill vibe.",
  },
];

const ReviewCard = ({ name, text }) => (
  <div style={styles.card}>
    <p style={styles.cardText}>“{text}”</p>
    <div style={styles.cardFooter}>
      <strong style={styles.cardFooterStrong}>{name}</strong>
      <span style={styles.cardFooterSpan}>Groningen</span>
    </div>
  </div>
);

/* const WriteReviewCard = () => (
  <div style={{ ...styles.card, background: "#fefaf1", border: "none" }}>
    <p style={styles.cardText}>
      <strong>Want to share your experience?</strong> <br />
      We'd love to hear from you!
    </p>
    <button style={styles.writeButton}>Write a Review</button>
  </div>
); */

const WriteReviewCard = () => {
  const [step, setStep] = useState("initial");
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && review.trim()) {
      setStep("submitted");
    }
  };

  return (
    <div
      className="bg-[#f0ede4] rounded-2xl p-4 w-72 text-black"
      style={{ ...styles.card, background: "#fefaf1", border: "none" }}
    >
      {step === "initial" && (
        <div className="flex flex-col items-start">
          <p className="mb-4 font-medium">
            Want to share your experience? <br />
            We'd love to hear from you!
          </p>
          <button onClick={() => setStep("form")} style={styles.writeButton}>
            Write a Review
          </button>
        </div>
      )}

      {step === "form" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Add your experience</h3>
          <input
            type="text"
            placeholder="Your name"
            className="border border-black px-4 py-2 rounded-lg placeholder:text-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Write your experience..."
            className="border border-black px-4 py-2 rounded-lg placeholder:text-gray-500 resize-none"
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            type="submit"
            className="self-start px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md"
          >
            Submit
          </button>
        </form>
      )}

      {step === "submitted" && (
        <div className="flex flex-col justify-between h-full">
          <p className="text-lg font-medium mb-4">“{review}”</p>
          <div className="">
            <p className="font-bold lowercase">{name}</p>
            <p className="text-sm text-gray-500">
              Thank you for your experience!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Reviews() {
  const containerRef = useRef(null);

  // Manual drag values
  const dragX1 = useMotionValue(0);
  const dragX2 = useMotionValue(0);

  const [windowWidth, setWindowWidth] = useState(0);
  // For cursor feedback
  const [isDragging1, setIsDragging1] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);

  useEffect(() => {
    // Only runs on client
    setWindowWidth(window.innerWidth);

    // Optional: update on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set initial drag offset when windowWidth changes
  useEffect(() => {
    if (windowWidth > 0) {
      dragX1.set(-windowWidth * 0.2); // -20%
      dragX2.set(-windowWidth * 0.1); // -10%
    }
  }, [windowWidth, dragX1, dragX2]);

  // Split reviews
  const half = Math.ceil(reviews.length / 2);
  const row1 = [...reviews.slice(0, half)];
  const row2 = [...reviews.slice(half)];
  row1.splice(Math.floor(row1.length / 2), 0, { isWriteCard: true });

  return (
    <div className="relative z-[50]" ref={containerRef}>
      {/* Divider */}
      <div className="s absolute -top-[4px] sm:-top-[9px] md:-top-[12px]  z-[70] left-0 w-full">
        <svg
          viewBox="0 0 1000 14"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ color: "#111" }}
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
            fill="currentColor"
          />
        </svg>
      </div>

      <section style={styles.section}>
        <div className="px-4">
          <div style={styles.stars}>★★★★★</div>
          <div style={styles.subheading}>What others say</div>
          <div style={styles.title}>Experiences from our Dodgers</div>
          <div style={styles.subtitle}>
            A sport that <strong style={{ color: "white" }}>connects</strong>. A
            community that{" "}
            <strong style={{ color: "white" }}>makes you smile</strong>.
          </div>
        </div>

        <div style={styles.marqueeWrapper}>
          {/* ✅ Top Row - Only drag, no scroll effect */}
          <div style={styles.marqueeOuter}>
            <motion.div
              drag="x"
              dragConstraints={{ left: -1500, right: 0 }}
              style={{
                ...styles.marqueeInner,
                x: dragX1,
                cursor: isDragging1 ? "grabbing" : "grab",
              }}
              onDragStart={() => setIsDragging1(true)}
              onDragEnd={() => setIsDragging1(false)}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            >
              {row1.map((r, i) =>
                r.isWriteCard ? (
                  <div
                    key="write"
                    className="sm:ml-auto sm:mr-auto" // Center only on small screens
                    style={{ flexShrink: 0 }}
                  >
                    <WriteReviewCard />
                  </div>
                ) : (
                  <ReviewCard key={`r1-${i}`} {...r} />
                )
              )}
            </motion.div>
          </div>

          {/* ✅ Bottom Row - Only drag, no scroll effect, and staggered */}
          <div style={styles.marqueeOuter}>
            <motion.div
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
              style={{
                ...styles.marqueeInner,
                x: dragX2,
                cursor: isDragging2 ? "grabbing" : "grab",
              }}
              onDragStart={() => setIsDragging2(true)}
              onDragEnd={() => setIsDragging2(false)}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            >
              {row2.map((r, i) => (
                <ReviewCard key={`r2-${i}`} {...r} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  section: {
    minHeight: "100vh",
    padding: "64px 16px",
    textAlign: "center",
    // background: "red",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  stars: {
    color: "#f57f3b",
    fontSize: 20,
    marginBottom: 8,
  },
  subheading: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: 12,
    color: "#bbb",
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: 10,
    color: "white",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#ccc",
    marginBottom: 40,
  },
  marqueeWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  marqueeOuter: {
    overflow: "hidden",
    width: "100%",
    paddingLeft: "200px",
  },
  marqueeInner: {
    display: "flex",
    gap: 16,
    width: "auto",
    alignItems: "self-start",
    userSelect: "none",
    cursor: "grab",
  },
  card: {
    background: "#fefaf1",
    color: "#0d0c0b",
    padding: "20px 22px",
    borderRadius: 24,
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 160,
    minWidth: 240,
    maxWidth: 400,
    flexShrink: 0,
    textAlign: "left",
    transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
  },
  cardText: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    marginBottom: 18,
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: 13,
    lineHeight: 1.2,
    color: "#888",
  },
  cardFooterStrong: {
    color: "#0d0c0b",
    fontSize: 14,
  },
  cardFooterSpan: {
    fontSize: 13,
  },
  writeButton: {
    background: "#0d0c0b",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
};
