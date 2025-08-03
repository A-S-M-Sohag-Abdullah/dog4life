"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/UpcommingSessions.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const mockSessions = [
  {
    summary: "Indoor Dodgeball",
    location: "ACLO Groningen",
    start: { dateTime: "2025-08-10T18:00:00+02:00" },
    end: { dateTime: "2025-08-10T20:00:00+02:00" },
  },
  {
    summary: "Outdoor Game",
    location: "Kardingerweg Groningen",
    start: { dateTime: "2025-08-17T17:00:00+02:00" },
    end: { dateTime: "2025-08-17T19:00:00+02:00" },
  },
  {
    summary: "Summer Break",
    location: "No Dodgeball",
    start: { dateTime: "2025-08-17T17:00:00+02:00" },
    end: { dateTime: "2025-08-17T19:00:00+02:00" },
  },

  {
    summary: "Indoor Dodgeball",
    location: "ACLO Groningen",
    start: { dateTime: "2025-08-10T18:00:00+02:00" },
    end: { dateTime: "2025-08-10T20:00:00+02:00" },
  },
  {
    summary: "Outdoor Game",
    location: "Kardingerweg Groningen",
    start: { dateTime: "2025-08-17T17:00:00+02:00" },
    end: { dateTime: "2025-08-17T19:00:00+02:00" },
  },
  {
    summary: "Summer Break",
    location: "No Dodgeball",
    start: { dateTime: "2025-08-17T17:00:00+02:00" },
    end: { dateTime: "2025-08-17T19:00:00+02:00" },
  },
];

const UpcomingSessions = () => {
  const timelineRef = useRef(null);
  const progressFillRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const cardRefs = useRef([]);
  const [sessions, setSessions] = useState([]);

  /*  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
    const timeMin = new Date().toISOString();

    try {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          calendarId
        )}/events?key=${apiKey}&maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${timeMin}`
      );
      const data = await res.json();
      console.log("Fetched sessions:", data.items);
      if (!data.items || data.items.length === 0) {
        console.warn("No sessions found in the calendar.");
      }
      setSessions(data.items || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  }; */

  useEffect(() => {
    setSessions(mockSessions);
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Amsterdam",
    });

  // 🎯 Smooth drag-to-scroll using gsap
  const handleMouseDown = (e) => {
    isDragging.current = true;
    timelineRef.current.classList.add(styles.dragging);
    startX.current = e.pageX - timelineRef.current.offsetLeft;
    scrollLeft.current = timelineRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    timelineRef.current.classList.remove(styles.dragging);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    timelineRef.current.classList.remove(styles.dragging);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;

    // Smooth scroll with gsap
    gsap.to(timelineRef.current, {
      scrollLeft: scrollLeft.current - walk,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleScroll = () => {
    const el = timelineRef.current;
    const percent = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${percent}%`;
    }
  };

  // 🎬 Animate on scroll
  useEffect(() => {
    if (!timelineRef.current) return;

    gsap.fromTo(
      timelineRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
        },
      }
    );
  }, [sessions]);

  return (
    <main className={`${styles.upcomming} ${styles.main} relative`}>
      <div className={`${styles.sectionTitle}  relative z-50`}>
        UPCOMING SESSIONS
      </div>
      <Image
          src="/assets/bg/claimspot.svg"
          alt="Hero Background"
          width={20}
          height={20}
          className="absolute top-[15%] left-[4%] size-40 xl:block hidden"
        />
      <p className={`${styles.subtitle}  relative z-50`}>
        Swipe or scroll through upcoming games
      </p>

      <div className={`${styles.timelineWrapper}  relative z-50`}>
        

        <section
          ref={timelineRef}
          className={styles.timeline}
          role="region"
          aria-label="Upcoming dodgeball sessions timeline"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
        >
          {sessions.length === 0 ? (
            <p className={styles.noSessions}>Loading sessions...</p>
          ) : (
            sessions.map((event, i) => {
              const start = new Date(event.start.dateTime || event.start.date);
              const end = new Date(
                event.end?.dateTime || start.getTime() + 2 * 60 * 60 * 1000
              );
              const title = event.summary || "Dodgeball Session";
              const locationQuery = event.location || "Groningen";
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                locationQuery
              )}`;
              const isACLO = title.toLowerCase().includes("aclo");
              const isSummerBreak = title
                .toLowerCase()
                .includes("summer break");
              const isKardingerweg = locationQuery
                .toLowerCase()
                .includes("kardingerweg");

              return (
                <article
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={styles.card}
                  tabIndex={0}
                >
                  <div className={styles.dateRow}>
                    <div className={styles.dateSmall}>{formatDate(start)}</div>
                    {isKardingerweg ? (
                      <div className={styles.rsvpPill}>Outdoors</div>
                    ) : isACLO ? (
                      <div className={styles.rsvpPill}>RSVP only</div>
                    ) : isSummerBreak ? (
                      <div className={styles.rsvpPill}>No Dodge</div>
                    ) : null}
                  </div>
                  <div className={styles.timeInfo}>
                    {formatTime(start)}
                    {event.start.dateTime ? " – " + formatTime(end) : ""}
                  </div>
                  <div className={styles.titlePill}>{title}</div>
                  <div className={styles.cardFooter}>
                    {!isSummerBreak && (
                      <a
                        href={mapsUrl}
                        className={styles.location}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click for route
                      </a>
                    )}
                    <div className={styles.iconGroup}>
                      {!isSummerBreak && !isACLO && (
                        <>
                          <a
                            href="https://scan.gronsdodgeball.nl/payment/form?payment_link=plink_1RNuWuKPJsqZGRQAFNGt76Oz"
                            className={styles.iconBtn}
                            aria-label="Buy ticket"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                              width="20"
                              height="20"
                              fill="white"
                            >
                              <path d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64v-64c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6v-64c0-35.3-28.7-64-64-64H64z" />
                            </svg>
                          </a>
                          <button className={styles.iconBtn} aria-label="Share">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              width="20"
                              height="20"
                              fill="white"
                            >
                              <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304c0 113.3 81.5 163.9 100.2 174.1a18.21 18.21 0 0 0 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>

        <div className={styles.progressBar} aria-hidden="true">
          <div className={styles.progressFill} ref={progressFillRef}></div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          Swipe to scroll
        </div>
      </div>
    </main>
  );
};

export default UpcomingSessions;
