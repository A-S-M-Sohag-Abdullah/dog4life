"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/FAQ.module.css";
import FAQItem from "./FAQItem";
import Image from "next/image";

const initialFaqs = [
  {
    q: "What is Dodgeball?",
    a: "Dodgeball is a fast-paced, team-based sport where you dodge, throw, and catch soft foam balls to eliminate the other team.",
  },
  {
    q: "What is the average age of the players?",
    a: "Our players range from 4 to 50 years old. We welcome youth, students, professionals, and everyone in between.",
  },
  {
    q: "When and where do you play?",
    a: "We play on Saturday morning / afternoons. In winter we’re indoors, and if the weather is good, we play outside.",
  },
  {
    q: "How much does it cost?",
    a: "We offer day passes and memberships. Prices are kept accessible, and funds are available if needed.",
  },
  {
    q: "Do you offer any financial support?",
    a: "Yes! You can apply for support through the Volwassenenfonds (for adults) or Jeugdfonds (for youth).",
  },
  {
    q: "What if I have a Stadjerspas?",
    a: "We offer a discount through Stadjerspas. Please see Funds & Accessibility for more information.",
  },
  {
    q: "What should I wear?",
    a: "Wear something sporty — indoor shoes, a t-shirt, shorts or joggers, and bring a water bottle.",
  },
  {
    q: "Can I bring a friend?",
    a: "Absolutely! A familiar face on court makes it even more fun.",
  },
  {
    q: "Can I try before committing?",
    a: "Yes! You can join for a single session without a membership. Perfect to try it out!",
  },
  { q: "Is this competitive or just for fun?", a: "Both!" },
  {
    q: "Do you play when it rains?",
    a: "Yes, we go indoors when the weather is bad.",
  },
  { q: "Can I join anytime?", a: "Yes, new players are welcome year-round." },
  {
    q: "Do you offer youth sessions?",
    a: "Yes! Starting in the 2025/2026 season, we’re launching sessions for 4 to 18 years old.",
  },
  {
    q: "What if I can’t afford a membership?",
    a: "No stress, we’ve got flexible options and partner funds to help.",
  },
  { q: "Do you have more locations?", a: "Not yet, but we’re working on it!" },
  {
    q: "What location are the sessions at?",
    a: "We aim to play in or near the city centre. Indoor during colder months, outdoor when it’s sunny.",
  },
  {
    q: "Is there more after dodgeball?",
    a: "Yes, we’re having a community where people meet and connect after the games.",
  },
  {
    q: "Is it like the high school game?",
    a: "Pretty much, but with a sporty twist.",
  },
  {
    q: "Can I become a trainer?",
    a: "We’re always looking for new trainers, for both adults and youth groups. Please contact us.",
  },
  {
    q: "When did Gron’s Dodgeball start?",
    a: "We started in 2025, in Groningen, the first foam dodgeball community in the Netherlands.",
  },
  {
    q: "What does Gron’s Dodgeball stand for?",
    a: "Gron’s is short for Groningen. Dodgeball speaks for itself. Together it stands for fun, movement, and community.",
  },
  { q: "How long is a session?", a: "All sessions are 90+ minutes long." },
  {
    q: "How long is a ticket valid?",
    a: "A Drop-In Dodger ticket is valid for 7 days after purchase.",
  },
  {
    q: "I’m sick and can’t come, what happens to my ticket?",
    a: "Let us know 24h in advance, and we’ll extend it by 7 days.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We use Stripe, pay with iDEAL, Apple Pay, Google Pay, or credit card.",
  },
  {
    q: "Can I join through ACLO?",
    a: "Yes! Through the ACLO site you can join our courses.",
  },
];

const translations = {
  prijs: "cost",
  locatie: "location",
  trainer: "trainer",
  kleding: "wear",
  vriend: "friend",
  sessie: "session",
  jeugd: "youth",
  weer: "weather",
  proef: "try",
  korting: "discount",
  betaling: "payment",
  aanmelden: "join",
};

export default function FaqPage() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const faqTopRef = useRef(null);
  const translateQuery = (q) => {
    for (const [nl, en] of Object.entries(translations)) {
      if (q.toLowerCase().includes(nl)) return en;
    }
    return q;
  };

  const handleSearch = (e) => {
    const query = translateQuery(e.target.value);
    setSearch(query);
    const results = initialFaqs.filter((faq) =>
      (faq.q + faq.a).toLowerCase().includes(query.toLowerCase())
    );
    setFaqs(results);
    setShowAll(true);
    setShowForm(results.length === 0);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch("https://formspree.io/f/xovwnnpe", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setSearch("");
      setFaqs(initialFaqs);
      setShowAll(false);
    }, 5000);
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleToggleShowAll = () => {
    setShowAll((prev) => {
      const next = !prev;
      if (!next && faqTopRef.current) {
        faqTopRef.current.scrollIntoView({
          block: "start",
        });
      }
      return next;
    });
  };

  return (
    <div className={`relative ${styles.faq}`}>
      {/* Decorative Top Curve */}
      <Image
        src="/assets/bg/questions.svg"
        alt="Hero Background"
        width={20}
        height={20}
        className="absolute top-[20%] 2xl:left-[25%] left-[15%] size-40 xl:block hidden"
      />
      <div className="absolute -top-[2px] sm:-top-[4px] md:-top-[7px] z-[70] left-0 w-full">
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
      <div className={styles.container}>
        <div className={styles.header}>
          <div ref={faqTopRef}></div>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you might want to know about the dodgeball fun.</p>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="What are you looking for?"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* <div className={styles.faqList}>
          {(showAll ? faqs : faqs.slice(0, 5)).map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                {faq.q}
                <span className={styles.toggle}>+</span>
              </summary>
              <div className={styles.faqAnswer}>{faq.a}</div>
            </details>
          ))}
        </div> */}

        <div className={styles.faqList}>
          {(showAll ? faqs : faqs.slice(0, 5)).map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onClick={() => toggleIndex(i)}
            />
          ))}
        </div>

        {showForm && !submitted && (
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <p>We couldn’t find your question. Ask us directly:</p>
            <input name="name" placeholder="Your Name" required />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
            />
            <textarea name="message" placeholder="Your question" required />
            <button type="submit">Send</button>
          </form>
        )}

        {submitted && (
          <div className={styles.thankYou}>
            Thank you for your question! We'll get back to you soon.
          </div>
        )}

        {faqs.length > 5 && (
          <button className={styles.showMore} onClick={handleToggleShowAll}>
            {showAll ? "Show fewer questions" : "Show all questions"}
          </button>
        )}
      </div>
    </div>
  );
}
