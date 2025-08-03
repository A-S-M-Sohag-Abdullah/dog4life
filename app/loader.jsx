import React, { useEffect, useRef, useState } from "react";
import "./globals.css";

const words = [
  { word: "Dodgeball", font: "'Inter', sans-serif", size: "25.6px" },
  { word: "Trefbal", font: "'Pacifico', cursive", size: "28.8px" },
  { word: "Völkerball", font: "'Oswald', sans-serif", size: "24px" },
  {
    word: "Balle au prisonnier",
    font: "'Playfair Display', serif",
    size: "20.8px",
  },
  {
    word: "Palla avvelenata",
    font: "'Dancing Script', cursive",
    size: "27.2px",
  },
  {
    word: "Balón prisionero",
    font: "'Josefin Sans', sans-serif",
    size: "23.2px",
  },
  { word: "Dwa ognie", font: "'PT Serif', serif", size: "24.8px" },
  { word: "Spökboll", font: "'Quicksand', sans-serif", size: "25.6px" },
  { word: "Vybíjená", font: "'Karla', sans-serif", size: "24px" },
];

const finalWord = {
  word: "The game everyone played.",
  font: "font-inter",
  size: "text-xl",
};

const Preloader = ({ onLoaded }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const slotRef = useRef(null);
  const timeouts = useRef([]);

  const clearAllTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  useEffect(() => {
    if (currentStep >= 30) {
      // Show final message
      timeouts.current.push(
        setTimeout(() => {
          setShowFinal(true);

          timeouts.current.push(
            setTimeout(() => {
              setFadeOut(true);

              timeouts.current.push(
                setTimeout(() => {
                  setVisible(false);
                  onLoaded?.();
                }, 700)
              );
            }, 2000)
          );
        }, 800)
      );

      return;
    }

    // Continue slot machine animation
    timeouts.current.push(
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 100 + currentStep * 2.5)
    );

    return clearAllTimeouts;
  }, [currentStep, onLoaded]);

  useEffect(() => {
    return clearAllTimeouts;
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999999999999999999999999999999999999999999999999999999999999] bg-gradient-to-br from-[#f5e6d3] to-[#d4cec1] flex flex-col items-center justify-center text-[#0d0c0b] transition-all duration-700 ${
        fadeOut ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex flex-col items-center gap-6 w-11/12 max-w-2xl">
        {/* Logo */}
        <div className="animate-pulse">
          <img
            src="/assets/logo.svg"
            alt="Logo"
            className="w-24 h-24 sm:w-32 sm:h-32"
          />
        </div>

        {/* Slot Machine Container */}
        <div className="w-full h-16 overflow-hidden relative">
          {!showFinal ? (
            <div
              ref={slotRef}
              className="absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateY(-${currentStep * 64}px)`,
              }}
            >
              {[...Array(31)].map((_, index) => {
                const wordIndex = index % words.length;
                const word = words[wordIndex];
                return (
                  <div
                    key={index}
                    className={`h-16 flex justify-center items-center whitespace-nowrap  text-[${word.size}]`}
                    style={{
                      fontFamily: `${word.font}`,
                      fontSize: word.size,
                    }}
                  >
                    {word.word}
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`h-16 flex justify-center items-center whitespace-nowrap ${finalWord.font} ${finalWord.size}`}
            >
              {finalWord.word}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
