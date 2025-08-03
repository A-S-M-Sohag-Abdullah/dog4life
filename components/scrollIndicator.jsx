import { useEffect, useState } from "react";

export default function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="xs:hidden sm:hidden md:hidden lg:block xl:block"
      style={{
        position: "fixed",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'Inter', sans-serif",
        textAlign: "center",
        zIndex: 99,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
        color: "#0d0c0b",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          letterSpacing: "0.4px",
          animation: "floatText 1.6s ease-in-out infinite",
          opacity: 1,
        }}
      >
        Scroll for more ↓
      </div>

      <style>{`
        @keyframes floatText {
          0%   { transform: translateY(0); opacity: 0.8; }
          50%  { transform: translateY(5px); opacity: 0.7; }
          100% { transform: translateY(0); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
