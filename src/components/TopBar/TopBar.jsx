"use client";
import "./TopBar.css";

import { useRef, useEffect } from "react";
import Image from "next/image";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

const TopBar = () => {
  const topBarRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();
  let lastScrollY = 0;
  let isScrolling = false;

  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const topBarHeight = topBar.offsetHeight;

    gsap.set(topBar, { y: 0 });

    const handleScroll = () => {
      if (isScrolling) return;

      isScrolling = true;
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 1 : -1;

      if (direction === 1 && currentScrollY > 50) {
        gsap.to(topBar, {
          y: -topBarHeight,
          duration: 1,
          ease: "power4.out",
        });
      } else if (direction === -1) {
        gsap.to(topBar, {
          y: 0,
          duration: 1,
          ease: "power4.out",
        });
      }

      lastScrollY = currentScrollY;

      setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (topBarRef.current) {
      gsap.set(topBarRef.current, { y: 0 });
    }
  });

  return (
    <div className="top-bar" ref={topBarRef}>
      <div className="top-bar-logo">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateWithTransition("/");
          }}
        >
          <Image
            src="/Logo/BCP-New-Logo.png"
            alt="BCP Logo"
            width={120}
            height={50}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
