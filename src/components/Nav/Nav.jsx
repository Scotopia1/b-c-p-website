"use client";
import "./Nav.css";

import {
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";

import { useViewTransition } from "@/hooks/useViewTransition";
import { useMenu } from "@/context/MenuContext";

gsap.registerPlugin(SplitText);

const Nav = () => {
  const {
    isOpen,
    setIsOpen,
    isAnimating,
    setIsAnimating,
    isNavigating,
    setIsNavigating,
  } = useMenu();
  const menuRef = useRef(null);
  const isInitializedRef = useRef(false);
  const splitTextRefs = useRef([]);
  const router = useRouter();
  const lenis = useLenis();

  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, isOpen]);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  useLayoutEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;

      splitTextRefs.current.forEach((split) => {
        if (split.revert) split.revert();
      });
      splitTextRefs.current = [];

      gsap.set(menu, {
        clipPath: "circle(0% at 50% 50%)",
      });

      const h2Elements = menu.querySelectorAll("h2");
      const pElements = menu.querySelectorAll("p");

      h2Elements.forEach((h2, index) => {
        const split = SplitText.create(h2, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      pElements.forEach((p, index) => {
        const split = SplitText.create(p, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      isInitializedRef.current = true;
    }
  }, []);

  const animateMenu = useCallback((open) => {
    if (!menuRef.current) {
      return;
    }

    const menu = menuRef.current;

    setIsAnimating(true);

    if (open) {
      document.body.classList.add("menu-open");

      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 2,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onStart: () => {
          splitTextRefs.current.forEach((split, index) => {
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.05,
              delay: 0.35 + index * 0.1,
              duration: 1,
              ease: "power4.out",
            });
          });
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    } else {
      const textTimeline = gsap.timeline({
        onStart: () => {
          gsap.to(menu, {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power3.out",
            duration: 1,
            delay: 0.75,
            onComplete: () => {
              menu.style.pointerEvents = "none";

              splitTextRefs.current.forEach((split) => {
                gsap.set(split.lines, { y: "120%" });
              });

              document.body.classList.remove("menu-open");

              setIsAnimating(false);
              setIsNavigating(false);
            },
          });
        },
      });

      splitTextRefs.current.forEach((split, index) => {
        textTimeline.to(
          split.lines,
          {
            y: "-120%",
            stagger: 0.03,
            delay: index * 0.05,
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);


  const handleLinkClick = useCallback(
    (e, href) => {
      e.preventDefault();

      const currentPath = window.location.pathname;
      if (currentPath === href) {
        if (isOpen) {
          setIsOpen(false);
        }
        return;
      }

      if (isNavigating) return;

      setIsNavigating(true);
      navigateWithTransition(href);
    },
    [isNavigating, router, isOpen, setIsOpen]
  );

  const splitTextIntoSpans = (text) => {
    return text
      .split("")
      .map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;&nbsp;</span>
        ) : (
          <span key={index}>{char}</span>
        )
      );
  };

  return (
    <div>
      <div className="menu" ref={menuRef}>
        <div className="menu-wrapper">
          <div className="col col-1">
            <div className="links">
              <div className="link">
                <a href="/" onClick={(e) => handleLinkClick(e, "/")}>
                  <h2>Home</h2>
                </a>
              </div>
              <div className="link">
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, "/about")}
                >
                  <h2>About</h2>
                </a>
              </div>
              <div className="link">
                <a
                  href="/services"
                  onClick={(e) => handleLinkClick(e, "/services")}
                >
                  <h2>Services</h2>
                </a>
              </div>
              <div className="link">
                <a
                  href="/projects"
                  onClick={(e) => handleLinkClick(e, "/projects")}
                >
                  <h2>Projects</h2>
                </a>
              </div>
              <div className="link">
                <a
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, "/contact")}
                >
                  <h2>Contact</h2>
                </a>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="socials">
              <div className="sub-col">
                <div className="menu-meta menu-commissions">
                  <p>Contact Us</p>
                  <p>bcp411@hotmail.com</p>
                  <p>(617) 462-0608</p>
                </div>
                <div className="menu-cta">
                  <a
                    href="/consultation"
                    className="cta-button"
                    onClick={(e) => handleLinkClick(e, "/consultation")}
                  >
                    <p>Get Free Consultation</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
