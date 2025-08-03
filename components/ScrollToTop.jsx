import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "#D5DF26",
        color: "#0d0c0b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: visible
          ? "0 12px 24px rgba(213, 223, 38, 0.3)"
          : "0 0 0 rgba(0,0,0,0)",
        transform: visible ? "scale(1)" : "scale(0.5)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 9999,
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.08)";
        e.currentTarget.style.boxShadow =
          "0 20px 32px rgba(213, 223, 38, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow =
          "0 12px 24px rgba(213, 223, 38, 0.3)";
      }}
    >
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        style={{
          transition: "transform 0.3s ease",
        }}
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </div>
  );
}
