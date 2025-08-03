import { useState, useRef, useEffect } from "react";
import styles from "../styles/FAQ.module.css"; // adjust path

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}>
      <div className={styles.faqQuestion} onClick={onClick}>
        {question}
        <span className={styles.toggle}>{isOpen ? "-" : "+"}</span>
      </div>
      <div
        className={styles.faqAnswer}
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 0}px` : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <div className={styles.faqAnswerInner}>{answer}</div>
      </div>
    </div>
  );
};

export default FAQItem;
