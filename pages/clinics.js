/* eslint-disable @next/next/no-img-element */
// components/ClinicsSection.jsx
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styles from "../styles/Clinics.module.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "../app/globals.css";

const Clinics = () => {
  const canvasRef = useRef(null);
  const stepsRef = useRef([]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [canvasWhiteMode, setCanvasWhiteMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [participants, setParticipants] = useState(15);
  const [time, setTime] = useState({ hours: 11, minutes: 0 });
  const [submitted, setSubmitted] = useState(false);

  const dateRef = useRef(null);
  const formRef = useRef(null);

  const formatTime = (h, m) =>
    `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateRef.current) {
      dateRef.current.min = tomorrow.toISOString().split("T")[0];
    }
  }, []);

  useEffect(() => {
    if (stepsRef.current.length > 0) {
      gsap.fromTo(
        stepsRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: stepsRef.current[0].parentElement,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  const incParticipants = () => setParticipants((p) => p + 1);
  const decParticipants = () => setParticipants((p) => (p > 15 ? p - 1 : p));

  const incTime = () => {
    let { hours, minutes } = time;
    minutes += 15;
    if (minutes >= 60) {
      minutes = 0;
      hours = (hours + 1) % 24;
    }
    setTime({ hours, minutes });
  };
  const decTime = () => {
    let { hours, minutes } = time;
    minutes -= 15;
    if (minutes < 0) {
      minutes = 45;
      hours = (hours - 1 + 24) % 24;
    }
    setTime({ hours, minutes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    try {
      const res = await fetch("https://formspree.io/f/mwpbdbvd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        formRef.current.reset();
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Error submitting form. Please try again.");
    }
  };

  const resetAll = () => {
    setShowForm(false);
    setParticipants(15);
    setTime({ hours: 11, minutes: 0 });
    setSubmitted(false);
  };

  // Canvas setup code omitted for brevity

  return (
    <>
      <div className="top-0 h-full text-black w-full left-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-700 ease-in-out ${
            showCanvas ? "opacity-[1]" : "opacity-0"
          }`}
          style={{ mixBlendMode: "multiply" }}
        />
        <NavBar />
        <div className={styles.wrapper}>
          <section className={styles.section}>
            <div className={styles.content}>
              <div className={styles.imageBox}>
                
                {!showForm && (
                  <>
                    <img
                      src="https://i.ibb.co/GQMbsL5b/Dodger-Drop-In-Dodger.jpg"
                      alt="Dodger"
                      className={styles.photo}
                    />
                    <div className={styles.ampersand}>&</div>
                    <button
                      className={styles.cta}
                      onClick={() => setShowForm(true)}
                    >
                      GET STARTED
                    </button>
                  </>
                )}
                {showForm && (
                  <div className={styles.formWrapper}>
                    <button className={styles.closeBtn} onClick={resetAll}>
                      &times;
                    </button>
                    {!submitted ? (
                      <form
                        ref={formRef}
                        className={styles.form}
                        onSubmit={handleSubmit}
                      >
                        <div className={styles.formGroup}>
                          <label htmlFor="participantCount">
                            Number of participants
                          </label>
                          <div className={styles.participantBox}>
                            <button type="button" onClick={decParticipants}>
                              −
                            </button>
                            <input
                              type="number"
                              id="participantCount"
                              name="participants"
                              value={participants}
                              readOnly
                            />
                            <button type="button" onClick={incParticipants}>
                              +
                            </button>
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="groupname">
                            Business or group name
                          </label>
                          <input
                            type="text"
                            id="groupname"
                            name="groupname"
                            required
                            placeholder="e.g. Creative Agency Groningen"
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="email">Contact email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="example@yoursite.com"
                          />
                        </div>

                        <div className={styles.formInline}>
                          <div className={styles.formGroup}>
                            <label htmlFor="date">Preferred date</label>
                            <input
                              type="date"
                              id="date"
                              name="date"
                              required
                              ref={dateRef}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor="time">Preferred time</label>
                            <div className={styles.participantBox}>
                              <button type="button" onClick={decTime}>
                                −
                              </button>
                              <input
                                type="text"
                                id="timeDisplay"
                                value={formatTime(time.hours, time.minutes)}
                                readOnly
                                className={`${styles.preferredTimeInput} min-w-24`}
                              />
                              <input
                                type="hidden"
                                id="time"
                                name="time"
                                value={formatTime(time.hours, time.minutes)}
                              />
                              <button type="button" onClick={incTime}>
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                          Submit your request
                        </button>
                      </form>
                    ) : (
                      <p id="formSuccess" className={styles.formSuccess}>
                        Thanks! We&apos;ll be in touch very soon.
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.steps}>
                {[1, 2, 3].map((num, i) => (
                  <div
                    className={styles.step}
                    key={num}
                    ref={(el) => (stepsRef.current[i] = el)}
                  >
                    <div className={styles.stepCircle}>{num}</div>
                    <div className={styles.stepContent}>
                      <h4>
                        {
                          [
                            "Tailored sessions for every kind of group",
                            "We take care of everything",
                            "Play. Connect. Recharge.",
                          ][i]
                        }
                      </h4>
                      <p>
                        {
                          [
                            "Whether you're organizing a corporate outing, team off-site, or student event — we tailor each session to your group’s dynamics, goals, and energy level.",
                            "From professional coaching and top-quality dodgeball equipment to music and location – we handle all logistics so your team can fully enjoy the moment, stress-free.",
                            "Expect an active session full of laughter, healthy competition, and team bonding – designed to leave your group recharged, connected, and talking about it for days.",
                          ][i]
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Clinics;
