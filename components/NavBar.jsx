"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import logo from "../public/assets/logo.svg"; // Adjust the path as needed

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const coverRef = useRef(null);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const linkRefs = useRef([]);
  const moreItemRefs = useRef([]);
  const moreBoxRefs = useRef([]);
  const boxRefs = useRef([]);
  const contactItemRefs = useRef([]); // New ref array for email & phone

  const mainLinks = [
    { label: "Sessions", href: "/#sessions" },
    { label: "Clinics", href: "/clinics", external: true },
    { label: "Memberships", href: "/#memberships" },
    { label: "Contact", href: "/#contact" },
  ];

  const moreLinks = [
    { label: "Funds", href: "/#funds" },
    { label: "Youth", href: "/youth", external: true },
    { label: "FAQ", href: "/#faq" },
  ];

  const svgIcons = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.725 22v-7.745h2.6l.389-3.018h-2.99V9.31c0-.874.243-1.47 1.497-1.47h1.598v-2.7a21 21 0 0 0-2.33-.12c-2.304 0-3.881 1.407-3.881 3.99v2.227H10v3.018h2.607V22H3.104C2.494 22 2 21.506 2 20.896V3.104C2 2.494 2.494 2 3.104 2h17.792C21.506 2 22 2.494 22 3.104v17.792c0 .61-.494 1.104-1.104 1.104z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12.001 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.95 9.95 0 0 1-5.03-1.355L2.005 22l1.352-4.968A9.95 9.95 0 0 1 2.001 12c0-5.523 4.477-10 10-10M8.593 7.3l-.2.008a1 1 0 0 0-.372.1a1.3 1.3 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.73 2.73 0 0 0 6.9 9.62c.002.49.13.967.33 1.413c.409.902 1.082 1.857 1.97 2.742c.214.213.424.427.65.626a9.45 9.45 0 0 0 3.84 2.046l.568.087c.185.01.37-.004.556-.013a2 2 0 0 0 .833-.231a5 5 0 0 0 .383-.22q.001.002.125-.09c.135-.1.218-.171.33-.288q.126-.13.21-.302c.078-.163.156-.474.188-.733c.024-.198.017-.306.014-.373c-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.402-.621a.5.5 0 0 0-.176-.041a.48.48 0 0 0-.378.127c-.005-.002-.072.055-.795.931a.35.35 0 0 1-.368.13a1.4 1.4 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.108a6 6 0 0 1-1.575-1.003c-.126-.11-.243-.23-.363-.346a6.3 6.3 0 0 1-1.02-1.268l-.059-.095a1 1 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41c.11-.14.203-.276.263-.373c.118-.19.155-.385.093-.536q-.42-1.026-.868-2.041c-.059-.134-.234-.23-.393-.249q-.081-.01-.162-.016a3 3 0 0 0-.403.004z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <g fill="none">
        <g clipPath="url(#primeTwitter0)">
          <path
            fill="currentColor"
            d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
          />
        </g>
        <defs>
          <clipPath id="primeTwitter0">
            <path fill="#fff" d="M0 0h14v14H0z" />
          </clipPath>
        </defs>
      </g>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M19.888 7.335a5.13 5.13 0 0 0-2.893-2.418a9 9 0 0 0-2.275-.508q-.284.504-.508 1.038a15 15 0 0 0-4.56 0a11 11 0 0 0-.519-1.038c-.752.082-1.493.249-2.208.497a5.12 5.12 0 0 0-2.904 2.44a16.18 16.18 0 0 0-1.91 9.717a16.6 16.6 0 0 0 4.98 2.528a4.34 4.34 0 0 0 1.104-1.777q-.81-.304-1.557-.74c-.089-.122.254-.32.364-.354a11.83 11.83 0 0 0 10.037 0c.1 0 .453.232.364.354c-.441.342-1.424.585-1.59.828a7.4 7.4 0 0 0 1.105 1.69a16.6 16.6 0 0 0 4.99-2.53a16.23 16.23 0 0 0-2.02-9.727M8.669 14.7a1.943 1.943 0 0 1-1.92-1.955a1.943 1.943 0 0 1 1.92-1.91a1.94 1.94 0 0 1 1.933 1.965a1.943 1.943 0 0 1-1.933 1.9m6.625 0a1.943 1.943 0 0 1-1.932-1.944a1.932 1.932 0 1 1 3.865.034a1.93 1.93 0 0 1-1.933 1.899z"
      />
    </svg>,
  ];

  const openMenu = () => {
    setMenuOpen(true);

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    gsap.killTweensOf(linkRefs.current);
    gsap.set(linkRefs.current, { yPercent: 100, opacity: 1 });
    gsap.set(contactItemRefs.current, { opacity: 0, y: 30 });
    gsap.set(menuRef.current, { y: "100%" });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(coverRef.current, { y: "100%", display: "block" });

    const tl = gsap.timeline();

    tl.fromTo(
      coverRef.current,
      { y: "100%" },
      { y: "0%", duration: 0.6, ease: "power2.out" }
    )
      .to(
        coverRef.current,
        { y: "-100%", duration: 0.6, ease: "power2.inOut" },
        "+=0.1"
      )
      .set(coverRef.current, { display: "none" })

      .set(overlayRef.current, { display: "block" })
      .to(overlayRef.current, { opacity: 1, duration: 0.3 }, "-=0.4")

      .to(
        menuRef.current,
        { y: "0%", duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )

      // Links
      .to(
        linkRefs.current,
        {
          yPercent: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.2"
      )

      // Contact items (staggered)
      .to(
        contactItemRefs.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
        },
        "-=0.3"
      );
  };

  const closeMenu = () => {
    const tl = gsap.timeline();

    // Contact (staggered out)
    tl.to(contactItemRefs.current.slice().reverse(), {
      y: 50,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.1,
    })

      // Links
      .to(
        linkRefs.current.slice().reverse(),
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.08,
        },
        "-=0.3"
      )
      .to(
        menuRef.current,
        {
          y: "100%",
          duration: 0.5,
          ease: "power3.in",
        },
        "-=0.3"
      )

      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.4"
      )
      .set(overlayRef.current, { display: "none" })

      .set(coverRef.current, { display: "block" })
      .fromTo(
        coverRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.5, ease: "power2.out" },
        "+=0.1"
      )
      .to(
        coverRef.current,
        { y: "100%", duration: 0.6, ease: "power2.inOut" },
        "+=0.1"
      )
      .set(coverRef.current, { display: "none" })

      .add(() => {
        setMenuOpen(false);
        setMoreMenuOpen(false); // Reset more menu state
        linkRefs.current.reverse(); // restore link order
        // Restore body scroll
        document.body.style.overflow = "unset";
      });
  };

  const handleMouseEnter = (index) => {
    gsap.killTweensOf([boxRefs.current[index], linkRefs.current[index]]);
    gsap.set(boxRefs.current[index], { x: "-100%" });

    const tl = gsap.timeline();

    tl.to(linkRefs.current[index], {
      // paddingLeft: "1.5rem",
      duration: 0.3,
      ease: "power2.inOut",
    });

    tl.to(
      boxRefs.current[index],
      { x: "0%", duration: 0.3, ease: "power2.out" },
      "-=0.2"
    );

    tl.to(
      boxRefs.current[index],
      { x: "100%", duration: 0.3, ease: "power2.in" },
      "+=0.1"
    );

    tl.to(
      linkRefs.current[index],
      { duration: 0.3, ease: "power2.inOut" },
      "-=0.2"
    );
  };

  const handleMoreMouseEnter = (index) => {
    gsap.killTweensOf([
      moreBoxRefs.current[index],
      moreItemRefs.current[index],
    ]);
    gsap.set(moreBoxRefs.current[index], { x: "-100%" });

    const tl = gsap.timeline();

    tl.to(moreItemRefs.current[index], {
      duration: 0.3,
      ease: "power2.inOut",
    });

    tl.to(
      moreBoxRefs.current[index],
      { x: "0%", duration: 0.3, ease: "power2.out" },
      "-=0.2"
    );

    tl.to(
      moreBoxRefs.current[index],
      { x: "100%", duration: 0.3, ease: "power2.in" },
      "+=0.1"
    );

    tl.to(
      moreItemRefs.current[index],
      { duration: 0.3, ease: "power2.inOut" },
      "-=0.2"
    );
  };

  const toggleMoreMenu = () => {
    setMoreMenuOpen(!moreMenuOpen);

    if (!moreMenuOpen) {
      // Opening more menu
      gsap.set(moreItemRefs.current, { opacity: 0, y: 20 });
      gsap.to(moreItemRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
      });
    } else {
      // Closing more menu
      gsap.to(moreItemRefs.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05,
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleDropdown = () => {
    if (!isDesktop) setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    if (!isDesktop) setIsOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <div className="w-full flex items-center justify-center ">
        <div
          className={`flex max-w-[755px] border bg-black px-10 py-3 rounded-full text-black w-full  xl:mb-0 mb-10 mt-4 ${
            menuOpen ? "fixed top-0" : "relative"
          } z-[99999999] items-center justify-between gap-3 mx-5`}
        >
          {/* <Link href="/">
            
          </Link> */}
          <Link href="/" className="flex items-center gap-2">
            {/*     <img src={logo.src} className="w-12 h-12" alt="" /> */}
            <span className="md:text-2xl sm:block sm:text-sm  text-xs font-bold text-white">
              GRON'S DODGEBALL
            </span>
          </Link>

          {/* Help Dropdown */}
          <div className="relative group ms-auto">
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-full transition text-white font-semibold"
              type="button"
              onClick={toggleDropdown}
            >
              Help
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 transform ${
                  isDesktop
                    ? "group-hover:rotate-0 rotate-180"
                    : isOpen
                    ? "rotate-0"
                    : "rotate-180"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={`absolute top-6 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 overflow-hidden transition-opacity duration-200 
          ${
            isDesktop
              ? "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
              : ""
          } 
          ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
            >
              <a
                href="mailto:hello@hello.com"
                className="block px-4 py-2 text-black hover:text-[#e77e28]"
                onClick={closeDropdown}
              >
                Email Us
              </a>
              <Link
                href="/#faq"
                className="block px-4 py-2 text-black hover:text-[#e77e28]"
                onClick={closeDropdown}
              >
                FAQs
              </Link>
              <Link
                href="/terms"
                className="block px-4 py-2 text-black hover:text-[#e77e28]"
                onClick={closeDropdown}
              >
                Terms
              </Link>
              <Link
                href="/rules"
                className="block px-4 py-2 text-black hover:text-[#e77e28]"
                onClick={closeDropdown}
              >
                Rules
              </Link>
              <Link
                href="/privacy"
                className="block px-4 py-2 text-black hover:text-[#e77e28]"
                onClick={closeDropdown}
              >
                Privacy
              </Link>
            </div>
          </div>

          <div
            className="flex cursor-pointer items-center rounded-full gap-1 border border-white px-4 py-2 text-white font-semibold hover:text-white transition-colors duration-300"
            onClick={menuOpen ? closeMenu : openMenu}
          >
            Menu
            {/* <div className="w-6 h-6 bg-white/30 flex items-center justify-center rounded-full">
              <svg
                className="w-4 h-4 transition-all duration-300"
                viewBox="0 0 32 32"
              >
                {menuOpen ? (
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M24 8L8 24M8 8l16 16"
                  />
                ) : (
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h22M5 16h22M5 24h22"
                  />
                )}
              </svg>
            </div> */}
          </div>
        </div>
      </div>

      {/* Sliding Cover */}
      <div
        ref={coverRef}
        className="fixed top-0 left-0 w-full h-screen bg-[#161616] z-[99999] hidden"
        style={{ transform: "translateY(100%)" }}
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[#161616] z-[99999] hidden"
        style={{ opacity: 0 }}
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-screen bg-[#F1EEE7] z-[99999]"
        style={{ transform: "translateY(100%)" }}
      >
        {/* Fixed Height Container with Overflow */}
        <div className="h-[calc(100vh-7rem)] pb-5 bg-[#F1EEE7] mt-28  overflow-auto">
          {/* Content */}
          <div className="max-w-7xl mx-auto px-4  sm:px-6 md:px-8 flex flex-col md:flex-row md:items-end justify-start gap-6 sm:gap-12 md:gap-0 ">
            {/* Menu Links */}
            <div className="flex flex-col gap-2 flex-1">
              {/* First three menu items: Sessions, Clinics, Memberships */}
              {mainLinks.slice(0, 3).map((link, index) => (
                <div
                  key={index}
                  className="overflow-hidden uppercase h-fit w-fit"
                >
                  <div
                    className="relative w-fit group cursor-pointer flex items-start gap-2"
                    /* onMouseEnter={() => handleMouseEnter(index)} */
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        ref={(el) => (linkRefs.current[index] = el)}
                        className={`text-xl hover:pl-6 transition-all duration-600 leading-none sm:text-3xl lg:text-5xl font-bebas-neue font-bold block w-fit xl:text-[85px]`}
                      >
                        {link.label}
                        <div
                          ref={(el) => (boxRefs.current[index] = el)}
                          className="absolute top-0 left-0 h-full bg-[#F1EEE7]/90 z-0"
                          style={{
                            width: "100%",
                            transform: "translateX(-100%)",
                          }}
                        />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        ref={(el) => (linkRefs.current[index] = el)}
                        onClick={(e) => {
                          const isSectionLink = link.href.startsWith("/#");
                          if (isSectionLink) {
                            e.preventDefault();
                            const [path, hash] = link.href.split("#");
                            if (window.location.pathname !== path) {
                              window.location.href = link.href;
                            } else {
                              const target = document.getElementById(hash);
                              if (target) {
                                target.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                            setTimeout(() => {
                              closeMenu();
                            }, 600);
                          }
                        }}
                        className={`text-xl leading-none hover:pl-6 transition-all duration-600 sm:text-3xl lg:text-5xl block w-fit font-bebas-neue font-bold xl:text-[85px]`}
                      >
                        {link.label}
                        <div
                          ref={(el) => (boxRefs.current[index] = el)}
                          className="absolute top-0 left-0 h-full bg-[#F1EEE7]/90 z-0"
                          style={{
                            width: "100%",
                            transform: "translateX(-100%)",
                          }}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              {/* More Menu Button - Second Last */}
              <div className="overflow-hidden uppercase h-fit w-fit">
                <div
                  className="relative w-fit group cursor-pointer flex items-start gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMoreMenu();
                  }}
                >
                  <div
                    ref={(el) => (linkRefs.current[3] = el)}
                    className={`text-xl leading-none transition-all duration-600 sm:text-3xl lg:text-5xl  w-fit font-bebas-neue font-bold flex items-center gap-2 xl:text-[85px]`}
                  >
                    More
                    <span className="text-4xl font-normal transition-all duration-300">
                      {moreMenuOpen ? "−" : "+"}
                    </span>
                  </div>
                </div>
              </div>

              {/* More Menu Items */}
              {moreMenuOpen && (
                <div className="flex flex-col gap-4 ml-4">
                  {moreLinks.map((moreLink, moreIndex) => (
                    <div
                      key={moreIndex}
                      className="overflow-hidden uppercase h-fit w-fit"
                    >
                      <div
                        className="relative w-fit group cursor-pointer"
                        /*   onMouseEnter={() => handleMoreMouseEnter(moreIndex)} */
                      >
                        {moreLink.external ? (
                          <a
                            href={moreLink.href}
                            ref={(el) => (moreItemRefs.current[moreIndex] = el)}
                            className="text-xl leading-none hover:pl-6 transition-all duration-600 sm:text-2xl lg:text-4xl xl:text-[85px] font-bebas-neue font-bold block w-fit text-black"
                            onClick={closeMenu}
                          >
                            {moreLink.label}
                            <div
                              ref={(el) =>
                                (moreBoxRefs.current[moreIndex] = el)
                              }
                              className="absolute top-0 left-0 h-full bg-[#F1EEE7]/90 z-0"
                              style={{
                                width: "100%",
                                transform: "translateX(-100%)",
                              }}
                            />
                          </a>
                        ) : (
                          <Link
                            href={moreLink.href}
                            ref={(el) => (moreItemRefs.current[moreIndex] = el)}
                            onClick={(e) => {
                              const isSectionLink =
                                moreLink.href.startsWith("/#");
                              if (isSectionLink) {
                                e.preventDefault();
                                const [path, hash] = moreLink.href.split("#");
                                if (window.location.pathname !== path) {
                                  window.location.href = moreLink.href;
                                } else {
                                  const target = document.getElementById(hash);
                                  if (target) {
                                    target.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }
                                setTimeout(() => {
                                  closeMenu();
                                }, 600);
                              } else {
                                closeMenu();
                              }
                            }}
                            className="text-5xl hover:pl-6 transition-all duration-600 leading-none xl:text-[85px] sm:text-3xl lg:text-5xl font-bebas-neue font-bold block w-fit"
                          >
                            {moreLink.label}
                            <div
                              ref={(el) =>
                                (moreBoxRefs.current[moreIndex] = el)
                              }
                              className="absolute top-0 left-0 h-full bg-[#F1EEE7]/90 z-0"
                              style={{
                                width: "100%",
                                transform: "translateX(-100%)",
                              }}
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Menu Item - Last */}
              <div className="overflow-hidden uppercase h-fit w-fit">
                <div
                  className="relative w-fit group cursor-pointer flex items-start gap-2"
                  /* onMouseEnter={() => handleMouseEnter(4)} */
                >
                  <Link
                    href={mainLinks[3].href}
                    ref={(el) => (linkRefs.current[4] = el)}
                    onClick={(e) => {
                      const isSectionLink = mainLinks[3].href.startsWith("/#");
                      if (isSectionLink) {
                        e.preventDefault();
                        const [path, hash] = mainLinks[3].href.split("#");
                        if (window.location.pathname !== path) {
                          window.location.href = mainLinks[3].href;
                        } else {
                          const target = document.getElementById(hash);
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                        setTimeout(() => {
                          closeMenu();
                        }, 600);
                      }
                    }}
                    className={`text-xl leading-none hover:pl-6 transition-all duration-600 sm:text-3xl lg:text-5xl block w-fit font-bebas-neue font-bold xl:text-[85px]`}
                  >
                    {mainLinks[3].label}
                    <div
                      ref={(el) => (boxRefs.current[4] = el)}
                      className="absolute top-0 left-0 h-full bg-[#F1EEE7]/90 z-0"
                      style={{
                        width: "100%",
                        transform: "translateX(-100%)",
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col items-end gap-4 flex-1">
              <a
                href="mailto:hello@hello.com"
                ref={(el) => (contactItemRefs.current[0] = el)}
                className="text-base sm:text-lg md:text-xl text-gray-700 hover:pr-4 transition-all duration-300 uppercase font-semibold hover:scale-105 hover:text-black"
              >
                hello@hello.com
              </a>
              <a
                href="tel:+1 234 5678 910"
                ref={(el) => (contactItemRefs.current[1] = el)}
                className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 hover:opacity-70 hover:pr-4 transition-all duration-300 hover:scale-105 hover:text-black"
              >
                +1 234 5678 910
              </a>
              <div className="flex items-center gap-3 mt-5">
                {svgIcons.map((icon, idx) => (
                  <div
                    key={idx}
                    className="bg-black/20 rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer hover:bg-black/40 transition duration-300"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
